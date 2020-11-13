import React from "react";
import PropTypes from "prop-types";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { getComparator, stableSort, useStyles } from "../../utils";
import TitleTable from "./title_table";
import LabelTable from "./label_table";
import { SponsorHistoryModel, TItleTableModel } from "../../model/history";

type HistoryTableProps = {
	rows: Array<TItleTableModel | SponsorHistoryModel>;
	title: string;
}

type Order = "asc" | "desc" | undefined;

export default function HistoryTable(props: HistoryTableProps) {
	const { rows, title } = props;
	const classes = useStyles();
	const [ order, setOrder ] = React.useState<Order>("asc");
	const [ orderBy, setOrderBy ] = React.useState<keyof TItleTableModel>("id");
	const [ selected, setSelected ] = React.useState<Array<string>>([]);
	const [ page, setPage ] = React.useState(0);
	const rowsPerPage = 10;

	const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof TItleTableModel) => {
		const isAsc = orderBy === property && order === "asc";
		setOrder(isAsc ? "desc" : "asc");
		setOrderBy(property);
	};

	const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.checked) {
			const newSelecteds: Array<string> = rows.map((n) => n.id.toString());
			setSelected(newSelecteds);
			return;
		}
		setSelected([]);
	};

	const handleChangePage = (event: unknown, newPage: number) => {
		setPage(newPage);
	};

	const isSelected = (name: string) => selected.indexOf(name) !== -1;

	const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

	return (
		<>
			<Paper className={classes.paperTable} elevation={10}>
				<TitleTable numSelected={selected.length} title={title}/>
				<TableContainer>
					<Table
						className={classes.table}
						aria-labelledby="tableTitle"
						size="medium"
						aria-label="enhanced table"
					>
						<LabelTable
							classes={classes}
							numSelected={selected.length}
							order={order}
							orderBy={orderBy}
							onSelectAllClick={handleSelectAllClick}
							onRequestSort={handleRequestSort}
							rowCount={rows.length}
							labels={rows[0]}
						/>
						<TableBody>
							{stableSort(rows, getComparator(order, orderBy))
								.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
								.map((row: TItleTableModel, i: number, arr: Array<TItleTableModel>) => {
									const isItemSelected = isSelected(row.id.toString());
									return (
										<TableRow
											hover
											role="checkbox"
											aria-checked={isItemSelected}
											tabIndex={-1}
											key={row.id}
											selected={isItemSelected}
										>
											{Object.values(arr[i]).map((value, j) =>
												j !== 0 && <TableCell align="left" key={j}>{value}</TableCell>
											)}
										</TableRow>
									);
								})}
							{emptyRows > 0 && (
								<TableRow style={{ height: 53 * emptyRows }}>
									<TableCell colSpan={6} />
								</TableRow>
							)}
						</TableBody>
					</Table>
				</TableContainer>
				<TablePagination
					rowsPerPageOptions={[ 10 ]}
					component="div"
					count={rows.length}
					rowsPerPage={rowsPerPage}
					page={page}
					onChangePage={handleChangePage}
				/>
			</Paper>
		</>
	);
}

HistoryTable.propTypes = {
	rows: PropTypes.arrayOf(PropTypes.object),
	title: PropTypes.string
};