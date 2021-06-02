import App from './app.js';

const app = App();

document.addEventListener('DOMContentLoaded', () => app.init());
document.addEventListener('beforeunload', () => app.destroy());