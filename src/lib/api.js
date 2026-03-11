import axios from 'axios';

const api = axios.create({ baseURL: '/api' });

// MOCK DATA
const mockAdvisories = [
    { _id: 'adv-001', title: 'Critical Security Update for Network Infrastructure', severity: 'Critical', category: 'Security', source: 'Internal', date_issued: new Date().toISOString(), status: 'Active', description: 'This update addresses several vulnerabilities in the core network components.' },
    { _id: 'adv-002', title: 'Routine Maintenance - Global Data Center', severity: 'Low', category: 'Maintenance', source: 'Cisco', date_issued: new Date(Date.now() - 86400000).toISOString(), status: 'Resolved', description: 'Scheduled maintenance for the global data center to improve performance.' },
    { _id: 'adv-003', title: 'Unauthorized Access Attempt Detected', severity: 'High', category: 'Security', source: 'SOC Monitor', date_issued: new Date(Date.now() - 3600000).toISOString(), status: 'Active', description: 'Multiple failed login attempts detected from an unknown IP address.' },
    { _id: 'adv-004', title: 'New PLC Firmware Available', severity: 'Medium', category: 'Product', source: 'Siemens', date_issued: new Date(Date.now() - 172800000).toISOString(), status: 'Active', description: 'Firmware update for S7-1200 PLCs addressing communication stability.' },
];

const mockCves = [
    { cveId: 'CVE-2024-1234', title: 'Remote Code Execution in Web App', score: 9.8, severity: 'Critical', vendors: ['Apache'], products: ['HTTP Server'], publishedDate: new Date().toISOString(), description: 'A critical vulnerability allows remote attackers to execute arbitrary code.' },
    { cveId: 'CVE-2024-5678', title: 'Privilege Escalation in OS Kernel', score: 7.5, severity: 'High', vendors: ['Linux', 'Ubuntu'], products: ['Kernel'], publishedDate: new Date(Date.now() - 2592000000).toISOString(), description: 'A local attacker can exploit this flaw to gain root privileges.' },
];

// INTERCEPTOR FOR MOCKING
api.interceptors.request.use(async (config) => {
    // Logic to return mock data for specific routes
    if (config.url === '/advisories') {
        return Promise.reject({ mockData: { items: mockAdvisories, total: mockAdvisories.length } });
    }

    // Match /advisories/ID
    const advisoryMatch = config.url.match(/^\/advisories\/([^/]+)$/);
    if (advisoryMatch) {
        const id = advisoryMatch[1];
        const ad = mockAdvisories.find(a => a._id === id) || mockAdvisories[0];
        return Promise.reject({ mockData: ad });
    }

    if (config.url === '/cves') {
        return Promise.reject({ mockData: { vulnerabilities: mockCves, pagination: { total: mockCves.length } } });
    }
    return config;
}, (error) => Promise.reject(error));

api.interceptors.response.use(
    (response) => response,
    (error) => {
        // If it's our mock data, return it as a successful response
        if (error.mockData) {
            return Promise.resolve({ data: error.mockData, status: 200 });
        }
        // Fallback for other errors
        return Promise.reject(error);
    }
);

export default api;



