import React, { useCallback, useEffect, useState } from 'react'
// ------------------------ Firebase ------------------------
import { collection, doc, query, where, getDocs, setDoc, deleteDoc } from "firebase/firestore";
import { fireStore } from 'Config/firebase';
import { useAuthContext } from 'Context/AuthContext';
import Loader from 'Components/ProductLoader/Loader';
// ---------------------- React Responsive tables ----------------------
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table'
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css'
import { message } from 'antd';


export default function DoneOrders() {

  const [products, setProducts] = useState([])
  const [wholeProducts, setWholeProducts] = useState([])
  const [isProcessing, setIsProcessing] = useState(false)
  const { user } = useAuthContext()

  let userId = user.ID

  const fetchData = useCallback(async () => {
    let orderedProducts = []
    let array = []
    setIsProcessing(true)

    // ----------------------- Query -------------------

    const q = query(collection(fireStore, "Orders"), where("orderedBy", "==", userId));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      let data = doc.data()
      array.push(data)
    });
    setWholeProducts(array)
    for (let i = 0; i < array.length; i++) {
      orderedProducts.push(...array[i].products)
    }
    let myProducts = orderedProducts.filter((product) => {
      return product.status === "done"
    })
    setProducts(myProducts)
    setIsProcessing(false)
  })

  useEffect(() => {
    fetchData()
  }, [])

  // --------------------------- delete Product --------------------------- 

  const handleDelete = async (product) => {

    // ================== To Get Desired Order OF which product are we dealing with ==================

    let documentToUpdate = wholeProducts.filter((item) => {
      return item.id === product.orderId
    })

    // ================== To Get All products Of that order ==================

    let newDocument = []
    for (let i = 0; i < documentToUpdate.length; i++) {
      newDocument.push(...documentToUpdate[i].products)
    }

    // ================== To Get Remianing products ==================

    let productToDelete = newDocument.filter((item) => {
      return item.id !== product.id
    })
    
    // // ================== To Delete That Products ==================

    if (newDocument.length <= 1) {
      let id = documentToUpdate[0].id
      await deleteDoc(doc(fireStore, "Orders", id));
      
      let remianingOrders = wholeProducts.filter((item)=>{
        return item.id !== id
      })

      let orderedProducts = []
      for (let i = 0; i < remianingOrders.length; i++) {
        orderedProducts.push(...remianingOrders[i].products)
      }
      let myProducts = orderedProducts.filter((product) => {
        return product.status === "done"
      })
      setProducts(myProducts)
      message.success("Order removed")
    }
    else {

      // ================== To Update Product ==================

      let product = { ...documentToUpdate[0].products = productToDelete, ...documentToUpdate }
      let bill = product[0]
      await setDoc(doc(fireStore, "Orders", bill.id), bill);
      message.success("Order removed")

      let orderedProducts = []
      for (let i = 0; i < wholeProducts.length; i++) {
        orderedProducts.push(...wholeProducts[i].products)
      }
      let myProducts = orderedProducts.filter((product) => {
        return product.status === "done"
      })
      setProducts(myProducts)


    }
  }
  return (
    <main>
      <h1 className="text-center my-5" style={{ "fontWeight": "900", "fontSize": "55px" }}>
        Recieved Orders
      </h1>
      {
        isProcessing
          ?
          <Loader />
          :
          <>
            {
              products.length === 0
                ?
                <h3 className="text-center my-5">
                  No Recieved Orders Yet
                </h3>
                :
                <div className="main-container">
                  <Table className="table">
                    <Thead className="cartHeading-container">
                      <Tr>
                        <Th>Product</Th>
                        <Th>Price</Th>
                        <Th>Quantity</Th>
                        <Th>Total</Th>
                        <Th>Status</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {
                        products.map((product, i) => {
                          return (
                            <Tr key={i}>
                              <Td>
                                <img src={product.imageUrl} style={{ "width": "90px" }} alt="" />
                                <b className='ms-4' style={{ "fontSize": "20px", "fontWeight": "900" }}>{product.title}</b>
                              </Td>
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
                              <Td className="product-price" style={{ "textTransform": "capitalize" }}>
                                {
                                  product.status
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
          </>
      }
    </main>
  )
}
