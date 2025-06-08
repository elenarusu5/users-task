import { useState, useEffect } from "react"
import { fetchUsers } from "./thunks/users"
import Modal from "./components/Modal"
import UserCard from "./components/UserCard"

function App() {
  const [users, setUsers] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [userDetails, setUserDetails] = useState({})

  useEffect(() => {
    fetchUsers()
      .then((data) => {
        setUsers(data?.results)
      })
  }, [])

  const handleModal = (user) => {
    setShowModal(true)
    setUserDetails(user)
  }

  return (
    <div className="p-4">
      <p className="my-5 text-xl font-bold">Random Users:</p>
      {users?.map((user) => (
        <UserCard
          user={user}
          handleModal={handleModal}
        />
      )
      )}

      {!!showModal &&
        <Modal
          onClose={() => setShowModal(false)}
        >
          <UserCard
            user={userDetails}
            details={true}
          />
        </Modal>
      }
    </div>
  )
}

export default App
