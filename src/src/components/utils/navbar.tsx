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
import { useStyles } from "../../utils/styles";
import { CollapseNavbar } from "../../model/components/navbar";
import { Link } from "react-router-dom";

type Anchor = "top" | "left" | "bottom" | "right";

export default function TemporaryDrawer(): JSX.Element {
	const classes = useStyles();
	const [ state, setState ] = useState({
		left: false,
	});
	const [ expand, setExpand ] = useState<CollapseNavbar>({
		deposit: false,
		history: true
	});

	const toggleDrawer = (anchor: Anchor, open: boolean) => (
		event: React.KeyboardEvent | React.MouseEvent,
	): void => {
		if (event.type === "keydown" && ((event as React.KeyboardEvent).key === "Tab" || (event as React.KeyboardEvent).key === "Shift")) {
			return;
		}
		setState({ ...state, [anchor]: open });
	};

	const expandList = (text: keyof CollapseNavbar) => (): void => {
		console.log(text, "???????<D?SA<D?SA<D?SA<D?SDS?D<ASDA");
		const key: keyof CollapseNavbar = text.toLowerCase() as keyof CollapseNavbar;
		setExpand({ ...expand, [key]: !expand[key] });
	};

	const listData = [ "Dashboard", "Profile", "Trees", "History" ];
	const depositList = [ "BTC", "ETH", "DOGE" ];
	const historyList = [ "Deposit", "Invest", "Convert", "Transfer", "Withdraw", "Sponsor" ];

	const list = (anchor: Anchor): JSX.Element => (
		<div
			className={clsx(classes.list, {
				[classes.fullList]: anchor === "top" || anchor === "bottom",
			})}
			role="presentation"
		>
			<List>
				{listData.map((text: string) => (
					<React.Fragment key={text}>
						<Link to={text === "Dashboard" ? "/" : "/" + text.toLowerCase()} >
							<ListItem button key={text + "-list"}>
								<ListItemText primary={text} key={text + "-item"}/>
								{text === "History" ? expand[(text.toLowerCase() as keyof CollapseNavbar)] ? <ExpandLess key={text + "-expanded"} onClick={expandList(text as keyof CollapseNavbar)}/> : <ExpandMore key={text + "-expand"} onClick={expandList(text as keyof CollapseNavbar)}/> : <></>}
							</ListItem>
						</Link>
						<Divider key={text + "-divider"}/>
						<Collapse in={expand[(text.toLowerCase() as keyof CollapseNavbar)]} timeout="auto" unmountOnExit key={text + "-collapse"}>
							<List component="div" disablePadding>
								{text === "Deposit" ?
									depositList.map((list) => (
										<React.Fragment key={list}>
											<Link to={"#" + text.toLowerCase() + "?" + list.toLowerCase()} >
												<ListItem button className={classes.nested} key={list}>
													<ListItemText primary={list} key={list + "-item"}/>
												</ListItem>
											</Link>
											<Divider key={list + "-divider"}/>
										</React.Fragment>
									)) :
									text === "History" && historyList.map((list) => (
										<React.Fragment key={list}>
											<Link to={`/${text.toLowerCase()}?${list.toLowerCase()}`}>
												<ListItem button className={classes.nested} key={list}>
													<ListItemText primary={list} key={list + "-item"}/>
												</ListItem>
											</Link>
											<Divider key={list + "-divider"}/>
										</React.Fragment>
									))
								}
							</List>
						</Collapse>
					</React.Fragment>
				))}
			</List>
		</div>
	);

	return (
		<div className={classes.sidebarContainer}>
			<React.Fragment>
				<Button onClick={toggleDrawer("left", true)} style={{ background: "transparent" }}>
					<ArrowForwardIosIcon color="secondary" fontSize="large"/>
				</Button>
				<Drawer anchor="left" open={state["left"]} onClose={toggleDrawer("left", false)}>
					{list("left")}
				</Drawer>
			</React.Fragment>
		</div>
	);
}
