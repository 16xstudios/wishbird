import dotenv from 'dotenv';
dotenv.config();

import { initWhatsApp } from './whatsapp.js';
import { startScheduler } from './scheduler.js';

console.log('═══════════════════════════════════════════════════════════════');
console.log('   🎉 WishBot WhatsApp Automation Server');
console.log('═══════════════════════════════════════════════════════════════');
console.log('');

async function main() {
    try {
        // Initialize WhatsApp client
        await initWhatsApp();

        console.log('');
        console.log('═══════════════════════════════════════════════════════════════');
        console.log('   ✅ Server is running!');
        console.log('   📱 WhatsApp is connected and ready to send messages.');
        console.log('   ⏰ Scheduler is checking for wishes every minute.');
        console.log('═══════════════════════════════════════════════════════════════');
        console.log('');

        // Start the scheduler
        startScheduler();

    } catch (error) {
        console.error('❌ Failed to start server:', error.message);
        process.exit(1);
    }
}

// Handle graceful shutdown
process.on('SIGINT', () => {
    console.log('\n\n👋 Shutting down gracefully...');
    process.exit(0);
});

process.on('SIGTERM', () => {
    console.log('\n\n👋 Shutting down gracefully...');
    process.exit(0);
});

main();
