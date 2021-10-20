import { HttpException, HttpStatus } from '@nestjs/common';

export class StatusTransitionException extends HttpException {
  constructor(message?: string) {
    super(message || 'Status transition is invalid', HttpStatus.FORBIDDEN);
  }
}
