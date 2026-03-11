import React from 'react';
import { useParams, Link } from 'react-router-dom';

export default function OTDeviceDetailPage() {
  const { deviceId } = useParams();

  return (
    <div className="p-8">
      <div className="mb-8">
        <Link
          to="/ot"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to OT Security
        </Link>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">OT Device — {deviceId}</h1>
        <p className="text-gray-600">Detailed Profile</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Controller Type & Model */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Controller Type & Model</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-600 uppercase mb-1">Manufacturer</label>
                <p className="text-gray-800">Siemens</p>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-600 uppercase mb-1">Model</label>
                <p className="text-gray-800">SIMATIC S7-1500</p>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-600 uppercase mb-1">Controller Type</label>
                <p className="text-gray-800">Programmable Logic Controller (PLC)</p>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-600 uppercase mb-1">Serial Number</label>
                <p className="text-gray-800 font-mono">SN-2024-001234</p>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-600 uppercase mb-1">IP Address</label>
                <p className="text-gray-800 font-mono">10.0.1.50</p>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-600 uppercase mb-1">Location</label>
                <p className="text-gray-800">Production Line A - Station 3</p>
              </div>
            </div>
          </div>

          {/* Engineering Station */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Engineering Station</h2>
            <div className="space-y-3">
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="font-semibold text-gray-800 mb-1">Workstation: ENG-ST-01</p>
                <p className="text-sm text-gray-600">Last Connected: 2024-01-15 08:30</p>
                <p className="text-sm text-gray-600">Software: TIA Portal V17</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="font-semibold text-gray-800 mb-1">Workstation: ENG-ST-02</p>
                <p className="text-sm text-gray-600">Last Connected: 2024-01-14 16:45</p>
                <p className="text-sm text-gray-600">Software: TIA Portal V17</p>
              </div>
            </div>
          </div>

          {/* PLC Program Version */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">PLC Program Version</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-600 uppercase mb-1">Program Version</label>
                <p className="text-gray-800 font-mono">v2.4.1</p>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-600 uppercase mb-1">Last Updated</label>
                <p className="text-gray-800">2024-01-10 14:20</p>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-600 uppercase mb-1">Programmer</label>
                <p className="text-gray-800">John Engineer</p>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-600 uppercase mb-1">Checksum</label>
                <p className="text-gray-800 font-mono text-xs">A1B2C3D4E5F6</p>
              </div>
            </div>
          </div>

          {/* Field Sensors Communication */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Field Sensors Communication</h2>
            <div className="space-y-2">
              <div className="p-3 bg-green-50 rounded-lg flex justify-between items-center">
                <div>
                  <p className="font-medium text-gray-800">Temperature Sensor T-001</p>
                  <p className="text-sm text-gray-600">Protocol: Modbus RTU | Status: Active</p>
                </div>
                <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs font-semibold">Online</span>
              </div>
              <div className="p-3 bg-green-50 rounded-lg flex justify-between items-center">
                <div>
                  <p className="font-medium text-gray-800">Pressure Sensor P-002</p>
                  <p className="text-sm text-gray-600">Protocol: Modbus RTU | Status: Active</p>
                </div>
                <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs font-semibold">Online</span>
              </div>
              <div className="p-3 bg-yellow-50 rounded-lg flex justify-between items-center">
                <div>
                  <p className="font-medium text-gray-800">Flow Sensor F-003</p>
                  <p className="text-sm text-gray-600">Protocol: Modbus RTU | Status: Warning</p>
                </div>
                <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded text-xs font-semibold">Degraded</span>
              </div>
            </div>
          </div>

          {/* OT Vulnerabilities & Firmware Status */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">OT Vulnerabilities & Firmware Status</h2>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Firmware Version</span>
                  <span className="text-sm font-semibold text-gray-800">v3.2.1</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-yellow-600 h-2 rounded-full" style={{ width: '75%' }}></div>
                </div>
                <p className="text-xs text-gray-500 mt-1">Update available: v3.3.0</p>
              </div>
              <div className="p-4 bg-red-50 border-l-4 border-red-500 rounded">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="font-semibold text-gray-800">CVE-2024-OT-001</p>
                    <p className="text-sm text-gray-600">Siemens S7-1500 Authentication Bypass</p>
                  </div>
                  <span className="px-2 py-1 bg-red-100 text-red-800 rounded text-xs font-semibold">Critical</span>
                </div>
                <p className="text-xs text-gray-500">CVSS Score: 9.1 | Affects firmware &lt; v3.3.0</p>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Network Topology Map */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Network Topology</h2>
            <div className="h-64 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg bg-gray-50">
              <div className="text-center">
                <svg className="mx-auto h-12 w-12 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
                <p className="text-xs text-gray-500">Network topology visualization</p>
              </div>
            </div>
            <div className="mt-4 space-y-2">
              <div className="flex items-center text-sm text-gray-600">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                Connected Devices: 8
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                HMI Stations: 2
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <div className="w-3 h-3 bg-purple-500 rounded-full mr-2"></div>
                Sensors: 12
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
