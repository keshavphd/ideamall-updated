// import { v2 as cloudinary } from "cloudinary";

// cloudinary.config({
//   cloud_name: "dorsdhmvy",
//   api_key: "631843583524484",
//   api_secret: process.env.CLOUDINARY_API,
// });

// const uploadImageCloudinary = async (image) => {
//   const buffer = image?.buffer || Buffer.from(await image.arrayBuffer());

//   const uploadImage = await new Promise((resolve, reject) => {
//     cloudinary.uploader
//       .upload_stream({ folder: "IdeaMall" }, (error, uploadResult) => {

//         return resolve(uploadResult);
//       }).end(buffer);
//   });
//   return uploadImage;
// };

// export default uploadImageCloudinary;
import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv"
dotenv.config();

cloudinary.config({
  cloud_name: "dorsdhmvy",
  api_key: "631843583524484",
  api_secret: process.env.CLOUDINARY_APISECRETKEY,
});
const uploadImageCloudinary = async (image) => {
  try {
    const buffer = image?.buffer || Buffer.from(await image.arrayBuffer());

    const uploadImage = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({ folder: "ideaMall" }, (error, uploadResult) => {
          return resolve(uploadResult);
        })
        .end(buffer);
    });
    return uploadImage;
  } catch (error) {
    throw new Error(error)
  }
};

export default uploadImageCloudinary;
