import { useState } from "react";
import {
	Box,
	Grid,
	TextField,
	Button,
	Snackbar,
	Alert,
	Toolbar,
} from "@mui/material";
import { Save } from "@mui/icons-material";
import { v1 } from "uuid";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addMarksheet, updateMarksheet } from "../actions/marksheetActions";

const MarksheetForm = ({ location: { state } }) => {
	const [openInfo, setOpenInfo] = useState(false);
	const [openError, setOpenError] = useState(false);
	const [openSuccess, setOpenSuccess] = useState(false);
	const [rollNoError, setRollNoError] = useState(false);
	const [rollNo, setRollNo] = useState(state ? state.rollNo : "");
	const [nameError, setNameError] = useState(false);
	const [name, setName] = useState(state ? state.name : "");
	const [physicsError, setPhysicsError] = useState(false);
	const [physics, setPhysics] = useState(state ? state.physics : "");
	const [chemistryError, setChemistryError] = useState(false);
	const [chemistry, setChemistry] = useState(state ? state.chemistry : "");
	const [mathError, setMathError] = useState(false);
	const [math, setMath] = useState(state ? state.math : "");
	const [englishError, setEnglishError] = useState(false);
	const [english, setEnglish] = useState(state ? state.english : "");
	const [scienceError, setScienceError] = useState(false);
	const [science, setScience] = useState(state ? state.science : "");
	const [total, setTotal] = useState(state ? state.total : 0);
	const id = state ? state["_id"] : null;
	const history = useHistory();
	const dispatch = useDispatch();

	const handleCloseInfo = () => setOpenInfo(false);

	const handleCloseError = () => setOpenError(false);

	const handleCloseSuccess = () => setOpenSuccess(false);

	const closeSnackbar = (open, info, error) => {
		setOpenSuccess(open);
		setOpenInfo(info);
		setOpenError(error);
	};

	const resetFields = () => {
		setRollNo("");
		setName("");
		setPhysics("");
		setChemistry("");
		setMath("");
		setEnglish("");
		setScience("");
		setTotal(0);
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		setRollNoError(false);
		setNameError(false);
		setPhysicsError(false);
		setChemistryError(false);
		setMathError(false);
		setEnglishError(false);
		setScienceError(false);

		if (rollNo && name && physics && chemistry && math && english && science) {
			const sum =
				parseInt(physics) +
				parseInt(math) +
				parseInt(english) +
				parseInt(chemistry) +
				parseInt(science);
			const percentage = Math.ceil(sum / 5);

			setTotal(sum);
			setOpenInfo(true);

			const obj = {
				rollNo,
				name,
				physics,
				chemistry,
				math,
				english,
				science,
				total: sum,
				percentage,
				result: percentage > 60 ? "Pass" : "Fail",
			};

			setTimeout(() => {
				(async () => {
					try {
						let url = "";
						let req = {};
						if (id) {
							obj["_id"] = id;
							url = `http://localhost:9999/marksheet/${id}`;
							req = {
								method: "PUT",
								body: JSON.stringify(obj),
								headers: {
									"Content-Type": "application/json",
								},
							};
							dispatch(updateMarksheet(obj));
						} else {
							obj["_id"] = v1();
							url = "http://localhost:9999/marksheet";
							req = {
								method: "POST",
								body: JSON.stringify(obj),
								headers: {
									"Content-Type": "application/json",
								},
							};
							dispatch(addMarksheet(obj));
						}

						const res = await fetch(url, req);
						const data = await res.json();
						console.log("MarksheetForm Data", data);
						closeSnackbar(true, false, false);
						setTimeout(() => {
							resetFields();
							history.push("/");
						}, 600);
					} catch (err) {
						console.log("MarksheetForm Error", err);
						closeSnackbar(false, false, true);
					}
				})();
			}, 800);
		} else {
			if (!rollNo) {
				setRollNoError(true);
			}

			if (!name) {
				setNameError(true);
			}

			if (!physics) {
				setPhysicsError(true);
			}

			if (!chemistry) {
				setChemistryError(true);
			}

			if (!math) {
				setMathError(true);
			}

			if (!english) {
				setEnglishError(true);
			}

			if (!science) {
				setScienceError(true);
			}
		}
	};

	return (
		<Box
			sx={{
				height: "100%",
			}}
		>
			<Toolbar />
			<Box
				sx={{
					height: "100%",
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
				}}
			>
				<form noValidate autoComplete="off">
					<Grid container spacing={2}>
						<Grid item xs={12} md={6} sx={{ width: "100%" }}>
							<TextField
								variant="outlined"
								label="Roll number"
								required
								value={rollNo}
								sx={{ width: "100%" }}
								onChange={(e) => setRollNo(e.target.value)}
								error={rollNoError}
							/>
						</Grid>
						<Grid item xs={12} md={6} sx={{ width: "100%" }}>
							<TextField
								variant="outlined"
								label="Name"
								required
								value={name}
								sx={{ width: "100%" }}
								onChange={(e) => setName(e.target.value)}
								error={nameError}
							/>
						</Grid>
						<Grid item xs={12} md={6} sx={{ width: "100%" }}>
							<TextField
								variant="outlined"
								label="Physics"
								required
								type="number"
								value={physics}
								sx={{ width: "100%" }}
								onChange={(e) => {
									setPhysics(e.target.value);
								}}
								error={physicsError}
							/>
						</Grid>
						<Grid item xs={12} md={6}>
							<TextField
								variant="outlined"
								label="Chemistry"
								required
								type="number"
								value={chemistry}
								sx={{ width: "100%" }}
								onChange={(e) => {
									setChemistry(e.target.value);
								}}
								error={chemistryError}
							/>
						</Grid>
						<Grid item xs={12} md={6} sx={{ width: "100%" }}>
							<TextField
								variant="outlined"
								label="Math"
								required
								type="number"
								value={math}
								sx={{ width: "100%" }}
								onChange={(e) => {
									setMath(e.target.value);
								}}
								error={mathError}
							/>
						</Grid>
						<Grid item xs={12} md={6} sx={{ width: "100%" }}>
							<TextField
								variant="outlined"
								label="English"
								required
								type="number"
								value={english}
								sx={{ width: "100%" }}
								onChange={(e) => {
									setEnglish(e.target.value);
								}}
								error={englishError}
							/>
						</Grid>
						<Grid item xs={12} md={6} sx={{ width: "100%" }}>
							<TextField
								variant="outlined"
								label="Science"
								required
								type="number"
								value={science}
								sx={{ width: "100%" }}
								onChange={(e) => {
									setScience(e.target.value);
								}}
								error={scienceError}
							/>
						</Grid>
						<Grid item xs={12} md={6} sx={{ width: "100%" }}>
							<TextField
								variant="filled"
								label="Total"
								value={total}
								disabled
								sx={{ width: "100%" }}
							/>
						</Grid>
					</Grid>
					<Button
						type="submit"
						variant="contained"
						startIcon={<Save />}
						sx={{ mt: 2 }}
						onClick={handleSubmit}
					>
						Save
					</Button>
					<Button
						type="reset"
						variant="contained"
						startIcon={<Save />}
						sx={{ ml: 2, mt: 2 }}
						onClick={resetFields}
					>
						Reset
					</Button>
				</form>
			</Box>
			<Snackbar
				open={openInfo}
				onClose={handleCloseInfo}
				anchorOrigin={{ vertical: "top", horizontal: "right" }}
			>
				<Alert onClose={handleCloseInfo} severity="info">
					Saving the data...
				</Alert>
			</Snackbar>
			<Snackbar
				open={openError}
				autoHideDuration={2500}
				onClose={handleCloseError}
				anchorOrigin={{ vertical: "top", horizontal: "right" }}
			>
				<Alert onClose={handleCloseError} severity="error">
					Error saving the data. Try again
				</Alert>
			</Snackbar>
			<Snackbar
				open={openSuccess}
				autoHideDuration={2500}
				onClose={handleCloseSuccess}
				anchorOrigin={{ vertical: "top", horizontal: "right" }}
			>
				<Alert onClose={handleCloseSuccess} severity="success">
					Data is saved
				</Alert>
			</Snackbar>
		</Box>
	);
};

export default MarksheetForm;
