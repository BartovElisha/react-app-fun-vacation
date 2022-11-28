import { NavLink } from "react-router-dom";

function Navbar() {
    return ( 
        <nav className="navbar navbar-dark bg-dark">
            <div className="container-fluid">
                <a className="navbar-brand" href="/">
                    <i className="bi-airplane-engines me-2"></i>
                    Fun Vacation
                </a>
                <ul className="navbar-nav flex-row">
                    <li className="nav-item me-3">
                        <NavLink to="/orders" className="nav-link">
                            Order Now
                        </NavLink>
                    </li>
                    <li className="nav-item me-3">
                        <NavLink to="/About" className="nav-link">
                            About
                        </NavLink>
                    </li>
                </ul>
            </div>  
        </nav>
    );
}

export default Navbar;