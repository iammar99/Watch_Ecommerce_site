import { useAuthContext } from 'Context/AuthContext'
import React, { useEffect, useState } from 'react'
import { message } from 'antd'

export default function ProductDetail() {

    const [product, setProduct] = useState({})
    const [quantity, setQuantity] = useState(1)
    const [total, setTotal] = useState(0)
    const { user } = useAuthContext()

    let userId = user.ID
    let id = localStorage.getItem("order-id")
    let billId
    if(!id){
         billId = Math.random().toString(36).slice(2)
         localStorage.setItem("order-id" , billId)
    }
    else{
        billId  = id
    }

    let cartArray = []
    localStorage.getItem(user.ID + "-cart")
    cartArray = localStorage.getItem(user.ID + "-cart")
    cartArray = JSON.parse(cartArray)
    if (!cartArray) {
        let array = []
        localStorage.setItem(userId + "-cart", JSON.stringify(array))
    }

    const fetchData = () => {
        setProduct(JSON.parse(localStorage.getItem("product-detail")))
    }

    useEffect(() => {
        fetchData()
    }, [])

    // ------------------------------ Add To Cart ------------------------------




    const handleCart = (e) => {
        e.preventDefault()
        // ----------------------- Check if Quantity is greater than 1 -----------------------
        if (quantity >= 1) {
            localStorage.getItem(user.ID + "-cart")
            cartArray = localStorage.getItem(user.ID + "-cart")
            cartArray = JSON.parse(cartArray)
            let newProducts = cartArray.filter((newProduct) => {
                return newProduct.id === product.id
            })
            // ----------------------- Check if Product Exist -----------------------
            if (newProducts[0] === undefined) {
                // ----------------------- Check if Quantity is 1  -----------------------
                if (quantity === 1) {
                    let productToAdd = {
                        ...product,
                        total: product.currentPrice,
                        productQuantity: 1,
                        orderId: billId
                    }
                    cartArray.push(productToAdd)
                }
                let productToAdd = {
                    ...product,
                    orderId: billId
                }
                cartArray.push(productToAdd)
                localStorage.setItem(userId + "-cart", JSON.stringify(cartArray))
                // console.log('productToAdd', productToAdd)
                message.success("Added")
                cartArray.push(billId)
            }
            else {
                message.info("Already Added")
            }
        }
    }


    // ------------------------------ Increment / Decrement in Quantity ------------------------------

    const handleIncrement = (e) => {
        e.preventDefault()
        setQuantity(quantity + 1)
        let productQuantity = quantity + 1
        setTotal((productQuantity + 1) * product.currentPrice)
        setProduct({ ...product, productQuantity, total })
    }

    const handleDecrement = (e) => {
        e.preventDefault()
        if (quantity > 1) {
            setQuantity(quantity - 1)
            let productQuantity = quantity - 1
            setTotal((productQuantity - 1) * product.currentPrice)
            setProduct({ ...product, productQuantity, total })
        }
    }
    return (
        <main>
            <h1 className="text-center my-5" style={{ "fontWeight": "bold", "fontSize": "50px" }}>
                Product Detail
            </h1>
            <div className="container">
                <div className="row">
                    <div className="col-12 col-md-6">
                        <div className="productDetail-card mx-auto">
                            <img src={product.imageUrl} alt="" />
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="productDetail-card mx-auto">
                            <h1 className="product-name" style={{ "fontWeight": "900" }}>
                                {product.title}
                            </h1>
                            <h2 className="product-Price">
                                ${product.currentPrice}
                            </h2>
                            <div className="d-flex flex-column">
                                <span>
                                    <b>
                                        Category &nbsp;&nbsp;: &nbsp;&nbsp;
                                    </b>
                                    Worn Accessories
                                </span>
                                <span>
                                    <b>
                                        Availabilty : &nbsp;&nbsp;
                                    </b>
                                    In-Stock
                                </span>
                            </div>
                            <div className="productDetail-description">
                                {product.description}
                            </div>
                            {/* ------------------------- Quantity ------------------------- */}
                            <div className="product-quantity">
                                <i className="fa-solid fa-plus" onClick={handleIncrement}></i>
                                <span>
                                    {quantity}
                                </span>
                                <i className="fa-solid fa-minus" onClick={handleDecrement}></i>
                            </div>
                            <button className="add-cart-btn" onClick={handleCart}>
                                Add To Cart
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}
