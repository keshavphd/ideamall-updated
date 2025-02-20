import axios from "axios";

const baseURL = import.meta.env.VITE_API_URL;

export const Axios = axios.create({
  baseURL: baseURL,
  withCredentials: true,
});

export const getUserDetails = () => {
  return Axios.get("/api/auth/user-detail");
};

export const logoutUser = () => {
  return Axios.get("/api/auth/logout-user");
};

export const getCategoryDetails = () => {
  return Axios.get("api/category/category-detail");
};
export const getSubCategoryDetails = () => {
  return Axios.get("api/subcategory/subcategory-detail");
};
// export const userRegister = ({ data }) => {
//   return Axios.post("/api/auth/register-user", { data });
// };
const SummaryAPI = {
  register: {
    url: "/api/auth/register-user",
    method: "post",
  },
  
  login: {
    url: "/api/auth/login-user",
    method: "post",
  },
  forgotPassword: {
    url: "/api/auth/forgot-password",
    method: "put",
  },
  verifyOtp: {
    url: "/api/auth/verify-otp",
    method: "put",
  },
  updatePassword: {
    url: "/api/auth/reset-password",
    method: "put",
  },
  refreshToken: {
    url: "/api/auth/",
    method: "",
  },
  uploadImage: {
    url: "api/auth/upload-avatar",
    method: "put",
  },
  updateProfile: {
    url: "api/auth/update-user",
    method: "put",
  },
  addCategory: {
    url: "api/category/add-category",
    method: "post",
  },
  uploadCategoryImage: {
    url: "/api/category/add-category-image",
    method: "post",
  },
  deleteCategory: {
    url: "/api/category/delete-category",
    method: "delete",
  },
  updateCategory: {
    url: "/api/category/update-category",
    method: "patch",
  },
  uploadSubCategoryImage: {
    url: "/api/subcategory/add-subcategory-image",
    method: "post",
  },
  addSubCategory: {
    url: "api/subcategory/add-subcategory",
    method: "post",
  },
  deleteSubCategory: {
    url: "/api/subcategory/delete-subcategory",
    method: "delete",
  },
  updateSubCategory: {
    url: "/api/subcategory/update-subcategory",
    method: "put",
  },
  uploadProductImage: {
    url: "/api/product/add-product-image",
    method: "post",
  },
  addProduct: {
    url: "/api/product/add-product",
    method: "post",
  },
  getProductControl: {
    url: "/api/product/get-product-control",
    method: "post",
  },
  getProductbyCategory: {
    url: "/api/product/get-product-by-category",
    method: "post",
  },
  getProductbyCategoryandSubCategory: {
    url: "/api/product/get-product-by-category-and-subcategory",
    method: "post",
  },
  getAllRelatedSubCategory: {
    url: "/api/subcategory/get-all-related-subcategory",
    method: "post",
  },
  getProductDetails: {
    url: "/api/product/get-product-details",
    method: "post",
  },
  updateProductDetails: {
    url: "/api/product/update-product-details",
    method: "put",
  },
  deleteProductDetails: {
    url: "/api/product/delete-product-details",
    method: "delete",
  },
  searchProduct: {
    url: "/api/product/search-products",
    method: "post",
  },
  addToCart: {
    url: "/api/cart/create",
    method: "post",
  },
  getCartItem: {
    url: "/api/cart/get",
    method: "get",
  },
  updateCartQuantity: {
    url: "/api/cart//update-quantity",
    method: "put",
  },
  deleteCartQuantity: {
    url: "/api/cart/delete-quantity",
    method: "delete",
  },
  addAddress: {
    url: "/api/address/add-address",
    method: "post",
  },
  getAddress:{
    url:"/api/address/get-address",
    method:"get"
  },
  updateAddress:{
    url:"/api/address/update-address",
    method:"put"
  },
  deleteAddress:{
    url:"/api/address/delete-address",
    method:"delete"
  },
  coderCod:{
    url:"/api/order/cod",
    method:"post"
  },
  paymentUrl:{
    url:"/api/order/checkout",
    method:"post"
  },
  getOrdersDetails:{
    url:"/api/order/order-lists",
    method:"get"
  }
};

//sesnding access token in header
Axios.interceptors.request.use(
  async (config) => {
    const accessToken = localStorage.getItem("accessToken");
    
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

//refresh Token
//extend the life span of accessToken with the help of refreshToken
Axios.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    let originRequest = error.config;

    if (error.response.status === 401 && !originRequest.retry) {
      originRequest.retry = true;

      const refreshToken = localStorage.getItem("refreshToken");
      
      if (refreshToken) {
        const newAccessToken = await refreshAccessToken(refreshToken);
        if (newAccessToken) {
          originRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return Axios(originRequest);
        }
      }
    }
    return Promise.reject(error);
  }
);

const refreshAccessToken = async (refreshToken) => {
  try {
    const response = await Axios({
      ...SummaryAPI.refreshToken,
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
    });
    // console.log("data", response);

    const accessToken = response.data.data.accessToken;

    localStorage.setItem("accessToken", accessToken);
    return accessToken;
  } catch (error) {
    console.log(error);
  }
};

export default SummaryAPI;
