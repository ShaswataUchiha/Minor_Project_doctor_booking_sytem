import {Router} from "express"
import { 
    getAllReviews,
    createReview 
} from "../controllers/review.controller.js"
import { isAuthenticated, restrict } from "../middlewars/Auth.middlewares.js"

const router = Router({mergeParams : true})

router
    .route("/")
    .get(getAllReviews)
    .post(isAuthenticated, restrict(['patient']), createReview)

export default router