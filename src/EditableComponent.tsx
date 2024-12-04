import {
    Button,
    Checkbox,
    FormControl,
    FormControlLabel,
    FormGroup,
    FormLabel,
    InputLabel,
    MenuItem,
    Radio,
    RadioGroup,
    Select,
    SelectChangeEvent,
    Stack,
    TextField,
} from "@mui/material";
import { ReactNode } from "react";
import { FormElement } from "./App";
import React from "react";

export default function EditableComponent(props: {
    children?: ReactNode;
    properties: FormElement;
}) {
    const [open, setOpen] = React.useState(false);

    const handleChange = (event: SelectChangeEvent) => {
        setOpen(false);
    };
    switch (props.properties.type) {
        case "text":
            return (
                <>
                    <InputLabel>
                        {props.properties?.name || props.properties.id}
                    </InputLabel>
                    <TextField
                        placeholder={
                            props.properties?.placeholder || "Text Input"
                        }
                        required={props.properties?.required}
                        name={props.properties?.name}
                    ></TextField>
                </>
            );

        case "textarea":
            return (
                <>
                    <InputLabel>
                        {props.properties?.name || props.properties.id}
                    </InputLabel>
                    <TextField
                        placeholder={
                            props.properties?.placeholder || "Textarea"
                        }
                        required={props.properties?.required}
                        name={props.properties?.name}
                        multiline
                        rows={4}
                    ></TextField>
                </>
            );

        case "select":
            return (
                <>
                    <InputLabel>
                        {props.properties?.name || props.properties.id}
                    </InputLabel>
                    <FormControl sx={{ width: 100 }}>
                        <InputLabel id="demo-simple-select-label">
                            Age
                        </InputLabel>

                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="Age"
                            open={open}
                            onChange={handleChange}
                        >
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                    </FormControl>
                </>
            );

        case "checkbox":
            return (
                <>
                    <InputLabel>
                        {props.properties?.name || props.properties.id}
                    </InputLabel>
                    <FormGroup>
                        {props.properties.option?.map((option, index) => (
                            <FormControlLabel
                                control={<Checkbox />}
                                label={option}
                                key={index}
                            />
                        ))}
                    </FormGroup>
                </>
            );
        case "radio":
            return (
                <>
                    <FormControl>
                        <FormLabel id="demo-radio-buttons-group-label">
                            {props.properties?.name || props.properties.id}
                        </FormLabel>
                        <RadioGroup
                            defaultValue="female"
                            name={props.properties?.name}
                        >
                            {props.properties.option?.map((option, index) => (
                                <FormControlLabel
                                    control={<Radio />}
                                    label={option}
                                    value={option}
                                    key={index}
                                />
                            ))}
                        </RadioGroup>
                    </FormControl>
                </>
            );
        case "date":
            return (
                <>
                    <InputLabel>
                        {props.properties?.name || props.properties.id}
                    </InputLabel>
                    <input type="date" />
                </>
            );
        default:
            return <Button>{props.properties.type}Not Defined yet</Button>;
    }
}
