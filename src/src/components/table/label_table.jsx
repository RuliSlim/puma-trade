import React from "react";
import PropTypes from "prop-types";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";

export default function LabelTable(props) {
	const { classes, order, orderBy, onRequestSort, labels } = props;
	const createSortHandler = (property) => (event) => {
		onRequestSort(event, property);
	};

	const label = Object.keys(labels);
	const values = Object.keys(labels);

	return (
		<TableHead>
			<TableRow>
				{label.map((key, i) => (
					key !== "id" &&
					<TableCell
						key={key}
						align={typeof values[i] === "number" ? "right" : "left"}
						padding="false"
						sortDirection={orderBy === key ? order : false}
					>
						<TableSortLabel
							active={orderBy === key}
							direction={orderBy === key ? order : "asc"}
							onClick={createSortHandler(key)}
						>
							{key}
							{orderBy === key ? (
								<span className={classes.visuallyHidden}>
									{order === "desc" ? "sorted descending" : "sorted ascending"}
								</span>
							) : null}
						</TableSortLabel>
					</TableCell>
				))}
			</TableRow>
		</TableHead>
	);
}

LabelTable.propTypes = {
	classes: PropTypes.object.isRequired,
	numSelected: PropTypes.number.isRequired,
	onRequestSort: PropTypes.func.isRequired,
	onSelectAllClick: PropTypes.func.isRequired,
	order: PropTypes.oneOf(["asc", "desc"]).isRequired,
	orderBy: PropTypes.string.isRequired,
	rowCount: PropTypes.number.isRequired,
	labels: PropTypes.object.isRequired
};