import { createContext, useState, useEffect } from "react";



export const FinanceContext = createContext({
  income: [],
  expenses: [],
  addIncomeItem: () => {},
  deleteIncomeItem: () => {},
  addExpenseItem: () => {},
  deleteExpenseItem: () => {},
});

export default function FinanceContextProvider({ children }) {
  const [incomeList, setIncomeList] = useState([]);
  const [expenses, setExpenses] = useState([]);

  const [categories, setCategories] = useState([]);

  // Function to add a new category
  const addCategory = (newCategory) => {
    setCategories((prevCategories) => [...prevCategories, newCategory]);
  };

  // Add new income item
  const addIncomeItem = (newIncome) => {
    setIncomeList((prevList) => [...prevList, newIncome]);
  };

  // Delete income item by id
  const deleteIncomeItem = (id) => {
    setIncomeList((prevList) => prevList.filter((income) => income.id !== id));
  };

  // Add new expense item
  const addExpenseItem = (newExpense) => {
    setExpenses((prevExpenses) => [...prevExpenses, newExpense]);
  };

  // Delete expense item by id
  const deleteExpenseItem = (id) => {
    setExpenses((prevExpenses) =>
      prevExpenses.filter((expense) => expense.id !== id)
    );
  };

  // Load data from localStorage for both income and expenses
  useEffect(() => {
    try {
      const savedIncome = JSON.parse(localStorage.getItem("incomeList")) || [];
      const savedExpenses = JSON.parse(localStorage.getItem("expenses")) || [];

      setIncomeList(savedIncome);
      setExpenses(savedExpenses);
    } catch (error) {
      console.error("Error loading data from localStorage:", error);
    }
  }, []);

  // Save both income and expenses to localStorage when they change
  useEffect(() => {
    try {
      localStorage.setItem("incomeList", JSON.stringify(incomeList));
      localStorage.setItem("expenses", JSON.stringify(expenses));
    } catch (error) {
      console.error("Error saving data to localStorage:", error);
    }
  }, [incomeList, expenses]);

  const values = {
    income: incomeList,
    expenses,
    addIncomeItem,
    deleteIncomeItem,
    addExpenseItem,
    deleteExpenseItem,
  };

  return (
    <FinanceContext.Provider value={values}>{children}</FinanceContext.Provider>
  );
}
