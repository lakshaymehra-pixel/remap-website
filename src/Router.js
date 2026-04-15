import React from "react";
import { Route, Routes,Navigate  } from "react-router-dom";
import LoanLayout from "./LoanLayout";
import Layout from "./Layout";
import ScrollToTop from "./components/ScrollTop";
import About from "./pages/About";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import ApplyForLoan from "./pages/ApplyForLoan";
import FAQ from "./pages/FAQ";
import RateandTerms from "./pages/RateandTerms";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsandConditions from "./pages/TermsandConditions";

import RepayLoan from "./pages/RepayLoan";
import Home from "./pages/Home";
import DashBoard from "./pages/Dashboard/DashBoard";
import PanDetails from "./pages/Dashboard/PanDetails/PanDetails";
import CapturAddress from "./pages/Dashboard/CapturAddress/CapturAddress";
import CapturPersonalInformation from "./pages/Dashboard/CapturPersonalInformation/CapturPersonalInformation";
import CapturIncomeDetails from "./pages/Dashboard/CapturIncomeDetails/CapturIncomeDetails";
import UploadPicture from "./pages/Dashboard/UploadPicture/UploadPicture";
import ProfilePage from "./pages/Dashboard/ProfilePage/ProfilePage";
import ProfilePreview from "./pages/Dashboard/ProfilePage/ProfilePreview";
import CalculateLoan from "./pages/Dashboard/CalculateLoan/CalculateLoan";
import AboutCompany from "./pages/Dashboard/AboutCompany/AboutCompany";
import Ekyc from "./pages/Dashboard/Ekyc/Ekyc";
import UploadBankStatement from "./pages/Dashboard/UploadBankStatement/UploadBankStatement";
import Eligibility from "./pages/Dashboard/Eligibility/Eligibility";
import ProtectedRoute from "./components/ProtectedRoute";
import PanUpload from "./pages/Dashboard/PanUpload/PanUpload";
import DocumentUpload from "./pages/Dashboard/DocumentUpload/DocumentUpload";
import ThankYou from "./pages/Dashboard/ThankYou/ThankYou";
import UploadSalaryslip from "./pages/Dashboard/UploadSalaryslip/UploadSalaryslip";
import UploadUtilitybill from "./pages/Dashboard/UploadUtilitybill/UploadUtilitybill";
import LeadPreview from "./pages/Dashboard/ProfilePage/LeadPreview";
import LoanHistory from "./pages/LoanHistory/LoanHistory";
import LoanDetail from "./pages/LoanHistory/LoanDetail"
import BankDetail from "./pages/Dashboard/BankDetail/BankDetail";
import Tnc from "./pages/Dashboard/Tnc/Tnc";
import Support from "./pages/Dashboard/Support/Support";
import Privacy from "./pages/Dashboard/Privacy/Privacy";

import RepayThankyou from "./pages/RepayThanku";
import NotFound from "./pages/404";
import Career from "./pages/Career";
import FeatureDetail from "./pages/FeatureDetail";
import BlogAll from "./components/Blog/BlogAll";
import BlogDetail from "./components/Blog/BlogDetail";
import Paymentgateway from "./pages/Paymentgateway";
import AdminPanel from "./pages/AdminPanel";

const showmessage = async (message) => {
  try {
    var x = document.getElementById("snackbar");
    x.className = "show";
    x.innerText = message;
    setTimeout(function () {
      x.className = x.className.replace("show", "");
    }, 3000);
  } catch (error) {
    console.log(error);
  }
};

function Router() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="home" element={<Home />} />
          <Route path="about-us" element={<About />} />
          <Route path="services" element={<Services />} />
          <Route path="contact" element={<Contact />} />
          <Route path="faq" element={<FAQ />} />
          <Route path="rate-and-terms" element={<RateandTerms />} />
          <Route path="privacy-policy" element={<PrivacyPolicy />} />
          <Route path="terms-and-conditions" element={<TermsandConditions />} />
          <Route path="thanku" element={<RepayThankyou/>}/>
          <Route path="apply-now" element={<ApplyForLoan showmessage={showmessage} />} />
          <Route path="repayloan" element={<Navigate to="/repay-loan" replace />} />
          <Route path="repay-loan" element={<RepayLoan showmessage={showmessage} />} />
          <Route path="career" element={<Career />} />
          <Route path="features/:slug" element={<FeatureDetail />} />
          <Route path="blog" element={<BlogAll />} />
          <Route path="/blog/:slug" element={<BlogDetail />} />
          <Route path="/paymenthdfc" element={<Paymentgateway />} />


        </Route>

        <Route path="/my-dashboard" element={<LoanLayout />}>
          <Route path="/my-dashboard/" element={<DashBoard showmessage={showmessage} />} />
          <Route path="/my-dashboard/pan-details" element={<PanDetails />} />
          <Route path="/my-dashboard/captur-address" element={<CapturAddress />} />
          <Route path="/my-dashboard/captur-personal-information" element={<CapturPersonalInformation />} />
          <Route path="/my-dashboard/captur-income-details" element={<CapturIncomeDetails />} />
          <Route path="/my-dashboard/upload-picture" element={<UploadPicture />} />
          <Route path="/my-dashboard/user-profile" element={<ProfilePage />} />
          <Route path="/my-dashboard/profile-preview" element={<ProfilePreview />} />
          <Route path="/my-dashboard/calculate-loan" element={<CalculateLoan />} />
          <Route path="/my-dashboard/about-your-company" element={<AboutCompany />}/>
          <Route path="/my-dashboard/bank-detail" element={<BankDetail />} />
          <Route path="/my-dashboard/kyc" element={<Ekyc />} />
          <Route path="/my-dashboard/bank-upload" element={<UploadBankStatement />} />
          <Route path="/my-dashboard/pan-upload" element={<PanUpload />} />
          <Route path="/my-dashboard/adhar-upload" element={<DocumentUpload />} />
          <Route path="/my-dashboard/congratulations" element={<ThankYou />} />
          <Route path="/my-dashboard/upload-salaryslip" element={<UploadSalaryslip />} />
          <Route path="/my-dashboard/upload-utilitybill" element={<UploadUtilitybill />} />
          <Route path="/my-dashboard/lead-preview" element={<LeadPreview />} />
          <Route path="/my-dashboard/leads" element={<LoanHistory />} />
          <Route path="/my-dashboard/details" element={<LoanDetail />} />
          <Route path="/my-dashboard/tnc" element={<Tnc />} />
          <Route path="/my-dashboard/support" element={<Support />} />
          <Route path="/my-dashboard/privacypolicy" element={<Privacy />} />
          {/* <Route path="/my-dashboard/eligibility" element={<Eligibility />} /> */}

          <Route
            path="/my-dashboard/eligibility"
            element={
              <ProtectedRoute
                redirectTo="/my-dashboard"
                element={<Eligibility />}
              />
            }
          />
        </Route>
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default Router;



