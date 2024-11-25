import { useContext, useState, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import { FinanceContext } from "@/store/finance-context";
import Modal from "@/components/Modal";

function AddExpensesModal({ show, onClose }) {
  const [expenseAmount, setExpenseAmount] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showAddExpense, setShowAddExpense] = useState(false);

  const { expenses, addExpenseItem } = useContext(FinanceContext);

  const titleRef = useRef();
  const colorRef = useRef();

  const addExpenseItemHandler = () => {
    if (!selectedCategory) {
      alert("Please select a category first.");
      return;
    }

    const expense = expenses.find((e) => e.id === selectedCategory);

    if (!expense) return;

    if (!expenseAmount || Number(expenseAmount) <= 0) {
      alert("Please enter a valid amount.");
      return;
    }

    const newExpense = {
      color: expense.color,
      title: expense.title,
      total: expense.total + Number(expenseAmount),
      items: [
        ...expense.items,
        {
          amount: Number(expenseAmount),
          createdAt: new Date(),
          id: uuidv4(),
        },
      ],
    };

    addExpenseItem(newExpense);
    setExpenseAmount("");
    setSelectedCategory(null);
    onClose();
  };

  const addCategoryHandler = () => {
    const title = titleRef.current.value;
    const color = colorRef.current.value;

    // Check if title and color are provided
    if (!title || !color) {
      alert("Please fill in both the title and color for the new category.");
      return;
    }

    try {
      // Create a new category object
      const newCategory = {
        id: uuidv4(), // Generate a unique ID for the category
        title, // Category title from input
        color, // Category color from input
        total: 0, // Initialize total to 0
        items: [], // Initialize an empty array for items
      };

      // Call the addCategory function from context to update state
      addCategory(newCategory); // Assuming addCategory is passed through context

      // Optionally show a success message
      alert("Category added successfully!");

      // Clear input fields after category is added
      titleRef.current.value = "";
      colorRef.current.value = "#000000"; // Reset color input to default
    } catch (error) {
      // Handle any errors that might occur
      console.error("Error adding category:", error);
      alert("An error occurred while adding the category. Please try again.");
    }
  };
  return (
    <Modal show={show} onClose={onClose}>
      <div className="flex flex-col gap-4">
        <label className="text-white text-2xl">Enter an amount...</label>

        <input
          type="number"
          min={0.01}
          step={0.01}
          placeholder="Enter expense amount"
          value={expenseAmount}
          onChange={(e) => setExpenseAmount(e.target.value)}
          className="px-4 py-2 rounded bg-gray-200 focus:outline-none"
        />
      </div>

      {Number(expenseAmount) > 0 && (
        <div className="flex flex-col gap-4 mt-6">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl capitalize text-white">
              Select Expense Category
            </h3>
            <button
              onClick={() => {
                setShowAddExpense(true);
              }}
              className="text-red-500 hover:underline"
            >
              + New Category
            </button>
          </div>

          {showAddExpense && (
            <div className="flex items-center gap-4 mt-6">
              <input type="text" placeholder="Enter Title" ref={titleRef} />
              <label> Pick Color</label>
              <input type="color" className="w-24 h-10" ref={colorRef} />
              <button onClick={addCategoryHandler} className="btn btn-primary">
                Create
              </button>
              <button
                onClick={() => {
                  setShowAddExpense(false);
                }}
                className="btn btn-danger"
              >
                Cancel
              </button>
            </div>
          )}

          {/* Iterate over the expenses list */}
          {expenses.map((expense) => (
            <button
              key={expense.id}
              onClick={() => setSelectedCategory(expense.id)}
              className="w-full"
            >
              <div
                style={{
                  boxShadow:
                    expense.id === selectedCategory
                      ? "0 4px 8px rgba(0, 0, 0, 0.3)"
                      : "none",
                }}
                className={`flex items-center justify-between px-4 py-4 bg-slate-700 rounded-3xl transition-transform ${
                  expense.id === selectedCategory ? "scale-105" : ""
                }`}
              >
                <div className="flex items-center gap-2">
                  <div
                    className="w-[25px] h-[25px] rounded-full"
                    style={{ background: expense.color }}
                  ></div>
                  <h4 className="capitalize text-white">{expense.title}</h4>
                </div>
              </div>
            </button>
          ))}
        </div>
      )}

      {Number(expenseAmount) > 0 && selectedCategory && (
        <div className="mt-6">
          <button
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
            onClick={addExpenseItemHandler}
          >
            Add Expense
          </button>
        </div>
      )}
    </Modal>
  );
}

export default AddExpensesModal;
