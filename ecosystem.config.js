module.exports = {
    apps: [
        {
            name: 'client', // Name of your application
            script: './App.tsx', // Entry point of your application
            env_production: {
                VITE_REACT_APP_API_URL: "http://localhost:5500",
                VITE_API_KEY: "b04e7ba5db91cb63b41243b69801c5f1",
                VITE_GOOGLE_CLIENT_ID: "403571040301 - 2ka5e09b8upflfk8qmpfebo4sg08gde0.apps.googleusercontent.com"
            },
        },
    ],
};
