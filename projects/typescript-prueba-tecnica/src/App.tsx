import { useEffect, useState } from 'react'
import './App.css'
import { UserList } from './components/user-list'
import { type User } from './types.d'

export default function App() {
  const [users, setUsers] = useState<User[]>([])
  const [showColors, setShowColors] = useState(false)

  useEffect(() => {
    fetch('https://randomuser.me/api?results=100')
      .then((res) => res.json())
      .then((data) => { setUsers(data.results) })
      .catch((err) => { console.log(err) })
  }, [])

  const toggleColors = () => {
    setShowColors(!showColors)
  }

  return (
    <div className='App'>
      <h1>Prueba técnica</h1>
      <header>
        <button onClick={toggleColors} type='button'>
          Rows coloring
        </button>
      </header>

      <main>
        <UserList
          users={users}
          showColors={showColors}
        />
      </main>
    </div>
  )
}
