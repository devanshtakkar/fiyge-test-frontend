import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { ReactElement, ReactNode } from "react";

export default function Draggable({ children, id }: { children: ReactNode, id: string }) {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: id,
    });
    const style = {
        transform: CSS.Translate.toString(transform),
    };

    return (
        <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
            {children}
        </div>
    );
}
