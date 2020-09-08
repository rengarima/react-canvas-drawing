
import {render, RenderResult} from "@testing-library/react";
import React from "react";
import {DrawingBoard} from "../../../screens/DrawingBoard";
import {RectangleCommand} from "../RectangleCommand";
import '@testing-library/jest-dom';
import {UndoCommand} from "../UndoCommand";
import {LineCommand} from "../LineCommand";
import { screen } from '@testing-library/dom'

let documentBody: RenderResult;
describe("Undo", () => {

    it('Should render a Invalid Command if canvas doesnt exist', () => {

        documentBody = render(
            <UndoCommand command={["U","L", "1", "1", "1","2"]}/>
        );
        var linkElement = documentBody.getByLabelText("error");
        expect(linkElement).toBeInTheDocument();
    });



//Fixme: Why is test failing
    it('Should undo Last Command', () => {

        render(
            <DrawingBoard command={"C 5 4"}/>
        );
        render(
            <LineCommand command={["L","1","1","1","1"]}/>
        );
        render(
            <LineCommand command={["L","2","2","2","2"]}/>
        );
        documentBody = render(
            <UndoCommand command={["U","L","2","2","2","2"]}/>
        );

        // let tableNode = documentBody.getByRole("table" );
        // expect(tableNode).toBeDefined();
        let linkElement = documentBody.getAllByText("x");
        expect(linkElement.length).toEqual(4);

        documentBody = render(
            <UndoCommand command={["U","L","1", "1","1","3"]}/>
        );
        linkElement = documentBody.getAllByText("x");
        expect(linkElement).toBeDefined();
        expect(linkElement.length).toEqual(5); //This logic seems bizzare its deleting but rerendering in the dom

    });
})





