import { createBrowserRouter, Outlet } from "react-router-dom";
import NoteList from "../components/NoteList";
import AuthProvider from "../context/AuthProvider";
import ErrorPage from "../pages/ErrorPage";
import Home from "../pages/Home";
import Login from "../pages/Login";
import ProtectedRoute from "./ProtectedRoute";
import Note from "../components/Note";
import { addNewNote, noteLoader, notesLoader, updateNote } from "../utils/noteUtils";
import { foldersLoader } from "../utils/folderUtils";

//Cau hinh router de phan trang
const AuthLayout = () => {
  // Boc AuthProvider vao Compt de sd user, setUser da kb trong AuthProvider
  return (
    <AuthProvider>
      <Outlet />
    </AuthProvider>
  );
};

export default createBrowserRouter([
  {
    //load element default
    element: <AuthLayout />,
    errorElement: <ErrorPage />, // tao comp thong bao loi
    children: [
      {
        element: <Login />,
        path: "/login"
      },
      {
        // element: <ProtectedRoute />,

        // Home List
        children: [
          //Dua cac router can protect de login moi vao duoc
          {
            element: <Home />, //Nguoi dung phai login moi duoc vao Home
            path: "/",
            loader: foldersLoader,

            // Note List
            children: [
              //Outlet tuong trung cho children do chi co 1
              {
                element: <NoteList />,
                path: `folders/:folderId`, //kb bien trong dom :id
                action: addNewNote, //add note title thay doi dl post put - sd action trong noteUtils
                loader: notesLoader,

                children: [
                  {
                    element: <Note />,
                    path: `note/:noteId`,
                    action: updateNote, //update note content
                    loader: noteLoader,

                  }
                ]
              }
            ]
          }
        ]
      }
      // {
      //   element: <Home />,
      //   path: "/"
      // }
    ]
  }
]);
