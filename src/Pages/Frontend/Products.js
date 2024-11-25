import React, { useCallback, useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
// ------------- FireBase ------------- 
import { collection, getDocs } from "firebase/firestore";
import { fireStore } from 'Config/firebase';
import Loader from 'Components/ProductLoader/Loader';
import { message } from 'antd';

export default function Products() {

  const [products, setProducts] = useState([])
  const [isProcessing, setIsProcessing] = useState(false)
  let cartArray = []

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
    });
    setProducts(array)
    setIsProcessing(false)
  })


  useEffect(() => {
    fetchData()

  }, [])


  const handleCart = async (product) => {
    localStorage.setItem("product-detail", JSON.stringify(product))
  }

  return (
    <main>
      <h1 className="text-center my-5 fw-bold">
        All Products
      </h1>
      {
        isProcessing
          ?
          <Loader />
          :
          products.length == 0
            ?
            <h1 className='text-center fw-bold '>
              No Products Found!
            </h1>
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
                              <Link to={!user ? "/auth/" : "/product-detail"} onClick={() => { handleCart(product) }}>
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
            </>
      }
    </main>
  )
}
