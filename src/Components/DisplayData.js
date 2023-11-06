import React from 'react'
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import { Clear } from '../Action';

export default function DisplayData() {

  let dispatch = useDispatch()
  let state = useSelector(state => state.dataReducer)
  let clear = () => {
    dispatch(Clear())
     window.location.reload()
  }

  

  return (
    <>
     
      <div style={{ display: "flex", justifyContent: "center", marginBottom: "15px", marginTop: "50px" }}>
        <Button variant="contained" onClick={clear}>Clear Information</Button>
      </div>

      <Grid container justifyContent="center" alignItems="center" spacing={3}>



        {state.places && state.places.map((elem, id) => {
          return <Grid item key={id} style={{ display: "flex", justifyContent: "center" }} sm={6} xs={12} md={6} lg={4} xl={3}>

            <Card className='hover' sx={{ width: "400px", height: "430px", background: "darkgray", mb: 1.5, }}>
              <CardContent>
                <Typography style={{ color: "white" }} variant="h3" gutterBottom>
                  Country :  {state.country}
                </Typography>
                <Typography style={{ color: "white" }} variant="h5" gutterBottom component="div">
                  State :  {elem.state}
                </Typography>
                <Typography style={{ color: "white" }} variant='h5' gutterBottom sx={{ mb: 1.5 }} >
                  Place Name : {elem["place name"]}
                </Typography>

              </CardContent>

            </Card>
          </Grid>
        })}
      </Grid>

    </>
  )
}
