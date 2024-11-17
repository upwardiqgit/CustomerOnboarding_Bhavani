package com.upwardiqsolutions.customer_onboarding_application.repository;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.upwardiqsolutions.customer_onboarding_application.dto.Customer;

public interface CustomerRepository extends JpaRepository<Customer, Integer>{
	
	@Query("SELECT c FROM Customer c WHERE c.customer_name = :name and c.gender=:gender")
    List<Customer> findByNameCustomQuery(String name,String gender);	
}
