import express from "express"
import { Router } from "express";
import { createProduct } from "../controllers/productController.js"

const router = new Router()

router.post("/product", createProduct)

export default router
