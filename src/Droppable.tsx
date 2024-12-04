import { useDroppable } from "@dnd-kit/core";
import { Box } from "@mui/material";
import { ReactElement, ReactNode } from "react";

export default function Droppable({children}: {
    children?: ReactNode}) {
    const { setNodeRef } = useDroppable({
        id: "main_droppable",
    });

    return <Box width={"100%"} height={"100%"} ref={setNodeRef} sx={{borderStyle: "solid"}}>{children}</Box>;
}
