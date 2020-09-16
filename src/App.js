import uuid from "uuid";
import React, {useState} from 'react';

import './App.css';

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
    else if((18 >= hour && hour > 12) || hour === 12){
      setCurrGreeting(greetings[1]);
    }
    else if(hour > 18 || (5 > hour && hour >= 0)){
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

  function storeColor(){
    const initialMode = {
      background: "#FFFFFF" ,
      bannerText: "#FFFFFF" ,
      listText: "#000000",
      banner: "#55BAF1",
      inputBackground: "#465C68"
    }

    localStorage.setItem("initialMode", JSON.stringify(initialMode));
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

  React.useEffect(() => {
    setInterval(()=>storeColor(), 60000);
  });
    
  //Night Mode Settings ----------
  const[isNightMode, setIsNightMode] = React.useState(false);
  const[screenBackground, setScreenBackground] = React.useState("#FFFFFF");
  
  const [nightMode, setNightMode] = React.useState({
    background: "#FFFFFF",
    bannerText: "#FFFFFF",
    listText: "#000000",
    banner: "#55BAF1",
    inputBackground: "FFFFFF",
  });

  function switchNightMode(){
    const darkMode = {
      background: "#413250", 
      bannerText: "#413250",
      listText: "#FFFFFF", 
      banner: "#FFFFFF",
      inputBackground: "#465C68"
    }
  
    const lightMode = {
      background: "#FFFFFF" ,
      bannerText: "#FFFFFF" ,
      listText: "#000000",
      banner: "#55BAF1",
      inputBackground: "#465C68"
    }
  
    let currentMode;
    let currSavedBackground;
  
    if(isNightMode){
      currentMode = darkMode;
      currSavedBackground = "#413250";
      document.body.style.backgroundColor = currSavedBackground;
      setIsNightMode(false);
      setNightMode(darkMode);
      localStorage.setItem("startupNightMode", JSON.stringify(darkMode));
      localStorage.setItem("savedScreenBackground", JSON.stringify(currSavedBackground));
    } else {
      currentMode = lightMode;
      currSavedBackground = "#FFFFFF";
      document.body.style.backgroundColor = currSavedBackground;
      setIsNightMode(true);
      setNightMode(lightMode);
      localStorage.setItem("startupNightMode", JSON.stringify(lightMode));
      localStorage.setItem("savedScreenBackground", JSON.stringify(currSavedBackground));
    }   
  }

  React.useEffect(() => {

    const currSavedColor = JSON.parse(localStorage.getItem("startupNightMode")) || [];

    const lightMode = {
      background: "#FFFFFF" ,
      bannerText: "#FFFFFF" ,
      listText: "#000000",
      banner: "#55BAF1",
      inputBackground: "#465C68"
    }

    console.log(currSavedColor.banner);

    if(currSavedColor.banner !== "#FFFFFF"){
      localStorage.setItem("startupNightMode", JSON.stringify(lightMode));
      const sessionSettings = JSON.parse(localStorage.getItem("startupNightMode")) || [];
      setNightMode(sessionSettings);
    }
    else{
      const sessionSettings = JSON.parse(localStorage.getItem("startupNightMode")) || [];
      setNightMode(sessionSettings);
    }
  }, []);

  React.useEffect(() => {
    const savedBackground = JSON.parse(localStorage.getItem("savedScreenBackground")) || [];
    console.log(savedBackground);
    document.body.style.backgroundColor = savedBackground; 
    setScreenBackground(savedBackground);
  }, []);

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
    }
    else if(currentDay === 1){
      addMonday();
    }
    else if(currentDay === 2){
      addTuesday();
    }
    else if(currentDay === 3){
      addWednesday();
    }
    else if(currentDay === 4){
      addThursday();
    }
    else if(currentDay === 5){
      addFriday();
    }
    else if(currentDay === 6){
      addSaturday();
    }
  }

  function addSunday(){
    const currSunday = totalSunday + 1;
    setTotalSunday(totalSunday + 1);
    localStorage.setItem("storedTotalSunday", currSunday);

    //Make sure avg is average 
    const currTotalTasks = tasksFinishedTotal + 1;
    const sunAvg = (Math.round((currSunday / currTotalTasks)*100));
    setAvgSunday(sunAvg);
    localStorage.setItem("storedAvgSun", sunAvg);
  }

  function addMonday(){
    const currMonday = totalMonday + 1;
    setTotalMonday(totalMonday + 1);
    localStorage.setItem("storedTotalMonday", currMonday);

    const currTotalTasks = tasksFinishedTotal + 1;
    const monAvg = (Math.round((currMonday / currTotalTasks)*100));
    setAvgMonday(monAvg); 
    localStorage.setItem("storedAvgMon", monAvg);
  }

  function addTuesday(){
    const currTuesday = totalTuesday + 1;
    setTotalTuesday(totalTuesday + 1);
    localStorage.setItem("storedTotalTuesday", currTuesday);

    const currTotalTasks = tasksFinishedTotal + 1;
    const tueAvg = (Math.round((currTuesday / currTotalTasks)*100));
    setAvgTuesday(tueAvg); 
    localStorage.setItem("storedAvgTue", tueAvg);
  }

  function addWednesday(){
    const currWednesday = totalWednesday + 1;
    setTotalWednesday(totalWednesday + 1);
    localStorage.setItem("storedTotalWednesday", currWednesday);

    const currTotalTasks = tasksFinishedTotal + 1;
    const wedAvg = (Math.round((currWednesday / currTotalTasks)*100));
    setAvgWednesday(wedAvg); 
    localStorage.setItem("storedAvgWed", wedAvg);
  }

  function addThursday(){
    const currThursday = totalThursday + 1;
    setTotalThursday(totalThursday + 1);
    localStorage.setItem("storedTotalThursday", currThursday);

    const currTotalTasks = tasksFinishedTotal + 1;
    const thurAvg = (Math.round((currThursday / currTotalTasks)*100));
    setAvgThursday(thurAvg); 
    localStorage.setItem("storedAvgThu", thurAvg);
  }

  function addFriday(){
    const currFriday = totalFriday + 1;
    setTotalFriday(totalFriday + 1);
    localStorage.setItem("storedTotalFriday", currFriday);

    const currTotalTasks = tasksFinishedTotal + 1;
    const friAvg = (Math.round((currFriday / currTotalTasks)*100));
    setAvgFriday(friAvg); 
    localStorage.setItem("storedAvgFri", friAvg);
  }

  function addSaturday(){
    const currSaturday = totalSaturday + 1;
    setTotalSaturday(totalSaturday + 1);
    localStorage.setItem("storedTotalSaturday", currSaturday);

    const currTotalTasks = tasksFinishedTotal + 1;
    const satAvg = (Math.round((currSaturday / currTotalTasks)*100));
    setAvgSaturday(satAvg); 
    localStorage.setItem("storedAvgSat", satAvg);
  }

  React.useEffect(() => {
    const savedSunAvg = JSON.parse(localStorage.getItem("storedAvgSun")) || 0;
    setAvgSunday(savedSunAvg);
  }, []);

  React.useEffect(() => {
    const savedMonAvg = JSON.parse(localStorage.getItem("storedAvgMon")) || 0;
    setAvgMonday(savedMonAvg);
  }, []);

  React.useEffect(() => {
    const savedTueAvg = JSON.parse(localStorage.getItem("storedAvgTue")) || 0;
    setAvgTuesday(savedTueAvg);
  }, []);

  React.useEffect(() => {
    const savedWedAvg = JSON.parse(localStorage.getItem("storedAvgWed")) || 0;
    setAvgWednesday(savedWedAvg);
  }, []);

  React.useEffect(() => {
    const savedThuAvg = JSON.parse(localStorage.getItem("storedAvgThur")) || 0;
    setAvgThursday(savedThuAvg);
  }, []);

  React.useEffect(() => {
    const savedFriAvg = JSON.parse(localStorage.getItem("storedAvgFri")) || 0;
    setAvgFriday(savedFriAvg);
  }, []);

  React.useEffect(() => {
    const savedSatAvg = JSON.parse(localStorage.getItem("storedAvgSat")) || 0;
    setAvgSaturday(savedSatAvg);
  }, []);

  React.useEffect(() => {
    const savedSunAvg = JSON.parse(localStorage.getItem("storedTotalSunday")) || 0;
    setTotalSunday(savedSunAvg);
  }, []);

  React.useEffect(() => {
    const totalStoredSun = JSON.parse(localStorage.getItem("storedTotalSunday")) || 0;
    setTotalSunday(totalStoredSun);
  }, []);

  React.useEffect(() => {
    const totalStoredMon = JSON.parse(localStorage.getItem("storageTotalMonday")) || 0;
    setTotalMonday(totalStoredMon);
  }, []);

  React.useEffect(() => {
    const totalStoredTue = JSON.parse(localStorage.getItem("storageTotalTuesday")) || 0;
    setTotalTuesday(totalStoredTue);
  }, []);

  React.useEffect(() => {
    const totalStoredWed = JSON.parse(localStorage.getItem("storageTotalWednesday")) || 0;
    setTotalWednesday(totalStoredWed);
  }, []);

  React.useEffect(() => {
    const totalStoredThu = JSON.parse(localStorage.getItem("storageTotalThursday")) || 0;
    setTotalThursday(totalStoredThu);
  }, []);

  React.useEffect(() => {
    const totalStoredFri = JSON.parse(localStorage.getItem("storageTotalFriday")) || 0;
    setTotalFriday(totalStoredFri);
  }, []);

  React.useEffect(() => {
    const totalStoredSat = JSON.parse(localStorage.getItem("storageTotalSaturday")) || 0;
    setTotalSaturday(totalStoredSat);
  }, []);

  function addTotalTasks(){
    let currTasks = tasksFinishedTotal + 1 
    setTasksFinishedTotal(tasksFinishedTotal+1);
    localStorage.setItem("totalTasks", currTasks);
  }

  function resetStats(){
    setTasksFinishedTotal(0);
    setTotalSunday(0);
    setTotalMonday(0);
    setTotalTuesday(0);
    setTotalWednesday(0);
    setTotalThursday(0);
    setTotalFriday(0);
    setTotalSaturday(0);
    setAvgSunday(0);
    setAvgMonday(0);
    setAvgTuesday(0);
    setAvgWednesday(0);
    setAvgThursday(0);
    setAvgFriday(0);
    setAvgSaturday(0);

    localStorage.setItem("totalTasks", 0);
    localStorage.setItem("storedTotalSunday", 0);
    localStorage.setItem("storageTotalMonday", 0);
    localStorage.setItem("storageTotalTuesday", 0);
    localStorage.setItem("storageTotalWednesday", 0);
    localStorage.setItem("storageTotalThursday", 0);
    localStorage.setItem("storageTotalFriday", 0);
    localStorage.setItem("storageTotalSaturday", 0);

    localStorage.setItem("storedAvgSun", 0);
    localStorage.setItem("storedAvgMon", 0);
    localStorage.setItem("storedAvgTue", 0);
    localStorage.setItem("storedAvgWed", 0);
    localStorage.setItem("storedAvgThu", 0);
    localStorage.setItem("storedAvgFri", 0);
    localStorage.setItem("storedAvgSat", 0);

    promptClose()
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
        <div style = {{display: "flex", justifyContent: "center"}}>
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
            chartType="BarChart"
            data = {[
              ["Year", "%", { role: "style" }],
              ["Sunday", avgSunday, "color: lightblue"],
              ["Monday", avgMonday, "color: lightblue"],
              ["Tuesday", avgTuesday, "color: lightblue"],
              ["Wednesday", avgWednesday, "color: lightblue"],
              ["Thursday", avgThursday, "color: lightblue"],
              ["Friday", avgFriday, "color: lightblue"],
              ["Saturday", avgSaturday, "color: lightblue"],
            ]}
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
          <Button onClick={resetStats} color="primary" autoFocus>
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
