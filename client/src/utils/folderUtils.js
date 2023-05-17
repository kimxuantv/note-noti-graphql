import { graphQLRequest } from "./request";

export const foldersLoader = async () => {
    const query = `query Folders {
      folders {
        id
        name
        createdAt
      }
    }`;

    const data = await graphQLRequest({query})

    // const res = await fetch("http://localhost:4000/graphql", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //     Accept: "application/json"
    //   },
    //   body: JSON.stringify({
    //     query
    //     //variables ko co truyen dl gi len backend nen ko can kb
    //   })
    // });

    // const { data } = await res.json();
    // console.log("🚀 Home List", {
    //   data
    // });

    return data;
  }

  export const addNewFolder = async (newFolder) => {
    const query = `mutation Mutation($name: String!) {
      addFolder(name: $name) {
        name
        author {
          name
        }
      }
    }`
    const data = await graphQLRequest({query, variables: {
      name: newFolder.name
    }}
    )
    return data
    
  }