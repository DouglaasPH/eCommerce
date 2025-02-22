import { Router } from "express";
import loginController from "./app/controllers/login-controller.js";
import shopController from "./app/controllers/shop-controller.js";
import shoppingCartController from "./app/controllers/shopping-cart-controller.js";
import processPurchaseController from "./app/controllers/process-purchase-controller.js";
import orderController from "./app/controllers/order-controller.js";
import paymentsController from "./app/controllers/payments-controller.js";
import installmentController from "./app/controllers/installment-controller.js";
import userDataController from "./app/controllers/user-data-controller.js";

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


// ROUTES ABOUT PURCHASE PROCESS
router.get('/getAllAddress', processPurchaseController.getAllAddress);
router.post('/addNewAddress', processPurchaseController.addNewAddress);
router.put('/updateAddress', processPurchaseController.updateAddress);
router.put('/removeAddress', processPurchaseController.removeAddress);
router.get('/confirmCoupon', processPurchaseController.confirmCoupon);
router.put('/useCoupon', processPurchaseController.useCoupon);


// ROUTES ABOUT ORDER AND ORDER_ITEMS
router.get('/getAllOrder', orderController.getAllOrder);
router.post('/addOrder', orderController.addOrder);
router.put('/updateStatusOrder', orderController.updateStatusOrder);
router.get('/getAllOrderItems', orderController.getAllOrderItems);
router.post('/addOrderItems', orderController.addOrderItems);


// ROUTES ABOUT PAYMENTS
router.get('/getPayment', paymentsController.getPayment);
router.post('/addPayment', paymentsController.addPayment);
router.put('/updateStatusPayment', paymentsController.updateStatusPayment);


// ROUTES ABOUT INSTALLMENT
router.get('/getInstallment', installmentController.getInstallment);


// ROUTES ABOUT USER DATA
router.get('/getUserData', userDataController.getUserData);
router.delete('/removeAccount', userDataController.removeAccount);
router.put('/updateAccountDetails', userDataController.updateAccountDetails);
router.get('/checkPassword', userDataController.checkPassword);


export default router;