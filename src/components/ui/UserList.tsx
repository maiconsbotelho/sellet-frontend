"use client";

import React from "react";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";

interface Item {
  id: string;
  name: string;
  email: string;
  phone?: string;
}

interface ListProps {
  title: string;
  items: Item[];
  onAdd: () => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const UserList: React.FC<ListProps> = ({ title, items, onAdd, onEdit, onDelete }) => {
  return (
    <div className="w-full h-full mx-auto p-4 bg-white ">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">{title}</h1>
        <button
          onClick={onAdd}
          className="bg-green-500 text-white p-2 rounded-md flex items-center gap-2 hover:bg-green-600"
        >
          <FaPlus /> Adicionar
        </button>
      </div>
      <ul className="divide-y divide-gray-200">
        {items.map((item) => (
          <li
            key={item.id}
            className="p-4 flex flex-col items-start gap-2 sm:flex-row sm:justify-between sm:items-center"
          >
            <div className="flex justify-between w-full">
              <div>
                <span className="font-medium text-gray-700">{item.name}</span>
                <span className="block text-gray-500">{item.email}</span>
                <span className="block text-gray-400">{item.phone}</span>
              </div>
              <div className="flex gap-3">
                <button onClick={() => onEdit(item.id)} className="text-blue-500 hover:text-blue-700">
                  <FaEdit />
                </button>
                <button onClick={() => onDelete(item.id)} className="text-red-500 hover:text-red-700">
                  <FaTrash />
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
