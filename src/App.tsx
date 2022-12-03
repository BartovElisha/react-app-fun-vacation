import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import './App.css';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import About from './pages/About/About';
import Home from './pages/Home/Home';
import Orders from './pages/Orders/Orders';
import Vacations from './pages/Vacations/Vacations';

function App() {
  return (
        <>
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
                    element={<Vacations />}
                />              
                <Route 
                    path="/about"
                    element={<About />}
                />              
            </Routes>
            
            <Footer />      
        </>
  );
}

export default App;
