import React, { useEffect, useState } from 'react'
import { useAuthContext } from 'Context/AuthContext'
// ---------------------- React Responsive tables ----------------------
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table'
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css'
import { Link, useNavigate } from 'react-router-dom'
import { message } from 'antd'

export default function Cart(props) {

    const { user } = useAuthContext()
    const [cartItems, setCartItems] = useState([])
    const [TotalQuantity, setTotalQuantity] = useState(0)
    const [TotalPrice, setTotalPrice] = useState(0)
    const [subTotal, setSubTotal] = useState(0)
    const [shippingPrice, setshippingPrice] = useState(0)

    let array = []

    const fetchData = () => {
        // localStorage.getItem(user.ID + "-cart")
        array = localStorage.getItem(user.ID + "-cart")
        if (array === null) {
            localStorage.setItem(user.ID + "-cart", JSON.stringify(cartItems))
        }
        else {
            array = JSON.parse(array)
            setCartItems(array)
        }
    }


    useEffect(() => {
        fetchData()
    }, [])




    // ------------------------------ Update Coupen ------------------------------

    const handleUpdate = (e) => {
        e.preventDefault()
        if (cartItems.length === 0) {
            message.warning("Cart is Empty")
        }
        else {
            setshippingPrice(cartItems.length * 10)

            // ------------------------ Calculate total qunatity  ------------------------------ 

            let quantity = 0;
            for (let i = 0; i < cartItems.length; i++) {
                if (cartItems[i].productQuantity === undefined) {
                    cartItems[i].productQuantity = 1
                }
                quantity += cartItems[i].productQuantity
            }
            setTotalQuantity(quantity)

            // ------------------------ Calculate total price  ------------------------------

            let price = cartItems.length * 10;
            for (let i = 0; i < cartItems.length; i++) {
                if (cartItems[i].total === undefined) {
                    cartItems[i].total = Number(cartItems[i].currentPrice)
                }
                price += cartItems[i].total
            }

            setTotalPrice(price + shippingPrice)

            // ------------------------ Set Ordered BY ID & Status & dateCreated ------------------------------ 

            let updatedCart = []
            let date = new Date
            date = date.getDate()
            let year = new Date
            year = year.getFullYear()
            let day = new Date
            day = day.getDay()
            let today =  `${day}:${date}:${year}`
            for (let i = 0; i < cartItems.length; i++) {
                let item = {
                    ...cartItems[i],
                    orderedBy: user.ID ,
                    status : "pending" ,
                    dateCreated : today
                }
                updatedCart.push(item)
            }
            setCartItems(updatedCart);
            // console.log('item', updatedCart)


            message.success("Details Updated")
        }
    }


    // ------------------------------ Remove Item From Cart ------------------------------

    const handleDelete = (product) => {
        let array = []
        let newProducts = cartItems.filter((newProduct) => {
            return newProduct.id !== product.id
        })
        array = newProducts
        setCartItems(newProducts)
        localStorage.setItem(user.ID + "-cart", JSON.stringify(array))
        message.warning("Deleted")
    }

    // ------------------------------ handleCheckout ------------------------------
    const navigate = useNavigate();

    const handleCheckout = (e) => {
        e.preventDefault()
        if (TotalQuantity === 0) {
            message.error("Please Update Details")
        }
        else {

            let details = {
                TotalPrice,
                shippingPrice,
                subTotal: TotalPrice - shippingPrice
            }
            localStorage.setItem(user.ID + "-cart", JSON.stringify(cartItems))
            localStorage.setItem("checkout-details", JSON.stringify(details))
            navigate('/dashboard/checkout');
        }
    }
    return (
        <main>
            <h1 className="text-center my-5" style={{ "fontWeight": "900", "fontSize": "60px" }}>
                Cart
            </h1>
            {
                cartItems.length < 1
                    ?
                    <h1 className="text-center my-5" style={{ "fontWeight": "900", "fontSize": "60px" }}>
                        No Items in Cart
                    </h1>
                    :
                    <div className="main-container">
                        <Table className="table">
                            <Thead className="cartHeading-container">
                                <Tr>
                                    <Th>Product</Th>
                                    <Th></Th>
                                    <Th></Th>
                                    <Th>Price</Th>
                                    <Th>Quantity</Th>
                                    <Th>Total</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {
                                    cartItems.map((product, i) => {
                                        return (
                                            <Tr key={i}>
                                                <Td>
                                                    <img src={product.imageUrl} style={{ "width": "90px" }} alt="" />
                                                    <b className='ms-4' style={{ "fontSize": "20px", "fontWeight": "900" }}>{product.title}</b>
                                                </Td>
                                                <Td></Td>
                                                <Td></Td>
                                                <Td className="product-price">
                                                    {product.currentPrice}
                                                </Td>
                                                <Td className="product-price">
                                                    {
                                                        !product.productQuantity
                                                            ?
                                                            1
                                                            :
                                                            product.productQuantity
                                                    }

                                                </Td>
                                                <Td className="product-price">
                                                    {
                                                        !product.total
                                                            ?
                                                            product.currentPrice
                                                            :
                                                            product.total
                                                    }
                                                </Td>

                                                {/* --------------------  Delete Btn -------------------- */}
                                                <Td>
                                                    <i className="fa-solid fa-circle-xmark delete-btn" onClick={() => { handleDelete(product) }}></i>
                                                </Td>

                                            </Tr>
                                        )
                                    })
                                }
                            </Tbody>
                        </Table>
                    </div>
            }
            {/* ------------------------------- Update  Coupen Btn -------------------------------  */}

            <button className="update-coupen" onClick={handleUpdate}>
                Update Details
            </button>

            {/* ------------------------------- Coupen -------------------------------  */}

            <div className="checkoutDetail-container">
                <h1 className="text-center my-5" style={{ "fontWeight": "900", "fontSize": "50px" }}>
                    Cart Details
                </h1>
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <div className="detail-card">

                                {/* -------------------- Total Quantity -------------------- */}

                                <div className="d-flex justify-content-between align-items-center my-4">
                                    <h3>
                                        Quantity
                                    </h3>
                                    <h3>
                                        =
                                    </h3>
                                    <h3>
                                        {
                                            TotalQuantity
                                        }
                                    </h3>
                                </div>

                                {/* -------------------- Shipping Price -------------------- */}

                                <div className="d-flex justify-content-between align-items-center my-4">
                                    <h3>
                                        Shipping Price
                                    </h3>
                                    <h3>
                                        =
                                    </h3>
                                    <h3>
                                        {
                                            !shippingPrice
                                                ?
                                                "0"
                                                :
                                                "$" + shippingPrice
                                        }
                                    </h3>
                                </div>

                                {/* -------------------- Total Price -------------------- */}

                                <div className="d-flex justify-content-between align-items-center my-4">
                                    <h3>
                                        Total Price
                                    </h3>
                                    <h3>
                                        =
                                    </h3>
                                    <h3>
                                        {
                                            !TotalPrice
                                                ?
                                                "0"
                                                :
                                                "$" + TotalPrice
                                        }
                                    </h3>
                                </div>

                                {/* ---------------------- CheckOut btn ---------------------- */}

                                <Link to={"/dashboard/checkout"} onClick={handleCheckout}>
                                    <button className="checkout-confirmation my-4">
                                        Checkout
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}
