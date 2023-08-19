import React from 'react'

const Button = () => {
  async function handleUser(){
    fetch("/api/user",{
        method:'POST'
    })
  }
  return (
    <button onClick={handleUser}>

    </button>
  )
}

export default Button