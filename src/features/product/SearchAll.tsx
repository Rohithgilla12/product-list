import { Grid, TextField } from "@material-ui/core";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { SearchWrapper } from "../company/company.styles";
import { Product, allSearchResults, searchAll } from "./productSlice";
import { ProductsList } from "./ProductsList";


export function SearchAll() {
	const products: Array<Product> | undefined = useSelector(allSearchResults);
	const dispatch = useDispatch();

	return (
		<Grid container>
			<SearchWrapper>
				<TextField
					fullWidth
					style={{
						color: "#eeeeee"
					}}
					margin="normal"
					variant="outlined"
					placeholder="Search for all products"
					label="Search all"
					hiddenLabel={true}
					InputLabelProps={{
						shrink: true,
					}}
					onChange={(event) => {
						dispatch(searchAll(event.target.value));
					}}
				/>
			</SearchWrapper>
			<ProductsList products={products} />
		</Grid>
	);
}
