import React from 'react';
import Card from './Card';

const KPICard = ({ label, value, meta, icon: Icon }) => (
  <Card className="p-5">
    <div className="mb-3 flex items-center justify-between">
      <p className="text-sm font-medium text-slate-500">{label}</p>
      {Icon ? <Icon size={18} className="text-compass-700" /> : null}
    </div>
    <p className="text-3xl font-semibold text-slate-900">{value}</p>
    <p className="mt-1 text-sm text-compass-700">{meta}</p>
  </Card>
);

export default KPICard;
