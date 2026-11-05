import { Link, useNavigate } from "react-router-dom";

function JobSeekerDashboard() {
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

        <h1>Job Seeker Dashboard</h1>
        <p>Welcome! Find opportunities and manage your applications.</p>

        <div className="dashboard-cards">

          <div className="dashboard-card">
            <h3>Find Jobs</h3>
            <p>Explore available job opportunities.</p>
            <Link to="/">Browse Jobs</Link>
          </div>

          <div className="dashboard-card">
            <h3>My Applications</h3>
            <p>Track the status of your job applications.</p>

            <button onClick={() => navigate("/my-applications")}>
              View Applications
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

export default JobSeekerDashboard;