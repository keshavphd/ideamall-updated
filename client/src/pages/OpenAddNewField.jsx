import { IoClose } from "react-icons/io5";

const OpenAddNewField = ({ value, onChange, close, submit }) => {

  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 flex flex-col items-center justify-center px-1.5 bg-black bg-opacity-35">
      <div className="flex flex-col w-full max-w-lg gap-1 p-2 pb-4 bg-white rounded">
        <div onClick={close} className="ml-auto">
          <IoClose size={26} />
        </div>
        <div>Enter the name of field :</div>
        <input
          className="p-1.5 border rounded outline-none resize-none bg-blue-50 focus-within:border-orange-400"
          type="text"
          required
          value={value}
          onChange={onChange}
        />


        <div className="mx-auto mt-2 cursor-pointer">
          <div
            onClick={value?submit:close}
            className="inline px-4 py-1.5 rounded border border-orange-400 bg-orange-500"
          >
            Add field
          </div>
        </div>
      </div>
    </div>
  );
};
export default OpenAddNewField;
