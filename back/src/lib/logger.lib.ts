import httpContext from 'express-http-context';
import pino from 'pino';
import { config } from '../config';

const mixin = () => {
  return {
    traceId: httpContext.get('traceId'),
    userId: httpContext.get('userId'),
    userEmail: httpContext.get('userEmail'),
  };
};

export const logger = pino({
  level: config.logger.level,
  base: null,
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: ['LOCAL', 'TEST'].includes(config.env),
    },
  },
  nestedKey: 'data',
  mixin,
  serializers: {
    /* eslint-disable */
    data: (data: any | Error) => {
      if (data instanceof Error) {
        return { err: pino.stdSerializers.err(data) };
      }

      if (data.err) {
        data.err = pino.stdSerializers.err(data.err);
      }

      return data;
    },
  },
});
