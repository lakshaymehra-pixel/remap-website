import styled from "styled-components";

export const PictureUploadWrapper = styled.div`


    width: 300px;
    min-width: 300px;
    min-height: 175px;
    border: 1px dashed #E1E1E1;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    transition: border-color 0.3s;
    position: relative;
    border-radius: 12px;
    background-color: #fff;
    overflow: hidden;
    user-select: none;
    &:hover {
    border-color: #aaa;
  }

  .showTextImg{
    padding: 20px;
    img{
        width: 28px;
        height: 28px;
        display: block;
        margin-inline: auto;
    }
  }

    p{
    font-size: 10px;
    max-width: 200px;
    margin-inline: auto;
  }
  
  .preview-container {
    position: relative;
    width: 300px;
    min-height: 140px;
    img {
    max-width: 100%;
    max-height: 100%;
  }
  .remove-icon {
    position: absolute;
    top: 10px;
    right: 10px;
    background: rgba(255, 255, 255, 0.7);
    border-radius: 50%;
    padding: 0px;
    cursor: pointer;
    height: 26px;
    width: 26px;
    text-align: center;
    &:hover {
    background: rgba(255, 255, 255, 1);
  }
  }
  }
`;