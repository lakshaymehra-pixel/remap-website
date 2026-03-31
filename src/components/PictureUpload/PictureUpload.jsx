import React, { useState, useRef, useEffect } from "react";

import { PictureUploadWrapper } from "./style";
import icon from "../../images/uploadIcon.svg";
import { isEmpty } from "../../Utils/common";
import fileIcon from "../../images/file.png";

const PictureUpload = ({
  setImage = () => {},
  image = "",
  accept = "image/jpeg,image/png,image/jpg",
  type = "image",
}) => {
  const [fileName, setFileName] = useState(null);
  const [preview, setPreview] = useState("");
  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    try {
      const selectedFile = event.target.files[0];
      // setFile(selectedFile);
      setImage(selectedFile);
      setFileName(selectedFile.name);

      setPreview(URL.createObjectURL(selectedFile));
    } catch (error) {}
  };

  const handleDrop = (event) => {
    try {
      event.preventDefault();
      const droppedFile = event.dataTransfer.files[0];
      // setFile(droppedFile);
      setImage(droppedFile);
      setFileName(droppedFile.name);
      setPreview(URL.createObjectURL(droppedFile));
    } catch (error) {}
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleRemove = (e) => {
    e.stopPropagation();
    // setFile(null);
    setImage(null);
    setPreview("");
    setFileName("");
    fileInputRef.current.value = null;
  };

  useEffect(() => {
    if (isEmpty(image)) return;
    setPreview(image);
  }, [image]);

  console.log("preview", preview);
  return (
    <PictureUploadWrapper
      className="file-upload"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onClick={handleClick}
    >
      {preview ? (
        <>
          {type === "image" ? (
            <div className="preview-container">
              <img
                src={preview}
                alt="Preview"
                style={{ width: "100%", height: "auto" }}
              />
              <span className="remove-icon" onClick={handleRemove}>
                &#10005;
              </span>
            </div>
          ) : (
            <div className="showTextImg">
              <div>
                <span className="remove-icon" onClick={handleRemove}>
                  &#10005;
                </span>
                <img src={fileIcon} alt="" />
                <p
                  style={{
                    marginInline: "0",
                    maxWidth: "100%",
                    textAlign: "center",
                    marginTop: "20px",
                  }}
                >
                  {fileName}
                </p>
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="showTextImg">
          <div>
            <img src={type === "image" ? icon : fileIcon} alt="" />
            <p style={{ padding: "20px" }}>
              Drag & Drop your file here or click to select a file
            </p>
          </div>
        </div>
      )}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept={accept}
        style={{ display: "none" }}
      />
    </PictureUploadWrapper>
  );
};

export default PictureUpload;
