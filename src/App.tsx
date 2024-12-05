import { useState } from "react";
import {
    Checkbox,
    Container,
    Grid2,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography,
    FormGroup,
    FormControlLabel,
    FormControl,
    FormLabel,
    RadioGroup,
    Radio,
    Stack,
    Button,
    Box,
    Menu,
} from "@mui/material";
import Draggable from "./Draggable";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import Droppable from "./Droppable";
import {
    SortableContext,
    verticalListSortingStrategy,
    arrayMove,
} from "@dnd-kit/sortable";
import { SortableItem } from "./SortableItem";
import EditableComponent from "./EditableComponent";
import Editsection from "./EditSection";
import LoginForm from "./LoginForm";

export interface FormElement {
    id: string;
    type:
        | "text"
        | "textarea"
        | "select"
        | "checkbox"
        | "radio"
        | "date"
        | "file"
        | string;
    name?: string;
    label?: string;
    required?: boolean;
    option?: string[];
    placeholder?: string;
    min?: number;
    max?: number;
    regex?: RegExp;
}

function getRandomNumber() {
    return Math.floor(Math.random() * 100) + 1;
}

function App() {
    let [auth, setAuth] = useState({
        user: null,
        jwt: null,
    });
    let [formItems, setFormItems] = useState<string[]>([]);
    let [formjson, setFormjson] = useState<any>({
        id: "",
        title: "",
        form: [],
    });

    let [savedForms, setSavedForms] = useState<any[]>([]);
    let [savebtn, setSaveBtn] = useState("");

    let [editing, setEditing] = useState<{
        show: boolean;
        element?: FormElement;
    }>({
        show: false,
    });

    let [formMenuOpen, setFormMenuOpen] = useState(false);
    let [saveFormMenuAnchor, setSaveFormMenuAnchor] = useState(null);
    async function fetchForms(e) {
        setSaveFormMenuAnchor(e.target);
        try {
            let response = await fetch("http://localhost:3000/api/forms/list", {
                headers: {
                    Authorization: `Bearer ${auth.jwt}`,
                },
            });
            if (response.ok) {
                let forms = await response.json();
                setSavedForms(forms);
            }
        } catch (error) {
            console.log(error);
        }

        setFormMenuOpen(true);
    }
    function saveform() {
        const formIndex = savedForms.findIndex(
            (form) => form.id === formjson.id
        );

        setSavedForms((prev) => {
            if (formIndex !== -1) {
                // Update the existing form
                const updatedForms = [...prev];
                updatedForms[formIndex] = formjson;
                return updatedForms;
            } else {
                // Append the new form
                return [...prev, formjson];
            }
        });
        //update the form on the server as well
        if (formIndex !== -1) {
            try {
                fetch(`http://localhost:3000/api/forms/update/${formjson.id}`, {
                    method: "put",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formjson),
                }).then((data) => {
                    console.log(data.json());
                });
            } catch (err) {
                console.log(err);
            }
            return;
        }

        console.log(`Form saved or updated: `);
        console.log(formjson);
        fetch("http://localhost:3000/api/forms/save", {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formjson),
        }).then((data) => {});
        setSaveBtn("Check Console for final form");
    }

    function handleDelete(id) {
        let updatedFrom = formjson.form.filter((obj) => obj.id !== id);
        setFormjson({
            ...formjson,
            form: updatedFrom,
        });
    }

    function handleEdit(id: string) {
        if (id) {
            let element = formjson.form.find((elem) => elem.id == id);
            setEditing({
                show: true,
                element: element,
            });
        }
    }
    function handleDrop(event: DragEndEvent) {
        let activeId = event.active.id as string;
        let overId = event.over?.id as string;
        if (!overId) {
            return;
        }
        if (activeId.endsWith("_dyn")) {
            if (activeId !== overId) {
                setFormjson((prevFormItems) => {
                    // Find the old and new indexes of the items
                    const oldIndex = prevFormItems.form.findIndex(
                        (item) => item.id === activeId
                    );
                    const newIndex = prevFormItems.form.findIndex(
                        (item) => item.id === overId
                    );

                    // Move the item in the items array
                    const newItems = arrayMove(
                        prevFormItems.form,
                        oldIndex,
                        newIndex
                    );

                    // Return the updated formItems with the new items order
                    return {
                        ...prevFormItems,
                        form: newItems, // Update the order of items
                    };
                });
            }
        } else {
            if (formItems.includes(`${activeId}_dyn`)) {
                let type = activeId.split("_")[0];
                let newId = `${event.active.id}_${getRandomNumber()}_dyn`;
                setFormItems([...formItems, newId]);

                setFormjson((prevState) => {
                    let formElem: FormElement = {
                        type: type,
                        id: newId,
                    };

                    let newState = {
                        ...prevState,
                        form: [...prevState.form, formElem],
                    };
                    return newState;
                });

                return;
            }
            setFormItems([...formItems, `${event.active.id}_dyn`]);

            setFormjson((prevState) => {
                let formElem: FormElement = {
                    type: `${event.active.id}`,
                    id: `${event.active.id}_dyn`,
                };

                let newState = {
                    ...prevState,
                    form: [...prevState.form, formElem],
                };
                return newState;
            });
        }
    }

    return (
        <>
            {auth.jwt ? (
                <DndContext onDragEnd={handleDrop}>
                    <Container>
                        <Button onClick={fetchForms}>Saved Forms</Button>
                        <Menu
                            open={formMenuOpen}
                            anchorEl={saveFormMenuAnchor}
                            onClose={() => setFormMenuOpen(false)}
                        >
                            {savedForms?.map((form, index) => (
                                <MenuItem
                                    key={index}
                                    onClick={() => {
                                        console.log(form);
                                        setFormjson({
                                            title: form.form_name,
                                            form: form.form_data,
                                            id: form.id,
                                        });
                                    }}
                                >
                                    {form.form_name}
                                </MenuItem>
                            ))}
                        </Menu>
                    </Container>
                    <Container>
                        <Grid2 container spacing={3}>
                            <Grid2 size={5}>
                                <Typography variant="h3">
                                    Form Builder
                                </Typography>
                                <TextField
                                    value={formjson.title}
                                    onChange={(e) => {
                                        setFormjson((prev) => {
                                            console.log(prev)
                                            return {
                                                title: e.target.value,
                                                form: prev.form,
                                                id: prev.id,
                                            };
                                        });
                                    }}
                                    label="Form's title"
                                    fullWidth
                                />
                                <Droppable>
                                    <SortableContext
                                        items={formItems}
                                        strategy={verticalListSortingStrategy}
                                    >
                                        {formjson.form.map((value, index) => (
                                            <Stack
                                                direction={"row"}
                                                alignItems={"center"}
                                                justifyContent={"space-between"}
                                            >
                                                <SortableItem
                                                    id={`${value.id}`}
                                                    key={index}
                                                >
                                                    <EditableComponent
                                                        properties={value}
                                                    ></EditableComponent>
                                                </SortableItem>
                                                <Button
                                                    onClick={() => {
                                                        handleEdit(value.id);
                                                    }}
                                                >
                                                    Edit
                                                </Button>

                                                <Button
                                                    variant="contained"
                                                    color="error"
                                                    onClick={() => {
                                                        handleDelete(value.id);
                                                    }}
                                                >
                                                    Delete
                                                </Button>
                                            </Stack>
                                        ))}
                                    </SortableContext>
                                </Droppable>
                            </Grid2>
                            <Grid2 size={4}>
                                <Typography variant="h3">Components</Typography>
                                <Draggable id="text">
                                    <TextField
                                        label="Textfield"
                                        variant="outlined"
                                    ></TextField>
                                </Draggable>
                                <Draggable id="textarea">
                                    <TextField
                                        label="Textarea"
                                        variant="outlined"
                                        multiline
                                        rows={4}
                                    ></TextField>
                                </Draggable>
                                <Draggable id="number">
                                    <InputLabel>Number Input</InputLabel>
                                    <input
                                        type="number"
                                        placeholder=""
                                        name="number"
                                        id="num"
                                    ></input>
                                </Draggable>
                                <Draggable id="select">
                                    <InputLabel>Select Dropdown</InputLabel>
                                    <select name="select">
                                        <option value="volvo">Volvo</option>
                                    </select>
                                </Draggable>
                                <Draggable id="checkbox">
                                    <FormGroup>
                                        <FormControlLabel
                                            control={
                                                <Checkbox defaultChecked />
                                            }
                                            label="Checkbox"
                                        />
                                    </FormGroup>
                                </Draggable>
                                <Draggable id="radio">
                                    <FormControl>
                                        <FormLabel id="demo-radio-buttons-group-label">
                                            Radio Buttons
                                        </FormLabel>
                                        <RadioGroup
                                            defaultValue="female"
                                            name="radio-buttons-group"
                                        >
                                            <FormControlLabel
                                                value="female"
                                                control={<Radio />}
                                                label="Female"
                                            />
                                            <FormControlLabel
                                                value="male"
                                                control={<Radio />}
                                                label="Male"
                                            />
                                        </RadioGroup>
                                    </FormControl>
                                </Draggable>
                                <Draggable id="date">
                                    <InputLabel>Date Picker</InputLabel>
                                    <input type="date"></input>
                                </Draggable>
                            </Grid2>
                            <Grid2 size={3}>
                                <Typography variant="h3">
                                    Customization
                                </Typography>
                                {editing.show ? (
                                    <>
                                        <Editsection
                                            element={editing.element}
                                            setFormjson={setFormjson}
                                        />
                                        <Box>
                                            <Button
                                                variant="contained"
                                                onClick={() => {
                                                    setEditing({
                                                        show: false,
                                                    });
                                                }}
                                            >
                                                Close
                                            </Button>
                                        </Box>
                                    </>
                                ) : null}
                            </Grid2>
                        </Grid2>
                        <Button size="large" onClick={saveform}>
                            Save or Update Form
                        </Button>
                        <Typography variant="h6">{savebtn}</Typography>
                    </Container>
                </DndContext>
            ) : (
                <LoginForm setAuth={setAuth} />
            )}
        </>
    );
}

export default App;
