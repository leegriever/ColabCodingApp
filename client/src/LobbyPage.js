import React from 'react'
import {useNavigate} from "react-router-dom";
import {Box, List, ListItem, ListItemText, ListItemButton, ListItemIcon} from '@mui/material';


function Lobby({blocks}) {

  const navigate = useNavigate();
  const onBlockClicked = (blockId) => {
    navigate(`/block/${blockId}`);
    
  }

  return (
    <div>  
    <h1>Choose code block</h1>
    <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        <List>
          {blocks.map((block) => (
            <ListItem key={block.id} disablePadding>
              <ListItemButton
              onClick={() => onBlockClicked(block.id)}>
              <ListItemIcon>
              </ListItemIcon>
              <ListItemText primary={block.title} />
              </ListItemButton>
              </ListItem>
          ))}
      </List>
    </Box>
    </div>
  );
}
export default Lobby;
