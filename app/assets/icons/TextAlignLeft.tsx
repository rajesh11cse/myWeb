import React from "react";

interface IconProps extends React.SVGAttributes<HTMLOrSVGElement> {
  size?: number;
}

export const TextAlignLeft: React.FC<IconProps> = ({ size = 18 }) => {
  return (
    <svg
      width="18px"
      height="18px"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        {" "}
        <g id="Edit / Text_Align_Left">
          {" "}
          <path
            id="Vector"
            d="M4 18H14M4 14H20M4 10H14M4 6H20"
            stroke="#000000"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>{" "}
        </g>{" "}
      </g>
    </svg>
  );
};
