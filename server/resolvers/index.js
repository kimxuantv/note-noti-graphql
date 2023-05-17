import fakeData from '../fakeData/index.js';
import { GraphQLScalarType } from 'graphql'
import { AuthorModel, FolderModel, NoteModel } from '../models/index.js'


// Cau hinh Notification Realtime by WebSocket
import { PubSub } from 'graphql-subscriptions';
import NotificationModel from '../models/NotificationModel.js';
const pubsub = new PubSub();

export const resolvers = { // hoat dong nhu obj trong js co 4 tham so
    //Them kieu dl moi trong graphql
    Date: new GraphQLScalarType({
        name: 'Date',
        parseValue(value) {
            return new Date(value)
        },
        serialize(value) {
            return value.toISOString()
        }
        //kb scalar Date trong schemas
    }),

    Query: { //SU DUNG JWT DE QUERY DATA BAO MAT HON
        folders: async (params, args, context) => {
            // return fakeData.folders; 
            const folders = await FolderModel.find({
                authorId: context.uid //Chỉ lấy ra dl ma user đó tạo ra ko lấy của user khác
            }).sort({
                updatedAt: 'desc'
            });
            console.log("🚀 Resolvers:", folders, context)
            return folders
        }, //tra ve gtr cho client

        //them folder fakeData

        // folder: (parent, args) => {
        //     //update lai trong type Query
        //     const folderId = args.folderId; //lay dl folderId tu phia client gui len
        //     console.log({ folderId })

        //     return fakeData.folders.find(folder => folder.id === folderId)
        // },

        // them folder mongodb
        folder: async (parent, args) => {
            //update lai trong type Query
            const folderId = args.folderId; //lay dl folderId tu phia client gui len
            console.log({ folderId })
            // const folders = await FolderModel.findOne({ _id: folderId }) //findOne tim chinh xac folder
            const folders = await FolderModel.findById(folderId)
            return folders
        },


        //them note Load chi tiet
        note: async (parent, args) => {
            const noteId = args.noteId;
            const notes = await NoteModel.findById(noteId)
            console.log("🚀 ~ file: server.mjs:58 ~ noteId:", noteId)
            // return fakeData.notes.find(note => note.id === noteId)
            return notes
        }
    },
    //map dl author vao folder
    Folder: {
        author: async (parent, args, context, info) => {
            //gang dl authorId
            const authorId = parent.authorId; //authorId la khoa ngoai cua folders
            // console.log({ parent, args });
            //Update Author
            const author = await AuthorModel.findOne({
                uid: authorId
            })
            return author
            // return fakeData.authors.find(author => author.id === authorId) //find tim id duy nhat
            // return { id: '2', name: 'MLG' } 
        },

        //do note la kieu dl array nen phai dung filter ko dung find 
        notes: async (parent, args) => {
            // console.log("🚀 ~ file: server.mjs:67 ~ parent:", parent)
            // return [];
            //them dl that cho note
            const notes = await NoteModel.find({
                folderId: parent.id

            }).sort({
                updatedAt: 'desc' //sort note title moi nhat
            });
            console.log("🚀 ~ file: index.js:70 ~ notes: ~ notes:", notes)
            return notes
            // return fakeData.notes.filter(note => note.folderId === parent.id) //ktr note.folderId co trung voi folder query o tren thi lay ra
        }
    },

    Mutation: {
        //dinh nghia trong schema index.js -- THEM FOLDER
        addFolder: async (parent, args, context) => { //lay userid tu context ra sd ko con la authorId: '1'
            const newFolder = new FolderModel({ ...args, authorId: context.uid }) //truyen args dl gui len tu client
            console.log("🚀 ~ file: index.js:50 ~ addFolder: ~ newFolder:", newFolder)
            //gui noti khi tao folder
            pubsub.publish('FOLDER_CREATED', {
                folderCreated: {
                    message: 'Đã tạo mới Tiêu Đề'
                }
            })
            await newFolder.save()
            return newFolder
            //luu len mongodb
        },
        //Add Note title
        addNote: async (parent, args, context) => {
            const newNote = new NoteModel({ ...args })
            console.log("🚀 ~ file: index.js:81 ~ addNote: ~ newNote:", newNote)
            await newNote.save()
            return newNote
            //dinh nghia them trong Mutation schemas
        },
        //Update Note content
        updateNote: async (parent, args, context) => {
            const noteId = args.id
            const note = await NoteModel.findByIdAndUpdate(noteId, args) //cap nhat dl args tu client gui 
            return note
            //dinh nghia update trong Mutation schemas
        },

        //Update register
        register: async (parent, args) => {
            const foundUser = await AuthorModel.findOne({ uid: args.uid })

            // ko tim dc user thi tao moi
            if (!foundUser) {
                const newUser = new AuthorModel(args);
                await newUser.save();
                return newUser;
            }
            return foundUser;
            //qua file check login
        },

        pushNotification: async (parent, args) => { //args arguments
            // const content = args.content
            const newNotification = await NotificationModel({ args })
            //gui noti khi tao folder
            pubsub.publish('PUSH_NOTIFICATION', {
                notification: {
                    message: args.content
                }
            })
    
            await newNotification.save()
            return { message: 'THÀNH CÔNG' }
    
        },
    },


    Subscription: {
        folderCreated: {
            subscribe: () => pubsub.asyncIterator(['FOLDER_CREATED', 'NOTE_CREATED']) //la array do co the lang nghe nhieu su kien ['FOLDER_CREATED', 'NOTE_CREATED' ]
        },
        notification: {
            subscribe: () => pubsub.asyncIterator(['PUSH_NOTIFICATION'])
        }
    }


};