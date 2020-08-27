import uuid from "uuid";
import React, {useState} from 'react';
import Card from '@material-ui/core/Card';
import List from '@material-ui/core/List';
import Drawer from '@material-ui/core/Drawer';
import MuiAlert from '@material-ui/lab/Alert';
import { grey } from '@material-ui/core/colors';
import Snackbar from '@material-ui/core/Snackbar';
import Checkbox from '@material-ui/core/Checkbox';
import ListItem from '@material-ui/core/ListItem';
import CardContent from '@material-ui/core/CardContent';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import NightsStayIcon from '@material-ui/icons/NightsStay';
import AddBoxRoundedIcon from '@material-ui/icons/AddBoxRounded';
import { Button , TextField, IconButton} from '@material-ui/core'; 
import BarChartRoundedIcon from '@material-ui/icons/BarChartRounded';

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
    if(hour > 18 || (5 > hour && hour > 0)){
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
  const [avgSunday, setAvgSunday] = React.useState(0);
  const [avgMonday, setAvgMonday] = React.useState(0);
  const [avgTuesday, setAvgTuesday] = React.useState(0);
  const [avgWednesday, setAvgWednesday] = React.useState(0);
  const [avgThursday, setAvgThursday] = React.useState(0);
  const [avgFriday, setAvgFriday] = React.useState(0);
  const [avgSaturday, setAvgSaturday] = React.useState(0);

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
        <Card style = {{marginBottom: 25, width: window.innerWidth/4, borderRadius: 30, backgroundColor: nightMode.banner, color: nightMode.bannerText, raised: true}}>
          <CardContent>
            <div style = {{display: 'flex', fontFamily: 'Work Sans', fontSize: 55}}>
              <text>{currDate}</text>
            </div>

            <text style = {{display: 'flex', fontFamily: 'Work Sans', fontSize: 45}}>{currTime}</text>
          </CardContent>
        </Card>
      </Drawer>

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
