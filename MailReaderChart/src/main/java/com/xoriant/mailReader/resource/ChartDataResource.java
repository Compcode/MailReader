package com.xoriant.mailReader.resource;

import java.io.File;
import java.io.IOException;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

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
	
	//Not required as we will be getting data from the uploaded file
	@GetMapping("/refresh")
	public List<ChartData> storeData(){
		return service.storeData();
	}
	
	@PostMapping("/dates")
	public List<ChartData> getDataBetweenDates(@RequestBody DataByDates dates){
		
		return service.getDataBetweenDates(dates.getFromDate(), dates.getToDate());
	}
	
	//saving .pst file to specified folder then reading it
	
	@PostMapping("/save/file")
    public String uploadFiles(@RequestParam("files") MultipartFile[] files) {
        return service.uploadFiles(files);
    }

    @GetMapping("/uploadedFileName")
    public String getUploadedFileName() {
        return service.getFileName();
    }

}
