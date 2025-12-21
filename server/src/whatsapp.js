import pkg from 'whatsapp-web.js';
const { Client, LocalAuth, MessageMedia } = pkg;
import qrcode from 'qrcode-terminal';

let client = null;
let isReady = false;

/**
 * Initialize WhatsApp client with QR code authentication
 */
export async function initWhatsApp() {
    return new Promise((resolve, reject) => {
        client = new Client({
            authStrategy: new LocalAuth({
                dataPath: './.wwebjs_auth'
            }),
            puppeteer: {
                headless: true,
                args: [
                    '--no-sandbox',
                    '--disable-setuid-sandbox',
                    '--disable-dev-shm-usage',
                    '--disable-accelerated-2d-canvas',
                    '--no-first-run',
                    '--no-zygote',
                    '--disable-gpu'
                ]
            }
        });

        client.on('qr', (qr) => {
            console.log('\n📱 Scan this QR code with WhatsApp:\n');
            qrcode.generate(qr, { small: true });
            console.log('\n⏳ Waiting for QR code scan...\n');
        });

        client.on('authenticated', () => {
            console.log('✅ WhatsApp authenticated!');
        });

        client.on('auth_failure', (msg) => {
            console.error('❌ Authentication failed:', msg);
            reject(new Error('Authentication failed'));
        });

        client.on('ready', () => {
            console.log('✅ WhatsApp client is ready!');
            isReady = true;
            resolve(client);
        });

        client.on('disconnected', (reason) => {
            console.log('❌ WhatsApp disconnected:', reason);
            isReady = false;
        });

        console.log('🚀 Initializing WhatsApp client...');
        client.initialize();
    });
}

/**
 * Check if WhatsApp client is ready
 */
export function isWhatsAppReady() {
    return isReady && client !== null;
}

/**
 * Get WhatsApp client instance
 */
export function getClient() {
    return client;
}

/**
 * Format phone number to WhatsApp format (countrycode + number + @c.us)
 * @param {string} phone - Phone number (can include +, spaces, dashes)
 */
export function formatPhoneNumber(phone) {
    // Remove all non-digit characters
    let cleaned = phone.replace(/\D/g, '');

    // If it starts with 0, assume India (+91)
    if (cleaned.startsWith('0')) {
        cleaned = '91' + cleaned.substring(1);
    }

    // If it's 10 digits, assume India (+91)
    if (cleaned.length === 10) {
        cleaned = '91' + cleaned;
    }

    return cleaned + '@c.us';
}

/**
 * Send a text message
 */
export async function sendTextMessage(phone, message) {
    if (!isWhatsAppReady()) {
        throw new Error('WhatsApp client is not ready');
    }

    const chatId = formatPhoneNumber(phone);
    return await client.sendMessage(chatId, message);
}

/**
 * Send media from URL (image, video, audio)
 */
export async function sendMediaFromUrl(phone, url, caption = '', type = 'image') {
    if (!isWhatsAppReady()) {
        throw new Error('WhatsApp client is not ready');
    }

    const chatId = formatPhoneNumber(phone);

    try {
        const media = await MessageMedia.fromUrl(url, { unsafeMime: true });

        // For audio/voice notes, send as PTT (push-to-talk)
        if (type === 'audio') {
            return await client.sendMessage(chatId, media, { sendAudioAsVoice: true });
        }

        return await client.sendMessage(chatId, media, { caption });
    } catch (error) {
        console.error(`Failed to send media from ${url}:`, error.message);
        throw error;
    }
}
