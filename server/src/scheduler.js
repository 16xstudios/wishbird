import cron from 'node-cron';
import { supabase } from './supabase.js';
import { sendWish } from './sender.js';
import { isWhatsAppReady } from './whatsapp.js';

/**
 * Check for due wishes and send them
 */
async function checkAndSendWishes() {
    if (!isWhatsAppReady()) {
        console.log('⏳ WhatsApp not ready yet, skipping this cycle...');
        return;
    }

    const now = new Date().toISOString();
    console.log(`\n🔍 [${new Date().toLocaleTimeString()}] Checking for scheduled wishes...`);

    try {
        // Query wishes that are scheduled and due (scheduled_date <= now)
        const { data: wishes, error } = await supabase
            .from('wishes')
            .select('*')
            .eq('status', 'scheduled')
            .lte('scheduled_date', now)
            .order('scheduled_date', { ascending: true });

        if (error) {
            console.error('❌ Error fetching wishes:', error.message);
            return;
        }

        if (!wishes || wishes.length === 0) {
            console.log('   No wishes due at this time.');
            return;
        }

        console.log(`   📋 Found ${wishes.length} wish(es) to send`);

        // Process each wish
        for (const wish of wishes) {
            const result = await sendWish(wish);

            if (result.success) {
                // Update status to 'sent' and set delivered_at
                const { error: updateError } = await supabase
                    .from('wishes')
                    .update({
                        status: 'sent',
                        delivered_at: new Date().toISOString()
                    })
                    .eq('id', wish.id);

                if (updateError) {
                    console.error(`   ❌ Failed to update wish ${wish.id}:`, updateError.message);
                } else {
                    console.log(`   ✅ Wish ${wish.id} marked as sent`);
                }
            } else {
                // Update status to 'failed'
                const { error: updateError } = await supabase
                    .from('wishes')
                    .update({
                        status: 'failed'
                    })
                    .eq('id', wish.id);

                if (updateError) {
                    console.error(`   ❌ Failed to update wish ${wish.id}:`, updateError.message);
                } else {
                    console.log(`   ⚠️ Wish ${wish.id} marked as failed: ${result.error}`);
                }
            }

            // Small delay between wishes to avoid rate limiting
            await new Promise(resolve => setTimeout(resolve, 2000));
        }

    } catch (error) {
        console.error('❌ Scheduler error:', error.message);
    }
}

/**
 * Start the cron scheduler
 * Runs every minute by default
 */
export function startScheduler() {
    const cronInterval = process.env.CRON_INTERVAL || '* * * * *';

    console.log(`\n⏰ Starting scheduler (cron: ${cronInterval})`);
    console.log('   The scheduler will check for due wishes every minute.\n');

    // Run once immediately
    setTimeout(() => {
        checkAndSendWishes();
    }, 5000);

    // Then schedule according to cron
    cron.schedule(cronInterval, () => {
        checkAndSendWishes();
    });
}
