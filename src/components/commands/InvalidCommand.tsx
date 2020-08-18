
import React, {useEffect} from "react";
import global, {dummyShape} from "../../store/global";
import {Canvas} from "../shapes/Canvas";

export const InvalidCommand = (props: any): JSX.Element => {

    useEffect(() => {
        //@ts-ignore
        global.canvas.addShape(dummyShape);
    },[props.error])

    return (
        <div>
            <div>
                {global.canvas.width && global.canvas.height &&
                    <Canvas width={global.canvas.width}
                            height={global.canvas.height}
                            shapes={[dummyShape]}/>
                }
            </div>
            <div>
                <p className="is-danger">
                    ERROR: {props.error}
                </p>
            </div>



        </div> );
}
