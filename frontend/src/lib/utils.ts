import { Color } from "$lib/types";

export function colorString(c :  Color) {
  if (c === Color.None) { return "" }
  if (c === Color.Primary) { return "primary"}
  if (c === Color.Secondary) { return "secondary"}
  return "";
}
