function AdminOnly() {
    const admin = localStorage.getItem('admin');

    if (admin === "true") {
        return (
            <h2 className="text-center">
                You've reached the Administartor page.
            </h2>
        )
    }

    return (
        <div className="text-danger">
            Forbidden
        </div>
    );
}

export default AdminOnly;