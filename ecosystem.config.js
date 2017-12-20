module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps : [
    {
      name      : "baochelian-admin-web",
      script    : "./bin/www",
      node_args : "--harmony --use-strict",
      env: {
        NODE_ENV: "dev",
        PORT: 4000
      },
      env_production : {
        NODE_ENV: "production",
        PORT: 4002
      },
      env_test: {
        NODE_ENV: "test",
        PORT: 4001
      }
    }
  ]
};
