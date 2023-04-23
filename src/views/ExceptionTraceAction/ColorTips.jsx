import React from 'react';

export default function ColorTips(props) {
  const { isMoving } = props;
  const list = !isMoving ? [...commonlist] : [...movingList];
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
    color: '#f71735',
    name: '二次私售任务',
  },
  {
    color: '#2791cd',
    name: '超过3日未上线任务',
  },
];
const movingList = [
  {
    color: '#f71735',
    name: '私售任务',
  },
  {
    color: '#2791cd',
    name: '超过3日未上线任务',
  },
];
