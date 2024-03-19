import { error } from "@sveltejs/kit";
import { constants } from "$lib/index";

type RouteParams = {
  params: {number: string};
};

export async function load({params} : RouteParams) {
  let number = parseInt(params.number);
  if (isNaN(number)) {
    throw error(404, "Puzzle not found");
  }
  if (number < 1 || number > constants.maxPuzzleNumber) {
    throw error(404, "Puzzle not found");
  }
  console.log("Loading puzzle...", number);
}
