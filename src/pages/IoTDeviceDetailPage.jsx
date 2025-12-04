import React from 'react';
import { useParams, Link } from 'react-router-dom';

export default function IoTDeviceDetailPage() {
  const { deviceId } = useParams();

  return (
    <div className="p-8">
      <div className="mb-8">
        <Link
          to="/iot"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to IoT Security
        </Link>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">IoT Device — {deviceId}</h1>
        <p className="text-gray-600">Detailed Profile</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Device Type & Location */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Device Type & Location</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-600 uppercase mb-1">Device Type</label>
                <p className="text-gray-800">Environmental Sensor</p>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-600 uppercase mb-1">Manufacturer</label>
                <p className="text-gray-800">Sensortech Inc.</p>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-600 uppercase mb-1">Model</label>
                <p className="text-gray-800">ST-ENV-2024</p>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-600 uppercase mb-1">Serial Number</label>
                <p className="text-gray-800 font-mono">SN-IOT-001234</p>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-600 uppercase mb-1">Location</label>
                <p className="text-gray-800">Building A - Floor 3 - Room 301</p>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-600 uppercase mb-1">IP Address</label>
                <p className="text-gray-800 font-mono">192.168.10.45</p>
              </div>
            </div>
          </div>

          {/* Connectivity & Protocol */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Connectivity & Protocol</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-600 uppercase mb-1">Connection Type</label>
                <p className="text-gray-800">Wi-Fi (802.11n)</p>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-600 uppercase mb-1">Protocol</label>
                <p className="text-gray-800">MQTT over TLS</p>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-600 uppercase mb-1">Broker</label>
                <p className="text-gray-800 font-mono">mqtt.broker.local:8883</p>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-600 uppercase mb-1">Signal Strength</label>
                <p className="text-gray-800">-45 dBm (Excellent)</p>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-600 uppercase mb-1">Last Connected</label>
                <p className="text-gray-800">2024-01-15 14:30 UTC</p>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-600 uppercase mb-1">Uptime</label>
                <p className="text-gray-800">15 days 8 hours</p>
              </div>
            </div>
          </div>

          {/* Sensor Data */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Sensor Data (Live)</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Temperature</p>
                <p className="text-2xl font-bold text-blue-600">22.5°C</p>
                <p className="text-xs text-gray-500 mt-1">Last updated: 1 min ago</p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Humidity</p>
                <p className="text-2xl font-bold text-green-600">45%</p>
                <p className="text-xs text-gray-500 mt-1">Last updated: 1 min ago</p>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Air Quality</p>
                <p className="text-2xl font-bold text-purple-600">Good</p>
                <p className="text-xs text-gray-500 mt-1">AQI: 35</p>
              </div>
              <div className="p-4 bg-orange-50 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Battery Level</p>
                <p className="text-2xl font-bold text-orange-600">78%</p>
                <p className="text-xs text-gray-500 mt-1">Estimated: 12 days</p>
              </div>
            </div>
          </div>

          {/* Security Status */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Security Status</h2>
            <div className="space-y-3">
              <div className="p-4 bg-green-50 border-l-4 border-green-500 rounded">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-semibold text-gray-800">Firmware</p>
                    <p className="text-sm text-gray-600">v2.1.3 (Latest)</p>
                  </div>
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs font-semibold">Secure</span>
                </div>
              </div>
              <div className="p-4 bg-red-50 border-l-4 border-red-500 rounded">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-semibold text-gray-800">Default Password</p>
                    <p className="text-sm text-gray-600">Using factory default credentials</p>
                  </div>
                  <span className="px-2 py-1 bg-red-100 text-red-800 rounded text-xs font-semibold">Risk</span>
                </div>
              </div>
              <div className="p-4 bg-green-50 border-l-4 border-green-500 rounded">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-semibold text-gray-800">Certificates</p>
                    <p className="text-sm text-gray-600">Valid TLS certificate installed</p>
                  </div>
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs font-semibold">Valid</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Historical Trend Graph */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Historical Trend (7 Days)</h2>
            <div className="h-64 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg bg-gray-50">
              <div className="text-center">
                <svg className="mx-auto h-12 w-12 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                <p className="text-xs text-gray-500">Temperature & Humidity trends</p>
              </div>
            </div>
          </div>

          {/* Device Status */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Device Status</h2>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Status</span>
                <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs font-semibold">Online</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Health</span>
                <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs font-semibold">Good</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Last Maintenance</span>
                <span className="text-sm text-gray-800">2024-01-01</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Data Points (24h)</span>
                <span className="text-sm font-semibold text-gray-800">1,440</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
