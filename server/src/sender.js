import { sendTextMessage, sendMediaFromUrl, isWhatsAppReady } from './whatsapp.js';

/**
 * Format message with proper template
 */
function formatMessage(wish) {
    const { recipient_name, sender_name, occasion, message_text, language } = wish;
    
    const occasionEmojis = {
        Birthday: '🎂🎉',
        Anniversary: '💍💕',
        Festival: '🎊✨',
        Apology: '🙏💛',
        Appreciation: '🌟💜',
        Congratulations: '🏆🎊',
        'Get Well Soon': '💐🙏',
        'Just Because': '💜✨'
    };

    const emoji = occasionEmojis[occasion] || '✨💜';
    
    // If user provided custom message, use it
    if (message_text && message_text.trim()) {
        return message_text;
    }
    
    // Default template message
    return `${emoji} *${occasion} Wishes for ${recipient_name}!* ${emoji}\n\n` +
           `Dear ${recipient_name},\n\n` +
           `Wishing you a wonderful ${occasion.toLowerCase()}! ` +
           `May this special day bring you joy, happiness, and all the love you deserve.\n\n` +
           `With love,\n${sender_name} 💜\n\n` +
           `_Sent with love via WishBot_ ✨`;
}

/**
 * Send a wish to a recipient via WhatsApp
 */
export async function sendWish(wish) {
    if (!isWhatsAppReady()) {
        return { success: false, error: 'WhatsApp client is not ready' };
    }

    const {
        recipient_phone,
        recipient_name,
        sender_name,
        occasion,
        message_text,
        photo_url,
        greeting_card_url,
        video_url,
        audio_url,
        voice_note_url
    } = wish;

    console.log(`\n📨 Sending wish to ${recipient_name} (${recipient_phone})`);
    console.log(`   Occasion: ${occasion}`);

    const errors = [];
    let messagesSent = 0;

    try {
        // 1. Send formatted text message
        const formattedMessage = formatMessage(wish);
        try {
            await sendTextMessage(recipient_phone, formattedMessage);
            console.log('   ✅ Text message sent');
            messagesSent++;
        } catch (err) {
            console.error('   ❌ Failed to send text:', err.message);
            errors.push(`Text: ${err.message}`);
        }

        // 2. Send greeting card / image
        const imageUrl = greeting_card_url || photo_url;
        if (imageUrl) {
            try {
                const caption = `🎉 *${occasion} Wishes!*\nFrom: ${sender_name} 💜`;
                await sendMediaFromUrl(recipient_phone, imageUrl, caption, 'image');
                console.log('   ✅ Image/greeting card sent');
                messagesSent++;
            } catch (err) {
                console.error('   ❌ Failed to send image:', err.message);
                errors.push(`Image: ${err.message}`);
            }
        }

        // 3. Send video
        if (video_url) {
            try {
                const caption = `🎬 *Video Message*\nFrom: ${sender_name}`;
                await sendMediaFromUrl(recipient_phone, video_url, caption, 'video');
                console.log('   ✅ Video sent');
                messagesSent++;
            } catch (err) {
                console.error('   ❌ Failed to send video:', err.message);
                errors.push(`Video: ${err.message}`);
            }
        }

        // 4. Send audio/voice note
        const audioSrc = audio_url || voice_note_url;
        if (audioSrc) {
            try {
                await sendMediaFromUrl(recipient_phone, audioSrc, '', 'audio');
                console.log('   ✅ Audio/voice note sent');
                messagesSent++;
            } catch (err) {
                console.error('   ❌ Failed to send audio:', err.message);
                errors.push(`Audio: ${err.message}`);
            }
        }

        if (messagesSent > 0) {
            console.log(`   📊 Summary: ${messagesSent} message(s) sent successfully`);
            return { success: true, messagesSent, errors: errors.length > 0 ? errors : null };
        } else {
            return { success: false, error: errors.length > 0 ? errors.join('; ') : 'No content to send' };
        }

    } catch (error) {
        console.error('   ❌ Unexpected error:', error.message);
        return { success: false, error: error.message };
    }
}
