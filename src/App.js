import React from "react";
import { Switch, Route, NavLink } from "react-router-dom";
import Item from "./components/Item";
import FavItem from "./components/FavItem";
import { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  fetchAnother,
  addFav,
  getFavsFromLocalStorage,
  resetFavs,
} from "./actions";

export default function App() {
  // const loading = false;
  // const current = null;
  // const favs = [];

  const loading = useSelector((store) => store.loading);
  const current = useSelector((store) => store.current);
  const favs = useSelector((store) => store.favs);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAnother());
    dispatch(getFavsFromLocalStorage());
  }, [dispatch]);

  function addToFavs(current) {
    if (current) {
      const isExisting = favs.some((fav) => fav.activity === current.activity);
      if (isExisting) {
        toast.warning("Activity already exists in favorites!");
      } else {
        dispatch(addFav(current));
        const toastId = toast.success("Günün aktivitesi favorilere eklendi!");

        toast.update(toastId, {
          onClose: () => {
            dispatch(fetchAnother());
          },
        });
      }
    }
  }
  const resetLocalStorage = () => {
    localStorage.removeItem("s10g4");
  };

  function newFetch() {
    dispatch(fetchAnother());
  }

  const removeAllFavs = () => {
    dispatch(resetFavs());
    resetLocalStorage();
  };

  return (
    <div className="wrapper max-w-xl mx-auto px-4">
      <nav className="flex text-2xl pb-6 pt-8 gap-2 justify-center">
        <NavLink
          to="/"
          exact
          className="py-3 px-6 "
          activeClassName="bg-white shadow-sm text-blue-600"
        >
          Rastgele
        </NavLink>
        <NavLink
          to="/favs"
          className="py-3 px-6 "
          activeClassName="bg-white shadow-sm text-blue-600"
        >
          Favoriler
        </NavLink>
      </nav>

      <Switch>
        <Route exact path="/">
          {loading && (
            <div className="bg-white p-6 text-center shadow-md">YÜKLENİYOR</div>
          )}
          {current && <Item data={current} />}

          <div className="flex gap-3 justify-end py-3">
            <button
              onClick={() => newFetch()}
              className="select-none px-4 py-2 border border-blue-700 text-blue-700 hover:border-blue-500 hover:text-blue-500"
            >
              Başka bir tane
            </button>
            <button
              onClick={() => addToFavs(current)}
              className="select-none px-4 py-2 bg-blue-700 hover:bg-blue-600 text-white"
            >
              Favorilere ekle
            </button>
          </div>
        </Route>

        <Route path="/favs">
          <div className="flex flex-col gap-3">
            {favs.length > 0 ? (
              favs.map((item) => (
                <FavItem key={item.key} id={item.id} activity={item.activity} />
              ))
            ) : (
              <div className="bg-white p-6 text-center shadow-md">
                Henüz bir favoriniz yok
              </div>
            )}

            <button
              onClick={() => resetLocalStorage()}
              className="select-none px-4 py-2 bg-blue-700 hover:bg-blue-600 text-white"
            >
              Favorileri hafızadan sil!
            </button>
            <button
              onClick={removeAllFavs}
              className="select-none px-4 py-2 bg-red-700 hover:bg-red-600 text-white"
            >
              Tüm Favorileri Sil
            </button>
          </div>
        </Route>
      </Switch>
      <ToastContainer autoClose={2000} />
    </div>
  );
}
