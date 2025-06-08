const Pagination = ({ currentPage, totalPages, itemsPerPage, onItemsPerPageChange, onPageChange }) => {

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            onPageChange(page)
        }
    };

    return (
        <>
            <div className="pagination text-center py-3">
                <button
                    className={`mx-3 ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    Previous
                </button>

                {Array.from({ length: totalPages }, (_, index) =>
                    <button
                        key={index}
                        className={`mx-2 ${currentPage === index + 1 ? 'text-blue-500' : 'text-black'}`}
                        onClick={() => handlePageChange(index + 1)}
                    >
                        {index + 1}
                    </button>
                )}

                <button
                    className={`mx-3 ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''}`}
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                    Next
                </button>
            </div>
            <select
                id="items_per_page"
                className="border border-gray-300 text-gray-900 text-sm rounded-lg w-15 p-2 absolute right-40 bottom-8"
                value={itemsPerPage}
                onChange={(e) => onItemsPerPageChange(+e.target.value)}
            >
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="20">20</option>
            </select>
        </>
    )
}

export default Pagination