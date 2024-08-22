const express = require('express');
const path = require('path');  // Thêm thư viện path
const axios = require('axios');
const app = express();

// Chuyển sang cổng mặc định của Bizfly nếu cổng không được xác định
const port = process.env.PORT || 80;

// Thư mục chứa tệp HTML xác thực (thay đổi nếu cần)
const publicPath = path.join(__dirname, 'public');

// Middleware để phục vụ các tệp tĩnh
app.use(express.static(publicPath));

app.use(express.json());

// Endpoint để xử lý yêu cầu webhook từ Zalo
app.post('/webhook', async (req, res) => {
    const data = req.body;

    try {
        // Gửi dữ liệu đến Power Automate (giữ nguyên logic cũ)
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

// Endpoint để phục vụ tệp HTML xác thực Zalo
app.get('/zalo_verifierVTMv8wp_53be_y0EhDLoKY_hfL33dNS7CJ4u.html', (req, res) => {
    res.sendFile(path.join(publicPath, 'VTMv8wp_53be_y0EhDLoKY_hfL33dNS7CJ4u.html'), (err) => {
        if (err) {
            res.status(404).send('File not found');
        }
    });
});
app.listen(port, () => {
    console.log(`Webhook is listening on port ${port}`);
});