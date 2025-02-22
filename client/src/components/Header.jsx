import React, { useEffect, useState } from "react";
import logo from "../assets/logos.png";
import Search from "./Search";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import useMobile from "../hooks/useMobile";
import { PiShoppingCartSimpleFill } from "react-icons/pi";
import { useSelector } from "react-redux";
import { VscTriangleDown, VscTriangleUp } from "react-icons/vsc";
import UserMenu from "../pages/UserMenu";
import UserProfilePhotoEdit from "../pages/UserProfilePhotoEdit";
import DisplayPriceinRuppee from "../pages/DisplayPriceinRuppee";
import { useGlobalContext } from "../provider/GlobalProvider";
import DisplayCart from "../pages/DisplayCart";

const Header = () => {
  const [isMobile] = useMobile();
  const location = useLocation();
  const [content, showContent] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const displayContent = () => {
    showContent((prev) => !prev);
  };
  const cartItems = useSelector((state) => state?.cart.cart);
  // console.log("cart",cartItems);
  const { totalPrice, totalQuantity } = useGlobalContext();
  const navigate = useNavigate();

  const user = useSelector((state) => state?.user);

  const handleLogin = () => {
    if (!user._id) {
      navigate("/login");
    }
    if (user._id) {
      navigate("/mobile-user-menu");
    }
  };
  const handlePicture = () => {
    navigate("/dashboard/profile");
  };

  const isSearchPage = location.pathname === "/search";

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (e.target.closest(".sidebar")) {
        showContent(false);
      }
    };

    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [content]);

  // useEffect(()=>{
  //  const quantity = cartItems.reduce((prev,curr)=>{
  //      return prev+curr.quantity
  //  },0);
  // //  console.log("hiwer",quantity);
  //  setTotalQuantity(quantity)

  //  const totalprice = cartItems.reduce((prev,curr)=>{
  //      return prev + (curr.productId.price*curr.quantity)
  //  },0)
  // //  console.log(totalPrice);
  // setTotalPrice(totalprice)
  // },[cartItems])

  return (
    <>
      <header
        className={
          isSearchPage && isMobile
            ? "sticky top-0 z-20 flex flex-col justify-center w-full h-12 p-1 bg-orange-300 "
            : "sticky top-0 flex z-20 flex-col justify-center w-full h-20 gap-1 px-2 bg-orange-300 lg:px-5 lg:items-center"
        }
      >
        {!(isSearchPage && isMobile) && (
          <div className="container flex flex-row items-center justify-between ">
            <Link to="/">
              <img
                src={logo}
                alt="Company Image"
                height={40}
                width={200}
                className="hidden lg:block"
              />
              <img
                src={logo}
                alt="Company Image"
                height={40}
                width={160}
                className="block lg:hidden"
              />
            </Link>

            <div className="hidden lg:block">
              <Search />
            </div>
            <div className="flex flex-row items-center justify-center h-full gap-2">
              <div className="hidden h-full lg:block">
                {user._id ? (
                  <div className="flex items-center content-center justify-center h-full gap-1">
                    <button
                      onClick={displayContent}
                      className="text-xl font-semibold "
                    >
                      Account{" "}
                    </button>
                    <div onClick={displayContent} className="mt-1">
                      {content ? <VscTriangleUp /> : <VscTriangleDown />}
                    </div>
                    <div onClick={handlePicture}>
                      <img
                        src={user.avatar}
                        className="hidden pl-1 rounded-full size-10 lg:block"
                        alt="image"
                        sizes="cover"
                        width={30}
                        height={30}
                      />
                    </div>
                    {/* UserProfilePhotoEdit */}
                    {content && (
                      <div className="absolute z-30 sidebar top-16 right-40">
                        <div className="z-30 p-4 mt-0 bg-white rounded min-w-52 lg:shadow">
                          <UserMenu />
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    to="login"
                    className="flex flex-row items-center justify-center h-full gap-6 text-xl font-semibold pl-15"
                  >
                    Login
                  </Link>
                )}
              </div>
              <button onClick={handleLogin}>
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    className="rounded-full lg:hidden"
                    alt="image"
                    width="20px"
                    height="20px"
                  />
                ) : (
                  <FaUser size={26} className="block lg:hidden" />
                )}
              </button>

              <div className="hidden lg:block">
                <button
                  onClick={() => setCartOpen(true)}
                  className="flex flex-row gap-1 p-2 text-white bg-green-500 rounded-xl"
                >
                  <div className="animate-pulse">
                    <PiShoppingCartSimpleFill size={29} />
                  </div>
                  <div>
                    <div className="font-semibold">
                      {cartItems[0] ? (
                        <div>
                          <p>{totalQuantity} Items</p>
                          <p className="text-xs">
                            {DisplayPriceinRuppee(totalPrice)}
                          </p>
                        </div>
                      ) : (
                        <p>My Cart</p>
                      )}
                    </div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        )}
        <div className="block lg:hidden">
          <Search />
        </div>
        {cartOpen && <DisplayCart close={()=>setCartOpen(false)} />}
      </header>
    </>
  );
};

export default Header;
