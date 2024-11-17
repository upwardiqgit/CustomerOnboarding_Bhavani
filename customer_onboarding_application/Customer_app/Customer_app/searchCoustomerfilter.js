// Function to export table data to Excel
function exportTableToExcel() {
    const table = document.getElementById("customer-table");
    const workbook = XLSX.utils.table_to_book(table, { sheet: "Customers" });
    XLSX.writeFile(workbook, "CustomerData.xlsx");
}

// Enable export button after data is loaded
function enableExportButton() {
    const exportButton = document.getElementById("export-button");
    exportButton.disabled = false;
    exportButton.addEventListener("click", exportTableToExcel);
}

// Function to fetch and populate customer data
function fetchCustomerData() {
    const customerName = document.getElementById("customer_name").value || "All";
    const gender = document.getElementById("gender").value || "All";
    const url = `http://localhost:8080/searchcustomers/filter/${customerName}/${gender}`; // API endpoint

    fetch(url, {
        method: "GET",
        headers: { "Content-Type": "application/json" }
    })
        .then((response) => {
            if (!response.ok) throw new Error(`Server error: ${response.status}`);
            return response.json();
        })
        .then((data) => {
            if (data?.ldata?.length > 0) {
                populateTable(data.ldata);
                enableExportButton();
            } else {
                alert("No customer data found.");
            }
        })
        .catch((error) => {
            console.error("Error fetching customer data:", error);
            alert("Failed to fetch customer data.");
        });
}

// Populate the table with data
function populateTable(customers) {
    const tableBody = document.querySelector("#customer-table tbody");
    tableBody.innerHTML = ""; // Clear previous data

    customers.forEach((customer) => {
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
}

// Fetch data when search button is clicked
document.getElementById("search-button").addEventListener("click", fetchCustomerData);
