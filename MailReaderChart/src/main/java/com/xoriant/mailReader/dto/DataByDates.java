package com.xoriant.mailReader.dto;

import java.time.LocalDateTime;

import lombok.Data;

@Data
public class DataByDates {
	
	private LocalDateTime fromDate;
	private LocalDateTime toDate;

}
