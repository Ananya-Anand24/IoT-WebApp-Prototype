const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json()); // Middleware to parse JSON request bodies

// Create HTTP server for WebSocket
const server = http.createServer(app);

// WebSocket server for real-time updates
const wss = new WebSocket.Server({ server });

let dataStore = []; // In-memory data store

// Broadcast new data to all connected WebSocket clients
function broadcastData(data) {
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(data)); // Send the new data to connected clients
    }
  });
}

// Function to fetch data from Infra Layer at regular intervals
async function fetchDataFromInfraLayer() {
  try {
    const response = await axios.get('http://localhost:5002/api/infra/data'); // Fetch data from Infra Layer
    const data = response.data; // Extract data from the response

    if (data && data.length > 0) {
      console.log('Fetched data from Infra Layer:', data);
      dataStore.push(...data); // Store the data in memory
      broadcastData(data); // Broadcast the new data to WebSocket clients
    }
  } catch (error) {
    console.error('Error fetching data from Infra Layer:', error.message);
  }
}

// Set up an interval to fetch data every 7 seconds
setInterval(fetchDataFromInfraLayer, 7000);

// Endpoint for fetching all stored data (optional, for debugging)
app.get('/api/cloud/data', (req, res) => {
  res.json(dataStore);
});

// WebSocket connection handler
wss.on('connection', (ws) => {
  console.log('Client connected');
  ws.send(JSON.stringify({ message: 'Connected to WebSocket server' })); // Notify client of connection
});

// Server listening
const PORT = 5003;
server.listen(PORT, () => {
  console.log(`App Layer (Cloud) running on port ${PORT}`);
});
