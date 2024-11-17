package com.upwardiqsolutions.customer_onboarding_application.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.upwardiqsolutions.customer_onboarding_application.dao.Customer_Dao;
import com.upwardiqsolutions.customer_onboarding_application.dto.Customer;
import com.upwardiqsolutions.customer_onboarding_application.exception.CustIdNotFound;
import com.upwardiqsolutions.customer_onboarding_application.service.utill.ResponseStructure;
import com.upwardiqsolutions.customer_onboarding_application.service.utill.ResponseStructureList;

@Service
public class Customer_Service {
	@Autowired
	private Customer_Dao dao;
	
	ResponseStructure<Customer> structure=new ResponseStructure<Customer>();
	
//	save the customer details 
	public ResponseEntity<ResponseStructure<Customer>> saveCustomer(Customer customer){
		structure.setData(dao.saveCustomer(customer));
		structure.setMsg("The data you've entered is stored successfully!");
		structure.setStatuscode(HttpStatus.CREATED.value());
		return  new ResponseEntity<ResponseStructure<Customer>>(structure,HttpStatus.CREATED);
		
	}

//	search the customer details by id 
	public ResponseEntity<ResponseStructure<Customer>> searchCustomer(int id) {
		Customer customer=dao.searchCustomer(id);
		if(customer!=null) {
		structure.setData(customer);
		structure.setMsg("Here's the customer details that you are searching for!");
		structure.setStatuscode(HttpStatus.FOUND.value());
		return new ResponseEntity<ResponseStructure<Customer>>(structure,HttpStatus.FOUND);
	}else {
		throw new CustIdNotFound();
	}
	}

	
//	checking the id is unique or not 

	public boolean checkCustomerId(int id) {
		return dao.checkCustomerId(id);
	}

	
//	find all
	public ResponseEntity<ResponseStructureList<Customer>> searchCustomers() {
		ResponseStructureList<Customer> structure = new ResponseStructureList<Customer>();
		structure.setLdata(dao.searchCustomers());
		structure.setMsg("These are all the customers , that you are lookin for !");
		structure.setStatuscode(HttpStatus.OK.value());
	    return new ResponseEntity<ResponseStructureList<Customer>>(structure,HttpStatus.OK);
	}
	public ResponseEntity<ResponseStructureList<Customer>> findByNameCustomQuery(String customer_name,String gender) {
        ResponseStructureList<Customer> structure = new ResponseStructureList<>();
        structure.setLdata(dao.findByNameCustomQuery(customer_name,gender));
        structure.setMsg("customer data based on the form controls!");
        structure.setStatuscode(HttpStatus.OK.value());
        return new ResponseEntity<>(structure, HttpStatus.OK);
    }
}
