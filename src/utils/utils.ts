import {ShapeProps} from "../types/ShapeProps";

export const envVar = {
    horizontalStyle: process.env.REACT_APP_HORIZONTAL_STYLE || "-",
    verticalStyle: process.env.REACT_APP_VERTICAL_STYLE || "|",
    xMax: process.env.REACT_APP_HORIZONTAL_MAX || 30,
    yMax: process.env.REACT_APP_VERTICA_MAX || 10,
    lineGlyph: "x"
}

export const readCommand = (cmd: string) : string[] => {
    if(cmd){
       return cmd.trim().toUpperCase().split(" ");
    }
    return [];
}

export const isValidFormat = (cmd: string []): boolean => cmd && cmd.length >0;


export const isNumberOfPropsCorrect =
    (cmd: string [], requiredInput: number): boolean => {
    return cmd && cmd.length === requiredInput;
}
export const isMinNumberOfPropsCorrect =
    (cmd: string [], requiredInput: number): boolean => {
        return cmd && cmd.length >= requiredInput;
    }

export const doesCanvasExist =
    (canvas: any): boolean => {
        return canvas? canvas.width > 0 &&
            canvas.height >0: false;
}

/**
 * assumes that the x y are coordinates starting from 0 and
 * width and height starts from 1
 * Compares height against x
 * Compares weight against y
 * @param x
 * @param y
 * @param canvas
 */
export const beyondCanvasRange =
    (x: number, y:number, canvas: any): boolean => {
        return canvas ? (x > canvas.height ||
            y > canvas.width || x<=0 || y<=0
            ): true;
    }


    export  const getRectangleAsLines =
        (props:ShapeProps) :ShapeProps[] => {
    if(props){
        const shapes: ShapeProps[] = [
            {
                startX: props.startX,
                startY: props.startY,
                endX: props.endX,
                endY: props.startY,
                shape: "Rectangle"
            },

            {
                startX: props.startX,
                startY: props.startY,
                endX: props.startX,
                endY: props.endY,
                shape: "Rectangle"
            },

            {
                startX: props.endX,
                startY: props.startY,
                endX: props.endX,
                endY: props.endY,
                shape: "Rectangle"
            },

            {
                startX: props.startX,
                startY: props.endY,
                endX: props.endX,
                endY: props.endY,
                shape: "Rectangle"
            },
        ];
        return shapes;

    }
    return [];
}
