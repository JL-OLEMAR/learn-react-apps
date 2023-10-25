import { useEffect, useState } from 'react'
import './App.css'
import { type User } from './types.d'

export default function App() {
  const [users, setUsers] = useState<User[]>([])

  useEffect(() => {
    fetch('https://randomuser.me/api?results=100')
      .then((res) => res.json())
      .then((data) => { setUsers(data.results) })
      .catch((err) => { console.log(err) })
  }, [])

  return (
    <div className='App'>
      <h1>Prueba técnica</h1>
      {
        JSON.stringify(users)
      }
    </div>
  )
}
