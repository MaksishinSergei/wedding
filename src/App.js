import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Guests from "./components/Guests/Guests";
import Location from "./components/Location/Location";
import Timing from "./components/Timing/Timing";
import Dress from "./components/Dress/Dress";
import Details from "./components/Details/Details";
import Feedback from "./components/Feedback/Feedback";
import Ps from "./components/Ps/Ps";
import Processing from "./components/Processing/Processing";
import { Notifications } from "@mantine/notifications";

function App() {
  return (
    <Router>
      <div className="wrapper">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Header />
                <Guests />
                <Location />
                <Timing />
                <Dress />
                <Details />
                <Notifications />
                <Feedback />
                <Ps />
              </>
            }
          />
          <Route path="/processing" element={<Processing />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
