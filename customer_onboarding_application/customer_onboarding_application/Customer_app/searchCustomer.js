document.addEventListener("DOMContentLoaded", fetchCustomerData);

const form = document.getElementById("search-form");
form.addEventListener("submit", (e) => {
    e.preventDefault();    
    fetchCustomerData11();
});

function fetchCustomerData() {
    
    const url = "http://localhost:8080/searchcustomers";

    fetch(url, { method: "GET", headers: { "Content-Type": "application/json" } })
        .then(handleResponse)
        .then((data) => {
            if (data.ldata?.length > 0) {
                populateTable(data.ldata);
                enableExportButton();
            } else {
                displayError("No customer data available.");
            }
        })
        .catch((error) => displayError("Error fetching customer data."));
}
console.log(form); // Check if this logs the form element

function fetchCustomerData11() {
    console.log("hello1");
    
    const customerName = document.getElementById("customer_name").value || "All";
    const gender = document.getElementById("gender").value || "All";

    const queryParams = new URLSearchParams();
    if (customerName !== "All") queryParams.append("customer_name", customerName);
    if (gender !== "All") queryParams.append("gender", gender);

    const url = `http://localhost:8080/searchcustomers/filter?${queryParams.toString()}`;

    fetch(url, { method: "GET", headers: { "Content-Type": "application/json" } })
        .then(handleResponse)
        .then((data) => {
            if (data.ldata?.length > 0) {
                populateTable(data.ldata);
                enableExportButton();
            } else {
                alert("No customer data found.");
            }
        })
        .catch((error) => alert("Failed to fetch customer data."));
}

function handleResponse(response) {
    if (!response.ok) throw new Error(`Server error: ${response.status}`);
    return response.json();
}

function populateTable(customers) {
    const tableBody = document.querySelector("#customer-table tbody");
    tableBody.innerHTML = "";

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

function enableExportButton() {
    const exportButton = document.getElementById("export-button");
    exportButton.disabled = false;
    exportButton.addEventListener("click", exportTableToExcel);
}

function displayError(message) {
    const errorMessage = document.getElementById("error-message");
    errorMessage.innerText = message;
    errorMessage.style.display = "block";
}

function exportTableToExcel() {
    const table = document.getElementById("customer-table");
    const workbook = XLSX.utils.table_to_book(table, { sheet: "Customers" });
    XLSX.writeFile(workbook, "CustomerData.xlsx");
}