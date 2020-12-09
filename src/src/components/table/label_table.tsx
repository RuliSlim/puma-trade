import React from "react";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import { useStyles } from "../../utils";
import { SponsorHistoryModel, TItleTableModel } from "../../model/history";
import { ArrowDownward, ArrowUpward } from "@material-ui/icons";

type Order = "asc" | "desc" | undefined;

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

export default function LabelTable(props: EnhancedTableProps): JSX.Element {
	const { classes, order, orderBy, onRequestSort, labels } = props;
	const createSortHandler = (property: keyof TItleTableModel) => (event: React.MouseEvent<unknown>): void => {
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
						sortDirection={orderBy === key ? order : false}
					>
						<TableSortLabel
							active={orderBy === key}
							direction={orderBy === labels.date ? order : "asc"}
							onClick={createSortHandler(label[i] as keyof TItleTableModel)}
							IconComponent={(): JSX.Element => order === "asc" ? <ArrowUpward /> : <ArrowDownward />}
						>
							{key === "coin_value" ? "amount" : key === "value_token" ? "nominal" : key}
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
