import React from 'react'

export default function HelpCenter() {
  return (
    <>
      <h1 className="text-center my-5" style={{ "fontWeight": "900", "fontSize": "50px" }}>
        Help Center
      </h1>
      <div className="container">
        
        {/* --------------------------- Row 1 --------------------------- */}
        
        <div className="row">
          <div className="col-12 col-md-6">
            <div className="question-card">
              Q: How to move to Register page  ?
            </div>
            <div className="answer-card">
              A: You can easily move to Register page by following  the steps below :
              <ol>
                <li>
                  Procedure 1
                </li>
                <ol>
                  <li>Write your email in Email Field in footer</li>
                  <li>Press Invite button</li>
                  <li>You will be transfered to Register page</li>
                </ol>
                <li>
                  Procedure 2
                </li>
                <ol>
                  <li>Move to the login page by clicking on login button on mobile navbar</li>
                  <li>Click on not a user link</li>
                </ol>
              </ol>
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className="question-card">
              Q: How do I create Account ?
            </div>
            <div className="answer-card">
              A: You can easily create account by following  the steps below :
              <ol>
                <li>Go To Resister Page</li>
                <li>Enter Your Credentials</li>
                <li>Choose strong password</li>
                <li>Confirm your password</li>
                <li>Press Register button</li>
              </ol>
            </div>
          </div>
        </div>
                
        {/* --------------------------- Row 2 --------------------------- */}
        
        <div className="row">
          <div className="col-12 col-md-6">
            <div className="question-card">
              Q: How to add product to cart  ?
            </div>
            <div className="answer-card">
              A: You can easily add product to cart by following  the steps below :
              <ol>
                  <li>Hover on any product </li>
                  <li>Press Product Detail button</li>
                  <li>Select Quantity of Product</li>
                  <li>Click Add To Cart button to add product to cart</li>
              </ol>
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className="question-card">
              Q: How to move to checkout  page?
            </div>
            <div className="answer-card">
              A: You can easily move to checkout  page by following  the steps below :
              <ol>
                <li>Go To Cart Page</li>
                <li>Update Checkout Details by clicking Update Details button</li>
                <li>Click Checkout Button</li>
                <li>You will be transfered to checkout page</li>
              </ol>
            </div>
          </div>
        </div>
                        
        {/* --------------------------- Row 3 --------------------------- */}
        
        <div className="row">
          <div className="col-12 col-md-6">
            <div className="question-card">
              Q: How to place an order  ?
            </div>
            <div className="answer-card">
              A: You can easily place an order by following  the steps below :
              <ol>
                  <li>Enter Your Credentials</li>
                  <li>Select Payment Method</li>
                  <li>Click on Place the order button</li>
                  <li>Your order will be placed</li>
              </ol>
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className="question-card">
              Q: How do I add product ?
            </div>
            <div className="answer-card">
              A: You can easily add product by following  the steps below :
              <ol>
                <li>Go To Profile Page</li>
                <li>Click Add Product button</li>
                <li>Add an Image of product without background</li>
                <li>Enter Product Details </li>
                <li>Press Add Product button</li>
              </ol>
            </div>
          </div>
        </div>
                        
        {/* --------------------------- Row 4 --------------------------- */}
        
        <div className="row">
          <div className="col-12 col-md-6">
            <div className="question-card">
              Q: How to Edit / Delete Your product  ?
            </div>
            <div className="answer-card">
              A: You can easily Edit / Delete Your product by following  the steps below :
              <ol>
                  <li>Go to profile page</li>
                  <li>Click My Product button</li>
                  <li>Now You can Edit / Delete Your products</li>
              </ol>
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className="question-card">
              Q: How can I change my Profile Pic or username ?
            </div>
            <div className="answer-card">
              A: You can easily change my Profile Pic or username by following  the steps below :
              <ol>
                <li>Go To Profile Page</li>
                <li>Click on edit button (Pencil Icon)</li>
                <li>Add your Image for profile pic if you want to add</li>
                <li>Press Submit button below  image input field to update image</li>
                <li>Change your Username if you want to change</li>
                <li>Press Submit button below username input  field to update username</li>
                <li>Press close button </li>
              </ol>
            </div>
          </div>
        </div>
                        
        {/* --------------------------- Row 5 --------------------------- */}
        
        <div className="row">
          <div className="col-12 col-md-6">
            <div className="question-card">
              Q: How to check your orders  ?
            </div>
            <div className="answer-card">
              A: You can easily check your orders by following  the steps below :
              <ol>
                  <li>Go to profile page</li>
                  <li>Click Order button</li>
                  <li>You can check all orders of your product</li>
                  <li>You can change status of your product</li>
              </ol>
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className="question-card">
              Q: How do I check what is status of my order ?
            </div>
            <div className="answer-card">
              A: You can easily check what is status of my order by following  the steps below :
              <ol>
                <li>Go To Profile Page</li>
                <li>In first section there are three button</li>
                <li>There you can check whether your product is shipped or not</li>
                <li>You can also delete order if recieved</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
