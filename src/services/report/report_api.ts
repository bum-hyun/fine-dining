import { DATABASE_NAMES } from '@/constants/database';
import { ReportSchema, TReport } from '@/dto/report.dto';
import supabase from '@/utils/supabase/client';

const database = DATABASE_NAMES.REPORT;

export const getReports = async (): Promise<TReport[]> => {
  const { data, error } = await supabase.from(database).select('*');

  if (error || !data) {
    throw new Error(`GET Error: ${error.message}`);
  }

  return data.map((item) => ReportSchema.parse(item));
};

export const postReport = async (payload: IPostReportPayload) => {
  const { error } = await supabase.from(database).insert(payload);
  if (error) throw error;
};
