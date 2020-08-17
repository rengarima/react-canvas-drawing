import {useEffect, useState} from "react";
import {FillProps} from "../types/FillProps";
import {envVar} from "../utils/utils";

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
                    //horizontal Line
                    if (shape.startX === shape.endX) {
                        for (let i = shape.startY - 1; i <= shape.endY - 1; i++) {
                            canvasBody[shape.startX - 1] && canvasBody[shape.startX - 1].splice(i, 1, envVar.lineGlyph);

                        }
                    }
                    //vertical Line
                    if (shape.startY === shape.endY) {
                        for (let i = shape.startX - 1; i <= shape.endX - 1; i++) {
                            canvasBody[i] && canvasBody[i].splice(shape.startY - 1, 1, "x");

                        }
                    }
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

    const valid = (x: number, y: number) : boolean =>
    {
        if(x<=0 || x>=width || y<=0 || y>=height)
            return false;
        else
            return true;
    }

    const floodFill = (x:number,
                       y:number,
                       prevColor: string,
                       newColor: string): void => {
        //do nothing
        if(valid(x,y))           //Base Case
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

        floodFill(x-1,y,prevColor,newColor);
        floodFill(x+1,y,prevColor,newColor);
        floodFill(x,y-1,prevColor,newColor);
        floodFill(x,y+1,prevColor,newColor);
        floodFill(x-1,y-1,prevColor,newColor);
        floodFill(x-1,y+1,prevColor,newColor);
        floodFill(x+1,y-1,prevColor,newColor);
        floodFill(x+1,y+1,prevColor,newColor);

    }

    const fillCanvas = ({fromX, fromY, color}:FillProps) =>{
        canvasBody && floodFill(fromY-1, fromX-1, " ", color);
    }

    useEffect(() =>{
        const canvasBodyTemp = Array(height).fill(0).map(row =>
            new Array(width).fill(" "));
        setCanvasBody(canvasBodyTemp);
    },[width, height])

    return {border, canvasBody, drawShapes}
}
