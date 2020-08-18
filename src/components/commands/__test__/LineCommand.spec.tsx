//@ts-nocheck
import {render, RenderResult} from "@testing-library/react";
import React from "react";
import {LineCommand} from "../LineCommand";
import {DrawingBoard} from "../../../screens/DrawingBoard";

let documentBody: RenderResult;
describe("LineCommand", () => {

    it('Should render a Invalid Command if canvas doesnt exist', () => {

        documentBody = render(
            <LineCommand command={["L","1", "1", "1","2"]}/>
        );
        var linkElement = documentBody.getByLabelText("error");
        expect(linkElement).toBeInTheDocument();
    });


    it('Should render a Invalid Command for wrong parameters', () => {
        render(
            <DrawingBoard command={"C 20 4"}/>
        );

        documentBody = render(
            <LineCommand command={["L","10"]}/>
        );
        var linkElement = documentBody.getByText("ERROR: Only Horizontal or Vertical Lines Allowed");
        expect(linkElement).toBeInTheDocument();
    });

    it('Should render a Invalid Command for non straight lines', () => {
        render(
            <DrawingBoard command={"C 20 4"}/>
        );

        documentBody = render(
            <LineCommand command={["L","1","2","4","3"]}/>
        );
        var linkElement = documentBody.getByText("ERROR: Only Horizontal or Vertical Lines Allowed");
        expect(linkElement).toBeInTheDocument();
    });



    it('Should render a Line', () => {

        render(
            <DrawingBoard command={"C 20 4"}/>
        );

        documentBody = render(
            <LineCommand command={["L","1","1","1","3"]}/>
        );
        var linkElement = documentBody.getAllByText("x");
        expect(linkElement).toBeDefined();
        expect(linkElement.length).toEqual(3);
    });
})





