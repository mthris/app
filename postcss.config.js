import config from './config/postcss';

module.exports = ({ env }) => {
  return env === 'dev' ? { ...config.dev } : env === 'prod' ? { ...config.prod } : 'Not found environment';
}
