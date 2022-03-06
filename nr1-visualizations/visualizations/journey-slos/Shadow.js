import React from 'react'

const Shadow = ({ id }) => (
  <filter id={id} x0='-50%' y0='-50%' width='200%' height='200%'>
    <feGaussianBlur in='SourceAlpha' stdDeviation='25' result='blur' />
    <feOffset dy='20' dx='20' />
    <feComposite
      in2='SourceAlpha'
      operator='arithmetic'
      k2='-1'
      k3='1'
      result='shadowDiff'
    />

    <feFlood floodColor='rgba(0,0,0,0.5)' floodOpacity='0.9' />
    <feComposite in2='shadowDiff' operator='in' />
    <feComposite in2='SourceGraphic' operator='over' result='firstfilter' />

    <feGaussianBlur in='firstfilter' stdDeviation='25' result='blur2' />
    <feOffset dy='10' dx='0' />
    <feComposite
      in2='firstfilter'
      operator='arithmetic'
      k2='-1'
      k3='1'
      result='shadowDiff'
    />

    <feFlood floodColor='rgba(0,0,0,0.5)' floodOpacity='0.9' />
    <feComposite in2='shadowDiff' operator='in' />
    <feComposite in2='firstfilter' operator='over' />
  </filter>
)

export default Shadow;
