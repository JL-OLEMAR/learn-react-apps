import { SortBy, type User } from '../types.d'

interface Props {
  deleteUser: (email: string) => void
  changeSorting: (sort: SortBy) => void
  users: User[]
  showColors: boolean
}

export function UserList({ users, showColors, deleteUser, changeSorting }: Props) {
  return (
    <table width='100%'>
      <thead>
        <tr>
          <th>Photo</th>
          <th className='pointer' onClick={() => { changeSorting(SortBy.NAME) }}>Name</th>
          <th className='pointer' onClick={() => { changeSorting(SortBy.LAST) }}>Last name</th>
          <th className='pointer' onClick={() => { changeSorting(SortBy.COUNTRY) }}>Country</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody className={showColors ? 'table--showColors' : ''}>
        {
          users.map((user) => {
            return (
              <tr key={user.email}>
                <td>
                  <img src={user.picture.thumbnail} alt={user.name.first} />
                </td>
                <td>{user.name.first}</td>
                <td>{user.name.last}</td>
                <td>{user.location.country}</td>
                <td>
                  <button onClick={() => { deleteUser(user.email) }} type='button'>Delete</button>
                </td>
              </tr>
            )
          })
        }
      </tbody>
    </table>
  )
}
