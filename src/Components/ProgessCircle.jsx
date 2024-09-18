import React from 'react';

const CircleProgress = ({ percentage }) => {
  const radius = 30; 
  const strokeWidth = 3; 
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <svg
      width={radius * 2}
      height={radius * 2}
      viewBox={`0 0 ${radius * 2} ${radius * 2}`}
      xmlns="http://www.w3.org/2000/svg"
    >
    
      <circle
        cx={radius}
        cy={radius}
        r={radius - strokeWidth / 2}
        stroke="white"
        strokeWidth={strokeWidth}
        fill="none"
      />
     
      <circle
        cx={radius}
        cy={radius}
        r={radius - strokeWidth / 2}
        stroke="green"
        strokeWidth={strokeWidth}
        fill="none"
        strokeDasharray={circumference}
        strokeDashoffset={strokeDashoffset}
        transform={`rotate(-90 ${radius} ${radius})`}
      />
      
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dy=".3em"
        fontSize="14px"
        fill="black"

      >
        {percentage}%
      </text>
    </svg>
  );
};

export default CircleProgress;
