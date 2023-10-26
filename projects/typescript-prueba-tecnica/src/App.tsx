import { useEffect, useRef, useState } from 'react'
import './App.css'
import { UserList } from './components/user-list'
import { type User } from './types.d'

export default function App() {
  const [users, setUsers] = useState<User[]>([])
  const [showColors, setShowColors] = useState(false)
  const [sortByCountry, setSortByCountry] = useState(false)
  const [filterCountry, setFilterCountry] = useState<string | null>(null)
  const originalUsers = useRef<User[]>([])

  useEffect(() => {
    fetch('https://randomuser.me/api?results=100')
      .then((res) => res.json())
      .then((data) => {
        setUsers(data.results)
        originalUsers.current = data.result
      })
      .catch((err) => { console.log(err) })
  }, [])

  const toggleColors = () => {
    setShowColors(prevState => !prevState)
  }

  const toggleSortByCountry = () => {
    setSortByCountry(prevState => !prevState)
  }

  const handleDelete = (email: string) => {
    const filteredUsers = users.filter((user) => user.email !== email)
    setUsers(filteredUsers)
  }

  const handleReset = () => {
    setUsers(originalUsers.current)
  }

  const filteredUsers = (filterCountry != null && filterCountry.length > 0)
    ? users.filter((({ location }) => location.country.toLowerCase().includes(filterCountry.toLowerCase())))
    : users

  // sortUser asc
  const sortedUsers = sortByCountry
    ? filteredUsers.toSorted((a, b) => a.location.country.localeCompare(b.location.country))
    : filteredUsers

  return (
    <div className='App'>
      <h1>Prueba técnica</h1>
      <header>
        <button onClick={toggleColors} type='button'>
          Rows coloring
        </button>

        <button onClick={toggleSortByCountry} type='button'>
          {sortByCountry ? 'No sort by country' : 'Sort by country'}
        </button>

        <button onClick={handleReset} type='button'>
          Reset users
        </button>

        <input
          type="text"
          placeholder='Filter by country'
          onChange={(e) => { setFilterCountry(e.target.value) }}
        />
      </header>

      <main>
        <UserList
          users={sortedUsers}
          showColors={showColors}
          deleteUser={handleDelete}
        />
      </main>
    </div>
  )
}
