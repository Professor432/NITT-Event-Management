import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";


import Login from "./pages/Login";


// USER PAGES

import UserDashboard from "./pages/user/UserDashboard";
import UserEvents from "./pages/user/Events";
import UserEventDetails from "./pages/user/EventDetails";
import MyEvents from "./pages/user/MyEvents";


// ADMIN PAGES

import AdminDashboard from "./pages/admin/AdminDashboard";
import ManageEvents from "./pages/admin/ManageEvents";
import AddEvent from "./pages/admin/AddEvent";
import EditEvent from "./pages/admin/EditEvent";
import AdminEventDetails from "./pages/admin/EventDetails";


function App() {

  return (

    <BrowserRouter>

      <Routes>


        {/* =========================
            LOGIN
        ========================= */}

        <Route
          path="/"
          element={<Login />}
        />

        <Route
          path="/login"
          element={<Login />}
        />


        {/* =========================
            USER
        ========================= */}

        <Route
          path="/user/dashboard"
          element={<UserDashboard />}
        />

        <Route
          path="/user/events"
          element={<UserEvents />}
        />

        <Route
          path="/user/events/:id"
          element={<UserEventDetails />}
        />

        <Route
          path="/user/my-events"
          element={<MyEvents />}
        />


        {/* =========================
            ADMIN
        ========================= */}

        <Route
          path="/admin/dashboard"
          element={<AdminDashboard />}
        />

        <Route
          path="/admin/events"
          element={<ManageEvents />}
        />

        <Route
          path="/admin/events/add"
          element={<AddEvent />}
        />

        <Route
          path="/admin/events/edit/:id"
          element={<EditEvent />}
        />

        <Route
          path="/admin/events/:id"
          element={<AdminEventDetails />}
        />

      </Routes>

    </BrowserRouter>

  );
}


export default App;