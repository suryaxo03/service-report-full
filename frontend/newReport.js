document.addEventListener('DOMContentLoaded', () => {
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
