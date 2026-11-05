import { useEffect, useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";

import "./App.css";

import Login from "./pages/Login";
import Register from "./pages/Register";
import JobSeekerDashboard from "./pages/JobSeekerDashboard";
import RecruiterDashboard from "./pages/RecruiterDashboard";
import PostJob from "./pages/PostJob";
import MyApplications from "./pages/MyApplications";
import RecruiterApplications from "./pages/RecruiterApplications";

import ProtectedRoute from "./components/ProtectedRoute";
import api from "./services/api";

function Home() {
  const navigate = useNavigate();

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("");
  const [applyMessage, setApplyMessage] = useState("");

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await api.get("/api/jobs");
        setJobs(response.data);
      } catch (err) {
        setError("Unable to load jobs. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  // Apply for a job
  const handleApply = async (jobId) => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    setApplyMessage("");

    if (!token) {
      navigate("/login");
      return;
    }

    if (role !== "JOB_SEEKER") {
      setApplyMessage("Only job seekers can apply for jobs.");
      return;
    }

    try {
      await api.post(`/api/applications/${jobId}`);

      setApplyMessage("Application submitted successfully!");

    } catch (error) {
      console.error("APPLICATION ERROR:", error);
      console.error("SERVER RESPONSE:", error.response?.data);

      if (error.response?.status === 409) {
        setApplyMessage("You have already applied for this job!");
      } else {
        setApplyMessage(
          error.response?.data?.message ||
          error.response?.data?.error ||
          "Unable to submit application. Please try again."
        );
      }
    }
  };

  // Search and filter jobs
  const filteredJobs = jobs.filter((job) => {
    const matchesKeyword =
      job.title.toLowerCase().includes(keyword.toLowerCase()) ||
      job.company.toLowerCase().includes(keyword.toLowerCase());

    const matchesLocation = job.location
      .toLowerCase()
      .includes(location.toLowerCase());

    return matchesKeyword && matchesLocation;
  });

  return (
    <div className="app">

      {/* Navigation Bar */}
      <nav className="navbar">
        <div className="logo">
          Career<span>Connect</span>
        </div>

        <div className="nav-links">
          <a href="#home">Home</a>
          <a href="#jobs">Find Jobs</a>
          <a href="#categories">Categories</a>
          <a href="#about">About Us</a>
        </div>

        <div className="nav-buttons">
          <Link to="/login">
            <button className="login-btn">Login</button>
          </Link>

          <Link to="/register">
            <button className="register-btn">Register</button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-section" id="home">
        <div className="hero-content">

          <p className="hero-tagline">
            YOUR CAREER JOURNEY STARTS HERE
          </p>

          <h1>
            Find Your <span>Dream Job</span>
            <br />
            Build Your Future
          </h1>

          <p className="hero-description">
            Discover exciting opportunities, connect with top companies,
            and take the next step in your professional journey.
          </p>

          <div className="search-container">
            <input
              type="text"
              placeholder="Job title or company"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />

            <input
              type="text"
              placeholder="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />

            <button
              className="search-btn"
              onClick={() =>
                document.getElementById("jobs").scrollIntoView({
                  behavior: "smooth",
                })
              }
            >
              Search Jobs
            </button>
          </div>

          <p className="popular-searches">
            Popular: Java Developer · Python Developer · Software Engineer
          </p>

        </div>
      </section>

      {/* Categories Section */}
      <section className="categories-section" id="categories">

        <div className="section-heading">
          <p>EXPLORE OPPORTUNITIES</p>
          <h2>Popular Job Categories</h2>

          <span>
            Find opportunities that match your interests and skills.
          </span>
        </div>

        <div className="categories-grid">

          <div className="category-card">
            <div className="category-icon">💻</div>
            <h3>Software Development</h3>
            <p>Explore development roles</p>
          </div>

          <div className="category-card">
            <div className="category-icon">📊</div>
            <h3>Data & Analytics</h3>
            <p>Discover data-driven careers</p>
          </div>

          <div className="category-card">
            <div className="category-icon">🤖</div>
            <h3>AI & Machine Learning</h3>
            <p>Build intelligent solutions</p>
          </div>

          <div className="category-card">
            <div className="category-icon">🎨</div>
            <h3>Design</h3>
            <p>Create amazing experiences</p>
          </div>

        </div>
      </section>

      {/* Jobs Section */}
      <section className="jobs-section" id="jobs">

        <div className="section-heading">
          <p>FIND YOUR NEXT OPPORTUNITY</p>
          <h2>Latest Job Opportunities</h2>

          <span>
            Explore jobs directly from our database.
          </span>
        </div>

        {loading && <p>Loading jobs...</p>}

        {error && <p>{error}</p>}

        {applyMessage && (
          <p className="auth-message">{applyMessage}</p>
        )}

        {!loading && !error && (
          <>
            <p>{filteredJobs.length} job(s) found</p>

            <div className="jobs-grid">

              {filteredJobs.length > 0 ? (
                filteredJobs.map((job) => (
                  <div className="job-card" key={job.id}>

                    <div className="job-top">
                      <div className="company-icon">
                        {job.company.charAt(0).toUpperCase()}
                      </div>

                      <span className="job-type">
                        Full Time
                      </span>
                    </div>

                    <h3>{job.title}</h3>

                    <p className="company-name">
                      {job.company}
                    </p>

                    <p className="job-location">
                      📍 {job.location}
                    </p>

                    <p>{job.description}</p>

                    <div className="job-bottom">
                      <span>
                        ₹{(job.salary / 100000).toFixed(1)} LPA
                      </span>

                      <button onClick={() => handleApply(job.id)}>
                        Apply Now
                      </button>
                    </div>

                  </div>
                ))
              ) : (
                <p>No jobs match your search.</p>
              )}

            </div>
          </>
        )}

      </section>

      {/* Footer */}
      <footer className="footer" id="about">
        <h2>
          Career<span>Connect</span>
        </h2>

        <p>Connecting talent with opportunities.</p>

        <p className="copyright">
          © 2026 CareerConnect. All rights reserved.
        </p>
      </footer>

    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        {/* Job Seeker Dashboard */}
        <Route
          path="/job-seeker-dashboard"
          element={
            <ProtectedRoute allowedRole="JOB_SEEKER">
              <JobSeekerDashboard />
            </ProtectedRoute>
          }
        />

        {/* Job Seeker Applications */}
        <Route
          path="/my-applications"
          element={
            <ProtectedRoute allowedRole="JOB_SEEKER">
              <MyApplications />
            </ProtectedRoute>
          }
        />

        {/* Recruiter Dashboard */}
        <Route
          path="/recruiter-dashboard"
          element={
            <ProtectedRoute allowedRole="RECRUITER">
              <RecruiterDashboard />
            </ProtectedRoute>
          }
        />

        {/* Recruiter Applications */}
        <Route
          path="/recruiter-applications"
          element={
            <ProtectedRoute allowedRole="RECRUITER">
              <RecruiterApplications />
            </ProtectedRoute>
          }
        />

        {/* Post Job */}
        <Route
          path="/post-job"
          element={
            <ProtectedRoute allowedRole="RECRUITER">
              <PostJob />
            </ProtectedRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;