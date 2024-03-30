export type Direction = "E" | "W" | "N" | "S" | "NE" | "NW" | "SW" | "SE";
export type Position = [number, number]
export type Connections = Array<Array<[Direction, Color]>>;
export enum Color {
  Primary = 0,
  Secondary,
  None,
}
export type ValidationMessage = {
  message : string,
  valid : boolean,
}
export type BoardProperties = {
  colors : Array<Color>,
  connectors : Connections,
  shells : Array<boolean>,
  letters : Array<string>,
}

