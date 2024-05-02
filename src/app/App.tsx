"use client";
import { useEffect, useState } from "react";

import "./styles.css";
import { datas } from "./data";
import { objectType } from "./types";

export default function App() {
  const [dataList, setDataList] = useState<Array<objectType>>(datas);
  const [fruits, setFruits] = useState<Array<objectType>>([]);
  const [vegetables, setVegetables] = useState<Array<objectType>>([]);

  const handleRemoveItem = (data: objectType) => {
    setDataList(dataList.filter((list) => list.name !== data.name));
  };

  const handleData = (data: objectType) => {
    const date = new Date();
    const nextFiveSec = new Date(date.getTime() + 5000);
    if (data.type === "Fruit")
      setFruits((prev) => [...prev, { ...data, timeStamp: nextFiveSec }]);
    if (data.type === "Vegetable")
      setVegetables((prev) => [...prev, { ...data, timeStamp: nextFiveSec }]);
    handleRemoveItem(data);
    return;
  };

  const handleRackToList = (array: objectType[]): void => {
    array.map((element: objectType): void => {
      const date = new Date();
      const getCurrentSec = date.getSeconds();
      const getDataSec = new Date(element.timeStamp).getSeconds();
      if (getCurrentSec === getDataSec || getCurrentSec > getDataSec) {
        if (element.type === "Fruit") {
          setFruits(fruits.filter((list) => list.name !== element.name));
          setDataList((prev) => [
            ...prev,
            { ...element, timeStamp: new Date() },
          ]);
        }

        if (element.type === "Vegetable") {
          setVegetables(
            vegetables.filter((list) => list.name !== element.name)
          );
          setDataList((prev) => [
            ...prev,
            { ...element, timeStamp: new Date() },
          ]);
        }
      }

      return;
    });
  };

  useEffect(() => {
    const array = [...fruits, ...vegetables];
    const interval = setInterval(() => {
      if (array.length > 0) handleRackToList(array);
    }, 1000);
    return () => clearInterval(interval);
  }, [fruits, vegetables]);

  return (
    <div className="App">
      <div className="data-list-container">
        {dataList.map((data: objectType, index) => {
          return (
            <div className="data-list-content" key={`${data.name}-${index}`}>
              <button className="data-button" onClick={() => handleData(data)}>
                {data.name}
              </button>
            </div>
          );
        })}
      </div>

      <table width="400px" className="border-collapse border border-slate-500">
        <thead>
          <tr>
            <th className="border border-slate-200 bg-slate-100 py-2">
              <h3>Fruit</h3>
            </th>
            <th className="border border-slate-200 bg-slate-100 py-2">
              <h3>Vegetable</h3>
            </th>
          </tr>
        </thead>
        <tbody className="align-baseline">
          <tr>
            <td width="200px" className="border border-slate-200 py-2">
              {fruits.map((fruit: objectType, index) => {
                return (
                  <div className="data-list-content" key={`${fruit.name}-${index}`}>
                    <button className="data-button">{fruit.name}</button>
                  </div>
                );
              })}
            </td>
            <td width="200px" className="border border-slate-200 py-2">
              {vegetables.map((vegetable: objectType, index) => {
                return (
                  <div className="data-list-content" key={`${vegetable.name}-${index}`}>
                    <button className="data-button">{vegetable.name}</button>
                  </div>
                );
              })}
            </td>
          </tr>
        </tbody>
      </table>
     
    </div>
  );
}
