function ProfileDetails({
  name,
  email,
  mobile,
  gender,
  bloodGroup,
  role,
  photo,
  photoAlt,
  details,
}) {
  const personalDetails = [
    ["Email address", email],
    ["Mobile number", mobile],
    ["Gender", gender],
    ["Blood group", bloodGroup],
  ];

  return (
    <section className="profile-page">
      <header className="profile-heading">
        <div>
          <p className="profile-eyebrow">ACCOUNT</p>
          <h1>Profile</h1>
          <p>Personal information and account details.</p>
        </div>
      </header>

      <section className="profile-summary" aria-label="Profile summary">
        <img className="profile-photo" src={photo} alt={photoAlt} />
        <div className="profile-summary-info">
          <span className="profile-role">{role}</span>
          <h2>{name}</h2>
          <p>{email}</p>
        </div>
        <span className="profile-status">
          <span aria-hidden="true" />
          Active
        </span>
      </section>

      <div className="profile-details-grid">
        <section className="profile-details-section">
          <h2>Personal details</h2>
          <dl className="profile-fields">
            {personalDetails.map(([label, value]) => (
              <div className="profile-field" key={label}>
                <dt>{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="profile-details-section">
          <h2>Organization details</h2>
          <dl className="profile-fields">
            {details.map(([label, value]) => (
              <div className="profile-field" key={label}>
                <dt>{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
        </section>
      </div>
    </section>
  );
}

export default ProfileDetails;