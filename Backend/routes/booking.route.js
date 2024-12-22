import express from "express";
import { Router } from "express";
import { isAuthenticated, restrict } from "../middlewars/Auth.middlewares.js";
import { getCheckoutSession } from "../controllers/booking.controller.js";

// Nested Router
import reviewRouter from "./review.route.js"

const router = Router();

// nested router
router.route('/checkout-session/:doctorId').post(isAuthenticated, getCheckoutSession)


export default router;