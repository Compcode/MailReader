package com.xoriant.mailReader.resource;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.xoriant.mailReader.service.ChartDataService;
import com.xoriant.mailReader.dto.DataByDates;
import com.xoriant.mailReader.modal.ChartData;


@Resource
@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/v1/chartdata")
public class ChartDataResource {
	
	@Autowired
	private ChartDataService service;
	
	@GetMapping("/")
	public List<ChartData> getAllChartData() {
		return service.getAllData();
	}
	
	@PostMapping("/")
	public ChartData addChartData(@RequestBody ChartData chartData) {
		return service.addChartData(chartData);
	}
	
	@GetMapping("/refresh")
	public List<ChartData> storeData(){
		return service.storeData();
	}
	
	@PostMapping("/dates")
	public List<ChartData> getDataBetweenDates(@RequestBody DataByDates dates){
		
		return service.getDataBetweenDates(dates.getFromDate(), dates.getToDate());
	}

}
