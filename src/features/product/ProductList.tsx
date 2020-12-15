import { Grid, TextField } from "@material-ui/core";
import React, { useState } from "react";
import Loader from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";
import { SearchWrapper } from "../company/company.styles";
import { Product, selectedProducts, isGettingProducts, searchProducts, searchResults } from "./productSlice";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { ProductsList } from "./ProductsList";


export function ProductList() {
	const products: Array<Product> | undefined = useSelector(selectedProducts);
	const searchedProducts: Array<Product> | undefined = useSelector(searchResults);

	const isLoading: boolean = useSelector(isGettingProducts);
	const dispatch = useDispatch();
	const [query, setQuery] = useState("");

	if (isLoading) {
		return <Loader type="TailSpin" color="#00adb5" height={80} width={80} />;
	}
	return (
		<Grid container>
			<SearchWrapper>
				<TextField
					fullWidth
					style={{
						color: "#eeeeee"
					}}
					margin="normal"
					// label="Search"
					variant="outlined"
					placeholder="Search for products"
					InputLabelProps={{
						shrink: true,
					}}
					onChange={(event) => {
						setQuery(event.target.value);
						dispatch(searchProducts(event.target.value));
					}}
				/>
			</SearchWrapper>
			{query === ""
				? <ProductsList products={products} />
				: <ProductsList products={searchedProducts} />
			}
		</Grid>
	);
}

