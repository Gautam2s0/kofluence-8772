import React, { useEffect, useState } from "react";
import { TbBorderBottom, TbCircleDot } from "react-icons/tb";
import { BiBorderBottom, BiMessageAlt } from "react-icons/bi";
import styles from "./Styles/Liscard.css";
import axios from "axios";

export const ListCard = (props) => {
  let { title, updated_at, state, number, user, comments, i } = props;
  const [display, SetDisplay] = useState("inline");
  const [displayComment, setCommentDisplay] = useState("flex");
  const [userData,setUserData]=useState({})

  //   getting day month and year from the give date
  let date = new Date();
  const arr = `${updated_at}`.split("-");
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const month_index = parseInt(arr[1], 10) - 1;
  const day = arr[2].split("").splice(0, 2).join("");
  const year = arr[0];
  let CurrentYear = date.getFullYear();



  //   comparing given year and current year
  
  useEffect(() => {
    if (+year === CurrentYear) {
      SetDisplay("none");
    }
    // getting user info
    axios.get(`${user.url}`).then((res)=>{
        console.log(res.data)
        setUserData(res.data)
    })
    .catch((err)=>{
        console.log(err)
    })
  }, []);

  return (
    <div className="issue-Card">
      <div
        className="issue-card-inner-div"
        style={{
          border: "1px solid #333",
          borderBottom: i == 29 ? "1px solid #333" : "0px",
          borderTopRightRadius:i==0?"5px":"0px",
          borderTopLeftRadius:i==0?"5px":"0px",
          borderBottomLeftRadius:i==29?"5px":"0px",
          borderBottomRightRadius:i==29?"5px":"0px",
        }}
      >
        <TbCircleDot className="circle" />
        <div className="issue-card-inner-div2">
          <span className="pTitle">{title}</span>
          <p className="secnod-p">
            <span className="spna">
              <span>{`#${number}`}</span>
              <span>{state}</span>
              <span>{` on ${months[month_index]} ${day},`}</span>
              <span style={{ display: display }}>{`${year}`}</span>
              <span>{` by `}</span>
              <a
                href="" 
                className="anchorTag"
                style={{ textDecoration: "none", marginLeft: ".2%" }}
              >
                {
                    userData.name

                }
              </a>
            </span>
          </p>
        </div>
        <div className="comment">
          <span style={{ display: displayComment }}>
            <BiMessageAlt />
          </span>
          <span style={{ display: displayComment }}>{comments}</span>
        </div>
      </div>
    </div>
  );
};