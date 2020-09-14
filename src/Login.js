import React, { useState } from 'react'
import useInterval from './useInterval'

function Login() {
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [loggedIn, setLoggedIn] = useState(false)
  const [chain, setChain] = useState('BSV')

  useInterval(() => {
    setLoggedIn(!!window.localStorage.getItem('BIP_39_KEY'))
  }, 500)

  const login = (e) => {
    e.preventDefault()
    window.localStorage.setItem('BIP_39_KEY', password)
    window.localStorage.setItem('USER_NAME', username)
    window.localStorage.setItem('CHAIN', chain)
  }

  const logout = (e) => {
    window.localStorage.removeItem('BIP_39_KEY')
    window.localStorage.removeItem('USER_NAME')
    window.localStorage.removeItem('CHAIN')
  }

  const toggleChain = (e) => {
    e.preventDefault()
    if (chain === 'BSV'){
      //set the state for the value of the chain property here
      setChain("BCH")
      //assign the chosen chain to local storage for when the computer is init'd
      window.localStorage.setItem('CHAIN', "BCH")
    } else {
      //set the state for the value of the chain property here
      setChain("BSV")
      //assign the chosen chain to local storage for when the computer is init'd
      window.localStorage.setItem('CHAIN', "BSV")
    }
  }

  return loggedIn
    ? <><button className="btn-sm btn-danger" onClick={logout}>
        Logout
      </button><br /></>
    : <div className='login-screen'>
        <div id="">
          <div className="card center">
            <h2 className="margin-auto"> Chat - By Bitcoin Computer </h2>
            {/* Use the state of this component to determine which button should be toggled */}
            <div class='row'>
              <div class='col-md-4'>
                <button className={chain === 'BSV' ? 'btn btn-warning' : 'btn btn-secondary'} onClick={toggleChain} > BSV </button>
                
              </div>
              <div class='col-md-4'>
              <button className={chain === 'BCH' ? 'btn btn-success' : 'btn btn-secondary'} onClick={toggleChain}> BCH </button>
              </div>
              <div class='col-md-4'></div>
            </div>
            <form onSubmit={login}>
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                <span class="input-group-text" id="basic-addon1">@</span>
              </div>
              <input type="string" class="form-control" placeholder="Username (can be aything)" aria-label="Username" aria-describedby="basic-addon1" value={username} onChange={(e) => setUsername(e.target.value)}/>
            </div>
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                <span class="input-group-text" id="basic-addon1"><i class="fas fa-key"></i></span>
              </div>
              <input type="string" class="form-control" placeholder="Password (BIP39 Generated Seed Phrase)" aria-label="Username" aria-describedby="basic-addon1" value={password} onChange={(e) => setPassword(e.target.value)}/>
            </div>
            <button type="submit" className="button">Login</button>

          </form>
          <div> Need A Seed (Password?) <a _target="blank" href='http://accounts.protoshi.com'>Click Here</a></div>
          </div>
        </div>
      </div>
}

export default Login
