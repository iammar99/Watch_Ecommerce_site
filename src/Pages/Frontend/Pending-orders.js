import React, { useCallback, useEffect, useState } from 'react'
import Loader from 'Components/ProductLoader/Loader';
// ------------------------ Firebase ------------------------
import { collection, doc, query, where, getDocs } from "firebase/firestore";
import { fireStore } from 'Config/firebase';
import { useAuthContext } from 'Context/AuthContext';
// ---------------------- React Responsive tables ----------------------
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table'
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css'

export default function PendingOrders() {

    const [products, setProducts] = useState([])
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
        // ----------------------- Extract Products from order -------------------
        for (let i = 0; i < array.length; i++) {
            orderedProducts.push(...array[i].products)
        }
        // ----------------------- Find Pending items -------------------
        let myProducts = orderedProducts.filter((product) => {
            return product.status === "pending"
        })
        setIsProcessing(false)
        setProducts(myProducts)
    })

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <main>
            <h1 className="text-center my-5" style={{ "fontWeight": "900", "fontSize": "55px" }}>
                Pending Orders
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
                            No  Pending Orders Yet
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
                                                <Td className="product-price" style={{"textTransform":"capitalize"}}>
                                                    {
                                                        product.status
                                                    }
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
