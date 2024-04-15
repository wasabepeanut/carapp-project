import { useState } from 'react';
import { AppBar, Toolbar, Typography } from "@mui/material";
import CarList from "./components/CarList"
// import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant='h6'>Car App</Typography>
        </Toolbar>
      </AppBar>
      <CarList />
    </>
  )
}

export default App
