import React, { useState } from 'react'
// --------------- Firebase Update ---------------
import { fireStore, storage } from 'Config/firebase';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { setDoc, doc } from 'firebase/firestore';
// --------------- Message ---------------
import { message } from 'antd';
import ButtonLoader from 'Components/ButtonLoader/ButtonLoader';


export default function AddProduct() {

    const [state, setState] = useState({});
    const [file, setFile] = useState(null);
    const [image, setImage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    let user = localStorage.getItem("User");
    user = JSON.parse(user);
    let userId = user.ID;

    let imageUrl;
    let productToStore;


    // ------------ Remove Background -------------
    const removeBackground = async (file) => {
        const formData = new FormData();
        formData.append("image_file", file);
        formData.append("size", "auto");

        try {
            const response = await fetch("https://api.remove.bg/v1.0/removebg", {
                method: "POST",
                headers: {
                    "X-Api-Key": process.env.REACT_APP_REMOVE_BG_API_KEY
                },
                body: formData,
            });

            if (response.status !== 200) {
                throw new Error("Failed to remove background");
            }

            const blob = await response.blob();
            return blob;
        } catch (error) {
            console.error("Error removing background:", error);
            message.error("Failed to remove background.");
            return null;
        }
    };

    // ------------ Handle Image Input -------------
    const handleImage = async (e) => {
        const uploadedFile = e.target.files[0];
        setFile(uploadedFile);

        const processedBlob = await removeBackground(uploadedFile);

        if (processedBlob) {
            // Create a new File object from the Blob and assign a name
            const processedFile = new File([processedBlob], uploadedFile.name, { type: processedBlob.type });

            // Update states with the processed file
            setImage(URL.createObjectURL(processedFile));
            setFile(processedFile);
        }
    };


    // ------------ Handle Other Inputs -------------
    const handleChange = (e) =>
        setState((s) => ({ ...s, [e.target.name]: e.target.value }));

    // ------------ Upload Image to Firebase Storage -------------
    const uploadFile = async () => {
        const storageRef = ref(storage, "product-images/" + file.name);
        const uploadTask = uploadBytesResumable(storageRef, file);
        setIsLoading(true)

        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log("Upload is " + progress + "% done");
            },
            (error) => {
                console.error("Error uploading file:", error);
                message.error("Image upload failed.");
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    imageUrl = downloadURL;
                    let productID = Math.random().toString(36).slice(2, 13);
                    productToStore = {
                        title: state.title,
                        currentPrice: state.currentPrice,
                        description: state.description,
                        imageUrl: imageUrl,
                        createdBy: userId,
                        id: productID,
                        imageName: file.name
                    };

                    setDoc(doc(fireStore, "Products", productID), productToStore)
                        .then(() => {
                            message.success("Product Added");
                        })
                        .catch((error) => {
                            console.error("Error storing product:", error);
                            message.error("Failed to store product.");
                        })
                });
            }
        );
        setIsLoading(false)
    };

    // ------------ Submit Product -------------
    const handleProduct = (e) => {
        e.preventDefault();
        if (!image) {
            message.error("Add an image of your product");
        } else if (!state.title || !state.currentPrice || !state.description) {
            message.error("Add all required fields");
        } else {
            setIsLoading(true);
            uploadFile();
            setIsLoading(false);
        }
    };

    const myStyle = {
        // Remove spinners in Chrome, Edge, and Safari
        WebkitAppearance: 'none',
        MozAppearance: 'textfield',
        appearance: 'textfield',
        margin: 0,
    }




    return (
        <main id='add-product-page'>
            <h1 className="text-center my-5">
                Add  Product
            </h1>
            <form className='product-form'>

                <div className="container">
                    <div className="d-flex justify-content-between flex-lg-row flex-column mb-4">

                        {/* ----------------- Product Image ----------------- */}

                        <div className="product-image-container d-flex flex-column-reverse align-items-center justify-content-evenly my-4">
                            <div className="d-flex flex-column justify-content-center w-100">
                                <button className="container-btn-file">
                                    Upload Image
                                    <input
                                        className="file"
                                        type="file"
                                        name="image"
                                        id="image"
                                        onChange={handleImage} />
                                </button>

                            </div>
                            <div className="product-image">
                                <img src={image} alt="" />
                            </div>
                        </div>

                        {/* ----------------- Product Title ----------------- */}

                        <div className="d-flex flex-column justify-content-center ms-4">
                            <label htmlFor="title">
                                Add Title Of Your Product
                            </label>
                            <input
                                type="text"
                                className='form-control mt-3'
                                name="title"
                                id="title"
                                placeholder='Enter Title For your Item'
                                style={{ "border": "1px solid", "fontSize": "15px" }}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                </div>

                {/* ----------------- Product Price ----------------- */}

                <h3>
                    Add Prices
                </h3>
                <div className="product-price-container d-flex  align-items-center mb-5">
                    <div className="d-flex flex-row align-items-baseline ">
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

                <button className="submit-button" onClick={handleProduct}>
                    {
                        isLoading
                            ?
                            // console.log("firs/t")
                            <ButtonLoader />
                            :
                            "Add Product"
                    }
                </button>


            </form>
        </main>
    )
}
