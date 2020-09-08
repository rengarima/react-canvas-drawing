import React, {useEffect, useState} from "react";
import {doesCanvasExist, isMinNumberOfPropsCorrect} from "../../utils/utils";
import global from "../../store/global";
import {CommandType} from "../../types/component";
import {InvalidCommand} from "./InvalidCommand";
import {Undo} from "../shapes/Undo";

export const UndoCommand = (props: CommandType): JSX.Element => {

    const [error, setError] = useState("");
    const [command, setCommand] = useState();
    const [coordinates, setCoordinates] = useState();


    useEffect(() => {
        setError("");
        var currentCommand = "";

        //"U L x1 y1 x2 y2" - starting with line
        if(!isMinNumberOfPropsCorrect(props.command, 3)){
            setError("Invalid Command");
        }
        if (!doesCanvasExist(global.canvas)) {
            setError("Canvas Doesnt exist");
        }else{
            const shape = props.command[1];

            if(shape === "B"){
                setCoordinates({fromX: Number(props.command[2]),
                    fromY: Number(props.command[3]),
                    color: " ", shape});
            }else if(shape === "C"){
                global.canvas.reset();
                console.log("After REset " + global.canvas.width );
            } else if(shape === "L" ||
                shape === "R" ){
                const fromY =  Number(props.command[2]);
                const fromX =  Number(props.command[3]);
                const endY =  Number(props.command[4]);
                const endX =  Number(props.command[5]);

                setCoordinates({
                    fromX, fromY,endX,endY,
                    shape: shape
                });
            }
        }




    }, [props, command]);

    return (error === "") ?  <Undo {...coordinates}  /> :
        <InvalidCommand error={error} />
}
