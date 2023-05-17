export default { //"type": "module", vao package de import
    authors: [
        {
            id: 2,
            name: 'MLG'
        },
        {
            id: 4,
            name: 'RTVN'
        },
    ],
    
    folders: [
        {
            id: "1",
            name: 'Home',
            createdAt: '2023-01-28T03:13Z',
            authorId: 2,
        },
        {
            id: "2",
            name: 'New',
            createdAt: '2023-02-28T03:13Z',
            authorId: 4,
        },
        {
            id: "3",
            name: 'Work',
            createdAt: '2023-03-28T03:13Z',
            authorId: 4,
        },
        {
            id: "4",
            name: 'Nothing',
            createdAt: '2023-03-28T03:13Z',
            authorId: 2,
        },
    ],

    notes: [
        {
            id: "1",
            content: "Do some things",
            folderId: "1"
        },
        {
            id: "2",
            content: "Go to Go Markets",
            folderId: "2"
        },
        {
            id: "3",
            content: "Misson complete",
            folderId: "3"
        },
        {
            id: "4",
            content: "Come back Home",
            folderId: "3"
        }
    ]
}