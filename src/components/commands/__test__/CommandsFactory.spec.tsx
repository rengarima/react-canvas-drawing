//@ts-nocheck
import {render, RenderResult} from "@testing-library/react";
import CommandsFactory from "../CommandsFactory";
import React from "react";

let documentBody: RenderResult;


test('Should render a CanvasCommand', () => {

    documentBody = render(
        <CommandsFactory command={["C","10","10"]}/>
    );
    var linkElement = documentBody.getAllByText("-");
    expect(linkElement).toBeDefined();
});


test('Should render a Invalid Command for wrong parameters', () => {

    documentBody = render(
        <CommandsFactory command={["C","10"]}/>
    );
    var linkElement = documentBody.getByText("ERROR: Invalid Command");
    expect(linkElement).toBeInTheDocument();
});

test('Should render a Invalid Command', () => {
    documentBody = render(
        <CommandsFactory command={["D","10","10"]}/>
    );

    var linkElement = documentBody.getByText("ERROR: Command Doesnt Exist");
    expect(linkElement).toBeInTheDocument();
});
