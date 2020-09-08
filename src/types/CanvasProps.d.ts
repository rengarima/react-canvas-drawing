import {ShapeProps} from "./ShapeProps";
import {FillProps} from "./FillProps";

export interface CanvasProps {
    width: number;
    height: number;
    draw?: any;
    shapes?: ShapeProps[];
    fill?: FillProps;
    removeShapes?: ShapeProps[];
    removeFill?: FillProps;
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
        removeShape?: func,
        removeFill?: func
    }
}
