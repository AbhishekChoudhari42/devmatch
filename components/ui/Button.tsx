"use client"

import { createOrUpdateUser } from '@/client_api/api'
const Button = () => {
  async function handleUser(){
    await createOrUpdateUser({user_id:"1234",username:"aaa",location:"Pune",email:"aaa@as",bio:"bioo"})
  }
  return (
    <button onClick={handleUser}>
        create user
    </button>
  )
}

export default Button