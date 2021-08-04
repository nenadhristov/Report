package com.nenad.clinicals.repos;

import java.util.List;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.nenad.clinicals.model.ClinicalData;
import com.nenad.clinicals.model.Patient;
import com.nenad.clinicals.model.User;

public interface PatientRepository extends JpaRepository<Patient, Integer> {
	
	@Query("FROM Patient where lastName=:lastname and firstName=:firstname and age=:age and age=:age")
	Patient singlePatient(@Param("lastname") String lastname, @Param("firstname") String firstname,@Param("age") int age);
	
}
