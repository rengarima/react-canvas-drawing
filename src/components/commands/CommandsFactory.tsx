import React from "react";
import {CommandType} from "../../types/component";
import {isValidFormat} from "../../utils/utils";
import {CanvasCommand} from "./CanvasCommand";
import {InvalidCommand} from "./InvalidCommand";
import {LineCommand} from "./LineCommand";
import {RectangleCommand} from "./RectangleCommand";
import {FillCommand} from "./FillCommand";
import global from "../../store/global";
import {UndoCommand} from "./UndoCommand";
import {Line} from "../shapes/Line";

const ClearCommand = (): JSX.Element => {
    global.canvas.reset();
    return ( <div> Clear</div> );
}

const InvalidCommandWithError = (props: CommandType): JSX.Element => {
    return <InvalidCommand error={"Command Doesnt Exist"} />;
}

const UndoCommandCopy = (props: CommandType): JSX.Element => {
    return <UndoCommand {...props} />;
}

export default function CommandsFactory (
    props : CommandType
    ): JSX.Element {
    const commands = {
        C: CanvasCommand,
        L: LineCommand,
        R: RectangleCommand,
        Q: ClearCommand,
        B: FillCommand,
        U: UndoCommandCopy,
        default : InvalidCommandWithError
    };
    if(!isValidFormat(props.command)){
        return <InvalidCommand error={"Invalid Input Format"} />;
    }
    const cmdType = props.command[0] + "";
    // @ts-ignore
    return (commands[cmdType] || commands.default)(props)
}

