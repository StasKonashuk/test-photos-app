import pkgJson from '../package.json';
import usersSwagger from './src/routes/users/swagger';
import photosSwagger from './src/routes/photos/swagger';

const DEFAULT_PORT = 8000;

const port = process.env.PORT || DEFAULT_PORT;
const server = {
  url: `http://localhost:${port}`,
  description: 'development server',
};

const swagger = {
  openapi: '3.0.0',
  info: {
    title: 'Test App',
    version: `${pkgJson.version}`,
    description: 'The REST API',
  },
  servers: [server],
  showExplorer: true,
  components: {
    securitySchemes: {
      Cookie: {
        type: 'apiKey',
        name: 'refreshCookie',
        in: 'header',
      },
      UserIdKey: {
        type: 'apiKey',
        in: 'header',
        name: 'userId',
      },
      AuthorizationKey: {
        type: 'apiKey',
        in: 'header',
        name: 'authorization',
      },
    },
  },
  security: [{ Cookie: [] }, { AuthorizationKey: [] }, { UserIdKey: [] }],

  paths: {
    ...usersSwagger,
    ...photosSwagger,
  },
};
export default swagger;
