import React from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

import { IPrefectureSummary } from "../App";
const useStyles = makeStyles((theme: Theme) => ({
  tableContainer: {
    marginTop: "10px",
    [theme.breakpoints.down("sm")]: {
      height: "500px",
    },
  },
  TableCell: {
    padding: "10px",
  },
}));
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
            <TableCell align="right" className={classes.TableCell}>
              Confirmed
            </TableCell>
            <TableCell align="right" className={classes.TableCell}>
              Recovered
            </TableCell>
            <TableCell align="right" className={classes.TableCell}>
              Deaths
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.prefData.map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="center" className={classes.TableCell}>
                {row.confirmed}
              </TableCell>
              <TableCell align="center" className={classes.TableCell}>
                {row.recovered}
              </TableCell>
              <TableCell align="center" className={classes.TableCell}>
                {row.deaths}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default PrefectureTable;
