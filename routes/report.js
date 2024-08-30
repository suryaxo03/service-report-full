const express = require('express');
const Report = require('../models/Report');
const router = express.Router();

// Route to create a new report
router.post('/create', async (req, res) => {
    const {
        customerName,
        customerPhoneNo,
        callNo,
        date,
        callReceived,
        callCompleted,
        machineType,
        machineMake,
        machineSlNo,
        compressorMake,
        compressorSlNo,
        serviceDue,
        natureOfCall,
        workCarriedOut,
        detailsOfMaterials,
        technicianName,
        techContactNo
    } = req.body;

    try {
        // Generate the next serial number
        const lastReport = await Report.findOne().sort({ serialNumber: -1 });
        const serialNumber = lastReport ? lastReport.serialNumber + 1 : 1;

        // Create a new report
        const newReport = new Report({
            customerName,
            customerPhoneNo,
            callNo,
            date,
            callReceived,
            callCompleted,
            machineType,
            machineMake,
            machineSlNo,
            compressorMake,
            compressorSlNo,
            serviceDue,
            natureOfCall,
            workCarriedOut,
            detailsOfMaterials,
            technicianName,
            techContactNo,
            serialNumber
        });

        await newReport.save();
        res.status(201).send('Report created successfully');
    } catch (error) {
        console.error('Error creating report:', error);
        res.status(500).send('Internal Server Error');
    }
});
// Route to get the next serial number
router.get('/next-serial-number', async (req, res) => {
    try {
        const lastReport = await Report.findOne().sort({ serialNumber: -1 });
        const nextSerialNumber = lastReport ? lastReport.serialNumber + 1 : 1;
        res.json({ nextSerialNumber });
    } catch (error) {
        console.error('Error fetching next serial number:', error);
        res.status(500).send('Internal Server Error');
    }
});
// Route to get all reports
router.get('/all', async (req, res) => {
    try {
        const reports = await Report.find();
        res.json(reports);
    } catch (error) {
        console.error('Error fetching reports:', error);
        res.status(500).send('Internal Server Error');
    }
});
/// Route to get a report by serial number
router.get('/:serialNumber', async (req, res) => {
    try {
        const serialNumber = parseInt(req.params.serialNumber, 10);
        const report = await Report.findOne({ serialNumber: serialNumber });

        if (!report) {
            return res.status(404).send('Report not found');
        }
        res.json(report);
    } catch (error) {
        console.error('Error fetching report:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Route to update a report by serial number
router.put('/:serialNumber', async (req, res) => {
    try {
        const serialNumber = parseInt(req.params.serialNumber, 10); // Ensure serial number is an integer

        // Attempt to find and update the report
        const updatedReport = await Report.findOneAndUpdate(
            { serialNumber: serialNumber },
            req.body,
            { new: true, runValidators: true } // runValidators ensures that the update respects the schema
        );

        if (!updatedReport) {
            return res.status(404).send('Report not found');
        }

        res.send('Report updated successfully');
    } catch (error) {
        console.error('Error updating report:', error);
        res.status(500).send('Internal Server Error');
    }
});
// Route to delete a report by serial number
router.delete('/:serialNumber', async (req, res) => {
    try {
        const serialNumber = parseInt(req.params.serialNumber, 10);
        const deletedReport = await Report.findOneAndDelete({ serialNumber: serialNumber });

        if (!deletedReport) {
            return res.status(404).send('Report not found');
        }

        res.send('Report deleted successfully');
    } catch (error) {
        console.error('Error deleting report:', error);
        res.status(500).send('Internal Server Error');
    }
});


module.exports = router;
