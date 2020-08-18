
import {render, RenderResult} from "@testing-library/react";
import React from "react";
import {DrawingBoard} from "../../../screens/DrawingBoard";
import {RectangleCommand} from "../RectangleCommand";
import '@testing-library/jest-dom';

let documentBody: RenderResult;
describe("Rectangle", () => {

    it('Should render a Invalid Command if canvas doesnt exist', () => {

        documentBody = render(
            <RectangleCommand command={["R","1", "1", "1","2"]}/>
        );
        var linkElement = documentBody.getByLabelText("error");
        expect(linkElement).toBeInTheDocument();
    });


    it('Should render a Invalid Command for wrong parameters', () => {
        render(
            <DrawingBoard command={"C 20 4"}/>
        );

        documentBody = render(
            <RectangleCommand command={["R","10"]}/>
        );
        var linkElement = documentBody.getByText("ERROR: Invalid Command : Try R x y x2 y2");
        expect(linkElement).toBeInTheDocument();
    });




    it('Should render a Rectangle', () => {

        render(
            <DrawingBoard command={"C 20 4"}/>
        );

        documentBody = render(
            <RectangleCommand command={["R","14","1","18","3"]}/>
        );
        var linkElement = documentBody.getAllByText("x");
        expect(linkElement).toBeDefined();
        expect(linkElement.length).toEqual(12);
    });
})





