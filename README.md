# 🚀 CareerConnect – Full-Stack Job Portal

CareerConnect is a full-stack Job Portal application built using **Java, Spring Boot, React, and MySQL**.

The platform connects job seekers with recruiters. Job seekers can browse available opportunities, apply for jobs, and track their applications. Recruiters can publish job openings, view applicants, and manage application statuses.

## ✨ Features

### 👨‍💻 Job Seeker
- User registration and login
- Browse available job listings
- Search for jobs
- Apply for jobs
- View submitted applications
- Track application status

### 🏢 Recruiter
- Recruiter registration and login
- Dedicated recruiter dashboard
- Post job opportunities
- View applications received
- Accept or reject applications
- Manage application statuses

### 🔐 Authentication and Security
- JWT-based authentication
- Password encryption using BCrypt
- Role-based authorization
- Protected frontend routes
- Secure backend endpoints
- Duplicate application prevention
- Input validation and exception handling

## 🛠️ Tech Stack

### Frontend
- React.js
- JavaScript
- Vite
- React Router DOM
- Axios
- HTML
- CSS

### Backend
- Java 17
- Spring Boot
- Spring Security
- Spring Data JPA
- Hibernate
- REST APIs
- JWT Authentication
- Maven

### Database and Tools
- MySQL
- MySQL Workbench
- Swagger / OpenAPI
- Postman
- Git and GitHub
- VS Code

## 🏗️ Project Architecture

```text
CareerConnect/
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.jsx
│   │   └── App.css
│   ├── package.json
│   └── vite.config.js
│
├── src/
│   └── main/
│       ├── java/com/suma/springbootdemo/
│       │   ├── config/
│       │   ├── controller/
│       │   ├── dto/
│       │   ├── entity/
│       │   ├── exception/
│       │   ├── repository/
│       │   ├── security/
│       │   └── service/
│       │
│       └── resources/
│           └── application.properties
│
├── pom.xml
└── README.md
```

## ⚙️ Installation and Setup

### Prerequisites

Install the following:

- Java JDK 17
- MySQL
- Node.js and npm
- Git

### 1. Clone the repository

```bash
git clone https://github.com/SUMASUKASI/CareerConnect.git
cd CareerConnect
```

### 2. Configure the MySQL database

Open MySQL Workbench and execute:

```sql
CREATE DATABASE careerconnect;
```

### 3. Configure backend environment variables

The backend uses environment variables for database credentials and the JWT secret.

Set these variables before starting the backend:

```text
DB_USERNAME=your_mysql_username
DB_PASSWORD=your_mysql_password
JWT_SECRET=your_secure_random_secret
```

Do not commit actual database credentials or JWT secrets to GitHub.

### 4. Start the Spring Boot backend

Open a terminal in the project root directory.

On Windows:

```powershell
$env:DB_USERNAME = "your_mysql_username"
$env:DB_PASSWORD = "your_mysql_password"
$env:JWT_SECRET = "your_secure_random_secret"

.\mvnw.cmd spring-boot:run
```

The backend runs at:

```text
http://localhost:8080
```

### 5. Start the React frontend

Open a second terminal:

```powershell
cd frontend
npm install
npm run dev
```

The frontend runs at:

```text
http://localhost:5173
```

Open the frontend URL in your browser to use CareerConnect.

## 📡 Main API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/users/register` | Register a user |
| POST | `/api/users/login` | Login |
| GET | `/api/jobs` | Retrieve available jobs |
| GET | `/api/jobs/{id}` | Retrieve job details |
| POST | `/api/jobs` | Create a job |
| PUT | `/api/jobs/{id}` | Update a job |
| DELETE | `/api/jobs/{id}` | Delete a job |
| POST | `/api/applications/{jobId}` | Apply for a job |
| GET | `/api/applications/my` | View job seeker's applications |
| GET | `/api/applications/recruiter` | View recruiter's applications |
| PUT | `/api/applications/{applicationId}/status` | Update application status |

## 🔑 Authentication Workflow

1. Users register as either a Job Seeker or Recruiter.
2. Users log in with their email and password.
3. The backend verifies credentials and returns a JWT token.
4. The frontend stores the token and attaches it to API requests.
5. Protected routes and backend endpoints enforce role-based access.

Supported roles:

- `JOB_SEEKER`
- `RECRUITER`

## 🧪 Testing

The application workflows and APIs were tested, including:

- User registration and login
- JWT authentication
- Role-based access control
- Job posting and browsing
- Job applications
- Duplicate application prevention
- Application status updates
- Frontend production build

The React frontend production build was verified successfully using:

```bash
npm run build
```

## 🎯 Project Objective

This project was developed to gain practical experience in full-stack application development, including:

- Java and Spring Boot
- REST API development
- React frontend development
- Database integration
- JWT authentication and authorization
- Frontend-backend integration
- Git and GitHub version control

## 👩‍💻 Developer

**Sukasi Suma Sri**

GitHub: [SUMASUKASI](https://github.com/SUMASUKASI)

---

⭐ CareerConnect – Connecting Recruiters and Job Seekers.