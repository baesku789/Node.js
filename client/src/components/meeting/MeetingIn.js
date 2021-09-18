import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./meeting.css";

const MeetingIn = () => {
  const [disabled, setDisabled] = useState(true);
  const [name, setName] = useState("");
  const [link, setLink] = useState("");

  const onChange = (e) => {
    const { value } = e.target;
    if (value) {
      setDisabled(false);
      setName(value);
    } else {
      setDisabled(true);
    }
  };

  const onLink = (e) => {
    const { value } = e.target;
    if (value) {
      setDisabled(false);
      setLink(value);
    } else {
      setDisabled(true);
    }
  };

  return (
    <div className="join-box">
      <div className="join-title">
        <h1>회의 참가</h1>
      </div>
      <div className="join-url">
        <input
          type="text"
          placeholder="회의 주소를 입력하세요."
          onChange={onLink}
        />
      </div>
      <div className="user-name">
        <input
          type="text"
          onChange={onChange}
          placeholder="이름을 입력하세요"
        />
      </div>
      <div className="meeting-but">
        <button type="button" disabled={disabled}>
          <Link
            to={{
              pathname: link,
              state: {
                username: name,
              },
            }}
          >
            입장
          </Link>
        </button>
      </div>
    </div>
  );
};

export default MeetingIn;
