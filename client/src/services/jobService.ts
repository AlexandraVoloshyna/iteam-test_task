import rapidApiInstance from '@/lib/axios';
import { Job } from '@/types';

export interface JobSearchResponse {
  data: Job[];
  status: string;
}

export interface JobDetailsResponse {
  data: Job[];
  status: string;
}

export const searchJobs = async (query: string, page: number = 1, num_pages: number = 1): Promise<JobSearchResponse> => {
  try {
    const response = await rapidApiInstance.get('/search', {
      params: {
        query,
        page: page.toString(),
        num_pages: num_pages.toString(),
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error searching jobs:', error);
    throw error;
  }
};


export const getJobDetails = async (jobId: string): Promise<JobDetailsResponse> => {
  try {
    const response = await rapidApiInstance.get('/job-details', {
      params: {
        job_id: jobId,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error getting job details:', error);
    throw error;
  }
};

export const getJobRecommendations = async (jobTitle: string, page: number = 1, num_pages: number = 1): Promise<JobSearchResponse> => {
  try {
    const response = await rapidApiInstance.get('/search', {
      params: {
        query: jobTitle,
        page: page.toString(),
        num_pages: num_pages.toString(),
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error getting job recommendations:', error);
    throw error;
  }
}; 