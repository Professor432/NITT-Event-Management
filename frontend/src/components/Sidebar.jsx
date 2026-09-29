import { Link, NavLink } from "react-router-dom";

function Sidebar({ userType = "user", isOpen = false, onNavigate }) {
  return (
    <aside
      className={`sidebar ${isOpen ? "mobile-open" : ""}`}
      id="primary-sidebar"
      aria-label="Main navigation"
    >

      {/* LOGO */}
      <div className="sidebar-logo">
        <img
          className="sidebar-logo-image"
          src="/nitt-logo.jpg"
          alt="NIT Tiruchirappalli crest"
        />

        <div>
          <h2>NIT Trichy</h2>
          <span>National Institute of Technology, Tiruchirappalli</span>
          <span>Department of Computer Applications</span>
        </div>
      </div>


      {/* MENU */}
      <nav className="sidebar-menu">

        {/* DASHBOARD */}
        <NavLink
          to={
            userType === "admin"
              ? "/admin/dashboard"
              : "/user/dashboard"
          }
          className={({ isActive }) =>
            `sidebar-link ${isActive ? "active" : ""}`
          }
          onClick={onNavigate}
        >
          <span>🏠</span>
          Dashboard
        </NavLink>


        {/* EVENTS */}
        <NavLink
          to={
            userType === "admin"
              ? "/admin/events"
              : "/user/events"
          }
          className={({ isActive }) =>
            `sidebar-link ${isActive ? "active" : ""}`
          }
          onClick={onNavigate}
        >
          <span>📅</span>
          Events
        </NavLink>


        {/* ================================
            USER MENU
        ================================= */}

        {userType === "user" && (
          <>

            {/* MY EVENTS */}
            <NavLink
              to="/user/my-events"
              className={({ isActive }) =>
                `sidebar-link ${isActive ? "active" : ""}`
              }
              onClick={onNavigate}
            >
              <span>📝</span>
              My Events
            </NavLink>


            {/* ACCOMMODATION */}
            <NavLink
              to="/user/accommodation"
              className={({ isActive }) =>
                `sidebar-link ${isActive ? "active" : ""}`
              }
              onClick={onNavigate}
            >
              <span>🏨</span>
              Accommodation & Hospitality
            </NavLink>


            {/* CERTIFICATE GENERATION */}
            <NavLink
              to="/user/certificates"
              className={({ isActive }) =>
                `sidebar-link ${isActive ? "active" : ""}`
              }
              onClick={onNavigate}
            >
              <span>🏆</span>
              Certificate Generation
            </NavLink>


            {/* ADVERTISEMENT & PUBLICITY */}
            <NavLink
              to="/user/advertisement"
              className={({ isActive }) =>
                `sidebar-link ${isActive ? "active" : ""}`
              }
              onClick={onNavigate}
            >
              <span>📢</span>
              Advertisement & Publicity
            </NavLink>

          </>
        )}


        {/* ================================
            ADMIN MENU
        ================================= */}

        {userType === "admin" && (
        <>
          {/* USER EVALUATION */}
          <NavLink
            to="/admin/evaluation"
            className={({ isActive }) =>
              `sidebar-link ${isActive ? "active" : ""}`
            }
            onClick={onNavigate}
          >
            <span>⭐</span>
            User Evaluation
          </NavLink>

          {/* EVENT REPORT */}
          <NavLink
            to="/admin/event-report"
            className={({ isActive }) =>
              `sidebar-link ${isActive ? "active" : ""}`
            }
            onClick={onNavigate}
          >
            <span>📊</span>
            Event Reports
          </NavLink>
        </>
      )}


        {/* PROFILE */}
        <NavLink
          to={userType === "admin" ? "/admin/profile" : "/user/profile"}
          className={({ isActive }) =>
            `sidebar-link ${isActive ? "active" : ""}`
          }
          onClick={onNavigate}
        >
          <span>👤</span>
          Profile
        </NavLink>

      </nav>


      {/* LOGOUT */}
      <div className="sidebar-bottom">

        <Link
          to="/login"
          className="sidebar-link logout"
          onClick={onNavigate}
        >
          <span>🚪</span>
          Logout
        </Link>

      </div>

    </aside>
  );
}

export default Sidebar;