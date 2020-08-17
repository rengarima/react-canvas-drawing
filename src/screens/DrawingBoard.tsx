import React from "react";
import './styles.css';
import CommandsFactory from "../components/commands/CommandsFactory";
import {readCommand} from "../utils/utils";
import {DrawingBoardProps} from "../types/DrawingBoardProps";
import global from "../store/global";
import useStore from "../hooks/useStore";

export const DrawingBoard = ({command} : DrawingBoardProps) : JSX.Element => {
    global.canvas = useStore();
    return (
        <div
            className="container is-fullhd canvas-container">
                <CommandsFactory command={readCommand(command)} />
        </div>
    );
}
