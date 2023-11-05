import React, { useState, useEffect } from "react";
import { HotCoffee, Snacks, ColdCoffee, Dessert } from "./components/Data";

function Billing() {
  const [openSection, setOpenSection] = useState("Hot Coffee");
  const [selected, setSelected] = useState([]);
  const [totalCost, setTotalCost] = useState(0);

  useEffect(() => {
    const newTotalCost = selected.reduce(
      (acc, item) => acc + item.cost * item.count,
      0
    );
    setTotalCost(newTotalCost);
  }, [selected]);

  const handleChange = (e) => {
    const activeData = e.target.checked;
    const itemId = parseInt(e.target.id);
    const item = HotCoffee.concat(ColdCoffee, Snacks, Dessert).find(
      (item) => item.id === itemId
    );

    if (activeData) {
      setSelected((oldData) => [...oldData, { ...item, count: 1 }]);
    } else {
      setSelected((oldData) => oldData.filter((item) => item.id !== itemId));
    }
  };

  const handleCountChange = (e, itemId) => {
    const count = parseInt(e.target.value);
    setSelected((oldData) => {
      return oldData.map((item) =>
        item.id === itemId ? { ...item, count } : item
      );
    });
  };

  const calculateTotalCost = (item) => {
    return item.cost * item.count;
  };

  const renderSection = (sectionName, items) => (
    <div
      className="flex flex-col pb-4"
      key={sectionName}
    >
      <div className="font-semibold cursor-pointer">
        {sectionName}
      </div>
      <div>
        {items.map((item) => (
          <div className="flex pl-2" key={item.id}>
            <label className="cursor-pointer">
              <input
                className="mr-2"
                type="checkbox"
                value={item.name}
                id={item.id}
                onChange={(e) => handleChange(e)}
              />
              {item.name}
            </label>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="md:flex-row flex flex-col h-screen pt-20 select-none tap-highlight-transparent">
      <div className="md:w-1/3 md:max-w-sm overflow-y-auto flex-none shadow-slate-800 shadow-md pt-10 pb-10 flex flex-col items-center text-lg md:text-xl font-glacial">
        <div className="">
          {renderSection("Hot Coffee", HotCoffee)}
          {renderSection("Cold Coffee", ColdCoffee)}
          {renderSection("Snacks", Snacks)}
          {renderSection("Desserts", Dessert)}
        </div>
      </div>
      <div className="w-full flex-grow flex flex-col items-center gap-5 py-7 bg-gray-100">
          <div className="text-xl md:text-2xl font-semibold font-glacial border-b-2 border-black px-2">Customer Bill</div>
        <div className="md:h-96 overflow-y-auto w-11/12 max-w-3xl px-2 md:px-10 border border-dashed rounded-sm md:rounded py-5 border-gray-300">
          <table className="table table-fixed w-full text-lg md:text-xl font-NewsCycle tracking-wide">
            <thead>
              <tr>
                <th className="w-2/5 text-left pl-8 md:pl-16 font-semibold border-b-2 border-gray-400" >Item</th>
                <th className="w-1/4 pb-2 font-semibold border-b-2 border-gray-400">Count</th>
                <th className="w-1/4 text-right pb-2 pr-8 font-semibold border-b-2 border-gray-400">Price</th>
              </tr>
            </thead>
            <tbody>
              {selected.map((item, id) => {
                return (
                  <tr key={id}>
                    <td className="md:pl-10 pl-5 p-0.5">
                      {item.name}
                    </td>
                    <td className="text-center p-0.5">
                      <input
                        onFocus={null}
                        className="w-16 text-center focus:outline-none bg-transparent text-sm md:text-lg"
                        type="number"
                        id={item.id}
                        value={item.count}
                        onChange={(e) => handleCountChange(e, item.id)}
                      />
                    </td>
                    <td className="text-right mx-auto pr-8 p-0.5 text-sm md:text-lg">
                      {calculateTotalCost(item).toFixed(2)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-around gap-9 w-full mt-4 max-w-3xl px-5 sm:px-10 ">
          <div className="text-right font-semibold md:text-xl text-lg">
          Total Cost: Rs.{totalCost.toFixed(2)}
        </div>
            <div>
              <input type="button" className="bg-gray-600 hover:scale-105 transform duration-300 cursor-pointer text-white p-1 px-3 text-lg rounded font-NewsCycle tracking-wide" value="Print Receipt" />
            </div>
        </div>
      </div>
    </div>
  );
}

export default Billing;
