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

const STATUS_VALIDATION_CHAIN = Object.values({ ...Status }).map((status) =>
  check("status").equals(status)
);

const UPDATE_PUT_MIDDLE_WARES = [
  body("title").optional(),
  body("body").optional().isString(),
  oneOf(STATUS_VALIDATION_CHAIN),
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

router.put("/update-point/:id", () => {});

router.post("/update-point", () => {});

router.delete("/update-point/:id", () => {});

export default router;
