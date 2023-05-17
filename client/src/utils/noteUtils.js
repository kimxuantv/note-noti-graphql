import { graphQLRequest } from "./request";

export const notesLoader = async ({ params: { folderId } }) => {
  //dung params lay folderId ra
  console.log(
    "🚀 ~ file: index.jsx:69 ~ loader: ~ params:",
    folderId
  );
  const query = `query Note($folderId: String!) {
      folder(folderId: $folderId) {
        id
        name
        notes {
                  id
                  content
                  updatedAt
                }
      }
    }`;

  const data = await graphQLRequest({

    query,
    variables: {
      // folderId: folderId key va value giong nhau viet tat la 1 folderId
      folderId
    }
  })

  return data;
}

// const res = await fetch("http://localhost:4000/graphql", {
//   method: "POST",
//   headers: {
//     "Content-Type": "application/json",
//     Accept: "application/json"
//   },
//   body: JSON.stringify({
//     query,
//     variables: {
//       // folderId: folderId key va value giong nhau viet tat la 1 folderId
//       folderId
//     } //truyen dl len backend la folderId
//   })
// });

// const { data } = await res.json();
// console.log("🚀Note List", { data });

//   return data;
// }



export const noteLoader = async ({ params: { noteId } }) => {
  //dung params lay noteId ra
  console.log(
    "🚀 ~ file: index.jsx:69 ~ loader: ~ params:",
    noteId
  );
  const query = `query Folder($noteId: String!) {
    note(noteId: $noteId) {
      content
      id
      
    }
  }`;

  const data = await graphQLRequest({

    query,
    variables: {
      // folderId: folderId key va value giong nhau viet tat la 1 folderId
      noteId
    }
  })

  return data;
}

export const addNewNote = async ({params, request }) => {
  const newNote = await request.formData()
  //convert formData de dua dl len
  const formDataObj = {}
  newNote.forEach((value, key) => (formDataObj[key] = value))
  console.log("newNote",{ newNote, formDataObj})
  //gui len backend de tao moi dl
  const query = `mutation Mutation($content: String!, $folderId: ID!) {
    addNote(content: $content, folderId: $folderId) {
      id
      content
      
    }
  }`;
  const addNote = await graphQLRequest({
    query, 
    variables: formDataObj
  })
  console.log("🚀 ~ file: noteUtils.js:99 ~ addNewNote ~ addNote:", addNote)
  return addNote
}

export const updateNote = async ({params, request }) => {
  const updatedNote = await request.formData()
  //convert formData de dua dl len
  const formDataObj = {}
  updatedNote.forEach((value, key) => (formDataObj[key] = value))
  
  console.log("updatedNote",{ updatedNote, formDataObj})
  //gui len backend de tao moi dl
  const query = `mutation Mutation($id: String!, $content: String!) {
    updateNote(id: $id, content: $content) {
      id
      content
    }
  }`;
  const {updateNote} = await graphQLRequest({
    query, 
    variables: formDataObj
  })
  console.log("🚀 ~ file: noteUtils.js:99 ~ addNewNote ~ updateNote:", updateNote)
  return updateNote 
}

  // const res = await fetch("http://localhost:4000/graphql", {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //     Accept: "application/json"
  //   },
  //   body: JSON.stringify({
  //     query,
  //     variables: {
  //       // folderId: folderId key va value giong nhau viet tat la 1 folderId
  //       noteId
  //     } //truyen dl len backend la folderId
  //   })
  // });

  // const { data } = await res.json();
  // console.log("🚀Note List", { data });

//   return data;
// }