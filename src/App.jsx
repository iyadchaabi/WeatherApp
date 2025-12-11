import './App.css'
import { createTheme , ThemeProvider } from '@mui/material/styles'
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import CloudIcon from '@mui/icons-material/Cloud';
import { useEffect, useState } from 'react';
import axios from "axios"
import moment from "moment"
const theme = createTheme({
  typography: {
    fontFamily: "POP, sans-serif",
  },
});

let cancelAxios = null;
function App() {
  

const [time , setTime] = useState('')
const [date , setDate] = useState('')
const [temp , setTemp] =useState({
  degree:null,
  desc:"",
  min:null,
  max:null,
  icon:null
})
useEffect(() => {
  // live clock
  const timer = setInterval(() => {
    setTime(moment().format('LTS'))
  }, 1000)})

useEffect(() => {
  setDate(moment().format('MMMM Do YYYY'))
  axios.get(
    "https://api.openweathermap.org/data/2.5/weather?lat=36.3650&lon=6.6147&appid=85f4980dab231151375afa33ef1535c0",
    {
      cancelToken: new axios.CancelToken((c) => {
        cancelAxios = c;
      }),
    }
  )
  .then((response) => {
    const deg = Math.round(response.data.main.temp - 273.15);
    const min = Math.round(response.data.main.temp_min - 273.15);
    const max = Math.round(response.data.main.temp_max - 273.15);
    const desc = response.data.weather[0].description; 
    const icon = response.data.weather[0].icon; 
    setTemp({
      degree: deg,
      desc: desc,
      min: min,
      max: max,
      icon:icon
    });
    
  })
  .catch((error) => {
    console.log(error);
  });

  return () => {
    console.log("cancelling");
    if (cancelAxios) cancelAxios();
  };
}, []);


  return (
    <>
    <ThemeProvider theme={theme}>
        <Container maxWidth="md" >
          <Box sx={{ 
    height: "100vh",       
    display: "flex", 
    justifyContent: "center", 
    alignItems: "center",  
      overflow: "hidden"    
  }}>
          <Card sx={{ color:"white",  width: "100%", bgcolor:"rgb(28 52 91 / 36%)", p:4 , borderRadius:"15px" , boxShadow:"0px 11px 1px rgba(0,0,0,0.05"}} >
            <CardContent>

        <Stack
          direction="row"
          sx={{ justifyContent: '', alignItems: 'center' }}
        >
          <Typography  variant="h2" component="div">
            Constantine
          </Typography>
          <Typography sx={{ml:2}}  variant="h6" component="div">
          {date} {time}
          </Typography>
        </Stack>
        
     
      <Divider sx={{bgcolor: "white", height: ".9px", mt:1,mb:4  }} >
        <Chip label="Today's Weather" size="small" sx={{color:"white"}} />
      </Divider>
      
      <Grid container spacing={5} >
        <Grid size={6}>
          <CloudIcon sx={{fontSize:200 , color:"white"}}/>
        </Grid>
        <Grid size={6}>
            <Stack
          direction="row"
          sx={{ justifyContent:'', alignItems: 'center' }}
        >
          <img src={`https://openweathermap.org/img/w/${temp.icon}.png`} sx={{fontSize:50 , color:"white" 
             
            }} />
          <Typography  variant="h1" component="div">
          {temp.degree}
          </Typography>
        </Stack>
        <Typography  variant="h6" component="div">
          {temp.desc}
          </Typography>
          <Stack direction="row" spacing={2}>
      <Typography variant="h6" component="div">
        min:{temp.min}
      </Typography>
      <Typography variant="h6" component="div">
        |
      </Typography>
      <Typography variant="h6" component="div">
        max:{temp.max}
      </Typography>
    </Stack>
        </Grid>
       
      </Grid>
            </CardContent>
          </Card>
          </Box>
        </Container>
    </ThemeProvider>
    
    </>
  )
}

export default App;
