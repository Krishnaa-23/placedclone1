export interface Student {
  id: string
  name: string
  rollNo: string
  department: 'Computer Science' | 'Information Technology' | 'Electronics' | 'Mechanical' | 'Electrical'
  cgpa: number
  mockScore: number
  readinessScore: number
  readinessStatus: 'Super Coder' | 'Interview Ready' | 'Moderate' | 'At Risk'
  whitelisted: boolean
  accessStatus: 'Active' | 'Pending Verification' | 'Blocked'
  bootcampEnrolled: boolean
  appliedDrivesCount: number
  avatarUrl: string
  email: string
  skills: string[]
  weaknessAreas: string[]
}

export interface Drive {
  id: string
  companyName: string
  logoText: string
  logoBg: string
  roleTitle: string
  ctc: string
  minReadinessScore: number
  minCgpa: number
  eligibleDepts: string[]
  deadline: string
  totalInvited: number
  shortlistedCount: number
  placedCount: number
  status: 'Active' | 'Upcoming' | 'Completed'
}

// ZERO MOCK DATA - STRICTLY POPULATED VIA SUPABASE BACKEND QUERIES
export const INITIAL_STUDENTS: Student[] = []
export const INITIAL_DRIVES: Drive[] = []
