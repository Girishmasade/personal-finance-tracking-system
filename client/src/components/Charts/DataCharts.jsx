import React from 'react'
import { BarChart } from '@mui/x-charts/BarChart';
const DataCharts = () => {
  return (
    <div>
        <BarChart
      series={[
        { data: [35, 44, 24, 34] },
        { data: [51, 6, 49, 30] },
        { data: [15, 25, 30, 50] },
        { data: [60, 50, 15, 25] },
      ]}
      height={290}
      xAxis={[{ data: ['Q1', 'Q2', 'Q3', 'Q4'] }]}
    />


    
    </div>
  )
}

export default DataCharts
