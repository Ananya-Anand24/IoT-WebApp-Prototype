document.getElementById("fetchDataButton").addEventListener("click", fetchData);

async function fetchData() {
  try {
    const response = await fetch("http://localhost:5003/api/app/data");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    displayData(data);
  } catch (error) {
    console.error("Error fetching data:", error);
    document.getElementById("dataContainer").innerText = "Error fetching data. Check console for details.";
  }
}

function displayData(data) {
  const container = document.getElementById("dataContainer");
  
  // Clear the previous content
  container.innerHTML = "";

  // Loop through each data point and display the raw JSON
  data.forEach((item) => {
    const dataItem = document.createElement("div");
    dataItem.classList.add("data-item");
    
    // Display the entire JSON object as a string in a preformatted block
    const jsonContent = document.createElement("pre");
    jsonContent.textContent = JSON.stringify(item, null, 2); // Format with 2 spaces indentation
    
    // Append the raw JSON to the container
    dataItem.appendChild(jsonContent);
    container.appendChild(dataItem);
  });
}
