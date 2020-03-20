import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";
import { CovidDateData, GraphMetaData, EXCLUDED_STATES } from "../../app/AppStore";
import { getYMaxFromMaxCases } from "../../utils/utils";
import { monthDay } from "../../utils/DateUtils";

type Props = {
  state: string;
  timeSeries: CovidDateData;
  stat: "confirmed" | "dead";
  stateCount: boolean;
  reportView?: boolean;
  meta?: GraphMetaData;
  title?: string;
};

const colors = ["#E5A3A3", "#D05C5C", "#CB2727", "#C00000", "#900000", "#700000"];

export const StateBar = (props: Props) => {
  if ((props.stateCount && props.state)) {
    return null;
  }
  let title: string;
  let maxCases: number | undefined;
  let dates: string[];
  let data;
  let stateName: string = "";


    stateName =
      Object.keys(props.timeSeries.states).flatMap(k => props.timeSeries.states[k]).find(state => state.ID === props.state)?.State || "";
    title = `${stateName}`;

    let countyData = Object.keys(props.timeSeries.counties).flatMap(k => props.timeSeries.counties[k]);
    if (props.state) {
      countyData = countyData.filter(({ State }) => State === stateName);
    }
    if (props.meta) {
      maxCases = props.meta.maxConfirmedCounty;
    }
    dates = [
      ...new Set(countyData.map(({ Reported }) => monthDay(Reported)))
    ].sort();
    const counties = countyData.reduce((acc, el) => {
      if (!acc[el.County]) acc[el.County] = {};
      acc[el.County][monthDay(el.Reported)] =
        props.stat === "confirmed" ? el.Confirmed : el.Dead;
      return acc;
    }, {} as { [c: string]: { [d: string]: number } });
    data = Object.entries(counties).reduce((acc, [Name, data]) => {
      acc.push({
        Name,
        ...data
      });
      return acc;
    }, [] as { [k: string]: string | number }[]).sort(
      (a, b) => {
        const lastIndex = dates.length - 1;
        return (b[dates[lastIndex]] as number || 0) - (a[dates[lastIndex]] as number || 0)
      }
    );

  const dedupedData: any[] = [];
  data.forEach(e => {
    const dedupedElement: any = {};
    const d = Object.keys(e).sort();
    for (let i = 0; i < d.length; i++) {
      const key = d[i];
      if (!key.toString().includes("|")) {
        dedupedElement[key] = e[key];
        continue;
      }
      if (d[i+1]) {
        if (d[i].toString().split("|")[0] === d[i+1].toString().split("|")[0]) {
          continue;
        }
      }
      dedupedElement[d[i].toString().split("|")[0]] = e[key];
    }
    dedupedData.push(dedupedElement);
  });

  const displayDates: string[] = []
  const displayDateSet = new Set();
  dates.forEach(d => {
    const key = d.split("|")[0];
    if (!displayDateSet.has(key)) {
      displayDates.push(key)
      displayDateSet.add(key);
    }
  });

  return (
    <>
      <h3>{props.title ? props.title : title}</h3>
      <BarChart
        barSize={10}
        width={window.innerWidth * 0.9}
        height={600}
        data={dedupedData.slice(0, 10)}
        margin={{
          top: 0,
          right: 0,
          left: 0,
          bottom: 0
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          angle={-45}
          interval={0}
          textAnchor="end"
          height={100}
          dataKey="Name"
        />
        <YAxis domain={maxCases && !EXCLUDED_STATES.includes(stateName as any) ? [0, getYMaxFromMaxCases(maxCases)]: undefined} />
        <Tooltip />
        <div style={{padding: "10px"}}/>
        <Legend />
        {displayDates.map((date, i) => (
          <Bar key={date} dataKey={date.split("|")[0]} fill={colors[i]} />
        ))}
      </BarChart>
    </>
  );
};