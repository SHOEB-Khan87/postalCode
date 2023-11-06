import React, { useState } from 'react'
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useDispatch, useSelector } from 'react-redux';
import { allData } from '../Action';
import axios, { isCancel, AxiosError } from 'axios';
import Loading from './Loading';
import DisplayData from './DisplayData';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

export default function Home() {

    let dispatch = useDispatch();
    let state = useSelector(state => state.dataReducer)
    let [value, setValue] = useState("")
    let [error, setError] = useState(false)
    let [show, setShow] = useState(false)

    let changes = (e) => {
        setValue(e.target.value)
    }

    let submit = async (e) => {
        setShow(true)
        e.preventDefault()
        await axios.get(` https://api.zippopotam.us/in/${value}`).then(res => dispatch(allData(res.data))).
            catch(error => setError(error))
        setShow(false)
        setValue("")
    }

    let cancel = () => {
        setError(false)
    }




    return (
        <>
            {state.country === undefined ? <Container maxWidth="xl" >

                <Grid container justifyContent="center" alignItems="center" spacing={2}>

                    <Grid item style={{ display: "flex", justifyContent: "center" }} xs={12}>
                        <Typography variant="h4" gutterBottom>Enter A Postal Code To Receive Information About The Nearby Area.</Typography>
                    </Grid>

                    <Grid id='input' item style={{ display: "flex", justifyContent: "center", gap: "10px" }} xs={12}>
                        <TextField id="outlined-basic" type="number" onChange={changes} value={value} style={{ width: "60%" }} label="Enter Postal Code" variant="outlined" />
                        {value === "" ? <Button onClick={submit} disabled variant="contained">Submit</Button>
                            : <Button onClick={submit} variant="contained">Submit</Button>}
                    </Grid>


                </Grid>
                <div style={{ display: "flex", justifyContent: "center", marginTop: "50px" }}>
                    {show === true ? <Loading /> : ""}
                </div>

            </Container> : <DisplayData />}


            {error &&
                <div id='center'>


                    <div id='error' >
                        <div>
                            <Typography className='typo' id="modal-modal-description" sx={{ mt: 2 }}>
                                {error.message}
                            </Typography>
                        </div>

                        <div>
                            <IconButton
                                aria-label="close"
                                onClick={cancel}
                                sx={{
                                    position: 'absolute',
                                    marginTop: "17px",
                                    color: "black"
                                }}
                            >
                                <CloseIcon />
                            </IconButton>
                        </div>
                    </div>
                </div>}





        </>
    )
}
