
//cau hinh dl cho graphql //name: String
//tao kieu dl custom trong graphql do Date ko co -- sd scalar Date va them vao trong resolvers

export const typeDefs = `#graphql 
    scalar Date

    type Folder {
        id: String!,
        name: String,
        createdAt: String,
        author: Author,
        notes: [Note]
    }

    type Note {
        id: String!,
        content: String,
        updatedAt: Date
    }
    type Author {
        uid: String,
        name: String,
    }

    type Query { 
        folders: [Folder],
        folder(folderId: String!): Folder,
        note(noteId: String): Note
    }

    type Mutation {
        addFolder(name: String!): Folder,
        addNote(content: String!, folderId: ID!): Note,
        updateNote(content: String!, id: String!): Note,
        register(uid: String!, name: String!): Author,
        pushNotification(content: String): Message,
    }

    type Message {
        message: String
    }

    type Subscription {
        folderCreated: Message
        notification: Message
    }
  
`;
// tao register de luu id name login - roi update trong Mutation resolvers
//doi id thanh uid cho Author de lay userid da login