import styled from "styled-components";

export const HeaderWrapper = styled.div`
justify-content: space-between;
align-items: center;
gap: 20px;
padding: 15px 15px;
border-radius:40px;
.left{
  align-items: center;
  gap: 18px;
  margin-left:20px;
  .logo{
    max-width: 260px;
    img{
        width: 65%;
        min-width: 80px;
        margin-left:30px;
        &.sm{
          display: none;
        }
        @media only screen and (max-width: 500px){
          width: 80px;
          &.sm{
          display: block;
        }
        &.xl{
          display: none;
        }
        }
    }
  }
}

.right{
    background: #FFFFFF 0% 0% no-repeat padding-box;
box-shadow: 0px 1px 2px #00000017;
border-radius: 25px;
align-items: center;
align-self: center;
gap: 10px;
padding-left: 5px;
padding-right: 20px;
color: #082654;
font-size: 15px;
height: 50px;
font-weight: 600;
margin-right:10px;
.name{
       white-space: nowrap;
    }

.icon{
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: #f9f9f9;
    overflow: hidden;
   display:flex;
    img{
        width: 100%;
    }
}
}
@media only screen and (max-width: 500px){
  padding: 20px 0px;
  .left{
    gap: 8px;
    .badgeIcon{
    margin-left:10px;
      img{
        width: 20px;
      }
    }
  }
}
`