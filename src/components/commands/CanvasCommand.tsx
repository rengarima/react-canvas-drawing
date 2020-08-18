import {CommandType} from "../../types/component";
import {Canvas} from "../shapes/Canvas";
import React, {useEffect, useState} from "react";
import {InvalidCommand} from "./InvalidCommand";
import global from "../../store/global";
import {doesCanvasExist, envVar} from "../../utils/utils";

export const CanvasCommand = (props: CommandType): JSX.Element => {
    const [error, setError] = useState("");
    const [border, setBorder] = useState({width:0, height: 0});

    useEffect(() => {
        setError("");
        if(props.command.length !== 3 ){
            setError("Invalid Command");
        }

        const width = Number(props.command[1]);
        const height = Number(props.command[2]);
        if (doesCanvasExist(global.canvas)
            && global.canvas.width !== width
            && global.canvas.height !==height
        ) {
            setError("Canvas Already exist, Please Clear Canvas First");
        }
        if (envVar.xMax < width
            || envVar.yMax < height
        ) {
            setError(`Max Allowed Width:${envVar.xMax} & Height:${envVar.yMax} `);
        }
        else{
            setBorder({width:width, height: height})
            global.canvas.setBorder && global.canvas.setBorder(width, height);
        }
    },[props]);

    return (error === "")? ( <Canvas width={border.width} height={border.height}/>):
        <InvalidCommand error={error}/>;
}
