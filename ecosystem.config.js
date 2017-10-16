module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps : [
    {
      name      : "hades-web",
      script    : "./bin/www",
      node_args : "--harmony --use-strict",
      env: {
        NODE_ENV: "dev",
        PORT: 13001
      },
      env_production : {
        NODE_ENV: "production",
        PORT: 13003
      },
      env_test: {
        NODE_ENV: "test",
        PORT: 13002
      },
      env_dev: {
        NODE_ENV: "dev",
        PORT: 13001
      },
      env_dev_cp: {
        NODE_ENV: "dev_cp",
        PORT: 13004
      }
    }
  ]
};
