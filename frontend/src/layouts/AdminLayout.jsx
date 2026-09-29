import DashboardShell from "./DashboardShell";

function AdminLayout({ children }) {
	return (
		<DashboardShell userType="admin" userName="Admin" role="Administrator">
			{children}
		</DashboardShell>
	);
}

export default AdminLayout;
