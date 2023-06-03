package com.xoriant.mailReader.repository;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.xoriant.mailReader.modal.ChartData;

@Repository
public interface ChartDataRepository extends JpaRepository<ChartData, Integer> {

	ChartData findFirstByOrderByDateDesc();

	List<ChartData> findByDateBetween(LocalDateTime fromDate, LocalDateTime toDate);

}
