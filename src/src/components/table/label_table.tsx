import React from "react";
import PropTypes from "prop-types";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import { useStyles } from "../../utils";
import { SponsorHistoryModel, TItleTableModel } from "../../model/history";

type Order = "asc" | "desc" | false;

interface EnhancedTableProps {
  classes: ReturnType<typeof useStyles>;
  numSelected: number;
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof TItleTableModel) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
	rowCount: number;
	labels: TItleTableModel | SponsorHistoryModel;
}

export default function LabelTable(props: EnhancedTableProps) {
	const { classes, order, orderBy, onRequestSort, labels } = props;
	const createSortHandler = (property: keyof TItleTableModel) => (event: React.MouseEvent<unknown>) => {
		onRequestSort(event, property);
	};

	const label: Array<string> = Object.keys(labels);
	const values: Array<string> = Object.keys(labels);

	return (
		<TableHead>
			<TableRow>
				{label.map((key, i) => (
					key !== "id" &&
					<TableCell
						key={key}
						align={typeof values[i] === "number" ? "right" : "left"}
						// padding="false"
						sortDirection={orderBy === key ? order : false}
					>
						<TableSortLabel
							active={orderBy === key}
							direction={orderBy === labels.date ? order : "asc"}
							onClick={createSortHandler(label[i] as keyof TItleTableModel)}
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
	order: PropTypes.oneOf([ "asc", "desc" ]).isRequired,
	orderBy: PropTypes.string.isRequired,
	rowCount: PropTypes.number.isRequired,
	labels: PropTypes.object.isRequired
};