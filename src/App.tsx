import React from 'react'
import {
  Routes,
  Route,
} from "react-router-dom";
import { ShoppingCartProvider } from './context/ShopCartContext'
import Home from './pages/Home'
import About from './pages/About'
import Store from './pages/Store'
import Navbar from './components/Navbar'
import Container from 'react-bootstrap/Container';
function App() {
  return (
    <>
      <ShoppingCartProvider>
        <Navbar></Navbar>
        <Container className='mb-4'>
          <Routes>
            <Route path='/' element={<Home />}></Route>
            <Route path='/about' element={<About />}></Route>
            <Route path='/store' element={<Store />}></Route>
          </Routes>
        </Container>
      </ShoppingCartProvider>
    </>
  )
}

export default App