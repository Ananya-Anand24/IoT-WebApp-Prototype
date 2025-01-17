# Running the Code

This document provides a step-by-step guide on how to run the code for the system, which includes three layers: **Edge Layer**, **Infrastructure Layer**, and **Cloud Layer**. Each layer runs as a separate service and must be executed in parallel. Follow the instructions below to get started.

---

## Prerequisites

1. **Node.js Installed:**  
   Ensure you have Node.js installed on your system. You can download it from the [Node.js Official Website](https://nodejs.org/).

2. **Code Files:**  
   Make sure you have the following files in your project directory:
   - `edgeLayer.js`
   - `infraLayer.js`
   - `appLayer.js`

3. **Frontend Pages:**  
   Ensure the associated frontend files are available and correctly linked to the respective layers.

---

## Steps to Run the Code

### 1. Open 3 Terminal Windows:
Each layer needs to run in a separate terminal to work simultaneously.

### 2. Start the Edge Layer:
1. Navigate to the project directory in the first terminal.
2. Run the following command:
   ```bash
   node edgeLayer.js
   ```
   This starts the edge layer service.

### 3. Start the Infrastructure Layer:
1. In the second terminal, navigate to the same project directory.
2. Run the following command:
   ```bash
   node infraLayer.js
   ```
   This starts the infrastructure layer service.

### 4. Start the Cloud Layer:
1. In the third terminal, navigate to the same project directory.
2. Run the following command:
   ```bash
   node appLayer.js
   ```
   This starts the cloud layer service.

### 5. Access the Frontend Pages:
Open the corresponding frontend pages in your web browser for each layer. The pages should be linked to their respective services.

---

## Notes

- Ensure all layers are running simultaneously to avoid communication or data flow issues.
- If you encounter any errors while starting a service, verify the dependencies and check the logs for specific error messages.
- Use a modern web browser for the best frontend compatibility and performance.

---

## Troubleshooting

### 1. **Ports in Use:**
If a service fails to start due to a port conflict, ensure the ports defined in the code are available or update the port settings in the respective `.js` files.

### 2. **Missing Dependencies:**
Run the following command in the project directory to install required dependencies:
```bash
npm install
```

### 3. **Frontend Issues:**
Ensure the frontend files are correctly configured to communicate with the respective backend layers.

---
