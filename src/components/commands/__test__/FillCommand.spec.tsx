
import {render, RenderResult} from "@testing-library/react";
import React from "react";
import {DrawingBoard} from "../../../screens/DrawingBoard";
import {FillCommand} from "../FillCommand";
import '@testing-library/jest-dom';

let documentBody: RenderResult;
describe("Rectangle", () => {

    it('Should render a Invalid Command if canvas doesnt exist', () => {

        documentBody = render(
            <FillCommand command={["f","1", "1", "."]}/>
        );
        var linkElement = documentBody.getByLabelText("error");
        expect(linkElement).toBeInTheDocument();
    });


    it('Should render a Invalid Command for wrong parameters', () => {
        render(
            <DrawingBoard command={"C 20 4"}/>
        );

        documentBody = render(
            <FillCommand command={["f","1", "."]}/>
        );
        var linkElement = documentBody.getByText("ERROR: Invalid Command : ( Try: F x y color)");
        expect(linkElement).toBeInTheDocument();
    });




    it('Should render a Rectangle', () => {

        render(
            <DrawingBoard command={"C 20 4"}/>
        );

        documentBody = render(
            <FillCommand command={["f","1", "1", "."]}/>
        );
        var linkElement = documentBody.getAllByText(".");
        expect(linkElement).toBeDefined();
        expect(linkElement.length).toEqual(80);
    });
})





