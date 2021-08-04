package com.nenad.clinicals.repos;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.nenad.clinicals.model.Role;
import com.nenad.clinicals.model.Erole;
@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
	
	Optional<Role> findByName(Erole name);
}