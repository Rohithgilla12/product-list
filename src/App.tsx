import React from "react";
import "./App.css";
import { CompanyList } from "./features/company/Company";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { ProductList } from "./features/product/ProductList";
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import { SearchAll } from "./features/product/SearchAll";

function App() {
	return (
		<Router>
			<div className="App">
				<header className="App-header">
					<AppBar position="static">
						<Toolbar>
							<Typography variant="h6" style={{
								flexGrow: 1,
							}}>
								<Link to="/">
									Balaji Pharma Distributors Product List
								</Link>
							</Typography>
							<Link to="/search" color="inherit">
								Search
							</Link>
						</Toolbar>
					</AppBar>
					<Switch>
						<Route path="/search">
							<SearchAll />
						</Route>
						<Route path="/products">
							<ProductList />
						</Route>
						<Route path="/">
							<CompanyList />
						</Route>
					</Switch>
				</header>
			</div>
		</Router >
	);
}

export default App;
