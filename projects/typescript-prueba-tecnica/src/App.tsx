import { useEffect, useMemo, useRef, useState } from 'react'
import './App.css'
import { UserList } from './components/user-list'
import { SortBy, type IRandomUser, type User } from './types.d'

export default function App() {
  const [users, setUsers] = useState<User[]>([])
  const [showColors, setShowColors] = useState(false)
  const [sorting, setSorting] = useState<SortBy>(SortBy.NONE)
  const [filterCountry, setFilterCountry] = useState<string | null>(null)
  const originalUsers = useRef<User[]>([])

  useEffect(() => {
    fetch('https://randomuser.me/api?results=100')
      .then((res) => res.json())
      .then((res: IRandomUser) => {
        setUsers(res.results)
        originalUsers.current = res.results
      })
      .catch((err) => { console.log(err) })
  }, [])

  const toggleColors = () => {
    setShowColors(prevState => !prevState)
  }

  const toggleSortByCountry = () => {
    const newSortingValue = (sorting === SortBy.NONE) ? SortBy.COUNTRY : SortBy.NONE
    setSorting(newSortingValue)
  }

  const handleDelete = (email: string) => {
    const filteredUsers = users.filter((user) => user.email !== email)
    setUsers(filteredUsers)
  }

  const handleReset = () => {
    setUsers(originalUsers.current)
  }

  const handleChangeSort = (sort: SortBy) => {
    setSorting(sort)
  }

  const filteredUsers = useMemo(() => {
    console.log('filteredUsers')
    return (filterCountry != null && filterCountry.length > 0)
      ? users.filter(((user) => user.location.country.toLowerCase().includes(filterCountry.toLowerCase())))
      : users
  }, [users, filterCountry])

  const sortedUsers = useMemo(() => {
    console.log('sortedUsers')
    if (sorting === SortBy.NONE) return filteredUsers

    const compareProperties: Record<string, (user: User) => string> = {
      [SortBy.COUNTRY]: user => user.location.country,
      [SortBy.NAME]: user => user.name.first,
      [SortBy.LAST]: user => user.name.last
    }

    return filteredUsers.toSorted((a, b) => {
      const extractProperty = compareProperties[sorting]
      return extractProperty(a).localeCompare(extractProperty(b))
    })
  }, [filteredUsers, sorting])

  return (
    <div className='App'>
      <h1>Prueba técnica</h1>
      <header>
        <button onClick={toggleColors} type='button'>
          Rows coloring
        </button>

        <button onClick={toggleSortByCountry} type='button'>
          {sorting === SortBy.COUNTRY ? 'No sort by country' : 'Sort by country'}
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
          changeSorting={handleChangeSort}
        />
      </main>
    </div>
  )
}
