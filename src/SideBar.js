import React from 'react'
import { Link } from 'react-router-dom'
import StartChat from './StartChat'

function SideBar({ chats, computer }) {

  function RenderChats(){
    let chat_list = null 
    if (chats === null || chats.length ===  0 ){return(<p>Loading....</p>)}
    else {
      chat_list = chats.map(object =>
        <small key={object._id}><Link className="btn btn-sm btn-outline-info btn-block" to={`/chat/${object._id}`}>{object._id.substr(0, 6)}...{object._id.substr(object._id.length-8, object._id.length-2)}</Link><br /></small>
      )
      return chat_list
    }
  }
  return <div className="">
    
    <div className='card' style={{padding:"6px"}}>
    <StartChat computer={computer}></StartChat><br />
    <h6 className='text-center'> Chat List </h6>
      <RenderChats />
    </div>
    <hr/>
  </div>
}

export default SideBar
