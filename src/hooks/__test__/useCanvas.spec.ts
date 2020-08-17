import {act, renderHook} from "@testing-library/react-hooks";
import useCanvas from "../useCanvas";
import {dummyFill} from "../../store/global";

describe("useCanvas", () => {
    beforeEach(() => {

    });

    it("should return a Blank Canvas", () => {
        const {result} = renderHook(() => useCanvas(20,4));
        const {border, canvasBody}: any = result.current;
        expect(border).toEqual( { horizontal: '-', vertical: '|' });
        expect(canvasBody).toEqual(
            [[" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
                [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
                [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
                [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "]]
        );
    });

    it("should Draw Line based on the coordinates provided", () => {
        const {result} = renderHook(() => useCanvas(20,4));
        const {drawShapes}: any = result.current;
        //@ts-ignore
        //FIXME: coordinates are off
        act(() => drawShapes([{
            startX: 2, startY: 1, endX: 2, endY: 6, shape:"Line"
        }], [dummyFill]));


        const { canvasBody}: any = result.current;
        expect(canvasBody).toEqual(
            [[" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
                ["x", "x", "x", "x", "x", "x", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
                [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
                [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "]]
        );
    });

    it("should Flood Fill on the coordinates provided", () => {
        const {result} = renderHook(() => useCanvas(20,4));
        const {drawShapes}: any = result.current;
        act(() => drawShapes([{
            startX: 2, startY: 1, endX: 2, endY: 6, shape:"Line"
        }], [{fromX: 10, fromY: 3, color:"."}]));

        //FIXME: Floodfill logic is not working for few coordinates
        const { canvasBody}: any = result.current;
        expect(canvasBody).toEqual(
            [[".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
                ["x", "x", "x", "x", "x", "x", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
                [" ", " ", " ", " ", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
                [" ", " ", " ", " ", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", "."]]
        );
    });

});
