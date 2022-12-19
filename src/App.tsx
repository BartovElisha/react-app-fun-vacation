import { createContext, useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import './App.css';
import AdminOnly from './auth/AdminOnly';
import Login from './auth/Login';
import RouteGuard from './auth/RouteGuard';
import SignUp from './auth/SignUp';
import { setToken } from './auth/tokenMenagment';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import About from './pages/About/About';
import Edit from './pages/Edit/Edit';
import Home from './pages/Home/Home';
import Orders from './pages/Orders/Orders';
import Vacations from './pages/Vacations/Vacations';
import { postRequest } from './services/apiService';

interface ILoginData {
    email: string;
    password: string;
}

interface Context {
    userName: string;
    handleLogout: Function;
    login: Function;
    isAdmin: boolean;
}

export const AppContext = createContext<Context | null>(null);

function App() {
    // States and Hooks
    const [userName,setUserName] = useState('');  
    const [isAdmin, setIsAdmin] = useState(false);  
    const navigate = useNavigate();
    useEffect(() => {
        const name = localStorage.getItem('user');
        if(!name) return;
        setUserName(name);
    },[]);

    function handleLogout() {
        localStorage.clear();
        setUserName('');
        navigate('/login');
    }    

    function login(data: ILoginData) {
        const res = postRequest(
            'users/login',
            data,
            false
        );
        if (!res) return;

        res.then(response => response.json())
            .then(json => {
                if(json.error) {
                    toast.error(json.error, {
                            position: "top-center",
                            autoClose: 3000,
                            hideProgressBar: true,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "colored",
                            }    
                        );
                    return;
                }  
                toast.success(`User ${json.name} succsessifully Loged In`,{
                    position: "top-left",
                    autoClose: 3000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: false,
                    progress: undefined,
                    theme: "colored",
                })                              
                setToken(json.token);
                localStorage.setItem('admin', json.isAdmin);
                setIsAdmin(json.isAdmin);
                setUserName(json.name);
                navigate('/vacations');
            })
    }    

    return (
        <AppContext.Provider value={{
            userName,
            handleLogout,
            login,
            isAdmin
        }}>
            <Navbar />
            <ToastContainer />            
            <Routes>
                <Route 
                    path="/"
                    element={<Home />}
                />              
                <Route 
                    path="/orders"
                    element={<Orders />}
                />  
                <Route 
                    path="/vacations"
                    element={
                        <RouteGuard>
                            <Vacations />
                        </RouteGuard>                        
                    }
                />              
                <Route 
                    path="/about"
                    element={<About />}
                />              
                <Route 
                    path="/signup"
                    element={<SignUp />}
                />              
                <Route 
                    path="/login"
                    element={<Login handler={login}/>}
                />              
                <Route 
                    path="/edit/:id"  // Dinamic Path
                    element={
                        <RouteGuard>
                            <Edit />
                        </RouteGuard>                        
                    }
                />  
                <Route
                    path='/admin'
                    element={<AdminOnly />}
                />               
            </Routes>
            
            <Footer />      
        </AppContext.Provider>
  );
}

export default App;