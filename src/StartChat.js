import React from 'react'
import { useHistory } from 'react-router-dom'
import ChatSc from './chat-sc'
import {Button} from '@material-ui/core'

function StartChat({ computer }) {
  const history = useHistory()

  const createChat = async (e) => {
    try {
      e.preventDefault()
      const publicKey = computer.db.wallet.getPublicKey().toString()
      const chat = await computer.new(ChatSc, [publicKey])
      history.push(`/chat/${chat._id}`)
      console.log('Created chat with id', chat._id)
    } catch (err) {
      if(err.message.startsWith('Insufficient balance in address'))
        alert('You have to fund your wallet https://faucet.bitcoincloud.net/')
    }

  }
  return <div><Button variant="contained" color="secondary" onClick={createChat}>Create Chat</Button></div>
}

export default StartChat
