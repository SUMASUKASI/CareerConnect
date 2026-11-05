import { Link, useNavigate } from "react-router-dom";

function JobSeekerDashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  const cardStyle = {
    background: "white",
    padding: "28px",
    borderRadius: "16px",
    boxShadow: "0 5px 20px rgba(79,70,229,0.08)",
    flex: "1",
    minWidth: "220px",
  };

  const buttonStyle = {
    background: "#4f46e5",
    color: "white",
    border: "none",
    padding: "12px 22px",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "#f3f4ff",
      fontFamily: "Arial, sans-serif",
      color: "#1e1b4b",
    }}>

      <nav style={{
        background: "white",
        padding: "20px 7%",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}>
        <Link to="/" style={{
          fontSize: "25px",
          fontWeight: "bold",
          color: "#312e81",
          textDecoration: "none",
        }}>
          Career<span style={{ color: "#6366f1" }}>Connect</span>
        </Link>

        <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
          <span style={{
            background: "#eef2ff",
            color: "#4338ca",
            padding: "9px 18px",
            borderRadius: "20px",
            fontWeight: "bold",
          }}>
            Job Seeker
          </span>

          <button
            onClick={handleLogout}
            style={{ ...buttonStyle, background: "#ef4444" }}
          >
            Logout
          </button>
        </div>
      </nav>

      <main style={{ padding: "40px 7%" }}>

        <section style={{
          background: "linear-gradient(120deg, #312e81, #4f46e5, #818cf8)",
          color: "white",
          padding: "45px",
          borderRadius: "20px",
        }}>
          <h1 style={{ fontSize: "36px" }}>
            Welcome Back! 👋
          </h1>

          <p style={{ lineHeight: "1.8", color: "#e0e7ff" }}>
            Discover exciting career opportunities, apply for jobs,
            and track your applications with CareerConnect.
          </p>

          <button
            onClick={() => navigate("/")}
            style={{
              ...buttonStyle,
              background: "white",
              color: "#4338ca",
              marginTop: "15px",
            }}
          >
            Browse Jobs →
          </button>
        </section>

        <section style={{ marginTop: "40px" }}>
          <h2>My Dashboard</h2>
          <p style={{ color: "#64748b" }}>
            Manage your job search activities.
          </p>

          <div style={{
            display: "flex",
            gap: "22px",
            flexWrap: "wrap",
            marginTop: "25px",
          }}>

            <div style={cardStyle}>
              <div style={{ fontSize: "35px" }}>🔍</div>
              <h3>Browse Jobs</h3>
              <p style={{ color: "#64748b" }}>
                Explore available job opportunities.
              </p>
              <button
                onClick={() => navigate("/")}
                style={buttonStyle}
              >
                Find Jobs →
              </button>
            </div>

            <div style={cardStyle}>
              <div style={{ fontSize: "35px" }}>📄</div>
              <h3>My Applications</h3>
              <p style={{ color: "#64748b" }}>
                Track your submitted job applications.
              </p>
              <button
                onClick={() => navigate("/my-applications")}
                style={buttonStyle}
              >
                View Applications →
              </button>
            </div>

          </div>
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

export default JobSeekerDashboard;