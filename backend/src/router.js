import { Router } from "express";
import loginController from "./app/controllers/login-controller.js";
import shopController from "./app/controllers/shop-controller.js";
import shoppingCartController from "./app/controllers/shopping-cart-controller.js";

const router = Router();

// ROUTES ABOUT LOGIN AND ACCOUNT
router.post("/createAccount", loginController.createAccount);
router.get("/login", loginController.login);
router.put("/updatePassword", loginController.newPassword);
router.get("/validateEmail", loginController.checkEmail);


// QUERY COOKIES WITH httpOnly = true
router.get('/queryCookieUserToken', loginController.checkUserToken);


// ROUTES ABOUT SHOPPING AND PRODUCT PAGE
router.get('/getDatasForProductGrid', shopController.productGrid);
router.get('/getDatasForProductGridWithFilters', shopController.productGridWithFilters);
router.get('/getAllFilters', shopController.allFilters);
router.get('/getAllFilterOptions', shopController.FilterOptions);
router.get('/getTotalNumberOfPages', shopController.totalPages);
router.get('/getFiltersWithSelectedFilters', shopController.FiltersWithSelectedFilters);
router.get('/getProductData', shopController.productData);


// ROUTES ABOUT SHOPPING CART
router.get('/getAllUserItem', shoppingCartController.getAllUserItem);
router.post('/addItem', shoppingCartController.addItem);
router.put('/updateItem', shoppingCartController.updateItem);
router.delete('/removeItem', shoppingCartController.removeItem);




export default router;