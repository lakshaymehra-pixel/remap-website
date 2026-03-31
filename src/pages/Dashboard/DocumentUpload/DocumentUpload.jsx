import React, { useContext, useEffect, useState } from "react";
import { BoxWrapper } from "../../../style";
import arrowIcon from "../../../images/arrow.png";
import { FormWrapper2 } from "../../../components/loan/style";
import Button from "../../../components/ui/Button";
import Alert from "../../../components/ui/Alert";
import { useNavigate } from "react-router-dom";
import { getStorage, goBack, setStorage } from "../../../Utils/common";
import PictureUpload from "../../../components/PictureUpload/PictureUpload";
import { saveDocuments, requiredDocs } from "../../../Utils/api";
import ContextDashboard from "../../../Context/ContextDashboard";



function DocumentUpload() {
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [documentsRequired, setDocumentsRequired] = useState([]);
    const [uploadedDocuments, setUploadedDocuments] = useState({});
    const [isLoadingDocs, setIsLoadingDocs] = useState(true); // Loading state for docs
    const navigate = useNavigate();
    const { logout, handleEvent } = useContext(ContextDashboard);

    // Fetch required documents when the component mounts
    useEffect(() => {
        const params = { profile_id: getStorage("cust_profile_id") || "" };
        setIsLoadingDocs(true); // Set loading state to true before API call
        requiredDocs(params).then(resp => {
            if (resp?.data?.Status === 1) {
                setDocumentsRequired(resp?.data?.Data || []);
                // setMessage({ type: 'success', msg: resp?.data?.Message, place:"globle" });
                setMessage({ type: 'success', msg: resp?.data?.Message, place: "globle" });

            } else {
                setMessage({ type: "error", msg: resp?.data?.Message });
            }
            setIsLoadingDocs(false); // Set loading state to false once data is fetched
        }).catch(err => {
            setMessage({ type: "error", msg: "Failed to fetch required documents." });
            setIsLoadingDocs(false); // Set loading state to false on error
        });
    }, []);

    // Handle file change (image or document)
    const handleFileChange = (docName, file) => {
        setUploadedDocuments(prev => ({ ...prev, [docName]: file }));
    };

    // Convert file to base64 for upload
    const convertToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result.split(",").pop());
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    };

    // Submit the documents
    const submitDocuments = async () => {
        // Validation: Check if all required documents have been uploaded
        const missingDocuments = documentsRequired.filter(doc => !uploadedDocuments[doc.name]);
        if (missingDocuments.length > 0) {
            setMessage({ type: "error", msg: "Please upload all required documents." });
            return; // Stop the submission if there are missing documents
        }

        setLoading(true);

        const uploadPromises = [];
        for (const doc of documentsRequired) {
            const docName = doc.name;
            const file = uploadedDocuments[docName];
            if (file) {
                try {
                    const base64File = await convertToBase64(file);
                    const ext = file.name.split('.').pop().toUpperCase();
                    const param = {
                        profile_id: getStorage("cust_profile_id") || "",
                        file_ext: ext,
                        password: "N/A",
                        event_name: doc.event_name,
                        doc_type: doc.doc_type,
                        file: base64File,
                    };
                    uploadPromises.push(saveDocuments(param));
                } catch (err) {
                    setMessage({ type: "error", msg: `Failed to upload ${docName}. Please try again.` });
                    setLoading(false);
                    return;
                }
            }
        }

        try {
            const responses = await Promise.all(uploadPromises);
            const successResponses = responses.filter(resp => resp?.data?.Status === 1);
            if (successResponses.length === uploadPromises.length) {
                setMessage({ type: 'success', msg: 'All documents uploaded successfully', place: "global" });
                setStorage("next_step", successResponses[0]?.data?.Data?.next_step);
                setStorage('percent', successResponses[0]?.data?.Data?.step_percentage);
                handleEvent(getStorage('next_step'));
            } else {
                setMessage({ type: "error", msg: "Some documents failed to upload. Please try again." });
            }
        } catch (error) {
            setMessage({ type: "error", msg: "An error occurred while uploading documents. Please try again." });
        }

        setLoading(false);
    };

    return (
        <>

        <BoxWrapper className="w100">
            <div className="formmainBox flex">
                <div className="left">
                    {/* <div className='center gap4 pointer' onClick={() => goBack(navigate, "/my-dashboard/about-your-company")}>
                        <img src={arrowIcon} alt="" /> <span>Back</span>
                    </div> */}
                </div>
                <div className="right">
                    <h2>Upload Your Documents</h2>
                    <p>Upload your documents to verify your details</p>

                    <FormWrapper2>
                        <Alert setMessage={setMessage} message={message} />

                        {isLoadingDocs ? (  // Show loading spinner when documents are being fetched
                            <p>Loading required documents...</p>
                        ) : (
                            documentsRequired.length > 0 ? (
                                documentsRequired.map(doc => (
                                    <div key={doc.name} className="inputBox">
                                        <h2 className="subheading small">{doc.name} <span style={{color:"red"}}>*</span> </h2>

                                        {/* Render PictureUpload dynamically based on allowed format */}
                                        <PictureUpload
                                            setImage={(file) => handleFileChange(doc.name, file)}
                                            image={uploadedDocuments[doc.name] || ""}
                                            accept={doc.allowed_format === "image" ? "image/*" : "application/pdf"}
                                            type="file"

                                        />
                                    </div>
                                ))
                            ) : (
                                <p>No documents are required at this moment.</p>
                            )
                        )}

                        {/* Conditionally render the button only if documents are loaded */}
                        {!isLoadingDocs && documentsRequired.length > 0 && (
                            <div className="button">
                                <Button
                                    title="Continue"
                                    onClick={submitDocuments}
                                    loading={loading}
                                    disabled={loading || isLoadingDocs}  // Disable button while uploading or fetching
                                />
                            </div>
                        )}
                    </FormWrapper2>
                </div>
            </div>
        </BoxWrapper>
        </>
    );
}

export default DocumentUpload;
