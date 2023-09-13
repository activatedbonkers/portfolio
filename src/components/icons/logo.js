import React from 'react';

const IconLogo = () => {
  const logoStyles = {
    '--stroke-color': 'currentColor',
    '--font-family': 'Consolas, serif',
    '--font-size': '50px',
  };

  return (
    <svg
      id="logo"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      viewBox="0 0 84 96"
      style={logoStyles}>
      <title>Logo</title>
      <g transform="translate(-8.000000, -2.000000)">
        <g transform="translate(11.000000, 5.000000)">
          <polygon
            id="Shape"
            stroke="var(--stroke-color)"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
            points="39 0 0 22 0 67 39 90 78 68 78 23"
          />
        </g>
      </g>
      <text
        x="28"
        y="65"
        fill="var(--stroke-color)"
        fontSize="50px"
        fontFamily="var(--font-sand)"
        fontWeight="600">
        S
      </text>
    </svg>
  );
};

export default IconLogo;
