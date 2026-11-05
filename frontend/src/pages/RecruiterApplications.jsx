import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

function RecruiterApplications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const fetchApplications = async () => {
    try {
      const response = await api.get("/api/applications/recruiter");
      setApplications(response.data);
    } catch (err) {
      console.error("FETCH APPLICATIONS ERROR:", err);
      setError("Unable to load applications.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const updateStatus = async (applicationId, status) => {
    try {
      setMessage("");

      await api.put(
        `/api/applications/${applicationId}/status?status=${status}`
      );

      setMessage(`Application ${status.toLowerCase()} successfully!`);

      fetchApplications();
    } catch (err) {
      console.error("UPDATE STATUS ERROR:", err);
      setMessage("Unable to update application status.");
    }
  };

  return (
    <div className="dashboard-container">

      <nav className="navbar">
        <h2>Career<span>Connect</span></h2>

        <Link to="/recruiter-dashboard">
          Back to Dashboard
        </Link>
      </nav>

      <div className="dashboard-content">

        <h1>Manage Applications</h1>
        <p>Review candidates who applied for your jobs.</p>

        {loading && <p>Loading applications...</p>}

        {error && <p>{error}</p>}

        {message && <p className="auth-message">{message}</p>}

        {!loading && !error && (
          <div className="dashboard-cards">

            {applications.length > 0 ? (
              applications.map((application) => (
                <div className="dashboard-card" key={application.id}>

                  <h3>
                    {application.applicant?.name || "Candidate"}
                  </h3>

                  <p>
                    Email: {application.applicant?.email || "N/A"}
                  </p>

                  <p>
                    Job: {application.job?.title || "N/A"}
                  </p>

                  <p>
                    Company: {application.job?.company || "N/A"}
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

                  {application.status === "APPLIED" && (
                    <div>
                      <button
                        onClick={() =>
                          updateStatus(application.id, "ACCEPTED")
                        }
                      >
                        Accept
                      </button>

                      <button
                        onClick={() =>
                          updateStatus(application.id, "REJECTED")
                        }
                      >
                        Reject
                      </button>
                    </div>
                  )}

                </div>
              ))
            ) : (
              <p>No applications received yet.</p>
            )}

          </div>
        )}

      </div>
    </div>
  );
}

export default RecruiterApplications;