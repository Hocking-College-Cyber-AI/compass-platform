import React, { useState } from 'react';

const CompassApp = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [currentView, setCurrentView] = useState('dashboard');
  
  const [programs] = useState([
    {
      id: 'prog_cyber',
      name: 'Cybersecurity & Network Systems',
      abbr: 'CYBER',
      dean: 'Sarah Chen',
      director: 'James Wilson',
      credentials: 'AAS',
      ogtp: 'AS-CYBERSEC',
      plos: [
        { id: 'plo_1', name: 'Network Configuration & Troubleshooting', level: 'Intermediate' },
        { id: 'plo_2', name: 'Security Principles & Implementation', level: 'Intermediate' }
      ],
      courses: [
        {
          id: 'course_net',
          code: 'NET101',
          name: 'Network Fundamentals',
          instructor: 'Dr. Martinez',
          students: 35,
          credits: 3
        },
        {
          id: 'course_sec',
          code: 'SEC201',
          name: 'Security Principles',
          instructor: 'Dr. Patel',
          students: 28,
          credits: 3
        }
      ]
    },
    {
      id: 'prog_ai',
      name: 'AI & Data Science',
      abbr: 'AIDA',
      dean: 'Sarah Chen',
      director: 'James Wilson',
      credentials: 'AAS',
      ogtp: 'AS-DATASCIENCE',
      plos: [
        { id: 'plo_3', name: 'Data Analysis & Visualization', level: 'Intermediate' },
        { id: 'plo_4', name: 'Machine Learning Fundamentals', level: 'Intermediate' }
      ],
      courses: [
        {
          id: 'course_data',
          code: 'DATA101',
          name: 'Data Science Fundamentals',
          instructor: 'Dr. Kumar',
          students: 32,
          credits: 3
        }
      ]
    }
  ]);

  const colors = darkMode ? {
    bg: '#0f172a',
    surface: '#1e293b',
    border: '#334155',
    text: '#e2e8f0',
    textAlt: '#cbd5e1',
    primary: '#667eea',
    success: '#10b981',
    danger: '#ef4444'
  } : {
    bg: '#f8fafc',
    surface: '#ffffff',
    border: '#e2e8f0',
    text: '#0f172a',
    textAlt: '#475569',
    primary: '#667eea',
    success: '#10b981',
    danger: '#ef4444'
  };

  return (
    <div style={{ background: colors.bg, color: colors.text, minHeight: '100vh', fontFamily: "'Segoe UI', sans-serif" }}>
      {/* Header */}
      <div style={{ background: colors.surface, borderBottom: `1px solid ${colors.border}`, padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ fontSize: '24px', fontWeight: '700' }}>🧭 Compass</div>
          <div style={{ fontSize: '12px', color: colors.textAlt }}>HLC Accreditation Platform</div>
        </div>
        <button 
          onClick={() => setDarkMode(!darkMode)}
          style={{ padding: '8px 12px', background: colors.primary, color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: '500' }}
        >
          {darkMode ? '☀️ Light' : '🌙 Dark'}
        </button>
      </div>

      {/* Main Container */}
      <div style={{ display: 'flex' }}>
        {/* Sidebar */}
        <div style={{ width: '240px', background: colors.surface, borderRight: `1px solid ${colors.border}`, padding: '20px 0' }}>
          <div style={{ padding: '0 16px' }}>
            {[
              { id: 'dashboard', label: '📊 Dashboard' },
              { id: 'programs', label: '📚 Programs' },
              { id: 'courses', label: '🎓 Courses' },
              { id: 'plos', label: '🎯 PLOs' },
              { id: 'reports', label: '📋 Reports' }
            ].map(item => (
              <button
                key={item.id}
                onClick={() => setCurrentView(item.id)}
                style={{
                  width: '100%',
                  padding: '10px 16px',
                  background: currentView === item.id ? colors.primary : 'transparent',
                  color: currentView === item.id ? 'white' : colors.textAlt,
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '13px',
                  fontWeight: '500',
                  marginBottom: '4px',
                  textAlign: 'left'
                }}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div style={{ flex: 1, padding: '32px' }}>
          {/* Dashboard View */}
          {currentView === 'dashboard' && (
            <div>
              <h1 style={{ margin: '0 0 24px 0', fontSize: '28px', fontWeight: '700' }}>Dashboard</h1>
              
              {/* Metrics */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '32px' }}>
                {[
                  { label: 'Programs', value: programs.length },
                  { label: 'Total Courses', value: programs.reduce((sum, p) => sum + p.courses.length, 0) },
                  { label: 'Total PLOs', value: programs.reduce((sum, p) => sum + p.plos.length, 0) },
                  { label: 'Compliance', value: '85%' }
                ].map((metric, idx) => (
                  <div key={idx} style={{ background: colors.surface, padding: '20px', borderRadius: '12px', border: `1px solid ${colors.border}` }}>
                    <div style={{ fontSize: '12px', color: colors.textAlt }}>{ metric.label}</div>
                    <div style={{ fontSize: '28px', fontWeight: '700', color: colors.primary, marginTop: '8px' }}>
                      {metric.value}
                    </div>
                  </div>
                ))}
              </div>

              {/* Info Cards */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div style={{ background: colors.surface, padding: '20px', borderRadius: '12px', border: `1px solid ${colors.border}` }}>
                  <h2 style={{ margin: '0 0 12px 0', fontSize: '16px', fontWeight: '600' }}>✨ Welcome to Compass</h2>
                  <p style={{ fontSize: '13px', color: colors.textAlt, margin: '0', lineHeight: '1.6' }}>
                    Your HLC-aligned accreditation management platform. Built for Ohio community colleges with full compliance support.
                  </p>
                </div>
                <div style={{ background: colors.surface, padding: '20px', borderRadius: '12px', border: `1px solid ${colors.border}` }}>
                  <h2 style={{ margin: '0 0 12px 0', fontSize: '16px', fontWeight: '600' }}>🚀 Features</h2>
                  <ul style={{ fontSize: '12px', color: colors.textAlt, margin: '0', paddingLeft: '20px', lineHeight: '1.8' }}>
                    <li>CLO-to-PLO Mapping (I/R/F/S)</li>
                    <li>OGTP Pathway Integration</li>
                    <li>Evidence Collection</li>
                    <li>SSAR/ODHE Export</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Programs View */}
          {currentView === 'programs' && (
            <div>
              <h1 style={{ margin: '0 0 24px 0', fontSize: '28px', fontWeight: '700' }}>Programs</h1>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '16px' }}>
                {programs.map(prog => (
                  <div key={prog.id} style={{ background: colors.surface, padding: '20px', borderRadius: '12px', border: `1px solid ${colors.border}` }}>
                    <div style={{ fontSize: '18px', fontWeight: '700' }}>{prog.abbr}</div>
                    <div style={{ fontSize: '13px', color: colors.textAlt, marginTop: '8px' }}>{prog.name}</div>
                    <div style={{ fontSize: '12px', color: colors.textAlt, marginTop: '12px' }}>
                      📚 {prog.courses.length} Courses | 🎯 {prog.plos.length} PLOs
                    </div>
                    <div style={{ fontSize: '12px', color: colors.textAlt, marginTop: '8px' }}>
                      📋 {prog.credentials} | 🏛️ {prog.ogtp}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Courses View */}
          {currentView === 'courses' && (
            <div>
              <h1 style={{ margin: '0 0 24px 0', fontSize: '28px', fontWeight: '700' }}>Courses</h1>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '16px' }}>
                {programs.flatMap(prog => 
                  prog.courses.map(course => (
                    <div key={course.id} style={{ background: colors.surface, padding: '20px', borderRadius: '12px', border: `1px solid ${colors.border}` }}>
                      <div style={{ fontSize: '16px', fontWeight: '700' }}>{course.code}</div>
                      <div style={{ fontSize: '13px', color: colors.textAlt, marginTop: '4px' }}>{course.name}</div>
                      <div style={{ fontSize: '12px', color: colors.textAlt, marginTop: '8px' }}>👨‍🏫 {course.instructor}</div>
                      <div style={{ fontSize: '12px', color: colors.textAlt, marginTop: '4px' }}>👥 {course.students} students | 📖 {course.credits} credits</div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* PLOs View */}
          {currentView === 'plos' && (
            <div>
              <h1 style={{ margin: '0 0 24px 0', fontSize: '28px', fontWeight: '700' }}>Program Learning Outcomes</h1>
              <div style={{ display: 'grid', gap: '12px' }}>
                {programs.map(prog => (
                  <div key={prog.id} style={{ background: colors.surface, padding: '20px', borderRadius: '12px', border: `1px solid ${colors.border}` }}>
                    <div style={{ fontSize: '16px', fontWeight: '700', marginBottom: '12px' }}>{prog.name}</div>
                    <div style={{ paddingLeft: '16px' }}>
                      {prog.plos.map(plo => (
                        <div key={plo.id} style={{ padding: '8px 0', borderBottom: `1px solid ${colors.border}`, fontSize: '13px' }}>
                          <strong>{plo.name}</strong>
                          <div style={{ fontSize: '11px', color: colors.textAlt, marginTop: '4px' }}>Level: {plo.level}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Reports View */}
          {currentView === 'reports' && (
            <div>
              <h1 style={{ margin: '0 0 24px 0', fontSize: '28px', fontWeight: '700' }}>Reports & Compliance</h1>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div style={{ background: colors.surface, padding: '20px', borderRadius: '12px', border: `1px solid ${colors.border}` }}>
                  <h3 style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: '600' }}>HLC SSAR</h3>
                  <p style={{ fontSize: '12px', color: colors.textAlt, margin: '0 0 12px 0' }}>Generate Self-Study Report for HLC submission</p>
                  <button style={{ width: '100%', padding: '8px', background: colors.primary, color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: '500' }}>
                    Generate SSAR
                  </button>
                </div>
                <div style={{ background: colors.surface, padding: '20px', borderRadius: '12px', border: `1px solid ${colors.border}` }}>
                  <h3 style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: '600' }}>ODHE Report</h3>
                  <p style={{ fontSize: '12px', color: colors.textAlt, margin: '0 0 12px 0' }}>Export data to Ohio reporting portal</p>
                  <button style={{ width: '100%', padding: '8px', background: colors.success, color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: '500' }}>
                    Export ODHE
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CompassApp;
