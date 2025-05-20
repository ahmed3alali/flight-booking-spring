package net.airlineSystem.my_springApp.service;

import java.util.List;

import net.airlineSystem.my_springApp.model.UserDetails;

public interface UserService {
	
	public UserDetails saveuser(UserDetails user) throws Exception;
	public List<UserDetails> getAllUser()throws Exception;
	public String deleteAllUser() throws Exception;
}
