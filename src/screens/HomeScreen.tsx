import React, {useState} from "react";
import {DrawingBoard} from "./DrawingBoard";
import {CommandLogs} from "../components/CommandLogs";
import {Input} from "../components/Input";
import produce from "immer";

export const HomeScreen = () : JSX.Element => {
    const [commandLog, setCommandLog] = useState([]);
    const [command, setCommand] = useState();

    const updateValue = (value: string) => {
        if (value) {
            const nextState = produce( (commandLog, draftState ) => {
                if(!draftState) draftState = commandLog;
                draftState.push({command: value});
            });
            // @ts-ignore
            setCommandLog(nextState);
            setCommand( value);
        }
    }

    return (
        <div className="container is-fullhd mb-3"  >
            <div className="mt-3">
                <Input placeholder="Enter Command"
                       icon="fas fa-keyboard" id="cmdInput"
                       executeInput={updateValue}
                       />
            </div>
            <div className="tile is-ancestor">
                <div className="tile is-parent">
                    <div className="tile is-child box">
                        <p className="subtitle">Sketch Pad</p>
                        { command && <DrawingBoard command={command} /> }
                    </div>
                </div>
                <div className="tile is-3 is-vertical is-parent">
                    <div className="tile is-child box">
                        <p className="subtitle">Logs</p>
                        <CommandLogs  logs={commandLog}/>
                    </div>
                </div>
            </div>
        </div>
    );
}
