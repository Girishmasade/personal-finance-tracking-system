import React from 'react'
import SelectActionCard from '../components/Card'
import Table from '../components/Table'
import Text from '../components/Text'
import transactions from '../assets/transactions'
import { Box } from '@mui/material'

const Dashboard = () => {
  return (
    <div>
      <SelectActionCard/>
      <div className="pt-10">
      <Text title={"Recent Transactions"} />

        <Box sx={{overflowX: 'auto', overflowY: 'hidden'}}>
        <Table rows={transactions}/>
        </Box>
        
      </div>
    </div>
  )
}

export default Dashboard
