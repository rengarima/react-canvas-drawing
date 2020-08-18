
import {
    beyondCanvasRange,
    doesCanvasExist,
    getRectangleAsLines,
    isNumberOfPropsCorrect,
    isValidFormat,
    readCommand
} from "../utils";
import {ShapeProps} from "../../types/ShapeProps";

describe("Utils", () => {

    it("should split command to string[] ", () => {
        expect(readCommand("C 10 10  ")).toEqual(["C","10","10"]);
    });
    it("should convert command to upper case and trim spaces ", () => {
        expect(readCommand("c 10 10  ")).toEqual(["C","10","10"]);
    });

    it("should validate command is not blank", () => {
        expect(isValidFormat([""])).toBeTruthy();
        expect(isValidFormat([])).toBeFalsy();

    });

    it("should validate props length against requiredinput", () => {
        expect(isNumberOfPropsCorrect(["C","10"], 2)).toBeTruthy();
        expect(isNumberOfPropsCorrect([], 2)).toBeFalsy();

    });

    it("should verify if canvas exist", () => {
        expect(doesCanvasExist({width:1, height:2})).toBeTruthy();
        expect(doesCanvasExist({width:1})).toBeFalsy();
        expect(doesCanvasExist({height:2})).toBeFalsy();
        expect(doesCanvasExist({width:0, height:0})).toBeFalsy();
        expect(doesCanvasExist(null)).toBeFalsy();
    });

    it("should verify if coordinates are withing canvas ", () => {
        expect(beyondCanvasRange(1,1,{width:1, height:2})).toBeFalsy();
        expect(beyondCanvasRange(3,1,{width:1, height:3})).toBeFalsy();
        expect(beyondCanvasRange(10,10,{width:1, height:2})).toBeTruthy();
        expect(beyondCanvasRange(20,11,{width:10, height:20})).toBeTruthy();
        expect(beyondCanvasRange(21,10,{width:10, height:20})).toBeTruthy();
        expect(beyondCanvasRange(10,10,null)).toBeTruthy();
    });

    it("should return 4 sets of line as rectangle ", () => {
        const shape: ShapeProps = {startX:2, startY:3, endX:4, endY:6, shape:"Rectangle"};
        const expected:ShapeProps[] =[
            {startX:2, startY:3, endX:4, endY:3, shape:"Line"},
            {startX:2, startY:3, endX:2, endY:6, shape:"Line"},
            {startX:4, startY:3, endX:4, endY:6, shape:"Line"},
            {startX:2, startY:6, endX:4, endY:6, shape:"Line"},
        ];

        const calculated = getRectangleAsLines(shape);
        expect(calculated).toBeDefined();
        expect(calculated.length).toEqual(4);
        expect(calculated).toEqual(expected);
    });
});
