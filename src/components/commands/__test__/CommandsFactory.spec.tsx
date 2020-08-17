import {render, RenderResult} from "@testing-library/react";
import CommandsFactory from "../CommandsFactory";
import * as React from "react";

let documentBody: RenderResult;
describe('<Layout />', () => {
    beforeEach(() => {

    });
    it.skip('should Render with Header and Footer', () => {
        documentBody = render(
            <CommandsFactory command={["C","10","10"]}/>
        );
        expect(documentBody.getByText("Canvas Drawing Tool")).toBeDefined();
    });
});
