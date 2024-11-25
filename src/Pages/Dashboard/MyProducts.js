import React, { useEffect, useCallback, useState } from 'react'
// ------------------ Firebase ------------------
import { collection, query, where, getDocs, deleteDoc, doc, setDoc, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL  , deleteObject} from 'firebase/storage';
import { fireStore, storage } from 'Config/firebase';
import { useAuthContext } from 'Context/AuthContext';
import Loader from 'Components/ProductLoader/Loader';
// ------------------ Message ------------------
import { message } from 'antd';

export default function MyProducts() {

  const [isProcessing, setIsProcessing] = useState(false)
  const [isUpdateProcessing, setIsUpdateProcessing] = useState(false)
  const [file, setFile] = useState(null)
  const [image, setImage] = useState(null)
  const [displayProducts, setDisplayProducts] = useState([])
  const [selectedProduct, setSelectedProduct] = useState({})

  const { user } = useAuthContext()
  let ID = user.ID

  // ------------------ Diplay Data ------------------

  const fetchData = useCallback(async () => {
    let array = []
    setIsProcessing(true)
    const q = query(collection(fireStore, "Products"), where("createdBy", "==", ID));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      let data = doc.data()
      array.push(data)
    });
    setIsProcessing(false)
    setDisplayProducts(array)
  })

  useEffect(() => {
    fetchData()
  }, [])

  // ------------------ Delete ------------------

  const handleDelete = async (product) => {
    await deleteDoc(doc(fireStore, "Products", product.id))
    let newProducts = displayProducts.filter((newProduct) => {
      return newProduct.id !== product.id
    })
    const desertRef = ref(storage, `product-images/${product.imageName}`);
    deleteObject(desertRef).then(() => {
    }).catch((error) => {
    });
    setDisplayProducts(newProducts)
    message.success('Deleted')
  }

  // ------------------ Edit ------------------

  // ------------- Upload Image ------------- 

  let imageUrl

  // const handleImage = (e) => {
  //   setFile(e.target.files[0])
  //   setImage(URL.createObjectURL(e.target.files[0]));
  // }


  // const uploadFile = async () => {
  //   const storageRef = ref(storage, 'product-images/' + file.name);
  //   const uploadTask = uploadBytesResumable(storageRef, file);

  //   // Register three observers:
  //   // 1. 'state_changed' observer, called any time the state changes
  //   // 2. Error observer, called on failure
  //   // 3. Completion observer, called on successful completion
  //   uploadTask.on('state_changed',
  //     (snapshot) => {
  //       // Observe state change events such as progress, pause, and resume
  //       // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
  //       const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
  //       console.log('Upload is ' + progress + '% done');
  //     },
  //     () => {
  //       // Handle unsuccessful uploads
  //     },
  //     () => {
  //       // Handle successful uploads on complete
  //       // For instance, get the download URL: https://firebasestorage.googleapis.com/...
  //       getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
  //         console.log('File available at', downloadURL);
  //         imageUrl = downloadURL
  //         let id = selectedProduct.id
  //         selectedProduct = {
  //           title: selectedProduct.title,
  //           currentPrice: selectedProduct.currentPrice,
  //           description: selectedProduct.description,
  //           imageUrl: imageUrl,
  //           modiefiedBy: ID,
  //         }
  //         setDoc(doc(fireStore, "Products", id), selectedProduct)
  //         message.success("Product Updated")
  //       });
  //     }
  //   );

  // }


  const handleChange = (e) => {
    setSelectedProduct(s => ({ ...s, [e.target.name]: e.target.value }))
  }

  const handleEdit = async () => {
    setIsUpdateProcessing(true)
    // uploadFile()

    let id = selectedProduct.id
    let updatedProduct = {
      ...selectedProduct,
      ModifiedBy: ID,
      dateModified: serverTimestamp()
    }
    setDoc(doc(fireStore, "Products", id), updatedProduct)
    message.success("Product Updated")
    let newProduct = displayProducts.map((doc) => {
      if (doc.id === updatedProduct.id) {
        return updatedProduct
      } else {
        return doc
      }
    })
    setDisplayProducts(newProduct)
    setIsUpdateProcessing(false)
  }

  return (
    <main>
      <h1 className="text-center my-5" style={{ "fontWeight": "900", "fontSize": "50px" }}>
        My Products
      </h1>
      {
        isProcessing
          ?
          <Loader />
          :
          <>
            {
              displayProducts.length === 0
                ?
                <h1 className='text-center fw-bold'>
                  No Products Found !
                </h1 >
                :
                <>
                  {
                    displayProducts.map((product, i) => {
                      return (
                        <div className="myProduct-card pe-md-3 my-5" key={i}>
                          <div className="imgBox">
                            <img src={product.imageUrl} alt="" />
                          </div>
                          <div className="product-data">
                            <div className="title d-flex flex-column">
                              <b className='ms-4'>
                                {product.title}
                              </b>
                            </div>
                            <div className="description d-flex flex-column">
                              <p className='ms-4'>
                                {product.description}
                              </p>
                            </div>
                            <div className="price d-flex flex-column">
                              <b className='ms-4'>
                                ${product.currentPrice}
                              </b>
                            </div>
                          </div>
                          <div className="product-buttons ms-md-auto">
                            <button className="btn myProduct-delete-btn" onClick={() => { handleDelete(product) }}>
                              Delete
                            </button>
                            <button className="btn myProduct-edit-btn" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => { setSelectedProduct(product) }}>
                              Edit
                            </button>
                          </div>
                        </div>
                      )
                    })
                  }
                </>
            }
          </>
      }
      {/* <!-- Edit Modal --> */}
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Edit Product
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              {/* <div className="d-flex justify-content-between">
                <div className="d-flex flex-column justify-content-evenly">
                  <label htmlFor="image">
                    Product image
                  </label>
                  <input
                    id='image'
                    name='imageUrl'
                    type="file"
                    className='form-control mb-3'
                    onChange={handleImage}
                  />
                </div>
                <div className="imgBox" style={{"border":"1px solid","width":"50%","height":"150px"}}>
                  <img src={image} alt="" style={{"width":"100%","height":"147px"}}/>
                </div>
              </div> */}
              <label htmlFor="title">
                Title
              </label>
              <input
                id='title'
                name='title'
                type="text"
                className='form-control mb-3'
                value={selectedProduct.title}
                onChange={handleChange}
              />
              <label htmlFor="description">
                Description
              </label>
              <input
                name='description'
                id='description'
                type="text"
                className='form-control mb-3'
                value={selectedProduct.description}
                onChange={handleChange}
              />
              <label htmlFor="currentPrice">
                Price
              </label>
              <input
                name='currentPrice'
                id='currentPrice'
                type="number"
                className='form-control mb-3'
                value={selectedProduct.currentPrice}
                onChange={handleChange}
              />
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="button" className="btn btn-primary" onClick={handleEdit}>
                {
                  isUpdateProcessing
                    ?
                    <div className="spinner-border spinner-border-sm"></div>
                    :
                    "Save changes"
                }
              </button>
            </div>
          </div>
        </div>
      </div>

    </main>
  )
}
