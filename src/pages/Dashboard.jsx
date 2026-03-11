import React, { useEffect, useState, useMemo } from 'react';
import api from '../lib/api';
import { Link } from 'react-router-dom';
import PieChart from '../components/charts/PieChart';
import BarChart from '../components/charts/BarChart';
import LineChart from '../components/charts/LineChart';

export default function Dashboard(){
  const [advisories, setAdvisories] = useState([]);
  const [cves, setCves] = useState([]);
  const [q, setQ] = useState('');
  const [cveKeyword, setCveKeyword] = useState('');
  const [loading, setLoading] = useState(true);
  const [cveLoading, setCveLoading] = useState(false);
  const [error, setError] = useState(null);
  const [cveError, setCveError] = useState(null);
  const [activeTab, setActiveTab] = useState('advisories'); // 'advisories' or 'cves'

  useEffect(()=>{ fetchList(); }, []);

  async function fetchList(){
    try {
      setLoading(true);
      setError(null);
      const res = await api.get('/advisories', { params: { limit: 50 } });
      setAdvisories(res.data.items);
    } catch(err) {
      setError('Failed to load advisories. Make sure the backend server is running.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function fetchCVEs(keyword = null){
    try {
      setCveLoading(true);
      setCveError(null);
      const searchKeyword = keyword || cveKeyword;
      if (!searchKeyword) {
        setCveError('Please enter a keyword (vendor, product, or CVE ID)');
        return;
      }
      const res = await api.get('/cves', { params: { keyword: searchKeyword } });
      setCves(res.data.vulnerabilities || []);
      if (res.data.vulnerabilities && res.data.vulnerabilities.length === 0) {
        setCveError('No CVEs found for this keyword. Try a different search term.');
      }
    } catch(err) {
      setCveError(err.response?.data?.message || 'Failed to fetch CVEs. Make sure the backend server is running.');
      console.error(err);
      setCves([]);
    } finally {
      setCveLoading(false);
    }
  }

  const filtered = advisories.filter(a => 
    a.title.toLowerCase().includes(q.toLowerCase()) || 
    (a.description||'').toLowerCase().includes(q.toLowerCase()) ||
    (a.source||'').toLowerCase().includes(q.toLowerCase()) ||
    (a.category||'').toLowerCase().includes(q.toLowerCase())
  );

  const getSeverityBadge = (severity) => {
    const severityLower = (severity || '').toLowerCase();
    const classes = {
      critical: 'badge-severity-critical',
      high: 'badge-severity-high',
      medium: 'badge-severity-medium',
      low: 'badge-severity-low',
      unknown: 'badge-severity-low'
    };
    return <span className={classes[severityLower] || 'badge-severity-low'}>{severity || 'Low'}</span>;
  };

  const getCategoryBadge = (category) => {
    const categoryLower = (category || '').toLowerCase().replace(/\s+/g, '-');
    const classes = {
      'security': 'badge-category-security',
      'maintenance': 'badge-category-maintenance',
      'software-update': 'badge-category-software-update',
      'operational': 'badge-category-operational',
      'product': 'badge-category-product'
    };
    return <span className={classes[categoryLower] || 'badge-category-product'}>{category || 'Product'}</span>;
  };

  const getStatusBadge = (status) => {
    const statusLower = (status || '').toLowerCase();
    const classes = {
      active: 'badge-status-active',
      resolved: 'badge-status-resolved'
    };
    return <span className={classes[statusLower] || 'badge-status-active'}>{status || 'Active'}</span>;
  };

  const stats = {
    total: advisories.length,
    critical: advisories.filter(a=>(a.severity||'').toLowerCase()==='critical').length,
    high: advisories.filter(a=>(a.severity||'').toLowerCase()==='high').length,
    medium: advisories.filter(a=>(a.severity||'').toLowerCase()==='medium').length,
    low: advisories.filter(a=>(a.severity||'').toLowerCase()==='low').length,
    active: advisories.filter(a=>(a.status||'').toLowerCase()==='active').length,
    resolved: advisories.filter(a=>(a.status||'').toLowerCase()==='resolved').length,
  };

  // Chart data preparation
  const severityChartData = useMemo(() => {
    const data = [
      { label: 'Critical', value: stats.critical, color: '#dc2626' },
      { label: 'High', value: stats.high, color: '#ea580c' },
      { label: 'Medium', value: stats.medium, color: '#ca8a04' },
      { label: 'Low', value: stats.low, color: '#2563eb' }
    ].filter(item => item.value > 0);
    return data;
  }, [stats.critical, stats.high, stats.medium, stats.low]);

  const statusChartData = useMemo(() => {
    const data = [
      { label: 'Active', value: stats.active, color: '#ea580c' },
      { label: 'Resolved', value: stats.resolved, color: '#16a34a' }
    ].filter(item => item.value > 0);
    return data;
  }, [stats.active, stats.resolved]);

  const categoryChartData = useMemo(() => {
    const categories = {};
    advisories.forEach(a => {
      const cat = a.category || 'Other';
      categories[cat] = (categories[cat] || 0) + 1;
    });
    const colors = ['#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#ef4444'];
    return Object.entries(categories).map(([label, value], index) => ({
      label: label.length > 10 ? label.substring(0, 10) + '...' : label,
      value,
      color: colors[index % colors.length]
    })).sort((a, b) => b.value - a.value);
  }, [advisories]);

  const timeSeriesData = useMemo(() => {
    const last30Days = [];
    const today = new Date();
    for (let i = 29; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      const count = advisories.filter(a => {
        if (!a.date_issued) return false;
        const issuedDate = new Date(a.date_issued).toISOString().split('T')[0];
        return issuedDate === dateStr;
      }).length;
      last30Days.push({
        label: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        value: count
      });
    }
    return last30Days;
  }, [advisories]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
          <p className="text-gray-600">Loading advisories...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6 text-center">
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">Connection Error</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button 
            onClick={fetchList}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-12">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">Advisory Dashboard</h1>
              <p className="text-blue-100">Monitor and manage security advisories</p>
            </div>
            <div className="relative w-full md:w-auto">
              <input 
                value={q} 
                onChange={e=>setQ(e.target.value)} 
                className="w-full md:w-80 pl-10 pr-4 py-3 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-white shadow-md" 
                placeholder="Search advisories..." 
              />
              <svg className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 -mt-6">
        {/* Tabs */}
        <div className="mb-6 bg-white rounded-xl shadow-md p-1 inline-flex">
          <button
            onClick={() => setActiveTab('advisories')}
            className={`px-6 py-2 rounded-lg font-medium transition-colors ${
              activeTab === 'advisories'
                ? 'bg-blue-600 text-white'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            Advisories
          </button>
          <button
            onClick={() => setActiveTab('cves')}
            className={`px-6 py-2 rounded-lg font-medium transition-colors ${
              activeTab === 'cves'
                ? 'bg-blue-600 text-white'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            CVEs (NVD)
          </button>
        </div>

        {/* Stats Cards */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Total Advisories</p>
                <p className="text-3xl font-bold text-gray-800 mt-1">{stats.total}</p>
              </div>
              <div className="bg-blue-100 rounded-full p-3">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-red-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Critical</p>
                <p className="text-3xl font-bold text-gray-800 mt-1">{stats.critical}</p>
              </div>
              <div className="bg-red-100 rounded-full p-3">
                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-orange-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Active</p>
                <p className="text-3xl font-bold text-gray-800 mt-1">{stats.active}</p>
              </div>
              <div className="bg-orange-100 rounded-full p-3">
                <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Resolved</p>
                <p className="text-3xl font-bold text-gray-800 mt-1">{stats.resolved}</p>
              </div>
              <div className="bg-green-100 rounded-full p-3">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>
        </section>

        {/* Charts Section - Always visible when advisories tab is active */}
        {activeTab === 'advisories' && (
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Severity Distribution Pie Chart */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Severity Distribution</h2>
              <div className="flex items-center justify-center min-h-[250px]">
                {severityChartData && severityChartData.length > 0 ? (
                  <PieChart data={severityChartData} size={250} innerRadius={70} />
                ) : (
                  <div className="text-center">
                    <div className="w-64 h-64 mx-auto border-4 border-dashed border-gray-300 rounded-full flex items-center justify-center">
                      <p className="text-gray-500">No data</p>
                    </div>
                  </div>
                )}
              </div>
              {severityChartData && severityChartData.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-3 justify-center">
                  {severityChartData.map((item) => (
                    <div key={item.label} className="flex items-center">
                      <div className="w-4 h-4 rounded-full mr-2" style={{ backgroundColor: item.color }}></div>
                      <span className="text-sm text-gray-600">{item.label}: {item.value}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Status Distribution */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Status Distribution</h2>
              <div className="flex items-center justify-center min-h-[250px]">
                {statusChartData && statusChartData.length > 0 ? (
                  <PieChart data={statusChartData} size={250} innerRadius={70} />
                ) : (
                  <div className="text-center">
                    <div className="w-64 h-64 mx-auto border-4 border-dashed border-gray-300 rounded-full flex items-center justify-center">
                      <p className="text-gray-500">No data</p>
                    </div>
                  </div>
                )}
              </div>
              {statusChartData && statusChartData.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-3 justify-center">
                  {statusChartData.map((item) => (
                    <div key={item.label} className="flex items-center">
                      <div className="w-4 h-4 rounded-full mr-2" style={{ backgroundColor: item.color }}></div>
                      <span className="text-sm text-gray-600">{item.label}: {item.value}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Category Distribution Bar Chart */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Advisories by Category</h2>
              <div className="min-h-[250px]">
                {categoryChartData && categoryChartData.length > 0 ? (
                  <BarChart data={categoryChartData} height={250} />
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-gray-500">
                    <svg className="w-16 h-16 mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                    <p>No category data available</p>
                  </div>
                )}
              </div>
            </div>

            {/* Advisories Over Time Line Chart */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Advisories Over Time (Last 30 Days)</h2>
              <div className="min-h-[250px]">
                {timeSeriesData && timeSeriesData.length > 0 ? (
                  <LineChart data={timeSeriesData} height={250} color="#3b82f6" />
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-gray-500">
                    <svg className="w-16 h-16 mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                    <p>No time series data available</p>
                  </div>
                )}
              </div>
            </div>
          </section>
        )}

        {/* CVE Search Section */}
        {activeTab === 'cves' && (
          <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6">
            <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Search NVD CVEs</h2>
              <div className="flex gap-3">
                <input
                  type="text"
                  value={cveKeyword}
                  onChange={(e) => setCveKeyword(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && fetchCVEs()}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter vendor (e.g., Cisco, Siemens), product (e.g., Windows, Apache), or CVE ID"
                />
                <button
                  onClick={() => fetchCVEs()}
                  disabled={cveLoading}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {cveLoading ? 'Searching...' : 'Search'}
                </button>
              </div>
              <p className="text-sm text-gray-500 mt-2">
                💡 Examples: "Cisco", "Siemens", "Windows", "Apache Server", or "CVE-2024-12345"
              </p>
            </div>
          </div>
        )}

        {/* CVE Results Table */}
        {activeTab === 'cves' && (
          <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6">
            <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
              <h2 className="text-lg font-semibold text-gray-800">CVE Results ({cves.length})</h2>
            </div>
            
            {cveLoading ? (
              <div className="p-12 text-center">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
                <p className="text-gray-600">Fetching CVEs from NVD...</p>
              </div>
            ) : cveError ? (
              <div className="p-12 text-center">
                <div className="text-red-500 text-5xl mb-4">⚠️</div>
                <p className="text-gray-600 mb-4">{cveError}</p>
                <button
                  onClick={() => fetchCVEs()}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Retry
                </button>
              </div>
            ) : cves.length === 0 ? (
              <div className="p-12 text-center">
                <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <p className="text-gray-500 text-lg">No CVEs found</p>
                <p className="text-gray-400 text-sm mt-2">Enter a keyword above to search the NVD database</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">CVE ID</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Title</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Severity</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Score</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Vendor/Product</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Published</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {cves.map((cve, idx) => (
                      <tr key={cve.cveId || idx} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <a
                            href={`https://nvd.nist.gov/vuln/detail/${cve.cveId}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800 font-mono text-sm font-medium hover:underline"
                          >
                            {cve.cveId}
                          </a>
                        </td>
                        <td className="px-6 py-4">
                          <div className="font-medium text-gray-900">{cve.title}</div>
                          {cve.description && (
                            <p className="text-sm text-gray-500 mt-1 line-clamp-2">{cve.description.substring(0, 150)}...</p>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {getSeverityBadge(cve.severity)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="font-semibold text-gray-800">{cve.score.toFixed(1)}</span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm">
                            {cve.vendors.length > 0 && (
                              <div className="text-gray-600">
                                <span className="font-medium">Vendors:</span> {cve.vendors.slice(0, 2).join(', ')}
                                {cve.vendors.length > 2 && ` +${cve.vendors.length - 2}`}
                              </div>
                            )}
                            {cve.products.length > 0 && (
                              <div className="text-gray-500 mt-1">
                                <span className="font-medium">Products:</span> {cve.products.slice(0, 2).join(', ')}
                                {cve.products.length > 2 && ` +${cve.products.length - 2}`}
                              </div>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-500 text-sm">
                          {cve.publishedDate ? new Date(cve.publishedDate).toLocaleDateString('en-US', { 
                            year: 'numeric', 
                            month: 'short', 
                            day: 'numeric' 
                          }) : '-'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Advisories Table */}
        {activeTab === 'advisories' && (
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
            <h2 className="text-lg font-semibold text-gray-800">Advisories ({filtered.length})</h2>
          </div>
          
          {filtered.length === 0 ? (
            <div className="p-12 text-center">
              <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <p className="text-gray-500 text-lg">No advisories found</p>
              {q && <p className="text-gray-400 text-sm mt-2">Try adjusting your search query</p>}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">ID</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Title</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Category</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Severity</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Source</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Date Issued</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filtered.map(a=> (
                    <tr key={a._id} className="hover:bg-gray-50 transition-colors cursor-pointer">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Link to={`/advisory/${a._id}`} className="text-blue-600 hover:text-blue-800 font-mono text-sm">
                          {a._id.substring(0, 8)}...
                        </Link>
                      </td>
                      <td className="px-6 py-4">
                        <Link to={`/advisory/${a._id}`} className="text-blue-600 hover:text-blue-800 font-medium hover:underline">
                          {a.title}
                        </Link>
                        {a.description && (
                          <p className="text-sm text-gray-500 mt-1 line-clamp-2">{a.description.substring(0, 100)}...</p>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getCategoryBadge(a.category)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getSeverityBadge(a.severity)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                        {a.source || '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-500 text-sm">
                        {a.date_issued ? new Date(a.date_issued).toLocaleDateString('en-US', { 
                          year: 'numeric', 
                          month: 'short', 
                          day: 'numeric' 
                        }) : '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getStatusBadge(a.status)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
        )}
      </div>
    </div>
  )
}
