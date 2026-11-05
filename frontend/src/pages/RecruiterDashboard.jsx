import { Link, useNavigate } from "react-router-dom";

function RecruiterDashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  const styles = {
    page: {
      minHeight: "100vh",
      background: "#f5f6ff",
      fontFamily: "Arial, sans-serif",
      color: "#1e1b4b",
    },
    card: {
      background: "#ffffff",
      padding: "28px",
      borderRadius: "16px",
      flex: "1",
      minWidth: "220px",
      boxShadow: "0 5px 20px rgba(79,70,229,0.08)",
    },
    button: {
      background: "#4f46e5",
      color: "white",
      padding: "12px 22px",
      border: "none",
      borderRadius: "8px",
      cursor: "pointer",
      fontWeight: "bold",
      fontSize: "14px",
    },
  };

  return (
    <div style={styles.page}>

      {/* NAVBAR */}
      <nav style={{
        background: "white",
        padding: "18px 7%",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
      }}>
        <Link to="/" style={{
          fontSize: "25px",
          fontWeight: "bold",
          textDecoration: "none",
          color: "#312e81",
        }}>
          Career<span style={{ color: "#6366f1" }}>Connect</span>
        </Link>

        <div style={{ display: "flex", gap: "18px", alignItems: "center" }}>
          <span style={{
            background: "#eef2ff",
            color: "#4338ca",
            padding: "9px 18px",
            borderRadius: "20px",
            fontWeight: "bold",
          }}>
            Recruiter
          </span>

          <button
            onClick={handleLogout}
            style={{ ...styles.button, background: "#ef4444" }}
          >
            Logout
          </button>
        </div>
      </nav>

      <main style={{ padding: "40px 7%" }}>

        {/* WELCOME BANNER */}
        <section style={{
          background: "linear-gradient(120deg, #312e81, #4f46e5, #818cf8)",
          color: "white",
          padding: "45px",
          borderRadius: "20px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "20px",
          boxShadow: "0 10px 30px rgba(79,70,229,0.2)",
        }}>
          <div style={{ maxWidth: "600px" }}>
            <p style={{ letterSpacing: "2px", fontSize: "13px" }}>
              RECRUITER WORKSPACE
            </p>

            <h1 style={{ fontSize: "36px", margin: "15px 0" }}>
              Welcome Back! 👋
            </h1>

            <p style={{ lineHeight: "1.8", color: "#e0e7ff" }}>
              Find talented professionals, publish job opportunities,
              and manage your recruitment process with CareerConnect.
            </p>

            <button
              onClick={() => navigate("/post-job")}
              style={{
                ...styles.button,
                background: "white",
                color: "#4338ca",
                marginTop: "20px",
              }}
            >
              + Post a Job
            </button>
          </div>

          <div style={{ fontSize: "100px" }}>👔</div>
        </section>

        {/* OVERVIEW */}
        <section style={{ marginTop: "40px" }}>
          <h2>Dashboard Overview</h2>
          <p style={{ color: "#64748b" }}>
            Manage your hiring activities in one place.
          </p>

          <div style={{
            display: "flex",
            gap: "22px",
            flexWrap: "wrap",
            marginTop: "25px",
          }}>
            <div style={styles.card}>
              <div style={{ fontSize: "32px" }}>📢</div>
              <h3>Post Jobs</h3>
              <p style={{ color: "#64748b" }}>
                Publish new job opportunities.
              </p>
            </div>

            <div style={styles.card}>
              <div style={{ fontSize: "32px" }}>📄</div>
              <h3>Applications</h3>
              <p style={{ color: "#64748b" }}>
                Review candidate applications.
              </p>
            </div>

            <div style={styles.card}>
              <div style={{ fontSize: "32px" }}>🎯</div>
              <h3>Find Talent</h3>
              <p style={{ color: "#64748b" }}>
                Connect with skilled candidates.
              </p>
            </div>
          </div>
        </section>

        {/* QUICK ACTIONS */}
        <section style={{ marginTop: "45px" }}>
          <h2>Quick Actions</h2>
          <p style={{ color: "#64748b" }}>
            Choose what you want to manage today.
          </p>

          <div style={{
            display: "flex",
            gap: "25px",
            flexWrap: "wrap",
            marginTop: "25px",
          }}>
            <div style={styles.card}>
              <div style={{ fontSize: "35px" }}>➕</div>
              <h3>Post a New Job</h3>
              <p style={{ color: "#64748b", lineHeight: "1.7" }}>
                Create job listings, add requirements, and reach candidates
                looking for opportunities.
              </p>

              <button
                onClick={() => navigate("/post-job")}
                style={styles.button}
              >
                Create Job →
              </button>
            </div>

            <div style={styles.card}>
              <div style={{ fontSize: "35px" }}>📋</div>
              <h3>Manage Applications</h3>
              <p style={{ color: "#64748b", lineHeight: "1.7" }}>
                View applications, review candidate details, and update
                application status.
              </p>

              <button
                onClick={() => navigate("/recruiter-applications")}
                style={styles.button}
              >
                View Applications →
              </button>
            </div>
          </div>
        </section>

        {/* BOTTOM BANNER */}
        <section style={{
          marginTop: "45px",
          padding: "28px",
          borderRadius: "15px",
          background: "#e0e7ff",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}>
          <div>
            <h3>Great talent builds great companies.</h3>
            <p>Discover the right candidates with CareerConnect.</p>
          </div>
          <span style={{ fontSize: "45px" }}>🚀</span>
        </section>

      </main>

      <footer style={{
        textAlign: "center",
        padding: "25px",
        color: "#64748b",
      }}>
        © 2026 CareerConnect. Connecting talent with opportunity.
      </footer>

    </div>
  );
}

export default RecruiterDashboard;