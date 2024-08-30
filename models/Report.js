const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
    customerName: { type: String, required: true },
    customerPhoneNo: { type: String, required: true },
    callNo: { type: String, required: true },
    date: { type: Date, required: true },
    callReceived: { type: String, required: true },
    callCompleted: { type: Date, required: true },
    machineType: { type: String, required: true },
    machineMake: { type: String, required: true },
    machineSlNo: { type: String, required: true },
    compressorMake: { type: String, required: true },
    compressorSlNo: { type: String, required: true },
    serviceDue: { type: String, required: true },
    natureOfCall: { type: String, required: true },
    workCarriedOut: { type: String, required: true },
    detailsOfMaterials: { type: String, required: true },
    technicianName: { type: String, required: true },
    techContactNo: { type: String, required: true },
    serialNumber: { type: Number, required: true, unique: true }
});

module.exports = mongoose.model('Report', reportSchema);
