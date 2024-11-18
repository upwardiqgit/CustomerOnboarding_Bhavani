package com.upwardiqsolutions.customer_onboarding_application.service.utill;

import java.time.LocalDateTime;

import lombok.Data;

@Data
public class ResponseStructure<T> {
	private String msg;
	private int statuscode;
	private T data;
	private LocalDateTime date=LocalDateTime.now();
	
}
