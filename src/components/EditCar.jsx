import { Button, Dialog, DialogContent, DialogTitle, TextField } from '@mui/material';
import React from 'react';

export default function EditCar(props) {


    
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
        console.log(props.params.data._links.car.href)
        setCar({
            brand: props.params.data.brand,
            model: props.params.data.model,
            color: props.params.data.color,
            fuel: props.params.data.fuel,
            modelYear: props.params.data.modelYear,
            price: props.params.data.price
        })
    };

    const handleSave = () => {
        //console.log("EditCar: update car information");
        //console.log(props.params.data._links.car.href)
        //console.log(props)
        props.updateCar(car, props.params.data._links.car.href);
        setOpen(false);
    };

    const handleCancel = () => {
        setOpen(false);
    };

    return (
        <div>
            <Button color='success' onClick={handleClickOpen}> Edit </Button>

            <Dialog open={open}>
                <DialogTitle> Update Car </DialogTitle>
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
                        value={car.modelYear}
                        onChange={(e) => setCar({...car, modelYear: e.target.value})}
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
