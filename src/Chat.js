import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import InviteUser from './InviteUser'
import './App.css'
import {Button, TextField, List, ListItemText} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    scrollBehavior: 'scrollY',
  },
}));

function Chat({ computer }) {
  const [message, setMessage] = useState('')
  const [chat, setChat] = useState({ messages: [] })
  const [refresh, setRefresh] = useState(null)

  const { id } = useParams()

  useEffect(() => {
    const refreshChat = async () => {
      if(computer) {
        const rev = await computer.getLatestRev(id)
        setChat(await computer.sync(rev))
      }
    }
    refreshChat()
  }, [id, computer, refresh])

  useEffect(() => {
    setTimeout(() => setRefresh(refresh + 1), 5000)
  }, [refresh])

  const send = async (e) => {
    e.preventDefault()
    const username = window.localStorage.getItem('USER_NAME')
    const line = `${username}: ${message}`
    await chat.post(line)
    console.log(`Sent message ${line}\n  chat id  ${chat._id}\n  chat rev ${chat._rev}`)
    setMessage('')
  }
  const classes = useStyles();
  return(
    <div>
      <InviteUser chat={chat}></InviteUser><br />
      <div className={classes.root}> 
      <List component="nav" aria-label="main mailbox folders">
        {chat.messages.map(function(message, i){
          return <ListItemText > {message} </ListItemText>
        })}
        </List>
      </div>
      <form onSubmit={send}>
        <TextField placeholder="Type a cool message here...." variant="filled" fullWidth="true" type="string" value={message} onChange={(e) => setMessage(e.target.value)} />
        <Button variant="contained" align="right" color="primary" type="submit">Send</Button>
      </form>
    </div>
    )
}

export default Chat
