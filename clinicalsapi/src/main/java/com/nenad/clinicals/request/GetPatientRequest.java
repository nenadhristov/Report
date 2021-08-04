package com.nenad.clinicals.request;

import javax.validation.constraints.NotBlank;

public class GetPatientRequest {
	
	@NotBlank
    private String lastname;
	
	@NotBlank
    private String firstname;
	
	@NotBlank
	private int age;

	public String getLastname() {
		return lastname;
	}

	public void setLastname(String lastname) {
		this.lastname = lastname;
	}

	public String getFirstname() {
		return firstname;
	}

	public void setFirstname(String firstname) {
		this.firstname = firstname;
	}

	public int getAge() {
		return age;
	}

	public void setAge(int age) {
		this.age = age;
	}
	
	

}
