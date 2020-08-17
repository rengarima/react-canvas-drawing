export const envVar = {
    horizontalStyle: process.env.REACT_APP_HORIZONTAL_STYLE || "-",
    verticalStyle: process.env.REACT_APP_VERTICAL_STYLE || "|",
    xMax: process.env.REACT_APP_HORIZONTAL_MAX || 30,
    yMax: process.env.REACT_APP_VERTICA_MAX || 10,
    lineGlyph: "x"
}

export const readCommand = (cmd: string) : string[] => {
    if(cmd){
       return cmd.trim().toUpperCase().split(" ");
    }
    return [];
}

export const isValidFormat = (cmd: string []): boolean => cmd && cmd.length >0;


export const isNumberOfPropsCorrect =
    (cmd: string [], requiredInput: number): boolean => {
    return cmd && cmd.length === requiredInput;
}

export const doesCanvasExist =
    (canvas: any): boolean => {
        return canvas? canvas.width > 0 &&
            canvas.height >0: false;
}

export const beyondCanvasRange =
    (x: number, y:number, canvas: any): boolean => {
        return canvas? x > canvas.width &&
            y > canvas.height: true;
    }
