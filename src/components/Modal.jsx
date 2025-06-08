const Modal = ({ children, onClose }) => {

    return (
        <div className="relative z-10" aria-labelledby="dialog-title" role="dialog" aria-modal="true" onClick={onClose}>
            <div className="fixed inset-0 bg-gray-500/75 transition-opacity" aria-hidden="true"></div>

            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                        <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                            <div className="absolute top-0 right-0 pt-4 pr-4 w-10 h-10 cursor-pointer" onClick={onClose}>
                                <svg viewPort="0 0 12 12" version="1.1" xmlns="http://www.w3.org/2000/svg">
                                    <line x1="1" y1="11" x2="11" y2="1" stroke="black" stroke-width="2" />
                                    <line x1="1" y1="1"x2="11" y2="11"stroke="black" stroke-width="2" />
                                </svg>
                            </div>
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Modal
