import { useState, useEffect } from "react"
import { fetchUsers } from "./thunks/users"

function App() {
  const [users, setUsers] = useState([])

  useEffect(() => {
    fetchUsers()
      .then((data) => {
        setUsers(data?.results)
      })
  }, [])

  return (
    <div className="mx-5 max-w-xl p-4">
      <p className="my-5 text-xl font-bold">Random Users:</p>
      {users?.map((user) => (
        <div key={user?.login?.uuid} className="user-card flex items-center gap-3 mb-5">
          <img className="rounded-full" src={user.picture.medium} alt={`${user.name.first} ${user.name.last}`} />
          <div className="user-info">
            <p className="m-0 font-bold">{`${user.name.first} ${user.name.last}`}</p>
            <a href={`mailto:${user.email}`}>{user.email}</a>
          </div>
        </div>
      )
      )}
    </div>
  )
}

export default App
