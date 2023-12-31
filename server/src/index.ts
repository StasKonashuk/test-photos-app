import { dbContext } from './db/dbContext';
import app from './server';

const defaultPort = 8000;

const port = process.env.PORT || defaultPort;

Promise.all([dbContext.connect()])
  .then(() => {
    app.listen(port, () => {
      console.info(`Server is started on port ${port}`);
    });
  })
  .catch((err) => {
    console.error(`Server is started with error`);
    throw err;
  });
