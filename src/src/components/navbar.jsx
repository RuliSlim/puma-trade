import React, { useState } from "react";
import clsx from "clsx";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import { Collapse } from "@material-ui/core";
import { useStyles } from "../utils/styles";

export default function TemporaryDrawer() {
	const classes = useStyles();
	const [state, setState] = useState({
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

	const expandList = (text) => () => {
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
		>
			<List>
				{listData.map((text) => (
					<>
						<ListItem button onClick={expandList(text)} key={text + "-list"}>
							<ListItemText primary={text} key={text + "-item"} />
							{text === "Deposit" || text === "History" ? expand[text.toLowerCase()] ? <ExpandLess key={text + "-expanded"}/> : <ExpandMore key={text + "-expand"}/> : null}
						</ListItem>
						<Divider key={text + "-divider"}/>
						<Collapse in={expand[text.toLowerCase()]} timeout="auto" unmountOnExit key={text + "-collapse"}>
							<List component="div" disablePadding>
								{text === "Deposit" ? 
									depositList.map((list) => (
										<>
											<ListItem button className={classes.nested} key={list}>
												<ListItemText primary={list} key={list + "-item"}/> 
											</ListItem>
											<Divider key={list + "-divider"}/>
										</>
									)) :
									text === "History" && historyList.map((list) => (
										<>
											<ListItem button className={classes.nested} key={list}>
												<ListItemText primary={list} key={list + "-item"}/>
											</ListItem>
											<Divider key={list + "-divider"}/>
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
