package com.upwardiqsolutions.customer_onboarding_application.service.utill;

import java.time.LocalDateTime;
import java.util.List;

import lombok.Data;

@Data
public class ResponseStructureList<T> {
	private String msg;
	private int statuscode;
	private List<T> ldata;
	private LocalDateTime date=LocalDateTime.now();
}
