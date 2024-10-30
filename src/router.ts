import { Router } from "express";
import { body, oneOf, check } from "express-validator";

import { handleInputErrors } from "./modules/middewares";
import {
  getProducts,
  createProduct,
  getOneProduct,
  updateProduct,
  deleteProduct,
} from "./handlers/product";
import {
  createUpdate,
  deleteUpdate,
  getOneUpdate,
  getUpdates,
  updateUpdate,
} from "./handlers/update";

const router = Router();

// PRODUCT ROUTES
router.get("/product", getProducts);

router.get("/product/:id", getOneProduct);

const PRODUCT_MIDDLE_WARES = [body("name").isString(), handleInputErrors];

router.put("/product/:id", PRODUCT_MIDDLE_WARES, updateProduct);

router.post("/product", PRODUCT_MIDDLE_WARES, createProduct);

router.delete("/product/:id", deleteProduct);

// UPDATE
router.get("/update", getUpdates);

enum Status {
  IN_PROGRESS = "IN_PROGRESS",
  SHIPPED = "SHIPPED",
  DEPRECATED = "DEPRECATED",
}

const STATUS_VALUES = Object.values({ ...Status });

router.get("/update/:id", getOneUpdate);

const UPDATE_PUT_MIDDLE_WARES = [
  body("title").optional(),
  body("body").optional().isString(),
  body("status").isIn(STATUS_VALUES),
  body("version").optional(),
  body("productId"),
];

router.put("/update/:id", UPDATE_PUT_MIDDLE_WARES, updateUpdate);

const UPDATE_POST_MIDDLE_WARES = [
  body("title").exists().isString(),
  body("body").exists().isString(),
  body("productId"),
];

router.post("/update", UPDATE_POST_MIDDLE_WARES, createUpdate);

router.delete("/update/:id", deleteUpdate);

// UPDATE POINT
router.get("/update-point", () => {});

router.get("/update-point/:id", () => {});

const UPDATE_POINT_PUT_MIDDLE_WARES = [
  body("name").optional().isString(),
  body("description").optional().isString(),
];

router.put("/update-point/:id", UPDATE_POINT_PUT_MIDDLE_WARES, () => {});

const UPDATE_POINT_POST_MIDDLE_WARES = [
  body("name").isString(),
  body("description").isString(),
  body("updateId").exists().isString(),
];

router.post("/update-point", UPDATE_POINT_POST_MIDDLE_WARES, () => {});

router.delete("/update-point/:id", () => {});

export default router;
