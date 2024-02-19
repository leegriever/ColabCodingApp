import React, {useEffect, useRef, useState} from "react";
import hljs from 'highlight.js';

import 'highlight.js/styles/default.css';
import 'highlight.js/styles/atom-one-dark.css';
import { socket } from './socket';

hljs.registerLanguage('javascript',  require('highlight.js/lib/languages/javascript'))

const Editor = ({blockId}) => {
    const code = useRef();
    const [isStudent, setIsStudent] = useState([false]);
    // const inputarea = document.getElementById("input");
    // const outputarea = document.getElementById("output");

    // initiate socket connect upon block entrance 
    useEffect(() => {
      console.log("before socket connect");
      socket.connect();
      console.log("after socket connect");
      socket.emit('user_joined', {blockId});
    }, [blockId]);

    useEffect(() => {
        socket.on('user-role', (role) => {setIsStudent(role.role === "student")});
        console.log("is Student: ",isStudent)
        if (!isStudent){
           socket.on('code-change', (text) => {applyChanges(text.text)});
        }
    });

    // useEffect(() => {
    //   highlightCode();
    // });

    // apply changes performed by another user
    const applyChanges = (text)=>{
      code.current = text
      const container = document.getElementById("textEditor") 
      console.log("code:", code.current);   
      // hljs.highlightBlock(code.current);
      // const inputarea = document.getElementById("input");
      // outputarea.innerHTML = code.current;
      container.value = code.current;
      // refreshHighlighting()
    }
    
  // // Function to highlight code
  // const highlightCode = () => {
  //   const text = document.getElementById('textEditor');
  //   console.log("here");
  //   hljs.highlightBlock(text);
  // }
    const handleCodeChange = (event)=>{
      const text = event.target.value;
      // const text = event.target.value
      socket.emit('code-change', {
          blockId,
          text,
      });
      // refreshHighlighting();
    }
    
  // const refreshHighlighting = ()=> {
  //   hljs.highlightBlock(outputarea);
  //   //setTimeout("refreshHighlighting()", 1000);
  //   inputarea.style.zIndex = 0;
  //   inputarea.style.color = "transparent";
  // }

  // const handleOnBlur = ()=> {
  //   refreshHighlighting();
  // }

  // const handleOnClick = ()=> {
  //   inputarea.style.zIndex = 4;
  //   inputarea.style.color = "black";
  // }


  // // Call highlightCode() after rendering to ensure highlighting
  // useEffect(() => {
  //   highlightCode();
  // });
    return (
      // <div class="input-area">
      // <textarea class="textarea"id="input" autofocus onInput={handleCodeChange} readOnly = {!isStudent}></textarea>
      // <textarea id="cousor" class="cousor" onBlur={handleOnBlur}></textarea>
      // <pre>
      // <code id="output" class="preview javascript" onClick={handleOnClick}>
      // </code>
      //     </pre>
      //   </div>

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