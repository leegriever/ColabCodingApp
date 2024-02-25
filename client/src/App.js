import React, {useEffect, useState} from 'react'
import {BrowserRouter as Router, Route, Routes,} from "react-router-dom";
import axios from "axios";
import Lobby from './LobbyPage.js';
import CodeBlock from './CodeBlock.js';

function App() {
  const baseURL = "https://colabcodingapp-server.onrender.com";

  const [blocks, setBlocks] = useState([]);

  useEffect(() => {
    getBlocks();
  }, []);

const getBlocks = () => {
  axios.get(`${baseURL}/blocks`)
      .then((response) => setBlocks(response.data.Blocks))
      .catch((error) => console.error(error));
}

  return (
    <div className="App">
        <Router>
            <Routes>
                <Route
                    path="/"
                    element={
                        <Lobby
                          blocks = {blocks}
                        />
                    }
                />
                <Route
                    path="/block/:blockId"
                    element={
                        <CodeBlock />
                    }
                />
            </Routes>
        </Router>
        </div>
  )
}

export default App
