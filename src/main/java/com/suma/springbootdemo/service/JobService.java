package com.suma.springbootdemo.service;

import com.suma.springbootdemo.entity.Job;
import com.suma.springbootdemo.entity.User;
import com.suma.springbootdemo.repository.JobApplicationRepository;
import com.suma.springbootdemo.repository.JobRepository;
import com.suma.springbootdemo.repository.UserRepository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class JobService {

    private final JobRepository jobRepository;
    private final UserRepository userRepository;
    private final JobApplicationRepository applicationRepository;

    public JobService(
            JobRepository jobRepository,
            UserRepository userRepository,
            JobApplicationRepository applicationRepository) {

        this.jobRepository = jobRepository;
        this.userRepository = userRepository;
        this.applicationRepository = applicationRepository;
    }

    // Add job
    public Job addJob(Job job, String email) {

        User recruiter = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Recruiter not found"
                ));

        if (!"RECRUITER".equals(recruiter.getRole())) {
            throw new ResponseStatusException(
                    HttpStatus.FORBIDDEN,
                    "Only recruiters can post jobs"
            );
        }

        job.setRecruiter(recruiter);

        return jobRepository.save(job);
    }

    // Get all jobs
    public List<Job> getAllJobs() {
        return jobRepository.findAll();
    }

    // Pagination and sorting
    public Page<Job> getAllJobsWithPagination(
            int page,
            int size,
            String sortBy,
            String direction) {

        if (page < 0 || size < 1 || size > 100) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Invalid page or size. Page must be 0 or greater and size must be between 1 and 100."
            );
        }

        Sort sort = direction.equalsIgnoreCase("desc")
                ? Sort.by(sortBy).descending()
                : Sort.by(sortBy).ascending();

        Pageable pageable = PageRequest.of(page, size, sort);

        return jobRepository.findAll(pageable);
    }

    // Search jobs by title
    public List<Job> searchJobsByTitle(String title) {
        return jobRepository.findByTitleContainingIgnoreCase(title);
    }

    // Search jobs by company
    public List<Job> searchJobsByCompany(String company) {
        return jobRepository.findByCompanyContainingIgnoreCase(company);
    }

    // Search jobs by location
    public List<Job> searchJobsByLocation(String location) {
        return jobRepository.findByLocationContainingIgnoreCase(location);
    }

    // Get job by ID
    public Job getJobById(Long id) {

        return jobRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Job not found"
                ));
    }

    // Verify recruiter ownership
    private Job verifyRecruiter(Long id, String email) {

        User recruiter = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Recruiter not found"
                ));

        if (!"RECRUITER".equals(recruiter.getRole())) {
            throw new ResponseStatusException(
                    HttpStatus.FORBIDDEN,
                    "Only recruiters can manage jobs"
            );
        }

        Job existingJob = jobRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Job not found"
                ));

        if (existingJob.getRecruiter() == null ||
                !email.equals(existingJob.getRecruiter().getEmail())) {

            throw new ResponseStatusException(
                    HttpStatus.FORBIDDEN,
                    "You cannot modify this job"
            );
        }

        return existingJob;
    }

    // Update job
    public Job updateJob(Long id, Job updatedJob, String email) {

        Job existingJob = verifyRecruiter(id, email);

        existingJob.setTitle(updatedJob.getTitle());
        existingJob.setCompany(updatedJob.getCompany());
        existingJob.setLocation(updatedJob.getLocation());
        existingJob.setDescription(updatedJob.getDescription());
        existingJob.setSalary(updatedJob.getSalary());

        return jobRepository.save(existingJob);
    }

    // Delete job
    public void deleteJob(Long id, String email) {

        Job existingJob = verifyRecruiter(id, email);

        if (applicationRepository.existsByJob_Id(id)) {

            throw new ResponseStatusException(
                    HttpStatus.CONFLICT,
                    "Cannot delete this job because applicants have already applied."
            );
        }

        jobRepository.delete(existingJob);
    }
}
