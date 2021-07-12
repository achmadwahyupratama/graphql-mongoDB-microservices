import { makeVar } from "@apollo/client";
const defaultFavourites = []

export const favourites = makeVar(defaultFavourites)