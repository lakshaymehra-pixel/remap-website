import React, { useEffect, useState } from "react";
import "../../css/Common.css";
import ChatButton from "../../components/ChatButton";
import { blogDetail } from "../../Utils/api";
import "./BlogDetail.css";
import { useParams } from 'react-router-dom';


const BlogDetail = () => {
  const { id } = useParams();
  const [blog, setBlog]=useState([])
  useEffect(()=>{
    const params={
      "blog_id": id
    };

    blogDetail(params).then(resp =>{
      if (resp?.data?.Status ===1){
        const blogDetail=resp?.data.data[0] || {};
        setBlog(blogDetail);
      }
    })
  },[])

  // ✅ Add image URL logic here, after blog is set
  const BASE_IMAGE_URL = "https://salarytopup.in/upload/";
  const cleanedFilename = blog.banner_image_url?.replace(/^DIRECT_DOC_URL/, "");
  const fullImageUrl = BASE_IMAGE_URL + cleanedFilename;


  return (
    <>

      <div className="content_page_wrapper">
        <div className="content_page_banner_wrapper">
          <div className="text_content_wrapper">
            <div className="text_content">
              <div className="content_banner">
                <img src={fullImageUrl} alt="Blog Image" />
              </div>
              <h1>{blog.title}</h1>
              <p>{blog.created_date}</p>
              <p>
                {blog.short_description}
              </p>
              <br />
              <div
                className="blog-html-content"
                dangerouslySetInnerHTML={{ __html: blog.long_description }}
              ></div>
              <br />
            </div>
          </div>
        </div>
      </div>
      <ChatButton />
    </>
  );
};

export default BlogDetail;
