import React, { useState, createContext, useReducer, useContext, useEffect , useCallback } from 'react'
// ----------------------------- Firebase -----------------------------
import {  collection, getDocs } from "firebase/firestore";
import { fireStore } from 'Config/firebase';


export const CartContext = createContext()


const CartContextProvider = ({ children }) => {
    const user = JSON.parse(localStorage.getItem("User"))

    const [cart, setCart] = useState([])
    const [order , setOrder] = useState([])


    const fetchData = useCallback(async () => {
        // setIsLoading(true)
        let array = []
        let orderedProducts = []
    
        const querySnapshot = await getDocs(collection(fireStore, "Orders"));
        querySnapshot.forEach((doc) => {
          let data = doc.data()
          array.push(data)
        });
        setOrder(array)
    
        let myProducts
        let length = array.length
        for (let i = 0; i < length; i++) {
          orderedProducts.push(...array[i].products)
        }
        setOrder(orderedProducts)
        myProducts = orderedProducts.filter((product) => {
          return product.createdBy === user.ID
        })
        setOrder(myProducts)
      })


    useEffect(() => {
        if (user) {
            setCart(JSON.parse(localStorage.getItem(user.ID + '-cart')) || [])
            fetchData()
        }
    }, [])


    return (
        <>
            <CartContext.Provider value={{ cart, setCart ,order , setOrder , fetchData}}>
                {children}
            </CartContext.Provider>
        </>
    )
}

export const useCartContext = () => useContext(CartContext)

export { CartContextProvider }