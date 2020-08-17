import React, {useEffect} from "react";
import {ShapeProps} from "../../types/ShapeProps";
import {Shape} from "./Shape";
import global from "../../store/global";

export const Rectangle = (props: ShapeProps) => {

    const shapes = [
        {
            startX: props.startX,
            startY: props.startY,
            endX: props.endX,
            endY: props.startY,
            shape: "Line"
        },

        {
            startX: props.startX,
            startY: props.startY,
            endX: props.startX,
            endY: props.endY,
            shape: "Line"
        },

        {
            startX: props.endX,
            startY: props.startY,
            endX: props.endX,
            endY: props.endY,
            shape: "Line"
        },

        {
            startX: props.startX,
            startY: props.endY,
            endX: props.endX,
            endY: props.endY,
            shape: "Line"
        },
    ]

    useEffect(() =>{
         //@ts-ignore
        props.startX && shapes.map(shape => global.canvas.addShape(shape));
    }, [props.startX, props.startY, props.endX, props.endY]);

    return <Shape shapes={shapes} />

}
