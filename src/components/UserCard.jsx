import moment from "moment"

const UserCard = ({ user, handleModal, details = false }) => {
    return (
        <div
            className={`user-card
                ${details
                    ? 'p-4'
                    : 'flex items-center gap-3 cursor-pointer hover:bg-gray-100 p-2 rounded-lg w-md'
                }`}
            onClick={() => !details && handleModal(user)}
        >
            {!details ? (
                <>
                    <img className="rounded-full" src={user.picture.thumbnail} alt={`${user.name.first} ${user.name.last}`} />
                    <div className="user-info">
                        <p className="m-0 font-bold">{`${user.name.first} ${user.name.last}`}</p>
                        <p className="m-0 text-gray-500 text-sm">{user.email}</p>
                    </div>
                </>
            ) : (
                <>
                    <img className="rounded-full mb-3 mx-auto" src={user.picture?.large} alt={`${user.name?.first} ${user.name?.last}`} />
                    <h2 className="text-lg font-bold mb-5 text-center">{`${user?.name.title} ${user.name?.first} ${user.name?.last}`}</h2>
                    <p className="mb-1"><strong>Username:</strong> {user.login.username}</p>
                    <p className="mb-1"><strong>Gender:</strong> {user.gender}</p>
                    <p className="mb-1"><strong>Birth date:</strong> {moment(user.dob.date).format("DD.MM.YYYY")}</p>
                    <p className="mb-1"><strong>Nationality:</strong> {user.nat}</p>
                    <p className="mb-1"><strong>Email:</strong> <a href={`mailto:${user.email}`}>{user.email}</a></p>
                    <p className="mb-1"><strong>Phone:</strong> {user.phone}</p>
                    <p className="mb-1"><strong>Address:</strong>
                        {` ${user.location?.city}, ${user.location?.state}, ${user.location?.country}`} <br />
                        <span className="ml-18">street {user.location.street.name}  {user.location.street.number}</span>
                    </p>
                    <p className="mb-1"><strong>Postcode:</strong> {user.location.postcode}</p>
                </>
            )}

        </div>
    )
}

export default UserCard
