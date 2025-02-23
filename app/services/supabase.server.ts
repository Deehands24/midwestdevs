import { supabase } from '~/lib/supabase';
import type { ContactSubmission, ServiceInquiry } from '~/types';

export async function submitContactForm(submission: Omit<ContactSubmission, 'id' | 'created_at'>) {
  const { data, error } = await supabase
    .from('contact_submissions')
    .insert([submission])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function createServiceInquiry(inquiry: Omit<ServiceInquiry, 'id' | 'created_at'>) {
  const { data, error } = await supabase
    .from('service_inquiries')
    .insert([inquiry])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function getServiceInquiries() {
  const { data, error } = await supabase
    .from('service_inquiries')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}

export async function updateServiceInquiryStatus(id: string, status: ServiceInquiry['status']) {
  const { data, error } = await supabase
    .from('service_inquiries')
    .update({ status })
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
} 