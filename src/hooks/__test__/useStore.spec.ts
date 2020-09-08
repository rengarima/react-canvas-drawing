
import {act, renderHook} from "@testing-library/react-hooks";
import useStore from "../useStore";
import {dummyFill, dummyShape} from "../../store/global";
import '@testing-library/jest-dom';
import {ShapeProps} from "../../types/ShapeProps";

describe("useStore", () => {
    beforeEach(() => {

    });

    it("should create a store with default values", () => {
        const {result} = renderHook(() => useStore());
        const {width, height, shapes, fillValues}: any = result.current;
        expect(width).toEqual(0);
        expect(height).toEqual(0);
        expect(shapes).toEqual([dummyShape]);
        expect(fillValues).toEqual([dummyFill]);
    });


    it("should set canvas border", () => {
        const {result} = renderHook(() => useStore());
        act(() => result.current.setBorder(10, 4));

        const canvas: any = result.current;
        expect(canvas.width).toEqual(10);
        expect(canvas.height).toEqual(4);
        expect(canvas.shapes).toEqual([dummyShape]);
        expect(canvas.fillValues).toEqual([dummyFill]);
    });


    it("should addShape to draw", () => {
        const {result} = renderHook(() => useStore());
        act(() => result.current.addShape(
            {
                startX: 2,
                startY: 2,
                endX: 2,
                endY: 4,
                shape: "Line"
            }
        ));
        expect(result.current.shapes.length).toEqual(2);

        expect(result.current.shapes).toEqual([dummyShape, {
            startX: 2,
            startY: 2,
            endX: 2,
            endY: 4,
            shape: "Line"
        }]);
        expect(result.current.fillValues).toEqual([dummyFill]);

        act(() => result.current.addShape(
            {
                startX: 3,
                startY: 3,
                endX: 4,
                endY: 4,
                shape: "Line"
            }
        ));

        expect(result.current.shapes.length).toEqual(3);
    });

    it("should addFill", () => {
        const {result} = renderHook(() => useStore());
        act(() => result.current.addFill(
            {
                fromX: 2,
                fromY: 2,
                color: "x"
            }
        ));
        expect(result.current.fillValues.length).toEqual(2);

        expect(result.current.fillValues).toEqual([dummyFill, {
            fromX: 2,
            fromY: 2,
            color: "x"
        }]);
        expect(result.current.shapes).toEqual([dummyShape]);

        act(() => result.current.addFill(
            {
                fromX: 1,
                fromY: 1,
                color: "x"
            }
        ));
        expect(result.current.fillValues.length).toEqual(3);
    });

    it("should Reset to Blank Canvas", () => {
        const {result} = renderHook(() => useStore());
        act(() => result.current.setBorder(10, 4));
        act(() => result.current.addShape(
            {
                startX: 2,
                startY: 2,
                endX: 2,
                endY: 4,
                shape: "Line"
            }
        ));
        act(() => result.current.addFill(
            {
                fromX: 2,
                fromY: 2,
                color: "x"
            }
        ));
        expect(result.current.fillValues.length).toEqual(2);
        expect(result.current.shapes.length).toEqual(2);

        act(() => result.current.reset());
        const canvas: any = result.current;
        expect(canvas.width).toEqual(0);
        expect(canvas.height).toEqual(0);
        expect(canvas.shapes).toEqual([dummyShape]);
        expect(canvas.fillValues).toEqual([dummyFill]);
    });


    it("should remove a shape", () => {
        const {result} = renderHook(() => useStore());
        const tempShape: ShapeProps = {
            startX: 2,
            startY: 2,
            endX: 2,
            endY: 4,
            shape: "Line"
        };
        act(() => result.current.setBorder(10, 4));
        act(() => result.current.addShape(tempShape));
        let canvas = result.current;
        expect(canvas.shapes.length).toEqual(2);
        act(() => result.current.removeShape([tempShape]));
        canvas = result.current;
        expect(canvas.shapes.length).toEqual(1);

    });

    it("should not remove any shape if doesnt exist ", () => {
        const {result} = renderHook(() => useStore());
        act(() => result.current.setBorder(10, 4));
        act(() => result.current.addShape(
            {
                startX: 2,
                startY: 2,
                endX: 2,
                endY: 4,
                shape: "Line"
            }
        ));
        let canvas = result.current;
        expect(canvas.shapes.length).toEqual(2);
        act(() => result.current.removeShape([{
            startX: 3,
            startY: 2,
            endX: 2,
            endY: 4,
            shape: "Line"
        }]));
        canvas = result.current;
        expect(canvas.shapes.length).toEqual(2);

    });

    it("should  remove from anywhere ", () => {
        const {result} = renderHook(() => useStore());
        act(() => result.current.setBorder(10, 4));
        act(() => result.current.addShape(
            {
                startX: 2,
                startY: 2,
                endX: 2,
                endY: 4,
                shape: "Line"
            }
        ));
        act(() => result.current.addShape(
            {
                startX: 3,
                startY: 3,
                endX: 3,
                endY: 4,
                shape: "Line"
            }
        ));
        act(() => result.current.addShape(
            {
                startX: 2,
                startY: 4,
                endX: 4,
                endY: 4,
                shape: "Line"
            }
        ));
        let canvas = result.current;
        expect(canvas.shapes.length).toEqual(4);
        act(() => result.current.removeShape([{
            startX: 3,
            startY: 3,
            endX: 3,
            endY: 4,
            shape: "Line"
        }]));
        canvas = result.current;
        expect(canvas.shapes.length).toEqual(3);
        expect(canvas.shapes[2]).toEqual({
            startX: 2,
            startY: 4,
            endX: 4,
            endY: 4,
            shape: "Line"
        });

    });

});
