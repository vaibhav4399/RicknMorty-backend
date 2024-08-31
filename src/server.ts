import app from './app';
import { createServer } from 'http';

const PORT =  3000; // Default port

// Create an HTTP server using the Express app
const server = createServer(app);

// Start the server
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Handle unhandled promise rejections and uncaught exceptions
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection:', reason);
  // Perform cleanup and exit or attempt to recover
});

process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
  // Perform cleanup and exit
  process.exit(1);
});
