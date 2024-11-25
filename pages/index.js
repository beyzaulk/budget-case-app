"use client";
import { useState, useContext, useEffect } from "react";

import { FinanceContext } from "@/store/finance-context";
import { currencyFormatter } from "@/lib/utils";
import AddIncomeModal from "@/components/modals/AddIncomeModal";
import AddExpensesModal from "@/components/modals/AddExpensesModal";
import ExpenseCategoryitem from "@/components/ExpenseCategoryItem";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Home() {
  const { income, addIncomeItem } = useContext(FinanceContext);
  const [showAddIncomeModal, setShowAddIncomeModal] = useState(false);
  const [showAddExpensesModal, setShowAddExpensesModal] = useState(false);

  const { expenses } = useContext(FinanceContext);
  const [totalBalance, setTotalBalance] = useState(0);

  // Calculate the total balance dynamically by summing all income amounts

  useEffect(() => {
    // Toplam geliri hesapla
    const totalIncome = income.reduce(
      (acc, incomeItem) => acc + incomeItem.amount,
      0
    );

    // Toplam gideri hesapla
    const totalExpenses = expenses.reduce(
      (acc, expenseItem) => acc + expenseItem.total,
      0
    );

    // Net bakiye hesapla (gelir - gider)
    const netBalance = totalIncome - totalExpenses;

    // Net bakiyeyi state'e kaydet
    setTotalBalance(netBalance);
  }, [income, expenses]);
  return (
    <>
      {/* Add Income Modal */}
      <AddIncomeModal
        show={showAddIncomeModal}
        onClose={() => setShowAddIncomeModal(false)}
        onAddIncome={addIncomeItem}
      />

      {/* Add Expenses Modal */}
      <AddExpensesModal
        show={showAddExpensesModal}
        onClose={() => setShowAddExpensesModal(false)} // Modal'ı kapatmak için state'i false yapıyoruz
      />

      <main className="container max-w-2xl px-6 mx-auto">
        <section className="py-3">
          <small className="text-gray-400 text-md">My Balance</small>
          <h2 className="text-4xl font-bold ">
            {currencyFormatter(totalBalance)}
          </h2>
        </section>

        <section className="flex items-center gap-2 py-3 ">
          <button
            onClick={() => {
              setShowAddExpensesModal(true);
            }}
            className="btn btn-primary"
          >
            + Expenses
          </button>
          <button
            onClick={() => {
              setShowAddIncomeModal(true);
            }}
            className="btn btn-primary-outline"
          >
            + Income
          </button>
        </section>

        {/* Expenses */}
        <section className="py-6">
          <h3 className="text-2xl">My Expenses</h3>
          <div className="flex flex-col gap-4 mt-6">
            {expenses.map((expense) => {
              return (
                <ExpenseCategoryitem
                  key={expense.id}
                  color={expense.color}
                  title={expense.title}
                  total={expense.total}
                />
              );
            })}
          </div>
        </section>

        {/* Chart Section */}
        <section className="py-6">
          <h3 className="text-2xl">Stats</h3>
          <div className="w-1/2 mx-auto">
            <Doughnut
              data={{
                labels: expenses.map((expense) => expense.title),
                datasets: [
                  {
                    label: "Expenses",
                    data: expenses.map((expense) => expense.total),
                    backgroundColor: expenses.map((expense) => expense.color),
                    bolderColor: ["#18181b"],
                    borderWidth: 2,
                  },
                ],
              }}
            />
          </div>
        </section>
      </main>
    </>
  );
}
