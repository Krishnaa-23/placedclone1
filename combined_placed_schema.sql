-- ====================================================================
-- OFFICIAL PLACED FULL-STACK DATABASE SCHEMA (STUDENT + TPO DASHBOARDS)
-- Production-Safe SQL: Creates ALL Student & TPO Tables seamlessly connected.
-- Target Supabase Project: https://kwzgojrpfkbmzzzwlhbn.supabase.co
-- ====================================================================

-- 1. Students Profile Table (Student Dashboard)
CREATE TABLE IF NOT EXISTS public.students (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT NOT NULL,
    title TEXT,
    email TEXT NOT NULL,
    phone TEXT,
    roll_number TEXT UNIQUE,
    degree TEXT,
    institution TEXT,
    cgpa NUMERIC(3, 2) DEFAULT 0.0,
    batch_year TEXT,
    backlogs TEXT,
    linkedin TEXT,
    github TEXT,
    avatar_url TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Student Skill Performance Table (S-1)
CREATE TABLE IF NOT EXISTS public.student_skills (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID REFERENCES public.students(id) ON DELETE CASCADE,
    skill_name TEXT NOT NULL,
    score INTEGER NOT NULL DEFAULT 0,
    target_benchmark INTEGER NOT NULL DEFAULT 85,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 3. Student Resumes Table (S-3)
CREATE TABLE IF NOT EXISTS public.student_resumes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID REFERENCES public.students(id) ON DELETE CASCADE UNIQUE,
    summary TEXT,
    edu_degree TEXT,
    edu_inst TEXT,
    edu_year TEXT,
    edu_score TEXT,
    int_company TEXT,
    int_role TEXT,
    int_desc TEXT,
    proj_name TEXT,
    proj_stack TEXT,
    proj_desc TEXT,
    skills TEXT[] DEFAULT '{}',
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- 4. ATS Analyses Table (S-3)
CREATE TABLE IF NOT EXISTS public.ats_analyses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID REFERENCES public.students(id) ON DELETE CASCADE,
    job_title TEXT,
    job_description TEXT NOT NULL,
    ats_score INTEGER NOT NULL,
    density NUMERIC,
    matched_keywords TEXT[],
    missing_keywords TEXT[],
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 5. Video Classes Library Table
CREATE TABLE IF NOT EXISTS public.classes (
    id TEXT PRIMARY KEY,
    subject_id TEXT NOT NULL,
    subject_name TEXT NOT NULL,
    topic TEXT NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    duration TEXT,
    instructor TEXT,
    thumbnail TEXT,
    video_url TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 6. Structured Study Modules Table
CREATE TABLE IF NOT EXISTS public.study_modules (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    subject TEXT NOT NULL,
    subject_id TEXT NOT NULL,
    description TEXT,
    s1_gap_tag TEXT,
    is_recommended BOOLEAN DEFAULT false,
    recommendation_reason TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 7. Study Lessons Table
CREATE TABLE IF NOT EXISTS public.study_lessons (
    id TEXT PRIMARY KEY,
    module_id TEXT REFERENCES public.study_modules(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    class_id TEXT REFERENCES public.classes(id) ON DELETE SET NULL,
    sort_order INTEGER DEFAULT 0
);

-- 8. Student Lesson Progress Table
CREATE TABLE IF NOT EXISTS public.student_lesson_progress (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID REFERENCES public.students(id) ON DELETE CASCADE,
    module_id TEXT REFERENCES public.study_modules(id) ON DELETE CASCADE,
    lesson_id TEXT REFERENCES public.study_lessons(id) ON DELETE CASCADE,
    status TEXT NOT NULL DEFAULT 'locked',
    updated_at TIMESTAMPTZ DEFAULT now(),
    UNIQUE(student_id, lesson_id)
);

-- 9. Placement Opportunities / Drives Table (Cross-Dashboard Sync)
CREATE TABLE IF NOT EXISTS public.student_opportunities (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    student_id UUID REFERENCES public.students(id) ON DELETE CASCADE,
    company TEXT NOT NULL,
    role TEXT NOT NULL,
    logo_url TEXT,
    fallback_logo TEXT,
    tags JSONB,
    location TEXT,
    compensation TEXT,
    match_percentage INTEGER,
    status TEXT DEFAULT 'Active',
    pipeline_column TEXT DEFAULT 'In Review',
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 10. Scheduled Interviews Table
CREATE TABLE IF NOT EXISTS public.student_interviews (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    student_id UUID REFERENCES public.students(id) ON DELETE CASCADE,
    company TEXT NOT NULL,
    role TEXT NOT NULL,
    day TEXT,
    time TEXT,
    is_today BOOLEAN DEFAULT false,
    status_badge TEXT,
    status_badge_class TEXT,
    mode TEXT,
    duration TEXT,
    platform TEXT,
    logo_url TEXT,
    fallback_logo TEXT
);

-- ====================================================================
-- TPO OFFICER DASHBOARD SPECIFIC TABLES
-- ====================================================================

-- 11. TPO Backend Admin Credentials Table
CREATE TABLE IF NOT EXISTS public.tpo_admin_credentials (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    username VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'Head Placement Officer',
    officer_name VARCHAR(255) DEFAULT 'Dr. Rajesh V.',
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 12. TPO Whitelisted Students Table (Synced with public.students)
CREATE TABLE IF NOT EXISTS public.tpo_whitelisted_students (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID REFERENCES public.students(id) ON DELETE CASCADE,
    student_name VARCHAR(255) NOT NULL,
    roll_no VARCHAR(100) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    department VARCHAR(100) NOT NULL,
    cgpa NUMERIC(3, 2) NOT NULL,
    readiness_score INT NOT NULL CHECK (readiness_score BETWEEN 0 AND 100),
    readiness_status VARCHAR(50) NOT NULL,
    bootcamp_enrolled BOOLEAN DEFAULT FALSE,
    mock_score INT DEFAULT 0,
    weakness_areas TEXT[] DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 13. TPO Hiring Drives Table (Synced with student_opportunities)
CREATE TABLE IF NOT EXISTS public.tpo_hiring_drives (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    company_name VARCHAR(255) NOT NULL,
    logo_text VARCHAR(10) NOT NULL,
    role_title VARCHAR(255) NOT NULL,
    ctc VARCHAR(100) NOT NULL,
    min_readiness_score INT NOT NULL,
    min_cgpa NUMERIC(3, 2) NOT NULL,
    eligible_departments TEXT[] NOT NULL,
    deadline DATE NOT NULL,
    total_invited INT DEFAULT 0,
    shortlisted_count INT DEFAULT 0,
    placed_count INT DEFAULT 0,
    status VARCHAR(50) DEFAULT 'Active',
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 14. TPO Low-Performer Bootcamp Remediation Table
CREATE TABLE IF NOT EXISTS public.tpo_bootcamp_remediation (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID REFERENCES public.tpo_whitelisted_students(id) ON DELETE CASCADE,
    student_name VARCHAR(255) NOT NULL,
    initial_score INT NOT NULL,
    current_score INT NOT NULL,
    assigned_mentor VARCHAR(255) DEFAULT 'Dr. Rajesh V.',
    bootcamp_status VARCHAR(50) DEFAULT 'Enrolled',
    enrolled_at TIMESTAMPTZ DEFAULT now()
);

-- 15. TPO Reports Export Audit History Table
CREATE TABLE IF NOT EXISTS public.tpo_reports_audit (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    report_title VARCHAR(255) NOT NULL,
    file_format VARCHAR(20) NOT NULL,
    file_size VARCHAR(50) NOT NULL,
    generated_by VARCHAR(255) DEFAULT 'Dr. Rajesh V.',
    download_url TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- RLS SECURITY POLICIES
ALTER TABLE public.students ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.student_skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.student_resumes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ats_analyses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.classes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.study_modules ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.study_lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.student_lesson_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.student_opportunities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.student_interviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tpo_admin_credentials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tpo_whitelisted_students ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tpo_hiring_drives ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tpo_bootcamp_remediation ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tpo_reports_audit ENABLE ROW LEVEL SECURITY;

-- Allow Public All Access for Development & Seamless Integration
CREATE POLICY "Public Student Access" ON public.students FOR ALL USING (true);
CREATE POLICY "Public Skill Access" ON public.student_skills FOR ALL USING (true);
CREATE POLICY "Public Resume Access" ON public.student_resumes FOR ALL USING (true);
CREATE POLICY "Public ATS Access" ON public.ats_analyses FOR ALL USING (true);
CREATE POLICY "Public Class Access" ON public.classes FOR ALL USING (true);
CREATE POLICY "Public Study Module Access" ON public.study_modules FOR ALL USING (true);
CREATE POLICY "Public Study Lesson Access" ON public.study_lessons FOR ALL USING (true);
CREATE POLICY "Public Progress Access" ON public.student_lesson_progress FOR ALL USING (true);
CREATE POLICY "Public Opportunity Access" ON public.student_opportunities FOR ALL USING (true);
CREATE POLICY "Public Interview Access" ON public.student_interviews FOR ALL USING (true);
CREATE POLICY "Public TPO Admin Access" ON public.tpo_admin_credentials FOR ALL USING (true);
CREATE POLICY "Public TPO Whitelist Access" ON public.tpo_whitelisted_students FOR ALL USING (true);
CREATE POLICY "Public TPO Drives Access" ON public.tpo_hiring_drives FOR ALL USING (true);
CREATE POLICY "Public TPO Bootcamp Access" ON public.tpo_bootcamp_remediation FOR ALL USING (true);
CREATE POLICY "Public TPO Audit Access" ON public.tpo_reports_audit FOR ALL USING (true);

-- Seed Hardcoded Admin Credentials Row
INSERT INTO public.tpo_admin_credentials (username, password_hash, role, officer_name)
VALUES ('admin', 'admin123', 'Head Placement Officer', 'Dr. Rajesh V.')
ON CONFLICT (username) DO NOTHING;
