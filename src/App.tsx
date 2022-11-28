import { Route, Routes } from 'react-router-dom';
import './App.css';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import About from './pages/About/About';
import Home from './pages/Home/Home';
import Orders from './pages/Orders/Orders';

function App() {
  return (
        <>
            <Navbar />
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
                    path="/about"
                    element={<About />}
                />              
            </Routes>
            
            <Footer />      
        </>
  );
}

export default App;
