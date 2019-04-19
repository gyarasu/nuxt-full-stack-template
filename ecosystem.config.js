module.exports = {
  apps: [{
    name: 'nft-app',
    script: 'npm',
    args: 'run start',
    exec_mode: 'cluster',
    instances: 0,
    log_date_format: 'YYYY-MM-DD HH:mm Z',
    instance_var: 'MYAPP',
    env_production: {
      PORT: 3000,
      NODE_ENV: 'production'
    },
  }],
};
