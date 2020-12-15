import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import FuzzySearch from "fuzzy-search";
import { algoliaIndex, firestoreInstance } from "../../app/constants";
import { AppThunk, RootState } from "../../app/store";

interface ProductState {
	readonly loading: boolean;
	readonly products: Record<string, Array<Product>>;
	readonly searchResults?: Array<Product>;
	readonly selectedCompanyId?: string;
	readonly allSearchResults?: Array<Product>;
}

export interface Product {
	readonly id: string;
	readonly companyId: string;
	readonly name: string;
	readonly packing: string;
}

const initialState: ProductState = {
	loading: false,
	products: {},
};

export const productSlice = createSlice({
	name: "product",
	initialState,
	reducers: {
		getProducts: (state, action: PayloadAction<Array<Product>>) => {
			if (state.selectedCompanyId !== undefined) {
				state.products[state.selectedCompanyId] = action.payload;
			}
			state.loading = false;
		},

		setLoading: (state, action: PayloadAction<boolean>) => {
			state.loading = action.payload;
		},

		setSelectedCompany: (state, action: PayloadAction<string>) => {
			state.selectedCompanyId = action.payload;
		},

		searchedProducts: (state, action: PayloadAction<Array<Product>>) => {
			state.searchResults = action.payload;
		},

		allSearchProducts: (state, action: PayloadAction<Array<Product>>) => {
			state.allSearchResults = action.payload;
		},

		clearSearchResults: (state) => {
			state.searchResults = [];
		}
	},
});

export const {
	getProducts,
	setLoading,
	setSelectedCompany,
	searchedProducts,
	allSearchProducts,
} = productSlice.actions;

export const searchAll = (query: string): AppThunk => (dispatch) => {
	var products: Array<Product> = [];
	algoliaIndex.search(query)
		.then(({ hits }) => {
			hits.forEach((rawProduct) => {
				const product = (rawProduct as any) as Product;
				products = products.concat(product);
			});
			dispatch(allSearchProducts(products));
		});
}

export const getSelectedProducts = (): AppThunk => (dispatch, getState) => {
	dispatch(setLoading(true));
	const currentState: ProductState = getState().product;
	var products: Array<Product> = [];
	firestoreInstance
		.collection("products")
		.orderBy("name")
		.where("companyId", "==", currentState.selectedCompanyId)
		.get()
		.then((documentSnapshot) => {
			documentSnapshot.forEach((document) => {
				if (document.exists) {
					const product = document.data() as Product;
					products = products.concat(product);
				}
			});
			dispatch(getProducts(products));
		});
};

export const searchProducts = (query: string): AppThunk => (
	dispatch,
	getState
) => {
	const currentState: ProductState = getState().product;
	if (currentState.selectedCompanyId) {
		const products = currentState.products[currentState.selectedCompanyId];
		const searcher = new FuzzySearch(products, ["name"]);
		const searchResults: Array<Product> = searcher.search(query);
		dispatch(searchedProducts(searchResults));
	}
};

export const selectedProducts = (state: RootState) => {
	if (state.product.selectedCompanyId)
		return state.product.products[state.product.selectedCompanyId];
};
export const isGettingProducts = (state: RootState) => state.product.loading;
export const searchResults = (state: RootState) => state.product.searchResults;

export const allSearchResults = (state: RootState) => state.product.allSearchResults;

export default productSlice.reducer;
