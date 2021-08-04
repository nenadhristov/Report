package com.nenad.clinicals.controllers;

import java.sql.Timestamp;

import java.text.SimpleDateFormat;
import java.util.ArrayList;

import java.util.List;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.nenad.clinicals.controllers.dto.ClinicalDataRequest;
import com.nenad.clinicals.model.ClinicalData;
import com.nenad.clinicals.model.Patient;
import com.nenad.clinicals.repos.ClinicalDataRepository;
import com.nenad.clinicals.repos.PatientRepository;
import com.nenad.clinicals.repos.RoleRepository;
import com.nenad.clinicals.repos.UserRepository;
import com.nenad.clinicals.util.BMICalculator;
@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000", maxAge = 3600)
public class ClinicalDataController {
	private ClinicalDataRepository clinicalDataRepository;
	private PatientRepository patientRepository;
	
	@Autowired
	UserRepository userRepository;
	
	@Autowired
	RoleRepository roleRepository;
	
	ClinicalDataController(ClinicalDataRepository clinicalDataRepository,PatientRepository patientRepository){
		this.clinicalDataRepository=clinicalDataRepository;
		this.patientRepository=patientRepository;
	}
	
	@RequestMapping(value="/clinicals",method=RequestMethod.POST)
	@PreAuthorize("hasRole('DOCTOR') or hasRole('ADMIN')")
	public ClinicalData saveClinicalData(@RequestBody ClinicalDataRequest request)
	{
		Patient patient = patientRepository.findById(request.getPatientId()).get();
		ClinicalData clinicalData = new ClinicalData();
		clinicalData.setComponentName(request.getComponentName());
		clinicalData.setComponentValue(request.getComponentValue());
		clinicalData.setMeasuredDateTime(request.getMeasuredDateTime());
		clinicalData.setPatient(patient);
		return clinicalDataRepository.save(clinicalData);
		
	}
	
	@RequestMapping(value="/clinicals/{patiendId}/{componentName}",method=RequestMethod.GET)
	@PreAuthorize("hasRole('DOCTOR') or hasRole('ADMIN')or hasRole('USER')")
	public List<ClinicalData> getClinicalData(@PathVariable("patiendId")int patientId,@PathVariable("componentName") String componentName){
		
		if(componentName.equals("bmi")) {
			componentName = "hw";
		}
		List<ClinicalData> clinicalData = clinicalDataRepository.findByPatientIdAndComponentNameOrderByMeasuredDateTime(patientId,componentName);
		ArrayList<ClinicalData> duplicateClinicalData = new ArrayList<>(clinicalData);
		for(ClinicalData eachEntry:duplicateClinicalData) {
			
			BMICalculator.calculateBMI(clinicalData, eachEntry);
		}
		
		return clinicalData;
		
		
	}

}
