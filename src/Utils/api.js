import Request from "./Request";
import urls from "./urls";

const apiRequest = new Request(
  () => {},
  () => {},
  () => {}
);


export const sendotpForLogin = (params) => {
	return apiRequest.post(`${urls.API_BASEPATH}${urls.loan.SEND_OTP}`, params);
};
export const verifyotpForLogin = (params) => {
	return apiRequest.post(`${urls.API_BASEPATH}${urls.loan.VERIFY_OTP}`, params);
};
export const verifyPan = (params) => {
	return apiRequest.post(`${urls.API_BASEPATH}${urls.loan.VERIFY_PAN}`, params);
};
export const getDashboardData = (params) => {
	return apiRequest.post(`${urls.API_BASEPATH}${urls.loan.GET_DASHBOARD}`, params);
};
export const savePerssonalDetails = (params) => {
	return apiRequest.post(`${urls.API_BASEPATH}${urls.loan.PERSONAL_DETAILS}`, params);
};
export const savePerssonalAddress = (params) => {
	return apiRequest.post(`${urls.API_BASEPATH}${urls.loan.ADDRESS_DETAILS}`, params);
};
export const getStateCityPincode = (params) => {
	return apiRequest.post(`${urls.API_BASEPATH}${urls.loan.STATE_CITY_PINCODE}`, params);
};
export const getIncomeDetails = (params) => {
	return apiRequest.post(`${urls.API_BASEPATH}${urls.loan.INCOME_DETAILS}`, params);
};
export const uploadProfilePhoto = (params) => {
	return apiRequest.post(`${urls.API_BASEPATH}${urls.loan.UPLOAD_PROFILE_PIC}`, params);
};
export const saveDocuments = (params) => {
	return apiRequest.post(`${urls.API_BASEPATH}${urls.loan.CUSTOMER_DOCUMENT}`, params);
};
export const ckeckEligibility = (params) => {
	return apiRequest.post(`${urls.API_BASEPATH}${urls.loan.CHECK_ELIGIBILITY}`, params);
};
export const aboutCompany = (params) => {
	return apiRequest.post(`${urls.API_BASEPATH}${urls.loan.ABOUT_COMPANY}`, params);
};
export const calculateLoan = (params) => {
	return apiRequest.post(`${urls.API_BASEPATH}${urls.loan.CALCULATE_LOAN}`, params);
};
export const generateLoan = (params) => {
	return apiRequest.post(`${urls.API_BASEPATH}${urls.loan.GENERATE_LOAN}`, params);
};

export const userdata = (params) => {
	return apiRequest.post(`${urls.API_BASEPATH}${urls.loan.USER_DATA}`, params);
};

export const saveProfile = (params) => {
	return apiRequest.post(`${urls.API_BASEPATH}${urls.loan.PROFILE_PIC}`, params);
};

export const allLeads = (params) => {
	return apiRequest.post(`${urls.API_BASEPATH}${urls.loan.ALL_LEADS}`, params);
};

export const loanDetail = (params) => {
	return apiRequest.post(`${urls.API_BASEPATH}${urls.loan.LOAN_DETAIL}`,params);
};

export const orderId = (params) => {
	return apiRequest.post(`${urls.API_BASEPATH}${urls.loan.GENERATE_ORDER_ID}`,params);
};

export const requiredDocs = (params) => {
	return apiRequest.post(`${urls.API_BASEPATH}${urls.loan.MANDATORY_DOCS}`,params);
};
export const allBlog = (params) => {
	return apiRequest.post(`${urls.API_BASEPATH}${urls.loan.ALL_BLOGS}`,params);
};
export const blogDetail = (params) => {
	return apiRequest.post(`${urls.API_BASEPATH}${urls.loan.BLOG_DETAILS}`,params);
};

