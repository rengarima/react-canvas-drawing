import {ShapeProps} from "../types/ShapeProps";
import {FillProps} from "../types/FillProps";
import {CanvasStoreProps} from "../types/CanvasProps";

export const dummyShape: ShapeProps =
{
    startX: -1,
    startY: -1,
    endX: -1,
    endY: -1,
    shape: "Line"
};
export const dummyFill: FillProps =
    {
        fromX: -1,
        fromY: -1,
        color: ""
    };

const canvasStore: CanvasStoreProps = {
    canvas: {
        width: 0,
        height: 0,
        shapes: [dummyShape],
        fillValues: [dummyFill]
    },
};

export default canvasStore;
