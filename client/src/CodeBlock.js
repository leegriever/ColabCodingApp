import React, {useEffect, useRef, useState} from 'react'
import {useNavigate, useParams} from "react-router-dom";
import {Button} from '@mui/material';
import axios from 'axios';
// import { socket } from './socket';
// import { v4 as uuidv4 } from 'uuid';
import CodeHighlighter from './CodeHighlighter.js'

function CodeBlock() {
    const {blockId} = useParams();
    const navigate = useNavigate();
    const [block, setBlock] = useState([]);
    const code = "Thank you for helping me Adi, Amir and Hezi my love";
    const baseURL = "http://localhost:3080";
    console.log("in CodeBlock, blockId: ", blockId)

    function onLobbyBtn(){
        navigate('/')
    }

    // const getBlock = () => {
    //     axios.get(`${baseURL}/blocks/${blockId}`)
    //         .then((response) => setBlock(response.data.block))
    //         .catch((error) => console.error(error));
    // }

    return (
      <div>
        {/* <h1>{block.title}</h1> */}
        <CodeHighlighter 
        code = {code}
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
