import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://lgwaedkorzzovbsyllzp.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxnd2FlZGtvcnp6b3Zic3lsbHpwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODYxOTA5MDYsImV4cCI6MjEwMTc2NjkwNn0.cKeAS0FBNVwBTR2XVUQweBKAv0gk878q5ar4fuWj6AE";

export const supabase = createClient(supabaseUrl, supabaseKey);