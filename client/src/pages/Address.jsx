import React, { useState } from "react";
import { useSelector } from "react-redux";
import DeleteAddress from "./DeleteAddress";
import EditAddress from "./EditAddress";
import AddNewAddress from "./AddNewAddress";

const Address = () => {
  const [editAddress, setEditAddress] = useState(false);
  const [editAddressData, setEditAddressData] = useState({});
  const [deleteAddress, setDeleteAddress] = useState(false);
  const [openAddress, setOpenAddress] = useState(false);
  const allAddress = useSelector((state) => state?.address?.toalAddress);
  // console.log(allAddress);

  return (
    <div className="overflow-auto h-fit">
      <div className="flex flex-row items-center justify-between gap-6 px-3 py-2 mb-1 shadow-md">
        <div className="font-mono text-2xl">Address</div>
        <div
              onClick={() => setOpenAddress(true)}
              className="flex items-center justify-center px-2 py-2 bg-orange-200 border-current rounded cursor-pointer w-fit hover:text-white hover:bg-orange-400"
            >
              {allAddress?.length !== 0 ? "+Add More Addresses" : "+Add Address"}
            </div>
        </div>
      
      <div className="flex flex-col gap-2">
        {allAddress?.map((a, indes) => {
          return (
            <div
              className="flex justify-between gap-2 bg-orange-50"
              key={indes + "addresss"}
            >
              <div className="flex flex-row items-center gap-2 p-2">
                <div className="">{indes + 1}.</div>
                <div>
                  <p>{a?.addresses}</p>
                  <p>{a?.city}</p>
                  <p>{a?.state}</p>
                  <p>{a?.mobile}</p>
                  <p>
                    {a?.contry}-{a?.pincode}
                  </p>
                </div>
              </div>
              <div className="flex flex-col justify-center gap-2 mr-4">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setEditAddress(true);
                    setEditAddressData(a);
                  }}
                  className="w-20 p-2 bg-green-500 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setDeleteAddress(true);
                    setEditAddressData(a?._id);
                  }}
                  className="w-20 p-2 bg-red-500 rounded text-neutral-50"
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}

        {editAddress && (
          <EditAddress
            close={() => setEditAddress(false)}
            values={editAddressData}
          />
        )}
        {deleteAddress && (
          <DeleteAddress
            close={() => setDeleteAddress(false)}
            value={editAddressData}
          />
        )}
        {openAddress && <AddNewAddress close={() => setOpenAddress(false)} />}
      </div>
    </div>
  );
};

export default Address;
