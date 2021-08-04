package com.nenad.clinicals.repos;

import java.util.List;


import org.springframework.data.jpa.repository.JpaRepository;

import com.nenad.clinicals.model.ClinicalData;

public interface ClinicalDataRepository extends JpaRepository<ClinicalData, Integer> {

	List<ClinicalData> findByPatientIdAndComponentNameOrderByMeasuredDateTime(int patientId, String componentName);
}
