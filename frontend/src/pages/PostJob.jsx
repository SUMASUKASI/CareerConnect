import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function PostJob() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    description: "",
    salary: "",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setMessage("");

    try {
      const response = await api.post("/api/jobs", {
        ...formData,
        salary: Number(formData.salary),
      });

      console.log("JOB POST RESPONSE:", response.data);

      setMessage("Job posted successfully!");

      setFormData({
        title: "",
        company: "",
        location: "",
        description: "",
        salary: "",
      });

    } catch (error) {
      console.error("JOB POST ERROR:", error);

      console.error("SERVER RESPONSE:", error.response?.data);

      setMessage(
        error.response?.data?.message ||
        error.response?.data?.error ||
        error.message ||
        "Unable to post job."
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Post a Job</h2>
        <p>Share a new opportunity with job seekers.</p>

        <form onSubmit={handleSubmit}>
          <label>Job Title</label>
          <input
            type="text"
            name="title"
            placeholder="e.g. Java Developer"
            value={formData.title}
            onChange={handleChange}
            required
          />

          <label>Company Name</label>
          <input
            type="text"
            name="company"
            placeholder="Enter company name"
            value={formData.company}
            onChange={handleChange}
            required
          />

          <label>Location</label>
          <input
            type="text"
            name="location"
            placeholder="e.g. Hyderabad"
            value={formData.location}
            onChange={handleChange}
            required
          />

          <label>Job Description</label>
          <textarea
            name="description"
            placeholder="Describe the job responsibilities and requirements"
            value={formData.description}
            onChange={handleChange}
            required
          />

          <label>Annual Salary (INR)</label>
          <input
            type="number"
            name="salary"
            placeholder="e.g. 500000"
            value={formData.salary}
            onChange={handleChange}
            min="1"
            required
          />

          <button type="submit" disabled={loading}>
            {loading ? "Posting..." : "Publish Job"}
          </button>
        </form>

        {message && <p className="auth-message">{message}</p>}

        <button
          type="button"
          onClick={() => navigate("/recruiter-dashboard")}
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  );
}

export default PostJob;