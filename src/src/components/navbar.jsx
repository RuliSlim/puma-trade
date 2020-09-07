import React, { useState } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import { Collapse } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
	list: {
		width: 250,
	},
	fullList: {
		width: "auto",
	},
	container: {
		width: "5vw",
		height:"100vh",
		//backgroundColor: "red",
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		position: "absolute"
	},
	nested: {
		paddingLeft: theme.spacing(4),
	},
}));

export default function TemporaryDrawer() {
	const classes = useStyles();
	const [state, setState] = React.useState({
		left: false,
	});
	const [expand, setExpand] = useState({
		deposit: false,
		history: false
	});

	const toggleDrawer = (anchor, open) => (event) => {
		if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
			return;
		}

		console.log("tsdsadas");

		setState({ ...state, [anchor]: open });
	};

	const expandList = (text) => (event) => {
		setExpand({ ...expand, [text.toLowerCase()]: !expand[text.toLowerCase()]});
		console.log(expand);
	};

	const listData = ["Logo", "Dashboard", "Profile", "Deposit", "Withdraw", "Trees", "History"];
	const depositList = ["BTC", "ETH", "DOGE"];
	const historyList = ["Deposit", "Sponsor", "Pairing"];

	const list = (anchor) => (
		<div
			className={clsx(classes.list, {
				[classes.fullList]: anchor === "top" || anchor === "bottom",
			})}
			role="presentation"
			//onClick={toggleDrawer(anchor, false)}
			//onKeyDown={toggleDrawer(anchor, false)}
		>
			<List>
				{listData.map((text, index) => (
					<>
						<ListItem button onClick={expandList(text)} key={text}>
							<ListItemText primary={text} />
							{text === "Deposit" || text === "History" ? expand[text.toLowerCase()] ? <ExpandLess /> : <ExpandMore /> : null}
						</ListItem>
						<Divider />
						<Collapse in={expand[text.toLowerCase()]} timeout="auto" unmountOnExit>
							<List component="div" disablePadding>
								{text === "Deposit" ? 
									depositList.map((list) => (
										<>
											<ListItem button className={classes.nested} key={list}>
												<ListItemText primary={list}/> 
											</ListItem>
											<Divider />
										</>
									)) :
									historyList.map((list) => (
										<>
											<ListItem button className={classes.nested} key={list}>
												<ListItemText primary={list}/>
											</ListItem>
											<Divider />
										</>
									))
								}
							</List>
						</Collapse>
					</>
				))}
			</List>
		</div>
	);

	return (
		<div className={classes.container}>
			<React.Fragment>
				<Button onClick={toggleDrawer("left", true)}>
					<ArrowForwardIosIcon color="secondary" fontSize="large"/>
				</Button>
				<Drawer anchor="left" open={state["left"]} onClose={toggleDrawer("left", false)}>
					{list("left")}
				</Drawer>
			</React.Fragment>
		</div>
	);
}
