import {ShapeProps} from "./ShapeProps";

export interface CanvasProps {
    width: number;
    height: number;
    draw?: any;
    shapes?: ShapeProps[];
    fill?: FillProps;
}


export interface CanvasStoreProps {
    canvas: {
        width: number;
        height: number;
        shapes?: ShapeProps[];
        fillValues?: FillProps[];
        addFill?: func;
        addShape?: func;
        reset?: func;
        setBorder?: func;
    }
}
