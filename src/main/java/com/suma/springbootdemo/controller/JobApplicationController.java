package com.suma.springbootdemo.controller;

import com.suma.springbootdemo.entity.JobApplication;
import com.suma.springbootdemo.service.JobApplicationService;

import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/applications")
@CrossOrigin(origins = "*")
public class JobApplicationController {

    private final JobApplicationService applicationService;

    public JobApplicationController(
            JobApplicationService applicationService) {

        this.applicationService = applicationService;
    }

    // Job seeker applies for a job
    @PostMapping("/{jobId}")
    public JobApplication applyForJob(
            @PathVariable Long jobId,
            Authentication authentication) {

        String email = authentication.getName();

        return applicationService.applyForJob(jobId, email);
    }

    // Job seeker views their applications
    @GetMapping("/my")
    public List<JobApplication> getMyApplications(
            Authentication authentication) {

        String email = authentication.getName();

        return applicationService.getMyApplications(email);
    }

    // Recruiter views applications received
    @GetMapping("/recruiter")
    public List<JobApplication> getRecruiterApplications(
            Authentication authentication) {

        String email = authentication.getName();

        return applicationService.getRecruiterApplications(email);
    }
    // Recruiter accepts or rejects an application
    @PutMapping("/{applicationId}/status")
    public JobApplication updateApplicationStatus(
            @PathVariable Long applicationId,
            @RequestParam String status,
            Authentication authentication) {

        String email = authentication.getName();

        return applicationService.updateApplicationStatus(
                applicationId, status, email);
    }
}