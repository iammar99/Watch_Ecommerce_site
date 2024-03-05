import React, { useState, useEffect } from 'react'
import { useAuthContext } from 'Context/AuthContext'
// ---------------------- Firebase ----------------------
import { doc, setDoc } from "firebase/firestore";
import { fireStore } from 'Config/firebase';
import ButtonLoader from 'Components/ButtonLoader/ButtonLoader';
import { message } from 'antd';

export default function Checkout() {

  const { user } = useAuthContext()
  const [bill, setBill] = useState({})
  const [details, setDetails] = useState({})
  const [products, setProducts] = useState([])
  // const [productsToOrder, setProductsToOrder] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState("")

  let userId = user.ID
  const dateCreated = new Date
  // -------------------- OrderId  ---------------------
  let billId = localStorage.getItem("order-id")

  const fetchData = () => {
    setDetails(JSON.parse(localStorage.getItem("checkout-details")))
    setProducts(JSON.parse(localStorage.getItem(user.ID + "-cart")))
  }

  useEffect(() => {
    fetchData()
    document.getElementById("fullName").setAttribute('value', user.fullName)
  }, [])

  const handleChange = (e) => {
    // setProductsToOrder(...products)
    setBill(s => ({ ...s, orderedBy: userId, [e.target.name]: e.target.value, paymentMethod, products, dateCreated, id: billId }))
  }


  const handleOrder = async (e) => {
    e.preventDefault()

    // --------------------- Address Checking ---------------------

    if (!bill.address || !bill.country || !bill.city) {
      message.warning("Enter your Address")
    }
    else {

      // --------------------- Number Checking ---------------------

      if (!bill.number) {
        message.warning("Enter your Phone Number")
      }
      else {

        // --------------------- Payment method Checking ---------------------

        if (!paymentMethod) {
          message.warning("Tell Your Payment Method")
        }
        else {
          // try{
          setIsLoading(true)
          await setDoc(doc(fireStore, "Orders", billId), bill);
          localStorage.removeItem("checkout-details")
          localStorage.removeItem("product-detail")
          localStorage.removeItem(user.ID + "-cart")
          localStorage.removeItem( "order-id")
          message.success('Ordered  Successfully')
          // console.log(bill)
          setIsLoading(false)
        }
      }

    }
  }


  return (
    <>
      <h1 className="text-center my-5" style={{ "fontWeight": "900", "fontSize": "50px" }}>
        Checkout
      </h1>
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-8">
            <h2 className='my-3' style={{ "fontWeight": "400" }}>
              Billing Details
            </h2>

            {/* ------------------ Name ------------------ */}

            <div className="d-flex flex-column flex-md-row my-3">
              <input
                type="text"
                placeholder='First Name'
                name='fullName'
                id='fullName'
                className="form-control me-md-2 my-2"
                onChange={handleChange} />

            </div>

            {/* ------------------ Country ------------------ */}

            <select
              name="country"
              className='form-control my-3'
              id="country"
              onChange={handleChange}>

              <option value="Select Country">Select Country</option>
              <option value="Afghanistan">Afghanistan</option>
              <option value="Åland Islands">Åland Islands</option>
              <option value="Albania">Albania</option>
              <option value="Algeria">Algeria</option>
              <option value="American Samoa">American Samoa</option>
              <option value="Andorra">Andorra</option>
              <option value="Angola">Angola</option>
              <option value="Anguilla">Anguilla</option>
              <option value="Antarctica">Antarctica</option>
              <option value="Argentina">Argentina</option>
              <option value="Armenia">Armenia</option>
              <option value="Aruba">Aruba</option>
              <option value="Australia">Australia</option>
              <option value="Austria">Austria</option>
              <option value="Azerbaijan">Azerbaijan</option>
              <option value="Bahamas">Bahamas</option>
              <option value="Bahrain">Bahrain</option>
              <option value="Bangladesh">Bangladesh</option>
              <option value="Barbados">Barbados</option>
              <option value="Belarus">Belarus</option>
              <option value="Belgium">Belgium</option>
              <option value="Belize">Belize</option>
              <option value="Benin">Benin</option>
              <option value="Bermuda">Bermuda</option>
              <option value="Bhutan">Bhutan</option>
              <option value="Bolivia">Bolivia</option>
              <option value="Bosnia and Herzegovina">Bosnia and Herzegovina</option>
              <option value="Botswana">Botswana</option>
              <option value="Bouvet Island">Bouvet Island</option>
              <option value="Brazil">Brazil</option>
              <option value="Brunei Darussalam">Brunei Darussalam</option>
              <option value="Bulgaria">Bulgaria</option>
              <option value="Burkina Faso">Burkina Faso</option>
              <option value="Burundi">Burundi</option>
              <option value="Cambodia">Cambodia</option>
              <option value="Cameroon">Cameroon</option>
              <option value="Canada">Canada</option>
              <option value="Cape Verde">Cape Verde</option>
              <option value="Cayman Islands">Cayman Islands</option>
              <option value="Chad">Chad</option>
              <option value="Chile">Chile</option>
              <option value="China">China</option>
              <option value="Christmas Island">Christmas Island</option>
              <option value="Cocos (Keeling) Islands">Cocos (Keeling) Islands</option>
              <option value="Colombia">Colombia</option>
              <option value="Comoros">Comoros</option>
              <option value="Congo">Congo</option>
              <option value="Cook Islands">Cook Islands</option>
              <option value="Costa Rica">Costa Rica</option>
              <option value="Cote D'ivoire">Cote D'ivoire</option>
              <option value="Croatia">Croatia</option>
              <option value="Cuba">Cuba</option>
              <option value="Cyprus">Cyprus</option>
              <option value="Czech Republic">Czech Republic</option>
              <option value="Denmark">Denmark</option>
              <option value="Djibouti">Djibouti</option>
              <option value="Dominica">Dominica</option>
              <option value="Dominican Republic">Dominican Republic</option>
              <option value="Ecuador">Ecuador</option>
              <option value="Egypt">Egypt</option>
              <option value="El Salvador">El Salvador</option>
              <option value="Equatorial Guinea">Equatorial Guinea</option>
              <option value="Eritrea">Eritrea</option>
              <option value="Estonia">Estonia</option>
              <option value="Ethiopia">Ethiopia</option>
              <option value="Faroe Islands">Faroe Islands</option>
              <option value="Fiji">Fiji</option>
              <option value="Finland">Finland</option>
              <option value="France">France</option>
              <option value="French Guiana">French Guiana</option>
              <option value="French Polynesia">French Polynesia</option>
              <option value="Gabon">Gabon</option>
              <option value="Gambia">Gambia</option>
              <option value="Georgia">Georgia</option>
              <option value="Germany">Germany</option>
              <option value="Ghana">Ghana</option>
              <option value="Gibraltar">Gibraltar</option>
              <option value="Greece">Greece</option>
              <option value="Greenland">Greenland</option>
              <option value="Grenada">Grenada</option>
              <option value="Guadeloupe">Guadeloupe</option>
              <option value="Guam">Guam</option>
              <option value="Guatemala">Guatemala</option>
              <option value="Guernsey">Guernsey</option>
              <option value="Guinea">Guinea</option>
              <option value="Guinea-bissau">Guinea-bissau</option>
              <option value="Guyana">Guyana</option>
              <option value="Haiti">Haiti</option>
              <option value="Honduras">Honduras</option>
              <option value="Hong Kong">Hong Kong</option>
              <option value="Hungary">Hungary</option>
              <option value="Iceland">Iceland</option>
              <option value="India">India</option>
              <option value="Indonesia">Indonesia</option>
              <option value="Iraq">Iraq</option>
              <option value="Ireland">Ireland</option>
              <option value="Isle of Man">Isle of Man</option>
              <option value="Israel">Israel</option>
              <option value="Italy">Italy</option>
              <option value="Jamaica">Jamaica</option>
              <option value="Japan">Japan</option>
              <option value="Jersey">Jersey</option>
              <option value="Jordan">Jordan</option>
              <option value="Kazakhstan">Kazakhstan</option>
              <option value="Kenya">Kenya</option>
              <option value="Kiribati">Kiribati</option>
              <option value="Korea, Republic of">Korea, Republic of</option>
              <option value="Kuwait">Kuwait</option>
              <option value="Kyrgyzstan">Kyrgyzstan</option>
              <option value="Latvia">Latvia</option>
              <option value="Lebanon">Lebanon</option>
              <option value="Lesotho">Lesotho</option>
              <option value="Liberia">Liberia</option>
              <option value="Libyan Arab Jamahiriya">Libyan Arab Jamahiriya</option>
              <option value="Liechtenstein">Liechtenstein</option>
              <option value="Lithuania">Lithuania</option>
              <option value="Luxembourg">Luxembourg</option>
              <option value="Macao">Macao</option>
              <option value="Madagascar">Madagascar</option>
              <option value="Malawi">Malawi</option>
              <option value="Malaysia">Malaysia</option>
              <option value="Maldives">Maldives</option>
              <option value="Mali">Mali</option>
              <option value="Malta">Malta</option>
              <option value="Marshall Islands">Marshall Islands</option>
              <option value="Martinique">Martinique</option>
              <option value="Mauritania">Mauritania</option>
              <option value="Mauritius">Mauritius</option>
              <option value="Mayotte">Mayotte</option>
              <option value="Mexico">Mexico</option>
              <option value="Moldova, Republic of">Moldova, Republic of</option>
              <option value="Monaco">Monaco</option>
              <option value="Mongolia">Mongolia</option>
              <option value="Montenegro">Montenegro</option>
              <option value="Montserrat">Montserrat</option>
              <option value="Morocco">Morocco</option>
              <option value="Mozambique">Mozambique</option>
              <option value="Myanmar">Myanmar</option>
              <option value="Namibia">Namibia</option>
              <option value="Nauru">Nauru</option>
              <option value="Nepal">Nepal</option>
              <option value="Netherlands">Netherlands</option>
              <option value="Netherlands Antilles">Netherlands Antilles</option>
              <option value="New Caledonia">New Caledonia</option>
              <option value="New Zealand">New Zealand</option>
              <option value="Nicaragua">Nicaragua</option>
              <option value="Niger">Niger</option>
              <option value="Nigeria">Nigeria</option>
              <option value="Niue">Niue</option>
              <option value="Norfolk Island">Norfolk Island</option>
              <option value="Norway">Norway</option>
              <option value="Oman">Oman</option>
              <option value="Pakistan">Pakistan</option>
              <option value="Palau">Palau</option>
              <option value="Palestinian">Palestinian</option>
              <option value="Panama">Panama</option>
              <option value="Papua New Guinea">Papua New Guinea</option>
              <option value="Paraguay">Paraguay</option>
              <option value="Peru">Peru</option>
              <option value="Philippines">Philippines</option>
              <option value="Pitcairn">Pitcairn</option>
              <option value="Poland">Poland</option>
              <option value="Portugal">Portugal</option>
              <option value="Puerto Rico">Puerto Rico</option>
              <option value="Qatar">Qatar</option>
              <option value="Reunion">Reunion</option>
              <option value="Romania">Romania</option>
              <option value="Russian Federation">Russian Federation</option>
              <option value="Rwanda">Rwanda</option>
              <option value="Saint Helena">Saint Helena</option>
              <option value="Saint Kitts and Nevis">Saint Kitts and Nevis</option>
              <option value="Saint Lucia">Saint Lucia</option>
              <option value="Samoa">Samoa</option>
              <option value="San Marino">San Marino</option>
              <option value="Sao Tome and Principe">Sao Tome and Principe</option>
              <option value="Saudi Arabia">Saudi Arabia</option>
              <option value="Senegal">Senegal</option>
              <option value="Serbia">Serbia</option>
              <option value="Seychelles">Seychelles</option>
              <option value="Sierra Leone">Sierra Leone</option>
              <option value="Singapore">Singapore</option>
              <option value="Slovakia">Slovakia</option>
              <option value="Slovenia">Slovenia</option>
              <option value="Solomon Islands">Solomon Islands</option>
              <option value="Somalia">Somalia</option>
              <option value="South Africa">South Africa</option>
              <option value="Spain">Spain</option>
              <option value="Sri Lanka">Sri Lanka</option>
              <option value="Sudan">Sudan</option>
              <option value="Suriname">Suriname</option>
              <option value="Svalbard and Jan Mayen">Svalbard and Jan Mayen</option>
              <option value="Swaziland">Swaziland</option>
              <option value="Sweden">Sweden</option>
              <option value="Switzerland">Switzerland</option>
              <option value="Syrian Arab Republic">Syrian Arab Republic</option>
              <option value="Taiwan">Taiwan</option>
              <option value="Tajikistan">Tajikistan</option>
              <option value="Tanzania, United Republic of">Tanzania, United Republic of</option>
              <option value="Thailand">Thailand</option>
              <option value="Timor-leste">Timor-leste</option>
              <option value="Togo">Togo</option>
              <option value="Tokelau">Tokelau</option>
              <option value="Tonga">Tonga</option>
              <option value="Trinidad and Tobago">Trinidad and Tobago</option>
              <option value="Tunisia">Tunisia</option>
              <option value="Turkey">Turkey</option>
              <option value="Turkmenistan">Turkmenistan</option>
              <option value="Turks and Caicos Islands">Turks and Caicos Islands</option>
              <option value="Tuvalu">Tuvalu</option>
              <option value="Uganda">Uganda</option>
              <option value="Ukraine">Ukraine</option>
              <option value="United Arab Emirates">United Arab Emirates</option>
              <option value="United Kingdom">United Kingdom</option>
              <option value="United States">United States</option>
              <option value="Uruguay">Uruguay</option>
              <option value="Uzbekistan">Uzbekistan</option>
              <option value="Vanuatu">Vanuatu</option>
              <option value="Venezuela">Venezuela</option>
              <option value="Viet Nam">Viet Nam</option>
              <option value="Virgin Islands, British">Virgin Islands, British</option>
              <option value="Virgin Islands, U.S.">Virgin Islands, U.S.</option>
              <option value="Wallis and Futuna">Wallis and Futuna</option>
              <option value="Western Sahara">Western Sahara</option>
              <option value="Yemen">Yemen</option>
              <option value="Zambia">Zambia</option>
              <option value="Zimbabwe">Zimbabwe</option>
            </select>

            <div className="d-flex flex-column flex-md-row my-3">

              {/* ------------------ Phone Number ------------------ */}

              <input
                type="tel"
                name='number'
                placeholder='Phone Number'
                className="form-control me-md-2 my-2"
                onChange={handleChange} />

              {/* ------------------ Email ------------------ */}

              <input
                type="mail"
                placeholder='Email'
                id='email'
                name='email'
                value={user.email}
                className="form-control ms-md-2 my-md-2"
                onChange={handleChange} />
            </div>

            {/* ------------------ Town  / City ------------------ */}

            <input
              type="text"
              placeholder='Town/City'
              className='form-control my-3'
              name='city'
              onChange={handleChange} />

            {/* ------------------ PostCode ------------------ */}

            <input
              type="number"
              placeholder='Postcode'
              name='postcode'
              className='form-control my-3'
              onChange={handleChange} />

            {/* ------------------ Address ------------------ */}

            <input
              type="text"
              placeholder='Address'
              name='address'
              className="form-control my-3"
              onChange={handleChange} />

          </div>
          <div className="col-12 col-md-4">

            <h3 style={{ "fontSize": "30px", "fontWeight": "400", "borderBottom": "1px solid #5b5b53", "paddingBottom": "22px" }}>
              Your Order
            </h3>

            {/* ---------------------- Products Container ---------------------- */}

            <div className="container-fluid">
              <div className="d-flex justify-content-between" style={{ "margin": "14px 0px" }}>
                <span style={{ "color": "#8d8e8f", "fontWeight": "600" }}>
                  Products
                </span>
                <span style={{ "color": "#8d8e8f", "fontWeight": "600" }}>
                  Total
                </span>
              </div>
              {
                products.map((product, i) => {
                  return (
                    <div key={i} className='d-flex justify-content-between'>
                      {/* Title */}
                      <b>
                        {product.title}
                      </b>
                      {/* Quantity */}
                      <span>
                        {
                          !product.productQuantity
                            ?
                            'x1'
                            :
                            "x" + product.productQuantity
                        }
                      </span>
                      {/* Price */}
                      <span>
                        {
                          !product.total
                            ?
                            "$" + product.currentPrice
                            :
                            "$" + product.total
                        }
                      </span>
                    </div>
                  )
                })
              }
            </div>

            {/* ---------------------- Price Container ---------------------- */}

            <div className="container-fluid my-4">

              {/* ---------------------- Subtotal ---------------------- */}

              <div className="sub-total">
                <b>
                  SubTotal
                </b>
                <span>
                  ${details.subTotal}
                </span>
              </div>


              {/* ---------------------- Shipping ---------------------- */}

              <div className="shipping">
                <b>
                  Shipping
                </b>
                <span>
                  ${details.shippingPrice}
                </span>
              </div>


              {/* ---------------------- Total ---------------------- */}

              <div className="total">
                <b>
                  Total
                </b>
                <span>
                  ${details.TotalPrice}
                </span>
              </div>


            </div>

            {/* ---------------- Payment Method ------------- */}

            <div className="container-fluid">
              {/* ---------------- UI verse Visa card ---------------- */}
              {/* <div className="visa-card">
                <div className="logoContainer">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    width={23}
                    height={23}
                    viewBox="0 0 48 48"
                    className="svgLogo"
                  >
                    <path fill="#ff9800" d="M32 10A14 14 0 1 0 32 38A14 14 0 1 0 32 10Z" />
                    <path fill="#d50000" d="M16 10A14 14 0 1 0 16 38A14 14 0 1 0 16 10Z" />
                    <path
                      fill="#ff3d00"
                      d="M18,24c0,4.755,2.376,8.95,6,11.48c3.624-2.53,6-6.725,6-11.48s-2.376-8.95-6-11.48 C20.376,15.05,18,19.245,18,24z"
                    />
                  </svg>
                </div>
                <div className="number-container">
                  <label className="input-label" htmlFor="cardNumber">
                    CARD NUMBER
                  </label>
                  <input
                    className="inputstyle"
                    id="cardNumber"
                    placeholder="XXXX XXXX XXXX XXXX"
                    name="cardNumber"
                    type="text"
                  />
                </div>
                <div className="name-date-cvv-container">
                  <div className="name-wrapper">
                    <label className="input-label" htmlFor="holderName">
                      CARD HOLDER
                    </label>
                    <input
                      className="inputstyle"
                      id="holderName"
                      placeholder="NAME"
                      type="text"
                    />
                  </div>
                  <div className="expiry-wrapper">
                    <label className="input-label" htmlFor="expiry">
                      VALID THRU
                    </label>
                    <input
                      className="inputstyle"
                      id="expiry"
                      placeholder="MM/YY"
                      type="text"
                    />
                  </div>
                  <div className="cvv-wrapper">
                    <label className="input-label" htmlFor="cvv">
                      CVV
                    </label>
                    <input
                      className="inputstyle"
                      placeholder="***"
                      maxLength={3}
                      id="cvv"
                      type="password"
                    />
                  </div>
                </div>
              </div> */}

              {/* ---------------- Methods ------------- */}

              <div className="payment-methods">
                <span>
                  <input type="radio" name="payment" className='payment me-1' value={"master"} onChange={e => setPaymentMethod(e.target.value)} style={{ "outline": "0" }} id="master" />
                  <label htmlFor="master">Master</label>
                </span>
                <span>
                  <input type="radio" name="payment" className='payment me-1' value={"paypal"} onChange={e => setPaymentMethod(e.target.value)} style={{ "outline": "0" }} id="paypal" />
                  <label htmlFor="paypal">Paypal</label>
                </span>
                <span>
                  <input type="radio" name="payment" className='payment me-1' value={"gpay"} onChange={e => setPaymentMethod(e.target.value)} style={{ "outline": "0" }} id="gpay" />
                  <label htmlFor="gpay">Gpay</label>
                </span>
              </div>
            </div>

            {/* ---------------- Order btn ------------- */}

            <button className="order-btn" onClick={handleOrder}>
              {
                isLoading
                  ?
                  <ButtonLoader />
                  :
                  "Place The Order"
              }
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
