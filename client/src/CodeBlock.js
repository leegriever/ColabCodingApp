import React, {useEffect, useRef, useState} from 'react'
import {useNavigate, useParams} from "react-router-dom";
import {Button} from '@mui/material';
import axios from 'axios';
import Editor from './Editor.js'

function CodeBlock() {
    const {blockId} = useParams();
    const navigate = useNavigate();
    const [block, setBlock] = useState([]);
    const baseURL = "https://colabcodingapp-server.onrender.com";

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
        <Editor 
        blockId={blockId}
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
