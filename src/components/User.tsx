import { useContext } from "react";
import { AppContext } from "../App";

function User() {
    const context = useContext(AppContext);
    if (!context) return <div>Error</div>;

    return (  
        <div>
            Hello {context.userName}
        </div>
    );
}

export default User;