import {
    Button,
    FormControl,
    FormControlLabel,
    FormLabel,
    InputLabel,
    Radio,
    RadioGroup,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import { FormElement } from "./App";
import { useEffect, useState } from "react";

export default function Editsection({
    element,
    setFormjson,
}: {
    element?: FormElement;
    setFormjson?: any;
}) {
    const [formData, setFormData] = useState({
        ...element,
    });
    useEffect(() => {
        setFormData({
            ...element,
        });
    }, [element]);

    // const [options, setOptions] = useState(element?.option || []);
    let [newOption, setNewoption] = useState("");

    const handleOptionChange = (index, newValue) => {
        const updatedOptions = formData.option?.map((option, i) =>
            i === index ? newValue : option
        );
        setFormData((prevData) => {
            return {
                ...prevData,
                option: updatedOptions,
            };
        });
    };
    function handleUpdates(e: React.FormEvent<HTMLFormElement>) {
        console.log(formData);
        e.preventDefault();
        setFormjson((prev) => {
            console.log(prev);
            const index = prev.form.findIndex((obj) => obj.id === element?.id);
            const newArray = [
                ...prev.form.slice(0, index),
                formData,
                ...prev.form.slice(index + 1),
            ];
            return {
                ...prev,
                form: newArray,
            };
        });
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let { name, value } = e.target;
        if (name == "required") {
            if (value == "false") {
                let value = false;
                setFormData((prevData) => ({
                    ...prevData,
                    [name]: value,
                }));
            } else {
                let value = true;
                setFormData((prevData) => ({
                    ...prevData,
                    [name]: value,
                }));
            }
        }
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    return (
        <form onSubmit={handleUpdates}>
            <Typography variant="body1">
                Currently editing {element?.name || element?.id}
            </Typography>
            <TextField
                label="Name of component"
                name="name"
                value={formData.name}
                onChange={handleChange}
            ></TextField>

            {element?.type == "text" || element?.type == "textarea" ? (
                <>
                    <TextField
                        label="placeholder text"
                        name="placeholder"
                        value={formData.placeholder}
                        onChange={handleChange}
                    ></TextField>
                    <TextField
                        label="Regular Expression"
                        name="regex"
                        value={formData.regex}
                        onChange={handleChange}
                    ></TextField>
                </>
            ) : null}

            {element?.type == "number" ? (
                <>
                    <InputLabel>Minimum value</InputLabel>
                    <input
                        type="number"
                        placeholder=""
                        name="min"
                        id="num"
                        onChange={handleChange}
                    ></input>

                    <InputLabel>Maximum value</InputLabel>
                    <input
                        type="number"
                        placeholder=""
                        name="max"
                        id="num"
                        onChange={handleChange}
                    ></input>
                </>
            ) : null}

            <FormControl>
                <FormLabel id="demo-radio">Is Required?</FormLabel>
                <RadioGroup
                    name="required"
                    // value={formData.required}
                    onChange={handleChange}
                >
                    <FormControlLabel
                        value="true"
                        control={<Radio />}
                        label="Yes"
                    />
                    <FormControlLabel
                        value="false"
                        control={<Radio />}
                        label="No"
                    />
                </RadioGroup>
            </FormControl>
            {element?.type == "select" ||
            element?.type == "radio" ||
            element?.type == "checkbox" ? (
                <>
                    <Typography variant="body1">Options</Typography>
                    {formData.option?.map((option, index) => (
                        <Stack
                            direction={"row"}
                            justifyContent={"space-between"}
                            alignItems={"center"}
                        >
                            <TextField
                                value={option}
                                onChange={(e) =>
                                    handleOptionChange(index, e.target.value)
                                }
                                size="small"
                                variant="outlined"
                                key={index}
                            />
                            <Button
                                onClick={(e) => {
                                    let updatedOption = formData.option?.filter(
                                        (val, ind) => ind !== index
                                    );
                                    setFormData((prevData) => {
                                        return {
                                            ...prevData,
                                            option: updatedOption,
                                        };
                                    });
                                }}
                            >
                                remove
                            </Button>
                        </Stack>
                    ))}
                    <TextField
                        value={newOption}
                        onChange={(e) => setNewoption(e.target.value)}
                        size="small"
                        variant="outlined"
                    />
                    <Button
                        onClick={() => {
                            setFormData((prevData) => {
                                if (prevData.option) {
                                    let newOptions = [
                                        ...prevData.option,
                                        newOption,
                                    ];
                                    return {
                                        ...prevData,
                                        option: newOptions,
                                    };
                                } else {
                                    return {
                                        ...prevData,
                                        option: [newOption],
                                    };
                                }
                            });

                            setNewoption("");
                        }}
                    >
                        Add
                    </Button>
                </>
            ) : null}
            <div>
                <Button variant="contained" color="success" type="submit">
                    Done
                </Button>
            </div>
        </form>
    );
}
