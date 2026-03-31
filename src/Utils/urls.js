
export default  {
   API_BASEPATH: 'https://salarytopup.in/api',


    loan:{
       SEND_OTP: "/Api/Website/InstantJourneyController/appCustomerRegisteration",
       VERIFY_OTP: "/Api/Website/InstantJourneyController/appCustomerRegisteration",
       GET_DASHBOARD: "/Api/Website/InstantJourneyController/getDashboardData",
       VERIFY_PAN: "/Api/Website/InstantJourneyController/appCustomerRegisteration",
       PERSONAL_DETAILS: "/Api/Website/InstantJourneyController/appCustomerRegisteration",
       INCOME_DETAILS: "/Api/Website/InstantJourneyController/appCustomerRegisteration",
       ADDRESS_DETAILS: "/Api/Website/InstantJourneyController/appCustomerRegisteration",
       CUSTOMER_DOCUMENT: "/Api/Website/InstantJourneyController/saveleadDetails",
       STATE_CITY_PINCODE:"/Api/MasterController/masterAPI",
       UPLOAD_PROFILE_PIC:"/Api/Website/InstantJourneyController/appCustomerRegisteration",
       PROFILE_PIC:"/Api/Website/InstantJourneyController/appCustomerRegisteration",
       CHECK_ELIGIBILITY:"/Api/Website/InstantJourneyController/appCustomerRegisteration",
       ABOUT_COMPANY:"/Api/Website/InstantJourneyController/saveleadDetails",
       CALCULATE_LOAN:"/Api/Website/InstantJourneyController/saveleadDetails",
       USER_DATA:"/Api/Website/getUser",
       ALL_LEADS: "/Api/Website/InstantJourneyController/getLeadList",
       LOAN_DETAIL: "/Api/Website/InstantJourneyController/getLeadDetail",
       GENERATE_LOAN:"/Api/Website/InstantJourneyController/saveleadDetails",
       GENERATE_ORDER_ID:"/Api/Website/InstantJourneyController/generateRazorpayorderId",
       MANDATORY_DOCS:"/Api/Website/InstantJourneyController/check_customer_mandatory_documents",
       ALL_BLOGS:"/Api/Website/BlogsController/blog",
       BLOG_DETAILS:"/Api/Website/BlogsController/blogDetail"
    }
}