export interface UndoProps {
    shape: "L" | "R" | "F" | "C";
    fromX: number;
    fromY: number;
    endX?: number;
    endY?: number;
    color?: string;
}

