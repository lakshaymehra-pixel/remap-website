import styled from "styled-components";
import bannerImg from "../../images/bannerimg.webp";

export const DashboardWrapper = styled.div`

.carde{
    display: flex;
    gap: 20px;
    flex-wrap: wrap;
    margin-block: 35px;
    >div{
        flex: 1 1 30%;
    }
}
.banner{
 gap: 20px;
 margin-block: 35px;
 flex-wrap: wrap;
 .card{
    background: #FFFFFF ;
box-shadow: 0px 1px 2px #00000014;
border-radius: 15px;
flex: 1 1 30%;
max-width: 420px;
min-width: 280px;
min-height: 242px;
&.card1{
    background: url(${bannerImg});
    background-size: cover;
    background-position: bottom right;
    padding: 30px 20px;
    h2{
        color: #fff;
        font-size: 28px;
        line-height: 34px;
    }
}
&.card2{
    overflow: hidden;

    img{
        width: 100%;
        transform: scale(1.02);
        background-color: #000000a1;
    }
    .play{
        gap: 8px;
        padding: 20px 20px;
        img{
            width: 17px;
            background-color: transparent;
           
        }
        h2{
            font-size: 15px;
            color: #082654;
        }
    }
}
&.card3{
 padding: 22px;
 h3{
    font-size: 15px;
    margin-bottom: 12px;
    
 }
 p{
    font-size: 13px;
    line-height: 19px;
    margin-bottom: 10px ;
 }
}
 }
}
@media only screen and (max-width: 768px){
    .hideMD{
        display: none;
    }
}
`;

export const DashboarCarddWrapper = styled.div`
  display: flex;
  gap: 8px;
  padding: 23px 25px;
  background: #FFFFFF;
  box-shadow: 0px 1px 2px #00000014;
  border-radius: 15px;
  min-height: 100px;
  max-width: 420px;
  min-width: 280px;

 

  &.current {
    background-color: #26B9DB; 
    color: white; 
  }

  

  .icons {
    width: 55px;
    height: 55px;
    min-width: 55px;
    background-color: #F3F3F3;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;

    img {
      width: 28px;
    }

    &.active {
      background-color: #26B9DB;
    }
  }

  .rightBox {
    width: 100%;

    .header {
      justify-content: space-between;
      gap: 8px;
      width: 100%;

      h2 {
        font-size: 15px;
        font-weight: 600;
        color: #082654;
      }
    }

    p {
      font-size: 13px;
      line-height: 19px;
    }
  }

  @media only screen and (max-width: 768px) {
    margin-inline: auto;
  }
`;