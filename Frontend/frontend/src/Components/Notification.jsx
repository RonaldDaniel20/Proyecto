const Notification = ( {message, className} ) => {

    return (
        <div className="container mt-5">
            <div className={className} role='alert'>
                {message}
            </div>
        </div>
    )

}

export default Notification;