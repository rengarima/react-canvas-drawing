import {render, RenderResult} from "@testing-library/react";
import Layout from "../Layout";
import * as React from "react";

let documentBody: RenderResult;
describe('<Layout />', () => {
    beforeEach(() => {

    });
    it('should Render with Header and Footer', () => {
        documentBody = render(
            <Layout>
                <p>Dummy</p>
            </Layout>
        );
        expect(documentBody.getByText("Canvas Drawing Tool")).toBeDefined();
        expect(documentBody.getByText("Dummy")).toBeDefined();
        expect(documentBody.getByText("Garima Goyal")).toBeDefined();
    });
});
