package com.nenad.clinicals.controllers;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PostMapping;

import com.nenad.clinicals.repos.RoleRepository;
import com.nenad.clinicals.repos.UserRepository;
import com.nenad.clinicals.controllers.dto.ClinicalDataRequest;
import com.nenad.clinicals.model.ClinicalData;
import com.nenad.clinicals.model.Erole;
import com.nenad.clinicals.model.Patient;
import com.nenad.clinicals.model.Role;
import com.nenad.clinicals.model.User;

import com.nenad.clinicals.request.ChangeRoleRequest;
import com.nenad.clinicals.util.BMICalculator;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api")
public class UserController {

	@Autowired
	UserRepository userRepository;
	
	@Autowired
	RoleRepository roleRepository;
	
	@GetMapping("/all")
	public String allAccess() {
		return "Public Content.";
	}
	
	@PostMapping("/admin/changeRole")
	@PreAuthorize("hasRole('ADMIN')")
	public String changeRole(@Valid @RequestBody ChangeRoleRequest changeRole) {
		if (userRepository.existsByUsername(changeRole.getUsername())) {
			
			User user = userRepository.findByUsername(changeRole.getUsername()).get();
			if(user==null) {
				throw new RuntimeException("Error: Resource Not Found");
			}
			else
			{
			Set<String> strRoles = changeRole.getRole();
			Set<Role> roles = new HashSet<>();
			
			if (strRoles == null) {
				
						throw new RuntimeException("Error: Bad Request");	
			}
			else {
				strRoles.forEach(role -> {
					switch (role) {
					case "admin":
						Role adminRole = roleRepository.findByName(Erole.ROLE_ADMIN)
								.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
						roles.add(adminRole);

						break;
					case "doctor":
						Role docRole = roleRepository.findByName(Erole.ROLE_DOCTOR)
								.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
						roles.add(docRole);

						break;
					default:
						Role userRole = roleRepository.findByName(Erole.ROLE_USER)
								.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
						roles.add(userRole);
					}
				});
			}

			user.setRoles(roles);
			userRepository.save(user);

		}
			
			return "User saved sucessfully";
			
		}
		else
		{
			throw new RuntimeException("Error: Resource Not Found");
		}
	}
			
}
