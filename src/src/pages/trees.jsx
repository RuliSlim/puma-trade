import React, { useState } from "react";
import Tree from "react-d3-tree";
import { Box } from "@material-ui/core";
import { useStyles } from "../utils/styles";

class TreeData {
	constructor(name) {
		this.name = name;
		this.children = [];
	}
}

export default function Trees() {
	const classes = useStyles();

	// states
	const [treeData, setTreeData] = useState({});

	const dummyData = [
		{
			name: "1"
		},
		{
			name: "2",
			ref: "1"
		},
		{
			name: "3",
			ref: "1"
		},
		{
			name: "5",
			ref: "2"
		},
		{
			name: "4",
			ref: "2"
		},
		{
			name: "7",
			ref: "3"
		},
		{
			name: "6",
			ref: "3"
		},
	];

	const structTree = () => {
		const data = [];

		for (let i of dummyData) {
			data.push(new TreeData(i.name));
		}

		for (let i of dummyData) {
			if (i.ref !== undefined) {
				for (let j of data) {
					if (i.ref === j.name) {
						j.children.push(i);
					}
				}
			}
		}

		console.log(data, "ini abis dasdatatasd");

		for (let i of data) {
			if (i.ref !== undefined) {
				for (let j of data) {
					if (i.ref === j.name && i.children.length > 0) {
						j.children.push(i);
					}
				}
			}
		}

		// NOTE: result will looks like this [{name, childre:[2]}, {name, children:[2], name, childre:[2]}]
		const result = data.filter(el => el.children.length !== 0);

		// TODO: If tree doesnt show 3 level
		result[0].children[0] = result[1];
		result[0].children[1] = result[2];

		setTreeData(result);
	};


	useState(() => {
		structTree();
	}, []);

	return (
		<Box className={classes.tree}>
			<Tree 
				data={treeData}
				orientation="vertical"
				translate={{x: window.innerWidth/2, y: window.innerHeight/3}}
				pathFunc={"step"}
			/>
		</Box>
	);
}