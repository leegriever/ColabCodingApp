import React, {useEffect, useState} from "react";
import Editor from "@monaco-editor/react"
import { socket } from './socket';

const CodeEditor = ({blockId, codeSolution}) => {
    const [code, setCode] = useState("// write your code here ");
    const [isStudent, setIsStudent] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);

    // initiate socket connect upon block entrance 
    useEffect(() => {
      socket.connect();
      socket.emit('user_joined', {blockId});
    }, [blockId]);

    useEffect(() => {
      console.log("is student: ", isStudent);
        socket.on('user-role', (role) => {setIsStudent(role.role === "student")});
        if (!isStudent){
           socket.on('code-change', (text) => {applyChanges(text.text)});
        }
    });

    // apply changes performed by another user
    const applyChanges = (text)=>{
      setCode(text);
    }
    
    const handleCodeChange = (value, event)=>{
      const text = value;
      socket.emit('code-change', {
          blockId,
          text,
      });
      if (text === codeSolution){
        console.log("well done!")
        setIsCorrect(true);
      }

    }

    return (
      <div>
        {isCorrect && ( // Render the smiley face if isCorrect is true
        <div style={{ fontSize: "4rem", textAlign: "center" }}>😊</div>
        )}
        <Editor
        height = "80vh"
        width = "60%"
        theme = "vs-dark"
        defaultLanguage ="javascript"
        onChange={handleCodeChange}
        options={{readOnly: !isStudent}}
        value={code}
        
      />
      </div>
      
    );
  };
  
  export default CodeEditor;