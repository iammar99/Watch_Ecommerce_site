import React, { useCallback, useEffect, useState } from 'react'
// ----------------------------- Firebase -----------------------------
import { doc, collection, getDocs, setDoc, query, where } from "firebase/firestore";
import { fireStore } from 'Config/firebase';
import { useAuthContext } from 'Context/AuthContext';
import Loader from 'Components/ProductLoader/Loader';
import { message } from 'antd';
import SmallBtnLoader from 'Components/ButtonLoader/SmallBtnLoader';

export default function Orders() {

  const { user } = useAuthContext()
  const [orders, setOrders] = useState([])
  const [wholeOrders, setWholeOrders] = useState([])
  // =========================== Product Loader ===========================
  const [isLoading, setIsLoading] = useState(false)




  const fetchData = useCallback(async () => {
    setIsLoading(true)
    let array = []
    let orderedProducts = []

    const querySnapshot = await getDocs(collection(fireStore, "Orders"));
    querySnapshot.forEach((doc) => {
      let data = doc.data()
      array.push(data)
    });
    setWholeOrders(array)

    let myProducts
    let length = array.length
    for (let i = 0; i < length; i++) {
      orderedProducts.push(...array[i].products)
    }
    setOrders(orderedProducts)
    myProducts = orderedProducts.filter((product) => {
      return product.createdBy === user.ID
    })
    setOrders(myProducts)
    setIsLoading(false)
  })


  useEffect(() => {
    fetchData()
  }, [])


  const handlePending = async (order) => {

    // ------------------------- Get Desired Document -------------------------

    let documentToUpdate = wholeOrders.filter((item) => {
      return item.id === order.orderId
    })

    // ------------------------- Get All Product Of That Document -------------------------

    let allProducts = []

    for (let i = 0; i < documentToUpdate.length; i++) {
      allProducts.push(...documentToUpdate[i].products)
    }

    // ------------------------- Get That Product To update -------------------------

    let productToUpdate = allProducts.filter((item) => {
      return item.id === order.id
    })


    // ------------------------- Get All other Products of that document -------------------------

    let otherProduct = allProducts.filter((item) => {
      return item.id !== order.id
    })

    // ------------------------- Update Status of  That Product  -------------------------

    productToUpdate[0].status = "pending"

    // ------------------------- Update Document  of  That Product with updated status  -------------------------

    let product = { ...documentToUpdate[0] }
    await setDoc(doc(fireStore, "Orders", product.id), product);

    // ------------------------- Update Document  -------------------------

    let orderedProducts = []
    for (let i = 0; i < wholeOrders.length; i++) {
      orderedProducts.push(...wholeOrders[i].products)
    }
    let myProducts = orderedProducts.filter((product) => {
      return product.createdBy === user.ID
    })
    setOrders(myProducts)
    
    message.success("Status Updated")
  }


  const handleShipping = async (order) => {

    // ------------------------- Get Desired Document -------------------------

    let documentToUpdate = wholeOrders.filter((item) => {
      return item.id === order.orderId
    })

    // ------------------------- Get All Product Of That Document -------------------------

    let allProducts = []

    for (let i = 0; i < documentToUpdate.length; i++) {
      allProducts.push(...documentToUpdate[i].products)
    }

    // ------------------------- Get That Product To update -------------------------

    let productToUpdate = allProducts.filter((item) => {
      return item.id === order.id
    })


    // ------------------------- Get All other Products of that document -------------------------

    let otherProduct = allProducts.filter((item) => {
      return item.id !== order.id
    })

    // ------------------------- Update Status of  That Product  -------------------------

    productToUpdate[0].status = "shipping"

    // ------------------------- Update Document  of  That Product with updated status  -------------------------

    let product = { ...documentToUpdate[0] }
    await setDoc(doc(fireStore, "Orders", product.id), product);

    // ------------------------- Update Document  -------------------------

    let orderedProducts = []
    for (let i = 0; i < wholeOrders.length; i++) {
      orderedProducts.push(...wholeOrders[i].products)
    }
    let myProducts = orderedProducts.filter((product) => {
      return product.createdBy === user.ID
    })
    setOrders(myProducts)
    message.success("Status Updated")
    

  }


  const handleDone = async (order) => {

    // ------------------------- Get Desired Document -------------------------

    let documentToUpdate = wholeOrders.filter((item) => {
      return item.id === order.orderId
    })

    // ------------------------- Get All Product Of That Document -------------------------

    let allProducts = []

    for (let i = 0; i < documentToUpdate.length; i++) {
      allProducts.push(...documentToUpdate[i].products)
    }

    // ------------------------- Get That Product To update -------------------------

    let productToUpdate = allProducts.filter((item) => {
      return item.id === order.id
    })


    // ------------------------- Get All other Products of that document -------------------------

    let otherProduct = allProducts.filter((item) => {
      return item.id !== order.id
    })

    // ------------------------- Update Status of  That Product  -------------------------

    productToUpdate[0].status = "done"

    // ------------------------- Update Document  of  That Product with updated status  -------------------------

    let product = { ...documentToUpdate[0] }
    await setDoc(doc(fireStore, "Orders", product.id), product);

    // ------------------------- Update Document  -------------------------

    let orderedProducts = []
    for (let i = 0; i < wholeOrders.length; i++) {
      orderedProducts.push(...wholeOrders[i].products)
    }
    let myProducts = orderedProducts.filter((product) => {
      return product.createdBy === user.ID
    })
    setOrders(myProducts)
    message.success("Status Updated")
    

  }


  return (
    <main>
      <h1 className="text-center my-5" style={{ "fontSize": "50px", "fontWeight": "900" }}>
        Orders
      </h1>
      {
        isLoading
          ?
          <Loader />
          :
          <>
            {
              orders.length === 0
                ?
                <h2 className="text-center my-4">
                  No orders Yet
                </h2>
                :
                <div className="container my-5">
                  <div className="row">
                    {
                      orders.map((order, i) => {
                        return (
                          <div className="col-12 col-md-6 col-lg-3" key={i}>
                            <div className="order-diplay-card my-4" >

                              {/* ------------------- Sr # ------------------- */}

                              <h3 className='order-number'>
                                {i + 1}
                              </h3>

                              {/* ------------------- Title ------------------- */}

                              <div className="order-title my-3">
                                {order.title}
                              </div>

                              {/* ------------------- Title ------------------- */}

                              <div className="order-img">
                                <img src={order.imageUrl} alt="" />
                              </div>

                              {/* ------------------- Quantity ------------------- */}

                              <div className="order-quantity">
                                <span>
                                  <b>
                                    Quantity :
                                  </b>
                                </span>
                                &nbsp;
                                <span>
                                  {
                                    !order.productQuantity
                                      ?
                                      "1"
                                      :
                                      order.productQuantity
                                  }
                                </span>
                              </div>


                              {/* ------------------- Total ------------------- */}

                              <div className="total-price">
                                <span>
                                  <b>
                                    Total :
                                  </b>
                                </span>
                                &nbsp;
                                <span>$
                                  {
                                    !order.total
                                      ?
                                      order.currentPrice
                                      :
                                      order.total
                                  }
                                </span>
                              </div>


                              {/* ------------------- Date Created ------------------- */}

                              <div className="date-created">
                                <span>
                                  <b>
                                    Date Ordered :
                                  </b>
                                </span>
                                &nbsp;
                                <span>
                                  {
                                    order.dateCreated
                                  }
                                </span>
                              </div>

                              {/* ----------------------- status ----------------------- */}

                              <div className="order-status">
                                <span>
                                  <b>Status :</b>
                                </span>
                                &nbsp;
                                <span style={{ "textTransform": "capitalize" }}>
                                  {order.status}
                                </span>
                              </div>
                              <div className="status-btns mt-3">
                                <button className="pending-btn" onClick={() => { handlePending(order) }}>
                                  Pending
                                  </button>
                                <button className="shipping-btn" onClick={() => { handleShipping(order) }}>
                                  Shipping
                                  </button>
                                <button className="done-btn" onClick={() => { handleDone(order) }}>
                                  Done
                                  </button>
                              </div>
                            </div>
                          </div>
                        )
                      })
                    }
                  </div>
                </div>
            }
          </>
      }
    </main>
  )
}
