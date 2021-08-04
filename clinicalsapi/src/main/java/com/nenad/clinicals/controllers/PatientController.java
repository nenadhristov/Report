package com.nenad.clinicals.controllers;

import java.io.File;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.nenad.clinicals.model.ClinicalData;
import com.nenad.clinicals.model.Patient;
import com.nenad.clinicals.repos.PatientRepository;
import com.nenad.clinicals.repos.RoleRepository;
import com.nenad.clinicals.repos.UserRepository;
import com.nenad.clinicals.request.GetPatientRequest;
import com.nenad.clinicals.util.BMICalculator;

@RestController
@CrossOrigin(origins = "http://localhost:3000", maxAge = 3600)
@RequestMapping("/api")
public class PatientController {
	
	Logger logger = LoggerFactory.getLogger(PatientController.class);
	
	private PatientRepository repository;
	Map<String,Timestamp> filters = new TreeMap<>();
	
	@Autowired
	PatientController(PatientRepository repository){
		this.repository = repository;
	}
	
	@Autowired
	UserRepository userRepository;
	
	@Autowired
	RoleRepository roleRepository;
	
	@RequestMapping(value="/patients",method=RequestMethod.GET)
	@PreAuthorize("hasRole('DOCTOR') or hasRole('ADMIN')")
	public List<Patient> getPatients(){
		
		return repository.findAll();
		
	}
	
	
	@RequestMapping(value="/patients/{id}",method=RequestMethod.GET)
	@PreAuthorize("hasRole('DOCTOR') or hasRole('ADMIN') or hasRole('USER')")
	public Patient getPatient(@PathVariable("id") int id) {
		
		return repository.findById(id).get();
		
	}
	
	
	@RequestMapping(value="/patients/delete/{id}",method=RequestMethod.GET)
	@PreAuthorize("hasRole('DOCTOR') or hasRole('ADMIN')")
	public Patient deletePatient(@PathVariable("id") int id) {
			
			repository.deleteById(id);
			return null;
			
		}
	
	
	@RequestMapping(value="/patients",method=RequestMethod.POST)
	@PreAuthorize("hasRole('DOCTOR') or hasRole('ADMIN')")
	public Patient savePatient(@RequestBody Patient patient) {
		
		patient = repository.singlePatient(patient.getLastName(), patient.getFirstName(), patient.getAge());
		
		if(patient != null) {
			throw new RuntimeException("Error: Resource Already Exists");
		}
		else
		{
		return repository.save(patient);
		}
	}
	
	@RequestMapping(value="/patient/findsinglepatient",method=RequestMethod.POST)
	@PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
	public Patient returnSinglePatient(@RequestBody GetPatientRequest request) {
		
		Patient patient = repository.singlePatient(request.getLastname(), request.getFirstname(), request.getAge());
		if(patient==null) {
			
			return null;
		}
		
		return patient;
		
	}
	
	
	@RequestMapping(value="/patients/analyze/{id}",method=RequestMethod.GET)
	@PreAuthorize("hasRole('DOCTOR') or hasRole('ADMIN') or hasRole('USER')")
	public Patient analyze(@PathVariable("id") int id) {
		
		Patient patient = repository.findById(id).get();
		List<ClinicalData> clinicalData = patient.getClinicalData();
		Collections.sort(clinicalData, new ClinicalData());
		ArrayList<ClinicalData> duplicateClinicalData = new ArrayList<>(clinicalData);
		
		for(ClinicalData eachEntry:duplicateClinicalData) {
			
				if(filters.containsKey(eachEntry.getComponentName())) {
					
					clinicalData.remove(eachEntry);
					continue;
				
				} else {
					filters.put(eachEntry.getComponentName(),null);
				}
				BMICalculator.calculateBMI(clinicalData, eachEntry);
			}
		
		filters.clear();
		return patient;
		
	}
	
	@RequestMapping(value="/patients/analyze/singleUser",method=RequestMethod.POST)
	@PreAuthorize("hasRole('USER')")
	public Patient analyzesingleUser(@RequestBody GetPatientRequest request) {
		
		Patient patient = repository.singlePatient(request.getLastname(), request.getFirstname(), request.getAge());
		if(patient==null) {
			throw new RuntimeException("Error: Resource Not Found");
		}
		List<ClinicalData> clinicalData = patient.getClinicalData();
		Collections.sort(clinicalData, new ClinicalData());
		ArrayList<ClinicalData> duplicateClinicalData = new ArrayList<>(clinicalData);
		
		for(ClinicalData eachEntry:duplicateClinicalData) {
			
				if(filters.containsKey(eachEntry.getComponentName())) {
					
					clinicalData.remove(eachEntry);
					continue;
				
				} else {
					filters.put(eachEntry.getComponentName(),null);
				}
				BMICalculator.calculateBMI(clinicalData, eachEntry);
			}
		
		filters.clear();
		return patient;
		
	}
	
	


}
