import React from "react";

const Loadingcard = () => {
  return(
<div className="grid gap-3 p-4 border max-w-32 lg:max-w-52 animate-pulse">
    <div className="rounded min-h-14 lg:min-h-20 bg-orange-50">
        
    </div>
    <div className="w-20 p-2 rounded lg:p-3 bg-orange-50"></div>
    <div className="p-2 rounded lg:p-3 bg-orange-50"></div>
    <div className="p-2 lg:p-3 bg-orange-50 w-14"></div>
    <div className="flex items-center justify-between gap-3">
        <div className="w-20 p-2 rounded lg:p-3 bg-orange-50"></div>
        <div className="w-20 p-2 rounded lg:p-3 bg-orange-50"></div>
    </div>
  </div>
  ) 
};

export default Loadingcard;
