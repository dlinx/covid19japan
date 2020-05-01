import React, { useState } from "react";
import {
  makeStyles,
  Paper,
  Typography,
  Checkbox,
  FormControlLabel,
  useTheme,
  useMediaQuery,
} from "@material-ui/core";
import { IDailySummary } from "../App";
import {
  XAxis,
  YAxis,
  Tooltip,
  Area,
  ResponsiveContainer,
  ComposedChart,
  Bar,
  Line,
} from "recharts";

const useStyles = makeStyles(() => ({
  wrapper: {
    padding: "10px 0",
    margin: "10px",
    marginTop: "0px",
    textAlign: "center",
    position: "relative",
  },
  chartHeading: {
    textTransform: "uppercase",
    textAlign: "left",
    marginLeft: "10px",
  },
  switch: {
    position: "absolute",
    top: 0,
    right: 0,
  },
  chartContainer: {
    marginBottom: "10px",
  },
}));

interface Props {
  data: Array<IDailySummary>;
  dataKey: "confirmed" | "deceased" | "tested" | "recovered";
  color: string;
}

const Chart: React.FC<Props> = (props) => {
  const classes = useStyles();
  const [isCumulative, setIsCumulative] = useState(true);
  const chartHeight = (window.innerHeight - 286) / 3;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Paper className={classes.wrapper} elevation={3}>
      {props.data[0] && props.data[0][props.dataKey] !== undefined ? (
        <FormControlLabel
          control={
            <Checkbox
              color="primary"
              onChange={(e) => setIsCumulative(e.target.checked)}
              checked={isCumulative}
            />
          }
          label="Cumulative"
          labelPlacement="end"
          className={classes.switch}
        />
      ) : null}
      <Typography className={classes.chartHeading}>{props.dataKey}</Typography>
      <ResponsiveContainer
        width={"100%"}
        height={chartHeight}
        className={classes.chartContainer}
      >
        <ComposedChart
          data={props.data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient
              id={`color_${props.dataKey}`}
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop offset="5%" stopColor={props.color} stopOpacity={0.8} />
              <stop offset="95%" stopColor={props.color} stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="date" />
          {!isMobile && <YAxis />}
          <Tooltip />
          {isCumulative && (
            <Area
              type="monotone"
              dataKey={`${props.dataKey}Cumulative`}
              stroke={props.color}
              fillOpacity={1}
              fill={`url(#color_${props.dataKey})`}
            />
          )}
          {!isCumulative && <Bar dataKey={props.dataKey} fill={props.color} />}
          {!isCumulative && (
            <Line
              dataKey={`${props.dataKey}Avg7d`}
              type="monotone"
              stroke={"#FF0000"}
              dot={false}
            />
          )}
        </ComposedChart>
      </ResponsiveContainer>
    </Paper>
  );
};

export default Chart;
