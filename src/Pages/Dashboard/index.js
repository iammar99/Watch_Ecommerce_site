import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Cart from './Cart'
import Header from 'Components/Header'
import Footer from 'Components/Footer'
import Wishlist from './Wishlist'
import Profile from './Profile'
import AddProduct from './AddProduct'
import MyProducts from './MyProducts'
import Checkout from './Checkout'
import Orders from './Orders'

export default function Dashboard() {
  return (
    <>
      <Header />
      <Routes>
        <Route path='/cart' element={<Cart />} />
        <Route path='/wishlist' element={<Wishlist />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/add-product' element={<AddProduct />} />
        <Route path='/my-products' element={<MyProducts />} />
        <Route path='/checkout' element={<Checkout />} />
        <Route path='/orders' element={<Orders />} />
      </Routes>
      <Footer />
    </>
  )
}
