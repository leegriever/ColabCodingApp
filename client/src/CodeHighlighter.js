import React, {useEffect, useRef, useState} from "react";
import hljs from 'highlight.js';

import 'highlight.js/styles/default.css';
import 'highlight.js/styles/atom-one-dark.css';
import { socket } from './socket';
// import { io } from 'socket.io-client';


hljs.registerLanguage('javascript',  require('highlight.js/lib/languages/javascript'))

const CodeHighlighter = (params) => {
    const {code, blockId} = params;
    const codeRef = useRef(null);
    const [isStudent, setIsStudent] = useState([false]);


//    socket.on('connect', () => {
//     console.log("test!")
//    });


    // const [isStudent, setIsStudent] = useState([false]);
    useEffect(() => {
        socket.connect();
        console.log("socket id: ", socket.id);
        console.log("in codehighloight useEffec with blockId: ", blockId);
        socket.emit('user_joined', {blockId});
        socket.on('user-role', (role) => {setIsStudent(role.role === "student")});
        // if (isStudent){
        //     socket.emit('code-change', {
        //         blockId,
        //         code,
        //     });
        // }
        // else{
        socket.on('code-change', (code) => {code = code.code});
        // }
    }, []);

    const handleCodeChange = (event)=>{
        console.log("in useEffect !!!!!!!")
        const text = document.getElementById("code");
        console.log( "text: ",text)
        socket.emit('code-change', {
            blockId,
            code: "123",
        });
        // hljs.highlightBlock(codeRef.current);
    }
        
    

    return (
        // <textarea id = "code" 
        //         onInput = {handleCodeChange}>
        //     </textarea>
      <pre css="height:500px" suppressContentEditableWarning={true} contentEditable={isStudent}>
        <code onInput={handleCodeChange}  suppressContentEditableWarning={true} contentEditable={isStudent} ref={codeRef} className="javascript">
          {code}
        </code>
      </pre>
    );
  };
  
  export default CodeHighlighter;