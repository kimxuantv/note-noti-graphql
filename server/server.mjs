import express from 'express';
import http from 'http';
import { ApolloServer } from '@apollo/server';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import bodyParser from 'body-parser';
import { expressMiddleware } from '@apollo/server/express4'
import cors from 'cors';
import fakeData from './fakeData/index.js';

import mongoose from 'mongoose'
import 'dotenv/config.js'

import { resolvers } from './resolvers/index.js'
import { typeDefs } from './schemas/index.js'

import './firebaseConfig.js'
import { getAuth } from 'firebase-admin/auth';

// Cau hinh Notification Realtime by WebSocket
import { makeExecutableSchema } from '@graphql-tools/schema';
import { WebSocketServer } from 'ws';
import { useServer } from 'graphql-ws/lib/use/ws';

const app = express();
const httpServer = http.createServer(app);


//CONNECT TO DB MONGO
const URI = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.oigdm8l.mongodb.net/?retryWrites=true&w=majority`;
const PORT = process.env.PORT || 4000;


// Cau hinh Notification Realtime by WebSocket
const schema = makeExecutableSchema({ typeDefs, resolvers });
// Creating the WebSocket server
const wsServer = new WebSocketServer({
    // This is the `httpServer` we created in a previous step.
    server: httpServer,
    // Pass a different path here if app.use
    // serves expressMiddleware at a different path
    path: '/',
});

// Hand in the schema we just created and have the
// WebSocketServer start listening.
const serverCleanup = useServer({ schema }, wsServer);

// schema la tai lieu mo ta dl - #graphql 1/ Query: truy van dl,  2/ Multation: Update dl, 3/ Subscription: Update realtime
// resolver 
//tao sv aplloserver cho db graghql
const server = new ApolloServer({
    // typeDefs,
    // resolvers,
    schema,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer }),

    // Proper shutdown for the WebSocket server.
    {
        async serverWillStart() {
            return {
                async drainServer() {
                    await serverCleanup.dispose();
                },
            };
        },
    },
    ]
})



await server.start();  //await phai boc trong async - muon sd luon trong root phai rename la server.mjs

//DUA AUTHORIZATION JWT MIDDLEWARE VAO XAC THUC chan tat ca request tu client gui toi - ktr cac token trong header co hop le ko
const authorizationJWT = async (req, res, next) => {
    // console.log({authorization: req.headers.authorization})
    const authorizationHeader = req.headers.authorization
    if (authorizationHeader) {
        const accessToken = authorizationHeader.split(' ')[1]
        getAuth().verifyIdToken(accessToken)
            .then(decodedToken => {
                console.log({ decodedToken })
                res.locals.uid = decodedToken.uid
                //luon luon goi next neu hop le thi thuc thi tiep
                next()
            })
            .catch(err => {
                console.log({ err })
                return res.status(403).json({ message: 'Forbidden', error: err })
            })

    } else {
        //bypass cho qua luon de open server Apollo localhost:4000
        next()
        // return res.status(401).json({ message: 'Unauthorized' })
    }

    // next();
}

//LAY user_id trong decodedToken de sd cho resolvers dung de truy van db 

//cau hinh express middleware
app.use(cors(), authorizationJWT, bodyParser.json(), expressMiddleware(server, { // - cau hinh Context truyen context vao expressMiddleware thi tat ca resolver co the truy xuat dc thong qua tham so thu 3 
    context: async ({ req, res }) => {
        return { uid: res.locals.uid }
    }
}));

mongoose.set('strictQuery', false);
mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(async () => {
    console.log('Connected to DB Mongoose')

    await new Promise((resolve) => httpServer.listen({ port: PORT }, resolve));
    console.log('Server is running on port http://localhost:4000');
})


// await new Promise((resolve) => httpServer.listen({ port: PORT }, resolve));
// console.log('Server is running on port http://localhost:4000');