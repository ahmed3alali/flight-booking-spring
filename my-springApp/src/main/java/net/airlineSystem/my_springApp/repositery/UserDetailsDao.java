package net.airlineSystem.my_springApp.repositery;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import net.airlineSystem.my_springApp.model.UserDetails;

public interface UserDetailsDao extends JpaRepository<UserDetails, String> {
	
	UserDetails findByemail(String sub);
	
}
