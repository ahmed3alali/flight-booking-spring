package net.airlineSystem.my_springApp.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class CustomerAddress {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Integer addressId;  // corrected field name
	
    private String city;
    private String state;
    private String street;
    private String zipcode;

	// Constructors
	public CustomerAddress() {
	}

	public CustomerAddress(Integer addressId, String city, String state, String street, String zipcode) {
		this.addressId = addressId;
		this.city = city;
		this.state = state;
		this.street = street;
		this.zipcode = zipcode;
	}

	// Getters and Setters
	public Integer getAddressId() {
		return addressId;
	}

	public void setAddressId(Integer addressId) {
		this.addressId = addressId;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public String getState() {
		return state;
	}

	public void setState(String state) {
		this.state = state;
	}

	public String getStreet() {
		return street;
	}

	public void setStreet(String street) {
		this.street = street;
	}

	public String getZipcode() {
		return zipcode;
	}

	public void setZipcode(String zipcode) {
		this.zipcode = zipcode;
	}

	@Override
	public String toString() {
		return "CustomerAddress [addressId=" + addressId + ", city=" + city + ", state=" + state + ", street=" + street
				+ ", zipcode=" + zipcode + "]";
	}
}
