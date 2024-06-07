import { Router, Request, Response } from "express";
import { UserModel } from "../models/user";
import { UserErrors } from "../common/errors";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
const router = Router();

router.post("/register", async (req: Request, res: Response) => {
  try {
    const { username, password } = await req.body;

    const user = await UserModel.findOne({ username });

    if (user) {
      res.status(400).json({ type: UserErrors.USERNAME_ALREADY_EXISTS });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new UserModel({ username, password: hashedPassword });
    await newUser.save();

    res.json({ message: "User register Success" });
  } catch (error) {
    res.status(500).json({ type: error });
  }
});

const verifyToken = (req: Request, res: Response, next: Function) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    jwt.verify(
      authHeader,
      "pibmCsewAeh8+QjmSq8mCsm196IETBoulhdN5JM270o=",
      (err) => {
        if (err) {
          return res.sendStatus(403);
        }

        next();
      }
    );
  }

  res.sendStatus(401);
};

router.post("/login", async (req: Request, res: Response) => {
  try {
    const { username, password } = await req.body;

    const user = await UserModel.findOne({ username });

    if (!user) {
      return res.json(UserErrors.NO_USER_FOUND);
    }

    const passwordMatch = await bcrypt.compare(password, user?.password);

    if (!passwordMatch) {
      return res.json(UserErrors.WRONG_CREDENTIALS);
    }

    const token = jwt.sign(
      {
        id: user._id,
      },
      "pibmCsewAeh8+QjmSq8mCsm196IETBoulhdN5JM270o="
    );

    res.json({ token: token, userID: user._id });
  } catch (error) {
    res.json({ type: error });
  }
});

export { router as UserRouter };
