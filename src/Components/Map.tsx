import React from "react";
import { Paper, makeStyles } from "@material-ui/core";
// import { ReactComponent as JapanMap } from "./Map.svg";
const useStyles = makeStyles(() => ({
  mapWrapper: {
    margin: "0 10px",
    height: ((window.innerHeight - 106) / 3) * 2,
    overflow: "hidden",
    textAlign: "center",
    backgroundColor: "#c6ecff",
  },
}));
const Map: React.FC = () => {
  const classes = useStyles();
  return (
    <Paper className={classes.mapWrapper} elevation={3}>
      <h1>Map coming soon</h1>
      {/* <JapanMap height="100%" zoomAndPan="0.5" /> */}
    </Paper>
  );
};

export default Map;
