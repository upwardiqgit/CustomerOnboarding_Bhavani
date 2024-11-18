package com.upwardiqsolutions.customer_onboarding_application.exceptionhandler;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.upwardiqsolutions.customer_onboarding_application.exception.CustIdNotFound;
import com.upwardiqsolutions.customer_onboarding_application.service.utill.ResponseStructure;

@RestControllerAdvice
public class MyExceptionHandler {

	ResponseStructure<String> structure=new ResponseStructure<String>();
	@ExceptionHandler(CustIdNotFound.class)
	public ResponseEntity<String> custidNotFound(CustIdNotFound custidNotFound) {
		structure.setMsg("The customer data is not found");
		structure.setData(custidNotFound.getMessage());
		structure.setStatuscode(HttpStatus.NOT_FOUND.value());
		return new ResponseEntity<String>(custidNotFound.getMessage(),HttpStatus.NOT_FOUND);
	}
}
