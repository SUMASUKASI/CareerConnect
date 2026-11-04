package com.suma.springbootdemo.service;

import com.suma.springbootdemo.entity.Job;
import com.suma.springbootdemo.entity.JobApplication;
import com.suma.springbootdemo.entity.User;

import com.suma.springbootdemo.repository.JobApplicationRepository;
import com.suma.springbootdemo.repository.JobRepository;
import com.suma.springbootdemo.repository.UserRepository;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class JobApplicationService {

    private final JobApplicationRepository applicationRepository;
    private final JobRepository jobRepository;
    private final UserRepository userRepository;

    public JobApplicationService(
            JobApplicationRepository applicationRepository,
            JobRepository jobRepository,
            UserRepository userRepository) {

        this.applicationRepository = applicationRepository;
        this.jobRepository = jobRepository;
        this.userRepository = userRepository;
    }

    // Job seeker applies for a job
    public JobApplication applyForJob(Long jobId, String email) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new ResponseStatusException(
                                HttpStatus.NOT_FOUND,
                                "User not found"));

        Job job = jobRepository.findById(jobId)
                .orElseThrow(() ->
                        new ResponseStatusException(
                                HttpStatus.NOT_FOUND,
                                "Job not found"));

        if (!"JOB_SEEKER".equals(user.getRole())) {
            throw new ResponseStatusException(
                    HttpStatus.FORBIDDEN,
                    "Only job seekers can apply for jobs");
        }

        if (applicationRepository.existsByApplicant_IdAndJob_Id(
                user.getId(), jobId)) {

            throw new ResponseStatusException(
                    HttpStatus.CONFLICT,
                    "You have already applied for this job");
        }

        JobApplication application = new JobApplication();

        application.setApplicant(user);
        application.setJob(job);
        application.setStatus("APPLIED");

        return applicationRepository.save(application);
    }

    // Job seeker views their applications
    public List<JobApplication> getMyApplications(String email) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new ResponseStatusException(
                                HttpStatus.NOT_FOUND,
                                "User not found"));

        return applicationRepository.findByApplicant_Id(user.getId());
    }

    // Recruiter views applications for their jobs
    public List<JobApplication> getRecruiterApplications(String email) {

        User recruiter = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new ResponseStatusException(
                                HttpStatus.NOT_FOUND,
                                "Recruiter not found"));

        if (!"RECRUITER".equals(recruiter.getRole())) {
            throw new ResponseStatusException(
                    HttpStatus.FORBIDDEN,
                    "Only recruiters can view received applications");
        }

        return applicationRepository
                .findByJob_Recruiter_Email(email);
    }

    // Recruiter accepts or rejects an application
    public JobApplication updateApplicationStatus(
            Long applicationId,
            String status,
            String email) {

        User recruiter = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new ResponseStatusException(
                                HttpStatus.NOT_FOUND,
                                "Recruiter not found"));

        if (!"RECRUITER".equals(recruiter.getRole())) {
            throw new ResponseStatusException(
                    HttpStatus.FORBIDDEN,
                    "Only recruiters can update application status");
        }

        JobApplication application =
                applicationRepository.findById(applicationId)
                        .orElseThrow(() ->
                                new ResponseStatusException(
                                        HttpStatus.NOT_FOUND,
                                        "Application not found"));

        if (application.getJob().getRecruiter() == null ||
                !application.getJob().getRecruiter()
                        .getEmail().equals(email)) {

            throw new ResponseStatusException(
                    HttpStatus.FORBIDDEN,
                    "You cannot update this application");
        }

        if (!"ACCEPTED".equals(status) &&
                !"REJECTED".equals(status)) {

            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Status must be ACCEPTED or REJECTED");
        }

        application.setStatus(status);

        return applicationRepository.save(application);
    }
}
