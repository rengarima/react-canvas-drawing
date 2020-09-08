import React, {useEffect, useState} from "react";
import {ShapeProps} from "../../types/ShapeProps";
import {Shape} from "./Shape";
import global, {dummyShape} from "../../store/global";
import {getRectangleAsLines} from "../../utils/utils";

export const Rectangle = (props: ShapeProps) => {

    const [shapes, setShapes] = useState([dummyShape]);

    useEffect(() =>{
        if(props.shape === "Rectangle") {
            const tempShapes = getRectangleAsLines(props);
            setShapes(tempShapes);
            //@ts-ignore
            props.startX && tempShapes.map(shape => global.canvas.addShape(shape));
        }
    }, [props.startX, props.startY, props.endX, props.endY, props.shape]);

    return <Shape shapes={shapes} />

}
