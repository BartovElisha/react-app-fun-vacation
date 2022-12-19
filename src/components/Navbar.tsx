import { NavDropdown } from "react-bootstrap";
import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AppContext } from "../App";
import Logout from "../auth/Logout";
import User from "./User";

function Navbar() {
    const context = useContext(AppContext);
    const isLoggedIn = context && context.userName.length > 0;

    return ( 
        <header>
            <nav className="navbar navbar-dark bg-dark">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/">
                        <i className="bi-airplane-engines me-2"></i>
                        Fun Vacation
                    </a>
                    <span className="btn text-light">
                        <User />                        
                    </span>                    
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
                        {/* SignUp, Login, Logout and Admin Only on Navbar Dropdown */}
                        <NavDropdown 
                            title={<i className="bi bi-people"></i>} 
                            id="basic-nav-dropdown">
                            {
                                !isLoggedIn &&
                                <>
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
                                </>
                            }
                            {
                                isLoggedIn &&    
                                <NavDropdown.Item href="#">
                                    <li className="nav-item">
                                        <Logout />
                                    </li>                        
                                </NavDropdown.Item>
                            }
                            {
                                context && context.isAdmin &&
                                <>
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
                                </>
                            }
                        </NavDropdown>
                        {/* SignUp, Login, Logout and Admin Only on Navbar */}
                        {/* {
                            !isLoggedIn && 
                            <>
                                <li className="nav-item me-3">
                                    <NavLink to="/signUp" className="nav-link">
                                        Sign Up
                                    </NavLink>
                                </li>
                                <li className="nav-item me-3">
                                    <NavLink to="/login" className="nav-link">
                                        Login
                                    </NavLink>
                                </li>
                            </>
                        }
                        {
                            isLoggedIn && 
                            <li className="nav-item me-3">
                                <Logout />
                            </li>
                        }
                        {
                            context && context.isAdmin && 
                            <li className="nav-item me-3">
                                <NavLink
                                    className="nav-link"
                                    aria-current="page"
                                    to="/admin"
                                >
                                    Admin Only
                                </NavLink>
                            </li>  
                        } */}
                    </ul>
                </div>  
            </nav>
            {/* <User />  */}
        </header>
    );
}

export default Navbar;