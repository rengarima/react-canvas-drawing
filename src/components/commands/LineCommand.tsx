import {CommandType} from "../../types/component";
import React, {useEffect, useState} from "react";
import {InvalidCommand} from "./InvalidCommand";
import global from "../../store/global";
import {Line} from "../shapes/Line";
import {beyondCanvasRange, doesCanvasExist, isNumberOfPropsCorrect} from "../../utils/utils";

/*
L x1 y1 x2 y2   Should create a new line from (x1,y1) to (x2,y2). Currently only
                horizontal or vertical lines are supported. Horizontal and vertical lines
                will be drawn using the 'x' character.
 */

export const LineCommand = (props: CommandType): JSX.Element => {


    const [error, setError] = useState("");
    const [coordinates, setCoordinates] = useState();
    useEffect(() => {
        setError("");

        if (!isNumberOfPropsCorrect(props.command, 5)) {
            setError("Not Valid : ( Try L x1 y1 x2 y2  )");
        }
        if (!doesCanvasExist(global.canvas)) {
            setError("Canvas Doesnt exist");
        }
        const startY =  Number(props.command[1]);
        const startX =  Number(props.command[2]);
        const endY =  Number(props.command[3]);
        const endX =  Number(props.command[4]);

        if(startX !== endX && startY !== endY){
            setError("Only Horizontal or Vertical Lines Allowed");
        }
        if(beyondCanvasRange(startX, startY, global.canvas) ||
            beyondCanvasRange(endX, endY, global.canvas) ){
            setError(`Beyond Canvas Range:  ${global.canvas.width} x ${global.canvas.height}`);
        }else {
            setCoordinates({
                startX, startY,endX,endY,
                shape: "Line"
            });
        }
    }, [props]);

    return (error === "") ? (<Line {...coordinates}/>) :
        <InvalidCommand error={error}/>;
}
