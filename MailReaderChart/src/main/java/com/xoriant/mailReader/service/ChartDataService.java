package com.xoriant.mailReader.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;

import com.xoriant.mailReader.modal.ChartData;

@Service
public interface ChartDataService {

	List<ChartData> getAllData();

	ChartData addChartData(ChartData chartData);

	List<ChartData> storeData();

	List<ChartData> getDataBetweenDates(LocalDateTime fromDate, LocalDateTime toDate);

}
