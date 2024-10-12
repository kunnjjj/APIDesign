import jwt from "jsonwebtoken";

export const createJWT = (user) => {
  const token = jwt.sign(
    { id: user.id, username: user.username },
    process.env.JWT_SECRET
  );

  return token;
};

const updateResponseWhenUnauthorized = ({
  res,
  message = "not authorized",
}) => {
  res.status(401);
  res.json({ message });
};

export const protect = (req, res, next) => {
  const bearer = req.headers.authorization;

  if (!bearer) {
    updateResponseWhenUnauthorized({ res });
    return;
  }

  const [, token] = bearer.split(" "); // "Bearer tokenValue"

  if (!token) {
    updateResponseWhenUnauthorized({ res, message: "not valid token" });
    return;
  }

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user;
    next();
  } catch (e) {
    console.log(e);
    updateResponseWhenUnauthorized({ res, message: "not valid user" });
  }
};
