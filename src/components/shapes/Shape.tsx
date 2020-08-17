
import {Canvas} from "./Canvas";
import global from "../../store/global";
import React from "react";


export const Shape = (props: any) => {

    return <Canvas width={global.canvas.width}
                   height={global.canvas.height} {...props}/>

}
