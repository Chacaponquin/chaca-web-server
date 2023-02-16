import {
  ExceptionFilter,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
  Catch,
} from "@nestjs/common";

@Catch()
export class ChacaExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(ChacaExceptionFilter.name);

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const msg =
      exception instanceof HttpException ? exception.getResponse() : exception;

    this.logger.error(`Status: ${status} Error: ${JSON.stringify(msg)}`);

    response.status(status).json({
      time: new Date().toISOString(),
      path: request.url,
      error: msg,
    });
  }
}
