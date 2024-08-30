// models/complaintModel.js
const mongoose = require('mongoose');

const complaintSchema = new mongoose.Schema({
  time: String,
  date: String,
  crimeLocation: String,
  crimeType: String,
  suspectDescription: String,
  witnessName: String,
  witnessContact: String,
  witnessDescription: String,
  shareWitnessInfo: Boolean,
  victimName: String,
  victimContact: String,
  victimDescription: String,
  otherDescription: String,
  location: {
    latitude: Number,
    longitude: Number,
    areaName: String
  },
  status: {
    type: String,
    enum: ['Case Accepted', 'In Process', 'Action Taken'],
    default: 'Case Accepted'
  },
  // For file uploads, we'll store the file path or URL
  crimeEvidence: [String]
}, { timestamps: true });

module.exports = mongoose.model('Complaint', complaintSchema);


