import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Events from "./pages/Events";
import CreateEvent from "./pages/CreateEvent";
import MyEvents from "./pages/MyEvents";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/events" element={<Events />} />

        <Route
          path="/admin/events"
          element={<CreateEvent />}
        />

        <Route
          path="/my-events"
          element={<MyEvents />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;