import React from 'react';
import { render, fireEvent, RenderResult } from '@testing-library/react';
import {Input} from '../Input';
import '@testing-library/jest-dom';

let documentBody: RenderResult;
describe('<Input />', () => {
    beforeEach(() => {
        documentBody = render(<Input
            id="test-input"
            placeholder="Enter Command"
            icon="icon"
        />);
    });
    it('Input is rendered', () => {
        expect(documentBody.getByLabelText("test-input")).toBeDefined();
        expect(documentBody.getByPlaceholderText("Enter Command")).toBeDefined();
    });

    it('Input is rendered with Error', () => {
        expect(documentBody.getByLabelText("test-input")).toBeDefined();
        expect(documentBody.getByPlaceholderText("Enter Command")).toBeDefined();
    });

    it('Value is changed', () => {
        const input = documentBody.getByLabelText("test-input");
        fireEvent.change(input, {target: {value: "C 10 4"}});
        //@ts-ignore
        expect(input.value).toBe("C 10 4");
    });

    it('Input is rendered with Error', () => {
        const documentBodyWithError = render(<Input
            id="test-input"
            placeholder="Enter Command"
            icon="icon"
            error="ERROR"
        />);
        expect(documentBodyWithError.getByText("ERROR")).toBeDefined();
    });

    it("matches snapshot", () => {
        const { baseElement } = documentBody;
        expect(baseElement).toMatchSnapshot();
    });
});
