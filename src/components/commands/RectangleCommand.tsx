import {CommandType} from "../../types/component";
import React, {useEffect, useState} from "react";
import {InvalidCommand} from "./InvalidCommand";
import global from "../../store/global";
import {beyondCanvasRange, doesCanvasExist, isNumberOfPropsCorrect} from "../../utils/utils";
import {Rectangle} from "../shapes/Rectangle";

/*
R x1 y1 x2 y2   Should create a new rectangle, whose upper left corner is (x1,y1) and
                lower right corner is (x2,y2). Horizontal and vertical lines will be drawn
                using the 'x' character.
 */

export const RectangleCommand = (props: CommandType): JSX.Element => {

    const [error, setError] = useState("");
    const [coordinates, setCoordinates] = useState();

    useEffect(() => {
        setError("");

        if (!isNumberOfPropsCorrect(props.command, 5)) {
            setError("Invalid Command : Try R x y x2 y2");
        }
        if (!doesCanvasExist(global.canvas)) {
            setError("Canvas Doesnt exist");
        }

        const startY =  Number(props.command[1]);
        const startX =  Number(props.command[2]);
        const endY =  Number(props.command[3]);
        const endX =  Number(props.command[4]);
        if(beyondCanvasRange(startX, startY, global.canvas) ||
            beyondCanvasRange(endX, endY, global.canvas) ){
            setError(`Beyond Canvas Range:  ${global.canvas.width} x ${global.canvas.height} `);
        }else {
            setCoordinates({
                startX,startY,endX,endY,shape: "Rectangle"
            });
        }
    }, [props]);



    return (error === "") ? (<Rectangle {...coordinates}/>) :
        <InvalidCommand error={error}/>;
}
