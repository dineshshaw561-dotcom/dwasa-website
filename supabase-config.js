// =====================================================
// Supabase configuration - shared across all pages
// =====================================================
// These values are safe to expose publicly.
// Security is enforced via Row Level Security (RLS) policies
// configured in the Supabase dashboard.

const SUPABASE_URL = 'https://fvknconcssrfgyjayltg.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_EDBsjsQw0d3DGopWeLRldQ_JPL7zx-O';

// Initialize the Supabase client (requires the Supabase JS library to be
// loaded via <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>)
const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
