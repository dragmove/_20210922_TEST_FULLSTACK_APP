import React, { useEffect, useState } from "react";
import axios from "axios";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const [lists, setLists] = useState([]);
  const [value, setValue] = useState("");

  useEffect(() => {
    (async function () {
      try {
        const res = await axios.get("/api/values");
        console.log("res :", res);
        setLists(res.data);
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  const onChangeInput = (evt) => {
    setValue(evt.currentTarget.value);
  };

  const onSubmitForm = async (evt) => {
    evt.preventDefault();

    try {
      const res = await axios.post("/api/value");
      console.log("res :", res);

      if (res.data.success === true) {
        console.log("res.data :", res.data);
        setLists([...lists, res.data]);
        setValue("");
      }
    } catch (err) {
      console.error(err);
      window.alert("DB에 값 입력 실패");
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div className="container">
          {lists?.length &&
            lists.map((list, index) => {
              return <li key={index}>{list.value}</li>;
            })}

          <form className="example" onSubmit={onSubmitForm}>
            <input
              type="text"
              placeholder="입력해주세요..."
              onChange={onChangeInput}
              value={value}
            />
            <button type="submit">확인</button>
          </form>
        </div>
      </header>
    </div>
  );
}

export default App;
