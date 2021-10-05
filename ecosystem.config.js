module.exports = {
  apps : [
  {
    "name": "api",
    "cwd": "api",
    "script": "npm",
    "args": "run start",
    "watch": true,
    "env": {
      "NODE_ENV": "production",
    }
  }
]
};
