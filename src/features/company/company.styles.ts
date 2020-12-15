import styled from "styled-components";

export const CompanyWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
`;

export const CompanyCard = styled.div`
    margin: 1rem;
    padding: 1rem;
    background-color:#393e46;    
    font-size:0.6em;
    border-radius:16px;
    cursor:default;
    transition: box-shadow .3s;

    :hover{        
        box-shadow: 5px 5px black;
    }
`;

export const SearchWrapper = styled.div`
    margin: 1rem;
    padding: 1rem;
    width:100%;
    color:#eeeeee;
`;
