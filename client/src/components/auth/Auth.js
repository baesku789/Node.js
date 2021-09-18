import React from "react";
import "./Auth.css";
import { Link } from "react-router-dom";
import laco from "../../assets/img/lacotaco.png";

function auth() {
  return (
    <div className="All">
      <div>
        <img src={laco} width="200px" height="200px"></img>
      </div>
      <div className>
        <br />
        <Link to="/auth/meeting_in">
          <input type="button" className="button" value="회의 참가" />
        </Link>
        <Link to="/auth/meeting_up">
          <input type="button" className="button" value="회의 생성" />
        </Link>
      </div>
    </div>
  );
}

export default auth;
