import React, { useState } from 'react';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { Plus, Download, Activity, FolderCheck, Users, Clock3 } from 'lucide-react';
import Button from './components/Button';
import Card from './components/Card';
import KPICard from './components/KPICard';
import Navigation from './components/Navigation';
import Modal from './components/Modal';
import Table from './components/Table';

const PROGRAM_DATA = {
  name: 'AAS Cybersecurity & Network Systems',
  director: 'Norma DePriest',
  hlcVisit: 'November 30, 2026',
  courses: [
    { code: 'CYBR-1100', name: 'Security Awareness', credits: 3, bearing: false },
    { code: 'NET-1111', name: 'Introduction to Networking', credits: 4, bearing: false },
    { code: 'NET-1120', name: 'Computer Hardware & Operating Systems', credits: 3, bearing: false },
    { code: 'CYBR-1200', name: 'Security+ Certification', credits: 3, bearing: false },
    { code: 'CS-1140', name: 'UNIX/Linux', credits: 3, bearing: false },
    { code: 'NET-1112', name: 'Cyber Defense', credits: 4, bearing: false },
    { code: 'CYBR-2100', name: 'Cyber Ethics & Cyber Law', credits: 3, bearing: true },
    { code: 'CYBR-2101', name: 'Python Essentials (SL)', credits: 3, bearing: true },
    { code: 'NET-2220', name: 'Server Management', credits: 3, bearing: false },
    { code: 'CYBR-2102', name: 'Cyber Operations', credits: 3, bearing: false },
    { code: 'CYBR-2200', name: 'Network Analysis', credits: 3, bearing: false },
    { code: 'CYBR-2201', name: 'Ethical Hacking', credits: 3, bearing: false },
    { code: 'CYBR-2600', name: 'Cyber Security & Network Practicum', credits: 2, bearing: true },
    { code: 'NET-2650', name: 'Network Systems Security (Capstone)', credits: 3, bearing: true }
  ],
  plos: [
    { id: 'PLO1', name: 'Systems Design & Operations' },
    { id: 'PLO2', name: 'Data Management & Analytics' },
    { id: 'PLO3', name: 'Security & Risk Mitigation' },
    { id: 'PLO4', name: 'Technical Problem Solving' },
    { id: 'PLO5', name: 'Ethical & Professional Practice' },
    { id: 'PLO6', name: 'Professional Communication' }
  ]
};

const ASSESSMENT_DATA = {
  PLO1: { target: 80, achieved: 83 },
  PLO2: { target: 80, achieved: 67 },
  PLO3: { target: 80, achieved: 79 },
  PLO4: { target: 80, achieved: 83 },
  PLO5: { target: 80, achieved: 0 },
  PLO6: { target: 80, achieved: 0 }
};

const TABS = [
  { id: 'dashboard', label: '📊 Dashboard' },
  { id: 'plans', label: '📋 Plans' },
  { id: 'evidence', label: '📤 Evidence' },
  { id: 'reports', label: '📊 Reports' }
];

const chartTheme = {
  axis: '#64748B',
  grid: '#E2E8F0',
  tooltipBackground: '#FFFFFF',
  tooltipBorder: '#CBD5E1',
  achievement: '#0F766E',
  target: '#94A3B8'
};

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
    <div className="space-y-8">
      <header className="space-y-3">
        <h2 className="text-4xl font-bold tracking-tight text-compass-800 sm:text-5xl">Compass Platform</h2>
        <p className="text-lg text-slate-600">HLC Accreditation Assessment Management System</p>
        <p className="text-sm text-slate-500">
          {PROGRAM_DATA.name} • Program Director: {PROGRAM_DATA.director}
        </p>
        <p className="inline-flex rounded-full bg-amber-50 px-3 py-1 text-sm font-medium text-amber-700">
          ⚠️ HLC Visit: {PROGRAM_DATA.hlcVisit} (82 days)
        </p>
      </header>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <KPICard label="Programs PLOs Met" value="4/6" meta="67%" icon={Activity} />
        <KPICard label="Evidence Collected" value="80/100" meta="80%" icon={FolderCheck} />
        <KPICard label="Faculty Engaged" value="14/14" meta="100%" icon={Users} />
        <KPICard label="Days to HLC" value="82" meta="Ready Mode" icon={Clock3} />
      </section>

      <section className="grid gap-6 xl:grid-cols-2">
        <Card>
          <h3 className="mb-4 text-xl font-semibold text-compass-800">PLO Achievement 2025-26</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={metricsData}>
              <CartesianGrid strokeDasharray="3 3" stroke={chartTheme.grid} />
              <XAxis dataKey="name" stroke={chartTheme.axis} />
              <YAxis stroke={chartTheme.axis} />
              <Tooltip
                contentStyle={{
                  backgroundColor: chartTheme.tooltipBackground,
                  border: `1px solid ${chartTheme.tooltipBorder}`,
                  borderRadius: '8px'
                }}
              />
              <Legend />
              <Bar dataKey="achievement" fill={chartTheme.achievement} name="Achievement %" />
              <Bar dataKey="target" fill={chartTheme.target} name="Target %" />
            </BarChart>
          </ResponsiveContainer>
          <p className="mt-4 rounded-lg bg-compass-50 px-3 py-2 text-sm text-compass-800">
            ✓ 4 PLOs exceeding targets | 2 PLOs pending completion
          </p>
        </Card>

        <Card>
          <h3 className="mb-4 text-xl font-semibold text-compass-800">Assessment Trend (3-Year)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" stroke={chartTheme.grid} />
              <XAxis dataKey="year" stroke={chartTheme.axis} />
              <YAxis stroke={chartTheme.axis} domain={[0, 100]} />
              <Tooltip
                contentStyle={{
                  backgroundColor: chartTheme.tooltipBackground,
                  border: `1px solid ${chartTheme.tooltipBorder}`,
                  borderRadius: '8px'
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="achievement"
                stroke={chartTheme.achievement}
                strokeWidth={3}
                dot={{ fill: chartTheme.achievement, r: 5 }}
                name="Average PLO Achievement"
              />
            </LineChart>
          </ResponsiveContainer>
          <p className="mt-4 rounded-lg bg-emerald-50 px-3 py-2 text-sm text-emerald-700">
            ↑ Consistent improvement: 75% → 78% → 77% (mature cycle)
          </p>
        </Card>
      </section>

      <Card>
        <h3 className="mb-4 text-xl font-semibold text-compass-800">14 Courses - Assessment Status</h3>
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {PROGRAM_DATA.courses.map((course) => (
            <div key={course.code} className="rounded-lg border border-slate-200 bg-slate-50 p-4 transition hover:border-compass-300 hover:bg-compass-50">
              <p className="text-sm font-semibold text-compass-800">{course.code}</p>
              <p className="mt-1 text-sm text-slate-700">{course.name}</p>
              {course.bearing ? <p className="mt-2 text-xs font-medium text-amber-700">🎯 Load-Bearing</p> : null}
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

const PlansView = () => {
  const columns = [
    { key: 'code', header: 'Course' },
    { key: 'name', header: 'Course Name' },
    { key: 'credits', header: 'Credits' },
    {
      key: 'bearing',
      header: 'Classification',
      render: (course) =>
        course.bearing ? (
          <span className="rounded-full bg-amber-100 px-2 py-1 text-xs font-medium text-amber-800">Load-Bearing</span>
        ) : (
          <span className="rounded-full bg-slate-100 px-2 py-1 text-xs font-medium text-slate-700">Supporting</span>
        )
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-3xl font-bold text-compass-800">Assessment Plans</h2>
        <Button>
          <Plus size={16} />
          New Plan
        </Button>
      </div>

      <Table columns={columns} data={PROGRAM_DATA.courses} />

      <Card className="border-amber-200 bg-amber-50">
        <p className="text-sm font-semibold text-amber-800">📅 Institutional Deadline: September 30, 2026</p>
        <p className="mt-1 text-sm text-amber-700">
          All 14 assessment plans must be submitted and approved by this date for HLC compliance.
        </p>
      </Card>
    </div>
  );
};

const EvidenceView = () => {
  const [previewOpen, setPreviewOpen] = useState(false);

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-compass-800">Evidence Collection</h2>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {Object.entries(ASSESSMENT_DATA).map(([plo, data]) => {
          const progress = data.achieved;

          return (
            <Card key={plo} className="p-4">
              <div className="mb-2 flex items-center justify-between">
                <p className="text-sm font-semibold text-compass-800">{plo}</p>
                <span className={`text-sm font-semibold ${data.achieved >= data.target ? 'text-emerald-600' : 'text-amber-600'}`}>
                  {data.achieved}%
                </span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200">
                <div className="h-full rounded-full bg-compass-600 transition-all duration-300" style={{ width: `${progress}%` }} />
              </div>
            </Card>
          );
        })}
      </div>

      <Card className="border-2 border-dashed border-compass-300 bg-compass-50 text-center">
        <p className="text-base font-semibold text-slate-800">Drag & drop student artifacts here</p>
        <p className="mt-1 text-sm text-slate-600">Or click to select files</p>
        <Button className="mt-4" variant="secondary" onClick={() => setPreviewOpen(true)}>
          Select Files
        </Button>
      </Card>

      <Modal isOpen={previewOpen} title="Evidence Upload" onClose={() => setPreviewOpen(false)}>
        <p className="text-sm text-slate-600">Upload workflow coming soon.</p>
      </Modal>
    </div>
  );
};

const ReportsView = () => {
  const findings = [
    { plo: 'PLO1', result: '83%', target: '80%', status: 'Exceeds' },
    { plo: 'PLO2', result: '67%', target: '80%', status: 'Below Target' },
    { plo: 'PLO3', result: '79%', target: '80%', status: 'Near Target' },
    { plo: 'PLO4', result: '83%', target: '80%', status: 'Exceeds' },
    { plo: 'PLO5', result: 'Pending', target: '80%', status: 'Collection underway' },
    { plo: 'PLO6', result: 'Pending', target: '80%', status: 'Collection underway' }
  ];

  const columns = [
    { key: 'plo', header: 'PLO' },
    { key: 'result', header: 'Result' },
    { key: 'target', header: 'Target' },
    { key: 'status', header: 'Status' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-3xl font-bold text-compass-800">Assessment Reports</h2>
        <Button>
          <Download size={16} /> Export APAR
        </Button>
      </div>

      <Card>
        <h3 className="text-xl font-semibold text-compass-800">APAR Report Preview (2025-26)</h3>
        <div className="mt-4 space-y-4 text-sm text-slate-700">
          <div>
            <p className="font-semibold text-slate-900">Executive Summary</p>
            <p className="mt-1">
              The AAS Cybersecurity & Network Systems program demonstrates consistent achievement of program
              learning outcomes, with 4 of 6 PLOs meeting or exceeding the 80% target performance level.
            </p>
          </div>
          <div>
            <p className="mb-2 font-semibold text-slate-900">Key Findings</p>
            <Table columns={columns} data={findings} />
          </div>
          <Button variant="outline">Export PDF</Button>
        </div>
      </Card>
    </div>
  );
};

const CompassProduction = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="min-h-screen bg-slate-50">
      <Navigation tabs={TABS} activeTab={activeTab} onTabChange={setActiveTab} />

      <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {activeTab === 'dashboard' && <DashboardView />}
        {activeTab === 'plans' && <PlansView />}
        {activeTab === 'evidence' && <EvidenceView />}
        {activeTab === 'reports' && <ReportsView />}
      </main>
    </div>
  );
};

export default CompassProduction;
