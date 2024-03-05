import React from 'react'
import { Route, Routes } from 'react-router-dom'

import Home from './Home'
import Header from 'Components/Header'
import Footer from 'Components/Footer'
import Products from './Products'
import AboutUs from './AboutUs'
import ProductDetail from './Product-detail'
// --------------------- Orders ---------------------
import PendingOrders from './Pending-orders'
import ShippedOrders from './Shipped-Orders'
import DoneOrders from './Done-Orders'
import HelpCenter from './Help-center'

export default function Frontend() {
  return (
    <>
    <Header/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/product' element={<Products/>}/>
        <Route path='/product-detail' element={<ProductDetail/>}/>
        <Route path='/about' element={<AboutUs/>}/>
        <Route path='/help-center' element={<HelpCenter/>}/>
        <Route path='/pending-orders' element={<PendingOrders/>}/>
        <Route path='/shipped-orders' element={<ShippedOrders/>}/>
        <Route path='/done-orders' element={<DoneOrders/>}/>
      </Routes>
      <Footer/>
    </>
  )
}
