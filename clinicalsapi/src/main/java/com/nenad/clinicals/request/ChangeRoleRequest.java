package com.nenad.clinicals.request;

import java.util.Set;

import javax.validation.constraints.NotBlank;

public class ChangeRoleRequest {
	
	@NotBlank
    private String username;
	
	private Set<String> role;
	
	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public Set<String> getRole() {
		return role;
	}

	public void setRole(Set<String> role) {
		this.role = role;
	}

}
