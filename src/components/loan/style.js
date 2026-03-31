import styled from "styled-components";
import banner from "../../images/loginbannerimage.png";
import loginBanner from "../../images/loginBanner.jpg" // Import your mobile banner image

export const FormWrapper = styled.div`
  margin-block: 28px;
  .inputBox {
    max-width: 640px;
    display: flex;
    flex-wrap: wrap;
    gap: 20px;

    & > div {
      flex: 1 1 240px;
      margin-bottom: 0;
      max-width: calc(50% - 10px);

      &.min-w100 {
        min-width: 100%;
      }
    }

    .otp-input {
      max-width: 73%;
    }

    &.panBox {
      width: 100%;
      max-width: 100%;
    }
  }

  .button {
    max-width: 300px;
    width: 100%;
    margin-top: 30px;
  }

  .subheading {
    font-size: 25px;
    color: #082654;
    line-height: 30px;
    font-weight: 600;

    &.small {
      font-size: 14px !important;
    }
  }

  @media only screen and (max-width: 540px) {
    .button {
      max-width: 100%;
    }
    .inputBox {
      & > div {
        max-width: 100%;
        width: 100%;
      }
    }
  }
`;


export const FormWrapper2 = styled.div`
      margin-block: 28px;
    display: flex;
    flex-wrap: wrap;
    gap: 20px;

  .inputBox {
    max-width: 640px;
  

    & > div {
      flex: 1 1 240px;
      margin-bottom: 0;
      max-width: calc(50% - 10px);

      &.min-w100 {
        min-width: 100%;
      }
    }

    .otp-input {
      max-width: 100%;
    }

    &.panBox {
      width: 100%;
      max-width: 100%;
    }
  }

  .button {
    max-width: 300px;
    width: 100%;
    margin-top: 30px;
  }

  .subheading {
    font-size: 25px;
    color: #082654;
    line-height: 30px;
    font-weight: 600;

    &.small {
      font-size: 14px !important;
    }
  }

  @media only screen and (max-width: 540px) {
    .button {
      max-width: 100%;
    }
    .inputBox {
      & > div {
        max-width: 100%;
        width: 100%;
      }
    }
  }
`;