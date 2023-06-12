package com.xoriant.mailReader.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.xoriant.mailReader.modal.ChartData;

@Service
public interface ChartDataService {

	List<ChartData> getAllData();

	ChartData addChartData(ChartData chartData);

	List<ChartData> storeData();

	List<ChartData> getDataBetweenDates(LocalDateTime fromDate, LocalDateTime toDate);
	
	// Method to save the file to a specific path and then read it
	public ResponseEntity<String> uploadFiles(MultipartFile[] files);

	public String getFileName();
}
