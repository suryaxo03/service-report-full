document.addEventListener('DOMContentLoaded', async () => {
    const deleteReportTableBody = document.querySelector('#deleteReportTable tbody');

    if (deleteReportTableBody) {
        try {
            const response = await fetch('http://localhost:3000/api/reports/all');
            const reports = await response.json();

            if (reports.length === 0) {
                deleteReportTableBody.innerHTML = '<tr><td colspan="9">No reports available</td></tr>';
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
                        <td><button class="delete-btn" data-serial="${report.serialNumber}">Delete</button></td>
                    `;

                    deleteReportTableBody.appendChild(row);
                });

                // Add event listeners to the delete buttons
                const deleteButtons = document.querySelectorAll('.delete-btn');
                deleteButtons.forEach(button => {
                    button.addEventListener('click', async (event) => {
                        const serialNumber = event.target.getAttribute('data-serial');
                        
                        // Confirm deletion
                        const confirmDelete = confirm(`Are you sure you want to delete report with Serial Number ${serialNumber}?`);

                        if (confirmDelete) {
                            try {
                                const response = await fetch(`http://localhost:3000/api/reports/${serialNumber}`, {
                                    method: 'DELETE'
                                });

                                if (response.ok) {
                                    alert('Report deleted successfully.');
                                    // Remove the row from the table
                                    event.target.closest('tr').remove();
                                } else {
                                    const error = await response.text();
                                    alert(`Failed to delete report: ${error}`);
                                }
                            } catch (error) {
                                console.error('Error deleting report:', error);
                                alert('An error occurred while deleting the report.');
                            }
                        }
                    });
                });
            }
        } catch (error) {
            console.error('Error fetching reports:', error);
            deleteReportTableBody.innerHTML = '<tr><td colspan="9">Error loading reports</td></tr>';
        }
    }
});
