import styled from "styled-components";

export const DropdownCont = styled.div`
div button{
  text-align: justify;
  width: ${props => props.w || '258px'};
  height:28px;
  padding-top: 2px;
  background-color: #fff;
  color: black;
  font-size: 15px;
  border: none;
  &:after{
    margin-left: ${props => props.aml || '9.255em'};
  }
  }
}
`;
