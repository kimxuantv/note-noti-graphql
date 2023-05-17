import React, { useEffect, useMemo, useState } from 'react'
import {ContentState, EditorState, convertFromHTML, convertToRaw} from 'draft-js'
import {Editor} from 'react-draft-wysiwyg'
import draftToHtml from 'draftjs-to-html';
import { useLoaderData, useLocation, useSubmit } from 'react-router-dom'
import { debounce } from '@mui/material'


export default function Note() {
    
// const draftToHtml = require("draftjs-to-html").default;

  //sd Hook useLoaderData de lay dl ra tu router {note}
  const { note } = useLoaderData()
  console.log("🚀 ~ file: Note.jsx:11 ~ Note ~ note:", note)
  
    // const note = {
    //     id: '1111',
    //     content: '<p>This is new note</p>'
    // }

    const [editorState, setEditorState ] = useState(() => {
     return   EditorState.createEmpty()
    })

    //convert va submit len backend
    const [ rawHTML, setRawHTML ] = useState(note.content)

    useEffect(() => {
        const blocksFromHTML = convertFromHTML(note.content)
        const state = ContentState.createFromBlockArray(
            blocksFromHTML.contentBlocks,
            blocksFromHTML.entityMap
        )
        setEditorState(EditorState.createWithContent(state))

    }, [note.id])

    

    const submit = useSubmit()
    const location = useLocation()
    console.log("🚀 ~ file: Note.jsx:41 ~ Note ~ location:", location)

    
    //khi co dl rawHTML thay doi thi submit
    useEffect(() => {
      debouncedMemorized(rawHTML, note, location.pathname)
    },[rawHTML, location.pathname])

    //lay dl moi nhat trong note content     
    const debouncedMemorized = useMemo(() => {
      return debounce((rawHTML, note, pathname) => {
        if(rawHTML === note.content) return;

        submit({...note, content: rawHTML}, {  //sd destructuring ...note la id, authorId, content va ghi de dl content
          method: 'post',
          action: pathname
        })
      }, 1000)
    },[])

    useEffect(() => {
        setRawHTML(note.content)
    }, [note.content])

    const handleOnChange = (e) => {
        setEditorState(e),
        setRawHTML(draftToHtml(convertToRaw(e.getCurrentContent())))
    }

  return (
    // <div>
    //   Note 222
    // </div>
    <Editor 
        editorState={editorState}
        onEditorStateChange={handleOnChange}
        placeholder='Write some thing'
    />
  )
}
