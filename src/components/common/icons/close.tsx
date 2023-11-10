import React from 'react';

interface CloseIconProps {
  width: number;
  height: number;
  fill: string;
  stroke: string;
}

export function CloseIcon(props: CloseIconProps) {
  const { width, height, fill, stroke } = props;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill={fill}>
      <path
        d="M7 7L17 17M7 17L17 7"
        stroke={stroke}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
