const express = require('express');
const { getComplaints, updateComplaintStatus } = require('../controllers/complaintFetchController');

const router = express.Router();

// Route to fetch all complaints
router.get('/fetchcomplaints', getComplaints);

// Route to update the status of a specific complaint
router.patch('/fetchcomplaints/:id/status', updateComplaintStatus);

module.exports = router;
