import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import TopNavbar from "../components/TopNavbar";

function DashboardShell({ children, userType, userName, role }) {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event) => {
      if (event.key === "Escape") setMenuOpen(false);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [menuOpen]);

  return (
    <div className="dashboard-layout">
      {menuOpen && (
        <button
          className="sidebar-backdrop"
          type="button"
          aria-label="Close navigation menu"
          onClick={() => setMenuOpen(false)}
        />
      )}

      <Sidebar
        userType={userType}
        isOpen={menuOpen}
        onNavigate={() => setMenuOpen(false)}
      />

      <main className="main-content">
        <TopNavbar
          userName={userName}
          role={role}
          isMenuOpen={menuOpen}
          onMenuClick={() => setMenuOpen((isOpen) => !isOpen)}
        />
        {children}
      </main>
    </div>
  );
}

export default DashboardShell;