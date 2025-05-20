package net.airlineSystem.my_springApp.repositery;

import org.springframework.data.jpa.repository.JpaRepository;

import net.airlineSystem.my_springApp.model.CustomerAddress;

public interface CustomerAddressDao extends JpaRepository<CustomerAddress, Integer> {
 
}
