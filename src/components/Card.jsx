import React from 'react';

const Card = ({ className = '', children }) => (
  <div className={`rounded-xl border border-slate-200 bg-white p-6 shadow-soft ${className}`}>
    {children}
  </div>
);

export default Card;
