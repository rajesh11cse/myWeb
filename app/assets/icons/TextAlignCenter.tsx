import React from "react";

interface IconProps extends React.SVGAttributes<HTMLOrSVGElement> {
  size?: number;
}

export const TextAlignCenter: React.FC<IconProps> = ({ size = 18 }) => {
  return (
    <svg
      width="18px"
      height="18px"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        stroke-linecap="round"
        stroke-linejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        {" "}
        <g id="Edit / Text_Align_Center">
          {" "}
          <path
            id="Vector"
            d="M17 18H7M20 14H4M17 10H7M20 6H4"
            stroke="#000000"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></path>{" "}
        </g>{" "}
      </g>
    </svg>
  );
};
