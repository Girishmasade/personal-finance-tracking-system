import React from "react";
import Text from "../components/Text";
import DataCharts from "../components/Charts/DataCharts";

const Charts = () => {
  return (
    <div>
      <Text title={"Charts"} subTitle={"See your all Charts"} />
      <DataCharts />
    </div>
  );
};

export default Charts;
