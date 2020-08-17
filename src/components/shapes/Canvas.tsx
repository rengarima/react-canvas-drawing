//@ts-nocheck
import React, {useEffect} from "react";
import {CanvasProps} from "../../types/CanvasProps";
import useCanvas from "../../hooks/useCanvas";
import global from "../../store/global";

export const Canvas = ({width, height, shapes, fill}: CanvasProps) => {
    const {border, canvasBody, drawShapes} = useCanvas(width, height);
    const horizontalBorder = Array(width+2).fill(border.horizontal);

    const drawEdge = (): any =>
        horizontalBorder.map((value, i) => {
            return <td key={"edge-"+i}>{value}</td>
        });

    useEffect(() => {
        drawShapes(global.canvas.shapes, global.canvas.fillValues);
    }, [shapes, fill, canvasBody, drawShapes])

    return (
        <div
            style={{
                textAlign: 'left',
            }}>

            {canvasBody &&
            <table className="table is-narrow is-striped">
                <thead>
                <tr>{drawEdge()}</tr>
                </thead>
                <tbody>
                {
                    canvasBody.map((columns, i) => {
                        var row = columns.map((value, j) => {
                            return <td key={j}>{value}</td>
                        });

                        return <tr key={i}>
                            <td>{border.vertical}</td>
                            {row}
                            <td>{border.vertical}</td>
                        </tr>;

                    })
                }</tbody>
                <tfoot>
                <tr>{drawEdge()}</tr>
                </tfoot>
            </table>
            }
        </div>
    );
}
