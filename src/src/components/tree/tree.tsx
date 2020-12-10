/* eslint-disable @typescript-eslint/ban-ts-ignore */
import React from "react";
import Tree, { ReactD3TreeItem } from "react-d3-tree";
import { formContext } from "../../context/form.context";
import { useDeviceSize } from "../../hooks/device";
import { dummyData } from "../../model/dummy_data";

const styles = {
	links: {
		stroke: "#fff",
		width: "20rem",
		fill: "#fff"
	},
	nodes: {
		node: {
			circle: {
				fill: "#fff",
				name: {
					fontFamily: "'Roboto', sans-serif",
					fontSize: "1.6rem",
					fill: "#fff",
					fontColor: "#fff"
				},
			},
		},
		leafNode: {
			circle: {
				fill: "#fff",
				name: {
					fontFamily: "'Roboto', sans-serif",
					fontSize: "1.6rem",
					fill: "#fff"
				},
				attributes: {
					x: -10,
				},
			},
		},
	},
};

interface Props {
	handleClick: (targetNode: ReactD3TreeItem) => void;
}

export default function MyTree(props: Props): JSX.Element {
	const { resource } = React.useContext(formContext);
	const data = resource?.tree?.write();
	const result = data?.data ?? dummyData;

	const { handleClick } = props;
	return (
		<Tree
		//@ts-ignore
			data={result}
			orientation="vertical"
			translate={{ x: window.innerWidth/2.5, y: window.innerHeight/3 }}
			pathFunc={"straight"}
			collapsible={false}
			zoomable={useDeviceSize().device.isMobile ? true : false}
			onClick={handleClick}
			styles={styles}
			zoom={useDeviceSize().device.isMobile ? 0.45 : 1}
		/>
	);
}
