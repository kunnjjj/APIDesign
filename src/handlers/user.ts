import prisma from "../db";
import {
  comparePasswords,
  createJWT,
  hashPassword,
  updateResponseWhenUnauthorized,
} from "../modules/auth";

const createNewUser = async (req, res) => {
  const user = await prisma.user.create({
    data: {
      username: req.body.username,
      password: await hashPassword(req.body.password),
    },
  });

  const token = createJWT(user);
  res.json({ token });
};

const signIn = async (req, res) => {
  const user = await prisma.user.findUnique({
    where: {
      username: req.body.username,
    },
  });

  const isValid = await comparePasswords(req.body.password, user.password);

  if (!isValid) {
    updateResponseWhenUnauthorized({
      res,
      message: "username or password does not match",
    });
    return;
  }

  const token = createJWT(user);
  res.json({ token });
};
