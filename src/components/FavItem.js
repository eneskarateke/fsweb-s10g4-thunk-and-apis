import React from "react";

import { useDispatch } from "react-redux";

import { removeFav } from "../actions";

function FavItem({ activity, id }) {
  const dispatch = useDispatch();

  const removeFavHandler = () => {
    dispatch(removeFav(id));
    removeFavFromLocalStorage(id);
  };

  const removeFavFromLocalStorage = (id) => {
    const storedFavs = JSON.parse(localStorage.getItem("s10g4"));
    const updatedFavs = storedFavs.filter((fav) => fav.id !== id);
    localStorage.setItem("s10g4", JSON.stringify(updatedFavs));
  };

  return (
    <div className="bg-white hover:bg-green-200 shadow hover:shadow-lg p-3 pl-5 flex items-center group transition-all">
      <div className="flex-1  h-6 pr-4 font-bold">{activity}</div>
      <button
        onClick={() => removeFavHandler(id)}
        className="transition-all px-3 py-2 block text-sm rounded bg-rose-700 text-white opacity-30 group-hover:opacity-100"
      >
        Çıkar
      </button>
    </div>
  );
}

export default FavItem;
