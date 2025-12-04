import React, { useState, useEffect, useMemo } from "react";
import api from "../lib/api";

export default function ThreatIntelPage() {
  const [selectedFeed, setSelectedFeed] = useState("all"); // "all" or "siemens"
  const [cveData, setCveData] = useState([]);
  const [advisoryData, setAdvisoryData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState(null);
  const [advisoryPagination, setAdvisoryPagination] = useState(null);
  
  // Pagination states
  const [cvePage, setCvePage] = useState(1);
  const [advisoryPage, setAdvisoryPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(25);
  
  // Search and filter states
  const [searchQuery, setSearchQuery] = useState("");
  const [severityFilter, setSeverityFilter] = useState("");
  const [sortBy, setSortBy] = useState("published"); // published, cvss, severity
  const [sortOrder, setSortOrder] = useState("desc"); // asc, desc
  
  // Modal state for summary popup
  const [selectedAdvisory, setSelectedAdvisory] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch CVE data from backend API with pagination
  const fetchCveData = async (page = 1, limit = 25) => {
    try {
      setError(null);
      const skip = (page - 1) * limit;
      
      const response = await api.get("/cves", {
        params: {
          limit: limit,
          skip: skip,
        },
      });

      const data = response.data;
      
      // Transform backend response to match frontend format
      const parsed = (data.vulnerabilities || []).map((vuln) => ({
        id: vuln.cveId,
        title: vuln.title || vuln.description || "No description",
        cvss: vuln.score !== null && vuln.score !== undefined ? vuln.score : "N/A",
        source: vuln.source || "NVD",
        published: vuln.publishedDate 
          ? new Date(vuln.publishedDate)
          : null,
        publishedStr: vuln.publishedDate 
          ? new Date(vuln.publishedDate).toLocaleString()
          : "Unknown",
        type: "cve",
      }));

      setCveData(parsed);
      setPagination({
        total: data.pagination?.total || 0,
        limit: limit,
        skip: skip,
        page: page,
        totalPages: Math.ceil((data.pagination?.total || 0) / limit),
        hasMore: data.pagination?.hasMore || false,
      });
    } catch (error) {
      console.error("Error fetching CVE data:", error);
      setError(error.response?.data?.message || error.message || "Failed to fetch CVEs");
    }
  };

  // Fetch Advisory data from backend API with pagination
  const fetchAdvisoryData = async (page = 1, limit = 25) => {
    try {
      setError(null);
      
      const params = {
        limit: limit,
        page: page,
      };
      
      if (severityFilter) {
        params.severity = severityFilter;
      }
      
      if (searchQuery) {
        params.q = searchQuery;
      }
      
      // Filter by Siemens source if selected
      if (selectedFeed === "siemens") {
        // We'll filter by source on the backend or client-side
        // For now, we'll filter client-side after fetching
      }
      
      const response = await api.get("/advisories", { params });

      const data = response.data;
      
      // Transform backend response to match frontend format
      const parsed = (data.items || []).map((advisory) => ({
        id: advisory._id || advisory.id,
        title: advisory.title || advisory.summary || "No title",
        description: advisory.description || advisory.summary || "No description",
        summary: advisory.summary || advisory.description || "No summary available",
        products: advisory.products || [],
        affected_versions: advisory.affected_versions || [],
        cve_ids: advisory.cve_ids || [],
        cvss: advisory.cvss?.score !== null && advisory.cvss?.score !== undefined 
          ? advisory.cvss.score 
          : "N/A",
        source: advisory.source || "Unknown",
        published: advisory.date_issued 
          ? new Date(advisory.date_issued)
          : null,
        publishedStr: advisory.date_issued 
          ? new Date(advisory.date_issued).toLocaleString()
          : "Unknown",
        updated_at: advisory.updated_at || advisory.date_issued || null,
        latestUpdateStr: advisory.updated_at 
          ? new Date(advisory.updated_at).toLocaleString()
          : advisory.date_issued 
          ? new Date(advisory.date_issued).toLocaleString()
          : "Unknown",
        severity: advisory.severity || "N/A",
        category: advisory.category || "N/A",
        reference_link: advisory.reference_link,
        type: "advisory",
      }));

      setAdvisoryData(parsed);
      setAdvisoryPagination({
        total: data.total || 0,
        limit: data.limit || limit,
        page: data.page || page,
        totalPages: Math.ceil((data.total || 0) / (data.limit || limit)),
        hasMore: (data.page || page) * (data.limit || limit) < (data.total || 0),
      });
    } catch (error) {
      console.error("Error fetching Advisory data:", error);
      setError(error.response?.data?.message || error.message || "Failed to fetch Advisories");
    }
  };

  // Fetch data based on selected feed
  const fetchData = async () => {
    setLoading(true);
    try {
      if (selectedFeed === "all") {
        await Promise.all([
          fetchCveData(cvePage, itemsPerPage),
          fetchAdvisoryData(advisoryPage, itemsPerPage)
        ]);
      } else if (selectedFeed === "siemens") {
        await fetchAdvisoryData(advisoryPage, itemsPerPage);
      }
    } finally {
      setLoading(false);
    }
  };

  // Reset to page 1 when feed changes
  useEffect(() => {
    setCvePage(1);
    setAdvisoryPage(1);
  }, [selectedFeed, itemsPerPage, severityFilter]);

  // Fetch data when dependencies change
  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedFeed, cvePage, advisoryPage, itemsPerPage, severityFilter]);
  
  // Debounced search for advisories
  useEffect(() => {
    if (selectedFeed === "siemens" || selectedFeed === "all") {
      const timeoutId = setTimeout(() => {
        fetchData();
      }, 500); // 500ms debounce
      
      return () => clearTimeout(timeoutId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery]);

  // Combine, filter, and sort data based on selected feed
  const filteredData = useMemo(() => {
    let data = [];
    
    if (selectedFeed === "all") {
      data = [...cveData, ...advisoryData];
    } else if (selectedFeed === "siemens") {
      // Filter advisories by Siemens source
      data = advisoryData.filter((advisory) => 
        advisory.source && advisory.source.toLowerCase().includes("siemens")
      );
    }
    
    // Apply search filter (client-side for CVEs in "all" view)
    // For Siemens feed, search is handled by backend, but we can also apply client-side for additional filtering
    if (searchQuery && selectedFeed === "all") {
      const query = searchQuery.toLowerCase();
      data = data.filter((item) => 
        item.title?.toLowerCase().includes(query) ||
        item.id?.toLowerCase().includes(query) ||
        (item.description && item.description.toLowerCase().includes(query))
      );
    }
    
    // Sort data
    data = [...data].sort((a, b) => {
      let aVal, bVal;
      
      if (sortBy === "published") {
        aVal = a.published?.getTime() || 0;
        bVal = b.published?.getTime() || 0;
      } else if (sortBy === "cvss") {
        aVal = typeof a.cvss === "number" ? a.cvss : (a.cvss === "N/A" ? -1 : parseFloat(a.cvss) || -1);
        bVal = typeof b.cvss === "number" ? b.cvss : (b.cvss === "N/A" ? -1 : parseFloat(b.cvss) || -1);
      } else if (sortBy === "severity") {
        const severityOrder = { critical: 4, high: 3, medium: 2, low: 1, "n/a": 0 };
        aVal = severityOrder[a.severity?.toLowerCase()] || 0;
        bVal = severityOrder[b.severity?.toLowerCase()] || 0;
      } else {
        return 0;
      }
      
      if (sortOrder === "asc") {
        return aVal - bVal;
      } else {
        return bVal - aVal;
      }
    });
    
    return data;
  }, [cveData, advisoryData, selectedFeed, searchQuery, sortBy, sortOrder]);

  // Calculate pagination for combined view
  const currentPage = selectedFeed === "siemens" ? advisoryPage : 1;
  const currentPagination = selectedFeed === "siemens" ? advisoryPagination : null;
  const totalPages = currentPagination?.totalPages || 1;
  const totalItems = currentPagination?.total || filteredData.length;

  const getCVSSColor = (cvss) => {
    if (cvss === "N/A" || cvss === null || cvss === undefined) return "bg-gray-200 text-gray-700";
    const score = typeof cvss === "number" ? cvss : parseFloat(cvss);
    if (isNaN(score)) return "bg-gray-200 text-gray-700";
    if (score >= 9.0) return "bg-red-100 text-red-800";
    if (score >= 7.0) return "bg-orange-100 text-orange-800";
    if (score >= 4.0) return "bg-yellow-100 text-yellow-800";
    return "bg-blue-100 text-blue-800";
  };

  const getSeverityColor = (severity) => {
    const sev = severity?.toLowerCase();
    if (sev === "critical") return "bg-red-100 text-red-800";
    if (sev === "high") return "bg-orange-100 text-orange-800";
    if (sev === "medium") return "bg-yellow-100 text-yellow-800";
    if (sev === "low") return "bg-blue-100 text-blue-800";
    return "bg-gray-200 text-gray-700";
  };

  // Pagination handlers
  const handlePageChange = (newPage) => {
    if (selectedFeed === "siemens") {
      setAdvisoryPage(newPage);
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleItemsPerPageChange = (newLimit) => {
    setItemsPerPage(parseInt(newLimit));
    setCvePage(1);
    setAdvisoryPage(1);
  };

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pages = [];
    const maxPages = 7;
    let startPage = Math.max(1, currentPage - Math.floor(maxPages / 2));
    let endPage = Math.min(totalPages, startPage + maxPages - 1);
    
    if (endPage - startPage < maxPages - 1) {
      startPage = Math.max(1, endPage - maxPages + 1);
    }
    
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Threat Intelligence & Advisory Feeds</h1>

      {/* Tabs */}
      <div className="mb-6 bg-white rounded-xl shadow-md p-1 inline-flex">
        {["all", "siemens"].map((feed) => (
          <button
            key={feed}
            onClick={() => setSelectedFeed(feed)}
            className={`px-6 py-2 rounded-lg font-medium transition-colors capitalize ${
              selectedFeed === feed
                ? "bg-blue-600 text-white"
                : "text-gray-600 hover:text-gray-800"
            }`}
          >
            {feed}
          </button>
        ))}
      </div>

      {/* Search and Filters */}
      <div className="mb-6 bg-white rounded-xl shadow-md p-4 flex flex-wrap gap-4 items-end">
        <div className="flex-1 min-w-[200px]">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Search
          </label>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by title, ID, or description..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        
        {selectedFeed === "siemens" && (
          <div className="min-w-[150px]">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Severity
            </label>
            <select
              value={severityFilter}
              onChange={(e) => setSeverityFilter(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Severities</option>
              <option value="Critical">Critical</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
        )}
        
        <div className="min-w-[150px]">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Sort By
          </label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="published">Published Date</option>
            <option value="cvss">CVSS Score</option>
            {(selectedFeed === "siemens" || selectedFeed === "all") && (
              <option value="severity">Severity</option>
            )}
          </select>
        </div>
        
        <div className="min-w-[120px]">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Order
          </label>
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="desc">Descending</option>
            <option value="asc">Ascending</option>
          </select>
        </div>
        
        <div className="min-w-[120px]">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Per Page
          </label>
          <select
            value={itemsPerPage}
            onChange={(e) => handleItemsPerPageChange(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">
              {selectedFeed === "siemens" 
                ? `Siemens Advisory Feed (${filteredData.length}${currentPagination ? ` of ${totalItems}` : ""})`
                : `Threat Intelligence Feed (${filteredData.length}${pagination && advisoryPagination ? ` of ${pagination.total + advisoryPagination.total}` : ""})`
              }
          </h2>
            {currentPagination && (
              <div className="text-sm text-gray-600">
                Showing {((currentPage - 1) * itemsPerPage) + 1} - {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems}
              </div>
            )}
          </div>
          {selectedFeed === "all" && !currentPagination && (
            <div className="mt-2 text-sm text-blue-600 bg-blue-50 px-3 py-2 rounded">
              💡 Showing combined view. Switch to Siemens feed for pagination controls.
            </div>
          )}
        </div>

        {error && (
          <div className="p-6 bg-red-50 border-l-4 border-red-400">
            <p className="text-red-700">
              <strong>Error:</strong> {error}
            </p>
            <button
              onClick={() => fetchData()}
              className="mt-2 text-sm text-red-600 hover:text-red-800 underline"
            >
              Retry
            </button>
          </div>
        )}

        {loading ? (
          <div className="p-6">
            <div className="animate-pulse space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="flex space-x-4">
                  <div className="h-12 bg-gray-200 rounded w-1/6"></div>
                  <div className="h-12 bg-gray-200 rounded w-2/6"></div>
                  <div className="h-12 bg-gray-200 rounded w-1/6"></div>
                  <div className="h-12 bg-gray-200 rounded w-1/6"></div>
                  <div className="h-12 bg-gray-200 rounded w-1/6"></div>
                </div>
              ))}
            </div>
            <p className="text-center text-gray-500 mt-4">Loading data...</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                    {selectedFeed === "siemens" ? "CVE IDs" : selectedFeed === "all" ? "CVE ID" : "CVE ID"}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                    {selectedFeed === "siemens" || selectedFeed === "all" ? "Product" : "Title"}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                    CVSS
                  </th>
                  {selectedFeed === "siemens" || selectedFeed === "all" ? (
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                      Severity
                    </th>
                  ) : null}
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                    Source
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                    Published
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                    Type
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredData.length === 0 ? (
                  <tr>
                    <td
                      colSpan={selectedFeed === "siemens" || selectedFeed === "all" ? 7 : 6}
                      className="px-6 py-8 text-center text-gray-500"
                    >
                      No data found for this feed
                    </td>
                  </tr>
                ) : (
                  filteredData.map((item) => (
                    <tr key={`${item.type}-${item.id}`} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        {item.type === "cve" ? (
                          <a
                            href={`https://nvd.nist.gov/vuln/detail/${item.id}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline font-mono text-sm"
                          >
                            {item.id}
                          </a>
                        ) : (
                          <div className="flex flex-col gap-1">
                            {item.cve_ids && item.cve_ids.length > 0 ? (
                              item.cve_ids.slice(0, 3).map((cveId, idx) => (
                                <a
                                  key={idx}
                                  href={`https://nvd.nist.gov/vuln/detail/${cveId}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline font-mono text-sm"
                        >
                                  {cveId}
                                </a>
                              ))
                            ) : (
                              <span className="text-gray-400 text-sm italic">No CVE IDs</span>
                            )}
                            {item.cve_ids && item.cve_ids.length > 3 && (
                              <span className="text-xs text-gray-500">
                                +{item.cve_ids.length - 3} more
                              </span>
                            )}
                          </div>
                        )}
                      </td>

                      <td className="px-6 py-4 text-sm relative">
                        <div className="max-w-md">
                          {item.type === "cve" ? (
                            <div className="font-medium">{item.title}</div>
                          ) : (
                            <div className="relative">
                              {/* Info icon button in top right */}
                              <button
                                onClick={() => {
                                  setSelectedAdvisory(item);
                                  setIsModalOpen(true);
                                }}
                                className="absolute top-0 right-0 text-gray-400 hover:text-blue-600 transition-colors p-1"
                                title="View summary"
                              >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                </svg>
                              </button>
                              
                              <div className="pr-6">
                                {item.products && item.products.length > 0 ? (
                                  <div className="space-y-1">
                                    {item.products.slice(0, 3).map((product, idx) => (
                                      <div key={idx} className="font-medium text-gray-900">
                                        {product}
                                      </div>
                                    ))}
                                    {item.products.length > 3 && (
                                      <div className="text-xs text-gray-500">
                                        +{item.products.length - 3} more products
                                      </div>
                                    )}
                                  </div>
                                ) : (
                                  <span className="text-gray-400 italic">No products</span>
                                )}
                                {item.affected_versions && item.affected_versions.length > 0 && (
                                  <div className="mt-2 pt-2 border-t border-gray-200">
                                    <div className="text-xs font-semibold text-gray-600 mb-1">Affected Versions:</div>
                                    <div className="flex flex-wrap gap-1">
                                      {item.affected_versions.slice(0, 5).map((version, idx) => (
                                        <span key={idx} className="text-xs text-gray-700 bg-gray-100 px-2 py-0.5 rounded">
                                          {version}
                                        </span>
                                      ))}
                                      {item.affected_versions.length > 5 && (
                                        <span className="text-xs text-gray-500">
                                          +{item.affected_versions.length - 5} more
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <span
                          className={`px-2 py-1 text-xs font-semibold rounded-full ${getCVSSColor(
                            item.cvss
                          )}`}
                        >
                          {item.cvss}
                        </span>
                      </td>

                      {selectedFeed === "siemens" || selectedFeed === "all" ? (
                        <td className="px-6 py-4">
                          {item.type === "advisory" && item.severity ? (
                            <span
                              className={`px-2 py-1 text-xs font-semibold rounded-full ${getSeverityColor(
                                item.severity
                              )}`}
                            >
                              {item.severity}
                            </span>
                          ) : (
                            <span className="text-gray-400">-</span>
                          )}
                        </td>
                      ) : null}

                      <td className="px-6 py-4">
                        <span className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                          {item.source}
                        </span>
                      </td>

                      <td className="px-6 py-4 text-sm text-gray-500">
                        {item.publishedStr}
                      </td>

                      <td className="px-6 py-4">
                        <span
                          className={`px-2 py-1 text-xs font-semibold rounded-full ${
                            item.type === "cve"
                              ? "bg-purple-100 text-purple-800"
                              : "bg-green-100 text-green-800"
                          }`}
                        >
                          {item.type === "cve" ? "CVE" : "Advisory"}
                        </span>
                        {item.type === "advisory" && item.reference_link && (
                          <a
                            href={item.reference_link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="ml-2 text-blue-600 hover:underline text-xs"
                            title="View reference"
                          >
                            🔗
                          </a>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination Controls */}
        {!loading && filteredData.length > 0 && currentPagination && totalPages > 1 && (
          <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  currentPage === 1
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-300"
                }`}
              >
                Previous
              </button>
              
              <div className="flex items-center gap-1">
                {getPageNumbers().map((pageNum) => (
                  <button
                    key={pageNum}
                    onClick={() => handlePageChange(pageNum)}
                    className={`px-3 py-2 rounded-lg font-medium transition-colors ${
                      currentPage === pageNum
                        ? "bg-blue-600 text-white"
                        : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-300"
                    }`}
                  >
                    {pageNum}
                  </button>
                ))}
              </div>
              
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  currentPage === totalPages
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-300"
                }`}
              >
                Next
              </button>
            </div>
            
            <div className="text-sm text-gray-600">
              Page {currentPage} of {totalPages}
            </div>
          </div>
        )}
      </div>

      {/* Summary Modal */}
      {isModalOpen && selectedAdvisory && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden flex flex-col">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between bg-gray-50">
              <h3 className="text-xl font-bold text-gray-900">Advisory Summary</h3>
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  setSelectedAdvisory(null);
                }}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Body */}
            <div className="px-6 py-4 overflow-y-auto flex-1">
              <div className="space-y-4">
                {/* Title */}
                {selectedAdvisory.title && (
                  <div>
                    <h4 className="text-sm font-semibold text-gray-600 uppercase mb-1">Title</h4>
                    <p className="text-gray-900">{selectedAdvisory.title}</p>
                  </div>
                )}

                {/* Summary */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-600 uppercase mb-1">Summary</h4>
                  <p className="text-gray-700 whitespace-pre-wrap">{selectedAdvisory.summary}</p>
                </div>

                {/* Additional Info */}
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200">
                  {selectedAdvisory.source && (
                    <div>
                      <h4 className="text-sm font-semibold text-gray-600 uppercase mb-1">Source</h4>
                      <p className="text-gray-700">{selectedAdvisory.source}</p>
                    </div>
                  )}
                  {selectedAdvisory.severity && (
                    <div>
                      <h4 className="text-sm font-semibold text-gray-600 uppercase mb-1">Severity</h4>
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getSeverityColor(selectedAdvisory.severity)}`}>
                        {selectedAdvisory.severity}
                      </span>
                    </div>
                  )}
                  {selectedAdvisory.category && (
                    <div>
                      <h4 className="text-sm font-semibold text-gray-600 uppercase mb-1">Category</h4>
                      <p className="text-gray-700">{selectedAdvisory.category}</p>
                    </div>
                  )}
                  {selectedAdvisory.publishedStr && (
                    <div>
                      <h4 className="text-sm font-semibold text-gray-600 uppercase mb-1">Published</h4>
                      <p className="text-gray-700">{selectedAdvisory.publishedStr}</p>
                    </div>
                  )}
                  {selectedAdvisory.latestUpdateStr && (
                    <div>
                      <h4 className="text-sm font-semibold text-gray-600 uppercase mb-1">Latest Update</h4>
                      <p className="text-gray-700">{selectedAdvisory.latestUpdateStr}</p>
                    </div>
                  )}
                </div>

                {/* Products */}
                {selectedAdvisory.products && selectedAdvisory.products.length > 0 && (
                  <div className="pt-4 border-t border-gray-200">
                    <h4 className="text-sm font-semibold text-gray-600 uppercase mb-2">Products</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedAdvisory.products.map((product, idx) => (
                        <span key={idx} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                          {product}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Affected Versions */}
                {selectedAdvisory.affected_versions && selectedAdvisory.affected_versions.length > 0 && (
                  <div className="pt-4 border-t border-gray-200">
                    <h4 className="text-sm font-semibold text-gray-600 uppercase mb-2">Affected Versions</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedAdvisory.affected_versions.map((version, idx) => (
                        <span key={idx} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                          {version}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* CVE IDs */}
                {selectedAdvisory.cve_ids && selectedAdvisory.cve_ids.length > 0 && (
                  <div className="pt-4 border-t border-gray-200">
                    <h4 className="text-sm font-semibold text-gray-600 uppercase mb-2">CVE IDs</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedAdvisory.cve_ids.map((cveId, idx) => (
                        <a
                          key={idx}
                          href={`https://nvd.nist.gov/vuln/detail/${cveId}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm hover:bg-purple-200 transition-colors"
                        >
                          {cveId}
                        </a>
                      ))}
                    </div>
                  </div>
                )}

                {/* Reference Link */}
                {selectedAdvisory.reference_link && (
                  <div className="pt-4 border-t border-gray-200">
                    <h4 className="text-sm font-semibold text-gray-600 uppercase mb-2">Reference</h4>
                    <a
                      href={selectedAdvisory.reference_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 underline break-all"
                    >
                      {selectedAdvisory.reference_link}
                    </a>
                  </div>
                )}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex justify-end">
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  setSelectedAdvisory(null);
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

