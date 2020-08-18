
import {render, RenderResult} from "@testing-library/react";
import React from "react";
import {CanvasCommand} from "../CanvasCommand";
import {envVar} from "../../../utils/utils";
import '@testing-library/jest-dom';

let documentBody: RenderResult;

test('Should render a Invalid Command for wrong parameters', () => {

    documentBody = render(
        <CanvasCommand command={["C","10"]}/>
    );
    var linkElement = documentBody.getByText("ERROR: Invalid Command");
    expect(linkElement).toBeInTheDocument();
});

test('Should render a Invalid Command for too large canvas', () => {

    documentBody = render(
        <CanvasCommand command={["C","100", "100"]}/>
    );
    var linkElement = documentBody.getByText(`ERROR: Max Allowed Width:${envVar.xMax} & Height:${envVar.yMax}`);
    expect(linkElement).toBeInTheDocument();
});


test('Should render a CanvasCommand', () => {

    documentBody = render(
        <CanvasCommand command={["C","10","10"]}/>
    );
    var linkElement = documentBody.getAllByText("-");
    expect(linkElement).toBeDefined();
    expect(linkElement.length).toEqual(24);

    linkElement = documentBody.getAllByText("|");
    expect(linkElement).toBeDefined();
    expect(linkElement.length).toEqual(20);
});




