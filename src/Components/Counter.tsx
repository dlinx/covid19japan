import React from "react";
import { Paper, makeStyles, Theme, colors } from "@material-ui/core";
import { IDailySummary } from "../App";

const useStyles = makeStyles((theme: Theme) => ({
  wrapper: {
    textAlign: "center",
  },
  counter: {
    width: "100px",
    display: "inline-block",
    margin: "13px",
    textAlign: "center",
  },
  active: {
    color: colors.blue.A700,
  },
  critical: {
    color: colors.red.A700,
  },
  deaths: {
    color: colors.blueGrey.A700,
  },
  tested: {
    color: colors.deepPurple.A700,
  },
  confirmed: {
    color: colors.deepOrange.A700,
  },
  recovered: {
    color: colors.green[700],
  },
}));

interface Props {
  data?: IDailySummary;
}

const Counter: React.FC<Props> = (props) => {
  const classes = useStyles();
  const {
    // confirmed,
    confirmedCumulative,
    // critical,
    criticalCumulative,
    // deceased,
    deceasedCumulative,
    // recovered,
    recoveredCumulative,
    // tested,
    testedCumulative,
  } = props.data || {};

  // const withSign = (...count: Array<number | undefined>) => {
  //   const total =
  //     count.reduce(
  //       (prev, next, i) => (prev || (next || 0) * 2) - (next || 0)
  //     ) || 0;
  //   return total ? (
  //     <>
  //       {total > 0 ? <ArrowUpward /> : <ArrowDownward />}
  //       <span>{total}</span>
  //     </>
  //   ) : null;
  // };

  return (
    <Paper className={classes.wrapper} elevation={3}>
      <div className={`${classes.counter} ${classes.active}`}>
        <div>Active</div>
        {/* <div>{withSign(confirmed, deceased, recovered)}</div> */}
        <h1>
          {(confirmedCumulative || 0) -
            (deceasedCumulative || 0) -
            (recoveredCumulative || 0)}
        </h1>
      </div>
      <div className={`${classes.counter} ${classes.critical}`}>
        <div>Critical</div>
        {/* <div>{withSign(critical)}</div> */}
        <h1>{criticalCumulative || 0}</h1>
      </div>
      <div className={`${classes.counter} ${classes.deaths}`}>
        <div>Deaths</div>
        {/* <div>{withSign(deceased)}</div> */}
        <h1>{deceasedCumulative || 0}</h1>
      </div>
      <div className={`${classes.counter} ${classes.tested}`}>
        <div>Tested</div>
        {/* <div>{withSign(tested)}</div> */}
        <h1>{testedCumulative || 0}</h1>
      </div>
      <div className={`${classes.counter} ${classes.confirmed}`}>
        <div>Confirmed</div>
        {/* <div></div> */}
        <h1>{confirmedCumulative || 0}</h1>
      </div>
      <div className={`${classes.counter} ${classes.recovered}`}>
        <div>Recovered</div>
        {/* <div></div> */}
        <h1>{recoveredCumulative || 0}</h1>
      </div>
    </Paper>
  );
};

export default Counter;
