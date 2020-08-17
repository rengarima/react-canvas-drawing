
import React, {useEffect} from "react";
import {ShapeProps} from "../../types/ShapeProps";
import {Shape} from "./Shape";
import global from "../../store/global";

/*
L x1 y1 x2 y2   Should create a new line from (x1,y1) to (x2,y2). Currently only
                horizontal or vertical lines are supported. Horizontal and vertical lines
                will be drawn using the 'x' character.
 */

export const Line = (props: ShapeProps) => {

    useEffect(() =>{
        //@ts-ignore
        props.startX && global.canvas.addShape({
            startX: props.startX,
            startY: props.startY,
            endX: props.endX,
            endY: props.endY,
            shape: "Line"
        })
    }, [props.startX, props.startY, props.endX, props.endY]);

    return <Shape shapes={[props]} />

}
