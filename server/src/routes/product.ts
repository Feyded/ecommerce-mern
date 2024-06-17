import { Router, Request, Response } from "express";
import { ProductModel } from "../models/products";
import { verifyToken } from "./user";
import { UserModel } from "../models/user";
import { ProductErrors, UserErrors } from "../common/errors";

const router = Router();

router.get("/", async (_, res: Response) => {
  try {
    const products = await ProductModel.find({});
    res.json(products);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.post("/checkout", verifyToken, async (req: Request, res: Response) => {
  const { customerId, cartItems } = await req.body;
  try {
    const user = await UserModel.findById(customerId);
    const productIDs = Object.keys(cartItems);
    const products = await ProductModel.find({ _id: { $in: productIDs } });

    if (!user) {
      return res.status(400).json({ type: UserErrors.NO_USER_FOUND });
    }

    if (products.length !== productIDs.length) {
      return res.status(400).json({ type: ProductErrors.NO_PRODUCT_FOUND });
    }

    let totalPrice = 0;
    for (const item in cartItems) {
      const product = products.find((product) => String(product._id) === item);

      if (!product) {
        return res.status(400).json({ type: ProductErrors.NO_PRODUCT_FOUND });
      }

      if (product.stockQuantity < cartItems[item]) {
        return res.status(400).json({ type: ProductErrors.NOT_ENOUGHT_STOCKS });
      }

      totalPrice += product.price * cartItems[item];
    }

    if (user.availableMoney < totalPrice) {
      return res.status(400).json({ type: ProductErrors.NO_AVAILABLE_MONEY });
    }

    user.availableMoney -= totalPrice;
    user.purchaseItems.push(...productIDs);

    await user.save();
    await ProductModel.updateMany(
      { _id: { $in: productIDs } },
      { $inc: { stockQuantity: -1 } }
    );

    res.json({ purchasedItems: user.purchaseItems });
  } catch (error) {
    res.status(400).json(error);
  }
});

router.get("/purchasedItems/:customerID", async (req, res) => {
  const { customerID } = req.params;

  try {
    const user = await UserModel.findById(customerID);
    if (!user) {
      return res.status(400).json({ type: UserErrors.NO_USER_FOUND });
    }

    const products = await ProductModel.find({
      _id: { $in: user.purchaseItems },
    });

    res.json({ purchasedItems: products });
  } catch (err) {
    res.status(500).json({ type: err });
  }
});

export { router as ProductRouter };
