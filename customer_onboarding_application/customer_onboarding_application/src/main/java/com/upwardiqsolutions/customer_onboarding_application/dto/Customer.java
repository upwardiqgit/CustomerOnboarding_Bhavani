package com.upwardiqsolutions.customer_onboarding_application.dto;
import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;

@Entity
@Data
public class Customer {
	@Id
	private int customer_id;
	private String customer_name;
	private String gender;
	private String address;
	private int age;
	private double salary;
	private List<String> interests;
	
	
}
