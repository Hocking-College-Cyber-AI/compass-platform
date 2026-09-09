import React, { useState } from 'react';

const CompassEnterprise = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [currentView, setCurrentView] = useState('dashboard');
  const [currentUser] = useState({ name: 'Demo User', role: 'program_director' });
  
  const [programs, setPrograms] = useState([
    {
      id: 'prog_cyber',
      name: 'Cybersecurity & Network Systems',
      abbr: 'CYBER',
      dean: 'Sarah Chen',
      director: 'James Wilson',
      credentials: 'AAS',
      ogtp: 'AS-CYBERSEC',
      industry: ['Sec+', 'Net+', 'CCNA'],
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
          credits: 3,
          clos: [
            { id: 'clo_1', name: 'Configure network devices', assignments: [{ plo_id: 'plo_1', level: 'S' }], evidence: [] },
            { id: 'clo_2', name: 'Troubleshoot connectivity', assignments: [{ plo_id: 'plo_1', level: 'R' }], evidence: [] }
          ],
          badges: ['Net+', 'CCNA']
        },
        {
          id: 'course_sec',
          code: 'SEC201',
          name: 'Security Principles',
          instructor: 'Dr. Patel',
          students: 28,
          credits: 3,
          clos: [
            { id: 'clo_3', name: 'Implement security controls', assignments: [{ plo_id: 'plo_2', level: 'S' }], evidence: [] }
          ],
          badges: ['Sec+']
        }
      ]
    }
  ]);

  const [showWizard, setShowWizard] = useState(false);
  const [wizardStep, setWizardStep] = useState(1);
  const [selectedProgram, setSelectedProgram] = useState(programs[0].id);
  const [selectedCourse, setSelectedCourse] = useState(null);

  const progData = programs.find(p => p.id === selectedProgram);

  const colors = darkMode ? {
    bg: '#0f172a',
    surface: '#1e293b',
    border: '#334155',
    text: '#e2e8f0',
    textAlt: '#cbd5e1',
    primary: '#667eea',
    success: '#10b981',
    danger: '#ef4444',
    warning: '#f59e0b',
    levelI: '#10b981',
    levelR: '#3b82f6',
    levelF: '#f59e0b',
    levelS: '#ef4444'
  } : {
    bg: '#f8fafc',
    surface: '#ffffff',
    border: '#e2e8f0',
    text: '#0f172a',
    textAlt: '#475569',
    primary: '#667eea',
    success: '#10b981',
    danger: '#ef4444',
    warning: '#f59e0b',
    levelI: '#10b981',
    levelR: '#3b82f6',
    levelF: '#f59e0b',
    levelS: '#ef4444'
  };

  const getLevelColor = (level) => {
    switch(level) {
      case 'I': return colors.levelI;
      case 'R': return colors.levelR;
      case 'F': return colors.levelF;
      case 'S': return colors.levelS;
      default: return colors.primary;
    }
  };

  const getLevelLabel = (level) => {
    switch(level) {
      case 'I': return 'Introduced';
      case 'R': return 'Reinforced';
      case 'F': return 'Formative';
      case 'S': return 'Summative';
      default: return level;
    }
  };

  return (
    <div style={{ background: colors.bg, color: colors.text, minHeight: '100vh', fontFamily: "'Segoe UI', sans-serif" }}>
      {/* Header */}
      <div style={{ background: colors.surface, borderBottom: `1px solid ${colors.border}`, padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ fontSize: '24px', fontWeight: '700' }}>🧭 Compass</div>
          <div style={{ fontSize: '12px', color: colors.textAlt }}>HLC Accreditation Platform</div>
        </div>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <button onClick={() => setDarkMode(!darkMode)} style={{ padding: '8px 12px', background: colors.primary, color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: '500' }}>
            {darkMode ? '☀️' : '🌙'}
          </button>
          <div style={{ fontSize: '12px' }}>👤 {currentUser.name} ({currentUser.role})</div>
        </div>
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
              { id: 'clo-mapping', label: '🎯 CLO Mapping' },
              { id: 'evidence', label: '📁 Evidence' },
              { id: 'credentials', label: '🏆 Credentials' },
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

          {/* DASHBOARD */}
          {currentView === 'dashboard' && (
            <div>
              <h1 style={{ margin: '0 0 24px 0', fontSize: '28px', fontWeight: '700' }}>Dashboard</h1>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '32px' }}>
                {[
                  { label: 'Programs', value: programs.length },
                  { label: 'Total Courses', value: programs.reduce((sum, p) => sum + p.courses.length, 0) },
                  { label: 'Total PLOs', value: programs.reduce((sum, p) => sum + p.plos.length, 0) },
                  { label: 'CLO Mapping', value: '65%' }
                ].map((metric, idx) => (
                  <div key={idx} style={{ background: colors.surface, padding: '20px', borderRadius: '12px', border: `1px solid ${colors.border}` }}>
                    <div style={{ fontSize: '12px', color: colors.textAlt }}>{ metric.label}</div>
                    <div style={{ fontSize: '28px', fontWeight: '700', color: colors.primary, marginTop: '8px' }}>
                      {metric.value}
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div style={{ background: colors.surface, padding: '20px', borderRadius: '12px', border: `1px solid ${colors.border}` }}>
                  <h2 style={{ margin: '0 0 12px 0', fontSize: '16px', fontWeight: '600' }}>✨ HLC Compliance</h2>
                  <ul style={{ fontSize: '12px', color: colors.textAlt, margin: '0', paddingLeft: '20px', lineHeight: '1.8' }}>
                    <li>✅ CLO-to-PLO Mapping (I/R/F/S)</li>
                    <li>✅ Evidence Collection</li>
                    <li>✅ SSAR Report Generation</li>
                    <li>✅ ODHE Export Ready</li>
                  </ul>
                </div>
                <div style={{ background: colors.surface, padding: '20px', borderRadius: '12px', border: `1px solid ${colors.border}` }}>
                  <h2 style={{ margin: '0 0 12px 0', fontSize: '16px', fontWeight: '600' }}>🎯 I/R/F/S Framework</h2>
                  <div style={{ fontSize: '11px', color: colors.textAlt, lineHeight: '1.8' }}>
                    <div><span style={{ background: colors.levelI, color: 'white', padding: '2px 6px', borderRadius: '3px' }}>I</span> Introduced</div>
                    <div><span style={{ background: colors.levelR, color: 'white', padding: '2px 6px', borderRadius: '3px' }}>R</span> Reinforced</div>
                    <div><span style={{ background: colors.levelF, color: 'white', padding: '2px 6px', borderRadius: '3px' }}>F</span> Formative</div>
                    <div><span style={{ background: colors.levelS, color: 'white', padding: '2px 6px', borderRadius: '3px' }}>S</span> Summative</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* PROGRAMS */}
          {currentView === 'programs' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <h1 style={{ margin: 0, fontSize: '28px', fontWeight: '700' }}>Programs</h1>
                <button onClick={() => setShowWizard(true)} style={{ padding: '8px 16px', background: colors.primary, color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: '500' }}>
                  + New Program
                </button>
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '16px' }}>
                {programs.map(prog => (
                  <div key={prog.id} style={{ background: colors.surface, padding: '20px', borderRadius: '12px', border: `1px solid ${colors.border}` }}>
                    <div style={{ fontSize: '18px', fontWeight: '700' }}>{prog.abbr}</div>
                    <div style={{ fontSize: '13px', color: colors.textAlt, marginTop: '8px' }}>{prog.name}</div>
                    <div style={{ fontSize: '12px', color: colors.textAlt, marginTop: '12px' }}>
                      📚 {prog.courses.length} Courses | 🎯 {prog.plos.length} PLOs | 🏛️ {prog.ogtp}
                    </div>
                    <div style={{ fontSize: '12px', color: colors.textAlt, marginTop: '8px' }}>
                      👨‍💼 {prog.director} | 📋 {prog.credentials}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* COURSES */}
          {currentView === 'courses' && (
            <div>
              <div style={{ marginBottom: '24px' }}>
                <label style={{ fontSize: '14px', fontWeight: '600', color: colors.textAlt }}>Select Program:</label>
                <select value={selectedProgram} onChange={(e) => setSelectedProgram(e.target.value)} style={{
                  marginTop: '8px',
                  padding: '8px 12px',
                  background: colors.surface,
                  color: colors.text,
                  border: `1px solid ${colors.border}`,
                  borderRadius: '6px',
                  width: '100%',
                  maxWidth: '300px'
                }}>
                  {programs.map(p => (
                    <option key={p.id} value={p.id}>{p.name}</option>
                  ))}
                </select>
              </div>

              <h1 style={{ margin: '0 0 24px 0', fontSize: '28px', fontWeight: '700' }}>Courses</h1>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '16px' }}>
                {progData?.courses.map(course => (
                  <div key={course.id} style={{ background: colors.surface, padding: '20px', borderRadius: '12px', border: `1px solid ${colors.border}`, cursor: 'pointer' }} onClick={() => setSelectedCourse(course)}>
                    <div style={{ fontSize: '16px', fontWeight: '700' }}>{course.code}</div>
                    <div style={{ fontSize: '13px', color: colors.textAlt, marginTop: '4px' }}>{course.name}</div>
                    <div style={{ fontSize: '12px', color: colors.textAlt, marginTop: '8px' }}>👨‍🏫 {course.instructor}</div>
                    <div style={{ fontSize: '12px', color: colors.textAlt, marginTop: '4px' }}>👥 {course.students} | 📖 {course.credits} credits</div>
                    <div style={{ fontSize: '12px', color: colors.textAlt, marginTop: '8px' }}>🎓 {course.clos.length} CLOs</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* CLO MAPPING */}
          {currentView === 'clo-mapping' && (
            <div>
              <h1 style={{ margin: '0 0 24px 0', fontSize: '28px', fontWeight: '700' }}>CLO-to-PLO Mapping (I/R/F/S)</h1>
              
              {selectedCourse ? (
                <div>
                  <div style={{ background: colors.surface, padding: '20px', borderRadius: '12px', border: `1px solid ${colors.border}`, marginBottom: '24px' }}>
                    <h2 style={{ margin: '0 0 16px 0', fontSize: '18px', fontWeight: '600' }}>{selectedCourse.code}: {selectedCourse.name}</h2>
                    
                    <div style={{ display: 'grid', gap: '16px' }}>
                      {selectedCourse.clos.map(clo => (
                        <div key={clo.id} style={{ background: colors.bg, padding: '16px', borderRadius: '8px', border: `1px solid ${colors.border}` }}>
                          <h3 style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: '600' }}>📌 {clo.name}</h3>
                          
                          <div style={{ fontSize: '12px', fontWeight: '600', color: colors.textAlt, marginBottom: '8px' }}>Assigned to PLOs:</div>
                          
                          {clo.assignments.length > 0 ? (
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '8px' }}>
                              {clo.assignments.map((assign, idx) => {
                                const plo = progData?.plos.find(p => p.id === assign.plo_id);
                                return (
                                  <div key={idx} style={{ background: colors.surface, padding: '10px', borderRadius: '6px', border: `2px solid ${getLevelColor(assign.level)}` }}>
                                    <div style={{ fontSize: '11px', color: colors.textAlt }}>{plo?.name}</div>
                                    <div style={{ marginTop: '6px', display: 'flex', gap: '4px' }}>
                                      <span style={{ background: getLevelColor(assign.level), color: 'white', padding: '2px 8px', borderRadius: '3px', fontSize: '11px', fontWeight: '600' }}>
                                        {assign.level}
                                      </span>
                                      <span style={{ fontSize: '11px', color: colors.textAlt }}>
                                        {getLevelLabel(assign.level)}
                                      </span>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          ) : (
                            <div style={{ fontSize: '12px', color: colors.textAlt, fontStyle: 'italic' }}>No PLO assignments yet</div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div style={{ background: colors.surface, padding: '40px', borderRadius: '12px', border: `1px solid ${colors.border}`, textAlign: 'center' }}>
                  <div style={{ fontSize: '14px', color: colors.textAlt }}>Select a course to view CLO-to-PLO mapping</div>
                </div>
              )}
            </div>
          )}

          {/* EVIDENCE */}
          {currentView === 'evidence' && (
            <div>
              <h1 style={{ margin: '0 0 24px 0', fontSize: '28px', fontWeight: '700' }}>Evidence Collection</h1>
              
              {selectedCourse ? (
                <div style={{ background: colors.surface, padding: '20px', borderRadius: '12px', border: `1px solid ${colors.border}` }}>
                  <h2 style={{ margin: '0 0 16px 0', fontSize: '18px', fontWeight: '600' }}>{selectedCourse.code}: {selectedCourse.name}</h2>
                  
                  <div style={{ display: 'grid', gap: '16px' }}>
                    {selectedCourse.clos.map(clo => (
                      <div key={clo.id} style={{ background: colors.bg, padding: '16px', borderRadius: '8px', border: `1px solid ${colors.border}` }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                          <div>
                            <h3 style={{ margin: '0 0 8px 0', fontSize: '14px', fontWeight: '600' }}>{clo.name}</h3>
                            <div style={{ fontSize: '12px', color: colors.textAlt }}>Evidence files: {clo.evidence?.length || 0}</div>
                          </div>
                          <button style={{ padding: '6px 12px', background: colors.success, color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '12px', fontWeight: '500' }}>
                            📁 Upload Evidence
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div style={{ background: colors.surface, padding: '40px', borderRadius: '12px', border: `1px solid ${colors.border}`, textAlign: 'center' }}>
                  <div style={{ fontSize: '14px', color: colors.textAlt }}>Select a course to upload evidence</div>
                </div>
              )}
            </div>
          )}

          {/* CREDENTIALS */}
          {currentView === 'credentials' && (
            <div>
              <h1 style={{ margin: '0 0 24px 0', fontSize: '28px', fontWeight: '700' }}>Industry Credentials & Badges</h1>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '16px' }}>
                {programs.map(prog => (
                  <div key={prog.id} style={{ background: colors.surface, padding: '20px', borderRadius: '12px', border: `1px solid ${colors.border}` }}>
                    <h3 style={{ margin: '0 0 12px 0', fontSize: '16px', fontWeight: '600' }}>{prog.abbr}</h3>
                    <div style={{ fontSize: '12px', color: colors.textAlt, marginBottom: '12px' }}>{prog.name}</div>
                    <div style={{ fontSize: '12px', fontWeight: '600', marginBottom: '8px' }}>Aligned Credentials:</div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                      {prog.industry.map(cred => (
                        <span key={cred} style={{ background: colors.primary, color: 'white', padding: '4px 10px', borderRadius: '12px', fontSize: '11px', fontWeight: '600' }}>
                          🏅 {cred}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* REPORTS */}
          {currentView === 'reports' && (
            <div>
              <h1 style={{ margin: '0 0 24px 0', fontSize: '28px', fontWeight: '700' }}>Reports & Compliance</h1>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div style={{ background: colors.surface, padding: '20px', borderRadius: '12px', border: `1px solid ${colors.border}` }}>
                  <h3 style={{ margin: '0 0 12px 0', fontSize: '16px', fontWeight: '600' }}>📄 HLC SSAR Report</h3>
                  <p style={{ fontSize: '12px', color: colors.textAlt, margin: '0 0 12px 0' }}>Generate Self-Study Report for HLC submission</p>
                  <button style={{ width: '100%', padding: '8px', background: colors.primary, color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: '500' }}>
                    📥 Generate & Download SSAR
                  </button>
                </div>
                
                <div style={{ background: colors.surface, padding: '20px', borderRadius: '12px', border: `1px solid ${colors.border}` }}>
                  <h3 style={{ margin: '0 0 12px 0', fontSize: '16px', fontWeight: '600' }}>📊 ODHE Data Export</h3>
                  <p style={{ fontSize: '12px', color: colors.textAlt, margin: '0 0 12px 0' }}>Export data to Ohio reporting portal</p>
                  <button style={{ width: '100%', padding: '8px', background: colors.success, color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: '500' }}>
                    📤 Export ODHE CSV
                  </button>
                </div>

                <div style={{ background: colors.surface, padding: '20px', borderRadius: '12px', border: `1px solid ${colors.border}` }}>
                  <h3 style={{ margin: '0 0 12px 0', fontSize: '16px', fontWeight: '600' }}>✅ HLC Compliance Checklist</h3>
                  <p style={{ fontSize: '12px', color: colors.textAlt, margin: '0 0 12px 0' }}>Track HLC accreditation requirements</p>
                  <button style={{ width: '100%', padding: '8px', background: colors.warning, color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: '500' }}>
                    📋 View Checklist
                  </button>
                </div>

                <div style={{ background: colors.surface, padding: '20px', borderRadius: '12px', border: `1px solid ${colors.border}` }}>
                  <h3 style={{ margin: '0 0 12px 0', fontSize: '16px', fontWeight: '600' }}>📈 Program Analytics</h3>
                  <p style={{ fontSize: '12px', color: colors.textAlt, margin: '0 0 12px 0' }}>View CLO achievement rates and trends</p>
                  <button style={{ width: '100%', padding: '8px', background: colors.primary, color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: '500' }}>
                    📊 View Analytics
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

export default CompassEnterprise;
