import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
	getCompaniesData,
	selectCompanies,
	isGettingCompanies,
	searchCompanies,
	searchResults,
} from "./companySlice";

import { Grid, TextField } from "@material-ui/core";
import Loader from "react-loader-spinner";
import { CompanyWrapper, SearchWrapper } from "./company.styles";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { CompaniesList } from "./CompaniesList";

export function CompanyList() {
	const companies = useSelector(selectCompanies);
	const loading = useSelector(isGettingCompanies);
	const searchedCompanies = useSelector(searchResults);
	const dispatch = useDispatch();
	const [query, setQuery] = useState("");

	useEffect(() => {
		if (companies.length === 0) dispatch(getCompaniesData());
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	if (loading) {
		return <Loader type="TailSpin" color="#00adb5" height={80} width={80} />;
	}

	return (
		<CompanyWrapper>
			<SearchWrapper>
				<TextField
					fullWidth
					style={{
						color: "#eeeeee"
					}}
					margin="normal"
					// label="Search"
					variant="outlined"
					placeholder="Search for companies"
					InputLabelProps={{
						shrink: true,
					}}
					onChange={(event) => {
						setQuery(event.target.value);
						dispatch(searchCompanies(event.target.value));
					}}
				/>
			</SearchWrapper>
			<Grid container spacing={3}>
				{query === ""
					? <CompaniesList companies={companies} />
					: <CompaniesList companies={searchedCompanies} />
				}
			</Grid>
		</CompanyWrapper>
	);
}
