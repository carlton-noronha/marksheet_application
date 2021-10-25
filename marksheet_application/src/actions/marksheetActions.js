export const addMarksheet = (marksheet) => {
	return { type: "ADD_MARKSHEET", marksheet };
};

export const addMarksheets = (marksheets) => {
	return { type: "ADD_MARKSHEETS", marksheets };
};

export const updateMarksheet = (marksheet) => {
	return { type: "UPDATE_MARKSHEET", marksheet };
};
