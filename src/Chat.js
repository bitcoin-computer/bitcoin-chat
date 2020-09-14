import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import InviteUser from './InviteUser'
import './App.css'
import SideBar from './SideBar'
import useInterval from './useInterval'

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

  const [chats, setChats] = useState([])

  useInterval(() => {
    const refresh = async () => {
      if (computer) {
        const revs = await computer.getRevs(computer.db.wallet.getPublicKey().toString())
        setChats(await Promise.all(revs.map(
          async rev => computer.sync(rev))
        ))
      }
    }
    refresh()
  }, 3000)

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

  return <div>
    <div class="container">
      <div class="row">
        <div class="col-sm-2">
        <SideBar computer={computer} chats={chats} ></SideBar>
        </div>
        <div class="col-sm-10">
          <InviteUser chat={chat}></InviteUser><br />
          <div className='card'>
            <ul className="list-group">
<li  className="list-group-item" >Messages in {chat._id}</li>
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