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

function App() {

  const [todos, setTodos] = React.useState([]); 

  React.useEffect(() => {
    //Reads/saves todos from localStorage on change. If currList isn't found it will fallback to an empty list
    const savedTodos = JSON.parse(localStorage.getItem("currList")) || [];
    setTodos(savedTodos);
  }, []);

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
 
  return (
    <div style={{height: '100%', padding: 50, flexDirection: 'column', backgroundColor: nightMode.background}}>

      <div> 
        <div style = {{display: 'flex', fontFamily: 'Work Sans', fontSize: 25 , marginBottom: 25, color: '#CDCACA'}}>
          <text>Good Morning</text>
        </div> 
      </div> 

      <Card style = {{marginBottom: 25, width: window.innerWidth/4, borderRadius: 30, backgroundColor: nightMode.banner, color: nightMode.bannerText, raised: true}}>
        <CardContent>
          <div style = {{display: 'flex', fontFamily: 'Work Sans', fontSize: 55}}>
            <text>Tuesday</text>
          </div>

          <text style = {{display: 'flex', fontFamily: 'Work Sans', fontSize: 45}}>11:45</text>
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
          <NightsStayIcon/>
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
