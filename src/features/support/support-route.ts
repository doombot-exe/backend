import { Response, NextFunction } from "express";
const router = require('express').Router();
import validate from '../../middleware/joi-validator'
import { authenticationMiddleware } from "../../middleware/auth";
import httpResponse from "../../utilities/http-response";
import * as asyncHandler from 'express-async-handler'
import { RederlyExpressRequest } from '../../extensions/rederly-express-request';
import { feedbackValidation } from './support-route-validation';
import { FeedbackRequest } from './support-route-request-types';
import supportController from './support-controller';

router.post('/',
    authenticationMiddleware,
    validate(feedbackValidation),
    asyncHandler(async (req: RederlyExpressRequest<FeedbackRequest.params, unknown, FeedbackRequest.body, FeedbackRequest.query>, res: Response, next: NextFunction) => {
        const user = await req.session.getUser();
        const result = await supportController.createIssue({
            description: `
            User name: ${user.firstName} ${user.lastName}
            User id: ${user.id}
            User email: ${user.email}
            
            Description:
            ${req.body.description}
            `,
            summary: `SUPPORT: ${req.body.summary}`
        });
        next(httpResponse.Ok('Support ticket created successfully', result));
    }));

module.exports = router;