import { prisma } from "../config/db.js";
import { generateToken } from "../utils/generateToken.js";
import bcrypt from "bcryptjs";
const register = async (req, res) => {
  const body = req.body;
  const { name, email, password } = body;

  //check if user exists
  const userExists = await prisma.user.findUnique({
    where: { email: email },
  });

  if (userExists) {
    return res
      .status(400)
      .json({ error: "User already exist with this email" });
  }

  //hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPass = await bcrypt.hash(password, salt);

  //create user

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPass,
    },
  });

  //generate JWT
  const token = generateToken(user.id, res);

  res.status(201).json({
    status: "success",
    data: {
      user: {
        id: user.id,
        name: name,
        email: email,
      },
      token,
    },
  });
};

const login = async (req, res) => {
  const body = req.body;
  const { email, password } = body;

  //check if user email exists in the db
  const user = await prisma.user.findUnique({
    where: { email: email },
  });

  if (!user) {
    return res.status(401).json({ error: "Invalid Email or Password" });
  }

  //verify pass

  const isPassValid = await bcrypt.compare(password, user.password);
  if (!isPassValid) {
    return res.status(401).json({ error: "Invalid Email or Password" });
  }

  //generate JWT
  const token = generateToken(user.id, res);

  res.status(201).json({
    status: "success",
    data: {
      user: {
        id: user.id,
        email: email,
      },
      token,
    },
  });
};

export { register, login };
