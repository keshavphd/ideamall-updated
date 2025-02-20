import React, { useState } from "react";
import { GrEdit } from "react-icons/gr";
import { MdDelete } from "react-icons/md";

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import EditSubCategory from "./EditSubCategory";
import DeleteSubCategory from "./DeleteSubCategory";

const DisplaySubCategory = ({ data, column ,fetchData }) => {
  const [editSubCategory, setEditSubCategory] = useState(false);
  const [deleteSubCategory, setDeleteSubCategory] = useState(false);
  const [value, setValue] = useState();
  const table = useReactTable({
    data,
    columns: column,
    getCoreRowModel: getCoreRowModel(),
  });

  const handleEdit = (value) => {
    setValue(value.original);
    setEditSubCategory(true);
  };

  const handleDelete = (value) => {
    setValue(value.original);
    setDeleteSubCategory(true);
  };
// console.log("fect",fetchData);

  return (
    <div className="w-full p-2 overflow-auto">
      
      <table className="w-full">
        <thead className="py-3 text-white bg-black">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              <th>Serial No.</th>
              {headerGroup.headers.map((header) => (
                <th key={header.id} className="border">
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row, index) => (
            <tr key={row.id}>
              <td className="px-2 text-center border">{index + 1}</td>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="items-center px-2 border">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
              <td className="px-2 border w-7 h-7">
                <div
                  onClick={() => handleEdit(row)}
                  className="p-2 bg-green-200 cursor-pointer hover:bg-green-500 rounded-3xl"
                >
                  <GrEdit />
                </div>
              </td>
              <td className="px-2 border w-7 h-7">
                <div
                  onClick={() => handleDelete(row)}
                  className="p-2 bg-red-200 cursor-pointer hover:bg-red-500 rounded-3xl"
                >
                  <MdDelete />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {editSubCategory && (
        <EditSubCategory datas={value} fetchData={fetchData} close={() => setEditSubCategory(false)} />
      )}
      {deleteSubCategory && (<DeleteSubCategory fetchData={fetchData} datas={value} close={() => setDeleteSubCategory(false)}/>)}
      <div className="h-4" />
    </div>
  );
};

export default DisplaySubCategory;
