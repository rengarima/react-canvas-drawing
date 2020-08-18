
export interface CommandType {
    command: string[],
    error?: string
}
export interface Logs {
    logs: {command: string} [];
}
