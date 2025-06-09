import { useState, useEffect } from "react"
import useBreakpoint from "./hooks/useBreakpoint"
import { fetchUsers } from "./thunks/users"
import Modal from "./components/Modal"
import UserCard from "./components/UserCard"
import Pagination from "./components/Pagination"
import SearchInput from "./components/SearchInput"
import Spinner from "./components/Spinner"
import { MOBILE } from "./constants/constants"
import './assets/styles/styles.scss'

function App() {
  const [loading, setLoading] = useState(false)
  const [users, setUsers] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [userDetails, setUserDetails] = useState({})
  const [itemsPerPage, setItemsPerPage] = useState(5)
  const [currentPage, setCurrentPage] = useState(1)
  const [inputSearch, setInputSearch] = useState("")
  const [sort, setSort] = useState({ type: "", direction: "" })

  const breakpoint = useBreakpoint()

  const isMobile = breakpoint === MOBILE

  useEffect(() => {
    setLoading(true)
    fetchUsers()
      .then((data) => {
        setUsers(data?.results || [])
        setLoading(false)
      })
  }, [])

  useEffect(() => {
    if (!!sort.type && !!sort.direction) {
      handleSort()
    }
  }, [sort.type, sort.direction])

  const handleModal = (user) => {
    setShowModal(true)
    setUserDetails(user)
  }

  const handleSort = () => {
    let sortedUsers = [...users]
    if (sort?.type === 'name') {
      sortedUsers = [...users].sort((a, b) => {
        const nameA = `${a.name.first} ${a.name.last}`.toLowerCase()
        const nameB = `${b.name.first} ${b.name.last}`.toLowerCase()
        return (
          sort?.direction === 'asc' ? nameA.localeCompare(nameB)
            : sort?.direction === 'desc' ? nameB.localeCompare(nameA)
              : nameA.localeCompare(nameB)
        )
      })
    } else if (sort?.type === 'email') {
      sortedUsers = [...users].sort((a, b) => {
        return (sort?.direction === 'asc' ? a.email.localeCompare(b.email)
          : sort?.direction === 'desc' && b.email.localeCompare(a.email))
      })
    }
    setUsers(sortedUsers)
  }

  const filteredUsers = [...users].filter((user) => {
    const fullName = `${user.name.first} ${user.name.last}`.toLowerCase()
    return (
      fullName.includes(inputSearch.toLowerCase())
      || user.email.toLowerCase().includes(inputSearch.toLowerCase())
    )
  })

  const items = inputSearch ? filteredUsers : users

  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentItems = items.slice(startIndex, endIndex)

  return (
    <div className="container mx-auto p-4 h-full">
      <div className="lg:flex lg:justify-between lg:items-center">
        <p className="lg:my-5 text-xl font-bold">Random Users:</p>
        <div className="lg:flex lg:justify-between lg:items-center lg:mr-5 lg:gap-5">
          <SearchInput
            inputSearch={inputSearch}
            setInputSearch={setInputSearch}
          />
          <div className="flex gap-2 my-4 lg:my-0">
            <select
              name="type"
              className="bg-gray-200 text-gray-900 text-sm rounded-lg block w-40 p-3 mt-2"
              value={sort.type}
              onChange={(e) => setSort(prev => ({ ...prev, type: e.target.value }))}
            >
              <option value="" selected disabled>Sort by</option>
              <option value="name">Sort by name</option>
              <option value="email">Sort by email</option>
            </select>

            <select
              name="direction"
              className="bg-gray-200 text-gray-900 text-sm rounded-lg block w-40 p-3 mt-2"
              value={sort.direction}
              onChange={(e) => setSort(prev => ({ ...prev, direction: e.target.value }))}
            >
              <option value="" selected disabled>Direction</option>
              <option value="asc">Sort by ASC</option>
              <option value="desc">Sort by DESC</option>
            </select>
          </div>
        </div>
      </div>

      {loading ? (
        <Spinner />
      ) : !currentItems?.length ? (
        <p className="text-center text-gray-500 my-5">No users found</p>
      ) : (
        <>
          <div className={`${isMobile ? 'mobile-users-list' : 'users-list'} overflow-y-auto`}>
            {currentItems?.map((user) => (
              <UserCard
                user={user}
                handleModal={handleModal}
                key={user?.login?.uuid}
              />
            ))}
          </div>
          <Pagination
            totalPages={Math.ceil(items.length / itemsPerPage)}
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
            onItemsPerPageChange={(value) => {
              setItemsPerPage(value)
              if (currentPage > Math.ceil(items.length / value)) {
                setCurrentPage(Math.ceil(items.length / value))
              }
            }}
            onPageChange={(page) => {
              setCurrentPage(page)
            }}
          />
        </>
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
    </div >
  )
}

export default App
