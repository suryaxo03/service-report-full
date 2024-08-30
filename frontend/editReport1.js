document.addEventListener('DOMContentLoaded', async () => {
    // Handle displaying reports in editReport1.html
    const editReportTableBody = document.querySelector('#editReportTable tbody');

    if (editReportTableBody) {
        try {
            const response = await fetch('http://localhost:3000/api/reports/all');
            const reports = await response.json();

            if (reports.length === 0) {
                editReportTableBody.innerHTML = '<tr><td colspan="8">No reports available</td></tr>';
            } else {
                reports.forEach(report => {
                    const row = document.createElement('tr');

                    // Create a clickable link with the serial number to direct to editReport2.html
                    row.innerHTML = `
                        <td><a href="editReport2.html?serialNumber=${report.serialNumber}">${report.serialNumber}</a></td>
                        <td>${report.customerName}</td>
                        <td>${report.callNo}</td>
                        <td>${new Date(report.date).toLocaleDateString()}</td>
                        <td>${report.technicianName}</td>
                        <td>${report.machineType}</td>
                        <td>${report.compressorSlNo}</td>
                        <td>${report.workCarriedOut}</td>
                    `;
                    editReportTableBody.appendChild(row);
                });
            }
        } catch (error) {
            console.error('Error fetching reports:', error);
            editReportTableBody.innerHTML = '<tr><td colspan="8">Error loading reports</td></tr>';
        }
    }
});