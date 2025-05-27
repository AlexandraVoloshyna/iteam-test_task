'use client';

import { useLocalStorage } from './useLocalStorage';
import { Job } from '@/types';


export function useLikedJobs() {
  const [likedJobs, setLikedJobs] = useLocalStorage<Job[]>('likedJobs', []);

 
  const addLikedJob = (job: Job) => {
    setLikedJobs((prev) => {
      
      const exists = prev.some((j) => j.job_id === job.job_id);
      if (exists) {
        return prev;
      }
      return [...prev, job];
    });
  };

  
  const removeLikedJob = (jobId: string) => {
    setLikedJobs((prev) => prev.filter((job) => job.job_id !== jobId));
  };


  const isJobLiked = (jobId: string) => {
    return likedJobs.some((job) => job.job_id === jobId);
  };

  
  const toggleLikedJob = (job: Job) => {
    if (isJobLiked(job.job_id)) {
      removeLikedJob(job.job_id);
    } else {
      addLikedJob(job);
    }
  };

  return {
    likedJobs,
    addLikedJob,
    removeLikedJob,
    isJobLiked,
    toggleLikedJob,
  };
} 