import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import profile from "../../Assets/profile.png"
// --------------- Firebase Update ---------------
import { fireStore, storage } from 'Config/firebase';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { setDoc, doc } from 'firebase/firestore';
//  -------------  FireBase - Logout -------------
import { signOut } from 'firebase/auth'
import { auth } from 'Config/firebase'
//  -------------  Message -------------
import { message } from 'antd';
//  -------------  Auth Context -------------
import { useAuthContext } from 'Context/AuthContext'
import ButtonLoader from 'Components/ButtonLoader/ButtonLoader';




export default function Profile() {

  const [file, setFile] = useState(null)
  const [image, setImage] = useState(null)
  const { dispatch } = useAuthContext()
  const [fullName, setFullName] = useState("")
  const [userName, setUserName] = useState("")

  let user = localStorage.getItem("User")
  user = JSON.parse(user)
  let username = user.fullName
  let profileimg
  if (user) {
    profileimg = user.imageUrl
  }


  useEffect(() => {
    setUserName(username)
    document.getElementById("fullname").setAttribute('value', username)
  }, [])



  const handleImage = (e) => {
    setFile(e.target.files[0])
    setImage(URL.createObjectURL(e.target.files[0]));
  }

  {/* ------------ Edit Image ------------ */ }

  const uploadFile = async () => {
    const storageRef = ref(storage, 'profile-images/' + file.name);
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
          console.log('File available at', downloadURL);
          let userToStore = {
            email: user.email,
            ID: user.ID,
            fullName: username,
            imageUrl: downloadURL
          }
          setDoc(doc(fireStore, "Users", user.ID), userToStore);
          let activeUser = JSON.stringify(userToStore)
          localStorage.setItem("User", activeUser)

        });
      }
    );

    console.log('file', image)
  }

  {/* ------------ Update Image ------------ */ }

  const submitImage = () => {
    uploadFile()
    message.success("Updated")
  }

  {/* ------------ Input Name ------------ */ }

  const handleName = (e) => {
    setFullName(s => ({ ...s, [e.target.name]: e.target.value }))
  }

  {/* ------------ Update Name ------------ */ }

  const submitName = (e) => {
    e.preventDefault()
    let newName = fullName.fullname
    setDoc(doc(fireStore, "Users", user.ID), {
      email: user.email,
      ID: user.ID,
      fullName: newName
    });
    let userToStore = { ...user, fullName: newName }
    let activeUser = JSON.stringify(userToStore)
    localStorage.setItem("User", activeUser)
    setUserName(newName)
    message.success("Updated")
  }

  {/* ------------ Update Name ------------ */ }

  const handleLogout = (e) => {
    e.preventDefault()
    signOut(auth)
      .then(() => {
        message.success("Loggoed Out")
        localStorage.setItem("Token", "False")
        localStorage.removeItem("User")
      })
      .catch((error) => {
        console.log('error', error)
        // ..
      });
    dispatch({ type: "Set_Logged_Out" })
    localStorage.setItem("Token", "false")
  }



  return (
    <main id='main'>
      <div className="d-flex justify-content-between align-items-center px-3 mt-3">
        <div className="mainProfile d-flex">
          <img src={profileimg ? profileimg : profile} alt="" style={{ "width": "55px", "height": "55px", "borderRadius": "50%", "marginRight": "2px" }} />
          <h2 className="username">
            {userName}
          </h2>
        </div>
        <div className="d-flex justify-content-between align-items-center">
          <button className="btn btn-danger " onClick={handleLogout}>
            Logout
          </button>
          <i className="fa-solid fa-pencil ms-2" style={{ color: "#000000" , "cursor":"pointer"}} data-bs-toggle="modal" data-bs-target="#exampleModal" />
        </div>
      </div>

      {/* ---------------- Edit Box ---------------- */}

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

              <div className="edit-image">
                <label htmlFor="image" style={{ "fontSize": "21px" }}>
                  Add Your Profile Image :
                </label>
                <div className="d-flex justify-content-around align-items-center" style={{ "alignItems": "end", "height": "117px" }}>
                  <input type="file" name="image" style={{ "outline": "0px" }} onChange={handleImage} />
                  <span className="img-card " style={{ "height": "100px", "width": "100px", "borderRadius": "50%" }}>
                    <img src={image} alt="" style={{ "height": "100px", "width": "100px", "borderRadius": "50%" }} />
                    {/* {image} */}
                  </span>
                </div>
                <button className="btn btn-primary my-3" onClick={submitImage}>
                  Submit
                </button>
              </div>

              {/* ------------ Edit UserName ------------ */}

              <div className="edit-username">
                <label htmlFor="fullname" style={{ "fontSize": "21px" }}>
                  Change fullname :
                </label>
                <input type="text" className='form-control  my-3' name="fullname" placeholder={username} id="fullname" onChange={handleName} />
                <button className="btn btn-primary" onClick={submitName}>
                  Submit
                </button>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>



      {/* ---------------- My Orders ---------------- */}

      <div className="container my-3">
        <h3 className='mt-5' style={{ "fontWeight": "900" }}>
          My  Orders
        </h3>
        <div className="row mb-5 mt-3">

          <div className="col-xs-12 col-sm-6 col-md-4">
            <Link to={"/pending-orders"}>
              <div className="order-card">
                <span>
                  <i className="fa-solid fa-box-open" style={{ color: "#000000" }} />
                </span>
                <span>
                  To Ship
                </span>
              </div>
            </Link>
          </div>
          <div className="col-xs-12 col-sm-6 col-md-4">
            <Link to={"/shipped-orders"}>
              <div className="order-card">
                <span>
                  <i className="fa-solid fa-truck-fast" style={{ color: "#000000" }} />
                </span>
                <span>
                  To Recive
                </span>
              </div>
            </Link>
          </div>
          <div className="col-xs-12 col-sm-6 col-md-4">
            <Link to={"/done-orders"}>
              <div className="order-card">
                <span>
                  <i className="fa-brands fa-rocketchat" style={{ color: "#000000" }} />
                </span>
                <span>
                  To Review
                </span>
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* ---------------- My Wallet ---------------- */}

      <div className="container">
        <h3 className='mt-5' style={{ "fontWeight": "900" }}>
          My  Wallet
        </h3>
        <div className="row">
          <div className="col-md-6 col-12">
            <div className="wallet-card">
              <h3>
                PKR
              </h3>
              <span className="amount">
                0
              </span>
            </div>
          </div>
          <div className="col-md-6 col-12">
            <div className="wallet-card">
              <h3>
                Voucher
              </h3>
              <span className="amount">
                0
              </span>
            </div>
          </div>
        </div>
      </div>
      {/* ---------------- My Services ---------------- */}

      <div className="container my-3">
        <h3 className='mt-5' style={{ "fontWeight": "900" }}>
          My  Services
        </h3>
        <div className="row mb-5 mt-3">
          <div className="col-xs-12 col-sm-6 col-md-3">
            <Link to={"/dashboard/my-products"} className='add-product'>
              <div className="order-card">
                <span>
                  <i className="fa-solid fa-database" style={{ color: "#000000" }} />
                </span>
                <span>
                  My Products
                </span>
              </div>
            </Link>
          </div>
          <div className="col-xs-12 col-sm-6 col-md-3">
            <Link to={"/help-center"}>
            <div className="order-card">
              <span>
                <i className="fa-regular fa-circle-question" style={{ color: "#000000" }} />
              </span>
              <span>
                Help Center
              </span>
            </div>
            </Link>
          </div>
          <div className="col-xs-12 col-sm-6 col-md-3">
            <Link to={"/dashboard/orders"}>
              <div className="order-card">
                <span>
                  <i className="fa-solid fa-box-open" style={{ color: "#000000" }} />
                </span>
                <span>
                  Orders
                </span>
              </div>
            </Link>
          </div>
          <div className="col-xs-12 col-sm-6 col-md-3">
            <Link to={"/dashboard/add-product"} className='add-product'>
              <div className="order-card">
                <span>
                  <i className="fa-solid fa-plus" style={{ color: "#000000" }} />
                </span>
                Add Product
              </div>
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
