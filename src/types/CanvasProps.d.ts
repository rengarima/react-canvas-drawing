import {ShapeProps} from "./ShapeProps";

export interface CanvasProps {
    width: number;
    height: number;
    draw?: any;
    shapes?: ShapeProps[];
    fill?: FillProps;
}
