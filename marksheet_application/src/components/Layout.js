import { useState, useEffect } from "react";
import {
	Box,
	List,
	ListItem,
	ListItemIcon,
	Toolbar,
	ListItemText,
	Divider,
	AppBar,
	CssBaseline,
	Typography,
	IconButton,
	Drawer,
} from "@mui/material";
import { Switch, Route, useHistory } from "react-router-dom";
import { GridView, Create, Menu } from "@mui/icons-material";
import MarksheetForm from "./MarksheetForm";
import MarksheetList from "./MarksheetList";
import NoNetwork from "./NoNetwork";
import { useSelector, useDispatch } from "react-redux";
import { addMarksheets } from "../actions/marksheetActions";

const Layout = ({ window }) => {
	const drawerWidth = 240;

	const [mobileOpen, setMobileOpen] = useState(false);
	const history = useHistory();
	const handleToggle = () => setMobileOpen(!mobileOpen);
	const marksheets = useSelector((state) => state.marksheets);
	const dispatch = useDispatch();

	useEffect(() => {
		(async () => {
			try {
				const res = await fetch("http://localhost:9999/marksheet");
				const data = await res.json();
				console.log("Layout Data", data);
				data.sort(
					(marksheet1, marksheet2) => marksheet2.total - marksheet1.total
				);
				dispatch(addMarksheets(data));
			} catch (err) {
				console.log("Layout Error", err);
			}
		})();
	}, []);

	const drawer = (
		<Box component="div">
			<Box sx={{ p: 1.5 }}>
				<Typography variant="body2" noWrap>
					Developed by:
				</Typography>
				<Typography variant="body2" noWrap>
					Carlton Noronha{" "}
				</Typography>
			</Box>
			<List>
				<ListItem
					data-testid="ele-1"
					button
					onClick={() => {
						history.push("/");
					}}
				>
					<ListItemIcon>
						<GridView />
					</ListItemIcon>
					<ListItemText primary="View" />
				</ListItem>
				<Divider />
				<ListItem
					button
					onClick={() => {
						history.push("/addMarksheet");
					}}
				>
					<ListItemIcon>
						<Create />
					</ListItemIcon>
					<ListItemText primary="Add" />
				</ListItem>
			</List>
		</Box>
	);

	const container =
		window !== undefined ? () => window().document.body : undefined;
	return (
		<Box
			className="main-container"
			sx={{
				display: "flex",
				position: "relative",
			}}
		>
			<CssBaseline />
			<AppBar
				postion="fixed"
				sx={{
					width: { sm: `calc(100% - ${drawerWidth}px)` },
					ml: { sm: `${drawerWidth}px` },
				}}
			>
				<Toolbar>
					<IconButton
						color="inherit"
						sx={{
							mr: 2,
							display: {
								sm: "none",
							},
						}}
						edge="start"
						onClick={handleToggle}
					>
						<Menu />
					</IconButton>
					<Typography>Marksheet Application</Typography>
				</Toolbar>
			</AppBar>
			<Box
				component="nav"
				sx={{
					flexBasis: { sm: `${drawerWidth}px` },
					flexShrink: { sm: 0 },
				}}
			>
				<Drawer
					className="drawer"
					container={container}
					variant="temporary"
					anchor="left"
					open={mobileOpen}
					onClick={handleToggle}
					ModalProps={{
						keepMounted: true,
					}}
					sx={{
						display: {
							xs: "block",
							sm: "none",
						},
						"& .MuiDrawer-paper": {
							boxSizing: "border-box",
							width: `${drawerWidth}px`,
						},
					}}
				>
					{drawer}
				</Drawer>
				<Drawer
					className="drawer"
					variant="permanent"
					anchor="left"
					open
					sx={{
						display: {
							xs: "none",
							sm: "block",
						},
						"& .MuiDrawer-paper": {
							boxSizing: "border-box",
							width: `${drawerWidth}px`,
						},
					}}
				>
					{drawer}
				</Drawer>
			</Box>
			<Box
				sx={{
					flexGrow: 1,
					p: 3,
				}}
			>
				<Switch>
					<Route
						exact
						path="/"
						render={() => <MarksheetList marksheets={marksheets} />}
					/>
					<Route path="/addMarksheet" component={MarksheetForm} />
					<Route path="/editMarksheet/:id" component={MarksheetForm} />
					<Route path="/noNetwork" component={NoNetwork} />
				</Switch>
			</Box>
		</Box>
	);
};

export default Layout;
