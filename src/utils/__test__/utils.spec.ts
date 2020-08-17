import { render, fireEvent, RenderResult } from '@testing-library/react';
import {beyondCanvasRange, doesCanvasExist, isNumberOfPropsCorrect, isValidFormat, readCommand} from "../utils";

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
        expect(beyondCanvasRange(2,1,{width:1, height:2})).toBeFalsy();
        expect(beyondCanvasRange(10,10,{width:1, height:2})).toBeTruthy();
        expect(beyondCanvasRange(10,10,null)).toBeTruthy();
    });
});
