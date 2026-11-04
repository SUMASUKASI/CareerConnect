package com.suma.springbootdemo.controller;

import com.suma.springbootdemo.entity.Job;
import com.suma.springbootdemo.service.JobService;

import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.Authentication;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;

import java.util.List;

@RestController
@RequestMapping("/api/jobs")
@CrossOrigin(origins = "*")
public class JobController {

    private final JobService jobService;

    public JobController(JobService jobService) {
        this.jobService = jobService;
    }

    // Add job
    @PostMapping
    public Job addJob(
            @Valid @RequestBody Job job,
            Authentication authentication) {

        String email = authentication.getName();

        return jobService.addJob(job, email);
    }

    // Get all jobs
    @GetMapping
    public List<Job> getAllJobs() {
        return jobService.getAllJobs();
    }

    // Get jobs with pagination and sorting
    @GetMapping("/page")
    public Page<Job> getJobsWithPagination(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size,
            @RequestParam(defaultValue = "id") String sortBy,
            @RequestParam(defaultValue = "desc") String direction) {

        return jobService.getAllJobsWithPagination(
                page, size, sortBy, direction
        );
    }

    // Search jobs by title
    @GetMapping("/search/title")
    public List<Job> searchJobsByTitle(@RequestParam String title) {
        return jobService.searchJobsByTitle(title);
    }

    // Search jobs by company
    @GetMapping("/search/company")
    public List<Job> searchJobsByCompany(@RequestParam String company) {
        return jobService.searchJobsByCompany(company);
    }

    // Search jobs by location
    @GetMapping("/search/location")
    public List<Job> searchJobsByLocation(@RequestParam String location) {
        return jobService.searchJobsByLocation(location);
    }

    // Get job by ID
    @GetMapping("/{id}")
    public Job getJobById(@PathVariable Long id) {
        return jobService.getJobById(id);
    }

    // Update job
    @PutMapping("/{id}")
    public Job updateJob(
            @PathVariable Long id,
            @Valid @RequestBody Job job,
            Authentication authentication) {

        String email = authentication.getName();

        return jobService.updateJob(id, job, email);
    }

    // Delete job
    @DeleteMapping("/{id}")
    public String deleteJob(
            @PathVariable Long id,
            Authentication authentication) {

        String email = authentication.getName();

        jobService.deleteJob(id, email);

        return "Job deleted successfully!";
    }
}