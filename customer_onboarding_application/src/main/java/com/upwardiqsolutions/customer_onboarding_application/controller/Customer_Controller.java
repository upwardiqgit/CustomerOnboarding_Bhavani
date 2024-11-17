package com.upwardiqsolutions.customer_onboarding_application.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.upwardiqsolutions.customer_onboarding_application.dto.Customer;
import com.upwardiqsolutions.customer_onboarding_application.service.Customer_Service;
import com.upwardiqsolutions.customer_onboarding_application.service.utill.ResponseStructure;
import com.upwardiqsolutions.customer_onboarding_application.service.utill.ResponseStructureList;

@CrossOrigin(origins="*",methods= {RequestMethod.POST,RequestMethod.GET})
@RestController
public class Customer_Controller {
	@Autowired
	private Customer_Service service;
	
//	save the customer details 
	@PostMapping("/savecustomer")
	public ResponseEntity<ResponseStructure<Customer>> saveCustomer(@RequestBody Customer customer) {
		return service.saveCustomer(customer);
	}
	
	
//	search the customer details by id 
	@GetMapping("/searchcustomer/{id}")
	public ResponseEntity<ResponseStructure<Customer>> searchCustomer(@PathVariable int id) {
		return service.searchCustomer(id);
	}
	
	
//	find all
	@CrossOrigin(origins = "http://127.0.0.1:5500")
	@GetMapping("/searchcustomers")
	public ResponseEntity<ResponseStructureList<Customer>> searchCustomers() {
		return service.searchCustomers();
	}
	
//	checking the id is unique or not 
	@GetMapping("/checkcustomerid/{id}")
    public ResponseEntity<Boolean> checkCustomerId(@PathVariable int id) {
        boolean exists = service.checkCustomerId(id);
        return ResponseEntity.ok(exists);
    }
	@GetMapping("/searchcustomers/filter/{customer_name}/{gender}")
	public ResponseEntity<ResponseStructureList<Customer>> searchByCustNameAndGender(@PathVariable String customer_name,@PathVariable String gender) {
		return service.findByNameCustomQuery(customer_name,gender);
	}
	
	
}
