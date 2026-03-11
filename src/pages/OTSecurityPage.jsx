import React from 'react';
import { Link } from 'react-router-dom';

export default function OTSecurityPage() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Operational Technology Safety & Monitoring</h1>
        <p className="text-gray-600">Real-time visibility for factory floors, process units & plant automation.</p>
      </div>

      {/* Network Map Placeholder */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Network Map of OT Devices</h2>
        <div className="h-96 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg bg-gray-50">
          <div className="text-center">
            <svg className="mx-auto h-16 w-16 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
            </svg>
            <p className="text-gray-500">Network topology visualization will be displayed here</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* ICS/SCADA Device Status */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">ICS/SCADA Device Status</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
              <div>
                <p className="font-semibold text-gray-800">HMI Stations</p>
                <p className="text-sm text-gray-600">12 devices</p>
              </div>
              <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-semibold">Operational</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg">
              <div>
                <p className="font-semibold text-gray-800">RTU Units</p>
                <p className="text-sm text-gray-600">8 devices</p>
              </div>
              <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-semibold">Warning</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
              <div>
                <p className="font-semibold text-gray-800">DCS Controllers</p>
                <p className="text-sm text-gray-600">24 devices</p>
              </div>
              <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-semibold">Operational</span>
            </div>
          </div>
        </div>

        {/* Critical PLC Units */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Critical PLC Units</h2>
          <div className="space-y-3">
            <div className="p-4 border-l-4 border-red-500 bg-red-50 rounded">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-semibold text-gray-800">PLC-001 (Production Line A)</p>
                  <p className="text-sm text-gray-600">Siemens S7-1500</p>
                </div>
                <span className="px-2 py-1 bg-red-100 text-red-800 rounded text-xs font-semibold">Critical</span>
              </div>
            </div>
            <div className="p-4 border-l-4 border-orange-500 bg-orange-50 rounded">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-semibold text-gray-800">PLC-002 (Boiler Control)</p>
                  <p className="text-sm text-gray-600">Allen-Bradley ControlLogix</p>
                </div>
                <span className="px-2 py-1 bg-orange-100 text-orange-800 rounded text-xs font-semibold">High</span>
              </div>
            </div>
            <div className="p-4 border-l-4 border-green-500 bg-green-50 rounded">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-semibold text-gray-800">PLC-003 (Packaging)</p>
                  <p className="text-sm text-gray-600">Schneider Electric Modicon</p>
                </div>
                <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs font-semibold">Normal</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Firmware & Patch Levels */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Firmware & Patch Levels</h2>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Up to Date</span>
                <span className="text-sm font-semibold text-gray-800">68%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-600 h-2 rounded-full" style={{ width: '68%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Needs Update</span>
                <span className="text-sm font-semibold text-gray-800">25%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-yellow-600 h-2 rounded-full" style={{ width: '25%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Critical Update Required</span>
                <span className="text-sm font-semibold text-gray-800">7%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-red-600 h-2 rounded-full" style={{ width: '7%' }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Unauthorized Remote Access Attempts */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Unauthorized Remote Access Attempts</h2>
          <div className="space-y-3">
            <div className="p-4 bg-red-50 border-l-4 border-red-500 rounded">
              <p className="font-semibold text-red-800 mb-1">12 attempts in last 24 hours</p>
              <p className="text-sm text-gray-600">Blocked IPs: 192.168.1.100, 10.0.0.45</p>
            </div>
            <div className="p-4 bg-yellow-50 border-l-4 border-yellow-500 rounded">
              <p className="font-semibold text-yellow-800 mb-1">3 suspicious protocol connections</p>
              <p className="text-sm text-gray-600">Modbus TCP from unknown sources</p>
            </div>
          </div>
        </div>
      </div>

      {/* Industrial Protocols Risk */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Industrial Protocols Risk</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-orange-50 rounded-lg border-l-4 border-orange-500">
            <h3 className="font-semibold text-gray-800 mb-2">Modbus</h3>
            <p className="text-2xl font-bold text-orange-600 mb-1">High Risk</p>
            <p className="text-sm text-gray-600">45 unencrypted connections</p>
          </div>
          <div className="p-4 bg-yellow-50 rounded-lg border-l-4 border-yellow-500">
            <h3 className="font-semibold text-gray-800 mb-2">DNP3</h3>
            <p className="text-2xl font-bold text-yellow-600 mb-1">Medium Risk</p>
            <p className="text-sm text-gray-600">12 devices without authentication</p>
          </div>
          <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
            <h3 className="font-semibold text-gray-800 mb-2">BACnet</h3>
            <p className="text-2xl font-bold text-green-600 mb-1">Low Risk</p>
            <p className="text-sm text-gray-600">All connections secured</p>
          </div>
        </div>
      </div>
    </div>
  );
}
