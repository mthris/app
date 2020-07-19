import config from './config/webpack';

export default env => env === 'dev' ? config.dev : env === 'prod' ? config.prod : 'Not found environment';
