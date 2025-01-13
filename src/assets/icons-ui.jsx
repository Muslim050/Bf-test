import React from 'react'

const SvgComponent = ({ children, className, ...props }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
    {children}
  </svg>
)


export const OpenSvg = (props) => (
  <SvgComponent
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    {...props}
  >
    <path
      d="M2.5 12C2.5 7.52166 2.5 5.28249 3.89124 3.89124C5.28249 2.5 7.52166 2.5 12 2.5C16.4783 2.5 18.7175 2.5 20.1088 3.89124C21.5 5.28249 21.5 7.52166 21.5 12C21.5 16.4783 21.5 18.7175 20.1088 20.1088C18.7175 21.5 16.4783 21.5 12 21.5C7.52166 21.5 5.28249 21.5 3.89124 20.1088C2.5 18.7175 2.5 16.4783 2.5 12Z"
      stroke="currentcolor"
      strokeWidth="1.5"
    />
    <path
      d="M14.0051 7L16 9M16 9L14.0051 11M16 9C13.1739 8.83333 7.62142 10.2 8.0204 17"
      stroke="currentcolor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </SvgComponent>
)

