import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://bbcprcrjaxmudkhtxpnr.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJiY3ByY3JqYXhtdWRraHR4cG5yIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTgyNjA0ODIsImV4cCI6MjAxMzgzNjQ4Mn0.YUb1H_4eUnu5LKSCQVsG-ITTR4rOyTsFSgPSoqJ2mp8";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
