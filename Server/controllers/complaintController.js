const Complaint = require('../models/complaintModel');

exports.createComplaint = async (req, res) => {
  try {
    const complaintData = req.body;
    
    // Handle file uploads if any
    if (req.files && req.files.length > 0) {
      complaintData.crimeEvidence = req.files.map(file => file.path);
    }

    const newComplaint = new Complaint(complaintData);
    const savedComplaint = await newComplaint.save();
    
    res.status(201).json({
      success: true,
      data: savedComplaint
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};
