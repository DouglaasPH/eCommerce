import { Router } from "express";
import loginController from "./app/controllers/login-controller.js";
import shopController from "./app/controllers/shop-controller.js";

const router = Router();

// ROUTES TO LOGIN/ACCOUNT
router.post("/createAccount", loginController.createAccount);
router.get("/login", loginController.login);
router.put("/updatePassword", loginController.newPassword);
router.get("/validateEmail", loginController.checkEmail);


// QUERY COOKIES WITH httpOnly = true
router.get('/queryCookieUserToken', loginController.checkUserToken);




// SHOPPING ROUTES
router.get('/getDatasForProductGrid', shopController.productGrid);
router.get('/getDatasForProductGridWithFilters', shopController.productGridWithFilters);
router.get('/getAllFilters', shopController.allFilters);
router.get('/getAllFilterOptions', shopController.FilterOptions);
router.get('/getTotalNumberOfPages', shopController.totalPages);
router.get('/getFiltersWithSelectedFilters', shopController.FiltersWithSelectedFilters);


export default router;