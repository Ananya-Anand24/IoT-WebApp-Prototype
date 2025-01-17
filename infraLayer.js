const express = require('express');
const axios = require('axios'); // Axios is a promise-based HTTP client for making requests to other layers
const cors = require('cors'); // CORS middleware to allow cross-origin requests from the frontend

const app = express(); // Initialize an Express application
app.use(cors()); // Enable CORS for all incoming requests, allowing the frontend to access this layer
app.use(express.json()); // Middleware to parse JSON request bodies

// Helper function to send data to the App Layer
async function forwardDataToAppLayer(processedData) {
  console.log('Sending data to App Layer:', processedData);  // Log data being forwarded
  try {
    const response = await axios.post('http://localhost:5003/api/cloud/store', processedData, {
      headers: { 'Content-Type': 'application/json' },  // Ensure the correct content type is set
    });
    console.log('Data forwarded to App Layer successfully:', response.data);
  } catch (error) {
    console.error('Error forwarding data to App Layer:', error.message);
  }
}

// Define an API endpoint to fetch and process data from the Edge Layer
app.get('/api/infra/data', async (req, res) => {
  try {
    // Fetch raw data from the Edge Layer API
    const response = await axios.get('http://localhost:5001/api/edge/data');
    const rawData = response.data; // Extract the raw data from the response

    // Forward the processed data to the App Layer for storage
    await forwardDataToAppLayer(rawData);

    // Send the processed data as a JSON response
    res.json(rawData);
  } catch (error) {
    // Log any errors that occur during the request or processing
    console.error('Error in Infrastructure Layer:', error.message);
    res.status(500).json({ error: 'Failed to fetch or process data' });
  }
});

// Set up an interval to fetch data and process it every 5 seconds
setInterval(async () => {
  try {
    console.log('Fetching and forwarding data...');
    await axios.get('http://localhost:5002/api/infra/data');  // Call the /api/infra/data endpoint
  } catch (error) {
    console.error('Error during scheduled fetch:', error.message);
  }
}, 5000);  // 5000ms = 5 seconds interval

// Define the port number for this layer
const PORT = 5002;

// Start the server and log a message to indicate it's running
app.listen(PORT, () => console.log(`Infrastructure Layer running on port ${PORT}`));
