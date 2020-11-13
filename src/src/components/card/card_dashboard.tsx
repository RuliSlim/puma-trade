import React from "react";
import { Button, Card, CardActionArea, CardActions, CardContent, Typography } from "@material-ui/core";
import { CardComponentProps } from "../../model/components/dashboard";

export default function CardDashboard(props: CardComponentProps): JSX.Element {
	const { item } = props;
	return(
		<Card>
			<CardActionArea>
				<CardContent>
					<Typography variant="h3" gutterBottom component="h2">{item.name}</Typography>
					<Typography variant="h2" gutterBottom component="h2" align="center">{item.value}</Typography>
				</CardContent>
			</CardActionArea>
			<CardActions>
				<Button size="medium" fullWidth>{item.button}</Button>
			</CardActions>
		</Card>
	);
}