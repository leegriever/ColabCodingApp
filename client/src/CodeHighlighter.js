import React, {useEffect, useRef, useState} from "react";
import hljs from 'highlight.js';

import 'highlight.js/styles/default.css';
import 'highlight.js/styles/atom-one-dark.css';
import { socket } from './socket';

hljs.registerLanguage('javascript',  require('highlight.js/lib/languages/javascript'))

const CodeHighlighter = ({blockId}) => {
    const code = useRef();
    const [isStudent, setIsStudent] = useState([false]);

    // on connect
    useEffect(() => {
      socket.connect();
      socket.emit('user_joined', {blockId});
    }, [blockId]);

    useEffect(() => {
        socket.on('user-role', (role) => {setIsStudent(role.role === "student")});
        console.log("is Student: ",isStudent)
        if (!isStudent){
           socket.on('code-change', (text) => {changes(text.text)});
        }
    });
        
    const changes = (text)=>{
      code.current = text
      const container = document.getElementById("textEditor") 
      console.log("code:", code.current);   
      container.value = code.current
    }
    
    const handleCodeChange = (event)=>{
      const text = event.target.value
      socket.emit('code-change', {
          blockId,
          text,
      });
      // hljs.highlightBlock(codeRef.current);
    }
        
    return (
        <div>
          {/* <h1>
            Code Block
          </h1> */}
          <textarea 
          id = "textEditor"
          rows = "20"
          cols="70" 
          onChange={handleCodeChange}
          readOnly = {!isStudent}/>
        </div>
    );
  };
  
  export default CodeHighlighter;