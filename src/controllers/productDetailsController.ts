import { Router, NextFunction,Request,Response } from "express";
import { body, validationResult } from "express-validator/check";
import config from '../config/config';
import * as HttpStatus from 'http-status-codes';
import { ApiResponseError } from '../resources/interfaces/ApiResponseError';
import { ProductService } from "../services/product.service";
import { ProductDetail } from "../entities/service";




const { errors } = config;
const productDatailsRouter : Router = Router();


productDatailsRouter.route('/newProduct')

 .post(
     [
      body('productId').isLength({ min: 1 }),
      body('productName').isLength({ min: 1 }),
      body('productDesc').isLength({ min: 1 }),
      body('productRate').isLength({ min: 1 }),
     ],
     async (req : Request , res : Response , next : NextFunction) => {

         const validationErrors = validationResult(req);
         if (validationErrors.isEmpty()) {
            const productService = new ProductService();
            await productService.instantiate(req.body);
            try {
                const response = await productService.insert(req.body);
                res.status(HttpStatus.OK).json({
                  success: true,
                  data: response
                });
            }   catch (err) { // DB exception or some other exception while inserting user
                console.log(err)
                const error: ApiResponseError = {
                  code: HttpStatus.BAD_REQUEST,
                  errorObj: err
                };
                next(error);
            }
        }
        else {  // validaiton error
            const error: ApiResponseError = {
              code: HttpStatus.BAD_REQUEST,
              errorsArray: validationErrors.array()
            };
            next(error);
          }
        });


        productDatailsRouter.route('/')

  .get(async (req: Request, res: Response, next: NextFunction) => {

    const productService = new ProductService();

    try {
      const response = await productService.getAll();
      // return 200 even if no user found. Empty array. Not an error
      res.status(HttpStatus.OK).json({
        success: true,
        data: response
      });
    } catch (err) {
      const error: ApiResponseError = {
        code: HttpStatus.BAD_REQUEST,
        errorObj: err
      };
      next(error);
    }
  });
  


    productDatailsRouter.route('/profile')

  .get(async (req: Request, res: Response, next: NextFunction) => {
    const userService = new ProductService();
    try {
      const product = await userService.getById(req.user.id);

      // if user not found
      if (!product) {
        res.status(HttpStatus.NOT_FOUND).json({
          success: false,
          message: `${errors.entityNotFound}: product id`
        });
        return;
      }
      // return found user
      res.status(HttpStatus.OK).json({
        success: true,
        product : product
        
      });

    } catch (err) {
      const error: ApiResponseError = {
        code: HttpStatus.BAD_REQUEST,
        errorObj: err
      };
      next(error);
    }
  })


  .put(
    [
      body('productid').optional().isLength({ min: 1 }),
      body('productName').optional().isLength({ min: 1 }),
      body('productDesc').isLength({ min: 6 }),
      body('productRate').isLength({ min: 6 }), 

    ],
    async (req: Request, res: Response, next: NextFunction) => {
      const validationErrors = validationResult(req);
      if (validationErrors.isEmpty()) {
        const productService = new ProductService();
        try {
          const product = await productService.getById(req.product.id);
          // if product not found
          if (!product) {
            return res.status(HttpStatus.NOT_FOUND).json({
              success: false,
              message: `${errors.entityNotFound}: product id`
            });
          }
              

           //now update the product attributes according to req body

          if (req.body.productId) product.productId = req.body.productId;
          if (req.body.productName) product.productName = req.body.productName;
          if (req.body.productDesc) product.productDesc = req.body.productDesc;
          if (req.body.productRate) product.productRate = req.body.productRate;
         

          const updatedProduct = await productService.update(product);
          res.status(HttpStatus.OK).json({
            success: true,
            product: updatedProduct
          });
        } catch (err) {
          // db errors e.g. unique constraints etc
          const error: ApiResponseError = {
            code: HttpStatus.BAD_REQUEST,
            errorObj: err
          };
          next(error);
        }
      } else {  // validation errors
        const error: ApiResponseError = {
          code: HttpStatus.BAD_REQUEST,
          errorsArray: validationErrors.array()
        };
        next(error);
      }
  });

  

export default productDatailsRouter;