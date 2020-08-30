import React from 'react'
import { Link } from 'react-router-dom'
import StartChat from './StartChat'

function SideBar({ chats, computer }) {

  return <div className="sidebar">
    <StartChat computer={computer}></StartChat><br />
    {chats.map(object =>
      <small key={object._id}><Link to={`/chat/${object._id}`}>{object._id.substr(0, 16)}</Link><br /></small>
    )}
    <div className="branding">
      <small>This chat runs on the</small><br />
      <small><a href='http:/bitcoincomputer.io'>Bitcoin Computer</a></small><br />
      <small><a href='http:/bitcoincomputer.io'>Fork on Github</a></small>
    </div>
  </div>
}

export default SideBar