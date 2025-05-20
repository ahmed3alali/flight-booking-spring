package net.airlineSystem.my_springApp.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;


@Entity
@Table(name = "passengers")
public class PersonDetails {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Integer PersonDetailsId;
	
    private int passportNo;
    private String email;
    private String name;
    private int flightId;
	public Integer getPersonDetailsId() {
		return PersonDetailsId;
	}
	public void setPersonDetailsId(Integer personDetailsId) {
		PersonDetailsId = personDetailsId;
	}
	public int getFlightId() {
		return flightId;
	}
	public void setFlightId(int flightId) {
		this.flightId = flightId;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
        
        public void setPassportNo(int passportNo) {
		this.passportNo = passportNo;
	}
        
        
        
        
        
        public int getPassportNo(){
        
        return passportNo;
        
        }
        
        
        
        
        
	@Override
	public String toString() {
		return "PersonDetails [PersonDetailsId=" + PersonDetailsId + ", email=" + email + ", passportNo=" + passportNo + "flightId="+flightId+ ", name="
				+ name + "]";
	}
	public PersonDetails(Integer personDetailsId, String name, int passportNo, String email,int flightId) {
		super();
		PersonDetailsId = personDetailsId;
		this.email = email;
		this.passportNo = passportNo;
		this.name = name;
                this.flightId = flightId;
	}
	public PersonDetails() {
		super();
		// TODO Auto-generated constructor stub
	}
    
    
    

}
