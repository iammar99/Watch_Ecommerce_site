import React, { useState } from 'react'
// --------------- Firebase Update ---------------
import { fireStore, storage } from 'Config/firebase';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { setDoc, doc } from 'firebase/firestore';
// --------------- Message ---------------
import { message } from 'antd';
import ButtonLoader from 'Components/ButtonLoader/ButtonLoader';


export default function AddProduct() {

    const [state, setState] = useState({})
    const [file, setFile] = useState(null)
    const [image, setImage] = useState(null)
    const [isLoading, setIsLoading] = useState(false)


    let user = localStorage.getItem("User")
    user = JSON.parse(user)
    let userId = user.ID

    let imageUrl
    let productToStore

    // ------------- Image Input ------------- 

    const handleImage = (e) => {
        setFile(e.target.files[0])
        setImage(URL.createObjectURL(e.target.files[0]));
    }

    // ------------- Others Input ------------- 

    const handleChange = (e) => setState(s => ({ ...s, [e.target.name]: e.target.value }))

    // ------------- Upload Image ------------- 

    const uploadFile = async () => {
        const storageRef = ref(storage, 'product-images/' + file.name);
        const uploadTask = uploadBytesResumable(storageRef, file);

        // Register three observers:
        // 1. 'state_changed' observer, called any time the state changes
        // 2. Error observer, called on failure
        // 3. Completion observer, called on successful completion
        uploadTask.on('state_changed',
            (snapshot) => {
                // Observe state change events such as progress, pause, and resume
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
            },
            () => {
                // Handle unsuccessful uploads
            },
            () => {
                // Handle successful uploads on complete
                // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    // setIsLoading(true)
                    console.log('File available at', downloadURL);
                    imageUrl = downloadURL
                    let prdouctID = Math.random().toString(36).slice(2, 13);
                        productToStore = {
                            title: state.title,
                            currentPrice: state.currentPrice,
                            description: state.description,
                            imageUrl: imageUrl,
                            createdBy: userId,
                            id: prdouctID ,
                        }
                        setDoc(doc(fireStore, "Products", prdouctID), productToStore);
                        message.success("Product Added")
                        // setIsLoading(false)
                });
            }
        );

    }

    // ------------- Submit Product ------------- 

    const handleProduct = (e) => {
        e.preventDefault()
        if (image === null) {
            message.error("Add Image Of Your Product")
        }
        else {
            if (!state.title || !state.currentPrice ||  !state.description) {
                message.error("Add other fields")
            }
            else {
                setIsLoading(true)
                uploadFile()
                setIsLoading(false)
            }
        }
    }


    return (
        <main id='add-product-page'>
            <h1 className="text-center my-5">
                Add  Product
            </h1>
            <form className='product-form'>

                {/* ----------------- Product Image ----------------- */}

                <div className="product-image-container d-flex my-4">
                    <div className="d-flex flex-column justify-content-center w-100">
                        <label htmlFor="image">
                            Add Image Of Your Product
                            <br />
                            <span style={{"fontSize":"13px"}}>
                                Kindly Upload  image Without Background
                            </span>
                        </label>
                        <input
                            type="file"
                            name="image"
                            id="image"
                            className='form-control w-50'
                            onChange={handleImage}
                        />
                    </div>
                    <div className="product-image">
                        <img src={image} alt="" />
                    </div>
                </div>

                {/* ----------------- Product Title ----------------- */}

                <div className="product-title-container d-flex justify-content-between align-items-center my-4">
                    <div className="d-flex flex-column justify-content-center">
                        <label htmlFor="title">
                            Add Title Of Your Product
                        </label>
                        <input
                            type="text"
                            className='form-control mt-3'
                            name="title"
                            id="title"
                            style={{ "border": "1px solid" }}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                {/* ----------------- Product Price ----------------- */}

                <h3>
                    Add Prices
                </h3>
                <div className="product-price-container d-flex  align-items-center mb-5">
                        <div className="d-flex flex-row align-items-center ">
                            <label htmlFor="title" style={{ "fontSize": "11px", "marginRight": "10px", "fontWeight": "800" }}>
                                Add Current Price Of Your Product
                            </label>
                            <input
                                type="number"
                                className='form-control mt-3'
                                name="currentPrice"
                                id="oldPrice"
                                style={{ "border": "1px solid", "width": "20%" }}
                                onChange={handleChange}
                            />
                        </div>
                </div>

                {/* -------------------- Product Description -------------------- */}


                <label htmlFor="description">
                    Add Description
                </label>
                <div className="product-price-container  mb-5">
                    <div className="d-flex flex-column align-items-center ">
                        <textarea
                            name="description"
                            className='form-control mx-5 mt-3'
                            id="description"
                            cols="50"
                            rows="5"
                            onChange={handleChange}
                            style={{ "border": "1px solid" }}
                        >
                        </textarea>
                    </div>
                </div>


                {/* -------------------- Submission Button -------------------- */}

                <button className="btn btn-primary" onClick={handleProduct}>
                    {
                        isLoading
                        ?
                        // console.log("firs/t")
                        <ButtonLoader/>
                        :
                        "Add Product"
                    }
                </button>

            </form>
        </main>
    )
}
