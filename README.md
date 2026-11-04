# CareerConnect – Job Portal Backend

CareerConnect is a RESTful Job Portal Backend developed using Java and Spring Boot. It provides a platform where recruiters can publish job opportunities and job seekers can search and apply for jobs.

The application implements JWT authentication, role-based authorization, job management, and application tracking.

## 🚀 Tech Stack

- **Language:** Java 17
- **Backend Framework:** Spring Boot
- **Database:** MySQL
- **ORM:** Spring Data JPA / Hibernate
- **Security:** Spring Security
- **Authentication:** JWT (JSON Web Tokens)
- **Password Encryption:** BCrypt
- **API Documentation:** Swagger / OpenAPI
- **Build Tool:** Maven
- **Version Control:** Git and GitHub

## ✨ Features

### User Management
- User registration and login.
- Secure password encryption using BCrypt.
- JWT-based authentication.
- Role-based access control.

### Job Management
- Recruiters can create job postings.
- View all available jobs.
- Retrieve individual job details.
- Update and delete recruiter-owned jobs.
- Job search functionality.
- Pagination and sorting.

### Job Application Management
- Job seekers can apply for jobs.
- View their own applications.
- Recruiters can view applications for their jobs.
- Recruiters can accept or reject applications.
- Duplicate applications are prevented.
- Application status tracking.

### Security and Validation
- JWT authentication filter.
- Role-based endpoint protection.
- Input validation.
- Global exception handling.
- Appropriate HTTP status codes.

## 📁 Project Structure

```text
springboot-demo/
│
├── src/
│   └── main/
│       ├── java/com/suma/springbootdemo/
│       │   ├── config/
│       │   ├── controller/
│       │   ├── entity/
│       │   ├── exception/
│       │   ├── repository/
│       │   ├── security/
│       │   └── service/
│       │
│       └── resources/
│           └── application.properties
│
├── .gitignore
├── pom.xml
├── mvnw
├── mvnw.cmd
└── README.md
```

## ⚙️ Setup and Installation

### Prerequisites

Make sure you have installed:

- Java JDK 17
- MySQL
- Git
- Maven (optional, as Maven Wrapper is included)

### 1. Clone the Repository

```bash
git clone https://github.com/SUMASUKASI/CareerConnect.git
```

### 2. Open the Project

```bash
cd CareerConnect
```

### 3. Create the MySQL Database

Open MySQL and execute:

```sql
CREATE DATABASE careerconnect;
```

### 4. Configure Environment Variables

The application uses environment variables to protect database credentials and the JWT secret.

Configure these variables before running the application:

```text
DB_USERNAME=your_mysql_username
DB_PASSWORD=your_mysql_password
JWT_SECRET=your_secure_random_secret
```

Use a sufficiently long, randomly generated JWT secret. Do not commit actual credentials or secrets to GitHub.

### 5. Run the Application

On Windows:

```powershell
.\mvnw.cmd spring-boot:run
```

On macOS/Linux:

```bash
./mvnw spring-boot:run
```

The application runs at:

```text
http://localhost:8080
```

## 📚 API Documentation

Swagger UI is available at:

```text
http://localhost:8080/swagger-ui/index.html
```

API documentation:

```text
http://localhost:8080/v3/api-docs
```

Swagger UI can be used to explore and test the available REST APIs.

## 🔑 Main API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/users/register` | Register a user |
| POST | `/api/users/login` | User login |
| GET | `/api/jobs` | Retrieve available jobs |
| GET | `/api/jobs/{id}` | Retrieve job details |
| POST | `/api/jobs` | Create a job |
| PUT | `/api/jobs/{id}` | Update a job |
| DELETE | `/api/jobs/{id}` | Delete a job |
| POST | `/api/applications/{jobId}` | Apply for a job |
| GET | `/api/applications/my` | View my applications |
| GET | `/api/applications/recruiter` | View recruiter applications |
| PUT | `/api/applications/{applicationId}/status` | Update application status |

**Note:** Access to endpoints depends on the authenticated user's role.

## 🔐 Authentication

CareerConnect uses JWT-based authentication.

1. Register an account.
2. Log in to receive a JWT token.
3. Use the token to access protected endpoints.
4. Configure the token in Swagger using the **Authorize** button.

Supported user roles:

- `JOB_SEEKER`
- `RECRUITER`

## 🧪 Testing

The APIs were tested using Swagger UI.

Testing included:

- User registration and login.
- JWT authentication.
- Role-based access control.
- Job creation and management.
- Job applications.
- Duplicate application prevention.
- Application status updates.
- Input validation and error handling.

## 👩‍💻 Developer

**Sukasi Suma Sri**

GitHub: [SUMASUKASI](https://github.com/SUMASUKASI)

---

*CareerConnect – Connecting Recruiters and Job Seekers.*