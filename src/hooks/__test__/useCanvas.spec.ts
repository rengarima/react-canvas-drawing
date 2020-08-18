//@ts-nocheck
import {act, renderHook} from "@testing-library/react-hooks";
import useCanvas from "../useCanvas";
import {dummyFill} from "../../store/global";
import {getRectangleAsLines} from "../../utils/utils";
import {ShapeProps} from "../../types/ShapeProps";

//FIXME: coordinates are swapped in canvas
const shape1 = {startX: 2, startY: 1, endX: 2, endY: 6, shape:"Line"};
const shape2 = {startX: 3, startY: 6, endX: 4, endY: 6, shape:"Line"};
const rectangle: ShapeProps = {startX: 1, startY: 14, endX: 3, endY: 18, shape:"Rectangle"};
const fill = {fromX: 10, fromY: 3, color:"."};
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

        act(() => drawShapes([shape1], [dummyFill]));
        expect(result.current.canvasBody).toEqual(
            [[" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
                ["x", "x", "x", "x", "x", "x", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
                [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
                [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "]]
        );
    });

    it("should Draw Rectangle based on the coordinates provided", () => {
        const {result} = renderHook(() => useCanvas(20,4));
        const {drawShapes}: any = result.current;
        const shape3 = getRectangleAsLines(rectangle);
        act(() => drawShapes([...shape3], [dummyFill]));
        const { canvasBody}: any = result.current;
        expect(canvasBody).toEqual(
            [
                [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "x", "x", "x", "x", "x", " ", " "],
                [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "x", " ", " ", " ", "x", " ", " "],
                [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "x", "x", "x", "x", "x", " ", " "],
                [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "]]
        );
    });

    it("should Flood Fill on the coordinates provided", () => {
        const {result} = renderHook(() => useCanvas(20,4));
        const {drawShapes}: any = result.current;
        act(() => drawShapes([shape1], [fill]));

        const { canvasBody}: any = result.current;
        expect(canvasBody).toEqual(
            [[".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
                ["x", "x", "x", "x", "x", "x", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
                [".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
                [".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", "."]]
        );
    });

    it("should verify credit suisse test case", () => {
        const {result} = renderHook(() => useCanvas(20,4));
        const {drawShapes}: any = result.current;
        const shape3 = getRectangleAsLines(rectangle);
        act(() => drawShapes([shape1, shape2, ...shape3], [fill]));


        const { canvasBody}: any = result.current;
        expect(canvasBody).toEqual(
            [
                [".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", "x", "x", "x", "x", "x", ".", "."],
                ["x", "x", "x", "x", "x", "x", ".", ".", ".", ".", ".", ".", ".", "x", " ", " ", " ", "x", ".", "."],
                [" ", " ", " ", " ", " ", "x", ".", ".", ".", ".", ".", ".", ".", "x", "x", "x", "x", "x", ".", "."],
                [" ", " ", " ", " ", " ", "x", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", "."]]
        );
    });


});
