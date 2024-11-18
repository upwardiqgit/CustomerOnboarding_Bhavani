// Get the submit button by ID
let submit = document.getElementById("submit");

submit.onclick = (e) => {
    // Prevent default form submission behavior
    e.preventDefault();

    // Get form input values by their IDs
    let customer_id = document.getElementById("customer_id").value;
    let customer_name = document.getElementById("customer_name").value;
    let address = document.getElementById("address").value;
    let age = document.getElementById("age").value;
    let salary = document.getElementById("salary").value;
    let interests = [];
    let gender = document.querySelector('input[name="gender"]:checked')?.value;

    // Collect selected interests from checkboxes
    let interestElements = document.querySelectorAll('input[name="interests[]"]:checked');
    interestElements.forEach(checkbox => {
        interests.push(checkbox.value);
    });

    // Check if required fields are filled
    if (!customer_id || !customer_name || !address || !age || !salary || !gender) {
        alert("Please fill in all required fields.");
        return;
    }

    // Backend API to check for duplicate customer ID
    let checkUrl = `http://localhost:8080/checkcustomerid/${customer_id}`; // Fixed template string syntax
    
    // First, check if the customer ID is unique
    fetch(checkUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Server error: ${response.status}`);
            }
            return response.json();
        })
        .then(isDuplicate => {
            if (isDuplicate) {
                // If the ID is already in use, display an alert
                alert("Customer ID must be unique. Please use another ID.");
            } else {
                // If the ID is unique, proceed to save the customer
                let customer = {
                    customer_id: customer_id,
                    customer_name: customer_name,
                    address: address,
                    age: parseInt(age), // Ensure age is an integer
                    salary: parseFloat(salary), // Ensure salary is a number
                    interests: interests,
                    gender: gender
                };

                // Backend API to save customer data
                let saveUrl = "http://localhost:8080/savecustomer";
                fetch(saveUrl, {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(customer)
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`Server error: ${response.status}`);
                    }
                    return response.json();
                })
                .then(data => {
                    alert("Customer saved successfully!");
                    console.log(data);
                })
                .catch(error => {
                    console.error('Error:', error);
                    alert("Error saving customer data.");
                });
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert("Error checking customer ID.");
        });
};
