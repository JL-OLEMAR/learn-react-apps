import { type User } from '../types.d'

interface Props {
  deleteUser: (email: string) => void
  users: User[]
  showColors: boolean
}

export function UserList({ users, showColors, deleteUser }: Props) {
  return (
    <table width='100%'>
      <thead>
        <tr>
          <th>Photo</th>
          <th>Name</th>
          <th>Last name</th>
          <th>Country</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {
          users.map((user, index) => {
            const backgroundColor = (index % 2 === 0) ? '#333' : '#555'
            const color = showColors ? backgroundColor : 'transparent'

            return (
              <tr key={user.email} style={{ backgroundColor: color }}>
                <td>
                  <img src={user.picture.thumbnail} alt={user.name.first} />
                </td>
                <td>{user.name.first}</td>
                <td>{user.name.last}</td>
                <td>{user.location.country}</td>
                <td>
                  <button type='button'>Edit</button>
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
