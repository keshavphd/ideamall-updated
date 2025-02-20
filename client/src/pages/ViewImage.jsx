import { IoClose } from "react-icons/io5";

const ViewImage = ({data,close}) => {
    return(

          <div className="fixed top-0 bottom-0 left-0 right-0 z-20 flex items-center justify-center w-full px-1 py-40 rounded bg-neutral-700 bg-opacity-45">
             <div className="flex flex-col w-full max-w-md max-h-[80vh] p-2 bg-white rounded">
           
                 <button className="block ml-auto text-black w-fit" onClick={close}>
                   <IoClose size={25} />
                 </button>
               
               <img src={data} alt="Image" className="object-contain w-full h-full lg:h-96"/>
               </div>
               </div>
    )
};
export default ViewImage;
