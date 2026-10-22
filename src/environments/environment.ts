/**
 * @fileoverview Application environment configuration containing API endpoints and Firebase credentials.
 */

/**
 * Global environment configuration object.
 */
export const environment = {
  /** Indicates whether the application is running in production mode */
  production: true,
  /** Webhook URL for the n8n recipe generation workflow */
  n8nWebhookUrl: 'https://workflow-code.app.n8n.cloud/webhook/generate-recipes',
  firebase: {
    apiKey: 'AIzaSyAn4_6QmT21iiwA9ywVwPuBTGldFnbueh4',
    authDomain: 'code-a-cuisine-99700.firebaseapp.com',
    projectId: 'code-a-cuisine-99700',
    storageBucket: 'code-a-cuisine-99700.firebasestorage.app',
    messagingSenderId: '566640793888',
    appId: '1:566640793888:web:ea5ecd1c6fc4c410b49f45',
    measurementId: 'G-89164T5YVS',
  },
};
