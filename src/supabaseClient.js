import { createClient } from "@supabase/supabase-js";




const supabaseUrl = "https://ljuhdlivvdanqobxvjqn.supabase.co"; // Replace with your Supabase URL
const apikey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxqdWhkbGl2dmRhbnFvYnh2anFuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzc1MDE2NjMsImV4cCI6MjA1MzA3NzY2M30.utULF01oiL3lCF-VEq3sMuD2dTEflzq6mESZ45Mut5Y"; // Replace with your Supabase Anon Key

console.log("SUPABASE_URL:", supabaseUrl);
console.log("SUPABASE_ANON_KEY:", apikey);

  export const supabase = createClient(supabaseUrl, apikey);
