import { useContext } from "react";
import { AppContext } from "../App";

function AdminOnly() {
    const context = useContext(AppContext);

    if (context && context.isAdmin) {
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