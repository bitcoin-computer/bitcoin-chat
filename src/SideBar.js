import React from 'react'
import { useHistory } from "react-router-dom";
import { Link } from 'react-router-dom'
import StartChat from './StartChat'
import {Button, Card, List, ListItem, Divider} from '@material-ui/core'



function SideBar({ chats, computer }) {
  const history = useHistory();
  return( 
  <div className="sidebar">
    <StartChat computer={computer}></StartChat><br />
    <List component="nav" aria-label="main chats threads" >
      {chats.map(object =>
        <ListItem fullwidth="true" key={object._id}>
          <Card className="card" fullwidth="true">
            <Button fullWidth={true} variant="outlined" size="large" color="primary" onClick={() => { history.push(`/chat/${object._id}`) }}> {object._id.substr(0, 16)} </Button>
          </Card>
          <Divider></Divider>
        </ListItem>
      )}
      
    </List>
    
    <div className="branding">
      <small>This chat runs on the</small><br />
      <small><a rel='noopener noreferrer' target="_blank" href='http:/bitcoincomputer.io'>Bitcoin Computer</a></small><br />
      <small><a rel='noopener noreferrer' target="_blank" href='https://faucet.bitcoincloud.net'>Bitcon Faucet</a></small><br />
      <small><a rel='noopener noreferrer' target="_blank" href='https://github.com/bitcoin-computer/bitcoin-chat'>Improve chat on Github</a></small>
    </div>
  </div>
  )
}

export default SideBar
