module.exports = {
  apps : [
  {
    "name": "app-backend",
    "cwd": "app-backend",
    "script": "npm",
    "args": "run start",
    "watch": true,
    "env": {
      "NODE_ENV": "production",
    }
  }
]
};
