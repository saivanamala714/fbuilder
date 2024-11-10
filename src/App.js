import * as React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { useSelector, useDispatch } from 'react-redux';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';



const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
});

const getColumns = (callPut) => [
  { field: 'expiryDate', headerName: 'Expiry Date', width: 130 },
  { field: 'c_Change', headerName: 'Current Change', width: 130 },
  {
    field: callPut == 'call' ? 'c_Volume' : 'p_Volume',
    headerName: 'Today`s Volume',
    type: 'number',
    width: 90,
  },
  {
    field: callPut == 'call' ? 'c_Openinterest': 'p_Openinterest',
    headerName: 'Open Interest',
    type: 'number',
    width: 90,
  },
  {
    field: 'strike',
    headerName: 'Strike',
    type: 'number',
    width: 90,
  },

];

// {
//   field: 'c_Openinterest',
//   headerName: 'Open Interest',
//   description: 'This column has a value getter and is not sortable.',
//   sortable: false,
//   width: 160,
//   valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`,
// },

const paginationModel = { page: 0, pageSize: 5 };

const App = (props) => {
  const { classes } = props;
  const dispatch = useDispatch();
  const [ticker, setTicker] = React.useState();
  const [callPut, setCallPut] = React.useState();
  return <div className={classes.root}>
    <Grid container spacing={24}>
      <Grid item xs={12}>
        <Paper className={classes.paper}>Stock daily volume</Paper>
      </Grid>
      <Grid item xs={3}>
        <Button variant="contained" onClick={() => dispatch({ type: 'GET_NEWS', payload: { ticker, callPut} })}>Get Data</Button>
      </Grid>
      <Grid item xs={3}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Ticker</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={ticker}
            label="Age"
            onChange={(e) => { setTicker(e.target.value) }}
          >
            <MenuItem value={'TSLA'}>TSLA</MenuItem>
            <MenuItem value={'NVDA'}>NVDA</MenuItem>
            <MenuItem value={'AMZN'}>AMZN</MenuItem>
            <MenuItem value={'AMD'}>AMD</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={3}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Call/PUT</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={callPut}
            label="Age"
            onChange={(e) => { setCallPut(e.target.value) }}
          >
            <MenuItem value={'call'}>CALL</MenuItem>
            <MenuItem value={'put'}>PUT</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <Paper className={classes.paper}>
          <h1>{ticker}</h1>
          <DataGrid
            rows={useSelector(state => state.data)}
            columns={getColumns(callPut)}
            initialState={{ pagination: { paginationModel } }}
            pageSizeOptions={[5, 10]}
            checkboxSelection
            sx={{ border: 0 }}
          />
        </Paper>
      </Grid>
    </Grid>
  </div>
}
App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);
