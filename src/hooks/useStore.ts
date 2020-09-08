import { useState } from "react";
import {ShapeProps} from "../types/ShapeProps";
import produce from "immer";
import {dummyFill, dummyShape} from "../store/global";
import {FillProps} from "../types/FillProps";

export default function useStore() {

    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);
    const [shapes, setShapes] = useState([dummyShape]);
    const [fillValues, setFillValues] = useState([dummyFill]);


    const setBorder = (width: number, height: number) => {
        setWidth(width);
        setHeight(height);
    }

    const reset = () =>  {
        setWidth(0);
        setHeight(0);
        if(shapes && shapes.length > 1){
            setShapes([dummyShape]);
        }
        if(fillValues && fillValues.length > 1){
            setFillValues([dummyFill]);
        }
    }

    const removeShape = (removeShapes: ShapeProps[] ) => {
        if (removeShapes) {
            if (shapes.length > 0 && shapes.length > removeShapes.length) {
                let nextState = shapes;
                removeShapes.map(newShape => {
                    nextState = nextState.filter(tempShape => { return !(newShape.startX === tempShape.startX &&
                        newShape.startY === tempShape.startY &&
                        newShape.endX === tempShape.endX &&
                        newShape.endY === tempShape.endY)} );
                })
                //@ts-ignore
                setShapes(nextState);
            }
        }

    }

    const removeFill = () => {
        if(fillValues.length > 0) {
            const nextState = fillValues.slice(0, fillValues.length - 1);
            //@ts-ignore
            setFillValues(nextState);
        }
    }

    const addShape = (shape: ShapeProps) => {
        const nextState = produce( (shapes, draftState ) => {
            if(!draftState) draftState = shapes;
            draftState.push(shape);
        });
        //@ts-ignore
        setShapes(nextState);
    }

    const addFill = (fill: FillProps) => {
        const nextState = produce( (fillValues, draftState ) => {
            if(!draftState) draftState = fillValues;
            draftState.push(fill);
        });
        //@ts-ignore
        setFillValues(nextState);
    }

    return {
        width,
        height,
        shapes,
        addFill,
        fillValues,
        setBorder,
        addShape,
        removeShape,
        removeFill,
        reset
    };
}
