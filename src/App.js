import React, { useState, useEffect } from 'react';
import './App.css';
import { gql } from "apollo-boost";
import { useQuery } from '@apollo/react-hooks';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { withStyles, makeStyles } from '@material-ui/core/styles';

function App() {

  const [time, setTime] = useState(0);

  const hslquery = (gql`
  {
    matinkyla: stops(ids: "HSL:1452602"){
      gtfsId,
      name,
      id,
      vehicleType,
      vehicleMode,
      stoptimesWithoutPatterns{
        headsign,
        realtimeArrival
      }
  }
    vuosaari: stops(ids: "HSL:1452601"){
      name,
      stoptimesWithoutPatterns{
        headsign,
        realtimeArrival
      }
  }
  }`);

  useEffect(() => {
    refresh();
  }, [])

  setInterval(() => {
    refresh();
  }, 5000)

  const refresh = () => {
    refetch();
    const date = new Date();
    setTime((date.getHours() * 60 * 60) + (date.getMinutes() * 60) + (date.getSeconds()));
    console.log(date);
  }

  const StyledTableCell = withStyles(theme => ({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }))(TableCell);

  const useStyles = makeStyles({
    table: {
      maxWidth: 500,
    },
  });

  const classes = useStyles();
  
  const {loading, error, data, refetch} = useQuery(hslquery);

  if (loading)
    return "Loading...";
  if (error) // It there came an error
    return `Error ${error.message}`;

  return (
    <div className="App">
      <Table className={classes.table} selectable={false}>
        <TableHead>
          <TableRow>
            <StyledTableCell>Suunta</StyledTableCell>
            <StyledTableCell>Saapumisaika</StyledTableCell>
            <StyledTableCell>Pysäkki</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            data.matinkyla.map((stop, index) => 
              <TableRow key={index}>
                <TableCell>{stop.stoptimesWithoutPatterns[0].headsign}</TableCell>
                <TableCell>{Math.ceil((stop.stoptimesWithoutPatterns[0].realtimeArrival - time) / 60)} min</TableCell>
                <TableCell>{stop.name}</TableCell>
              </TableRow>
            )
          }
          {
            data.matinkyla.map((stop, index) => 
              <TableRow key={index}>
                <TableCell>{stop.stoptimesWithoutPatterns[1].headsign}</TableCell>
                <TableCell>{Math.ceil((stop.stoptimesWithoutPatterns[1].realtimeArrival - time) / 60)} min</TableCell>
                <TableCell>{stop.name}</TableCell>
              </TableRow>
            )
          }
          {
            data.matinkyla.map((stop, index) => 
              <TableRow key={index}>
                <TableCell>{stop.stoptimesWithoutPatterns[2].headsign}</TableCell>
                <TableCell>{Math.ceil((stop.stoptimesWithoutPatterns[2].realtimeArrival - time) / 60)} min</TableCell>
                <TableCell>{stop.name}</TableCell>
              </TableRow>
            )
          }
          {
            data.matinkyla.map((stop, index) => 
              <TableRow key={index}>
                <TableCell>{stop.stoptimesWithoutPatterns[3].headsign}</TableCell>
                <TableCell>{Math.ceil((stop.stoptimesWithoutPatterns[3].realtimeArrival - time) / 60)} min</TableCell>
                <TableCell>{stop.name}</TableCell>
              </TableRow>
            )
          }
        </TableBody>
      </Table>
      <Table className={classes.table} selectable={false}>
        <TableHead>
          <TableRow>
            <StyledTableCell>Suunta</StyledTableCell>
            <StyledTableCell>Saapumisaika</StyledTableCell>
            <StyledTableCell>Pysäkki</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            data.vuosaari.map((stop, index) => 
              <TableRow key={index}>
                <TableCell>{stop.stoptimesWithoutPatterns[0].headsign}</TableCell>
                <TableCell>{Math.ceil((stop.stoptimesWithoutPatterns[0].realtimeArrival - time) / 60)} min</TableCell>
                <TableCell>{stop.name}</TableCell>
              </TableRow>
            )
          }
          {
            data.vuosaari.map((stop, index) => 
              <TableRow key={index}>
                <TableCell>{stop.stoptimesWithoutPatterns[1].headsign}</TableCell>
                <TableCell>{Math.ceil((stop.stoptimesWithoutPatterns[1].realtimeArrival - time) / 60)} min</TableCell>
                <TableCell>{stop.name}</TableCell>
              </TableRow>
            )
          }
          {
            data.vuosaari.map((stop, index) => 
              <TableRow key={index}>
                <TableCell>{stop.stoptimesWithoutPatterns[2].headsign}</TableCell>
                <TableCell>{Math.ceil((stop.stoptimesWithoutPatterns[2].realtimeArrival - time) / 60)} min</TableCell>
                <TableCell>{stop.name}</TableCell>
              </TableRow>
            )
          }
          {
            data.vuosaari.map((stop, index) => 
              <TableRow key={index}>
                <TableCell>{stop.stoptimesWithoutPatterns[3].headsign}</TableCell>
                <TableCell>{Math.ceil((stop.stoptimesWithoutPatterns[3].realtimeArrival - time) / 60)} min</TableCell>
                <TableCell>{stop.name}</TableCell>
              </TableRow>
            )
          }
        </TableBody>
      </Table>
    </div> 
  );
  
}

export default App;
