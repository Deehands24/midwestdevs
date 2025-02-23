export interface ContactSubmission {
  id?: string;
  name: string;
  email: string;
  message: string;
  service_type: 'brandDevelopment' | 'webDevelopment' | 'digitalMarketing' | 'consultation';
  created_at?: string;
}

export interface ServiceInquiry {
  id?: string;
  service_type: string;
  details: string;
  status: 'pending' | 'contacted' | 'in_progress' | 'completed';
  created_at?: string;
} 