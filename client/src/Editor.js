import React, {useEffect, useRef, useState} from "react";
import hljs from 'highlight.js';

import 'highlight.js/styles/default.css';
import 'highlight.js/styles/atom-one-dark.css';
import { socket } from './socket';

hljs.registerLanguage('javascript',  require('highlight.js/lib/languages/javascript'))

const Editor = ({blockId}) => {
    const code = useRef();
    const [isStudent, setIsStudent] = useState([false]);
    
    // initiate socket connect upon block entrance 
    useEffect(() => {
      socket.connect();
      socket.emit('user_joined', {blockId});
    }, [blockId]);

    useEffect(() => {
        socket.on('user-role', (role) => {setIsStudent(role.role === "student")});
        if (!isStudent){
           socket.on('code-change', (text) => {applyChanges(text.text)});
        }
    });

    // apply changes performed by another user
    const applyChanges = (text)=>{
      code.current = text
      const container = document.getElementById("textEditor") 
      container.value = code.current;
    }
    
    const handleCodeChange = (event)=>{
      const text = event.target.value;
      socket.emit('code-change', {
          blockId,
          text,
      });
    }
    
    return (
        <div>
          <textarea
          id = "textEditor"
          rows = "20"
          cols="70" 
          onChange={handleCodeChange}
          readOnly = {!isStudent}/>
        </div>
        
    );
  };
  
  export default Editor;