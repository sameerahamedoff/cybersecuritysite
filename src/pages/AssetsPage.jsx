import React, { useState } from 'react';

export default function AssetsPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const assets = [
    { id: 'AST-001', type: 'Server', category: 'IT', owner: 'IT Department', criticality: 'High', status: 'Active' },
    { id: 'AST-002', type: 'PLC', category: 'OT', owner: 'Operations', criticality: 'Critical', status: 'Active' },
    { id: 'AST-003', type: 'IoT Sensor', category: 'IoT', owner: 'Facilities', criticality: 'Medium', status: 'Active' },
    { id: 'AST-004', type: 'Workstation', category: 'IT', owner: 'IT Department', criticality: 'Low', status: 'Active' },
    { id: 'AST-005', type: 'HMI', category: 'OT', owner: 'Operations', criticality: 'High', status: 'Maintenance' },
    { id: 'AST-006', type: 'Cloud Instance', category: 'Cloud', owner: 'IT Department', criticality: 'High', status: 'Active' },
    { id: 'AST-007', type: 'Router', category: 'Network', owner: 'Network Team', criticality: 'Critical', status: 'Active' },
    { id: 'AST-008', type: 'Smart Camera', category: 'IoT', owner: 'Security', criticality: 'Medium', status: 'Active' }
  ];

  const filteredAssets = selectedCategory === 'all' 
    ? assets 
    : assets.filter(asset => asset.category.toLowerCase() === selectedCategory.toLowerCase());

  const getCriticalityColor = (criticality) => {
    const colors = {
      'Critical': 'bg-red-100 text-red-800',
      'High': 'bg-orange-100 text-orange-800',
      'Medium': 'bg-yellow-100 text-yellow-800',
      'Low': 'bg-blue-100 text-blue-800'
    };
    return colors[criticality] || colors['Low'];
  };

  const getStatusColor = (status) => {
    const colors = {
      'Active': 'bg-green-100 text-green-800',
      'Maintenance': 'bg-yellow-100 text-yellow-800',
      'Inactive': 'bg-gray-100 text-gray-800'
    };
    return colors[status] || colors['Inactive'];
  };

  return (
    <div className="p-8">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Asset & Device Inventory</h1>
          <p className="text-gray-600">Comprehensive view of all assets across IT, OT, IoT, Cloud, and Network</p>
        </div>
        <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
          Discovery Scan
        </button>
      </div>

      {/* Asset Categories Filter */}
      <div className="mb-6 bg-white rounded-xl shadow-md p-1 inline-flex">
        {['all', 'it', 'ot', 'iot', 'cloud', 'network'].map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-6 py-2 rounded-lg font-medium transition-colors capitalize ${
              selectedCategory === cat
                ? 'bg-blue-600 text-white'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Asset Risk Heatmap */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Asset Risk Heatmap</h2>
        <div className="grid grid-cols-5 gap-2">
          {['Critical', 'High', 'Medium', 'Low', 'None'].map((level, idx) => (
            <div key={level} className="text-center">
              <div className={`h-16 rounded-lg mb-2 ${
                idx === 0 ? 'bg-red-600' :
                idx === 1 ? 'bg-orange-500' :
                idx === 2 ? 'bg-yellow-400' :
                idx === 3 ? 'bg-blue-400' : 'bg-gray-300'
              }`}></div>
              <p className="text-xs font-medium text-gray-700">{level}</p>
              <p className="text-xs text-gray-500">
                {assets.filter(a => a.criticality.toLowerCase() === level.toLowerCase()).length} assets
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Asset Table */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6">
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <h2 className="text-xl font-bold text-gray-800">Asset Inventory ({filteredAssets.length})</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Asset ID</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Type</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Category</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Owner</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Criticality</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredAssets.map((asset) => (
                <tr key={asset.id} className="hover:bg-gray-50 cursor-pointer">
                  <td className="px-6 py-4 whitespace-nowrap font-mono text-sm font-medium text-blue-600">
                    {asset.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{asset.type}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800">
                      {asset.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{asset.owner}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getCriticalityColor(asset.criticality)}`}>
                      {asset.criticality}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(asset.status)}`}>
                      {asset.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* License & Warranty Info */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">License & Warranty Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-gray-600 mb-1">Active Licenses</p>
            <p className="text-2xl font-bold text-blue-600">234</p>
          </div>
          <div className="p-4 bg-green-50 rounded-lg">
            <p className="text-sm text-gray-600 mb-1">Under Warranty</p>
            <p className="text-2xl font-bold text-green-600">189</p>
          </div>
          <div className="p-4 bg-yellow-50 rounded-lg">
            <p className="text-sm text-gray-600 mb-1">Expiring Soon</p>
            <p className="text-2xl font-bold text-yellow-600">12</p>
          </div>
        </div>
      </div>
    </div>
  );
}
