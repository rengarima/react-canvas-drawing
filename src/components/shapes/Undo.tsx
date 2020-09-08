
import React, {useEffect, useState} from "react";
import {Shape} from "./Shape";
import global from "../../store/global";
import {FillProps} from "../../types/FillProps";
import {UndoProps} from "../../types/UndoProps";
import {getRectangleAsLines} from "../../utils/utils";

export const Undo = (props: UndoProps) => {
    const [removeShapes, setRemoveShapes] = useState([]);
    const [removeFill, setRemoveFill] = useState();



    useEffect(() =>{

        if(props.shape === "F"){
             {
                global.canvas.removeFill && global.canvas.removeFill();
                setRemoveFill({...props})
            }

        }else if(props.shape === "C"){
             {
                global.canvas.reset();
            }
        } else if(props.shape === "L" ||
            props.shape === "R" ){
            {

                let  tempShapes = [];

                if(props.shape === "R")  tempShapes = getRectangleAsLines({ startX: props.fromX, startY: props.fromY,
                    endX: props.endX || 0, endY: props.endY || 0, shape:"Line"});
                else tempShapes = [{ startX: props.fromX, startY: props.fromY,
                endX: props.endX, endY: props.endY, shape:"Line"}];

                global.canvas.removeShape &&
                global.canvas.removeShape(tempShapes);

                //@ts-ignore
                setRemoveShapes(tempShapes);
            }
            //assumign we are not clearning canvas yet
        }

    }, [props.shape, props.fromX, props.endX, props.endY]);

    return <Shape shapes={global.canvas.shapes}
                  removeShapes={removeShapes} removeFill={removeFill}/>

}
