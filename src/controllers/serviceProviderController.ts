import { Router } from "express";
import bcrypt from 'bcryptjs';
import { body, validationResult } from "express-validator/check";
import { ServiceProviderService } from "../services/serviceProvider.service";
import * as HttpStatus from 'http-status-codes';
import { ApiResponseError } from "../resources/interfaces/ApiResponseError";
import errors from "../assets/i18n/en/errors";
import { AuthHandler } from "../middlewares/authHandler";

const serviceProviderRouter: Router = Router();

// serviceProvider signup

serviceProviderRouter.route('/signup')

 .post(

    [
       body('Name').isLength({ min: 1 }),
       body('description').isLength({ min: 1 }),
       body('mobile').isLength({ min: 1 }),
       body('email').isEmail(),
       body('password').isLength({ min: 6 }),
       body('address').isLength({ min: 6 })

],
async (req :any , res : any, next : any) =>{

    const validationErrors = validationResult(req);

      if (validationErrors.isEmpty()) {
        const serviceProviderService = new ServiceProviderService();
        await serviceProviderService.instantiate(req.body);
        try {
          const response = await serviceProviderService.insert(req.body);
          res.status(HttpStatus.OK).json({
            success: true,
            data: response
          });
        } catch (err) { // DB exception or some other exception while inserting user
          console.log(err)
          const error: ApiResponseError = {
            code: HttpStatus.BAD_REQUEST,
            errorObj: err
          };
          next(error);
        }
      } else {  // validaiton error
        const error: ApiResponseError = {
          code: HttpStatus.BAD_REQUEST,
          errorsArray: validationErrors.array()
        };
        next(error);
      }
    });


    // serviceProvider login

serviceProviderRouter.route('/login')

 .post(
     
    [
        body('email').isEmail(),
        body('password').isLength({ min: 1 })
    ], 
    async(req : any,res : any, next : any) =>{

      const validationErrors = validationResult(req);
      if (validationErrors.isEmpty()) { // no error
        const serviceProviderService = new ServiceProviderService();
        let serviceProvider = await serviceProviderService.getByEmail(req.body.email);
         if (!serviceProvider) {
          res.status(HttpStatus.BAD_REQUEST).json({
            success: false,
            message: `${errors.emailNotFound}`
          });
          return;
        }
        
        // now compare password
        
        const isPasswordCorrect = await bcrypt.compare(req.body.password, serviceProvider.password);

        // generate token and return
        
        if (isPasswordCorrect) {
          const authHandler = new AuthHandler();
          const token = authHandler.generateServiceToken(serviceProvider);
          res.status(HttpStatus.OK).json({
            success: true,
            token: token
          });
          return;
        } 
        else {
          // incorrect password
          const error: ApiResponseError = {
            code: HttpStatus.UNAUTHORIZED,
            errorObj: {
              message: errors.incorrectPassword
            }
          };
          next(error);
          return;
        }
        
      } else {  // validation error
        const error: ApiResponseError = {
          code: HttpStatus.BAD_REQUEST,
          errorsArray: validationErrors.array()
        };
        next(error);
      }

    });

//update serviceProvider

serviceProviderRouter.route('/update')

.put(
    [
       body('name').optional().isLength({ min: 1 }),
       body('description').optional().isLength({ min: 1 }),
       body('mobile').optional().isLength({ min: 1 }),
       body('email').isEmail(),
       body('oldPassword').isLength({ min: 6 }),
       body('newPassword').isLength({ min: 6 }),
       body('address').optional().isLength({ min: 6 })

    ], 
    async(req : any ,res :any,next : any) => {

    const validationErrors = validationResult(req);
      if (validationErrors.isEmpty()) {
        const serviceProviderService = new ServiceProviderService();
        try {
          const serviceProvider = await serviceProviderService.getById(req.serviceProvider.id);
          // if serviceProvider not found
          if (!serviceProvider) {
            return res.status(HttpStatus.NOT_FOUND).json({
              success: false,
              message: `${errors.entityNotFound}: serviceProvider id`
            });
          }

          // if serviceProvider sent old & new password in body
          if (req.body.oldPassword && req.body.newPassword) {
            // Validate old password and return error if it's not correct
            const isOldPasswordCorrect = await bcrypt.compare(req.body.oldPassword, serviceProvider.password);
            if (!isOldPasswordCorrect) {
              const error: ApiResponseError = {
                code: HttpStatus.BAD_REQUEST,
                errorObj: {
                  message: errors.incorrectOldPassword
                }
              };
              next(error);
              return;
            }
          } else if ((req.body.oldPassword && !req.body.newPassword) ||
            (!req.body.oldPassword && req.body.newPassword)) {
            // if serviceProvider sends only one of old or new password in body
            return res.status(HttpStatus.BAD_REQUEST).json({
              success: false,
              message: `${errors.oldAndNewPasswordBothInBody}`
            });
          }

          // now update the serviceProvide attributes according to req body
          if (req.body.name) serviceProvider.name = req.body.name;
          if (req.body.description) serviceProvider.description = req.body.description;
          if (req.body.mobile) serviceProvider.email = req.body.mobile;
          if (req.body.email) serviceProvider.email = req.body.email;
          if (req.body.address) serviceProvider.address = req.body.address;
          if (req.body.newPassword)  serviceProvider.password = req.body.newPassword;

          const updatedServiceProvider = await serviceProviderService.update(serviceProvider);
          res.status(HttpStatus.OK).json({
            success: true,
            serviceProvider: updatedServiceProvider
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


export default serviceProviderRouter