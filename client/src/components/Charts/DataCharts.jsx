import React, { useMemo } from "react";
import Chart from "react-apexcharts";
import { useGetTransactionsQuery } from "../../Redux/app/transactionApiSlice";

const DataCharts = () => {
  const { data } = useGetTransactionsQuery();
  const transactions = Array.isArray(data?.transaction) ? data.transaction : [];

  const income = useMemo(() => {
    return transactions
      .filter((item) => item.type === "Income")
      .reduce((acc, item) => acc + item.amount, 0);
  }, [transactions]);

  const expense = useMemo(() => {
    return transactions
      .filter((item) => item.type === "Expense")
      .reduce((acc, item) => acc + item.amount, 0);
  }, [transactions]);

  const balance = income - expense;

  const expenseByCategory = useMemo(() => {
    return transactions
      .filter(
        (item) => item.type === "Expense" && typeof item.amount === "number"
      )
      .reduce((acc, curr) => {
        const category = curr.category || "Uncategorized";
        acc[category] = (acc[category] || 0) + curr.amount;
        return acc;
      }, {});
  }, [transactions]);

  const incomeByCategory = useMemo(() => {
    return transactions
      .filter(
        (item) => item.type === "Income" && typeof item.amount === "number"
      )
      .reduce((acc, curr) => {
        const category = curr.category || "Uncategorized";
        acc[category] = (acc[category] || 0) + curr.amount;
        return acc;
      }, {});
  }, [transactions]);

  const hasExpenseData = Object.keys(expenseByCategory).length > 0;
  const hasIncomeData = Object.keys(incomeByCategory).length > 0;

  const numberFormat = (val) => Math.round(val).toLocaleString("en-IN");

  return (
    <div className="w-full h-full p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Income vs Expense */}
      <div className="flex flex-col items-center">
        <h2 className="text-lg font-semibold mb-2">Income vs Expense</h2>
        <Chart
          options={{
            chart: { type: "bar" },
            xaxis: { categories: ["Income", "Expense"] },
            colors: ["#4caf50", "#f44336"],
            dataLabels: {
              formatter: numberFormat,
            },
          }}
          series={[
            {
              name: "Amount",
              data: [Math.round(income), Math.round(expense)],
            },
          ]}
          type="bar"
          width={400}
          height={300}
        />
      </div>

      {/* Expense Breakdown */}
      <div className="flex flex-col items-center">
        <h2 className="text-lg font-semibold mb-2">Expense Breakdown</h2>
        {hasExpenseData ? (
          <Chart
            options={{
              labels: Object.keys(expenseByCategory),
              legend: { position: "bottom" },
              dataLabels: {
                formatter: numberFormat,
              },
            }}
            series={Object.values(expenseByCategory).map((v) =>
              Math.round(v)
            )}
            type="pie"
            width={400}
            height={300}
          />
        ) : (
          <p className="text-gray-500">No expense data available</p>
        )}
      </div>

      {/* Income Breakdown */}
      <div className="flex flex-col items-center">
        <h2 className="text-lg font-semibold mb-2">Income Breakdown</h2>
        {hasIncomeData ? (
          <Chart
            options={{
              labels: Object.keys(incomeByCategory),
              legend: { position: "bottom" },
              dataLabels: {
                formatter: numberFormat,
              },
            }}
            series={Object.values(incomeByCategory).map((v) =>
              Math.round(v)
            )}
            type="pie"
            width={400}
            height={300}
          />
        ) : (
          <p className="text-gray-500">No income data available</p>
        )}
      </div>

      {/* Balance */}
      <div className="flex flex-col items-center">
        <h2 className="text-lg font-semibold mb-2">Balance</h2>
        <Chart
          options={{
            chart: { type: "bar" },
            xaxis: { categories: ["Balance"] },
            colors: ["#2196f3"],
            dataLabels: {
              formatter: numberFormat,
            },
          }}
          series={[
            {
              name: "Balance",
              data: [Math.round(balance)],
            },
          ]}
          type="bar"
          width={400}
          height={300}
        />
      </div>
    </div>
  );
};

export default DataCharts;
