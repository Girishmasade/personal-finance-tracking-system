import React from 'react'
import SelectActionCard from '../components/Card'
import Table from '../components/Table'
const Dashboard = () => {
  return (
    <div>
      <SelectActionCard/>
      <div className="pt-10">
        <Table/>
        
      </div>
    </div>
  )
}

export default Dashboard
