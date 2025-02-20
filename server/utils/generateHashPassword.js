import bcrypt from "bcryptjs";
const generateHashPassword = async (password) => {
  const saltRound = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, saltRound);
  return hashPassword;
};
export default generateHashPassword;
