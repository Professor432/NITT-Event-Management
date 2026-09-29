import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import NewEventNotifier from "./components/NewEventNotifier";


import Login from "./pages/Login";


// USER PAGES

import UserDashboard from "./pages/user/UserDashboard";
import UserEvents from "./pages/user/Events";
import UserEventDetails from "./pages/user/EventDetails";
import MyEvents from "./pages/user/MyEvents";
import RegisterEvent from "./pages/user/RegisterEvent";
import Accommodation from "./pages/user/Accommodation";
import Certificate from "./pages/user/Certificate";
import AdvertisementPublicity from "./pages/user/AdvertisementPublicity";
import UserProfile from "./pages/user/Profile";


// ADMIN PAGES

import AdminDashboard from "./pages/admin/AdminDashboard";
import ManageEvents from "./pages/admin/ManageEvents";
import AddEvent from "./pages/admin/AddEvent";
import EditEvent from "./pages/admin/EditEvent";
import AdminEventDetails from "./pages/admin/EventDetails";
import EventRegistrations from "./pages/admin/EventRegistrations";
import AdminEvaluation from "./pages/admin/AdminEvaluation";
import AdminEventReport from "./pages/admin/AdminEventReport";
import AdminProfile from "./pages/admin/Profile";


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
          path="/user/events/:id/register"
          element={<RegisterEvent />}
        />

        <Route
          path="/user/my-events"
          element={<MyEvents />}
        />

        <Route
          path="/user/accommodation"
          element={<Accommodation />}
        />

        <Route
          path="/user/certificates"
          element={<Certificate />}
        />

        <Route
          path="/user/advertisement"
          element={<AdvertisementPublicity />}
        />

        <Route
          path="/user/profile"
          element={<UserProfile />}
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
          path="/admin/events/:id/registrations"
          element={<EventRegistrations />}
        />

        <Route
          path="/admin/events/:id"
          element={<AdminEventDetails />}
        />

        <Route
          path="/admin/evaluation"
          element={<AdminEvaluation />}
        />

        <Route
          path="/admin/event-report"
          element={<AdminEventReport />}
        />

        <Route
          path="/admin/profile"
          element={<AdminProfile />}
        />

      </Routes>

      <NewEventNotifier />

    </BrowserRouter>

  );
}


export default App;