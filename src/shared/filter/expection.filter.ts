import { STATUS } from '@/types';
import {
  ArgumentsHost,
  ExceptionFilter,
  HttpException,
  InternalServerErrorException,
} from '@nestjs/common';
import { Request, Response } from 'express';

export class MongoExpectionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const req = ctx.getRequest<Request>();
    const res = ctx.getResponse<Response>();

    try {
      if (exception.name === 'ValidationError') resolveValidationError(exception);
    } catch (err: unknown) {
      const _err = err as HttpException;
      const statusCode = _err.getStatus();
      const message = _err.message;

      res.status(statusCode).json({
        status: STATUS.FAILED,
        message,
      });
    }
  }
}

const resolveValidationError = (exception: HttpException) => {
  throw new InternalServerErrorException(exception.message);
};
