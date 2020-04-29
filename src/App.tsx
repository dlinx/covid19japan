import React, { useEffect, useState } from "react";
import { getSummary } from "./utils/api";
import "./App.css";
import Counter from "./Components/Counter";
import PrefectureTable from "./Components/PrefectureTable";
import Chart from "./Components/Chart";
import { makeStyles, colors } from "@material-ui/core";
import Map from "./Components/Map";

export interface IDailySummary {
  confirmed: number;
  confirmedAvg3d: number;
  confirmedAvg7d: number;
  confirmedCumulative: number;
  confirmedCumulativeAvg3d: number;
  confirmedCumulativeAvg7d: number;
  criticalCumulative: number;
  cruiseConfirmedCumulative: number;
  cruiseCriticalCumulative: number;
  cruiseDeceasedCumulative: number;
  cruiseRecoveredCumulative: number;
  cruiseTestedCumulative: number;
  date: string;
  deaths: number;
  deceased: number;
  deceasedCumulative: number;
  recovered: number;
  recoveredCumulative: number;
  tested: number;
  testedCumulative: number;
}
export interface IPrefectureSummary {
  confirmed: number;
  confirmedByCity: {};
  critical: number;
  cruisePassenger: number;
  dailyConfirmedCount: number[];
  dailyConfirmedStartDate: string;
  dailyDeceasedCount: number[];
  dailyDeceasedStartDate: string;
  deaths: number;
  deceased: number;
  name: string;
  name_ja: string;
  newlyConfirmed: number;
  newlyDeceased: number;
  recovered: number;
  tested: number;
  yesterdayConfirmed: number;
  yesterdayDeceased: number;
}
export interface ISummary {
  daily: Array<IDailySummary>;
  prefectures: Array<IPrefectureSummary>;
}
const MONTHS = [
  "JAN",
  "FEB",
  "MAR",
  "APR",
  "MAY",
  "JUNE",
  "JULY",
  "AUG",
  "SEP",
  "OCT",
  "NOV",
  "DEC",
];
const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    height: "100vh",
  },
  heading: {
    textAlign: "center",
  },
  wrapper: {
    display: "flex",
    flexDirection: "row",
    height: "calc(100% - 100px)",
  },
  leftSection: {
    width: "500px",
    padding: "10px",
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  rightSection: {
    width: "100%",
    padding: "10px 0",
  },
  chartContainer: {
    width: "50%",
    display: "inline-block",
    verticalAlign: "top",
  },
});
function App() {
  const classes = useStyles();
  const [summary, setSummary] = useState<ISummary>({
    daily: [],
    prefectures: [],
  });
  const toShortDateString = (dateStr: string) => {
    const dt = new Date(dateStr);
    return `${dt.getDate()}-${MONTHS[dt.getMonth()]}`;
  };
  const fetchData = async () => {
    const { data } = await getSummary();
    data.daily.forEach((row: IDailySummary) => {
      row.date = toShortDateString(row.date);
    });
    console.log(data);
    setSummary(data);
  };
  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={classes.root}>
      <h1 className={classes.heading}>
        Japan COVID-19 Coronavirus Outbreak Tracker
      </h1>
      <div className={classes.wrapper}>
        <section className={classes.leftSection}>
          <Counter data={summary?.daily[summary.daily.length - 1]} />
          <PrefectureTable prefData={summary.prefectures} />
        </section>
        <section className={classes.rightSection}>
          <div className={classes.chartContainer}>
            <Chart
              data={summary.daily}
              dataKey="confirmed"
              color={colors.red.A700}
            />
          </div>
          <div className={classes.chartContainer}>
            <Chart
              data={summary.daily}
              dataKey="deceased"
              color={colors.grey.A400}
            />
          </div>
          <div className={classes.chartContainer}>
            <Map />
          </div>
          <div className={classes.chartContainer}>
            <Chart
              data={summary.daily}
              dataKey="recovered"
              color={colors.green.A700}
            />
            <Chart
              data={summary.daily}
              dataKey="tested"
              color={colors.purple.A700}
            />
          </div>
        </section>
      </div>
    </div>
  );
}

export default App;
