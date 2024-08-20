const express = require('express');
const router = express.Router();
const xlsx = require('xlsx');
const fs = require('fs');
const { format } = require('date-fns');

router.post('/', async (req, res) => {
    const data = req.body;

    if (!Array.isArray(data) || data.length === 0) {
        return res.status(400).json({ error: 'Invalid data' });
    }

    try {
        const workbook = xlsx.utils.book_new();
        const worksheet = xlsx.utils.json_to_sheet(data);

        xlsx.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

        const fileName = format(new Date(), 'yyyy-MM-dd_HH-mm-ss') + '.xlsx';
       +
        xlsx.writeFile(workbook, fileName);

        res.download(fileName, (err) => {
            fs.unlink(fileName, (unlinkErr) => {
                if (unlinkErr) {
                    console.error('Error deleting file:', unlinkErr);
                }
            });

            if (err) {
                console.error('Error sending file:', err);
                res.status(500).json({ error: 'Failed to send file' });
            }
        });
    } catch (error) {
        console.error('Error generating Excel file:', error);
        res.status(500).json({ error: 'Failed to create Excel file' });
    }
});

module.exports = router;
