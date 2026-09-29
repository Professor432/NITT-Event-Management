import ProfileDetails from "../../components/ProfileDetails";
import AdminLayout from "../../layouts/AdminLayout";

function AdminProfile() {
	return (
		<AdminLayout>
			<ProfileDetails
				name="Dr. Ananya Raman"
				email="admin@nitt.edu"
				mobile="+91 98765 43211"
				gender="Female"
				bloodGroup="A+"
				role="System Administrator"
				photo="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=480&h=480&q=85"
				photoAlt="Profile portrait of Dr. Ananya Raman"
				details={[
					["Department", "Computer Applications"],
					["Employee ID", "NITT-ADM-024"],
					["Office", "Administration Block"],
					["Institute", "NIT Tiruchirappalli"],
					["Access level", "Event management administrator"],
					["Account status", "Active"],
				]}
			/>
		</AdminLayout>
	);
}

export default AdminProfile;
