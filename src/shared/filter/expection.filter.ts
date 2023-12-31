import { STATUS } from '@/types';
import { logger } from '@/utils';

import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  InternalServerErrorException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class MongoExpectionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();

    try {
      if (exception.name === 'ValidationError') resolveValidationError(exception);
      if (exception.name === 'MongoServerError') resolveMongoServerError(exception);
      if (exception.name === 'CastError') resolveCastError(exception);

      res.status(exception.getStatus() || HttpStatus.INTERNAL_SERVER_ERROR).json({
        status: STATUS.FAILED,
        message: exception,
      });
    } catch (err: unknown) {
      const _err = err as HttpException;
      const statusCode = _err.getStatus();
      const message = _err.message;
      logger.error(err);
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

const resolveMongoServerError = (exception: HttpException) => {
  throw new InternalServerErrorException(exception.message);
};

const resolveCastError = (exception: HttpException) => {
  // @ts-ignore
  throw new BadRequestException(`Invalid ${exception.path}: ${exception.value}`);
};
