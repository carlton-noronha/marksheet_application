const marksheetReducer = (state = [], action) => {
	switch (action.type) {
		case "ADD_MARKSHEET":
			return [...state, action.marksheet];
		case "ADD_MARKSHEETS":
			return action.marksheets;
		case "UPDATE_MARKSHEET":
			const data = [...state];
			const index = data.findIndex(
				(marksheet) => marksheet["_id"] === action.marksheet["_id"]
			);
			data.splice(index, 1);
			data.push(action.marksheet);
			return [...data];
		default:
			return state;
	}
};

export default marksheetReducer;
