import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import Axios from "axios";
import moment from "moment";
import { BrowserRouter, Route, useParams } from "react-router-dom";

const url = "/reminder/nothing";

const App = () => {
  const [reminder, setReminder] = useState({ initialState: "hi" });
  const { slug } = useParams();
  useEffect(() => {
    const loadData = async () => {
      let response;
      try {
        response = await Axios.get(`/reminder/${slug}`);
      } catch (error) {
        console.error(error);
      }
      setReminder(JSON.parse(response.data));
    };
    loadData();
  }, []);
  return (
    <div>
      <div>READY UP {reminder.name}</div>
      <div>
        You were requested to ready up {moment(reminder.createdAt).fromNow()}
      </div>
    </div>
  );
};

window.onload = () =>
  ReactDOM.render(
    <BrowserRouter>
      <Route path={"/:slug"} component={App} />
    </BrowserRouter>,
    document.getElementById("app")
  );
