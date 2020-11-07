import TreeData from "../model/tree_data";
import { dummyData } from "../model/dummy_data";
// import { Modal } from "@material-ui/core";
// import { componentType } from "../model/enums";

// TODO: FUNCTION TREE TETAP MENAMPILKAN ' TITIK TAPI KALAU REAL DATA ANAK MASIH KOSONG JIKA DIKLIK MENAMPILKAN FORM PENDAFTARAN. KALAU SUDAH TERISI BERPINDAH KE ROOT ELEMENT

// TODO: FUNCTION ON HOVER MENAMPILKAN DETAIL DATA TSB

// function for struct data in tree for initial stage
export 	const structTree = () => {
	const data = [];

	for (const i of dummyData) {
		data.push(new TreeData(i.name));
	}

	for (const i of dummyData) {
		if (i.ref !== undefined) {
			for (const j of data) {
				if (i.ref === j.name) {
					j.children.push(i);
				}
			}
		}
	}

	for (const i of data) {
		if (i.ref !== undefined) {
			for (const j of data) {
				if (i.ref === j.name && i.children.length > 0) {
					j.children.push(i);
				}
			}
		}
	}

	// NOTE: result will looks like this [{name, childre:[2]}, {name, children:[2], name, childre:[2]}]
	let result = data.filter(el => el.children.length !== 0);

	console.log(data, result, "ini data");

	if (!result.length) {
		result = {
			name: data[0].name
		};

		result.children = [
			{
				name: "Register New Member",
				children: [
					{
						name: "Empty"
					},
					{
						name: "Empty"
					},
				]
			},
			{
				name: "Register New Member",
				children: [
					{
						name: "Empty"
					},
					{
						name: "Empty"
					},
				]
			},
		];
		return result;
	}

	// TODO: If tree doesnt show 3 level
	if (result.length === 2) {
		result[0].children[0] = result[1];
	}

	if (result.length === 3) {
		result[0].children[0] = result[1];
		result[0].children[1] = result[2];
	}

	if (result[0].children.length < 2) {
		result[0].children.push({ name: "Register New Member", children:[ { name: "Empty" }, { name: "Empty" } ] });
	}

	for (const i of result[0].children) {
		if (i.children == undefined) {
			i.children = [ { name: "Register New Member" }, { name: "Register New Member" } ];
		}
		if (i.children.length < 2) {
			console.log("masuk sinifa");

			i.children.push({ name:"Register New Member" });
		}
	}

	return result[0];
};

// CLICK TREE
export const treeOnClick = (e) => {
	if(e.name === "Register New Member") {
		return "modal";
	}

	if(e.name === "Empty") {
		return "snackbar";
	}
};