import { Router } from "express";
import loginController from "./app/controllers/login-controller.js";
import shopController from "./app/controllers/shop-controller.js";
import shoppingCartController from "./app/controllers/shopping-cart-controller.js";

const router = Router();

// ROUTES ABOUT LOGIN AND ACCOUNT
router.post("/createAccount", loginController.createAccount);
router.get("/login", loginController.login);
router.put("/updatePassword", loginController.updatePassword);
router.get("/validateEmail", loginController.validateEmail);


// QUERY COOKIES WITH httpOnly = true
router.get('/queryCookieUserToken', loginController.checkUserToken);


// ROUTES ABOUT SHOPPING AND PRODUCT PAGE
router.get('/getDatasForProductGrid', shopController.getDatasForProductGrid);
router.get('/getDatasForProductGridWithFilters', shopController.getDatasForProductGridWithFilters);
router.get('/getAllFilters', shopController.getAllFilters);
router.get('/getAllFilterOptions', shopController.getAllFilterOptions);
router.get('/getTotalNumberOfPages', shopController.getTotalNumberOfPages);
router.get('/getFiltersWithSelectedFilters', shopController.getFiltersWithSelectedFilters);
router.get('/getProductData', shopController.getProductData);


// ROUTES ABOUT SHOPPING CART
router.get('/getAllUserItem', shoppingCartController.getAllUserItem);
router.post('/addItem', shoppingCartController.addItem);
router.put('/updateItem', shoppingCartController.updateItem);
router.delete('/removeItem', shoppingCartController.removeItem);




export default router;