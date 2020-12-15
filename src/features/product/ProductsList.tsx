import { Grid, Typography } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { CompanyCard } from "../company/company.styles";
import { selectCompanies } from "../company/companySlice";
import { Product } from "./productSlice";

export function ProductsList(props: { products: Array<Product> | undefined; }) {
	const { products } = props;
	const companies = useSelector(selectCompanies);
	return (
		<>
			{products?.map((product) => {
				const companyName = companies.filter((company) => company.id === product.companyId)[0].name;
				return (
					<Grid item xs={12} md={3} key={product.id}>
						<CompanyCard>
							<ProductWrapper key={product.id}>
								<Typography variant="subtitle1">Name: {product.name}</Typography>
								<Typography variant="subtitle1">Packing: {product.packing}</Typography>
								<Typography variant="subtitle1">Company: {companyName}</Typography>
							</ProductWrapper>
						</CompanyCard>
					</Grid>
				);
			})}
		</>
	);
}


export const ProductWrapper = styled.div`
    display: flex;
		flex-direction: column;
		align-items: flex-start;
`;
