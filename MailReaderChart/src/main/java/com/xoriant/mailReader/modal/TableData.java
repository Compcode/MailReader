package com.xoriant.mailReader.modal;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import lombok.Data;

@Data
@Entity
public class TableData {
	
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private int id;
	private int java;
	private int angular;
	private int react;
	private int python;
	
}
