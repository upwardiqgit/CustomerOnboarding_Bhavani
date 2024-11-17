// Include the Export to Excel functionality
function exportTableToExcel() {
    const table = document.getElementById("customer-table");
    const workbook = XLSX.utils.table_to_book(table, { sheet: "Customers" });
    XLSX.writeFile(workbook, "CustomerData.xlsx");
}

// Function to fetch and populate customer data
function fetchCustomerData() {
    const url = "http://localhost:8080/searchcustomers"; // Ensure this URL is correct

    fetch(url, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Server error: ${response.status}`);
        }
        return response.json(); // Parse JSON response
    })
    .then(data => {
        // Check if 'ldata' exists and has customer data
        if (!data || !data.ldata || data.ldata.length === 0) {
            document.getElementById("error-message").innerText = "No customer data available.";
            document.getElementById("error-message").style.display = 'block';
            return;
        }

        // Validate statuscode is 200 and handle the success case
        if (data.statuscode !== 200) {
            document.getElementById("error-message").innerText = data?.msg || "Unexpected response from the server.";
            document.getElementById("error-message").style.display = 'block';
            return;
        }

        // Populate the table
        const tableBody = document.querySelector("#customer-table tbody");
        tableBody.innerHTML = ""; // Clear any previous rows

        // Loop through the customer data and add rows to the table
        data.ldata.forEach(customer => {
            const row = document.createElement("tr");

            row.innerHTML = `
                <td>${customer.customer_id}</td>
                <td>${customer.customer_name}</td>
                <td>${customer.address}</td>
                <td>${customer.age}</td>
                <td>${customer.salary}</td>
                <td>${customer.interests.join(", ")}</td>
                <td>${customer.gender}</td>
            `;

            tableBody.appendChild(row);
        });

        // Enable export button if data is available
        const exportButton = document.getElementById("export-button");
        exportButton.disabled = false;
        exportButton.addEventListener("click", exportTableToExcel);
    })
    .catch(error => {
        console.error("Error fetching customer data:", error);
        document.getElementById("error-message").innerText = "Error fetching customer data. Please try again.";
        document.getElementById("error-message").style.display = 'block';
    });
}

// Fetch and display data when the page loads
document.addEventListener("DOMContentLoaded", fetchCustomerData);
