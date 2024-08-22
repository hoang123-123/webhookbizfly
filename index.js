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
        const response = await axios.post('https://...', data, {
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
app.get('/VTMv8wp_53be_y0EhDLoKY_hfL33dNS7CJ4u.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'VTMv8wp_53be_y0EhDLoKY_hfL33dNS7CJ4u.html'));
});

app.listen(port, () => {
    console.log(`Webhook is listening on port ${port}`);
});