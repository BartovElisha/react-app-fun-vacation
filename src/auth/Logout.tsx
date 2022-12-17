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
        <button
            onClick={handleLogout}
            className="btn btn-link nav-link text-dark"
        >
            LogOut
        </button>
    );
}

export default Logout;