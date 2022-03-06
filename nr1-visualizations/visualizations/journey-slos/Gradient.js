import React from 'react'

const Gradient = ({ id, color }) => (
  <defs>
    <linearGradient id={id} x1="0%" y1="0%" x2="0%" y2="180%">
      <stop
        offset="0%"
        style={{
          stopColor: 'lightgrey',
          stopOpacity: 1
        }}
      />
      <stop
        offset="35%"
        style={{
          stopColor: color,
          stopOpacity: 1
        }}
      />
    </linearGradient>
  </defs>
)

export default Gradient;
