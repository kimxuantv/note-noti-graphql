import mongoose from "mongoose";

const authorSchema = new mongoose.Schema({
    uid: { //user login vao firebase
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    }
    
}, {timestamps: true})

const AuthorModel = mongoose.model('Author', authorSchema)
export default AuthorModel