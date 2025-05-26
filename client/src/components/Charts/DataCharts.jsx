import React from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { useGetTransactionsQuery } from "../../Redux/app/transactionApiSlice";
const DataCharts = () => {
  const { data } = useGetTransactionsQuery();
  const transactions = Array.isArray(data?.transaction) ? data.transaction : [];

  const income = transactions
    .filter((item) => item.type === "Income")
    .reduce((acc, item) => acc + item.amount, 0);

  const expense = transactions
    .filter((item) => item.type === "Expense")
    .reduce((acc, item) => acc + item.amount, 0);

  return (
    <div className="w-full h-full p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
      <BarChart
        series={[{ data: [income, expense], label: "Income vs Expense" }]}
        height={300}
        xAxis={[{ data: ["Income", "Expense"], scaleType: "band" }]}
      />

      <BarChart
        colors={["#ff1744"]} // Green for income
        series={[{ data: [expense], label: "Expense" }]}
        height={300}
        xAxis={[{ data: ["Expense"], scaleType: "band" }]}
      />
    </div>
  );
};

export default DataCharts;
