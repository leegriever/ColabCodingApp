import React, {useEffect, useRef, useState} from 'react'
import {useNavigate, useParams} from "react-router-dom";
import {Button} from '@mui/material';
import axios from 'axios';
import CodeEditor from './CodeEditor.js'

function CodeBlock() {
    const {blockId} = useParams();
    const navigate = useNavigate();
    const [block, setBlock] = useState([]);
    const baseURL = "http://localhost:3080";

    useEffect(() => {
      getBlock();
    }, []);

    function onLobbyBtn(){
        navigate('/')
    }

    const getBlock = () => {
        axios.get(`${baseURL}/blocks/${blockId}`)
            .then((response) => setBlock(response.data.block))
            .catch((error) => console.error(error));
    }

    return (
      <div>
        <h1>{block.title}</h1>
        <CodeEditor 
        blockId={blockId}
        codeSolution={block.codeSolution}
        />
        <Button variant="contained" disableElevation
        onClick={() => onLobbyBtn()}
        >
        Back To Lobby
        </Button>
                
      </div>
    )
}

export default CodeBlock
