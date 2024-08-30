document.addEventListener('DOMContentLoaded', async () => {
    // Handle fetching and displaying a specific report in editReport2.html
    const editReportForm = document.getElementById('editReportForm');
    const urlParams = new URLSearchParams(window.location.search);
    const serialNumber = urlParams.get('serialNumber');
    console.log(`Fetching ${serialNumber}`);
    console.log(`${editReportForm}`);
    console.log('Reached edit block');
    if (serialNumber && editReportForm) {
        try {
            const response = await fetch(`http://localhost:3000/api/reports/${serialNumber}`);
            if (!response.ok) {
                throw new Error('Failed to fetch report data');
            }

            const report = await response.json();
            console.log(`Fetched ${serialNumber}`);
            // Populate the form fields with the existing report data
            document.getElementById('serialNumber').value = report.serialNumber;
            document.getElementById('customerName').value = report.customerName;
            document.getElementById('customerPhoneNo').value = report.customerPhoneNo;
            document.getElementById('callNo').value = report.callNo;
            document.getElementById('date').value = new Date(report.date).toISOString().split('T')[0];
            document.getElementById('callReceived').value = report.callReceived;
            document.getElementById('callCompleted').value = new Date(report.callCompleted).toISOString().split('T')[0];
            document.getElementById('machineType').value = report.machineType;
            document.getElementById('machineMake').value = report.machineMake;
            document.getElementById('machineSlNo').value = report.machineSlNo;
            document.getElementById('compressorMake').value = report.compressorMake;
            document.getElementById('compressorSlNo').value = report.compressorSlNo;
            document.getElementById('serviceDue').value = report.serviceDue;
            document.getElementById('natureOfCall').value = report.natureOfCall;
            document.getElementById('workCarriedOut').value = report.workCarriedOut;
            document.getElementById('detailsOfMaterials').value = report.detailsOfMaterials;
            document.getElementById('technicianName').value = report.technicianName;
            document.getElementById('techContactNo').value = report.techContactNo;
        } catch (error) {
            console.error('Error fetching report:', error);
            alert('Error loading report data.');
        }
    }

    // Handle updating the report when the form is submitted
    if (editReportForm) {
        editReportForm.addEventListener('submit', async function(event) {
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
                const response = await fetch(`http://localhost:3000/api/reports/${serialNumber}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(reportData)
                });

                if (response.ok) {
                    alert('Report updated successfully.');
                    window.location.href = 'editReport1.html';  // Redirect back to the report list
                } else {
                    const error = await response.text();
                    alert(error);
                }
            } catch (error) {
                console.error('Error updating report:', error);
                alert('An error occurred while updating the report.');
            }
        });
    }
});
