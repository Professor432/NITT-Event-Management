import DashboardShell from "./DashboardShell";

function UserLayout({ children }) {
	return (
		<DashboardShell userType="user" userName="John Doe" role="Student">
			{children}
		</DashboardShell>
	);
}

export default UserLayout;
