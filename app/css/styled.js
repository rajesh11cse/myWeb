import styled from "styled-components";

// export const DropdownCont = styled.div` .divider-line {
//   border-top: 1px solid #ccc; /* You can adjust the color and thickness */
//   margin: 16px 0; /* Adjust margin as needed */
// }

export const DivCont = styled.div`
  direction: initial;
  position: relative;
  // background-color: #eff0f1;
  background-color: #fff;
`;

export const TextAreaCont = styled.div`
  textarea {
    font-family: monospace;
    color: #272727e3;
    &:focus {
      box-shadow: none !important;
    }
  }
`;

export const Divider = styled.div`
  border-top: 1px solid #ccc;
  margin: 16px 0;
`;

export const Text = styled.div`
  text-align: Left;
  // width: ${(props) => props.w || "258px"};
  margin-top: 6px;
  margin-bottom: 3px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif,
    "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  line-height: 1.5;
  color: #607489;
  font-size: 13px;
  font-weight: normal;
`;

export const DropdownCont = styled.div`
  div button {
    width: -webkit-fill-available;
    background-color: #fff;
    color: black;
    font-size: 13px;
    border: 1px solid #c0c0c0;
    border-radius: 3px
    width: 100%;
    &:hover {
      color: black;
      background-color: #607489;
      border-color: #607489;
    }
    &:after {
      margin-left: ${(props) => props.aml || "3em"};
    }
    &:focus {
      box-shadow: none !important;
    }
  }
`;

export const FormInputCont = styled.div`
  input {
    width: -webkit-fill-available;
    background-color: #fff;
    color: black;
    font-size: 13px;
    border: 1px solid #c0c0c0;
    border-radius: 3px
    width: 100%;
    // &:hover {
    //   color: black;
    //   background-color: #607489;
    //   border-color: #607489;
    // }
    // &:after {
    //   margin-left: ${(props) => props.aml || "3em"};
    // }
    &:focus {
      box-shadow: none !important;
    }
  }
`;

export const RangeSlider = styled.div`
  position: relative;
  top: ${(props) => props.top || "28%"};
  left: ${(props) => props.left || "16%"};
  transform: ${(props) => props.transform || "translate(-24%, -50%)"};
  width: 100%;
  display: flex;
  align-items: center;

  input[type="range"] {
    -webkit-appearance: none !important;
    border-radius: 9px;
    width: 100%;
    height: ${(props) => props.lineSize || "4px"};
    background: #9c9c9c;
    border: none;
    outline: none;
  }

  input[type="range"]::-webkit-slider-thumb {
    top: -6px;
    position: relative;
    -webkit-appearance: none !important;
    width: 15px;
    height: 15px;
    background: #fff;
    border: 2px solid #344cff;
    border-radius: 50%;
    cursor: pointer;
  }

  input[type="range"]::-webkit-slider-thumb:hover {
    background: #fff;
  }

  input[type="range"]::-webkit-slider-runnable-track {
    background: linear-gradient(
      to right,
      #344cff ${(props) => props.value || 0}%,
      #9c9c9c ${(props) => props.value || 0}%,
      #9c9c9c
    );
    height: ${(props) => props.lineSize || "4px"};
    border-radius: 9px;
  }
`;


export const ZoomLevelValueCont = styled.div`
    position: absolute;
    font-size: x-small;
    font-weight: 500;
    right: 0;
`

export const ZoomLevelResetCont = styled.div`
  left: -50px;
  position: relative;
  font-size: x-small;
  font-weight: 500;
`

export const ButtonGroupCont = styled.div`
  button {
    background-color: #fff;
    color: black;
    font-size: 13px;
    border: 1px solid #c0c0c0;
    border-radius: 3px
    &:hover {
      color: black;
      background-color: #607489;
      border-color: #60748;
      z-index: 0;
    }
    &:after {
      margin-left: ${(props) => props.aml || "3em"};
    }
    &:focus {
      box-shadow: none !important;
    }
  }
`;

export const InputGroupCont = styled.div`
  div input,
  button {
    background-color: #fff;
    color: black;
    font-size: 13px;
    border: 1px solid #c0c0c0;
    border-radius: 3px;
    &:hover {
      color: black;
      background-color: #607489;
      border-color: #607489;
    }
    &:focus {
      box-shadow: none !important;
    }
  }
  div input {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }
  button {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    border-left: unset;
  }
`;

export const WordEditCont = styled.div`
  position: sticky;
  top: 7px;
  height: 43px;
  background-color: #545456;
  z-index: 8;
  text-align: left;
  padding: 13px;
  font-size: small;
  font-weight: 800;
  font-family: arial;
  text-overflow: ellipsis;
  color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  // border-bottom: 1px solid gray;
  // border-radius: 1 0 3px 3px;
  margin-bottom: 13px;
  display: flex;
  // justifyContent: 'space-between';
  .header_p {
    width: 80%;
  }
  .close_p {
    width: 20%;
    text-align: end;
  }
`;

export const ColorPickCont = styled.div`
  position: absolute;
  z-index: 10;
  left: 70px;
`;

//   top: 90%;
//   left: 14%;
//   z-index: 10;
// `;

export const ZoomInCont = styled.div`
  position: absolute;
  z-index: 12;
  bottom: 20px;
  background-color: rgb(255, 255, 255);
  box-shadow: rgba(0, 0, 0, 0.08) 0px 0px 20px 0px;
  padding: 0px;
  text-align: center;
  border-radius: 8px;
  div {
    min-height: 40px;
    font-size: 12px;
    padding: 10px 4px;
    min-width: 36px;
  }
  button {
    font-family: Circular, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
      Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue",
      sans-serif;
    font-size: 15px;
    padding: 9px 12px;
    font-weight: 400;
    border-radius: 4px;
    border: 4px;
    cursor: pointer;
    opacity: 1;
    pointer-events: inherit;
    background-color: transparent;
    color: rgb(115, 113, 113);
    width: unset;
    user-select: none;
    transition: all 0.15s ease 0s;
    display: inline-flex;
    flex-direction: row;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: center;
    justify-content: center;
    vertical-align: middle;
    background-color: rgb(251, 251, 254);
    width: 36px;
    border-top: 1px solid rgb(242, 242, 246);
    border-bottom: 1px solid rgb(242, 242, 246);
    padding: 0px;
    width: 40px;
    height: 30px;
    &:hover {
      background-color: transparent;
      color: red;
    }
    .zoom-icon {
      width: 24px;
      height: 24px;
    }
  }
`;

export const CBtn = styled.button`
  cursor: pointer;
  background-color: #fff;
  color: black;
  font-size: 13px;
  border: 1px solid #c0c0c0;
  border-radius: 3px
  :hover {
    color: black;
    background-color: red;
    border-color: #607489;
  }
  &:after {
    margin-left: ${(props) => props.aml || "3em"};
  }
  &:focus {
    box-shadow: none !important;
  }
`;

export const TopPanelCon = styled.div`
  position: fixed;
  top: 72px;;
  left: 0;
  width: 100%;
  height: 49px;
  padding: 8px;
  background-color: #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  /* border: 1px solid gray; */
  z-index: 10;
`;

export const NewPageDashLineCon = styled.div`
  top: -3px;
  position: relative;
  display: inline-block;
  width: 156px;
  border-top: 1px dashed #6c757d;
`;

export const DeletePageCon = styled.div`
  position: absolute;
  cursor: pointer;
  width: 600px;
  top: -27px;
  right: -278px;
  svg {
    &:hover {
      color: black;
    }
  }
`;

export const ShowPanel = styled.div`
  position: relative;
  top: 11px;
  height: 22px;
  width: 0;
`;
