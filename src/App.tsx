import React from 'react';
import './App.css';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import Home from './pages/Home';

function App() {
  return (
    <>
        <Navbar />
        <Home />
        <Footer />      
    </>
  );
}

export default App;
