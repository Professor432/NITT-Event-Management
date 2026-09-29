import ProfileDetails from "../../components/ProfileDetails";
import UserLayout from "../../layouts/UserLayout";

function UserProfile() {
	return (
		<UserLayout>
			<ProfileDetails
				name="John Doe"
				email="user@nitt.edu"
				mobile="+91 98765 43210"
				gender="Male"
				bloodGroup="O+"
				role="Student"
				photo="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=480&h=480&q=85"
				photoAlt="Profile portrait of John Doe"
				details={[
					["Department", "Computer Applications"],
					["Program", "MCA"],
					["Academic year", "3rd Year"],
					["Roll number", "106123045"],
					["Institute", "NIT Tiruchirappalli"],
					["Account status", "Active"],
				]}
			/>
		</UserLayout>
	);
}

export default UserProfile;
