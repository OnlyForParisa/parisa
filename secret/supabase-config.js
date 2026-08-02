// =============================================
// تنظیمات Supabase
// =============================================
const SUPABASE_URL = 'https://qsqlljosmwayrasklthn.supabase.co';  // <-- درست شد
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFzcWxsam9zbXdhcnlhc2tsdGhuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODU2NzI4MzUsImV4cCI6MjEwMTI0ODgzNX0.pM-ocTom8I8No8U9prLsfiRgCMgrLRcj9cKhHlRrRo8';

// =============================================
// کلاینت Supabase
// =============================================
const supabaseClient = {
    url: SUPABASE_URL,
    key: SUPABASE_KEY,

    async saveMessage(text, date) {
        try {
            const response = await fetch(`${this.url}/rest/v1/messages`, {
                method: 'POST',
                headers: {
                    'apikey': this.key,
                    'Authorization': `Bearer ${this.key}`,
                    'Content-Type': 'application/json',
                    'Prefer': 'return=representation'
                },
                body: JSON.stringify({
                    message: text,
                    created_at: new Date().toISOString(),
                    sender_name: 'پریسا'
                })
            });
            
            if (!response.ok) {
                const error = await response.text();
                throw new Error(`خطا در ذخیره: ${response.status} - ${error}`);
            }
            return await response.json();
        } catch (error) {
            console.error('Error in saveMessage:', error);
            throw error;
        }
    },

    async getMessages() {
        try {
            const response = await fetch(
                `${this.url}/rest/v1/messages?order=created_at.desc&select=*`,
                {
                    headers: {
                        'apikey': this.key,
                        'Authorization': `Bearer ${this.key}`
                    }
                }
            );
            
            if (!response.ok) {
                const error = await response.text();
                throw new Error(`خطا در دریافت: ${response.status} - ${error}`);
            }
            return await response.json();
        } catch (error) {
            console.error('Error in getMessages:', error);
            throw error;
        }
    },

    async deleteMessage(id) {
        try {
            const response = await fetch(
                `${this.url}/rest/v1/messages?id=eq.${id}`,
                {
                    method: 'DELETE',
                    headers: {
                        'apikey': this.key,
                        'Authorization': `Bearer ${this.key}`
                    }
                }
            );
            
            if (!response.ok) {
                const error = await response.text();
                throw new Error(`خطا در حذف: ${response.status} - ${error}`);
            }
            return true;
        } catch (error) {
            console.error('Error in deleteMessage:', error);
            throw error;
        }
    }
};