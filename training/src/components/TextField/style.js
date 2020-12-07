import styled, { css} from 'styled-components';
const Div = styled.div`
    padding: 10px;
    `;
const Input = styled.input`
    width:100%;
    padding: 10px;
    border: 2px blue
    ${(props) => props.error
        && css`
        border: 1px solid red;
        color: green;
        `};
        `;
    
const Error = styled.p`
    color: red;
    `;


    export { Div, Input, Error };
    