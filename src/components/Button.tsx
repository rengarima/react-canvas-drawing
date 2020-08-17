import React from "react";
import {ButtonProps} from "../types/ButtonProps";

export const Button = ({
    id, label, styleClass, onClick }:ButtonProps): JSX.Element => {

    return (
        <button
            className={"button is-rounded " + styleClass }
            style={{ overflowWrap: "normal" }}
            onClick={ onClick }
            id={id}>{ label }
        </button>
    );
}
