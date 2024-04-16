import { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css"; // Material Design theme
import { Button, Snackbar } from "@mui/material";
import { useRef } from "react";

import AddCar from "./AddCar";
import EditCar from "./EditCar";

export default function CarList() {
  // states
  const [cars, setCars] = useState([{ brand: "", model: "", color: "", fuel: "", year: "", price: ""}]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [msgSnackbar, setMsgSnackbar] = useState("");

  const [colDefs, setColDefs] = useState([
    { field: "brand" },
    { field: "model" },
    { field: "color" },
    { field: "fuel" },
    { field: "modelYear" },
    { field: "price" },
    { cellRenderer: (params) => <EditCar updateCar={updateCar} params={params}/>, width: 120},
    // Cell renderer function that takes params as input
    {
      cellRenderer: (params) => (
        <Button size="small" color="error" onClick={() => deleteCar(params)}>
          Delete
        </Button>
      ),
      width: 120,
    },
  ]);

  useEffect(() => getCars(), []); // fetch only after first rendering

  /// functions
  // getCars
  const getCars = () => {
    fetch("https://carrestservice-carshop.rahtiapp.fi/cars", { method: "GET" })
      .then((response) => {
        console.log(response);
        if (response.ok) {
          console.log("getCars response is ok");
          return response.json();
        } else {
        }
      })
      .then((data) => {
        console.log(data._embedded.cars);
        setCars(data._embedded.cars);
      })
      .catch((error) => console.error(error));
  };


  // ei tarvita poistamiseen, koska restin kautta saamme uniikki id:n
  const gridRef = useRef();


  // deleteCar
  const deleteCar = (params) => {
    console.log(params.data._links.car.href);
    if (window.confirm("Are you sure")) {
      fetch(params.data._links.car.href, 
        { method: "DELETE" })
      .then((response) => {
        if (response.ok) { 
            setOpenSnackbar(true);
            window.alert("Delete OK!");
            getCars();
        } else {
            setOpenSnackbar(true);
            window.alert("delete NOT OK!")
        };
      })
      .catch();
    }
  };

  const addCar = (car) => {
    console.log("Carlist. addCar");
    fetch("https://carrestservice-carshop.rahtiapp.fi/cars", {
      method: "POST",
      headers: {"Content-Type": "application/json"},  
      body: JSON.stringify(car)
    })
    .then (response => {
      console.log("response" + response);
      if (response.ok) {
        setMsgSnackbar("addCar response is ok");
        return response.json
      } else {
        throw new Error ("Datan vienti bakkariin ei onnistunut")
      }
    })
    .then (data => {
      console.log("parsed JSON = " + data)
      getCars()
    })
    .catch(err => console.error(err))
  };


  
  const updateCar = (car, link) => {
    console.log(link)
    fetch(link, {
      method: "PUT",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(car)
    })
    .then (response => {
      if (response.ok) {
        setMsgSnackbar("editCar response is ok");
        return response.json
      } else {
        throw new Error ("Edit error")
      }
    })
    .then (data => {
      getCars()
    })
    .catch(err => console.error(err))
  };


  // return
  return (
    <>
      <div className="ag-theme-material" style={{ width: 1450, height: 700, margin: "auto"}}>
        <AddCar addCar={addCar}/>
        <AgGridReact
          rowData={cars}
          columnDefs={colDefs}
          animateRows={true}
          rowSelection="single"
          pagination={true}
          paginationPageSize={10}
        />
        <Snackbar 
            open={openSnackbar}
            message={msgSnackbar}
            autoHideDuration={30}
            onClose={() => setOpenSnackbar(false)}
        />
      </div>
    </>
  );
}
