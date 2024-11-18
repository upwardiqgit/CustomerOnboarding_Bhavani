package com.upwardiqsolutions.customer_onboarding_application.dao;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.upwardiqsolutions.customer_onboarding_application.dto.Customer;
import com.upwardiqsolutions.customer_onboarding_application.repository.CustomerRepository;

@Repository
public class Customer_Dao {
	@Autowired
	private CustomerRepository repository;
	
	
//	save the customer details 
	public Customer saveCustomer(Customer customer) {
		return repository.save(customer);
	}

	
//	search the customer details by id 
	public Customer searchCustomer(int id) {
		Optional<Customer> customer=repository.findById(id);
		if(customer.isPresent()) {
			return customer.get();
		}
		else {
			return null;
		}
	}
	
//	check the id if its unique or not 
	public boolean checkCustomerId(int id) {
        return repository.existsById(id); // Spring Data JPA method
    }


//	find all  
	public List<Customer> searchCustomers() {
		return repository.findAll();
	}

//find by filter
	public List<Customer> findByNameCustomQuery(String customer_name,String gender) {
        return repository.findByNameCustomQuery(customer_name,gender);
    }

}
