import { useNavigate } from "react-router-dom";

function RecruiterDashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <div className="dashboard-container">
      <nav className="navbar">
        <h2>Career<span>Connect</span></h2>
        <button onClick={handleLogout}>Logout</button>
      </nav>

      <div className="dashboard-content">
        <h1>Recruiter Dashboard</h1>
        <p>Welcome! Manage your job postings and applications.</p>

        <div className="dashboard-cards">

          <div className="dashboard-card">
            <h3>Post a Job</h3>
            <p>Create and publish new job opportunities.</p>
            <button onClick={() => navigate("/post-job")}>
              Post Job
            </button>
          </div>

          <div className="dashboard-card">
            <h3>Manage Applications</h3>
            <p>Review applications submitted by candidates.</p>
            <button onClick={() => navigate("/recruiter-applications")}>
              View Applications
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

export default RecruiterDashboard;