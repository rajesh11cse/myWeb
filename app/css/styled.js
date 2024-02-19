import styled from "styled-components";

// export const DropdownCont = styled.div` .divider-line {
//   border-top: 1px solid #ccc; /* You can adjust the color and thickness */
//   margin: 16px 0; /* Adjust margin as needed */
// }

export const DivCont = styled.div`
  direction: initial;
  position: relative;
  border: 1px solid #bfb9b9;
  margin: 8px;
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
    ${(props) => (props.w ? `width: ${props.w}` : null)};
    background-color: #fff;
    color: black;
    font-size: 13px;
    border: none;
    &:after {
      margin-left: ${(props) => props.aml || "3em"};
    }
  }
`;

export const ButtonGroupCont = styled.div`
  button {
    background-color: #fff;
    color: black;
    font-size: 13px;
    border: none;
    &:after {
      margin-left: ${(props) => props.aml || "3em"};
    }
  }
`;

export const InputGroupCont = styled.div`
  div input,
  button {
    font-size: 13px;
    border: none;
    border-radius: unset;
  }
`;
