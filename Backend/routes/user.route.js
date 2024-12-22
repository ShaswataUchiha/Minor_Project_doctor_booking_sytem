import express from "express";
import { Router } from "express";

import { isAuthenticated, restrict } from "../middlewars/Auth.middlewares.js";

import { 
    updateUser,
    getSingleUser,
    getAllUsers,
    deleteUser,
    getUserProfile,
    getMyApponments
} from "../controllers/user.controller.js";

const router = Router();

router.route("/getSingleUser/:id").get(isAuthenticated, restrict(['patient']), getSingleUser)
router.route("/getAllUsers").get(isAuthenticated, restrict(['admin']), getAllUsers)
router.route("/updateUser/:id").put(isAuthenticated, restrict(['patient']), updateUser)
router.route("/deleteUser/:id").delete(isAuthenticated, restrict(['patient']), deleteUser)
router.route("/profile/me").get(isAuthenticated, restrict(['patient']), getUserProfile)
router.route("/appoinments/my-appointments").get(isAuthenticated, restrict(['patient']), getMyApponments)


export default router;