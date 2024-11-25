import React from "react";

function ExpenseCategoryItem({ category, isSelected, onSelect }) {
  return (
    <button
      onClick={() => onSelect(category.id)}
      className="w-full focus:outline-none"
    >
      <div
        className={`flex items-center justify-between px-4 py-4 bg-slate-700 rounded-3xl transition-transform duration-200 ${
          isSelected ? "scale-105 ring-2 ring-blue-500" : ""
        }`}
      >
        <div className="flex items-center gap-2">
          <div
            className="w-[25px] h-[25px] rounded-full"
            style={{ background: category.color }}
          ></div>
          <h4 className="capitalize text-white">{category.title}</h4>
        </div>
        <div className="text-white font-medium">
          {category.total ? `$${category.total.toFixed(2)}` : "$0.00"}
        </div>
      </div>
    </button>
  );
}

export default ExpenseCategoryItem;
