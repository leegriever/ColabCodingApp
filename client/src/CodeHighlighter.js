import React, {useEffect, useRef, useState} from "react";
import hljs from 'highlight.js';

import 'highlight.js/styles/default.css';
import 'highlight.js/styles/atom-one-dark.css';
import { socket } from './socket';
// import { io } from 'socket.io-client';


hljs.registerLanguage('javascript',  require('highlight.js/lib/languages/javascript'))

const CodeHighlighter = ({blockId}) => {
    // const [code, setCode] = useState('')
    const code = useRef();
    const [isStudent, setIsStudent] = useState([false]);

// on connect
useEffect(() => {
  socket.connect();
  socket.emit('user_joined', {blockId});
}, [blockId]);

    // const [isStudent, setIsStudent] = useState([false]);
    useEffect(() => {
        // socket.connect();
        // console.log("socket id: ", socket.id);
        // console.log("in codehighloight useEffec with blockId: ", blockId);
        // socket.emit('user_joined', {blockId});
        socket.on('user-role', (role) => {setIsStudent(role.role === "student")});
        console.log("is Student: ",isStudent)
        // if (isStudent){
        //     socket.emit('code-change', {
        //         blockId,
        //         code,
        //     });
        // }
        // else{
        if (!isStudent){
           socket.on('code-change', (text) => {changes(text.text)});
        }
       
        // }
    });
        
    const changes = (text)=>{
      // setCode(text)
      code.current = text
      const container = document.getElementById("textEditor") 
      console.log("code:", code.current);   
      container.value = code.current
    }
    
    const handleCodeChange = (event)=>{
    // const container = document.getElementById("textEditor")
      const text = event.target.value
      // container.value = "text";
      socket.emit('code-change', {
          blockId,
          text,
      });
      // hljs.highlightBlock(codeRef.current);
    }
        
    return (
  
        <div>
          <h1>
            Code Block
          </h1>
          <textarea 
          id = "textEditor"
          rows = "20"
          cols="70" 
          onChange={handleCodeChange}
          // value={code}
          readOnly = {!isStudent}/>
        </div>
      // <pre css="height:500px" suppressContentEditableWarning={true} contentEditable={isStudent}>
      //   <code onInput={handleCodeChange}  suppressContentEditableWarning={true} contentEditable={isStudent} ref={codeRef} className="javascript">
      //     {code}
      //   </code>
      // </pre>
    );
  };
  
  export default CodeHighlighter;