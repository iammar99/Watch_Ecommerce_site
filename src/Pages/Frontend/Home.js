import React, { useCallback, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
// ------------- FireBase ------------- 
import { collection, getDocs } from "firebase/firestore";
import { fireStore } from 'Config/firebase';
// ------------------------ Carousal ------------------------
import { Carousel } from 'antd'
import img1 from "../../Assets/carousalimg1.png"
import img2 from "../../Assets/carousalimg2.png"
import img3 from "../../Assets/carousalimg3.png"
import Loader from 'Components/ProductLoader/Loader';
// ------------------------ Customer images ------------------------
import customer1 from "../../Assets/customer1.jpg"
import customer2 from "../../Assets/customer2.jpg"
import customer3 from "../../Assets/customer3.jpg"




export default function Home() {

    const [products, setProducts] = useState([])
    const [isProcessing, setIsProcessing] = useState(false)

    let user = localStorage.getItem("User")
    if (user) {
      user = JSON.parse(user)
      let userId = user.ID
    }

    const fetchData = useCallback(async () => {
        let array = []
        setIsProcessing(true)
        const querySnapshot = await getDocs(collection(fireStore, "Products",));
        querySnapshot.forEach((doc) => {
            let data = doc.data()
            array.push(data)
            setIsProcessing(false)
        });
        let arrayToAdd = []
        for (let i = 0; i < 3; i++) {
            arrayToAdd.push(array[i])
        }
        setProducts(arrayToAdd)
    })

    useEffect(() => {
        fetchData()
    }, [])


    const handleCart = async (product) => {
        if(user){
            localStorage.setItem("product-detail", JSON.stringify(product))
        }
    }

    return (
        <main>
            {/* ------------------ Carousal -------------- */}

            {/* <Carousel autoplay autoplaySpeed={3000}>
                <div>
                    <h3 style={contentStyle}>
                    <img src={img1} className='' alt="" />
                    </h3>
                </div>
                <div>
                    <h3 style={contentStyle}>
                    <img src={img2} className='' alt="" />
                    </h3>
                </div>
                <div>
                    <h3 style={contentStyle}>
                    <img src={img3} className=''style={{"width":"1440px"}} alt="" />
                    </h3>
                </div>
            </Carousel> */}

            {/* -------------- Top Products -------------- */}

            <h1 className="text-center my-5" style={{"fontWeight":"900","fontSize":"50px"}}>
                Top Products
            </h1>

            {
                isProcessing
                    ?
                    <Loader />
                    :
                    <>
                        <div className="container">
                            <div className="row">
                                {
                                    products.map((product, i) => {
                                        return (
                                            <div className="col-12  col-md-6 col-lg-4" key={i}>
                                                <div className="card" >
                                                    <div className="imgBox">
                                                        <img
                                                            src={product.imageUrl}
                                                        />
                                                    </div>
                                                    <div className="contentBox">
                                                        <h3>{product.title}</h3>
                                                        <h2 className="price">
                                                            ${product.currentPrice}
                                                        </h2>
                                                        <Link to={!user?"/auth/":"/product-detail"} onClick={() => { handleCart(product) }}>
                                                            <button className="buy" >
                                                                Product Details
                                                            </button>
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                        <div className="container d-flex justify-content-center">
                            <Link to={"/product"}>
                                <button className="browse-btn mx-auto">
                                    Browse More
                                </button>
                            </Link>
                        </div>
                    </>
            }

            {/* -------------------------------- container for image -------------------------------- */}

            <div className="container-fluid my-5">
                <div className="row">
                    <div className="col-12 col-lg-6 p-0">
                        <img src={img1} style={{ "width": "100%", "height": "-webkit-fill-available" }} alt="" className="image-fluid" />
                    </div>
                    <div className="col-12 col-lg-6 text-col">
                        <h1 className="add-heading">
                            BEST SMART WATCH MANUFACTURER
                        </h1>
                        <p className="my-3">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis corrupti asperiores error labore fugiat neque!
                        </p>
                        <p className="my-3">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis corrupti asperiores error labore fugiat neque!
                        </p>
                        <div className="container d-flex justify-content-center">
                            <Link to={"/product"}>
                                <button className="browse-btn mx-auto">
                                    Browse More
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* -------------- Customer Review -------------- */}

            <h1 className="text-center my-5 reviewMain-heading">
                COSTUMER REVIEWS
            </h1>
            <div className="container">
                <div className="row">
                    <div className="col-12 col-md-6 col-lg-4">
                        <div className="home-card card-1">
                            <p className="review-heading">
                                What our Client Says
                            </p>
                            <div className="main-review">
                                <div className="intro-container">
                                    <div className="img-box">
                                        <img src={customer1} alt="" />
                                    </div>
                                    <div className='d-flex flex-column ms-2'>
                                        <b>
                                            Michel Clark
                                        </b>
                                        <div className="mt-2 ms-2" style={{ "color": "#ffa700" }}>
                                            ★★★★★
                                        </div>
                                    </div>
                                </div>
                                <p className="review">
                                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nostrum, repellendus.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-6 col-lg-4">
                        <div className="home-card card-2">
                            <p className="review-heading">
                                What our Client Says
                            </p>
                            <div className="main-review">
                                <div className="intro-container">
                                    <div className="img-box">
                                        <img src={customer2} alt="" />
                                    </div>
                                    <div className='d-flex flex-column ms-2'>
                                        <b>
                                            Lissa may
                                        </b>
                                        <div className="mt-2 ms-2" style={{ "color": "#ffa700" }}>
                                            ★★★★★
                                        </div>
                                    </div>
                                </div>
                                <p className="review">
                                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nostrum, repellendus.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-6 col-lg-4">
                        <div className="home-card card-3">
                            <p className="review-heading">
                                What our Client Says
                            </p>
                            <div className="main-review">
                                <div className="intro-container">
                                    <div className="img-box">
                                        <img src={customer3} alt="" />
                                    </div>
                                    <div className='d-flex flex-column ms-2'>
                                        <b>
                                            Mike Henry
                                        </b>
                                        <div className="mt-2 ms-2" style={{ "color": "#ffa700" }}>
                                            ★★★★★
                                        </div>
                                    </div>
                                </div>
                                <p className="review">
                                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nostrum, repellendus.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            {/* -------------- Facilities -------------- */}

            <div className="container">
                <div className="row" style={{ "padding": "55px 0px" }}>
                    <div className="col-lg-3 col-md-6 col-sm-12  pt-5">
                        <i className="fa-solid fa-truck" style={{ "fontSize": "xxx-large", "color": "#57667e" }}></i>
                        <h6 className='mt-4'>
                            Fast & Free Delivery
                        </h6 >
                        <p>Free Delivery on all orders

                        </p>
                    </div>
                    <div className="col-lg-3 col-md-6 col-sm-12 pt-5">
                        <i className="fa-solid fa-credit-card" style={{ "fontSize": "xxx-large", "color": "#57667e" }}></i>
                        <h6 className='mt-4'>
                            Secure Payment
                        </h6 >
                        <p>Free Delivery on all orders</p>
                    </div>
                    <div className="col-lg-3 col-md-6 col-sm-12 pt-5">
                        <i className="fa-solid fa-money-bill-transfer" style={{ "fontSize": "xxx-large", "color": "#57667e" }}></i>
                        <h6 className='mt-4'>
                            Money Back Guarantee
                        </h6 >
                        <p>Free Delivery on all orders</p>
                    </div>
                    <div className="col-lg-3 col-md-6 col-sm-12 pt-5">
                        <i className="fa-solid fa-clock-rotate-left" style={{ "fontSize": "xxx-large", "color": "#57667e" }}></i>
                        <h6 className='mt-4'>
                            Online Support
                        </h6 >
                        <p>Free Delivery on all orders</p>
                    </div>
                </div>
            </div>
        </main>
    )
}
