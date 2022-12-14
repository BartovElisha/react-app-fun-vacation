import { useNavigate } from "react-router-dom";
// import { removeToken } from "./tokenMenagment";

function Logout() {
    const navigate = useNavigate();

    function handleLogout() {
        // removeToken();
        localStorage.clear();  // Logout + clear Admin.
        navigate('/login');
    }

    return (
        <a
            onClick={handleLogout}
            className="nav-link btn text-dark text-left"
        >
            LogOut
        </a>
    );
}

export default Logout;