import React, { useEffect, useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { TypeAnimation } from "react-type-animation";
import { IoArrowBack } from "react-icons/io5";
import useMobile from "../hooks/useMobile";

const Search = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSearchPage, setIsSearchPage] = useState(false);
  const [isMobile] = useMobile();
  const searchTxet = location.search.slice(3)
  useEffect(() => {
    const isSearch = location.pathname === "/search";
    setIsSearchPage(isSearch);
  }, [location]);

  const redirectToSearchPage = () => {
    navigate("/search");
  };

  const handleOnChange = (e) => {
    const value = e.target.value;
    const urls = `/search?q=${value}`;
    navigate(urls);
    console.log(value);
  };

  return (
    <div className="w-full min-w-[300px] lg:min-w-[420px] h-10 lg:h-12 rounded-lg border overflow flex items-center text-gray-500 group bg-gray-200 focus-within:border-yellow-500">
      <div>
        {isMobile && isSearchPage ? (
          <Link
            to={"/"}
            className="flex items-center h-full p-2 group-focus-within:text-yellow-500"
          >
            <IoArrowBack size={22} />
          </Link>
        ) : (
          <button
            onClick={redirectToSearchPage}
            className="flex items-center h-full p-3 group-focus-within:text-yellow-500 "
          >
            <IoSearchSharp size={22} />
          </button>
        )}
      </div>
      <div
        onClick={redirectToSearchPage}
        className="flex items-center w-full h-full"
      >
        {!isSearchPage ? (
          <TypeAnimation
            className="text-1xl h=full justify-center"
            sequence={[
              'Search "milk"',
              500,
              'Search "bread"',
              500,
              'Search "sugar"',
              500,
              'Search "Paneer"',
              500,
              'Search "Papad"',
              500,
              'Search "Aachar"',
              500,
              'Search "Aam"',
              500,
              'Search "Fruit"',
              500,
            ]}
            wrapper="span"
            speed={50}
            repeat={Infinity}
          />
        ) : (
          <div className="w-full h-full">
            <input
              type="text"
              placeholder=" Serch for Atta,Dal ans more...."
              className="w-full h-full px-0 text-black bg-transparent outline-none"
              autoFocus
              defaultValue={searchTxet}
              onChange={handleOnChange}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;

// <header className={(isSearchPage && isMobile)?("sticky top-0 flex flex-col items-center justify-center h-12 gap-1 lg:h-20 lg:shadow-md"):("sticky top-0 flex flex-col items-center justify-center h-24 gap-1  lg:h-20 lg:shadow-md")}>
// {!(isSearchPage && isMobile) && (
//   <div className="container flex flex-row items-center justify-between px-4 mx-auto">
//     {/* logo */}
//     <div className="h-full">
//       <Link to={"/"} className="flex items-center h-full">
//         <img
//           src={logo}
//           width={220}
//           height={60}
//           alt="logo"
//           className="hidden lg:block"
//         />
//         <img
//           src={logo}
//           width={170}
//           height={50}
//           alt="logo"
//           className="block lg:hidden"
//         />
//       </Link>
//     </div>
//     {/* search */}
//     <div className="hidden lg:block">
//       <Search />
//     </div>
//     {/* login */}
//     <div>
//       <button className="text-neutral-600 lg:hidden">
//         <FaUser size={27} />
//       </button>
//       <div className="flex flex-row content-between gap-20">
//         <p className="hidden px-2 py-4 text-lg lg:block">Login</p>
//         <button className="flex items-center hidden gap-2 px-3 py-3 text-white bg-green-400 rounded lg:block hover:bg-green-800">
//           {/* add to cart */}
//           <div className="animate-bounce">
//           <PiShoppingCartSimpleFill size={32}/>
//           </div>
//           <div className="font-semibold">
//             <p>My Cart</p>
//           </div>
//         </button>
//       </div>

//     </div>
//   </div>
// )}

// <div className="container px-2 mx-auto lg:hidden">
//   <Search />
// </div>
// </header>
