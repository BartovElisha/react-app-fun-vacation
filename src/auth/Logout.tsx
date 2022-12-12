import { useNavigate } from "react-router-dom";
import { removeToken } from "./tokenMenagment";

function Logout() {
    const navigate = useNavigate();

    function handleLogout() {
        removeToken();
        navigate('/login');
    }

    return (
        <a
            href="x"
            onClick={handleLogout}
            className="nav-link btn"
        >
            Log Out
        </a>
    );
}

export default Logout;