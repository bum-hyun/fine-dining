interface IPostReportPayload {
  user_id?: string;
  content: string;
}

interface IReport {
  id: string;
  content: string | null;
  user_id: string | null;
  created_at: string | null;
}
