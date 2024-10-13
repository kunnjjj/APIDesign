import { Router } from "express";
import { body, oneOf, check } from "express-validator";

import { handleInputErrors } from "./modules/middewares";

const router = Router();

// PRODUCT ROUTES
router.get("/product", (req, res) => {
  res.json({
    message: `/product route called, secret is ${(req as any).mySecret}`,
  });
});

router.get("/product/:id", () => {});

const PRODUCT_MIDDLE_WARES = [body("name").isString(), handleInputErrors];

router.put("/product/:id", PRODUCT_MIDDLE_WARES, (req, res) => {
  res.send("hello");
});

router.post("/product", PRODUCT_MIDDLE_WARES, () => {});

router.delete("/product/:id", () => {});

// UPDATE
router.get("/update", () => {});

enum Status {
  IN_PROGRESS = "IN_PROGRESS",
  SHIPPED = "SHIPPED",
  DEPRECATED = "DEPRECATED",
}

const STATUS_VALUES = Object.values({ ...Status });

const UPDATE_PUT_MIDDLE_WARES = [
  body("title").optional(),
  body("body").optional().isString(),
  body("status").isIn(STATUS_VALUES),
  body("version").optional(),
  body("productId"),
];

router.get("/update/:id", () => {});

router.put("/update/:id", UPDATE_PUT_MIDDLE_WARES, () => {});

const UPDATE_POST_MIDDLE_WARES = [
  body("title").exists().isString(),
  body("body").exists().isString(),
  body("productId"),
];

router.post("/update", UPDATE_POST_MIDDLE_WARES, () => {});

router.delete("/update/:id", () => {});

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
