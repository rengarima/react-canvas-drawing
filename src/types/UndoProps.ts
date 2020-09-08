export interface UndoProps {
    shape: "L" | "R" | "B" | "C";
    fromX: number;
    fromY: number;
    endX?: number;
    endY?: number;
    color?: string;
}

