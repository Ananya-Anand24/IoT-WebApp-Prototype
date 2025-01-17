const express = require('express'); // Express is used to create a REST API server
const path = require('path'); // Path is used to handle file paths
const cors = require('cors'); // CORS middleware to enable cross-origin requests from the frontend
const XLSX = require('xlsx'); // We use this to simulate reading data from an Excel file

const app = express(); // Initialize an Express application
app.use(cors()); // Enable CORS to allow the frontend to access this layer's API

// Simulate reading an Excel file
function readExcelFile() {
  const filePath = path.join(__dirname, 'HM_CustomerTransaction 1.xlsx'); // Excel file path
  const workbook = XLSX.readFile(filePath); // Read the workbook
  const sheetName = workbook.SheetNames[0]; // Use the first sheet
  const sheet = workbook.Sheets[sheetName]; // Get the first sheet
  
  // Convert the sheet data to JSON format
  const jsonData = XLSX.utils.sheet_to_json(sheet);
  return jsonData;
}

// Simulate data sending at regular intervals (every 5 seconds in this case)
function sendDataToMockSensors() {
  
  let currentIndex = 0;
  let latestData = null;
  let mockData = readExcelFile();
  
  // Update latestData every 5 seconds
  setInterval(() => {
    if (currentIndex < mockData.length) {
      latestData = [mockData[currentIndex]];
      currentIndex++;
    } else {
      currentIndex = 0; // Reset
    }
  }, 5000);
  
  app.get('/api/edge/data', (req, res) => {
    if (latestData) {
      res.json(latestData);
    } else {
      res.status(204).send(); // No data available yet
    }
  });
    
}

// Start the data sending simulation
sendDataToMockSensors();

// Define the port number for this layer
const PORT = 5001;

// Start the server and log a message to indicate it's running
app.listen(PORT, () => console.log(`Edge Layer running on port ${PORT}`));
