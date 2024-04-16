import { useState } from 'react';
import { AppBar, Toolbar, Typography } from "@mui/material";
import CarList from "./components/CarList"
// import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='App'>
      <AppBar position="static" style={{backgroundColor: '#13322B'}}>
        <Toolbar>
          <Typography variant='h5' >Car App</Typography>
        </Toolbar>
      </AppBar>
      <CarList />
    </div>
  )
}

export default App
