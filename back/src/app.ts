import express from 'express';
import httpContext from 'express-http-context';
import { Request, Response, NextFunction } from 'express-serve-static-core';
import * as bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import { config } from './config';
import { v1 } from './routes';
import { sequelize } from './models';
import { logger } from './lib';

const exceptionMiddleware = <T extends Error>(err: T, req: Request, res: Response, _next: NextFunction) => {
  res.status(500);
  return res.send(err);
};

export class App {
  public server: express.Application;

  constructor() {
    this.server = express();

    this.server.use(httpContext.middleware);
    this.configureLogging();
    this.configureMiddleware();
    this.configureRoutes();
  }

  public async connectToDatabase() {
    try {
      await sequelize().authenticate();
      logger.info('database_connection_succesful');
    } catch (error) {
      logger.error(error, 'database_connection_failed');
      throw error;
    }
  }

  private configureLogging() {
    const httpLogger = morgan('dev');
    this.server.use(httpLogger);
  }

  private configureMiddleware() {
    this.server.use(bodyParser.json());
    this.server.use(bodyParser.urlencoded({ extended: false }));
    this.server.use(helmet());
    this.server.use(
      cors({
        credentials: true,
        origin: true,
      }),
    );
    this.server.use(cookieParser());
  }

  private configureRoutes() {
    this.server.use('/api', v1);
    this.server.use((req: Request, res: Response) => {
      res.status(404);
      res.send({ message: 'Endpoint not found' });
    });
    this.server.use(exceptionMiddleware);
  }
}
