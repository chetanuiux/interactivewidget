import React from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from './Component/Header';
import Homepage from './pages/Homepage';
import CoinPage from './pages/CoinPage';
const App = () => {
  return (
    <BrowserRouter>
    <div className="bg-[#14161a] text-white min-h-[100vh]">
      <Header />
  
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/coins/:id" element={<CoinPage />} />
      </Routes>
    </div>
  </BrowserRouter>
  )
}

export default App
