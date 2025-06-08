import { useState, useEffect } from "react"
import { fetchUsers } from "./thunks/users"
import Modal from "./components/Modal"
import UserCard from "./components/UserCard"
import Pagination from "./components/Pagination"
import './assets/styles/styles.scss'

function App() {
  const [users, setUsers] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [userDetails, setUserDetails] = useState({})
  const [itemsPerPage, setItemsPerPage] = useState(5)
  const [currentPage, setCurrentPage] = useState(1)

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

  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentItems = users.slice(startIndex, endIndex);

  return (
    <div className="container mx-auto p-4">
      <p className="my-5 text-xl font-bold">Random Users:</p>
      <div className="users-list overflow-y-auto">
        {currentItems?.map((user) => (
          <UserCard
            user={user}
            handleModal={handleModal}
            key={user?.login?.uuid}
          />
        )
        )}
      </div>
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

      <Pagination
        totalPages={Math.ceil(users.length / itemsPerPage)}
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        onItemsPerPageChange={(value) => {
          setItemsPerPage(value)
          if (currentPage > Math.ceil(users.length / value)) {
            setCurrentPage(Math.ceil(users.length / value))
          }
        }}
        onPageChange={(page) => {
          setCurrentPage(page)
        }}
      />
    </div>
  )
}

export default App
