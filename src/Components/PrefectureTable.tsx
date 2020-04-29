import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

import { IPrefectureSummary } from "../App";
const useStyles = makeStyles({
  tableContainer: {
    marginTop: "10px",
  },
});
interface Props {
  prefData: Array<IPrefectureSummary>;
}
const PrefectureTable: React.FC<Props> = (props) => {
  const classes = useStyles();
  return (
    <TableContainer
      component={Paper}
      className={classes.tableContainer}
      elevation={3}
    >
      <Table stickyHeader={true}>
        <TableHead>
          <TableRow>
            <TableCell>Prefecture</TableCell>
            <TableCell align="right">Confirmed</TableCell>
            <TableCell align="right">Recovered</TableCell>
            <TableCell align="right">Deaths</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.prefData.map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.confirmed}</TableCell>
              <TableCell align="right">{row.recovered}</TableCell>
              <TableCell align="right">{row.deaths}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default PrefectureTable;
