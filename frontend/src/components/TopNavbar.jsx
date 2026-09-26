function TopNavbar({ userName = "John Doe", role = "User" }) {
  return (
    <header className="top-navbar">

      <div className="navbar-left">
        <h3>Dashboard</h3>
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