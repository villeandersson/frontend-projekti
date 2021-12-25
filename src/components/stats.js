import React, { useEffect, useState } from "react";
import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis } from "recharts";
import _ from "lodash";

export default function Stats() {
  const [trainings, setTrainings] = useState([]);

  const fetchData = () => {
    fetch("https://customerrest.herokuapp.com/gettrainings")
      .then((response) => response.json())
      .then((data) => setTrainings(data));
  };

  useEffect(() => fetchData(), []);

  const grouped = _.groupBy(trainings, "activity");

  //koodi lainattu https://stackoverflow.com/questions/38774763/using-lodash-to-sum-values-by-key%20answered%20Aug%204%20'16%20at%2018:33%204castle
  var sums = _(trainings)
    .groupBy("activity")
    .map((objs, key) => ({
      activity: key,
      duration: _.sumBy(objs, "duration"),
    }))
    .value();

  console.log(sums);

  return (
    <div style={{ height: "calc(100vh - 64px)" }}>
      <ResponsiveContainer width="100%" height="80%">
        <BarChart width={150} height={40} data={sums}>
          <XAxis dataKey="activity" />
          <YAxis />
          <Bar dataKey="duration" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
