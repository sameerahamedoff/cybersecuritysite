import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../lib/api';

export default function AdvisoryDetail(){
  const { id } = useParams();
  const [ad, setAd] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(()=>{ if (id) fetch(); }, [id]);
  
  async function fetch(){
    try{
      setLoading(true);
      setError(null);
      const res = await api.get('/advisories/' + id);
      setAd(res.data);
    }catch(e){ 
      setError('Failed to load advisory details.');
      console.error(e) 
    } finally {
      setLoading(false);
    }
  }

  const getSeverityBadge = (severity) => {
    const severityLower = (severity || '').toLowerCase();
    const classes = {
      critical: 'badge-severity-critical',
      high: 'badge-severity-high',
      medium: 'badge-severity-medium',
      low: 'badge-severity-low'
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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
          <p className="text-gray-600">Loading advisory details...</p>
        </div>
      </div>
    );
  }

  if (error || !ad) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6 text-center">
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">Error</h2>
          <p className="text-gray-600 mb-4">{error || 'Advisory not found'}</p>
          <Link 
            to="/"
            className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-12">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-lg">
        <div className="max-w-5xl mx-auto px-6 py-6">
          <Link to="/" className="inline-flex items-center text-blue-100 hover:text-white mb-4 transition-colors">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Dashboard
          </Link>
          <h1 className="text-3xl font-bold mb-4">{ad.title}</h1>
          <div className="flex flex-wrap items-center gap-3">
            {getCategoryBadge(ad.category)}
            {getSeverityBadge(ad.severity)}
            {getStatusBadge(ad.status)}
          </div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-6 -mt-6">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Key Information Grid */}
          <div className="p-6 border-b border-gray-200 bg-gray-50">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Advisory Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Advisory ID</label>
                <p className="mt-1 text-gray-800 font-mono text-sm">{ad._id}</p>
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Date Issued</label>
                <p className="mt-1 text-gray-800">
                  {ad.date_issued ? new Date(ad.date_issued).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  }) : 'Not specified'}
                </p>
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Source</label>
                <p className="mt-1 text-gray-800">{ad.source || 'Not specified'}</p>
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Status</label>
                <p className="mt-1">{getStatusBadge(ad.status)}</p>
              </div>
            </div>
          </div>

          {/* Description Section */}
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-800 mb-3 flex items-center">
              <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              Description
            </h2>
            <div className="text-gray-700 leading-relaxed whitespace-pre-wrap">
              {ad.description || 'No description provided.'}
            </div>
          </div>

          {/* Reference Link */}
          {ad.reference_link && (
            <div className="p-6 border-b border-gray-200 bg-gray-50">
              <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center">
                <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
                Reference Link
              </h3>
              <a 
                href={ad.reference_link} 
                target="_blank" 
                rel="noreferrer" 
                className="inline-flex items-center text-blue-600 hover:text-blue-800 hover:underline"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                {ad.reference_link}
              </a>
            </div>
          )}

          {/* Additional Details */}
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* CVSS Score */}
            {ad.cvss && ad.cvss.score && (
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-2">CVSS Score</h3>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-gray-800">{ad.cvss.score}</span>
                  <span className="text-sm text-gray-500">/ 10.0</span>
                </div>
                {ad.cvss.vector && (
                  <p className="text-xs text-gray-500 mt-2 font-mono break-all">{ad.cvss.vector}</p>
                )}
              </div>
            )}

            {/* Products */}
            {ad.products && ad.products.length > 0 && (
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-2">Affected Products</h3>
                <div className="flex flex-wrap gap-2">
                  {ad.products.map((product, idx) => (
                    <span key={idx} className="px-2 py-1 bg-indigo-100 text-indigo-800 rounded text-sm">
                      {product}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Affected Versions */}
            {ad.affected_versions && ad.affected_versions.length > 0 && (
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-2">Affected Versions</h3>
                <div className="flex flex-wrap gap-2">
                  {ad.affected_versions.map((version, idx) => (
                    <span key={idx} className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded text-sm font-mono">
                      {version}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* CVE IDs */}
          {ad.cve_ids && ad.cve_ids.length > 0 && (
            <div className="p-6 border-t border-gray-200">
              <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center">
                <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Related CVE(s)
              </h3>
              <div className="flex flex-wrap gap-2">
                {ad.cve_ids.map(cve => (
                  <a
                    key={cve}
                    href={`https://cve.mitre.org/cgi-bin/cvename.cgi?name=${cve}`}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-1 bg-red-100 text-red-800 rounded-lg text-sm font-semibold hover:bg-red-200 transition-colors"
                  >
                    {cve}
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Additional References */}
          {ad.references && ad.references.length > 0 && (
            <div className="p-6 border-t border-gray-200 bg-gray-50">
              <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center">
                <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
                Additional References
              </h3>
              <ul className="space-y-2">
                {ad.references.map((ref, idx) => (
                  <li key={idx}>
                    <a 
                      href={ref.url} 
                      target="_blank" 
                      rel="noreferrer" 
                      className="text-blue-600 hover:text-blue-800 hover:underline flex items-start"
                    >
                      <svg className="w-4 h-4 mr-2 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                      <span>{ref.label || ref.url}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
