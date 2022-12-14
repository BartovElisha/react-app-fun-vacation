import { NavDropdown } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import Logout from "../auth/Logout";

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
                        <NavLink to="/vacations" className="nav-link">
                            Vacations
                        </NavLink>
                    </li>
                    <li className="nav-item me-3">
                        <NavLink to="/about" className="nav-link">
                            About
                        </NavLink>
                    </li>

                    <NavDropdown title={<i className="bi bi-people"></i>} id="basic-nav-dropdown">
                        <NavDropdown.Item href="#">
                            <li className="nav-item">
                                <NavLink to="/signUp" className="nav-link text-dark">
                                    Sign Up
                                </NavLink>
                            </li>
                        </NavDropdown.Item>
                        <NavDropdown.Item href="#">
                            <li className="nav-item">
                                <NavLink to="/login" className="nav-link text-dark">
                                    Login
                                </NavLink>
                            </li>
                        </NavDropdown.Item>
                        <NavDropdown.Item href="#">
                            <li className="nav-item">
                                <Logout />
                            </li>                        
                        </NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#">
                            <li className="nav-item me-3">
                                <NavLink
                                    className="nav-link text-dark"
                                    aria-current="page"
                                    to="/admin"
                                >
                                    Admin Only
                                </NavLink>
                            </li> 
                        </NavDropdown.Item>
                    </NavDropdown>
                    {/* <li className="nav-item me-3">
                        <NavLink to="/signUp" className="nav-link">
                            Sign Up
                        </NavLink>
                    </li> */}
                    {/* <li className="nav-item me-3">
                        <NavLink to="/login" className="nav-link">
                            Login
                        </NavLink>
                    </li> */}
                    {/* <li className="nav-item me-3">
                        <Logout />
                    </li> */}
                    {/* <li className="nav-item me-3">
                        <NavLink
                            className="nav-link"
                            aria-current="page"
                            to="/admin"
                        >
                            Admin Only
                        </NavLink>
                    </li>   */}
                </ul>
            </div>  
        </nav>
    );
}

export default Navbar;