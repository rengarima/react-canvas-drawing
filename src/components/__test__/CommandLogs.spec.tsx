import React from 'react';
import { render, fireEvent, RenderResult } from '@testing-library/react';
import {Input} from '../Input';
import {CommandLogs} from "../CommandLogs";

let documentBody: RenderResult;
describe('<CommandLogs />', () => {
    beforeEach(() => {
        const logs = [{command:"Log 1"}]
        documentBody = render(<CommandLogs
            logs={logs}
        />);
    });
    it('CommandLogs is rendered', () => {
        expect(documentBody.getByLabelText("command-logs")).toBeDefined();
        expect(documentBody.getByText("Log 1")).toBeDefined();
    });

    it("matches snapshot", () => {
        const { baseElement } = documentBody;
        expect(baseElement).toMatchSnapshot();
    });
});
