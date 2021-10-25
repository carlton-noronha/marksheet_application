import { useEffect, useState } from "react";
import {
	Card,
	Box,
	Toolbar,
	Grid,
	CardContent,
	CardActions,
	Typography,
	Button,
	MenuItem,
	TextField,
} from "@mui/material";
//import { useDispatch } from "react-redux";
//import { addMarksheets } from "../actions/marksheetActions";

import { useHistory } from "react-router-dom";
const MarksheetList = (props) => {
	const [sort, setSort] = useState("Sort by marks");
	const [myProps, setMyProps] = useState(props);
	const [data, setData] = useState([]);
	const [highPerformer, setHighPerformer] = useState({});
	const [lowPerformer, setLowPerformer] = useState({});
	const history = useHistory();
	//const dispatch = useDispatch();

	useEffect(() => {
		setMyProps(props);
	}, [props]);

	useEffect(() => {
		setData(myProps.marksheets);
	}, [myProps]);

	useEffect(() => {
		const tempData = [...data];
		tempData.sort(
			(marksheet1, marksheet2) => marksheet2.total - marksheet1.total
		);
		setHighPerformer(tempData.length > 0 ? tempData[0] : {});
		setLowPerformer(tempData.length > 0 ? tempData[tempData.length - 1] : {});
	}, [data]);

	const handleDelete = (e) => {
		(async (e) => {
			const id = e.target.name;
			console.log("MarksheetList Delete", `Deleting item with id '${id}'`);
			try {
				const newMarksheets = data.filter(
					(marksheet) => marksheet["_id"] !== id
				);
				setData(newMarksheets);
				const res = await fetch(`http://localhost:9999/marksheet/${id}`, {
					method: "DELETE",
				});
				const deletedData = await res.json();
				console.log("MarksheetList Data Delete", deletedData);
			} catch (err) {
				console.log("MarksheetList Delete Error", err);
			}
		})(e);
	};

	const handleUpdate = (e) => {
		const marksheet = data.find(
			(marksheet) => marksheet["_id"] === e.target.name
		);
		history.push({
			pathname: `/editMarksheet/${e.target.name}`,
			state: { ...marksheet },
		});
	};

	const decideSort = (type, arr) => {
		const tempData = arr ? [...arr] : [...data];
		if (type === "Sort by name") {
			tempData.sort((marksheet1, marksheet2) =>
				marksheet2.name.localeCompare(marksheet1.name)
			);
		} else if (type === "Sort by marks") {
			tempData.sort(
				(marksheet1, marksheet2) => marksheet2.total - marksheet1.total
			);
		} else {
			tempData.sort((marksheet1, marksheet2) =>
				marksheet2.rollNo.localeCompare(marksheet1.rollNo)
			);
		}
		return tempData;
	};

	return (
		<Box component="div" sx={{ height: "100%" }}>
			<Toolbar />
			<Box>
				<TextField
					sx={{
						m: 1,
					}}
					select
					value={sort}
					onChange={(e) => {
						const tempData = decideSort(e.target.value);
						setSort(e.target.value);
						setData(tempData);
					}}
				>
					{["Sort by marks", "Sort by roll no", "Sort by name"].map(
						(option) => (
							<MenuItem key={option} value={option}>
								{option}
							</MenuItem>
						)
					)}
				</TextField>
				<Typography
					sx={{
						backgroundColor: "#eaf45f",
						display: "inline-block",
						p: 2,
						m: 1,
					}}
				>
					High Performer
				</Typography>
				<Typography
					sx={{
						backgroundColor: "#f98185",
						display: "inline-block",
						p: 2,
						m: 1,
					}}
				>
					Low Performer
				</Typography>
			</Box>
			<Grid container sx={{ height: "80%", p: 2 }}>
				{data &&
					data.map((marksheet, index) => (
						<Grid
							item
							key={index}
							xs={12}
							md={4}
							sx={{
								p: 1,
								minWidth: { xs: `98%`, md: `calc(90% / 3)` },
								boxSizing: "border-box",
							}}
						>
							<Card
								sx={{
									minWidth: `100%`,
									backgroundColor:
										lowPerformer !== highPerformer
											? marksheet === highPerformer
												? "#eaf45f"
												: marksheet === lowPerformer
												? "#f98185"
												: "#FFF"
											: "#FFF",
								}}
							>
								<CardContent>
									<Typography
										sx={{ fontSize: 14 }}
										color="text.secondary"
										gutterBottom
										noWrap
									>
										{marksheet.rollNo}
									</Typography>
									<Typography variant="h5" component="div" noWrap>
										{marksheet.name}
									</Typography>
									<Typography variant="body2" noWrap>
										Physics: {` ${marksheet.physics}`}
									</Typography>
									<Typography variant="body2" noWrap>
										Chemistry: {` ${marksheet.chemistry}`}
									</Typography>
									<Typography variant="body2" noWrap>
										Math: {` ${marksheet.math}`}
									</Typography>
									<Typography variant="body2" noWrap>
										English: {` ${marksheet.english}`}
									</Typography>
									<Typography variant="body2" noWrap>
										Science: {` ${marksheet.science}`}
									</Typography>
									<Typography variant="body2" noWrap>
										Total: {` ${marksheet.total}`}
									</Typography>
								</CardContent>
								<CardActions>
									<Button
										color="secondary"
										size="small"
										name={marksheet["_id"]}
										onClick={handleDelete}
									>
										Delete
									</Button>
									<Button
										size="small"
										onClick={handleUpdate}
										color="secondary"
										name={marksheet["_id"]}
									>
										Update
									</Button>
								</CardActions>
							</Card>
						</Grid>
					))}
			</Grid>
		</Box>
	);
};

export default MarksheetList;
