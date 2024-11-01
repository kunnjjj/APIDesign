import { ErrorType } from "../constants";
import prisma from "../db";
import {
  comparePasswords,
  createJWT,
  hashPassword,
  updateResponseWhenUnauthorized,
} from "../modules/auth";

export const createNewUser = async (req, res, next) => {
  try {
    const user = await prisma.user.create({
      data: {
        username: req.body.username,
        password: await hashPassword(req.body.password),
      },
    });

    const token = createJWT(user);
    res.json({ token });
  } catch (e) {
    e.type = ErrorType.INPUT;
    next(e);
  }
};

export const signIn = async (req, res) => {
  const user = await prisma.user.findUnique({
    where: {
      username: req.body.username,
    },
  });

  const isValid = await comparePasswords(req.body.password, user.password);

  if (!isValid) {
    updateResponseWhenUnauthorized({
      res,
      message: "username or password is incorrect",
    });
    return;
  }

  const token = createJWT(user);
  res.json({ token });
};
