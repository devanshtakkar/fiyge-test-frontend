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
    let [formItems, setFormItems] = useState<string[]>([]);
    let [formjson, setFormjson] = useState<any>({
        title: "Dynamic form",
        form: [],
    });

    let [savedForms, setSavedForms] = useState<any[]>([]);
    let [savebtn, setSaveBtn] = useState("Save From and Send");

    let [editing, setEditing] = useState<{
        show: boolean;
        element?: FormElement;
    }>({
        show: false,
    });

    function saveform(){
        setSavedForms((prev) => {
            return [...prev, formjson]
        })
        console.log(formjson);
        fetch("http://localhost:3000/api/forms/save", {
            method: "post",
            headers: {
                'Content-Type': 'application/json',
              },
            body: JSON.stringify(formjson)
        }).then((data) => {
            console.log(data.json())
        })
        setSaveBtn("Check Console for final form")
    }

    function handleDelete(id) {
        console.log("delete");
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
        console.log(event.active.data);
        if (!overId) {
            return;
        }
        if (activeId.endsWith("_dyn")) {
            console.log(`to be sorted`);

            if (activeId !== overId) {
                // setFormItems((items) => {
                //     const oldIndex = items.indexOf(activeId);
                //     const newIndex = items.indexOf(overId);

                //     return arrayMove(items, oldIndex, newIndex);
                // });

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
            console.log(activeId, overId);
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
        <DndContext onDragEnd={handleDrop}>
            <Container>
                <Grid2 container spacing={3}>
                    <Grid2 size={5}>
                        <Typography variant="h3">Form Builder</Typography>
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
                        <Draggable id="select">
                            <InputLabel>Select Dropdown</InputLabel>
                            <select name="select">
                                <option value="volvo">Volvo</option>
                            </select>
                        </Draggable>
                        <Draggable id="checkbox">
                            <FormGroup>
                                <FormControlLabel
                                    control={<Checkbox defaultChecked />}
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
                        <Typography variant="h3">Customization</Typography>
                        {editing.show ? (
                            <>
                                <Editsection element={editing.element} setFormjson={setFormjson}/>
                                <Box>
                                    <Button variant="contained" onClick={() => {
                                        setEditing({
                                            show: false
                                        })
                                    }}>Close</Button>
                                </Box>
                            </>
                        ) : null}
                    </Grid2>
                </Grid2>
                <Button size="large" onClick={saveform}>{savebtn}</Button>
            </Container>
        </DndContext>
    );
}

export default App;
