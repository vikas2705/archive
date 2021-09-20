
import React from "react";
import Highcharts from "highcharts/highcharts-gantt";
import HighchartsReact from "highcharts-react-official";

import HC_more from "highcharts/highcharts-more"; //module
HC_more(Highcharts); //init module

var today = new Date(),
  day = 1000 * 60 * 60 * 24,
  // Utility functions
  dateFormat = Highcharts.dateFormat,
  defined = Highcharts.defined,
  isObject = Highcharts.isObject,
  reduce = Highcharts.reduce;

// Set to 00:00:00:000 today
today.setUTCHours(0);
today.setUTCMinutes(0);
today.setUTCSeconds(0);
today.setUTCMilliseconds(0);
today = today.getTime();

const options = {

    series: [
      {
        data: [
          {
            name: "New offices",
            id: "new_offices",
            owner: "Peter"
          },
          {
            name: "Prepare office building",
            id: "prepare_building",
            parent: "new_offices",
            start: today - 2 * day,
            end: today + 6 * day,
            completed: {
              amount: 0.2
            },
            owner: "Linda"
          },
          {
            name: "Inspect building",
            id: "inspect_building",
            dependency: "prepare_building",
            parent: "new_offices",
            start: today + 6 * day,
            end: today + 8 * day,
            owner: "Ivy"
          },
          {
            name: "Passed inspection",
            id: "passed_inspection",
            dependency: "inspect_building",
            parent: "new_offices",
            start: today + 9.5 * day,
            milestone: true,
            owner: "Peter"
          }
        ]
      }
    ]
};
export default function GanttChart(props) {
  return (
    <HighchartsReact
      // constructorType={"chart"}
      constructorType={"ganttChart"}
      // ref={chartComponent}
      highcharts={Highcharts}
      options={options}
    />
  );
}
