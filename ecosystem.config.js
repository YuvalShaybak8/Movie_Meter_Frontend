module.exports = {
  apps: [
    {
      name: "client",
      script: "./src/App.tsx",
      env_production: {
        VITE_REACT_APP_API_URL: "https://node09.cs.colman.ac.il",
        VITE_API_KEY: "b04e7ba5db91cb63b41243b69801c5f1",
        VITE_GOOGLE_CLIENT_ID:
          "403571040301 - 2ka5e09b8upflfk8qmpfebo4sg08gde0.apps.googleusercontent.com",
      },
    },
  ],
};
