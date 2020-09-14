import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import InviteUser from './InviteUser'
import './App.css'

function Chat({ computer }) {
  const [message, setMessage] = useState('')
  const [chat, setChat] = useState({ messages: [] })
  const [refresh, setRefresh] = useState(null)

  const { id } = useParams()


  useEffect(() => {
    const refreshChat = async () => {
      if(computer && id) {
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
    try {
      await chat.post(line)
      console.log(`Sent message ${line}\n  chat id  ${chat._id}\n  chat rev ${chat._rev}`)
      setMessage('')
    } catch (err) {
      console.log(err)
    }
  }

  const GetChatName = () => {
    console.log(chat._id)
    if (chat._id < 1){
      return <span> Loading ... </span> 
    }
    else { return <span>{chat._id}</span> }
  }

  function MessagesList(chat){
    if(chat.messages && chat.messages.length > 0 )
    {
      let message_list = chat.messages.map((value, index) => {
        return <li  className="list-group-item" key={index}>{value}</li>
      })
      return message_list
    } else {
      return (<span> Loading....</span>)
    }

  }

  return <div>
    <div class="">
      <div class="row">
        <div class="col-sm-0">
        
        </div>
        <div class="col-sm-12">
          <InviteUser chat={chat}></InviteUser><br />
          <div className='card'>
            <ul className="list-group">
              <li  className="list-group-item" >Messages in <GetChatName /></li>
              {chat.messages.map((value, index) => {
                return <li  className="list-group-item" key={index}>{value}</li>
              })}
            </ul>
          </div>
          <br/>
          <div class="container">
          <div class="row">
          <div class="col-sm-12">
            <form onSubmit={send}>
              <div class="input-group mb-3">
                <div class="input-group-prepend">
                  <span class="input-group-text" id="basic-addon1"><i class="fas fa-envelope"></i></span>
                </div>
                <input type="string" class="form-control" placeholder="Your message...." aria-label="Username" aria-describedby="basic-addon1" value={message} onChange={(e) => setMessage(e.target.value)}/>
              </div>
              <button type="submit" className="btn btn-outline-primary btn-md pull-right"><i class="far fa-paper-plane"></i> Send</button>
            </form>
            </div>
          </div>
          </div>
        </div>
      </div>
    </div>
    
    
  </div>
}

export default Chat