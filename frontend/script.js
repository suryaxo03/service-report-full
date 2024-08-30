document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', async function(event) {
            event.preventDefault();

            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirm-password').value;

            // Simple validation to check if passwords match
            if (password !== confirmPassword) {
                alert('Passwords do not match.');
                return;
            }

            try {

                const response = await fetch('http://localhost:3000/api/user/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ username, password })
                });

                if (response.ok) {
                    alert('User registered successfully.');
                    registerForm.reset();  // Clear the form fields
                    window.location.href = 'registerUser.html';  // Redirect to login page after registration
                } else {
                    const error = await response.text();
                    alert(error);
                }
            } catch (error) {
                console.error('Error:', error);
                alert('An error occurred while registering the user.');
            }
        });
    }

    // Admin Login
    const adminLoginForm = document.getElementById('adminLoginForm');
    if (adminLoginForm) {
        adminLoginForm.addEventListener('submit', async function(event) {
            event.preventDefault();

            const username = document.getElementById('adminUsername').value;
            const password = document.getElementById('adminPassword').value;

            try {
                const response = await fetch('http://localhost:3000/api/admin/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ username, password })
                });

                const result = await response.json();

                if (response.ok) {
                    // Store the admin JWT token in localStorage
                    localStorage.setItem('adminToken', result.token);
                    alert('Admin logged in successfully.');
                    window.location.href = 'adminDashboard.html';  // Redirect to admin dashboard
                } else {
                    alert(result.message);
                }
            } catch (error) {
                console.error('Error:', error);
                alert('An error occurred during admin login.');
            }
        });
    }

    // User Login
    const userLoginForm = document.getElementById('userLoginForm');
    if (userLoginForm) {
        userLoginForm.addEventListener('submit', async function(event) {
            event.preventDefault();

            const username = document.getElementById('userUsername').value;
            const password = document.getElementById('userPassword').value;

            try {
                const response = await fetch('http://localhost:3000/api/user/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ username, password })
                });

                const result = await response.json();

                if (response.ok) {
                    // Store the user JWT token in localStorage
                    localStorage.setItem('userToken', result.token);
                    alert('User logged in successfully.');
                    window.location.href = 'newReport.html';  // Redirect to user form page
                } else {
                    alert(result);
                }
            } catch (error) {
                console.error('Error:', error);
                alert('An error occurred during user login.');
            }
        });
    }
});

document.addEventListener('DOMContentLoaded', async() => {
    // Fetch the next serial number when the page loads
    const serialNumberInput = document.getElementById('serialNumber');

    try {
        const response = await fetch('http://localhost:3000/api/reports/next-serial-number');
        const data = await response.json();
        serialNumberInput.value = data.nextSerialNumber;
    } catch (error) {
        console.error('Error fetching next serial number:', error);
        serialNumberInput.value = 'Error';
    }
    // Report creation form handling
    const reportForm = document.getElementById('reportForm');

    if (reportForm) {
        reportForm.addEventListener('submit', async function(event) {
            event.preventDefault();

            const reportData = {
                customerName: document.getElementById('customerName').value,
                customerPhoneNo: document.getElementById('customerPhoneNo').value,
                callNo: document.getElementById('callNo').value,
                date: document.getElementById('date').value,
                callReceived: document.getElementById('callReceived').value,
                callCompleted: document.getElementById('callCompleted').value,
                machineType: document.getElementById('machineType').value,
                machineMake: document.getElementById('machineMake').value,
                machineSlNo: document.getElementById('machineSlNo').value,
                compressorMake: document.getElementById('compressorMake').value,
                compressorSlNo: document.getElementById('compressorSlNo').value,
                serviceDue: document.getElementById('serviceDue').value,
                natureOfCall: document.getElementById('natureOfCall').value,
                workCarriedOut: document.getElementById('workCarriedOut').value,
                detailsOfMaterials: document.getElementById('detailsOfMaterials').value,
                technicianName: document.getElementById('technicianName').value,
                techContactNo: document.getElementById('techContactNo').value
            };

            try {
                const response = await fetch('http://localhost:3000/api/reports/create', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(reportData)
                });

                if (response.ok) {
                    alert('Report created successfully.');
                    reportForm.reset();  // Clear the form fields after successful submission
                    window.location.href = 'newReport.html';
                } else {
                    const error = await response.text();
                    alert(error);
                }
            } catch (error) {
                console.error('Error during report creation:', error);
                alert('An error occurred during report creation.');
            }
        });
    }
});

document.addEventListener('DOMContentLoaded', async () => {
    const reportTableBody = document.querySelector('#reportTable tbody');

    if (reportTableBody) {
        try {
            const response = await fetch('http://localhost:3000/api/reports/all');
            const reports = await response.json();

            if (reports.length === 0) {
                reportTableBody.innerHTML = '<tr><td colspan="8">No reports available</td></tr>';
            } else {
                reports.forEach(report => {
                    const row = document.createElement('tr');
                    
                    row.innerHTML = `
                        <td>${report.serialNumber}</td>
                        <td>${report.customerName}</td>
                        <td>${report.callNo}</td>
                        <td>${new Date(report.date).toLocaleDateString()}</td>
                        <td>${report.technicianName}</td>
                        <td>${report.machineType}</td>
                        <td>${report.compressorSlNo}</td>
                        <td>${report.workCarriedOut}</td>
                    `;
                    reportTableBody.appendChild(row);
                });
            }
        } catch (error) {
            console.error('Error fetching reports:', error);
            reportTableBody.innerHTML = '<tr><td colspan="8">Error loading reports</td></tr>';
        }
    }
});
