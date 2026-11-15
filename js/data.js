/* ==========================================================================
   NATIONAL TESTING SERVICE - PAKISTAN (NTS™) - MOCK DATABASE & RECORDS
   ========================================================================== */

const ntsData = {
    // Current Open Applications & Testing Projects
    projects: [
        {
            code: "NTS-NAT-2026-II",
            title: "National Aptitude Test (NAT™ 2026-II)",
            org: "National Testing Service - Associated Universities",
            category: "Admission",
            categoryLabel: "Admissions (NAT)",
            lastDate: "28 Feb 2026",
            testDate: "15 Mar 2026",
            fee: "Rs. 1,000/- (Via 1Bill)",
            eligibility: "12 Years of Education (Intermediate / HSSC / A-Levels or equivalent)",
            positions: [
                "NAT-IE (Pre-Engineering Group)",
                "NAT-IM (Pre-Medical Group)",
                "NAT-IA (Arts / Humanities Group)",
                "NAT-ICS (Computer Science Group)",
                "NAT-IGS (General Science Group)",
                "NAT-ICOM (Commerce Group)"
            ],
            instructions: "Online registration open. Apply via candidate portal. The test score is valid for 1 full year for undergraduate admissions across 40+ leading public and private Pakistani universities."
        },
        {
            code: "NTS-GAT-2026-II",
            title: "Graduate Assessment Test (GAT™ - General 2026-II)",
            org: "National Testing Service - Higher Education Commission (HEC)",
            category: "Admission",
            categoryLabel: "Admissions (GAT)",
            lastDate: "10 Feb 2026",
            testDate: "01 Mar 2026",
            fee: "Rs. 1,350/- (Via 1Bill)",
            eligibility: "16 Years of Education (BS / M.Sc / M.A or 4-Year Bachelor's Degree)",
            positions: [
                "GAT-A: Business & Engineering Students",
                "GAT-B: Arts, Humanities & Social Sciences",
                "GAT-C: Agriculture, Veterinary, Biological & Medical Sciences",
                "GAT-D: Religious Studies / Madaris Candidates"
            ],
            instructions: "Mandatory for admissions in MS / M.Phil programs and HEC Indigenous & Overseas scholarship schemes. Score validity is 2 years."
        },
        {
            code: "NTS-GAT-SUB-2026",
            title: "Graduate Assessment Test (GAT™ - Subject 2026-II)",
            org: "National Testing Service - Higher Education Commission (HEC)",
            category: "Admission",
            categoryLabel: "Admissions (GAT Subject)",
            lastDate: "10 Feb 2026",
            testDate: "01 Mar 2026",
            fee: "Rs. 1,800/- (Via 1Bill)",
            eligibility: "18 Years of Education (MS / M.Phil with minimum 3.0 CGPA)",
            positions: [
                "Ph.D Computer Science & Software Engineering",
                "Ph.D Electrical & Electronics Engineering",
                "Ph.D Management Sciences & Economics",
                "Ph.D Physics, Chemistry & Mathematics",
                "Ph.D Biosciences, Biotechnology & Pharmacy"
            ],
            instructions: "Compulsory for admission into Ph.D programs across Pakistani universities. Paper comprises 70% subject specialization and 30% general analytical skills."
        },
        {
            code: "FBR-INSP-2026",
            title: "Federal Board of Revenue - Inspector Inland Revenue (BS-16)",
            org: "Revenue Division, Government of Pakistan",
            category: "Recruitment",
            categoryLabel: "Federal Recruitment",
            lastDate: "20 Feb 2026",
            testDate: "08 Mar 2026",
            fee: "Rs. 650/- (Via 1Bill)",
            eligibility: "Second Class or Grade 'C' Bachelor's Degree in Economics/Business Administration/Commerce/Statistics/Law/Computer Science.",
            positions: [
                "Inspector Inland Revenue (BS-16) - 492 Posts (All Pakistan Merit, Punjab, Sindh, KPK, Balochistan, AJK, GB quotas)"
            ],
            instructions: "Applicants must apply online. Test syllabus consists of English (20%), Current Affairs/Pak Studies (20%), Basic Arithmetic (20%), and Fiscal Laws/Income Tax Ordinance 2001 (40%)."
        },
        {
            code: "WAPDA-ENGR-2026",
            title: "WAPDA - Recruitment of Junior Engineers & Officers (BPS-17)",
            org: "Water and Power Development Authority, Pakistan",
            category: "Recruitment",
            categoryLabel: "Autonomous Body",
            lastDate: "25 Feb 2026",
            testDate: "15 Mar 2026",
            fee: "Rs. 700/- (Via 1Bill)",
            eligibility: "B.Sc / BE in Civil, Electrical, or Mechanical Engineering registered with PEC with min 1st Division.",
            positions: [
                "Junior Engineer (Civil) BPS-17 - 120 Posts",
                "Junior Engineer (Electrical) BPS-17 - 85 Posts",
                "Junior Engineer (Mechanical) BPS-17 - 45 Posts",
                "Assistant Director (Accounts & Finance) BPS-17 - 18 Posts"
            ],
            instructions: "Selected engineers will be posted at mega hydro projects including Diamer Basha Dam, Dasu HPP, and Mohmand Dam."
        },
        {
            code: "OGDCL-TRAINEE-2026",
            title: "OGDCL - Trainee Engineers & Trainee Geologists Program 2026",
            org: "Oil & Gas Development Company Limited",
            category: "Recruitment",
            categoryLabel: "Corporate / Oil & Gas",
            lastDate: "05 Mar 2026",
            testDate: "22 Mar 2026",
            fee: "Rs. 800/- (Via 1Bill)",
            eligibility: "Fresh Engineering / Earth Sciences graduates with minimum 3.0 CGPA or 65% aggregate.",
            positions: [
                "Trainee Engineer (Petroleum)",
                "Trainee Engineer (Chemical)",
                "Trainee Engineer (Mechanical & Mechatronics)",
                "Trainee Geologist & Geophysicist"
            ],
            instructions: "Comprehensive 2-year on-job practical training program with monthly stipend followed by regular employment placement."
        },
        {
            code: "SELD-SINDH-PST",
            title: "School Education & Literacy Dept - Primary School Teachers (PST BPS-14)",
            org: "Government of Sindh, School Education Department",
            category: "Recruitment",
            categoryLabel: "Provincial Recruitment",
            lastDate: "18 Feb 2026",
            testDate: "08 Mar 2026",
            fee: "Rs. 500/- (Via 1Bill)",
            eligibility: "Graduate (14 Years of Education) with minimum 2nd Division from HEC recognized university.",
            positions: [
                "Primary School Teacher (PST BPS-14) - Male & Female (District-specific Taluka / Union Council quotas)"
            ],
            instructions: "Candidates must have permanent domicile of Sindh Province. Passing marks threshold is 55% as per recruitment policy."
        },
        {
            code: "HEC-LAW-GAT-2026",
            title: "Higher Education Commission - Law Graduate Assessment Test (Law-GAT™)",
            org: "Pakistan Bar Council & Higher Education Commission",
            category: "Admission",
            categoryLabel: "Professional Licensing",
            lastDate: "15 Feb 2026",
            testDate: "01 Mar 2026",
            fee: "Rs. 3,000/- (Via 1Bill)",
            eligibility: "LLB Degree (3 Years or 5 Years) from HEC recognized Pakistani or foreign law institution.",
            positions: [
                "Law-GAT Examination for enrollment as Advocate with Provincial Bar Councils"
            ],
            instructions: "Passing Law-GAT with 50% or higher is mandatory for law graduates to obtain enrollment license with any Provincial Bar Council."
        },
        {
            code: "SNGPL-MTO-2026",
            title: "SNGPL - Executive Management Trainees (Engineers & Finance)",
            org: "Sui Northern Gas Pipelines Limited",
            category: "Recruitment",
            categoryLabel: "Corporate Trainee",
            lastDate: "27 Feb 2026",
            testDate: "14 Mar 2026",
            fee: "Rs. 750/- (Via 1Bill)",
            eligibility: "BE/B.Sc Engineering, MBA / MS Finance / CA / ACCA with top academic standing.",
            positions: [
                "Executive Trainee (Civil / Mechanical / Chemical / Electrical)",
                "Executive Trainee (Finance, Audit & Accounts)",
                "Executive Trainee (Human Resources & Corporate Affairs)"
            ],
            instructions: "Competitive recruitment screening test covering technical subjects, quantitative analysis and IQ test battery."
        },
        {
            code: "PTA-AD-2026",
            title: "Pakistan Telecommunication Authority - Assistant Directors (BS-17)",
            org: "PTA Headquarters, Islamabad",
            category: "Recruitment",
            categoryLabel: "Regulatory Body",
            lastDate: "22 Feb 2026",
            testDate: "07 Mar 2026",
            fee: "Rs. 750/- (Via 1Bill)",
            eligibility: "BS / MS in Computer Science, Software Engineering, Telecommunications, or Information Security.",
            positions: [
                "Assistant Director (Cyber Security)",
                "Assistant Director (Telecom & Spectrum Allocation)",
                "Assistant Director (Licensing & Enforcement)"
            ],
            instructions: "Written screening test followed by technical interview and security clearance."
        },
        {
            code: "HEC-USAID-SCHOLAR",
            title: "HEC / USAID Merit & Needs-Based Scholarship Screening",
            org: "United States Agency for International Development & HEC",
            category: "Scholarship",
            categoryLabel: "Scholarship Program",
            lastDate: "05 Mar 2026",
            testDate: "29 Mar 2026",
            fee: "Rs. 0/- (Free of Cost - Sponsored)",
            eligibility: "Financially deserving students enrolled in undergraduate programs at partner universities.",
            positions: [
                "USAID Need-Based Undergraduate Scholarship (Full tuition fee waiver + monthly stipend)"
            ],
            instructions: "No testing fee required. 100% sponsored program. Shortlisted candidates are invited for financial assessment interview."
        },
        {
            code: "STATE-LIFE-MT-2026",
            title: "State Life Insurance Corporation - Management Trainees (BPS-17)",
            org: "State Life Insurance Corporation of Pakistan",
            category: "Recruitment",
            categoryLabel: "Financial / Insurance",
            lastDate: "28 Feb 2026",
            testDate: "15 Mar 2026",
            fee: "Rs. 600/- (Via 1Bill)",
            eligibility: "Master's or 4-Year Bachelor's in Business Administration, Mathematics, Statistics or Actuarial Science.",
            positions: [
                "Management Trainee Officer (Marketing)",
                "Management Trainee Officer (Underwriting & Claims)",
                "Management Trainee Officer (Actuarial & Risk)"
            ],
            instructions: "Dynamic careers in Pakistan's largest life insurance institution with attractive fringe benefits."
        }
    ],

    // Known Pre-loaded Mock Candidates (Any other CNIC entered will generate dynamic authentic data)
    candidates: {
        "61101-1234567-1": {
            cnic: "61101-1234567-1",
            rollNo: "NTS-2026-894120",
            name: "Muhammad Hamza Khan",
            fatherName: "Tariq Mahmood Khan",
            testName: "Graduate Assessment Test (GAT™ General 2026-I)",
            testCenter: "Islamabad Model College for Boys, Sector H-9, Islamabad",
            testDate: "Sunday, 18th January, 2026",
            reportingTime: "08:00 AM Sharp",
            testTime: "09:00 AM to 11:00 AM",
            scores: {
                verbal: { title: "Verbal Reasoning (English)", marks: 32, max: 40 },
                analytical: { title: "Analytical Reasoning", marks: 26, max: 30 },
                quantitative: { title: "Quantitative Reasoning", marks: 24, max: 30 },
                total: 82,
                maxTotal: 100,
                percentile: 94.65,
                status: "QUALIFIED / ELIGIBLE",
                validTill: "18th January, 2028"
            }
        },
        "37405-9876543-2": {
            cnic: "37405-9876543-2",
            rollNo: "NAT-2026-443219",
            name: "Syeda Fatima Bukhari",
            fatherName: "Syed Anwar Hussain",
            testName: "National Aptitude Test (NAT™-IE Pre-Engineering)",
            testCenter: "Govt. Post Graduate College for Women, 6th Road, Rawalpindi",
            testDate: "Sunday, 11th January, 2026",
            reportingTime: "08:15 AM Sharp",
            testTime: "09:00 AM to 11:00 AM",
            scores: {
                verbal: { title: "English Language", marks: 18, max: 20 },
                analytical: { title: "Analytical Ability", marks: 17, max: 20 },
                quantitative: { title: "Quantitative Ability", marks: 19, max: 20 },
                subject: { title: "Subject Core (Physics, Chem, Math)", marks: 28, max: 30 },
                total: 82,
                maxTotal: 90,
                percentile: 96.12,
                status: "QUALIFIED / ELIGIBLE",
                validTill: "11th January, 2027"
            }
        },
        "35202-5544332-1": {
            cnic: "35202-5544332-1",
            rollNo: "FBR-2026-109283",
            name: "Ali Raza Butt",
            fatherName: "Muhammad Aslam Butt",
            testName: "Federal Board of Revenue - Inspector Inland Revenue (BS-16)",
            testCenter: "Punjab University Examination Center, Wahdat Road, Lahore",
            testDate: "Sunday, 08th March, 2026",
            reportingTime: "08:30 AM Sharp",
            testTime: "09:30 AM to 11:30 AM",
            scores: {
                verbal: { title: "English", marks: 16, max: 20 },
                analytical: { title: "General Knowledge & Current Affairs", marks: 17, max: 20 },
                quantitative: { title: "Basic Arithmetic & Reasoning", marks: 15, max: 20 },
                subject: { title: "Fiscal Laws & Income Tax", marks: 31, max: 40 },
                total: 79,
                maxTotal: 100,
                percentile: 91.80,
                status: "SHORTLISTED FOR INTERVIEW",
                validTill: "Recruitment Cycle 2026"
            }
        }
    }
};

