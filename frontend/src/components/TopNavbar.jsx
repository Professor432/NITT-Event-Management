function TopNavbar({
  userName = "John Doe",
  role = "User",
  isMenuOpen = false,
  onMenuClick,
}) {
  return (
    <header className="top-navbar">

      <div className="navbar-left">
        <button
          className="menu-toggle"
          type="button"
          aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isMenuOpen}
          aria-controls="primary-sidebar"
          onClick={onMenuClick}
        >
          <span className="menu-toggle-bars" aria-hidden="true">
            <span />
            <span />
            <span />
          </span>
        </button>
        <div>
          <h3>Event Management</h3>
          <p className="navbar-institution">
            Department of Computer Applications | NIT Tiruchirappalli
          </p>
        </div>
      </div>

      <div className="navbar-right">

        <button className="notification-button">
          🔔
        </button>

        <div className="user-info">

          <div className="user-avatar">
            {userName.charAt(0)}
          </div>

          <div className="user-details">
            <strong>{userName}</strong>
            <span>{role}</span>
          </div>

        </div>

      </div>

    </header>
  );
}

export default TopNavbar;