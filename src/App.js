import uuid from "uuid"
import React, {useState} from 'react';
import Card from '@material-ui/core/Card';
import List from '@material-ui/core/List';
import Drawer from '@material-ui/core/Drawer';
import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import Checkbox from '@material-ui/core/Checkbox';
import ListItem from '@material-ui/core/ListItem';
import { makeStyles } from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import NightsStayIcon from '@material-ui/icons/NightsStay';
import { Button , TextField, IconButton} from '@material-ui/core'; 
import AddBoxRoundedIcon from '@material-ui/icons/AddBoxRounded';

function App() {

  const[isNightMode, setIsNightMode] = React.useState(false)

  const [nightMode, setNightMode] = React.useState({
    background: "#FFFFFF",
    banner: "#48cae4",
    bannerText: "#FFFFFF",
    listText: "#000000",
  });

  function nightmode(){
    
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
          bannerText: "#FFFFFF",
          listText: "#FFFFFF", 
          banner: "#FFFFFF"
        });   
    }
    else{
      setNightMode({
        background: "#FFFFFF" ,
        bannerText: "#000000" ,
        listText: "#000000",
        banner: "#48cae4"
      });
    }
  }

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

  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }
  
  const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      '& > * + *': {
        marginTop: theme.spacing(2),
      },
    },
  }));

  const [todos, setTodos] = useState([
    {
      text: "Learn about React",
      isCompleted: true
    },
    {
      text: "Meet friend for lunch",
      isCompleted: false
    },
    {
      text: "Wash Dishes",
      isCompleted: false
    }
  ]);

  const [value, setValue] = useState("");

  const addTodo = text => {
    const newTodos = [...todos, { text }];
    setTodos(newTodos);
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!value) return;
    addTodo(value);
    setValue("");

    setDrawer(false);
  };

  const removeTodo = index => {
    const checkTodos = [...todos];
    checkTodos[index].isCompleted = true;
    setTodos(checkTodos);

    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);

    handleClick();
  };
 
  return (
    <div style={{padding: 50, flexDirection: 'column', backgroundColor: nightMode.background}}>

      <div> 
        <div style = {{display: 'flex', fontFamily: 'Work Sans', fontSize: 25 , marginBottom: 25, color: '#CDCACA'}}>
          <text>Good Morning</text>
        </div> 
      </div> 

      <Card style = {{marginBottom: 25, width: window.innerWidth/4, borderRadius: 30, backgroundColor: nightMode.banner, color: nightmode.bannerText}}>
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
              <ListItem>
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    checked={value.isCompleted}
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
        <IconButton onClick = {nightmode}>
          <NightsStayIcon/>
        </IconButton>
      </div>

      <div style = {{paddingLeft: (window.innerWidth/2)-100, justifyContent: 'flex-end'}}>
        <IconButton color = "primary" onClick = {toggleDrawerOpen}>
          <AddBoxRoundedIcon style={{ fontSize: 50 }}/>
        </IconButton>
      </div>

    </div>
  );
};

export default App;
