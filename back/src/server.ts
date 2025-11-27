import dotenv from 'dotenv';
dotenv.config();
import { config } from './config';
import { App } from './app';
import { logger } from './lib';

const port = config.port;
const app = new App();

app.server.listen(port, () => logger.info(`Server running on port ${port}`));

const handleDisconnect = () => {
  app
    .connectToDatabase()
    .then(() => {
      logger.info('Connected to database ...');
    })
    .catch((err) => {
      logger.error(err, 'Connection error');
      setTimeout(handleDisconnect, 10000);
    });
};

handleDisconnect();
