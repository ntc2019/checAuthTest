import { useEffect, useState } from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Layout from './Components/Layout'
import ProductList from './pages/Products'
import Login from './pages/Login'
import SingleProduct from './pages/Products/SingleProduct'
import Signup from './pages/Signup'
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='products'>
            <Route index element={<ProductList />}></Route>
            <Route path=':id' element={<SingleProduct />} />
          </Route>
          <Route path='login' element={<Login />} />
          <Route path='signup' element={<Signup />} />
        </Route>
      </Routes>

    </div>
  )
}

export default App
