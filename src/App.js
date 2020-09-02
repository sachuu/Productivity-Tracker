import uuid from "uuid";
import React, {useState} from 'react';

import { Chart } from "react-google-charts";

import Drawer from '@material-ui/core/Drawer';
import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import Checkbox from '@material-ui/core/Checkbox';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';

import NightsStayIcon from '@material-ui/icons/NightsStay';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import CachedRoundedIcon from '@material-ui/icons/CachedRounded';

import { grey } from '@material-ui/core/colors';
import { deepPurple } from '@material-ui/core/colors';

import AddBoxRoundedIcon from '@material-ui/icons/AddBoxRounded';
import { Button , TextField, IconButton} from '@material-ui/core'; 
import BarChartRoundedIcon from '@material-ui/icons/BarChartRounded';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

function App() {

  //Todos ----------
  const [todos, setTodos] = React.useState([]); 

  React.useEffect(() => {
    //Reads/saves todos from localStorage on change. If currList isn't found it will fallback to an empty list
    const savedTodos = JSON.parse(localStorage.getItem("currList")) || [];
    setTodos(savedTodos);
  }, []);

  //Time Settings ----------
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const greetings = ["Good Morning", "Good Afternoon", "Good Evening"];

  let time = new Date().toLocaleTimeString([], {timeStyle: 'short'});
  const [currTime, setCurrTime] = useState(time);

  function updateTime(){
    time = new Date().toLocaleTimeString([], {timeStyle: 'short'});
    setCurrTime(time);
  };

  //Greeting Settings ----------
  const [currGreeting, setCurrGreeting] = useState(greetings[0]);

  function updateGreeting(){
    time = new Date();
    
    let hour = time.getHours();

    if(12 > hour && hour > 5){
      setCurrGreeting(greetings[0]);
    }
    if((18 > hour && hour > 12) || hour === 12){
      setCurrGreeting(greetings[1]);
    }
    if(hour > 18 || (5 > hour && hour >= 0)){
      setCurrGreeting(greetings[2]);
    }
  }

  //Date Settings ----------
  let date = new Date();
  let currDay = date.getDay();
  const [currDate, setCurrDate] = useState(days[currDay]);

  function updateDate(){
    date = new Date();
    currDay = date.getDay();
    setCurrDate(days[currDay]);
  }

  //Everything updated every second except storing greetings to limit database calls.
  React.useEffect(() => {
    updateGreeting();
    setInterval(()=>updateGreeting(), 1000);
  });

  React.useEffect(() => {
    setInterval(()=>updateTime(), 1000);
  });

  React.useEffect(() => {
    setInterval(()=>updateDate(), 60000);
  });
    
  //Night Mode Settings ----------
  const[isNightMode, setIsNightMode] = React.useState(false);

  React.useEffect(() => {
    const sessionSettings = JSON.parse(localStorage.getItem("startupNightMode")) || [];
    setNightMode(sessionSettings);
  }, []);
  
  const [nightMode, setNightMode] = React.useState({
    background: "#FFFFFF",
    banner: "#55BAF1",
    bannerText: "#FFFFFF",
    listText: "#000000",
    inputBackground: "FFFFFF",
  });

  function switchNightMode(){
    if(isNightMode){ 
      setIsNightMode(false);  
    }
    else{
      setIsNightMode(true);
    }

    if(isNightMode){
      setNightMode(
        {
          background: "#413250", 
          bannerText: "#413250",
          listText: "#FFFFFF", 
          banner: "#FFFFFF",
          inputBackground: "#465C68"
        });   

        const currSession = {
          background: "#413250" ,
          bannerText: "#413250" ,
          listText: "#FFFFFF",
          banner: "#FFFFFF",
          inputBackground: "#465C68"
        };

        localStorage.setItem("startupNightMode", JSON.stringify(currSession));
    }
    else{
      setNightMode({
        background: "#FFFFFF" ,
        bannerText: "#FFFFFF" ,
        listText: "#000000",
        banner: "#55BAF1",
        inputBackground: "#465C68"
      });

      const currSession = {
        background: "#FFFFFF" ,
        bannerText: "#FFFFFF" ,
        listText: "#000000",
        banner: "#55BAF1",
        inputBackground: "#465C68"
      };

      localStorage.setItem("startupNightMode", JSON.stringify(currSession));
    }
  }

  //Drawer Settings ----------
  const [drawer, setDrawer] = React.useState(false);

  function toggleDrawerOpen(){
    setDrawer(true);
  }

  function toggleDrawerClose(){
    setDrawer(false);
  }

  const [resetPrompt, setResetPrompt] = React.useState(false);

  const promptOpen = () => {
    setResetPrompt(true);
  };

  const promptClose = () => {
    setResetPrompt(false);
  };

  //Dashboard Settings ----------
  const [dashboard, setDashboard] = React.useState(false);

  function toggleDashboardOpen(){
    setDashboard(true);
  }

  function toggleDashboardClose(){
    setDashboard(false);
  }

  //User Stats ----------
  const [tasksFinishedTotal, setTasksFinishedTotal] = React.useState(0);
  const [tasksFinishedToday, setTasksFinishedToday] = React.useState(0);

  const [totalSunday, setTotalSunday] = React.useState(0);
  const [totalMonday, setTotalMonday] = React.useState(0);
  const [totalTuesday, setTotalTuesday] = React.useState(0);
  const [totalWednesday, setTotalWednesday] = React.useState(0);
  const [totalThursday, setTotalThursday] = React.useState(0);
  const [totalFriday, setTotalFriday] = React.useState(0);
  const [totalSaturday, setTotalSaturday] = React.useState(0);

  const [avgSunday, setAvgSunday] = React.useState(0);
  const [avgMonday, setAvgMonday] = React.useState(0);
  const [avgTuesday, setAvgTuesday] = React.useState(0);
  const [avgWednesday, setAvgWednesday] = React.useState(0);
  const [avgThursday, setAvgThursday] = React.useState(0);
  const [avgFriday, setAvgFriday] = React.useState(0);
  const [avgSaturday, setAvgSaturday] = React.useState(0);

  function addWeekdayTotal(){
    const timeForDay = new Date();
    
    let currentDay = timeForDay.getDay(); 

    if(currentDay === 0){
      addSunday();
      console.log("added Sunday")
    }
    else if(currentDay === 1){
      addMonday();
      console.log("added Monday");
    }
    else if(currentDay === 2){
      addTuesday();
      console.log("added Tuesday");
    }
    else if(currentDay === 3){
      addWednesday();
      console.log("added Wednesday");
    }
    else if(currentDay === 4){
      addThursday();
      console.log("added Thursday");
    }
    else if(currentDay === 5){
      addFriday();
      console.log("added Friday");
    }
    else if(currentDay === 6){
      addSaturday();
      console.log("added Saturday");
    }
  }

  function addSunday(){
    const currSunday = totalSunday + 1;
    setTotalSunday(totalSunday + 1);
    localStorage.setItem("storedTotalSunday", currSunday);

    //Make sure avg is average 
    const currTotalTasks = tasksFinishedTotal + 1;
    const sunAvg = Math.round(currTotalTasks / currSunday);
    setAvgSunday(sunAvg);
  }

  function addMonday(){
    const currMonday = totalMonday + 1;
    setTotalMonday(totalMonday + 1);
    localStorage.setItem("storedTotalMonday", currMonday);

    const currTotalTasks = tasksFinishedTotal + 1;
    const monAvg = Math.round(currTotalTasks / currMonday);
    setAvgMonday(monAvg); 
  }

  function addTuesday(){
    const currTuesday = totalTuesday + 1;
    setTotalTuesday(totalTuesday + 1);
    localStorage.setItem("storedTotalTuesday", currTuesday);

    const currTotalTasks = tasksFinishedTotal + 1;
    const tuesAvg = Math.round(currTotalTasks / currTuesday);
    setAvgTuesday(tuesAvg); 
  }

  function addWednesday(){
    const currWednesday = totalWednesday + 1;
    setTotalWednesday(totalWednesday + 1);
    localStorage.setItem("storedTotalWednesday", currWednesday);

    const currTotalTasks = tasksFinishedTotal + 1;
    const wedAvg = Math.round(currTotalTasks / currWednesday);
    setAvgWednesday(wedAvg); 
  }

  function addThursday(){
    const currThursday = totalThursday + 1;
    setTotalThursday(totalThursday + 1);
    localStorage.setItem("storedTotalThursday", currThursday);

    const currTotalTasks = tasksFinishedTotal + 1;
    const thurAvg = Math.round(currTotalTasks / currThursday);
    setAvgThursday(thurAvg); 
  }

  function addFriday(){
    const currFriday = totalFriday + 1;
    setTotalFriday(totalFriday + 1);
    localStorage.setItem("storedTotalFriday", currFriday);

    const currTotalTasks = tasksFinishedTotal + 1;
    const friAvg = Math.round(currTotalTasks / currFriday);
    setAvgFriday(friAvg); 
  }

  function addSaturday(){
    const currSaturday = totalSaturday + 1;
    setTotalSaturday(totalSaturday + 1);
    localStorage.setItem("storedTotalSaturday", currSaturday);

    const currTotalTasks = tasksFinishedTotal + 1;
    const satAvg = Math.round(currTotalTasks / currSaturday);
    setAvgSaturday(satAvg); 
  }

  function resetDates(){
    setTotalSunday(0);
    setTotalMonday(0);
    setTotalTuesday(0);
    setTotalWednesday(0);
    setTotalThursday(0);
    setTotalFriday(0);
    setTotalSaturday(0);

    localStorage.setItem("storedTotalSunday", 0);
    localStorage.setItem("storageTotalMonday", 0);
    localStorage.setItem("storageTotalTuesday", 0);
    localStorage.setItem("storageTotalWednesday", 0);
    localStorage.setItem("storageTotalThursday", 0);
    localStorage.setItem("storageTotalFriday", 0);
    localStorage.setItem("storageTotalSaturday", 0);
  }

  React.useEffect(() => {
    const daysAdded = JSON.parse(localStorage.getItem("storedTotalSunday")) || 0;
    setTotalSunday(daysAdded);
  }, []);

  React.useEffect(() => {
    const daysAdded = JSON.parse(localStorage.getItem("storageTotalMonday")) || 0;
    setTotalMonday(daysAdded);
  }, []);

  React.useEffect(() => {
    const daysAdded = JSON.parse(localStorage.getItem("storageTotalTuesday")) || 0;
    setTotalTuesday(daysAdded);
  }, []);

  React.useEffect(() => {
    const daysAdded = JSON.parse(localStorage.getItem("storageTotalWednesday")) || 0;
    setTotalWednesday(daysAdded);
  }, []);

  React.useEffect(() => {
    const daysAdded = JSON.parse(localStorage.getItem("storageTotalThursday")) || 0;
    setTotalThursday(daysAdded);
  }, []);

  React.useEffect(() => {
    const daysAdded = JSON.parse(localStorage.getItem("storageTotalFriday")) || 0;
    setTotalFriday(daysAdded);
  }, []);

  React.useEffect(() => {
    const daysAdded = JSON.parse(localStorage.getItem("storageTotalSaturday")) || 0;
    setTotalSaturday(daysAdded);
  }, []);

  function addTotalTasks(){
    let currTasks = tasksFinishedTotal + 1 
    setTasksFinishedTotal(tasksFinishedTotal+1);
    localStorage.setItem("totalTasks", currTasks);
  }

  function resetStats(){
    setTasksFinishedTotal(0);
    localStorage.setItem("totalTasks", 0);
  }

  React.useEffect(() => {
    const totalTasksSaved = JSON.parse(localStorage.getItem("totalTasks")) || 0;
    setTasksFinishedTotal(totalTasksSaved);
  }, []);

  //Add Todos ----------
  const addTodo = text => {
    const newTodos = [
      { text, id: uuid() },
      ...todos
    ];
  
    setTodos(newTodos);
    localStorage.setItem("currList", JSON.stringify(newTodos));
  };

  //Remove Todos ----------
  const removeTodo = index => {

    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
    localStorage.setItem("currList", JSON.stringify(newTodos));

    handleClick();
    addTotalTasks();    //total tasks
    addWeekdayTotal();  //weekday totals / avg for data visualizer
  };

  const [value, setValue] = useState("");

  //Submit Form ----------
  const handleSubmit = e => {
    e.preventDefault();
    if (!value) return;
    addTodo(value);
    setValue("");

    setDrawer(false);
  };

  //Alert Settings ----------
  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };
 
  return (
    <div style={{height: '100%', padding: 50, flexDirection: 'column', backgroundColor: nightMode.background}}>

      <div> 
        <div style = {{display: 'flex', fontFamily: 'Work Sans', fontSize: 25 , marginBottom: 25, color: '#CDCACA'}}>
          <text>{currGreeting}</text>
        </div> 
      </div> 

      <Card style = {{marginBottom: 25, width: window.innerWidth/4, borderRadius: 30, backgroundColor: nightMode.banner, color: nightMode.bannerText, raised: true}}>
        <CardContent>
          <div style = {{display: 'flex', fontFamily: 'Work Sans', fontSize: 55}}>
            <text>{currDate}</text>
          </div>

          <text style = {{display: 'flex', fontFamily: 'Work Sans', fontSize: 45}}>{currTime}</text>
        </CardContent>
      </Card>
      
      <Drawer anchor={"bottom"} open={drawer} onClose={toggleDrawerClose} transitionDuration={300}>
        <form onSubmit={handleSubmit}>
          <div style = {{padding: 50}}>
            <TextField inputProps={{style: {fontFamily: 'Work Sans'}}} InputLabelProps = {{style: {fontFamily: 'Roboto'}}} id="standard-basic" autoComplete='off' value={value} name= "task" label="New Goal"  fullWidth onChange ={e => setValue(e.target.value)}/>
          </div>
          
          <div style = {{display: 'flex', alignSelf: 'center', justifyContent: 'center', marginBottom: 50}}>
            <Button type = "submit" variant="outlined" disableElevation size = "medium" fontFamily= "Roboto">
              Add Goal
            </Button>
          </div>
        </form>
      </Drawer>

      <Drawer anchor={"bottom"} open={dashboard} onClose={toggleDashboardClose} transitionDuration={300}>
        <div style = {{display: 'flex', flexDirection: "row", justifyContent: 'space-evenly'}}>
          <Card style = {{margin: 25, width: window.innerWidth/4, borderRadius: 30, backgroundColor: deepPurple[200], color: grey[50], raised: true}}>
            <CardContent>
              <div style = {{display: 'flex', flexDirection: "column", fontFamily: 'Work Sans', fontSize: 55}}>
                <text>{tasksFinishedTotal}</text>
                <text style = {{display: 'flex', fontFamily: 'Work Sans', fontSize: 25, color: grey[20]}}>{"Total Tasks Completed"}</text>
              </div>
              <div style = {{display: "flex", justifyContent: "center", marginTop: 10}}>
                <AccountCircleIcon style={{fontSize: 75}}/>
              </div>
            </CardContent>
          </Card>
          <Chart
            chartType="ScatterChart"
            data={[["Age", "Weight"], [4,5], [1,2]]}
            width="80%"
            height="300px"
            legendToggle
          />
        </div>
        <IconButton onClick = {promptOpen}>
          <CachedRoundedIcon style = {{fontSize: 40}}/>
        </IconButton>
      </Drawer>

      <Dialog
        open={resetPrompt}
        onClose={promptClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Reset All Stats To Zero? "}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Start fresh from the beginning 
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={promptClose} color="primary">
            No
          </Button>
          <Button onClick={promptClose, resetStats} color="primary" autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>

      <div style = {{paddingTop: 40}}>
        <List>
          {todos.map((value, index) => {
            return(
              <ListItem key={todos.id}> 
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    checked={false}
                    onChange={() => removeTodo(index)}
                    tabIndex={-1}
                    disableRipple
                  />
                </ListItemIcon>
                <ListItemText disableTypography style={{fontFamily: 'Work Sans', fontSize: 35, color: nightMode.listText}} primary={value.text}/>
              </ListItem>
            );
          })}

          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="success">
              Task Finished!
            </Alert>
          </Snackbar>

        </List>
      </div>

      <div style = {{display: 'flex', justifyContent: 'flex-end'}}>
        <IconButton onClick = {switchNightMode}>
          <NightsStayIcon style={{ color: grey[500]}}/>
        </IconButton>
      </div>

      <div style = {{display: 'flex', justifyContent: 'flex-end'}}>
        <IconButton onClick = {toggleDashboardOpen}>
          <BarChartRoundedIcon style={{ color: grey[500]}}/>
        </IconButton>
      </div>

      <div style = {{paddingLeft: (window.innerWidth/2)-100, justifyContent: 'flex-end'}}>
        <IconButton onClick = {toggleDrawerOpen}>
          <AddBoxRoundedIcon style={{ fontSize: 50, color: grey[500]}}/>
        </IconButton>
      </div>
    </div>
  );
};

export default App;
