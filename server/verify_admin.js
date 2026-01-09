const axios = require('axios');

const testAdmin = async () => {
    try {
        console.log('--- Testing Admin Login ---');
        const loginRes = await axios.post('http://localhost:5000/api/admin/login', {
            email: 'admin@tourist.com',
            password: 'adminpassword123'
        });

        const token = loginRes.data.token;
        console.log('Login Successful! Token received.');

        console.log('\n--- Testing Protected Stats Route ---');
        const statsRes = await axios.get('http://localhost:5000/api/admin/stats', {
            headers: { Authorization: `Bearer ${token}` }
        });
        console.log('Stats fetched successfully:', statsRes.data);

        console.log('\n--- Testing Visitor Tracking (Post) ---');
        await axios.post('http://localhost:5000/api/admin/track', {
            page_name: '/test-page',
            searched_city: 'Coimbatore'
        });
        console.log('Visitor tracked successfully.');

        console.log('\n--- Testing Feedback Submission ---');
        const fbRes = await axios.post('http://localhost:5000/api/feedback', {
            name: 'Tester',
            rating: 5,
            message: 'This is a test feedback.',
            page_name: 'Home'
        });
        console.log('Feedback submitted.');

        console.log('\n--- Testing Admin Feedback List ---');
        const fbListRes = await axios.get('http://localhost:5000/api/feedback', {
            headers: { Authorization: `Bearer ${token}` }
        });
        console.log('Feedback list count:', fbListRes.data.length);

        console.log('\nALL BACKEND TESTS PASSED!');
    } catch (error) {
        console.error('Test failed:', error.response?.data || error.message);
    }
};

testAdmin();
