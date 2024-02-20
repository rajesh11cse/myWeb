import styled from "styled-components";

// export const DropdownCont = styled.div` .divider-line {
//   border-top: 1px solid #ccc; /* You can adjust the color and thickness */
//   margin: 16px 0; /* Adjust margin as needed */
// }

export const DivCont = styled.div`
  top: 34px;
  direction: initial;
  position: relative;
  /* border: 1px solid #6f6b6b; */
  // margin: 8px;
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
  color: black;
  font-size: 13px;
  font-weight: normal;
}
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
    &:after {
      margin-left: ${(props) => props.aml || "3em"};
    }
    &:focus {
      box-shadow: none !important;
    }
  }
`;

export const ButtonGroupCont = styled.div`
  button {
    background-color: #fff;
    color: black;
    font-size: 13px;
    border: 1px solid #c0c0c0;
    border-radius: 3px
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
  position: fixed;
  right: 0;
  width: 355px;
  height: 31px;
  background-color: #69b3fd;
  /* border: 1px solid #757272; */
  /* border-radius: 2px; */
  z-index: 8;
  text-align: left;
  padding: 5px;
  font-size: small;
  font-weight: 800;
  font-family: sans-serif;
  color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 1px;
`;

export const ColorPickCont = styled.div`
  position: absolute;
  z-index: 10;
  left: 70px;
`;
