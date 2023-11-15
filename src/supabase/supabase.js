import '@esbuild-plugins/node-globals-polyfill';
import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
    'https://lgtgipbjjgksrudabmpe.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxndGdpcGJqamdrc3J1ZGFibXBlIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTg2OTY0MjcsImV4cCI6MjAxNDI3MjQyN30.KPl1HtjHClLKxJkCIMfLD4IvKpwMA0CUoeAy0ZNhopY'
);
