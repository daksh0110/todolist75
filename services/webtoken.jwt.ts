import jwt from "jsonwebtoken";

export const generateToken = async (
  name: string,
  email: string
): Promise<string> => {
  const jwtSecretKey = process.env.JWT_SECRET_KEY;
  if (!jwtSecretKey) {
    throw new Error(
      "JWT_SECRET_KEY is not defined in the environment variables"
    );
  }
  try {
    let data = {
      name: name,
      email: email,
    };
    const token = await jwt.sign(data, jwtSecretKey, { expiresIn: "10d" });
    console.log(token);
    return token;
  } catch (e) {
    throw new Error("unable to generate token");
  }
};
