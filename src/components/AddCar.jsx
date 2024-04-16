import { Button, Dialog, DialogContent, DialogTitle, TextField } from '@mui/material';
import React from 'react';


export default function AddCar(props) {

    const [car, setCar] = React.useState({
        brand: '',
        model: '',
        color: '',
        fuel: '',
        year: '',
        price: ''
    });

    // open = false, kun ikkuna on kiinni
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleSave = () => {
        console.log("AddCar: save a new car");
        props.addCar(car);
        setOpen(false);
    };

    const handleCancel = () => {
        setOpen(false);
    };

    return (
        <div style={{display: 'flex', justifyContent: 'center'}}>
            <Button style={{margin: 15, backgroundColor: '#007474'}} variant='contained' onClick={handleClickOpen}> Add New Car</Button>

            <Dialog open={open}>
                <DialogTitle> Add New Car </DialogTitle>
                <DialogContent>
                    <TextField
                        margin="dense"
                        label="Brand"
                        value={car.brand}
                        onChange={(e) => setCar({...car, brand: e.target.value})}
                        variant="standard"
                    />
                    <TextField
                        margin="dense"
                        label="Model"
                        value={car.model}
                        onChange={(e) => setCar({...car, model: e.target.value})}
                        variant="standard"
                    />
                    <TextField
                        margin="dense"
                        label="Color"
                        value={car.color}
                        onChange={(e) => setCar({...car, color: e.target.value})}
                        variant="standard"
                    />
                    <TextField
                        margin="dense"
                        label="Fuel"
                        value={car.fuel}
                        onChange={(e) => setCar({...car, fuel: e.target.value})}
                        variant="standard"
                    />
                    <TextField
                        margin="dense"
                        label="Year"
                        value={car.year}
                        onChange={(e) => setCar({...car, year: e.target.value})}
                        variant="standard"
                    />
                    <TextField
                        margin="dense"
                        label="Price"
                        value={car.price}
                        onChange={(e) => setCar({...car, price: e.target.value})}
                        variant="standard"
                    />
                </DialogContent>
                
                <Button onClick={handleSave}> Save </Button>
                <Button onClick={handleCancel}> Cancel </Button>
            </Dialog>
        </div>
    )
}