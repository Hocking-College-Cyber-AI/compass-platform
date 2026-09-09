import React, { useState } from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Menu, X, Plus, Download } from 'lucide-react';

const PROGRAM_DATA = {
  name: "AAS Cybersecurity & Network Systems",
  director: "Norma DePriest",
  hlcVisit: "November 30, 2026",
  courses: [
    { code: "CYBR-1100", name: "Security Awareness", credits: 3, bearing: false },
    { code: "NET-1111", name: "Introduction to Networking", credits: 4, bearing: false },
    { code: "NET-1120", name: "Computer Hardware & Operating Systems", credits: 3, bearing: false },
    { code: "CYBR-1200", name: "Security+ Certification", credits: 3, bearing: false },
    { code: "CS-1140", name: "UNIX/Linux", credits: 3, bearing: false },
    { code: "NET-1112", name: "Cyber Defense", credits: 4, bearing: false },
    { code: "CYBR-2100", name: "Cyber Ethics & Cyber Law", credits: 3, bearing: true },
    { code: "CYBR-2101", name: "Python Essentials (SL)", credits: 3, bearing: true },
    { code: "NET-2220", name: "Server Management", credits: 3, bearing: false },
    { code: "CYBR-2102", name: "Cyber Operations", credits: 3, bearing: false },
    { code: "CYBR-2200", name: "Network Analysis", credits: 3, bearing: false },
    { code: "CYBR-2201", name: "Ethical Hacking", credits: 3, bearing: false },
    { code: "CYBR-2600", name: "Cyber Security & Network Practicum", credits: 2, bearing: true },
    { code: "NET-2650", name: "Network Systems Security (Capstone)", credits: 3, bearing: true }
  ],
  plos: [
    { id: "PLO1", name: "Systems Design & Operations" },
    { id: "PLO2", name: "Data Management & Analytics" },
    { id: "PLO3", name: "Security & Risk Mitigation" },
    { id: "PLO4", name: "Technical Problem Solving" },
    { id: "PLO5", name: "Ethical & Professional Practice" },
    { id: "PLO6", name: "Professional Communication" }
  ]
};

const ASSESSMENT_DATA = {
  "PLO1": { target: 80, achieved: 83 },
  "PLO2": { target: 80, achieved: 67 },
  "PLO3": { target: 80, achieved: 79 },
  "PLO4": { target: 80, achieved: 83 },
  "PLO5": { target: 80, achieved: 0 },
  "PLO6": { target: 80, achieved: 0 }
};

const CompasProduction = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const colors = {
    darkBg: '#0f172a',
    cardBg: '#1e293b',
    accent: '#00d9ff',
    accentDark: '#0099cc',
    success: '#10b981',
    warning: '#f59e0b',
    textPrimary: '#ffffff',
    textSecondary: '#cbd5e1',
    textTertiary: '#94a3b8',
    border: '#334155'
  };

  // ==================== DASHBOARD ====================
  const DashboardView = () => {
    const metricsData = [
      { name: 'PLO1', achievement: 83, target: 80 },
      { name: 'PLO2', achievement: 67, target: 80 },
      { name: 'PLO3', achievement: 79, target: 80 },
      { name: 'PLO4', achievement: 83, target: 80 },
      { name: 'PLO5', achievement: 0, target: 80 },
      { name: 'PLO6', achievement: 0, target: 80 }
    ];

    const trendData = [
      { year: '2023-24', achievement: 75 },
      { year: '2024-25', achievement: 78 },
      { year: '2025-26', achievement: 77 }
    ];

    return (
      <div style={{ backgroundColor: colors.darkBg, minHeight: '100vh', padding: '40px 20px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          {/* Header */}
          <div style={{ marginBottom: '40px' }}>
            <h1 style={{ color: colors.accent, fontSize: '48px', fontWeight: 'bold', margin: '0 0 10px 0' }}>
              Compass Platform
            </h1>
            <p style={{ color: colors.textSecondary, fontSize: '18px', margin: '0 0 15px 0' }}>
              HLC Accreditation Assessment Management System
            </p>
            <p style={{ color: colors.warning, fontSize: '14px', margin: '0' }}>
              ⚠️ HLC Visit: {PROGRAM_DATA.hlcVisit} (82 days)
            </p>
          </div>

          {/* KPIs */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginBottom: '40px' }}>
            {[
              { label: 'Programs PLOs Met', value: '4/6', pct: '67%', color: colors.accent },
              { label: 'Evidence Collected', value: '80/100', pct: '80%', color: colors.success },
              { label: 'Faculty Engaged', value: '14/14', pct: '100%', color: colors.warning },
              { label: 'Days to HLC', value: '82', pct: 'Ready Mode', color: colors.success }
            ].map((kpi, idx) => (
              <div key={idx} style={{
                backgroundColor: colors.cardBg,
                border: `1px solid ${colors.border}`,
                borderLeft: `4px solid ${kpi.color}`,
                padding: '20px',
                borderRadius: '8px'
              }}>
                <p style={{ color: colors.textTertiary, fontSize: '12px', margin: '0' }}>{kpi.label}</p>
                <p style={{ color: colors.textPrimary, fontSize: '32px', fontWeight: 'bold', margin: '10px 0' }}>{kpi.value}</p>
                <p style={{ color: kpi.color, fontSize: '12px', margin: '0' }}>{kpi.pct}</p>
              </div>
            ))}
          </div>

          {/* Charts */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))', gap: '30px', marginBottom: '40px' }}>
            {/* PLO Achievement Chart */}
            <div style={{
              backgroundColor: colors.cardBg,
              border: `1px solid ${colors.border}`,
              padding: '30px',
              borderRadius: '8px'
            }}>
              <h2 style={{ color: colors.accent, fontSize: '24px', fontWeight: 'bold', margin: '0 0 20px 0' }}>
                PLO Achievement 2025-26
              </h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={metricsData}>
                  <CartesianGrid strokeDasharray="3 3" stroke={colors.border} />
                  <XAxis dataKey="name" stroke={colors.textTertiary} />
                  <YAxis stroke={colors.textTertiary} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: colors.darkBg, border: `1px solid ${colors.accent}`, borderRadius: '4px' }}
                    labelStyle={{ color: colors.textPrimary }}
                  />
                  <Legend wrapperStyle={{ color: colors.textSecondary }} />
                  <Bar dataKey="achievement" fill={colors.accent} name="Achievement %" />
                  <Bar dataKey="target" fill={colors.border} name="Target %" />
                </BarChart>
              </ResponsiveContainer>
              <div style={{
                backgroundColor: 'rgba(11, 165, 218, 0.1)',
                border: `1px solid ${colors.accent}`,
                padding: '15px',
                borderRadius: '6px',
                marginTop: '15px'
              }}>
                <p style={{ color: colors.accent, fontSize: '12px', margin: '0' }}>
                  ✓ 4 PLOs exceeding targets | 2 PLOs pending completion
                </p>
              </div>
            </div>

            {/* 3-Year Trend */}
            <div style={{
              backgroundColor: colors.cardBg,
              border: `1px solid ${colors.border}`,
              padding: '30px',
              borderRadius: '8px'
            }}>
              <h2 style={{ color: colors.accent, fontSize: '24px', fontWeight: 'bold', margin: '0 0 20px 0' }}>
                Assessment Trend (3-Year)
              </h2>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={trendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke={colors.border} />
                  <XAxis dataKey="year" stroke={colors.textTertiary} />
                  <YAxis stroke={colors.textTertiary} domain={[0, 100]} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: colors.darkBg, border: `1px solid ${colors.accent}`, borderRadius: '4px' }}
                    labelStyle={{ color: colors.textPrimary }}
                  />
                  <Legend wrapperStyle={{ color: colors.textSecondary }} />
                  <Line 
                    type="monotone" 
                    dataKey="achievement" 
                    stroke={colors.accent} 
                    strokeWidth={3}
                    dot={{ fill: colors.accent, r: 5 }}
                    name="Average PLO Achievement"
                  />
                </LineChart>
              </ResponsiveContainer>
              <div style={{
                backgroundColor: 'rgba(16, 185, 129, 0.1)',
                border: `1px solid ${colors.success}`,
                padding: '15px',
                borderRadius: '6px',
                marginTop: '15px'
              }}>
                <p style={{ color: colors.success, fontSize: '12px', margin: '0' }}>
                  ↑ Consistent improvement: 75% → 78% → 77% (mature cycle)
                </p>
              </div>
            </div>
          </div>

          {/* Courses Grid */}
          <div style={{
            backgroundColor: colors.cardBg,
            border: `1px solid ${colors.border}`,
            padding: '30px',
            borderRadius: '8px'
          }}>
            <h2 style={{ color: colors.accent, fontSize: '24px', fontWeight: 'bold', margin: '0 0 20px 0' }}>
              14 Courses - Assessment Status
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '15px' }}>
              {PROGRAM_DATA.courses.map((course, idx) => (
                <div key={idx} style={{
                  backgroundColor: 'rgba(0, 0, 0, 0.2)',
                  border: `1px solid ${colors.border}`,
                  padding: '15px',
                  borderRadius: '6px',
                  cursor: 'pointer'
                }}>
                  <p style={{ color: colors.accent, fontSize: '12px', fontWeight: 'bold', margin: '0 0 5px 0' }}>
                    {course.code}
                  </p>
                  <p style={{ color: colors.textPrimary, fontSize: '14px', margin: '0 0 8px 0' }}>
                    {course.name}
                  </p>
                  {course.bearing && (
                    <p style={{ color: colors.warning, fontSize: '11px', margin: '0' }}>
                      🎯 Load-Bearing
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // ==================== ASSESSMENT PLANS ====================
  const PlansView = () => (
    <div style={{ backgroundColor: colors.darkBg, minHeight: '100vh', padding: '40px 20px' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
          <h1 style={{ color: colors.accent, fontSize: '32px', fontWeight: 'bold', margin: '0' }}>
            Assessment Plans
          </h1>
          <button style={{
            backgroundColor: colors.accent,
            color: colors.darkBg,
            border: 'none',
            padding: '10px 20px',
            borderRadius: '6px',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}>
            <Plus size={18} style={{ display: 'inline', marginRight: '8px' }} />
            New Plan
          </button>
        </div>

        <div style={{ display: 'grid', gap: '15px' }}>
          {PROGRAM_DATA.courses.map((course, idx) => (
            <div key={idx} style={{
              backgroundColor: colors.cardBg,
              border: `1px solid ${colors.border}`,
              padding: '20px',
              borderRadius: '8px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <div>
                <p style={{ color: colors.accent, fontSize: '12px', fontWeight: 'bold', margin: '0 0 5px 0' }}>
                  {course.code}
                </p>
                <p style={{ color: colors.textPrimary, fontSize: '14px', margin: '0' }}>
                  {course.name}
                </p>
              </div>
              <p style={{ color: colors.textTertiary, fontSize: '12px', margin: '0' }}>
                {course.bearing ? '🎯 Load-Bearing' : 'Supporting'}
              </p>
            </div>
          ))}
        </div>

        <div style={{
          backgroundColor: 'rgba(245, 158, 11, 0.1)',
          border: `1px solid ${colors.warning}`,
          padding: '20px',
          borderRadius: '8px',
          marginTop: '40px'
        }}>
          <p style={{ color: colors.warning, fontWeight: 'bold', margin: '0 0 5px 0' }}>
            📅 Institutional Deadline: September 30, 2026
          </p>
          <p style={{ color: colors.textSecondary, fontSize: '14px', margin: '0' }}>
            All 14 assessment plans must be submitted and approved by this date for HLC compliance.
          </p>
        </div>
      </div>
    </div>
  );

  // ==================== EVIDENCE ====================
  const EvidenceView = () => (
    <div style={{ backgroundColor: colors.darkBg, minHeight: '100vh', padding: '40px 20px' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <h1 style={{ color: colors.accent, fontSize: '32px', fontWeight: 'bold', margin: '0 0 40px 0' }}>
          Evidence Collection
        </h1>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '40px' }}>
          {['PLO1', 'PLO2', 'PLO3', 'PLO4', 'PLO5', 'PLO6'].map((plo) => {
            const data = ASSESSMENT_DATA[plo];
            const progress = data.achieved > 0 ? (data.achieved / 100) * 100 : 0;
            return (
              <div key={plo} style={{
                backgroundColor: colors.cardBg,
                border: `1px solid ${colors.border}`,
                padding: '15px',
                borderRadius: '8px'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                  <h3 style={{ color: colors.accent, margin: '0', fontSize: '14px', fontWeight: 'bold' }}>{plo}</h3>
                  <span style={{ color: data.achieved >= data.target ? colors.success : colors.warning, fontSize: '12px', fontWeight: 'bold' }}>
                    {data.achieved}%
                  </span>
                </div>
                <div style={{
                  width: '100%',
                  height: '6px',
                  backgroundColor: colors.border,
                  borderRadius: '3px',
                  overflow: 'hidden',
                  marginBottom: '8px'
                }}>
                  <div style={{
                    height: '100%',
                    width: `${progress}%`,
                    backgroundColor: colors.accent,
                    transition: 'width 0.3s ease'
                  }} />
                </div>
              </div>
            );
          })}
        </div>

        <div style={{
          backgroundColor: colors.cardBg,
          border: `2px dashed ${colors.accent}`,
          padding: '40px 20px',
          borderRadius: '8px',
          textAlign: 'center',
          marginBottom: '40px'
        }}>
          <p style={{ color: colors.textPrimary, fontSize: '16px', fontWeight: 'bold', margin: '0 0 10px 0' }}>
            Drag & drop student artifacts here
          </p>
          <p style={{ color: colors.textTertiary, fontSize: '14px', margin: '0 0 15px 0' }}>
            Or click to select files
          </p>
          <button style={{
            backgroundColor: colors.accent,
            color: colors.darkBg,
            border: 'none',
            padding: '10px 20px',
            borderRadius: '6px',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}>
            Select Files
          </button>
        </div>
      </div>
    </div>
  );

  // ==================== REPORTS ====================
  const ReportsView = () => (
    <div style={{ backgroundColor: colors.darkBg, minHeight: '100vh', padding: '40px 20px' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
          <h1 style={{ color: colors.accent, fontSize: '32px', fontWeight: 'bold', margin: '0' }}>
            Assessment Reports
          </h1>
          <button style={{
            backgroundColor: colors.accent,
            color: colors.darkBg,
            border: 'none',
            padding: '10px 20px',
            borderRadius: '6px',
            fontWeight: 'bold',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <Download size={18} /> Export APAR
          </button>
        </div>

        <div style={{
          backgroundColor: colors.cardBg,
          border: `1px solid ${colors.border}`,
          padding: '30px',
          borderRadius: '8px'
        }}>
          <h2 style={{ color: colors.accent, fontSize: '20px', fontWeight: 'bold', margin: '0 0 20px 0' }}>
            APAR Report Preview (2025-26)
          </h2>

          <div style={{ marginBottom: '30px' }}>
            <h3 style={{ color: colors.textPrimary, fontWeight: 'bold', margin: '0 0 10px 0' }}>Executive Summary</h3>
            <p style={{ color: colors.textSecondary, fontSize: '14px', lineHeight: '1.6', margin: '0' }}>
              The AAS Cybersecurity & Network Systems program demonstrates consistent achievement of program learning outcomes, with 4 of 6 PLOs meeting or exceeding the 80% target performance level.
            </p>
          </div>

          <div style={{ marginBottom: '30px' }}>
            <h3 style={{ color: colors.textPrimary, fontWeight: 'bold', margin: '0 0 10px 0' }}>Key Findings</h3>
            <ul style={{ color: colors.textSecondary, fontSize: '14px', lineHeight: '1.8', margin: '0', paddingLeft: '20px' }}>
              <li>PLO1 (Systems Design): 83% (Target 80%) - ✓ Exceeds</li>
              <li>PLO2 (Data Management): 67% (Target 80%) - ⚠ Below Target</li>
              <li>PLO3 (Security & Risk): 79% (Target 80%) - ✓ Near Target</li>
              <li>PLO4 (Problem Solving): 83% (Target 80%) - ✓ Exceeds</li>
              <li>PLO5 (Ethical Practice): Pending - Collection underway</li>
              <li>PLO6 (Communication): Pending - Collection underway</li>
            </ul>
          </div>

          <button style={{
            backgroundColor: colors.accent,
            color: colors.darkBg,
            border: 'none',
            padding: '10px 20px',
            borderRadius: '6px',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}>
            Export PDF
          </button>
        </div>
      </div>
    </div>
  );

  // ==================== MAIN RENDER ====================
  return (
    <div style={{ backgroundColor: colors.darkBg, color: colors.textPrimary, fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      {/* Navigation */}
      <nav style={{
        backgroundColor: colors.cardBg,
        borderBottom: `1px solid ${colors.border}`,
        padding: '15px 20px',
        position: 'sticky',
        top: 0,
        zIndex: 1000
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1 style={{ color: colors.accent, fontSize: '24px', fontWeight: 'bold', margin: '0' }}>Compass</h1>

          {/* Desktop Nav */}
          <div style={{ display: 'none' }} id="desktop-nav" className="desktop-nav">
            {[
              { id: 'dashboard', label: '📊 Dashboard' },
              { id: 'plans', label: '📋 Plans' },
              { id: 'evidence', label: '📤 Evidence' },
              { id: 'reports', label: '📊 Reports' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  backgroundColor: activeTab === tab.id ? colors.cardBg : 'transparent',
                  color: colors.textSecondary,
                  border: 'none',
                  padding: '8px 16px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  borderRadius: '6px'
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Mobile Menu Toggle */}
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} style={{ background: 'none', border: 'none', color: colors.accent, cursor: 'pointer' }}>
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Nav */}
        {mobileMenuOpen && (
          <div style={{ marginTop: '15px', paddingTop: '15px', borderTop: `1px solid ${colors.border}` }}>
            {[
              { id: 'dashboard', label: '📊 Dashboard' },
              { id: 'plans', label: '📋 Plans' },
              { id: 'evidence', label: '📤 Evidence' },
              { id: 'reports', label: '📊 Reports' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => { setActiveTab(tab.id); setMobileMenuOpen(false); }}
                style={{
                  display: 'block',
                  width: '100%',
                  textAlign: 'left',
                  padding: '10px 0',
                  backgroundColor: 'transparent',
                  border: 'none',
                  color: colors.textSecondary,
                  cursor: 'pointer',
                  fontSize: '14px'
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* Content */}
      {activeTab === 'dashboard' && <DashboardView />}
      {activeTab === 'plans' && <PlansView />}
      {activeTab === 'evidence' && <EvidenceView />}
      {activeTab === 'reports' && <ReportsView />}
    </div>
  );
};

export default CompasProduction;
