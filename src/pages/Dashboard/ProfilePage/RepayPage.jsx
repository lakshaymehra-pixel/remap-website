// import React, { useContext,useState,useEffect } from "react";
// import { useParams } from "react-router-dom";
// import { ProfilePreviewWrapper } from "../../Dashboard/ProfilePage/style";
// import ProfileHeader from "../../Dashboard/ProfilePage/ProfileHeader";
// import ContextDashboard from "../../../Context/ContextDashboard";
// import { getStorage,setStorage } from "../../../Utils/common";
// import { getDashboardData,orderId } from "../../../Utils/api";
// import PaymentModal from "../../../components/Payment/PaymentModal";
// import { useNavigate } from "react-router-dom";

// function RepayPage(props) {

//   const [content, setContent] = useState("pannumber");
//   const [getLoading, setLoading] = useState(false);
//   const [isModalOpen, setModalOpen] = useState(false);
//   const [paymentStatus, setPaymentStatus] = useState("");
//   const {outdata,logout}=useContext(ContextDashboard);
//   const [repayData, setRepayData]=useState("")
//   const[order,setOrder]=useState("")
//   const [paymentAmount, setPaymentAmount] = useState();
//   const navigate=useNavigate();

//   useEffect(() => {
//     const params = {
//       profile_id: getStorage("cust_profile_id") || "",
//     };

//     getDashboardData(params).then(resp => {
//       if (resp?.data?.Status === 1) {
//         const dashboardData = resp?.data || {};
//         setStorage('dashboardData', dashboardData);
//         setRepayData(dashboardData)
//         if (dashboardData){
//           const param={
//             lead_id:dashboardData?.Data?.active_loan_details?.lead_id,
//             rzp_amount:dashboardData?.Data?.active_loan_details?.total_due
//            };
//            orderId(param).then(resp=>{
//             if(resp?.data?.Status===1){
//               const orderData = resp?.data || {};
//               setOrder(orderData)

//             }
//            })
//         }

//       }
//     });
//   }, []);


//   const payHere = async () => {
//     setLoading(true);
//     try {
//       const total_due_amount = paymentAmount || repayData?.Data?.active_loan_details?.total_due;
//       const options = {
//         key: "rzp_live_3XXwpvgLtdYIh3",
//         amount: (total_due_amount * 100).toString(),
//         currency: "INR",
//         name: "Salary Topup",
//         image: "https://web.salarytopup.in/public/images/final_logo.png",
//         order_id: order?.Data?.order_id,
//         // callback_url: "https://salarytopup.in/thankyou",
//         prefill: {
//           name: repayData?.Data?.profile_details?.first_name,
//           email: repayData?.Data?.profile_details?.cp_personal_email,
//           contact: repayData?.Data?.profile_details?.cp_mobile,
//         },
//         theme: { color: "#8180e0" },
//         handler: function (response) {
//           // Callback function when payment is successful
//           const paymentDetails = {
//             razorpay_payment_id: response.razorpay_payment_id,
//             razorpay_order_id: response.razorpay_order_id,
//             razorpay_signature: response.razorpay_signature,
//           };

//           fetch("https://api.sotcrm.com/Api/CustomerDetails/verifyRazorPayCheckPaymentStatus", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json; charset=UTF-8",
//                 Auth: "Y2M0Nzk0OGYwNmQyMjdmZTlhY2E1ZWQ1Nzk5YTZmMWE=",
//                 Accept: "application/json",
//             },
//             body: JSON.stringify(paymentDetails),
//         })
//             .then((res) => res.json())
//             .then((data) => {
//                 let txnStatus = data.status
//                 let txnId = data.txnId || "N/A";

//                 // Pass txnStatus and txnId to the thank you page using navigate
//                 navigate("/thanku", {
//                     state: {
//                         txnStatus: txnStatus,
//                         txnId: txnId,
//                     },
//                 });

//                 setPaymentStatus(txnStatus === 'SUCCESS' ? "Payment Successful" : "Payment Verification Failed");
//                 setContent(txnStatus === 'SUCCESS' ? "paymentSuccess" : "paymentFailure");
//                 setLoading(false);
//             })
//             .catch((error) => {
//                 console.error("Error verifying payment:", error);
//                 setPaymentStatus("Payment Verification Failed");
//                 setLoading(false);
//             });
//     },
// };

// const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");
// if (res) {
//     const paymentObject = new window.Razorpay(options);
//     paymentObject.open();
// } else {
//     alert("Razorpay SDK failed to load. Are you online?");
// }
// } catch (error) {
// console.error("Error during payment:", error);
// setLoading(false);
// }
// };

// let processing = false; // Define the flag outside the function scope

// const payWithPayU = async () => {
//     if (processing) return; // Prevent function from running if already in process
//     processing = true;

//     setLoading(true);
//     try {
//         const total_due_amount = paymentAmount || repayData?.Data?.active_loan_details?.total_due;
//         // const total_due_amount = 1;
//         const MERCHANT_KEY = "LrvBUp";
//         const productinfo = "Loan repayment for Loan No";
//         const fullname = repayData?.Data?.profile_details?.first_name;
//         const email = repayData?.Data?.profile_details?.personal_email;
//         const phone = repayData?.Data?.profile_details?.mobile;

//         const response = await fetch("https://api.sotcrm.com/Api/RepayLoanApi/payuOrders", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json; charset=UTF-8",
//                 Accept: "application/json",
//                 "Auth":"MjFmMTdiYjE0MTM3Y2YxODQxYjhiMGEwNTY4M2I1ZDE="
//             },
//             body: JSON.stringify({
//                 amount: total_due_amount,
//                 productinfo: productinfo,
//                 firstname: fullname,
//                 email: email,
//                 mobile: phone,
//                 udf5: repayData?.Data?.active_loan_details?.lead_id
//             }),
//         });

//         const data = await response.json();

//         if (data.Status === 1) {
//             const hashData = data.data.parameters;

//             const payuOptions = {
//                 key: MERCHANT_KEY,
//                 txnid: hashData.txnid,
//                 amount: total_due_amount,
//                 productinfo: productinfo,
//                 firstname: fullname,
//                 email: email,
//                 phone: phone,
//                 surl: "https://salarytopup.com/thanku",
//                 furl: "https://salarytopup.com/thanku",
//                 hash: hashData.hash,
//                 udf5:repayData?.Data?.active_loan_details?.lead_id
//             };

//             const scriptLoaded = await loadScript("https://jssdk.payu.in/bolt/bolt.min.js");

//             if (scriptLoaded) {
//               if (typeof window.bolt !== 'undefined') {
//                   window.bolt.launch(payuOptions, {
//                       responseHandler: function (BOLT) {
//                           if (BOLT.response.txnStatus === "SUCCESS") {
//                               // Pass the transaction status to the Thank You page via React Router's state
//                               navigate("/thanku", { state: { txnStatus: BOLT.response.txnStatus, txnId: BOLT.response.txnid } });
//                           }
//                           if (BOLT.response.txnStatus === "FAILED" || BOLT.response.txnStatus === "CANCEL") {
//                               navigate("/thanku", { state: { txnStatus: BOLT.response.txnStatus, txnId: BOLT.response.txnid } });
//                           }
//                       },
//                       catchException: function (BOLT) {
//                           console.log('Payment failed. Please try again.');
//                       }
//                   });
//               } else {
//                   console.error("PayU SDK not initialized correctly after loading.");
//               }
//           } else {
//               console.error("Failed to load PayU script.");
//           }
//       } else {
//           console.error("Failed to get valid response from PayU API.");
//       }
//   } catch (error) {
//       console.error("Error during PayU payment:", error);
//   } finally {
//       setLoading(false);
//       processing = false;
//   }
// };

//   const loadScript = (src) => {
//     return new Promise((resolve) => {
//       const script = document.createElement("script");
//       script.src = src;
//       script.onload = () => resolve(true);
//       script.onerror = () => resolve(false);
//       document.body.appendChild(script);
//     });
//   };

//   const handlePaymentClick = () => {
//     setModalOpen(true);
//     setLoading(false);
// };

// const handleCloseModal = () => {
//     setModalOpen(false);

// };

// const handleRazorpay = () => {
//     setModalOpen(false);
//     payHere();
//     setLoading(false);
// };

// const handlePayU = () => {
//     setModalOpen(false);
//     payWithPayU();
//     setLoading(false);
// };
// const handlePaymentAmountChange = (e) => {
//   let value = e.target.value;

//   // Prevent the value from starting with 0, but allow decimal numbers
//   if (value.length === 1 && value === '0') {
//     // Do nothing if the input is just "0"
//     return;
//   }

//   // Regex to ensure the input doesn't start with a "0" unless it's "0." (i.e., decimal number like 0.50 is allowed)
//   const regex = /^(?!0(\.\d+)?)(\d*\.?\d*)$/;

//   // Only update if the value matches the regex pattern
//   if (regex.test(value) || value === "") {
//     setPaymentAmount(value);
//   }
// };

//   return (
//     <ProfilePreviewWrapper>
//       <ProfileHeader /><br/>

//       <div className="repayment-card">
//                 <div className="repayment-header">
//                   <h2>Loan Repayment Details</h2>
//                 </div>

//                 <div className="repayment-info">
//                   <div className="info-item">
//                     <span className="label">Loan Number:</span>
//                     <span className="value">{repayData?.Data?.active_loan_details?.loan_no}</span>
//                   </div>
//                   <div className="info-item">
//                     <span className="label">Disbursal Date:</span>
//                     <span className="value">{repayData?.Data?.active_loan_details?.disbursal_date}</span>
//                   </div>
//                   <div className="info-item">
//                     <span className="label">Repayment Date:</span>
//                     <span className="value">{repayData?.Data?.active_loan_details?.repayment_date}</span>
//                   </div>
//                   <div className="info-item">
//                     <span className="label">Repayment Amount:</span>
//                     <span className="value">₹{repayData?.Data?.active_loan_details?.repayment_amount}</span>
//                   </div>
//                   <div className="info-item">
//                     <span className="label">Loan Amount:</span>
//                     <span className="value">₹{repayData?.Data?.active_loan_details?.loan_recommended}</span>
//                   </div>
//                   <div className="info-item">
//                     <span className="label">Real Interest:</span>
//                     <span className="value">₹{repayData?.Data?.active_loan_details?.roi}</span>
//                   </div>
//                   <div className="info-item">
//                     <span className="label">Repayment With Interest:</span>
//                     <span className="value">₹{repayData?.Data?.active_loan_details?.total_due}</span>
//                   </div>
//                   <div className="info-item due-amount">
//                     <span className="label">Total Due Amount:</span>
//                     <span className="value">₹{repayData?.Data?.active_loan_details?.total_due}</span>
//                   </div>
//                   <div className="info-item part-amount">
//                   <span className="label">Amount To Pay</span>
//                   {/* Make the Amount To Pay field editable */}
//                   <input
//                                           type="text"
//                                           value={paymentAmount}
//                                           onChange={handlePaymentAmountChange}
//                                           placeholder="Enter payment amount"
//                                       />
//                 </div>
//                 </div>

//                 <div className="repayment-button-container">
//                   <button className="repayment-button" onClick={handlePaymentClick}>
//                     {getLoading ? <div className="loadinganim"></div> : "Proceed to Pay"}
//                   </button>
//                 </div>

//                 {isModalOpen && (
//                   <PaymentModal
//                     onClose={handleCloseModal}
//                     onRazorpay={handleRazorpay}
//                     onPayU={handlePayU}
//                     isLoading={getLoading}
//                   />
//                 )}

//               </div>

//     </ProfilePreviewWrapper>

//   );
// }

// export default RepayPage;


