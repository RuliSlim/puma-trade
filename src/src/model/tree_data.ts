export interface Member {
	name: string;
	ref: string;
	children?: Array<Member>;
}

class TreeData {
	name: string;
	ref: string;
	children: Array<Member>;

	constructor(name: string, ref: string) {
		this.name = name;
		this.ref = ref;
		this.children = [];
	}
}

export default TreeData;