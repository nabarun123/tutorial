import React, { useEffect, useState } from 'react'
import Home from './components/Home'
import About from './components/About'
import Contact from './components/Contact'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import 'bootstrap/dist/css/bootstrap.min.css';
import Checkout from './components/Checkout'

function App() {

  const [responseData, setResponseData] = useState([]);

  // Fetch data from API
  const fetchData = async () => {
    try {
      const response = await fetch('https://fakestoreapi.com/products');
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      const data = await response.json();
      setResponseData(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About responseData={responseData} />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/checkout/:productId" element={<Checkout />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App