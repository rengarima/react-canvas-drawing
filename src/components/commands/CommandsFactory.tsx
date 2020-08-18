import React from "react";
import {CommandType} from "../../types/component";
import {isValidFormat} from "../../utils/utils";
import {CanvasCommand} from "./CanvasCommand";
import {InvalidCommand} from "./InvalidCommand";
import {LineCommand} from "./LineCommand";
import {RectangleCommand} from "./RectangleCommand";
import {FillCommand} from "./FillCommand";
import global from "../../store/global";

const ClearCommand = (): JSX.Element => {
    //@ts-ignore
    global.canvas.reset();
    return ( <div> Clear</div> );
}

const InvalidCommandWithError = (props: CommandType): JSX.Element => {
    return <InvalidCommand error={"Command Doesnt Exist"} />;
}

export default function CommandsFactory (
    props : CommandType
    ): JSX.Element {
    const commands = {
        C : CanvasCommand,
        L: LineCommand,
        R: RectangleCommand,
        Q: ClearCommand,
        B: FillCommand,
        default : InvalidCommandWithError
    };
    if(!isValidFormat(props.command)){
        return <InvalidCommand error={"Command Doesnt Exist"} />;
    }
    const cmdType = props.command[0] + "";
    // @ts-ignore :TODO: Fix Type
    return (commands[cmdType] || commands.default)(props)
}

