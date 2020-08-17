
import React, {useEffect} from "react";
import {Shape} from "./Shape";
import global from "../../store/global";
import {FillProps} from "../../types/FillProps";

export const Fill = (props: FillProps) => {

    useEffect(() =>{
        //@ts-ignore
        props.fromX && global.canvas.addFill({
            fromX: props.fromX,
            fromY: props.fromY,
            color: props.color
        })
    }, [props.fromX, props.fromY, props.color]);

    return <Shape fill={props} />

}
