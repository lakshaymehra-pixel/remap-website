import styled from "styled-components";


export const ProfileHeaderWrapper = styled.div`
background: beige 0% 0% no-repeat padding-box;
padding: 2px;
border-radius: 15px;
position: relative;
.outstandingAmount{
 float:right;
 font-size:13px;
 font-weight:600;
}
.imgBox{
    width: 172px;
    height: 188px;
    box-shadow: 0px 1px 2px #0000001C;
border: 7px solid #FFFFFF;
border-radius: 18px;
position: absolute;
top: 22px;
left: 30px;
background-color: #fff;
&>img{
    height: 100%;
    border-radius: 15px;
}
.editIcon{
    position: absolute;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: #F3F3F3 ;
    position: absolute;
    right: -20px;
    top: 100px;
    img{
        width: 18.5px;
    }

}
img{
    width: 100%;
}
}



.main{
    background: #FFFFFF 0% 0% no-repeat padding-box;
    box-shadow: 0px 1px 2px #00000014;
   border-radius: 13px;
   padding: 22px 18px;

   gap: 16px;
   align-items: center;
   min-height: 150px;

   .textBox{
    margin-left: 240px;
    color: #082654;
    line-height: 25px;
    .title{
   width: 100px;

    }
    .value{

        font-weight: 600;
    }
   }

}
.bottom{
   padding-block: 12px;
   padding-inline: 20px;
   gap: 30px;
   align-items: center;
   justify-content: center;
   margin-left: 240px;
   button{
        max-width: 150px;
        height: 45px;
        font-size: 15px;
        font-weight: 600;
    }
}
@media only screen and (max-width: 768px){
    .outstandingAmount{
        float: none;
         font-size: 7px;
         font-weight: 500;
    }
    .outstandingAmount .button{
      float:none;
    }
    .main{
    padding-top: 175px;
    display: flex;
    justify-content: center;
    .textBox{
        margin-left: 0;
    }
    }
     .bottom {
   margin-left: auto;
   font-size: 12px;
   line-height: 14px;
   flex-direction: column;
   gap: 10px;
   button{
    align-self: self-end;
    max-width: 120px;
        height: 30px;
        font-size: 12px;
   }
    }
    .imgBox{
        top: 10px;
        left: 50%;
        transform: translateX(-50%);
        width: 140px;
        height: 155px;
        .editIcon{
            top: 80px;
        }
    }
}
`;


export const DetailBoxWrapper = styled.div`

background: #FFFFFF 0% 0% no-repeat padding-box;
box-shadow: 10px 2px 5px 2px #6e718f;
border-radius: 15px;
opacity: 1;
padding: 22px;
&:hover{
   box-shadow: 10px 2px 5px 2px #26b9db;
   }

.header{
    display: flex;
    justify-content: space-between;
    gap: 40px;
    h2{
        font-size: 20px;
        line-height: 24px;

    }
    .icons{
        color: #000;
        background-color: #F3F3F3 ;
        font-weight: 600;
        cursor: pointer;
       border-radius: 13px;
       height: 25px;
    width: 70px;
    transition: all .3s;
    gap: 4px;
    img{
        width: 15px;

    }
    &:hover{
        color: #fff;
        background: #26B9DB;
        img{
            filter: invert(1);
        }
    }
    }
}
.main{

    margin-top: 30px;
    table{
        border: none;
        tr{
            td{
                padding: 0 0 0 0;
                font-size: 15px;
                line-height: 30px;
                color: #082654;
              &:first-child{
                padding-right: 30px;
              }
              &:last-child{
                font-weight: 600;
              }

            }
        }
    }
}
`;


export const ProfilePreviewWrapper = styled.div`

.detailBox{
    margin-block: 30px;
    display: flex;
    gap: 14px;
    flex-wrap: wrap;


    &>div{
        flex: 0.32 0 16%;
        min-width: 355px;
        margin-left: 20px;
    }



}





`;


