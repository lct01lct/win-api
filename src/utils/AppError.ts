import {
  BadRequestException,
  ForbiddenException,
  HttpStatus,
  UnauthorizedException,
} from '@nestjs/common';

export class AppError {
  constructor(msg: string, statusCode: HttpStatus) {
    switch (statusCode) {
      case HttpStatus.BAD_REQUEST:
        return new BadRequestException(msg);
      case HttpStatus.UNAUTHORIZED:
        return new UnauthorizedException(msg);
      case HttpStatus.FORBIDDEN:
        return new ForbiddenException(msg);
      default:
        return new BadRequestException(msg);
    }
  }
}
