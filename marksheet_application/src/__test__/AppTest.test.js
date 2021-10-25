import { render, screen, cleanup } from "@testing-library/react";
import App from "../App";
import { createStore } from "redux";
import { Provider } from "react-redux";
import rootReducer from "../reducers/index";

const store = createStore(
	rootReducer,
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

afterEach(() => {
	cleanup();
});

test("Test for presence of drawer", () => {
	const { container } = render(
		<Provider store={store}>
			<App />
		</Provider>
	);
	expect(
		container.getElementsByClassName("drawer").length
	).toBeGreaterThanOrEqual(1);
});

test("Test for Presence of menu items", () => {
	render(
		<Provider store={store}>
			<App />
		</Provider>
	);
	expect(screen.getAllByText("View")).toBeTruthy();
	expect(screen.getAllByText("Add")).toBeTruthy();
});
