import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

function MyApplications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await api.get("/api/applications/my");
        setApplications(response.data);
      } catch (err) {
        console.error("APPLICATION FETCH ERROR:", err);
        setError("Unable to load your applications.");
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  return (
    <div className="dashboard-container">

      <nav className="navbar">
        <h2>Career<span>Connect</span></h2>
        <Link to="/job-seeker-dashboard">
          Back to Dashboard
        </Link>
      </nav>

      <div className="dashboard-content">

        <h1>My Applications</h1>
        <p>Track the status of your job applications.</p>

        {loading && <p>Loading applications...</p>}

        {error && <p>{error}</p>}

        {!loading && !error && (
          <div className="dashboard-cards">

            {applications.length > 0 ? (
              applications.map((application) => (
                <div className="dashboard-card" key={application.id}>

                  <h3>{application.job?.title || "Job"}</h3>

                  <p>
                    Company: {application.job?.company || "N/A"}
                  </p>

                  <p>
                    Location: {application.job?.location || "N/A"}
                  </p>

                  <p>
                    Status: <strong>{application.status}</strong>
                  </p>

                  <p>
                    Applied On:{" "}
                    {application.appliedAt
                      ? new Date(application.appliedAt).toLocaleDateString()
                      : "N/A"}
                  </p>

                </div>
              ))
            ) : (
              <p>You haven't applied for any jobs yet.</p>
            )}

          </div>
        )}

        <br />

        <Link to="/">
          Browse More Jobs
        </Link>

      </div>
    </div>
  );
}

export default MyApplications;