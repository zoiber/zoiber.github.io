import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://jleorvypnywswultszmz.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpsZW9ydnlwbnl3c3d1bHRzem16Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkwMTYxOTMsImV4cCI6MjA3NDU5MjE5M30.ueQ7R2aTJlnZP7GTfrMOqWZ5q5npn7bHne3wwP-NUDk';

const customSupabaseClient = createClient(supabaseUrl, supabaseAnonKey);

export default customSupabaseClient;

export { 
    customSupabaseClient,
    customSupabaseClient as supabase,
};
