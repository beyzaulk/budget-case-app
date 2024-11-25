import { FinanceContext } from "@/store/finance-context";
import { useState, useRef, useEffect, useContext } from "react";
import { currencyFormatter } from "@/lib/utils";

import Modal from "@/components/Modal";

import { FaTrashAlt } from "react-icons/fa";
import dayjs from "dayjs";

function AddIncomeModal({ show, onClose }) {
  const amountRef = useRef();
  const descriptionRef = useRef();
  const dateRef = useRef();
  const { income, addIncomeItem, deleteIncomeItem } =
    useContext(FinanceContext);

  const addIncomeHandler = async (e) => {
    e.preventDefault();

    const newIncome = {
      id: Date.now(), // Unique ID for each income entry
      amount: parseFloat(amountRef.current.value), // Convert to number
      description: descriptionRef.current.value,
      date: dateRef.current.value,
    };

    // Directly update the context income
    try {
      await addIncomeItem(newIncome); // Add income asynchronously
      amountRef.current.value = "";
      descriptionRef.current.value = "";
      dateRef.current.value = "";
    } catch (error) {
      console.error(error.message); // Log any error
    }

    onClose();
  };

  const deleteIncomeHandler = (id) => {
    try {
      deleteIncomeItem(id); // Delete income item directly from context
    } catch (error) {
      console.error("Error deleting income item:", error.message);
    }
  };

  useEffect(() => {
    // LocalStorage sync (optional)
    const savedIncome = JSON.parse(localStorage.getItem("incomeList")) || [];
    // You may not need to keep incomeList here since context handles it now
  }, []);

  return (
    <Modal show={show} onClose={onClose}>
      <form onSubmit={addIncomeHandler} className="flex flex-col gap-6">
        <div className="input-group">
          <label
            className="text-lg font-semibold text-offwhite dark:text-offwhite"
            htmlFor="amount"
          >
            Income Amount
          </label>
          <input
            type="number"
            name="amount"
            ref={amountRef}
            min={0.01}
            step={0.01}
            placeholder="Enter income amount"
            required
            className="input-field"
          />
        </div>
        <div className="input-group">
          <label
            className="text-lg font-semibold text-offwhite dark:text-offwhite"
            htmlFor="description"
          >
            Description
          </label>
          <input
            name="description"
            type="text"
            ref={descriptionRef}
            placeholder="Enter income description"
            required
            className="input-field"
          />
        </div>
        <div className="input-group">
          <label
            className="text-lg font-semibold text-offwhite dark:text-offwhite"
            htmlFor="date"
          >
            Date
          </label>
          <input
            type="date"
            name="date"
            ref={dateRef}
            placeholder="Enter income date"
            required
            className="input-field"
          />
        </div>
        <button type="submit" className="btn">
          Add Entry
        </button>
      </form>

      <div className="flex flex-col gap-4 mt-6 max-h-[250px] overflow-y-auto">
        <h3 className="text-xl font-semibold">Income History</h3>
        <div className="space-y-2">
          {income.map((income) => (
            <div
              key={income.id}
              className="p-3 border rounded-lg shadow-sm bg-white dark:bg-slate-800 hover:bg-gray-100 dark:hover:bg-slate-700 transition-all flex justify-between items-center"
            >
              <div>
                <p className="text-sm text-black dark:text-white">
                  <strong>Amount:</strong> {currencyFormatter(income.amount)}
                </p>
                <p className="text-sm text-black dark:text-white">
                  <strong>Description:</strong> {income.description}
                </p>
                <p className="text-sm text-black dark:text-white">
                  <strong>Date:</strong>{" "}
                  {dayjs(income.date).format("DD/MM/YYYY")}
                </p>
              </div>
              <button
                onClick={() => deleteIncomeHandler(income.id)}
                className="text-red-500 hover:text-red-700"
              >
                <FaTrashAlt size={18} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </Modal>
  );
}

export default AddIncomeModal;
