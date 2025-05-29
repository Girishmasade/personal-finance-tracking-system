import React from 'react'
import Table from '../components/Table'
import Text from '../components/Text'
import transactions from '../assets/transactions'
import { Box } from '@mui/material'
import { useGetTransactionsQuery } from '../Redux/app/transactionApiSlice'
import SelectActionCard from '../components/Card'

const Dashboard = () => {

  const {data} = useGetTransactionsQuery()
  const transactions = data?.transaction || []

  return (
    <div>
      <SelectActionCard transactions={transactions}/>
      <div className="pt-10">
      <Text title={"Recent Transactions"} />

        <Box>
        <Table rows={transactions.slice(0, 5)}/>
        </Box>
        
      </div>
    </div>
  )
}

export default Dashboard
