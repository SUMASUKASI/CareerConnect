package com.suma.springbootdemo.repository;

import com.suma.springbootdemo.entity.JobApplication;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface JobApplicationRepository extends JpaRepository<JobApplication, Long> {

    List<JobApplication> findByApplicant_Id(Long applicantId);

    List<JobApplication> findByJob_Recruiter_Email(String email);

    boolean existsByApplicant_IdAndJob_Id(Long applicantId, Long jobId);

    boolean existsByJob_Id(Long jobId);
}