"use server";

/**
 * Supabase Client Configuration
 * External layer for database connection and client setup
 */
import { Database } from "@/lib/external/supabase/types/database";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing Supabase environment variables");
}

// Create the client instance
const _supabaseClient = createClient<Database>(supabaseUrl, supabaseAnonKey);

export const supabase = _supabaseClient;
