import { sendTextMessage, sendMediaFromUrl, isWhatsAppReady } from './whatsapp.js';

/**
 * Send a wish to a recipient via WhatsApp
 * @param {Object} wish - Wish object from Supabase
 * @returns {Object} - Result with success status and any errors
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
        // 1. Send text message first
        if (message_text) {
            try {
                await sendTextMessage(recipient_phone, message_text);
                console.log('   ✅ Text message sent');
                messagesSent++;
            } catch (err) {
                console.error('   ❌ Failed to send text:', err.message);
                errors.push(`Text: ${err.message}`);
            }
        }

        // 2. Send greeting card / image
        const imageUrl = greeting_card_url || photo_url;
        if (imageUrl) {
            try {
                await sendMediaFromUrl(recipient_phone, imageUrl, `🎉 ${occasion} wishes from ${sender_name}!`, 'image');
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
                await sendMediaFromUrl(recipient_phone, video_url, `🎬 Video message from ${sender_name}`, 'video');
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

        // Determine success (at least one message sent)
        if (messagesSent > 0) {
            console.log(`   📊 Summary: ${messagesSent} message(s) sent successfully`);
            return {
                success: true,
                messagesSent,
                errors: errors.length > 0 ? errors : null
            };
        } else {
            return {
                success: false,
                error: errors.length > 0 ? errors.join('; ') : 'No content to send'
            };
        }

    } catch (error) {
        console.error('   ❌ Unexpected error:', error.message);
        return { success: false, error: error.message };
    }
}
