import React from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { PieChart } from "@mui/x-charts/PieChart";
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

  const balance = income - expense;

  const expenseByCategory = transactions
    .filter(
      (item) => item.type === "Expense" && typeof item.amount === "number"
    )
    .reduce((acc, curr) => {
      const category = curr.category || "Uncategorized";
      acc[category] = (acc[category] || 0) + curr.amount;
      return acc;
    }, {});

  const expenseCategories = Object.keys(expenseByCategory);
  const expenseValues = Object.values(expenseByCategory);

  const pieData = expenseCategories.map((label, index) => ({
    id: index,
    value: expenseValues[index],
    label,
  }));

  const incomeByCategory = transactions
    .filter((item) => item.type === "Income" && typeof item.amount === "number")
    .reduce((acc, curr) => {
      const category = curr.category || "Uncategorized";
      acc[category] = (acc[category] || 0) + curr.amount;
      return acc;
    }, {});

  const incomeCategories = Object.keys(incomeByCategory);
  const incomeValues = Object.values(incomeByCategory);

  const pieDataIncome = incomeCategories.map((label, index) => ({
    id: index,
    value: incomeValues[index],
    label,
  }));

  return (
    <div className="w-full h-full p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
       <div className="flex flex-col items-center">
        <h2 className="text-lg font-semibold mb-2">Income vs Expense</h2>
      <BarChart
        colors={["#4caf50", "#f50057"]}
        width={400}
        height={300}
        series={[{ data: [income, expense]}]}
        xAxis={[{ data: ["Income", "Expense"], scaleType: "band" }]}
      />
      </div>

      <div className="flex flex-col items-center">
        <h2 className="text-lg font-semibold mb-2">Expense Breakdown</h2>
        <PieChart series={[{ data: pieData }]} width={400} height={300} />
      </div>

      <div className="flex flex-col items-center">
        <h2 className="text-lg font-semibold mb-2">Income Breakdown</h2>
        <PieChart series={[{ data: pieDataIncome }]} width={400} height={300} />
      </div>

      <div className="flex flex-col items-center">
      <h2 className="text-lg font-semibold mb-2">Balance Breakdown</h2>
        <BarChart
          colors={["#4caf50"]}
          width={400}
          height={300}
          series={[{ data: [balance], label: "Balance" }]}
          xAxis={[{ data: ["balance"], scaleType: "band" }]}
        />
      </div>
    </div>
  );
};

export default DataCharts;
