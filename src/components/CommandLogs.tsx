import React, { Fragment } from "react";
import {Logs} from "../types/component";

export const CommandLogs = ({logs}:Logs): JSX.Element => {
    return logs ?
     (
        <div aria-label="command-logs">
            <ol>
                {
                    logs.map( (value, i) => {
                        return <li key={i}>{value.command} </li>
                    })
                }
            </ol>
        </div>

    ): <Fragment/>;

};
