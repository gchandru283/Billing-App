import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { HotCoffee, Snacks, ColdCoffee, Dessert } from "./components/Data";
import Header from "./components/Header";
import New from "./components/Preview";

function Billing() {
  const [selected, setSelected] = useState([]);
  const [totalCost, setTotalCost] = useState(0);

  useEffect(() => {
    const newTotalCost = selected.reduce(
      (acc, item) => acc + item.cost * item.count,
      0
    );
    setTotalCost(newTotalCost);
  }, [selected]);

  const [customerDetails, setCustomerDetails] = useState({
    name: "",
    mobile: "",
  });

  const handleInput = (e) => {
    const { name, value } = e.target;
    setCustomerDetails({
      ...customerDetails,
      [name]: value,
    });
  };

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
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const [inputValues, setInputValues] = useState({
    name: "",
    mobile: "",
  });
  const handleClear = () => {
    setCustomerDetails({ name: "", mobile: "" });
    setInputValues({ name: "", mobile: "" });
    setSelected([]);
    setTotalCost(0);
  };
  //-------------------------------------------------------------------------------------------------

  const [jsonData, setJsonData] = useState(null);
  const convertToJSON = () => {
    const jsonItems = selected.map((item) => ({
      Item: item.name,
      Count: item.count,
      Price: item.cost.toFixed(2),
      Amount: calculateTotalCost(item).toFixed(2),
    }));
    const jsonCustomer = {
      Name: customerDetails.name,
      Mobile: customerDetails.mobile,
    };
    const jsonTotal = {
      Total: totalCost.toFixed(2),
    };

    const newJsonData = {
      Customer: jsonCustomer,
      Items: jsonItems,
      Total: jsonTotal,
    };

    setJsonData(newJsonData);
  };

  //--------------------------------------------------------------------------------------------------

  const renderSection = (sectionName, items) => (
    <div className="flex flex-col pb-4" key={sectionName}>
      <div className="font-semibold cursor-pointer">{sectionName}</div>
      <div>
        {items.map((item) => (
          <div className="flex pl-2" key={item.id}>
            <label className="cursor-pointer">
              <input
                className="mr-2"
                type="checkbox"
                value={item.name}
                id={item.id}
                checked={selected.some(
                  (selectedItem) => selectedItem.id === item.id
                )}
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
    <>
      <Header />
      <div className="md:flex-row flex flex-col h-screen pt-16 select-none tap-highlight-transparent">
        <div className="md:w-1/3 md:max-w-sm overflow-y-auto flex-none shadow-slate-800 shadow-md pt-10 pb-10 flex flex-col items-center text-lg md:text-xl font-glacial">
          <div className="">
            {renderSection("Hot Coffee", HotCoffee)}
            {renderSection("Cold Coffee", ColdCoffee)}
            {renderSection("Snacks", Snacks)}
            {renderSection("Desserts", Dessert)}
          </div>
        </div>
        <div className="w-full flex-grow flex flex-col items-center gap-8 py-6 bg-gray-100">
          <div className="text-xl md:text-2xl font-semibold font-glacial border-b-2 border-black px-2">
            Customer Bill
          </div>
          <div className="flex justify-between md:flex-row flex-col gap-4 md:gap-0 w-11/12 max-w-3xl font-glacial px-2">
            <div className="flex justify-between items-end">
              <label htmlFor="name" className="text-lg md:text-xl md:mr-3">
                Name :{" "}
              </label>
              <input
                className="border-b border-black focus:outline-none bg-transparent text-lg md:px-3"
                id="name"
                name="name"
                onChange={handleInput}
                value={customerDetails.name}
                required
                type="text"
              />
            </div>
            <div className=" flex justify-between items-end">
              <label htmlFor="mobile" className="text-lg md:text-xl md:mr-3 ">
                Mobile Number :{" "}
              </label>
              <input
                className="border-b border-black focus:outline-none bg-transparent text-lg md:px-3"
                id="mobile"
                name="mobile"
                onChange={handleInput}
                value={customerDetails.mobile}
                required
                type="text"
              />
            </div>
          </div>
          <div className="md:h-80 overflow-y-auto scrollbar w-11/12 max-w-3xl px-1 md:px-10 border border-dashed rounded-sm md:rounded py-5 border-gray-300">
            <table className="table table-fixed w-full md:text-xl font-NewsCycle tracking-wide">
              <thead>
                <tr>
                  <th className="w-1/3 pb-2 text-left pl-7 md:pl-12 font-semibold border-b-2 border-gray-400">
                    Item
                  </th>
                  <th className="w-1/5 pb-2 font-semibold border-b-2 border-gray-400">
                    Count
                  </th>
                  <th className="w-1/5 text-right md:pr-8 pr-6 pb-2  font-semibold border-b-2 border-gray-400">
                    Price
                  </th>
                  <th className="w-1/4 text-right pb-2 pr-5 font-semibold border-b-2 border-gray-400">
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody>
                {selected.map((item, id) => {
                  return (
                    <tr key={id}>
                      <td className=" pl-3 p-0.5 ">{item.name}</td>
                      <td className="text-center p-0.5">
                        <input
                          onFocus={null}
                          className="w-16 text-center focus:outline-none bg-transparent"
                          type="number"
                          id={item.id}
                          value={item.count}
                          onChange={(e) => handleCountChange(e, item.id)}
                        />
                      </td>
                      <td className="text-right mx-auto pr-6 p-0.5">
                        {item.cost.toFixed(2)}
                      </td>
                      <td className="text-right mx-auto pr-5 p-0.5">
                        {calculateTotalCost(item).toFixed(2)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-around gap-9 w-full md:mt-4 max-w-3xl px-5 sm:px-10 ">
            <div className="font-semibold md:text-xl text-lg w-48 md:w-52">
              Total Cost: Rs.{totalCost.toFixed(2)}
            </div>
            <div className="flex gap-5">
              <input
                type="button"
                className="bg-red-600 hover:scale-100 scale-95 md:scale-100 md:hover:scale-105 transform duration-300 cursor-pointer text-white p-1 px-3 text-lg rounded font-NewsCycle tracking-wide"
                value="Clear"
                onClick={handleClear}
              />
              <input
                type="button"
                className="bg-gray-600 hover:scale-100 scale-95 md:scale-100 md:hover:scale-105 transform duration-300 cursor-pointer text-white p-1 px-3 text-lg rounded font-NewsCycle tracking-wide"
                value="Print Receipt"
                onClick={() => {
                  convertToJSON();
                  openModal();
                }}
              />
            </div>
          </div>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="New Component Modal"
        className="w-fit m-auto modalScrollbar bg-yellow-100 overflow-auto h-5/6 top-1/2 md:top-1/2 md:left-1/2 left-10 transform md:-translate-x-1/2 -translate-x-5 -translate-y-1/2 rounded border absolute p-3"
        ariaHideApp={false}
      >
        <New jsonData={jsonData} />
      </Modal>
    </>
  );
}

export default Billing;
