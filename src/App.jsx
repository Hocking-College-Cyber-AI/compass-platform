import React, { useState, useEffect } from 'react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Calendar, Upload, FileText, Users, TrendingUp, AlertCircle, CheckCircle, Clock, Download, Settings, Menu, X, Plus, Edit2, Trash2, Eye, EyeOff } from 'lucide-react';

const PROGRAM_DATA = {
  name: "AAS Cybersecurity & Network Systems",
  director: "Norma DePriest",
  hlcVisit: "November 30, 2026",
  courses: [
    { code: "CYBR-1100", name: "Security Awareness", credits: 3, path: "shared", year: 1, semester: "fall" },
    { code: "NET-1111", name: "Introduction to Networking", credits: 4, path: "shared", year: 1, semester: "fall" },
    { code: "NET-1120", name: "Computer Hardware & Operating Systems", credits: 3, path: "shared", year: 1, semester: "fall" },
    { code: "CYBR-1200", name: "Security+ Certification", credits: 3, path: "shared", year: 1, semester: "spring" },
    { code: "CS-1140", name: "UNIX/Linux", credits: 3, path: "shared", year: 1, semester: "spring" },
    { code: "NET-1112", name: "Cyber Defense", credits: 4, path: "shared", year: 1, semester: "spring" },
    { code: "CYBR-2100", name: "Cyber Ethics & Cyber Law", credits: 3, path: "shared", year: 2, semester: "fall", bearing: true, plo: "PLO5" },
    { code: "CYBR-2101", name: "Python Essentials (SL)", credits: 3, path: "shared", year: 2, semester: "fall", bearing: true, plo: "PLO2" },
    { code: "NET-2220", name: "Server Management", credits: 3, path: "cyber", year: 2, semester: "fall" },
    { code: "CYBR-2102", name: "Cyber Operations", credits: 3, path: "cyber", year: 2, semester: "fall" },
    { code: "CYBR-2200", name: "Network Analysis", credits: 3, path: "cyber", year: 2, semester: "spring" },
    { code: "CYBR-2201", name: "Ethical Hacking", credits: 3, path: "cyber", year: 2, semester: "spring" },
    { code: "CYBR-2600", name: "Cyber Security & Network Practicum", credits: 2, path: "shared", year: 2, semester: "spring", bearing: true, plo: "PLO6" },
    { code: "NET-2650", name: "Network Systems Security (Capstone)", credits: 3, path: "shared", year: 2, semester: "spring", bearing: true, plo: "PLO1,PLO3,PLO4" }
  ],
  plos: [
    { id: "PLO1", name: "Systems Design & Operations", description: "Design, implement, and maintain secure computing environments" },
    { id: "PLO2", name: "Data Management & Analytics", description: "Capture, validate, and analyze datasets or network traffic" },
    { id: "PLO3", name: "Security & Risk Mitigation", description: "Apply defensive controls and risk management frameworks" },
    { id: "PLO4", name: "Technical Problem Solving", description: "Analyze complex technical requirements and develop solutions" },
    { id: "PLO5", name: "Ethical & Professional Practice", description: "Evaluate ethical, legal, and social implications of technologies" },
    { id: "PLO6", name: "Professional Communication", description: "Communicate technical concepts effectively to stakeholders" }
  ]
};

const ASSESSMENT_DATA = {
  "PLO1": { target: 80, achieved: 83, artifacts: 24, course: "NET-2650" },
  "PLO2": { target: 80, achieved: 67, artifacts: 32, course: "CYBR-2101" },
  "PLO3": { target: 80, achieved: 79, artifacts: 24, course: "NET-2650" },
  "PLO4": { target: 80, achieved: 83, artifacts: 24, course: "NET-2650" },
  "PLO5": { target: 80, achieved: 0, artifacts: 0, course: "CYBR-2100" },
  "PLO6": { target: 80, achieved: 0, artifacts: 0, course: "CYBR-2600" }
};

const CompasProduction = () => {
  const [currentUser, setCurrentUser] = useState({ role: 'director', name: 'Norma DePriest' });
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [assessmentPlans, setAssessmentPlans] = useState({});
  const [evidence, setEvidence] = useState({});
  const [showPlanForm, setShowPlanForm] = useState(false);
  const [newPlan, setNewPlan] = useState({ course: '', targetLevel: 80, method: '' });

  const colors = {
    primary: '#0f172a',
    secondary: '#1e293b',
    accent: '#00d9ff',
    success: '#10b981',
    warning: '#f59e0b',
    danger: '#ef4444',
    border: '#334155'
  };

  // Color gradient for futuristic design
  const bgGradient = 'linear-gradient(135deg, #0f172a 0%, #1a1f35 100%)';
  const accentGradient = 'linear-gradient(135deg, #00d9ff 0%, #0099cc 100%)';

  const getMetricsData = () => [
    { name: 'PLO1', achievement: ASSESSMENT_DATA.PLO1.achieved, target: 80 },
    { name: 'PLO2', achievement: ASSESSMENT_DATA.PLO2.achieved, target: 80 },
    { name: 'PLO3', achievement: ASSESSMENT_DATA.PLO3.achieved, target: 80 },
    { name: 'PLO4', achievement: ASSESSMENT_DATA.PLO4.achieved, target: 80 },
    { name: 'PLO5', achievement: ASSESSMENT_DATA.PLO5.achieved, target: 80 },
    { name: 'PLO6', achievement: ASSESSMENT_DATA.PLO6.achieved, target: 80 }
  ];

  const getTrendData = () => [
    { year: '2023-24', achievement: 75 },
    { year: '2024-25', achievement: 78 },
    { year: '2025-26', achievement: 77 }
  ];

  const getCourseBreakdown = () => [
    { name: 'Load-Bearing', value: 4, fill: colors.accent },
    { name: 'Shared Core', value: 6, fill: '#06b6d4' },
    { name: 'Specialization', value: 4, fill: '#8b5cf6' }
  ];

  const savePlan = () => {
    setAssessmentPlans({
      ...assessmentPlans,
      [newPlan.course]: newPlan
    });
    setShowPlanForm(false);
    setNewPlan({ course: '', targetLevel: 80, method: '' });
  };

  // ==================== DASHBOARD ====================
  const DashboardView = () => (
    <div style={{ background: bgGradient }} className="min-h-screen p-6 md:p-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 style={{ color: colors.accent }} className="text-4xl md:text-5xl font-bold mb-2">
            Compass Platform
          </h1>
          <p className="text-gray-300 text-lg">HLC Accreditation Assessment Management System</p>
          <p className="text-yellow-400 text-sm mt-2 flex items-center gap-2">
            <AlertCircle size={16} /> HLC Visit: {PROGRAM_DATA.hlcVisit} (82 days)
          </p>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div style={{ background: colors.secondary, borderLeft: `4px solid ${colors.accent}` }} className="p-6 rounded-lg border border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Programs PLOs Met</p>
                <p className="text-3xl font-bold text-white mt-2">4/6</p>
                <p className="text-green-400 text-xs mt-1">67%</p>
              </div>
              <TrendingUp size={32} style={{ color: colors.accent }} className="opacity-50" />
            </div>
          </div>

          <div style={{ background: colors.secondary, borderLeft: `4px solid ${colors.success}` }} className="p-6 rounded-lg border border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Evidence Collected</p>
                <p className="text-3xl font-bold text-white mt-2">80/100</p>
                <p className="text-blue-400 text-xs mt-1">80%</p>
              </div>
              <Upload size={32} style={{ color: colors.success }} className="opacity-50" />
            </div>
          </div>

          <div style={{ background: colors.secondary, borderLeft: `4px solid ${colors.warning}` }} className="p-6 rounded-lg border border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Faculty Engaged</p>
                <p className="text-3xl font-bold text-white mt-2">14/14</p>
                <p className="text-purple-400 text-xs mt-1">100%</p>
              </div>
              <Users size={32} style={{ color: colors.warning }} className="opacity-50" />
            </div>
          </div>

          <div style={{ background: colors.secondary, borderLeft: `4px solid #10b981` }} className="p-6 rounded-lg border border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Days to HLC</p>
                <p className="text-3xl font-bold text-white mt-2">82</p>
                <p className="text-orange-400 text-xs mt-1">Ready Mode</p>
              </div>
              <Clock size={32} style={{ color: '#10b981' }} className="opacity-50" />
            </div>
          </div>
        </div>

        {/* Main Metrics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          {/* PLO Achievement Chart */}
          <div style={{ background: colors.secondary }} className="p-8 rounded-xl border border-gray-700">
            <h2 style={{ color: colors.accent }} className="text-2xl font-bold mb-6">PLO Achievement 2025-26</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={getMetricsData()}>
                <CartesianGrid strokeDasharray="3 3" stroke={colors.border} />
                <XAxis dataKey="name" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip contentStyle={{ background: colors.primary, border: `1px solid ${colors.accent}` }} />
                <Bar dataKey="achievement" fill={colors.accent} name="Achievement %" />
                <Bar dataKey="target" fill={colors.border} name="Target %" />
              </BarChart>
            </ResponsiveContainer>
            <div className="mt-4 p-4 bg-blue-900 bg-opacity-20 rounded border border-blue-500 border-opacity-30">
              <p className="text-sm text-blue-300">
                <CheckCircle size={14} className="inline mr-2" />
                4 PLOs exceeding targets | 2 PLOs pending completion
              </p>
            </div>
          </div>

          {/* 3-Year Trend */}
          <div style={{ background: colors.secondary }} className="p-8 rounded-xl border border-gray-700">
            <h2 style={{ color: colors.accent }} className="text-2xl font-bold mb-6">Assessment Trend (3-Year)</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={getTrendData()}>
                <CartesianGrid strokeDasharray="3 3" stroke={colors.border} />
                <XAxis dataKey="year" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" domain={[0, 100]} />
                <Tooltip contentStyle={{ background: colors.primary, border: `1px solid ${colors.accent}` }} />
                <Line type="monotone" dataKey="achievement" stroke={colors.accent} strokeWidth={3} dot={{ fill: colors.accent }} name="Average PLO Achievement" />
              </LineChart>
            </ResponsiveContainer>
            <div className="mt-4 p-4 bg-green-900 bg-opacity-20 rounded border border-green-500 border-opacity-30">
              <p className="text-sm text-green-300">
                <TrendingUp size={14} className="inline mr-2" />
                Consistent improvement: 75% → 78% → 77% (mature cycle)
              </p>
            </div>
          </div>
        </div>

        {/* Course Overview */}
        <div style={{ background: colors.secondary }} className="p-8 rounded-xl border border-gray-700">
          <h2 style={{ color: colors.accent }} className="text-2xl font-bold mb-6">14 Courses - Assessment Status</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {PROGRAM_DATA.courses.map((course, idx) => (
              <div key={idx} className="p-4 bg-gray-900 bg-opacity-50 rounded border border-gray-700 hover:border-gray-600 transition cursor-pointer" onClick={() => setSelectedCourse(course)}>
                <div className="flex items-start justify-between">
                  <div>
                    <p style={{ color: colors.accent }} className="font-mono text-sm font-bold">{course.code}</p>
                    <p className="text-white text-sm mt-1">{course.name}</p>
                    {course.bearing && <p className="text-yellow-400 text-xs mt-1">🎯 Load-Bearing (PLO{course.plo})</p>}
                  </div>
                  {course.bearing ? (
                    <CheckCircle size={20} style={{ color: colors.accent }} />
                  ) : (
                    <Clock size={20} style={{ color: colors.warning }} />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  // ==================== ASSESSMENT PLANS ====================
  const AssessmentPlansView = () => (
    <div style={{ background: bgGradient }} className="min-h-screen p-6 md:p-12">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-12">
          <h1 style={{ color: colors.accent }} className="text-3xl font-bold">Assessment Plans</h1>
          <button
            onClick={() => setShowPlanForm(!showPlanForm)}
            style={{ background: accentGradient }}
            className="px-6 py-3 rounded-lg text-black font-bold flex items-center gap-2 hover:opacity-90 transition"
          >
            <Plus size={20} /> New Plan
          </button>
        </div>

        {showPlanForm && (
          <div style={{ background: colors.secondary }} className="p-8 rounded-xl border border-gray-700 mb-8">
            <h3 className="text-white text-xl font-bold mb-6">Create Assessment Plan</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-300 text-sm mb-2">Course</label>
                <select
                  value={newPlan.course}
                  onChange={(e) => setNewPlan({ ...newPlan, course: e.target.value })}
                  style={{ background: colors.primary, borderColor: colors.border }}
                  className="w-full px-4 py-2 rounded border text-white"
                >
                  <option value="">Select Course...</option>
                  {PROGRAM_DATA.courses.map((c) => (
                    <option key={c.code} value={c.code}>{c.code} - {c.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-gray-300 text-sm mb-2">Target Performance Level (%)</label>
                <input
                  type="number"
                  value={newPlan.targetLevel}
                  onChange={(e) => setNewPlan({ ...newPlan, targetLevel: parseInt(e.target.value) })}
                  style={{ background: colors.primary, borderColor: colors.border }}
                  className="w-full px-4 py-2 rounded border text-white"
                />
              </div>

              <div>
                <label className="block text-gray-300 text-sm mb-2">Assessment Method</label>
                <textarea
                  value={newPlan.method}
                  onChange={(e) => setNewPlan({ ...newPlan, method: e.target.value })}
                  placeholder="E.g., Rubric-scored capstone project, Lab reports, Written exam..."
                  style={{ background: colors.primary, borderColor: colors.border }}
                  className="w-full px-4 py-2 rounded border text-white"
                  rows={3}
                />
              </div>

              <div className="flex gap-4">
                <button
                  onClick={savePlan}
                  style={{ background: accentGradient }}
                  className="px-6 py-2 rounded text-black font-bold hover:opacity-90 transition"
                >
                  Save Plan
                </button>
                <button
                  onClick={() => setShowPlanForm(false)}
                  style={{ background: colors.secondary, borderColor: colors.border }}
                  className="px-6 py-2 rounded border text-gray-300 hover:text-white transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Plans Grid */}
        <div className="grid grid-cols-1 gap-6">
          {PROGRAM_DATA.courses.map((course) => (
            <div key={course.code} style={{ background: colors.secondary }} className="p-6 rounded-xl border border-gray-700 hover:border-gray-600 transition">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <p style={{ color: colors.accent }} className="font-mono font-bold">{course.code}</p>
                    <p className="text-white font-semibold">{course.name}</p>
                    {course.bearing && (
                      <span style={{ background: colors.accent, color: colors.primary }} className="px-3 py-1 rounded-full text-xs font-bold">
                        LOAD-BEARING
                      </span>
                    )}
                  </div>
                  <p className="text-gray-400 text-sm mb-3">
                    {assessmentPlans[course.code]?.method || 'No assessment plan yet'}
                  </p>
                  {assessmentPlans[course.code] && (
                    <p className="text-blue-300 text-sm">
                      Target: {assessmentPlans[course.code].targetLevel}% proficiency
                    </p>
                  )}
                </div>
                <div className="flex gap-2">
                  <button className="p-2 rounded hover:bg-gray-700 transition text-gray-400 hover:text-white">
                    <Edit2 size={18} />
                  </button>
                  <button className="p-2 rounded hover:bg-gray-700 transition text-gray-400 hover:text-white">
                    <Eye size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 p-6 bg-yellow-900 bg-opacity-20 rounded-xl border border-yellow-600 border-opacity-50">
          <p className="text-yellow-300 font-semibold">📅 Institutional Deadline: September 30, 2026</p>
          <p className="text-yellow-200 text-sm mt-2">All 14 assessment plans must be submitted and approved by this date for HLC compliance.</p>
        </div>
      </div>
    </div>
  );

  // ==================== EVIDENCE COLLECTION ====================
  const EvidenceCollectionView = () => (
    <div style={{ background: bgGradient }} className="min-h-screen p-6 md:p-12">
      <div className="max-w-6xl mx-auto">
        <h1 style={{ color: colors.accent }} className="text-3xl font-bold mb-12">Evidence Collection Dashboard</h1>

        {/* Collection Progress */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {['PLO1', 'PLO2', 'PLO3', 'PLO4', 'PLO5', 'PLO6'].map((plo) => {
            const data = ASSESSMENT_DATA[plo];
            const progress = data.artifacts > 0 ? (data.artifacts / 24) * 100 : 0;
            return (
              <div key={plo} style={{ background: colors.secondary }} className="p-6 rounded-xl border border-gray-700">
                <div className="flex items-center justify-between mb-4">
                  <h3 style={{ color: colors.accent }} className="font-bold">{plo}</h3>
                  <span style={{ color: data.achieved >= data.target ? colors.success : colors.warning }} className="text-sm font-bold">
                    {data.achieved}% / {data.target}% 🎯
                  </span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2 mb-4 overflow-hidden">
                  <div
                    style={{ background: accentGradient, width: `${progress}%` }}
                    className="h-full transition-all duration-300"
                  />
                </div>
                <p className="text-gray-400 text-sm">
                  {data.artifacts}/24 artifacts collected • Source: {data.course}
                </p>
              </div>
            );
          })}
        </div>

        {/* Upload Section */}
        <div style={{ background: colors.secondary }} className="p-8 rounded-xl border border-gray-700 mb-12">
          <h2 style={{ color: colors.accent }} className="text-2xl font-bold mb-6">Upload Evidence</h2>
          <div
            style={{
              background: colors.primary,
              borderColor: colors.accent,
              borderStyle: 'dashed'
            }}
            className="border-2 p-12 rounded-lg text-center cursor-pointer hover:bg-opacity-80 transition"
          >
            <Upload size={48} style={{ color: colors.accent }} className="mx-auto mb-4 opacity-50" />
            <p className="text-white font-semibold mb-2">Drag & drop student artifacts here</p>
            <p className="text-gray-400 text-sm mb-6">Or click to select files</p>
            <button style={{ background: accentGradient }} className="px-6 py-2 rounded text-black font-bold hover:opacity-90 transition">
              Select Files
            </button>
            <p className="text-gray-500 text-xs mt-4">Supported: PDF, DOCX, ZIP | Max 100MB | Anonymize student names</p>
          </div>
        </div>

        {/* Recent Uploads */}
        <div style={{ background: colors.secondary }} className="p-8 rounded-xl border border-gray-700">
          <h2 style={{ color: colors.accent }} className="text-2xl font-bold mb-6">Recent Uploads (This Semester)</h2>
          <div className="space-y-3">
            {[
              { course: 'NET-2650', artifact: 'Capstone_Project_Group1.zip', plo: 'PLO1,PLO3,PLO4', date: '2025-10-15', score: '3.8/4' },
              { course: 'CYBR-2101', artifact: 'Python_Assignment_Week8.py', plo: 'PLO2,PLO4', date: '2025-10-14', score: '3.5/4' },
              { course: 'NET-2220', artifact: 'Server_Lab_Report.pdf', plo: 'PLO1', date: '2025-10-12', score: '3.2/4' }
            ].map((item, idx) => (
              <div key={idx} className="p-4 bg-gray-900 bg-opacity-50 rounded border border-gray-700 flex items-center justify-between">
                <div>
                  <p className="text-white font-semibold text-sm">{item.course} - {item.artifact}</p>
                  <p className="text-gray-400 text-xs mt-1">PLOs: {item.plo} | Scored: {item.score}</p>
                </div>
                <p className="text-gray-400 text-xs">{item.date}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  // ==================== REPORTS ====================
  const ReportsView = () => (
    <div style={{ background: bgGradient }} className="min-h-screen p-6 md:p-12">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-12">
          <h1 style={{ color: colors.accent }} className="text-3xl font-bold">Assessment Reports</h1>
          <button
            style={{ background: accentGradient }}
            className="px-6 py-3 rounded-lg text-black font-bold flex items-center gap-2 hover:opacity-90 transition"
          >
            <Download size={20} /> Export APAR
          </button>
        </div>

        {/* Report Status */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div style={{ background: colors.secondary }} className="p-6 rounded-xl border border-gray-700">
            <h3 className="text-white font-bold mb-4 flex items-center gap-2">
              <FileText size={20} style={{ color: colors.accent }} />
              2025-26 APAR
            </h3>
            <p className="text-gray-400 text-sm mb-4">Annual Program Assessment Report (Due May 30, 2026)</p>
            <div className="w-full bg-gray-700 rounded-full h-2 mb-2">
              <div style={{ background: accentGradient, width: '85%' }} className="h-full rounded-full" />
            </div>
            <p className="text-blue-300 text-xs">85% Complete</p>
          </div>

          <div style={{ background: colors.secondary }} className="p-6 rounded-xl border border-gray-700">
            <h3 className="text-white font-bold mb-4 flex items-center gap-2">
              <FileText size={20} style={{ color: colors.warning }} />
              Historical APAR Files
            </h3>
            <p className="text-gray-400 text-sm mb-4">Previous years' reports for trend analysis</p>
            <button className="text-blue-400 hover:text-blue-300 text-sm font-semibold">
              View 2024-25 Report →
            </button>
          </div>

          <div style={{ background: colors.secondary }} className="p-6 rounded-xl border border-gray-700">
            <h3 className="text-white font-bold mb-4 flex items-center gap-2">
              <TrendingUp size={20} style={{ color: colors.success }} />
              Program Health
            </h3>
            <p className="text-gray-400 text-sm mb-4">Overall assessment maturity & compliance</p>
            <p style={{ color: colors.success }} className="text-sm font-bold">
              ✓ HLC Ready (82 days)
            </p>
          </div>
        </div>

        {/* Report Preview */}
        <div style={{ background: colors.secondary }} className="p-8 rounded-xl border border-gray-700">
          <h2 style={{ color: colors.accent }} className="text-2xl font-bold mb-6">APAR Report Preview (2025-26)</h2>

          <div className="space-y-8">
            <div className="border-b border-gray-700 pb-6">
              <h3 className="text-white font-bold mb-3">Executive Summary</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                The AAS Cybersecurity & Network Systems program demonstrates consistent achievement of program learning outcomes, with 4 of 6 PLOs meeting or exceeding the 80% target performance level. The program continues to show improvement trajectory across the three-year assessment cycle, with notable gains in Systems Design & Operations (PLO1) and Technical Problem Solving (PLO4).
              </p>
            </div>

            <div className="border-b border-gray-700 pb-6">
              <h3 className="text-white font-bold mb-3">Key Findings</h3>
              <ul className="text-gray-400 text-sm space-y-2">
                <li><span style={{ color: colors.success }}>✓</span> PLO1 (Systems Design): 83% (Target 80%) - Exceeds</li>
                <li><span style={{ color: colors.warning }}>⚠</span> PLO2 (Data Management): 67% (Target 80%) - Below Target</li>
                <li><span style={{ color: colors.success }}>✓</span> PLO3 (Security & Risk): 79% (Target 80%) - Near Target</li>
                <li><span style={{ color: colors.success }}>✓</span> PLO4 (Problem Solving): 83% (Target 80%) - Exceeds</li>
                <li><span style={{ color: colors.warning }}>⚠</span> PLO5 (Ethical Practice): Pending - Collection underway</li>
                <li><span style={{ color: colors.warning }}>⚠</span> PLO6 (Communication): Pending - Collection underway</li>
              </ul>
            </div>

            <div className="border-b border-gray-700 pb-6">
              <h3 className="text-white font-bold mb-3">Closing the Loop (2024-25 → 2025-26)</h3>
              <div className="bg-gray-900 bg-opacity-50 p-4 rounded border border-gray-700">
                <p className="text-gray-300 text-sm mb-3"><strong>Year 1 Finding:</strong> PLO3 gap in risk prioritization (71% proficiency)</p>
                <p className="text-gray-300 text-sm mb-3"><strong>Action Taken:</strong> Integrated NIST Cybersecurity Framework (CSF) case study into NET-2650 capstone; added peer-review component for mitigation strategy evaluation</p>
                <p className="text-green-300 text-sm"><strong>Year 2 Result:</strong> PLO3 improved to 79% ✓ (+8 percentage points)</p>
              </div>
            </div>

            <div>
              <h3 className="text-white font-bold mb-3">Next Year's Improvement Plan (2026-27)</h3>
              <div className="bg-gray-900 bg-opacity-50 p-4 rounded border border-gray-700">
                <p className="text-gray-300 text-sm"><strong>PLO2 Gap (Data Management: 67%):</strong></p>
                <p className="text-gray-400 text-sm mt-2">
                  Action: Add dedicated "Data Cleaning & Validation" lab to CYBR-2101 Python course. Emphasize error handling patterns, data normalization, and validation techniques.
                </p>
                <p className="text-gray-400 text-sm mt-2 text-blue-300">
                  Target: Achieve 80% proficiency by May 2027
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 flex gap-4">
            <button style={{ background: accentGradient }} className="px-6 py-3 rounded text-black font-bold hover:opacity-90 transition flex items-center gap-2">
              <Download size={18} /> Export PDF
            </button>
            <button style={{ background: colors.secondary, borderColor: colors.border }} className="px-6 py-3 rounded border text-gray-300 hover:text-white transition">
              Edit Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // ==================== SETTINGS ====================
  const SettingsView = () => (
    <div style={{ background: bgGradient }} className="min-h-screen p-6 md:p-12">
      <div className="max-w-4xl mx-auto">
        <h1 style={{ color: colors.accent }} className="text-3xl font-bold mb-12">Settings & Configuration</h1>

        <div className="space-y-8">
          {/* Program Info */}
          <div style={{ background: colors.secondary }} className="p-8 rounded-xl border border-gray-700">
            <h2 style={{ color: colors.accent }} className="text-2xl font-bold mb-6">Program Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-400 text-sm mb-2">Program Name</label>
                <p className="text-white font-semibold">{PROGRAM_DATA.name}</p>
              </div>
              <div>
                <label className="block text-gray-400 text-sm mb-2">Program Director</label>
                <p className="text-white font-semibold">{PROGRAM_DATA.director}</p>
              </div>
              <div>
                <label className="block text-gray-400 text-sm mb-2">Total Courses</label>
                <p className="text-white font-semibold">{PROGRAM_DATA.courses.length}</p>
              </div>
              <div>
                <label className="block text-gray-400 text-sm mb-2">HLC Accreditation Visit</label>
                <p className="text-yellow-400 font-semibold">{PROGRAM_DATA.hlcVisit}</p>
              </div>
            </div>
          </div>

          {/* Google Drive Integration */}
          <div style={{ background: colors.secondary }} className="p-8 rounded-xl border border-gray-700">
            <h2 style={{ color: colors.accent }} className="text-2xl font-bold mb-6">Google Drive Integration</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-900 bg-opacity-50 rounded border border-gray-700">
                <div>
                  <p className="text-white font-semibold text-sm">Assessment Evidence Folder</p>
                  <p className="text-gray-400 text-xs mt-1">/Hocking_College/Cybersecurity_Program_Assessment</p>
                </div>
                <CheckCircle size={20} style={{ color: colors.success }} />
              </div>
              <button style={{ background: accentGradient }} className="px-6 py-2 rounded text-black font-bold text-sm hover:opacity-90 transition">
                Authorize Google Drive
              </button>
            </div>
          </div>

          {/* Calendar Sync */}
          <div style={{ background: colors.secondary }} className="p-8 rounded-xl border border-gray-700">
            <h2 style={{ color: colors.accent }} className="text-2xl font-bold mb-6">Calendar Integration</h2>
            <div className="space-y-4">
              <p className="text-gray-400 text-sm">Sync assessment deadlines to Google Calendar for automatic reminders.</p>
              <button style={{ background: accentGradient }} className="px-6 py-2 rounded text-black font-bold text-sm hover:opacity-90 transition flex items-center gap-2">
                <Calendar size={16} /> Sync to Google Calendar
              </button>
            </div>
          </div>

          {/* Zapier Automation */}
          <div style={{ background: colors.secondary }} className="p-8 rounded-xl border border-gray-700">
            <h2 style={{ color: colors.accent }} className="text-2xl font-bold mb-6">Zapier Automation</h2>
            <p className="text-gray-400 text-sm mb-6">Auto-create assessment folders when courses are added.</p>
            <div className="bg-green-900 bg-opacity-20 p-4 rounded border border-green-600 border-opacity-50 mb-4">
              <p className="text-green-300 text-sm">
                <CheckCircle size={14} className="inline mr-2" />
                Zapier connection active • Ready to auto-create 14 course folders
              </p>
            </div>
            <button style={{ background: accentGradient }} className="px-6 py-2 rounded text-black font-bold text-sm hover:opacity-90 transition">
              View Zapier Workflow
            </button>
          </div>

          {/* User Permissions */}
          <div style={{ background: colors.secondary }} className="p-8 rounded-xl border border-gray-700">
            <h2 style={{ color: colors.accent }} className="text-2xl font-bold mb-6">User Roles & Permissions</h2>
            <div className="space-y-3">
              {[
                { role: 'Admin', users: 1, perms: 'Full access to all features' },
                { role: 'Director', users: 1, perms: 'View dashboard, approve plans, generate reports' },
                { role: 'Faculty', users: 14, perms: 'Collect evidence, view own progress' }
              ].map((r, idx) => (
                <div key={idx} className="p-4 bg-gray-900 bg-opacity-50 rounded border border-gray-700 flex items-center justify-between">
                  <div>
                    <p className="text-white font-semibold text-sm">{r.role}</p>
                    <p className="text-gray-400 text-xs mt-1">{r.perms}</p>
                  </div>
                  <span style={{ color: colors.accent }} className="text-sm font-bold">{r.users} user(s)</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // ==================== MAIN RENDER ====================
  return (
    <div style={{ background: colors.primary }} className="min-h-screen text-white">
      {/* Navigation */}
      <nav style={{ background: colors.secondary, borderBottom: `1px solid ${colors.border}` }} className="sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div style={{ background: accentGradient }} className="w-10 h-10 rounded-lg flex items-center justify-center font-bold text-black">
              C
            </div>
            <h1 style={{ color: colors.accent }} className="text-xl font-bold hidden md:block">Compass</h1>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {[
              { id: 'dashboard', label: '📊 Dashboard', icon: TrendingUp },
              { id: 'plans', label: '📋 Plans', icon: FileText },
              { id: 'evidence', label: '📤 Evidence', icon: Upload },
              { id: 'reports', label: '📊 Reports', icon: BarChart },
              { id: 'settings', label: '⚙️ Settings', icon: Settings }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  background: activeTab === tab.id ? colors.secondary : 'transparent',
                  borderColor: activeTab === tab.id ? colors.accent : 'transparent'
                }}
                className="px-4 py-2 rounded border transition text-gray-300 hover:text-white"
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Mobile Menu */}
          <button onClick={() => setShowMobileMenu(!showMobileMenu)} className="md:hidden">
            {showMobileMenu ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Nav */}
        {showMobileMenu && (
          <div style={{ background: colors.primary, borderTop: `1px solid ${colors.border}` }} className="md:hidden p-4 space-y-2">
            {[
              { id: 'dashboard', label: '📊 Dashboard' },
              { id: 'plans', label: '📋 Plans' },
              { id: 'evidence', label: '📤 Evidence' },
              { id: 'reports', label: '📊 Reports' },
              { id: 'settings', label: '⚙️ Settings' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => { setActiveTab(tab.id); setShowMobileMenu(false); }}
                className="w-full text-left px-4 py-2 rounded hover:bg-gray-700 transition text-gray-300 hover:text-white"
              >
                {tab.label}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* Content */}
      {activeTab === 'dashboard' && <DashboardView />}
      {activeTab === 'plans' && <AssessmentPlansView />}
      {activeTab === 'evidence' && <EvidenceCollectionView />}
      {activeTab === 'reports' && <ReportsView />}
      {activeTab === 'settings' && <SettingsView />}
    </div>
  );
};

export default CompasProduction;
