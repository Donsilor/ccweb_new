import React from 'react';

export default function ColorTips() {
  const list = commonlist;
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      {list.map((item, index) => (
        <div style={{ display: 'flex', alignItems: 'center', marginRight: 10 }} key={index}>
          <div style={{ width: 30, height: 20, backgroundColor: item.color, borderRadius: 5, marginRight: 5 }} />
          <span style={{ fontSize: 12 }}>{item.name}</span>
        </div>
      ))}
    </div>
  );
}

const commonlist = [
  {
    color: '#1da02b',
    name: '表现良好二网',
  },
  {
    color: '#cfb53b',
    name: '发动机舱抽查',
  },
  {
    color: '#007fff',
    name: 'B柱车架号抽查',
  },
];
