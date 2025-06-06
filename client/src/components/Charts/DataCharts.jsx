import React, { useMemo } from "react";
import Chart from "react-apexcharts";
import { Grid, Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import { useGetTransactionsQuery } from "../../Redux/app/transactionApiSlice";

const DataCharts = () => {
  const { data } = useGetTransactionsQuery();
  const transactions = Array.isArray(data?.transaction) ? data.transaction : [];

  const income = useMemo(
    () =>
      transactions
        .filter((item) => item.type === "Income")
        .reduce((acc, item) => acc + item.amount, 0),
    [transactions]
  );

  const expense = useMemo(
    () =>
      transactions
        .filter((item) => item.type === "Expense")
        .reduce((acc, item) => acc + item.amount, 0),
    [transactions]
  );

  const balance = income - expense;

  const expenseByCategory = useMemo(() => {
    return transactions
      .filter((item) => item.type === "Expense" && typeof item.amount === "number")
      .reduce((acc, curr) => {
        const category = curr.category || "Uncategorized";
        acc[category] = (acc[category] || 0) + curr.amount;
        return acc;
      }, {});
  }, [transactions]);

  const incomeByCategory = useMemo(() => {
    return transactions
      .filter((item) => item.type === "Income" && typeof item.amount === "number")
      .reduce((acc, curr) => {
        const category = curr.category || "Uncategorized";
        acc[category] = (acc[category] || 0) + curr.amount;
        return acc;
      }, {});
  }, [transactions]);

  const hasExpenseData = Object.keys(expenseByCategory).length > 0;
  const hasIncomeData = Object.keys(incomeByCategory).length > 0;

  const numberFormat = (val) => Math.round(val).toLocaleString("en-IN");

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const chartSize = isMobile ? 280 : 400;

  return (
    <Box p={2} width="100%">
      <Grid container spacing={3}>
        {/* Income vs Expense */}
        <Grid item xs={12} md={6}>
          <Box display="flex" flexDirection="column" alignItems="center">
            <Typography variant="h6" gutterBottom>
              Income vs Expense
            </Typography>
            <Chart
              options={{
                chart: { type: "bar" },
                xaxis: { categories: ["Income", "Expense"] },
                colors: ["#4caf50", "#f44336"],
                dataLabels: { formatter: numberFormat },
              }}
              series={[
                {
                  name: "Amount",
                  data: [Math.round(income), Math.round(expense)],
                },
              ]}
              type="bar"
              width={chartSize}
              height={300}
            />
          </Box>
        </Grid>

        {/* Expense Breakdown */}
        <Grid item xs={12} md={6}>
          <Box display="flex" flexDirection="column" alignItems="center">
            <Typography variant="h6" gutterBottom>
              Expense Breakdown
            </Typography>
            {hasExpenseData ? (
              <Chart
                options={{
                  labels: Object.keys(expenseByCategory),
                  legend: { position: "bottom" },
                  dataLabels: { formatter: numberFormat },
                }}
                series={Object.values(expenseByCategory).map((v) => Math.round(v))}
                type="pie"
                width={chartSize}
                height={300}
              />
            ) : (
              <Typography variant="body2" color="textSecondary">
                No expense data available
              </Typography>
            )}
          </Box>
        </Grid>

        {/* Income Breakdown */}
        <Grid item xs={12} md={6}>
          <Box display="flex" flexDirection="column" alignItems="center">
            <Typography variant="h6" gutterBottom>
              Income Breakdown
            </Typography>
            {hasIncomeData ? (
              <Chart
                options={{
                  labels: Object.keys(incomeByCategory),
                  legend: { position: "bottom" },
                  dataLabels: { formatter: numberFormat },
                }}
                series={Object.values(incomeByCategory).map((v) => Math.round(v))}
                type="pie"
                width={chartSize}
                height={300}
              />
            ) : (
              <Typography variant="body2" color="textSecondary">
                No income data available
              </Typography>
            )}
          </Box>
        </Grid>

        {/* Balance */}
        <Grid item xs={12} md={6}>
          <Box display="flex" flexDirection="column" alignItems="center">
            <Typography variant="h6" gutterBottom>
              Balance
            </Typography>
            <Chart
              options={{
                chart: { type: "bar" },
                xaxis: { categories: ["Balance"] },
                colors: ["#2196f3"],
                dataLabels: { formatter: numberFormat },
              }}
              series={[
                {
                  name: "Balance",
                  data: [Math.round(balance)],
                },
              ]}
              type="bar"
              width={chartSize}
              height={300}
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DataCharts;
