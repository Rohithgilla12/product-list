import React from "react";
import { useDispatch } from "react-redux";
import { Company } from "./companySlice";
import { Grid } from "@material-ui/core";
import { CompanyCard } from "./company.styles";
import { getSelectedProducts, setSelectedCompany } from "../product/productSlice";
import { Link } from "react-router-dom";

export function CompaniesList(props: { companies: Array<Company> | undefined; }) {
	const { companies } = props;
	const dispatch = useDispatch();
	return (
		<>
			{companies?.map((company) => (
				<Grid item xs={6} md={3} key={company.id}>
					<Link to="/products">
						<CompanyCard
							key={company.id}
							onClick={() => {
								dispatch(setSelectedCompany(company.id));
								dispatch(getSelectedProducts());
							}}>
							{company.name}
						</CompanyCard>
					</Link>
				</Grid>
			))}
		</>
	);
}
