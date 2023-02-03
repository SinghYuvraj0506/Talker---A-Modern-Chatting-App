import React from "react";
import "./People.css";
import { AiOutlineSearch } from "react-icons/ai";

function People() {
  return (
    <div className="outside_people_modal">
      <div className="people_main_container">
      <h1 className="text_type_01">Find new friends</h1>
      <span className="text_type_02">search for any of friends email id to check if it exists..</span>
      <section className="search_chat_01" style={{background:"#8eb5b124",marginTop:"10px",borderRadius:"8px"}}>
        <AiOutlineSearch size={25} />
        <input type="text" placeholder="Search" style={{background:"transparent"}} />
      </section>

      <section className="friends_list_container">
        <div className="friend_list_box">
            <div>
            <img src="https://media1.popsugar-assets.com/files/thumbor/102E0gh4t40TwMRd2wIbw-QmH5o/51x186:2349x2484/fit-in/2048xorig/filters:format_auto-!!-:strip_icc-!!-/2019/12/17/891/n/1922398/40f5caa85df9395920c604.35820403_/i/Kendall-Jenner.jpg" alt="" />
            <section>
                <span className="text_type_03">Kendall Jennar</span>
                <p className="text_type_04">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eaque, delectus</p>
            </section>

            </div>
        </div>
      </section>

      </div>
    </div>
  );
}

export default People;
