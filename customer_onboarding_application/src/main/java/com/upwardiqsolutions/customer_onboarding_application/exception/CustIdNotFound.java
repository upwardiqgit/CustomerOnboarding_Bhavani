package com.upwardiqsolutions.customer_onboarding_application.exception;

public class CustIdNotFound extends RuntimeException {
	String s="The customer you are looking for is not found!";

	public CustIdNotFound(String s) {
		this.s = s;
	}
	
	public CustIdNotFound() {
		
	}
	
	@Override
	public String getMessage() {
		return s;
	}
}
