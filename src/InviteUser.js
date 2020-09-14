import React from 'react'

function InviteUser({ chat }) {
  const inviteUser = async (e) => {
    try {
      e.preventDefault()
      const publicKey = prompt('Enter the public key of a friend and send them the url.')
      await chat.invite(publicKey)
    } catch (err) {
      console.log(err)
    }
  }
  return <div className="text-right m-0"><button className='p-0 btn btn-sm btn-outline-primary' onClick={inviteUser}> <i class="fas fa-plus"></i> <i class="fas fa-user"></i> Invite User</button></div>
}

export default InviteUser
