import {useEffect, useState} from "react";
import {FillProps} from "../types/FillProps";
import {beyondCanvasRange, envVar} from "../utils/utils";

const drawLine =
    (x: number, y: number, x2: number, y2: number, canvasBody:any ): any =>{
        // horizontal line
        if (x === x2) {
            for (let i = y - 1; i <= y2 - 1; i++) {
                canvasBody[x - 1] && canvasBody[x - 1].splice(i, 1, envVar.lineGlyph);

            }
        }
        //vertical Line
        if (y === y2) {
            for (let i = x - 1; i <= x2 - 1; i++) {
                canvasBody[i] && canvasBody[i].splice(y - 1, 1, "x");

            }
        }
}

const floodFill = (x:number,
                   y:number,
                   prevColor: string,
                   newColor: string,  canvasBody: any
                   , width: number, height: number): void => {
    //do nothing
    if(beyondCanvasRange(x+1,y+1, {width, height}))           //Base Case
        return;
    if(!canvasBody[x]){
        return;
    }

    if(canvasBody[x][y] !== prevColor)
        return;
    if(canvasBody[x][y] === newColor)
        return;
    if(canvasBody[x][y] === prevColor){
        canvasBody[x] && canvasBody[x].splice(y, 1 ,newColor);             //Converting the previous color into new colo
    }

    floodFill(x-1,y,prevColor,newColor, canvasBody, width, height);
    floodFill(x+1,y,prevColor,newColor, canvasBody, width, height);
    floodFill(x,y-1,prevColor,newColor, canvasBody, width, height);
    floodFill(x,y+1,prevColor,newColor, canvasBody, width, height);
    floodFill(x-1,y-1,prevColor,newColor, canvasBody, width, height);
    floodFill(x-1,y+1,prevColor,newColor, canvasBody, width, height);
    floodFill(x+1,y-1,prevColor,newColor, canvasBody, width, height);
    floodFill(x+1,y+1,prevColor,newColor, canvasBody, width, height);

}

export default function useCanvas (width: number, height:number) {

    const [border] = useState({
        horizontal: envVar.horizontalStyle,
        vertical: envVar.verticalStyle
    });

    const [canvasBody, setCanvasBody] = useState();

    const drawShapes = (shapes:any, fillValues: any) => {
        if( canvasBody && shapes) {
            //@ts-ignore
            shapes.map(shape => {
                if(shape.startX > 0 && shape.shape) {
                    drawLine(shape.startX, shape.startY, shape.endX, shape.endY, canvasBody);
                }
            })
        }

        if( canvasBody && fillValues ) {
            //@ts-ignore
            fillValues.map(fillProps => {
                fillCanvas(fillProps);
            });
        }
        console.table(canvasBody);
    }


    const fillCanvas = ({fromX, fromY, color}:FillProps) =>{
        canvasBody && floodFill(fromY-1, fromX-1, " ", color, canvasBody, width, height);
    }

    useEffect(() =>{
        const canvasBodyTemp = Array(height).fill(0).map(row =>
            new Array(width).fill(" "));
        setCanvasBody(canvasBodyTemp);
    },[width, height])

    return {border, canvasBody, drawShapes}
}
