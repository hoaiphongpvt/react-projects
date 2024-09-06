import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

import StarRating from "./components/StarRating";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
    {/* <StarRating
      maxRating={5}
      className="test"
      messages={["Terrible", "Bad", "Nod Bad", "Good", "Amazing"]}
      defaultRating={3}
    /> */}
  </React.StrictMode>
);
