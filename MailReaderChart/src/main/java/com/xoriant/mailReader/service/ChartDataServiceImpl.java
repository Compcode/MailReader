package com.xoriant.mailReader.service;

import java.io.File;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Vector;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import com.pff.PSTException;
import com.pff.PSTFile;
import com.pff.PSTFolder;
import com.pff.PSTMessage;
import com.xoriant.mailReader.modal.ChartData;
import com.xoriant.mailReader.modal.TableData;
import com.xoriant.mailReader.repository.ChartDataRepository;

@Service
public class ChartDataServiceImpl implements ChartDataService {

	@Autowired
	private ChartDataRepository repository;

	private String uploadedFileName;
	private String fName = "";
	private final String fileName = fName + uploadedFileName;
	private PSTFile pstFile;

	@Override
	public List<ChartData> getAllData() {

		return repository.findAll();
	}

	@Override
	public ChartData addChartData(ChartData chartData) {

		return repository.save(chartData);
	}

	@Override
	public List<ChartData> storeData() {

		try {
			pstFile = new PSTFile(fileName);
			processFolder(pstFile.getRootFolder());
		} catch (PSTException | IOException e) {
			e.printStackTrace();
		}

		return repository.findAll();
	}

	@Override
	public List<ChartData> getDataBetweenDates(LocalDateTime fromDate, LocalDateTime toDate) {
		
		toDate = toDate.plusDays(1).minusSeconds(1);

		return repository.findByDateBetween(fromDate, toDate);

	}

	//////////////////////////////////////////
	// HELPER CLASSESS
	/////////////////////////////////////////

	private void processFolder(PSTFolder folder) throws PSTException, java.io.IOException {

		ChartData maxData = repository.findFirstByOrderByDateDesc();

		LocalDateTime maxDate = null;
		if (maxData != null)
			maxDate = maxData.getDate();

		// go through the folders...
		if (folder.hasSubfolders()) {
			Vector<PSTFolder> childFolders = folder.getSubFolders().get(0).getSubFolders();
			for (PSTFolder childFolder : childFolders) {
				if (childFolder.getDisplayName().equalsIgnoreCase("Mail_reader")) {
					folder = childFolder;
					break;
				}
			}
		}

		// and now the emails for this folder
		if (folder.getContentCount() > 0) {
			PSTMessage email = (PSTMessage) folder.getNextChild();
			while (email != null) {
				Date date = email.getClientSubmitTime();
				SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
				String strDate = sdf.format(date);

				DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
				LocalDateTime localDate = LocalDateTime.parse(strDate, formatter);

				// If database has already that time of data
				if (maxDate != null && localDate.compareTo(maxDate) <= 0) {
					email = (PSTMessage) folder.getNextChild();
					continue;
				}

				String senderName = email.getSenderName();

				Map<String, String> data = parseHtmlData(email.getBodyHTML());
				System.out.println("\n" + data);

				ChartData chartData = new ChartData();

				TableData tableData = new TableData();
				tableData.setJava(convertToInt(data.get("java")));
				tableData.setAngular(convertToInt(data.get("angular")));
				tableData.setReact(convertToInt(data.get("react")));
				tableData.setPython(convertToInt(data.get("python")));

				chartData.setDate(localDate);
				chartData.setSenderName(senderName);
				chartData.setData(tableData);

				repository.save(chartData);

				email = (PSTMessage) folder.getNextChild();

			}

		}

	}

	private Map<String, String> parseHtmlData(String htmlData) {

		Map<String, String> data = new HashMap<>();

		Document doc = Jsoup.parse(htmlData);
		Element body = doc.body();

		Element table = body.select("table").first();
		if (table != null) {
			Elements trs = table.select("tr");

			for (Element tr : trs) {
				Elements tds = tr.select("td");

				String key = tds.get(0).text();
				String value = tds.get(1).text();

				data.put(key.toLowerCase(), value);
			}
		}
		return data;
	}

	private int convertToInt(String val) {

		int intVal = 0;

		try {
			intVal = Integer.parseInt(val);
		} catch (Exception e) {
			System.out.println("Unable to change " + val + " to Integer Type");
			intVal = 0;
		}
		return intVal;
	}

	@Override
	public String uploadFiles(MultipartFile[] files) {
		String uploadPath = "D:\\PST Files"; // Replace with your desired folder path
		fName = uploadPath;

        for (MultipartFile file : files) {
            String originalFileName = file.getOriginalFilename();
            uploadedFileName = originalFileName; // Save the file name to the variable

            String fileName = System.currentTimeMillis() + "_" + originalFileName; // Appending a timestamp to avoid overwriting files with the same name

            try {
                file.transferTo(new File(uploadPath + fileName));
            } 
            catch (IOException e) {
                e.printStackTrace();
                // Handle the file upload error
            }
        }
        return "";
	}

	@Override
	public String getFileName() {
		return uploadedFileName;
	}
	
	
	

}
