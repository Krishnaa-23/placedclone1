-- ==============================================================================
-- PLACED TPO DASHBOARD - FULL-STACK BACKEND SUPABASE DATABASE SCHEMA & SEED
-- Project URL: https://kwzgojrpfkbmzzzwlhbn.supabase.co
-- ==============================================================================
-- IMPORTANT NOTE FROM GUIDE:
-- These are 100% NEW tables created specifically for the TPO Module.
-- NO existing production tables or schemas are modified, altered, or deleted!
-- ==============================================================================

-- 0. NEW TABLE: TPO Backend Admin Credentials (HARDCODED AUTH)
CREATE TABLE IF NOT EXISTS tpo_admin_credentials (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    username VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'Head Placement Officer',
    officer_name VARCHAR(255) DEFAULT 'Dr. Rajesh V.',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 1. NEW TABLE: TPO Whitelisted Students (Synced with Student Dashboard Mock Scores)
CREATE TABLE IF NOT EXISTS tpo_whitelisted_students (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_name VARCHAR(255) NOT NULL,
    roll_no VARCHAR(100) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    department VARCHAR(100) NOT NULL,
    cgpa NUMERIC(3, 2) NOT NULL,
    readiness_score INT NOT NULL CHECK (readiness_score BETWEEN 0 AND 100),
    readiness_status VARCHAR(50) NOT NULL, -- 'Super Coder', 'Interview Ready', 'Moderate', 'At Risk'
    bootcamp_enrolled BOOLEAN DEFAULT FALSE,
    mock_score INT DEFAULT 0,
    weakness_areas TEXT[] DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. NEW TABLE: TPO Hiring Drives (Visible in Student Dashboard)
CREATE TABLE IF NOT EXISTS tpo_hiring_drives (
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
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. NEW TABLE: TPO Low-Performer Bootcamp Remediation
CREATE TABLE IF NOT EXISTS tpo_bootcamp_remediation (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID REFERENCES tpo_whitelisted_students(id) ON DELETE CASCADE,
    student_name VARCHAR(255) NOT NULL,
    initial_score INT NOT NULL,
    current_score INT NOT NULL,
    assigned_mentor VARCHAR(255) DEFAULT 'Dr. Rajesh V.',
    bootcamp_status VARCHAR(50) DEFAULT 'Enrolled',
    enrolled_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. NEW TABLE: TPO Reports Export Audit History
CREATE TABLE IF NOT EXISTS tpo_reports_audit (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    report_title VARCHAR(255) NOT NULL,
    file_format VARCHAR(20) NOT NULL, -- 'PDF', 'CSV'
    file_size VARCHAR(50) NOT NULL,
    generated_by VARCHAR(255) DEFAULT 'Dr. Rajesh V.',
    download_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security (RLS) on all new TPO tables
ALTER TABLE tpo_admin_credentials ENABLE ROW LEVEL SECURITY;
ALTER TABLE tpo_whitelisted_students ENABLE ROW LEVEL SECURITY;
ALTER TABLE tpo_hiring_drives ENABLE ROW LEVEL SECURITY;
ALTER TABLE tpo_bootcamp_remediation ENABLE ROW LEVEL SECURITY;
ALTER TABLE tpo_reports_audit ENABLE ROW LEVEL SECURITY;

-- Allow read/write access policies
CREATE POLICY "Allow public all access on tpo_admin_credentials" ON tpo_admin_credentials FOR ALL USING (true);
CREATE POLICY "Allow public all access on tpo_whitelisted_students" ON tpo_whitelisted_students FOR ALL USING (true);
CREATE POLICY "Allow public all access on tpo_hiring_drives" ON tpo_hiring_drives FOR ALL USING (true);
CREATE POLICY "Allow public all access on tpo_bootcamp_remediation" ON tpo_bootcamp_remediation FOR ALL USING (true);
CREATE POLICY "Allow public all access on tpo_reports_audit" ON tpo_reports_audit FOR ALL USING (true);

-- ==============================================================================
-- INITIAL SEED DATA INSERTION
-- ==============================================================================

-- 1. Seed Hardcoded Admin Credentials
INSERT INTO tpo_admin_credentials (username, password_hash, role, officer_name)
VALUES ('admin', 'admin123', 'Head Placement Officer', 'Dr. Rajesh V.')
ON CONFLICT (username) DO NOTHING;

-- 2. Seed Whitelisted Students (Connected with Student Dashboard Mock Scores)
INSERT INTO tpo_whitelisted_students (student_name, roll_no, email, department, cgpa, readiness_score, readiness_status, bootcamp_enrolled, mock_score, weakness_areas)
VALUES 
('Aarav Sharma', '2022CS104', 'aarav.sharma@stxaviers.edu', 'Computer Science', 8.9, 96, 'Super Coder', false, 96, ARRAY['Dynamic Programming']),
('Priya Nair', '2022CS215', 'priya.nair@stxaviers.edu', 'Computer Science', 9.2, 98, 'Super Coder', false, 98, ARRAY['System Design']),
('Sneha Reddy', '2022CS301', 'sneha.r@stxaviers.edu', 'Computer Science', 8.7, 91, 'Super Coder', false, 91, ARRAY['Tree Traversals']),
('Rohan Verma', '2022IT108', 'rohan.v@stxaviers.edu', 'Information Technology', 7.8, 64, 'Interview Ready', false, 68, ARRAY['DBMS Indexing', 'OS Concurrency']),
('Siddharth Rao', '2022EC142', 'siddharth.r@stxaviers.edu', 'Electronics', 6.9, 44, 'At Risk', false, 42, ARRAY['Graph Algorithms', 'Aptitude Time & Work']),
('Kavya Nair', '2022ME088', 'kavya.n@stxaviers.edu', 'Mechanical', 6.4, 38, 'At Risk', false, 38, ARRAY['Data Structures', 'Logical Reasoning'])
ON CONFLICT (roll_no) DO NOTHING;

-- 3. Seed Active Hiring Drives (Visible in Student Dashboard)
INSERT INTO tpo_hiring_drives (company_name, logo_text, role_title, ctc, min_readiness_score, min_cgpa, eligible_departments, deadline, total_invited, shortlisted_count, placed_count, status)
VALUES
('TCS Digital', 'TCS', 'System Engineer Specialist', '₹9.0 LPA', 60, 6.5, ARRAY['Computer Science', 'Information Technology', 'Electronics'], '2026-09-15', 380, 45, 12, 'Active'),
('Amazon Web Services', 'AWS', 'Cloud Solution Engineer', '₹28.0 LPA', 80, 7.5, ARRAY['Computer Science', 'Information Technology'], '2026-09-30', 140, 18, 5, 'Active'),
('Goldman Sachs', 'GS', 'Software Analyst', '₹24.0 LPA', 85, 8.0, ARRAY['Computer Science', 'Information Technology', 'Electronics'], '2026-10-05', 95, 12, 3, 'Active'),
('Infosys', 'INF', 'Software Developer', '₹12.0 LPA', 64, 6.5, ARRAY['Computer Science', 'Information Technology'], '2026-09-20', 70, 0, 0, 'Active')
ON CONFLICT DO NOTHING;
