import React, { useState } from "react";
import { v1 as uuid } from "uuid";
import { Link } from "react-router-dom";

const MeetingUp = () => {
  const [disabled, setDisabled] = useState(true);
  const [name, setName] = useState("");
  const id = uuid();

  const onChange = (e) => {
    const { value } = e.target;
    if (value) {
      setDisabled(false);
      setName(value);
    } else {
      setDisabled(true);
    }
  };

  return (
    <>
      <div className="create-box">
        <div className="create-title">
          <h1>회의 생성</h1>
        </div>
        <div className="user-name">
          <input
            type="text"
            onChange={onChange}
            placeholder="이름을 입력하세요."
          />
        </div>
        <div className="meeting-but">
          <button type="button" disabled={disabled}>
            <Link
              to={{
                pathname: `/room/${id}`,
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
    </>
  );
};

export default MeetingUp;
