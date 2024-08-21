const express = require('express');
const axios = require('axios');
const app = express();

// Chuyển sang cổng mặc định của Bizfly nếu cổng không được xác định
const port = process.env.PORT || 80;

app.use(express.json());

app.post('/webhook', async (req, res) => {
    const data = req.body;

    try {
        // Gửi dữ liệu đến Power Automate
        const response = await axios.post('https://prod-40.southeastasia.logic.azure.com:443/workflows/9b00cdcb0a17402d82807f523828af85/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=0zVHvd5gz_t2yGyhB8iutqxqhmI8TdBzMQ3ELCekpFU', data, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        console.log('Data forwarded to Power Automate:', response.data);
        res.status(200).send('Data received and forwarded successfully');
    } catch (error) {
        console.error('Error forwarding data to Power Automate:', error.message);
        res.status(500).send('Failed to forward data');
    }
});

app.listen(port, () => {
    console.log(`Webhook is listening on port ${port}`);
});
