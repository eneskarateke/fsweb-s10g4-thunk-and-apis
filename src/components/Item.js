import React from "react";

function Item({ data }) {
  console.log("data", data);
  return (
    <div className="shadow-md bg-white text-center">
      <p className="text-2xl p-10">{data.activity}</p>
    </div>
  );
}

export default Item;
