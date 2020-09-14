import React from 'react'
import { Link } from 'react-router-dom'
import StartChat from './StartChat'

function SideBar({ chats, computer }) {

  return <div className="">
    <StartChat computer={computer}></StartChat><br />
    <h6> Chat List </h6>
    {chats.map(object =>
      <small key={object._id}><Link className="btn btn-sm btn-outline-info btn-block" to={`/chat/${object._id}`}>{object._id.substr(0, 16)}</Link><br /></small>
    )}
    <div className="branding">
      <small>This chat runs on the</small><br />
      <small><a className="clear" href='http:/bitcoincomputer.io'>Bitcoin Computer</a></small><br />
      <small><a className="clear" href='https://github.com/bitcoin-computer/bitcoin-chat'>Improve chat on Github</a></small>
    </div>
  </div>
}

export default SideBar
