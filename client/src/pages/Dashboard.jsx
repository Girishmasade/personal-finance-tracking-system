import React from 'react'
import Table from '../components/Table'
import Text from '../components/Text'
import { Box } from '@mui/material'
import { useGetTransactionsQuery } from '../Redux/app/transactionApiSlice'
import SelectActionCard from '../components/Card'
import Loading from '../components/Loading'

const Dashboard = () => {

  const {data, isLoading} = useGetTransactionsQuery(undefined, {
    refetchOnFocus: true,
    refetchOnReconnect: true,
    refetchOnMountOrArgChange: true
  })
  const transactions = data?.transaction || []

    // const { token } = useSelector((state) => state.auth);
    // console.log(token);
    
    // if (!token) {
    //   console.log("redirecting....");
      
    //   return <Navigate to={"/login"} />;
    // }

     if(isLoading) {
        return <Loading/>
      }

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
