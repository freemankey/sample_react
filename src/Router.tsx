import { BrowserRouter, Route, Switch } from "react-router-dom";

import Mypage from "./App";
import Home from "./Home";
import SignUp from "./SignUp";

function Router() {
	return (
		<BrowserRouter>

			<Switch>
				<Route exact path="/" component={Home} />
				<Route exact path="/mypage" component={Mypage} />
				<Route exact path="/signup" component={SignUp} />
			</Switch>

		</BrowserRouter>
	);
}

export default Router;