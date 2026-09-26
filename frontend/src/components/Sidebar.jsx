import { Link } from "react-router-dom";


function Sidebar({ userType = "user" }) {

  return (

    <aside className="sidebar">


      {/* LOGO */}

      <div className="sidebar-logo">

        <div className="logo-box">
          N
        </div>

        <div>
          <h2>NITT</h2>
          <span>Event Management</span>
        </div>

      </div>


      {/* MENU */}

      <nav className="sidebar-menu">


        {/* DASHBOARD */}

        <Link
          to={
            userType === "admin"
              ? "/admin/dashboard"
              : "/user/dashboard"
          }
          className="sidebar-link"
        >
          <span>🏠</span>
          Dashboard
        </Link>


        {/* EVENTS */}

        <Link
          to={
            userType === "admin"
              ? "/admin/events"
              : "/user/events"
          }
          className="sidebar-link"
        >
          <span>📅</span>
          Events
        </Link>


        {/* USER */}

        {userType === "user" && (

          <Link
            to="/user/my-events"
            className="sidebar-link"
          >
            <span>📝</span>
            My Events
          </Link>

        )}


        {/* ADMIN */}

        {userType === "admin" && (

          <Link
            to="/admin/my-events"
            className="sidebar-link"
          >
            <span>⚙️</span>
            Manage Events
          </Link>

        )}


        {/* PROFILE */}

        <a
          href="#"
          className="sidebar-link"
        >
          <span>👤</span>
          Profile
        </a>

      </nav>


      {/* LOGOUT */}

      <div className="sidebar-bottom">

        <Link
          to="/login"
          className="sidebar-link logout"
        >
          <span>🚪</span>
          Logout
        </Link>

      </div>


    </aside>

  );
}


export default Sidebar;