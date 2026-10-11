import { TeamId } from '../types/game';

export interface BankQuestion {
  id: string;
  teamId: TeamId;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
  question: string;
  options: [string, string, string, string];
  correctAnswer: number; // 0-3
  explanation: string;
}

export const QUESTION_BANK: BankQuestion[] = [
  {
    "id": "hr_01",
    "teamId": "HR",
    "category": "Metrics & Calculations",
    "difficulty": "medium",
    "question": "A company started the year with 200 employees and ended with 220. During the year, 21 employees left voluntarily. What was the annual employee turnover rate?",
    "options": [
      "10.0%",
      "9.5%",
      "10.5%",
      "12.0%"
    ],
    "correctAnswer": 0,
    "explanation": "Turnover Rate = (Number of Separations / Average Employees) * 100. Average employees = (200 + 220) / 2 = 210. (21 / 210) * 100 = 10.0%."
  },
  {
    "id": "hr_02",
    "teamId": "HR",
    "category": "Talent Acquisition",
    "difficulty": "easy",
    "question": "In recruiting, what does Cost-Per-Hire (CPH) primarily include?",
    "options": [
      "Only the signing bonus paid to the selected candidate",
      "Both internal recruiting costs and external costs divided by total hires",
      "The first year base salary of the new employee",
      "Only third-party agency fees and job board invoice totals"
    ],
    "correctAnswer": 1,
    "explanation": "Standard SHRM CPH formula sums internal costs (recruiter salaries, talent software) and external costs (agencies, advertising) divided by total number of hires."
  },
  {
    "id": "hr_03",
    "teamId": "HR",
    "category": "Compensation & Benefits",
    "difficulty": "hard",
    "question": "An employee's base salary is $80,000, and the midpoint of the market salary band for that role is $100,000. What is this employee's compa-ratio?",
    "options": [
      "1.25",
      "0.75",
      "0.80",
      "0.90"
    ],
    "correctAnswer": 2,
    "explanation": "Compa-ratio = (Employee Salary / Midpoint Salary) = 80,000 / 100,000 = 0.80 (or 80%)."
  },
  {
    "id": "hr_04",
    "teamId": "HR",
    "category": "Performance Management",
    "difficulty": "medium",
    "question": "What is the primary benefit of a 360-degree performance feedback review compared to a traditional manager review?",
    "options": [
      "It eliminates the need for objective performance metrics",
      "It guarantees salary increases based on numerical averages",
      "It reduces administrative paperwork for the HR department",
      "It gathers multi-rater perspectives from peers, subordinates, and supervisors"
    ],
    "correctAnswer": 3,
    "explanation": "360-degree feedback gathers holistic input from peers, direct reports, customers, and managers to reduce single-source bias."
  },
  {
    "id": "hr_05",
    "teamId": "HR",
    "category": "Conflict Resolution",
    "difficulty": "medium",
    "question": "According to the Thomas-Kilmann Conflict Mode Instrument, which style is characterized by high assertiveness and high cooperativeness?",
    "options": [
      "Collaborating",
      "Competing",
      "Avoiding",
      "Accommodating"
    ],
    "correctAnswer": 0,
    "explanation": "Collaborating (Win-Win) represents high assertiveness (satisfying own concerns) and high cooperativeness (satisfying others' concerns)."
  },
  {
    "id": "hr_06",
    "teamId": "HR",
    "category": "Legal & Compliance",
    "difficulty": "medium",
    "question": "Under the US Fair Labor Standards Act (FLSA), which of the following is a key criterion for an employee to be classified as exempt from overtime?",
    "options": [
      "Working more than 50 hours per week consistently",
      "Meeting the salary basis test and specific executive, administrative, or professional duties test",
      "Having an annual contract rather than hourly timesheets",
      "Agreeing in writing to waive overtime compensation"
    ],
    "correctAnswer": 1,
    "explanation": "Exemption under FLSA requires satisfying both the minimum salary threshold and the legal duties test."
  },
  {
    "id": "hr_07",
    "teamId": "HR",
    "category": "Training & Development",
    "difficulty": "hard",
    "question": "In the Kirkpatrick Evaluation Model, Level 4 evaluates which dimension of training effectiveness?",
    "options": [
      "Participant Reaction",
      "Knowledge Learning",
      "Target Business Results",
      "Behavioral Transfer"
    ],
    "correctAnswer": 2,
    "explanation": "The 4 Kirkpatrick levels are: Level 1 Reaction, Level 2 Learning, Level 3 Behavior, and Level 4 Results (business impact)."
  },
  {
    "id": "hr_08",
    "teamId": "HR",
    "category": "Workforce Planning",
    "difficulty": "medium",
    "question": "A department anticipates 15% annual attrition and plans to expand headcount from 100 to 120 next year. How many people must HR hire during the year?",
    "options": [
      "20",
      "30",
      "38",
      "35"
    ],
    "correctAnswer": 3,
    "explanation": "Attrition replacement = 15% of 100 = 15. Headcount expansion = 120 - 100 = 20. Total hires needed = 15 + 20 = 35."
  },
  {
    "id": "hr_09",
    "teamId": "HR",
    "category": "Retention & Engagement",
    "difficulty": "easy",
    "question": "What metric is calculated by subtracting the percentage of detractors from the percentage of promoters on an internal survey?",
    "options": [
      "Employee Net Promoter Score (eNPS)",
      "Employee Engagement Index (EEI)",
      "Job Satisfaction Ratio (JSR)",
      "Human Capital ROI (HC-ROI)"
    ],
    "correctAnswer": 0,
    "explanation": "eNPS = % Promoters (score 9-10) minus % Detractors (score 0-6)."
  },
  {
    "id": "hr_10",
    "teamId": "HR",
    "category": "Employee Relations",
    "difficulty": "hard",
    "question": "What is the primary objective of a Performance Improvement Plan (PIP)?",
    "options": [
      "To accelerate immediate termination without legal liability",
      "To provide clear, measurable benchmarks and support for an underperforming employee to meet standards",
      "To reduce the employee's compensation tier automatically",
      "To transfer the employee to a different department"
    ],
    "correctAnswer": 1,
    "explanation": "A PIP documents deficiencies, provides an actionable timeline with measurable milestones, and gives the employee structured support to succeed."
  },
  {
    "id": "hr_11",
    "teamId": "HR",
    "category": "Talent Acquisition",
    "difficulty": "medium",
    "question": "If 500 candidates applied, 50 were selected for phone screens, 10 reached final interviews, and 2 received offers, what is the interview-to-offer yield ratio?",
    "options": [
      "4%",
      "10%",
      "20%",
      "2%"
    ],
    "correctAnswer": 2,
    "explanation": "Yield ratio from final interview to offer = (2 offers / 10 interviews) * 100 = 20%."
  },
  {
    "id": "hr_12",
    "teamId": "HR",
    "category": "Organizational Design",
    "difficulty": "medium",
    "question": "What does the term 'Span of Control' refer to in organizational structure?",
    "options": [
      "The total geographic regions a company operates within",
      "The duration of an executive's employment contract",
      "The percentage of equity held by board members",
      "The number of subordinates directly reporting to a single manager"
    ],
    "correctAnswer": 3,
    "explanation": "Span of control defines the number of direct reports managed by a specific leader or supervisor."
  },
  {
    "id": "hr_13",
    "teamId": "HR",
    "category": "Legal & Compliance",
    "difficulty": "medium",
    "question": "Under the Americans with Disabilities Act (ADA), when is an employer required to provide a reasonable accommodation?",
    "options": [
      "When the employee has a qualified disability and the accommodation does not cause undue hardship",
      "Whenever requested, regardless of financial impact",
      "Only if the employee has been with the firm for over five years",
      "Only for physical workplace modifications, not schedule adjustments"
    ],
    "correctAnswer": 0,
    "explanation": "Employers must accommodate qualified individuals with disabilities unless doing so would impose an 'undue hardship' on the business operations."
  },
  {
    "id": "hr_14",
    "teamId": "HR",
    "category": "Talent Management",
    "difficulty": "medium",
    "question": "In the 9-box talent matrix, what two dimensions are assessed on the X and Y axes?",
    "options": [
      "Salary and Years of Tenure",
      "Performance and Potential",
      "Technical Skills and Soft Skills",
      "Engagement and Attendance"
    ],
    "correctAnswer": 1,
    "explanation": "The 9-Box Grid maps employee Performance (Low, Medium, High) against Potential (Low, Medium, High) for succession planning."
  },
  {
    "id": "hr_15",
    "teamId": "HR",
    "category": "Compensation & Benefits",
    "difficulty": "hard",
    "question": "Which vesting schedule grants an employee zero equity until 1 year of service, followed by monthly vesting thereafter?",
    "options": [
      "Immediate full vesting",
      "Graded linear vesting without a cliff",
      "Four-year vesting with a one-year cliff",
      "Backloaded retention vesting"
    ],
    "correctAnswer": 2,
    "explanation": "A standard tech startup vesting schedule is 4 years with a 1-year cliff, where 25% vests at the 12-month mark and 1/48th monthly thereafter."
  },
  {
    "id": "hr_16",
    "teamId": "HR",
    "category": "Workplace Health & Safety",
    "difficulty": "easy",
    "question": "What is the primary role of an Ergonomic Assessment in office administration?",
    "options": [
      "To audit the air conditioning and utility electrical costs",
      "To track how many minutes employees spend away from their desks",
      "To calculate the fire exit evacuation capacity",
      "To optimize workstation setup and reduce musculoskeletal strain/injuries"
    ],
    "correctAnswer": 3,
    "explanation": "Ergonomics evaluates physical work environments to minimize physical fatigue, repetitive strain injury, and musculoskeletal disorders."
  },
  {
    "id": "hr_17",
    "teamId": "HR",
    "category": "Metrics & Calculations",
    "difficulty": "medium",
    "question": "A company spent $150,000 on recruiting expenses and hired 30 new staff members. What is their Cost-Per-Hire?",
    "options": [
      "$5,000",
      "$3,000",
      "$4,500",
      "$6,000"
    ],
    "correctAnswer": 0,
    "explanation": "Cost-Per-Hire = $150,000 / 30 hires = $5,000 per hire."
  },
  {
    "id": "hr_18",
    "teamId": "HR",
    "category": "Employee Relations",
    "difficulty": "hard",
    "question": "What is 'Constructive Dismissal' in employment law?",
    "options": [
      "Terminating an employee with a constructive and polite exit interview",
      "When an employer creates working conditions so intolerable that a reasonable employee feels forced to resign",
      "Downsizing an engineering division to reorganize office cubicles",
      "Laying off contract employees when a project deadline is met"
    ],
    "correctAnswer": 1,
    "explanation": "Constructive dismissal occurs when employer conduct breaches the employment contract or makes the workplace hostile, forcing the worker to quit."
  },
  {
    "id": "hr_19",
    "teamId": "HR",
    "category": "Strategic HR",
    "difficulty": "medium",
    "question": "What is the focus of Human Capital Management (HCM) compared to traditional personnel administration?",
    "options": [
      "Solely managing payroll taxes and timesheet stamping",
      "Enforcing strict punitive disciplinary procedures",
      "Treating employees as strategic assets whose development drives corporate value",
      "Outsourcing all hiring decisions to third-party headhunters"
    ],
    "correctAnswer": 2,
    "explanation": "HCM views employees as human capital and investments rather than overhead costs, prioritizing development, engagement, and alignment."
  },
  {
    "id": "hr_20",
    "teamId": "HR",
    "category": "Talent Acquisition",
    "difficulty": "easy",
    "question": "What is an Employer Value Proposition (EVP)?",
    "options": [
      "The monetary value of company stock options",
      "The legal terms in an employment NDA",
      "The minimum wage mandated by municipal law",
      "The unique set of offerings, culture, and benefits an organization provides in return for employee talents"
    ],
    "correctAnswer": 3,
    "explanation": "EVP defines why people should work for the company, balancing rewards, culture, opportunities, and purpose."
  },
  {
    "id": "hr_21",
    "teamId": "HR",
    "category": "Training & Development",
    "difficulty": "medium",
    "question": "According to the 70-20-10 learning framework, where should the 70% of professional learning come from?",
    "options": [
      "On-the-job experiential challenges and real work assignments",
      "Classroom seminars and academic textbooks",
      "Coaching, mentoring, and peer collaboration",
      "Online multiple-choice compliance testing"
    ],
    "correctAnswer": 0,
    "explanation": "The 70-20-10 model states 70% of learning happens through on-the-job experience, 20% through social coaching, and 10% through formal training."
  },
  {
    "id": "hr_22",
    "teamId": "HR",
    "category": "Performance Management",
    "difficulty": "easy",
    "question": "What does the SMART acronym stand for in performance goal setting?",
    "options": [
      "Simple, Meaningful, Actionable, Reliable, Timely",
      "Specific, Measurable, Achievable, Relevant, Time-bound",
      "Standard, Monitored, Approved, Realized, Tested",
      "Strategic, Metric-driven, Assigned, Reviewed, Targeted"
    ],
    "correctAnswer": 1,
    "explanation": "SMART goals are Specific, Measurable, Achievable, Relevant, and Time-bound."
  },
  {
    "id": "hr_23",
    "teamId": "HR",
    "category": "Compensation & Benefits",
    "difficulty": "hard",
    "question": "If a company has a pay band for senior analysts ranging from $70,000 to $110,000, what is the band spread percentage?",
    "options": [
      "36.3%",
      "40.0%",
      "57.1%",
      "50.0%"
    ],
    "correctAnswer": 2,
    "explanation": "Spread = (Maximum - Minimum) / Minimum = ($110,000 - $70,000) / $70,000 = $40,000 / $70,000 ≈ 57.14%."
  },
  {
    "id": "hr_24",
    "teamId": "HR",
    "category": "Legal & Compliance",
    "difficulty": "medium",
    "question": "What is 'Disparate Impact' under Title VII of the Civil Rights Act?",
    "options": [
      "Open, intentional discrimination against a protected class",
      "A dispute between two executives over promotion guidelines",
      "A legal dispute regarding intellectual property ownership",
      "An apparently neutral employment practice that disproportionately excludes a protected group without business necessity"
    ],
    "correctAnswer": 3,
    "explanation": "Disparate impact occurs when a facially neutral policy has an adverse impact on a protected class and is not job-related."
  },
  {
    "id": "hr_25",
    "teamId": "HR",
    "category": "Metrics & Calculations",
    "difficulty": "medium",
    "question": "If Time-to-Fill is 42 days and Time-to-Hire is 28 days, what accounts for the 14-day difference?",
    "options": [
      "The time between job requisition opening and when the candidate applied",
      "The duration of the candidate's probationary review",
      "The candidate's two-week notice at their previous employer",
      "The background check and onboarding orientation week"
    ],
    "correctAnswer": 0,
    "explanation": "Time-to-fill measures from job requisition approval to offer acceptance; time-to-hire measures from the candidate's application date to offer acceptance."
  },
  {
    "id": "hr_26",
    "teamId": "HR",
    "category": "Organizational Culture",
    "difficulty": "medium",
    "question": "What did Google's Project Aristotle discover was the number one factor in high-performing teams?",
    "options": [
      "Individual IQ and coding competition scores",
      "Psychological safety: team members feel safe taking risks and being vulnerable",
      "Colocated office seating arrangements",
      "High equity compensation incentives"
    ],
    "correctAnswer": 1,
    "explanation": "Psychological safety was found to be the single most critical predictor of team effectiveness in Google's Project Aristotle."
  },
  {
    "id": "hr_27",
    "teamId": "HR",
    "category": "Workforce Planning",
    "difficulty": "hard",
    "question": "What is the primary difference between replacement planning and succession planning?",
    "options": [
      "Replacement planning is only for hourly staff; succession planning is for interns",
      "Succession planning is handled by finance; replacement planning is handled by legal",
      "Replacement planning focuses on immediate backups for key roles; succession planning develops long-term talent capability across the organization",
      "Replacement planning requires board approval; succession planning does not"
    ],
    "correctAnswer": 2,
    "explanation": "Replacement planning identifies immediate 'in-case-of-emergency' stand-ins; succession planning is strategic talent development for future capability."
  },
  {
    "id": "hr_28",
    "teamId": "HR",
    "category": "Talent Acquisition",
    "difficulty": "easy",
    "question": "What type of interview question asks: 'Tell me about a time you had to handle an irate customer and how you resolved it'?",
    "options": [
      "Hypothetical",
      "Stress-test",
      "Technical syntax",
      "Behavioral"
    ],
    "correctAnswer": 3,
    "explanation": "Behavioral interview questions ask about past experiences on the premise that past behavior predicts future performance (STAR method)."
  },
  {
    "id": "hr_29",
    "teamId": "HR",
    "category": "Compensation & Benefits",
    "difficulty": "medium",
    "question": "What are golden handcuffs in corporate compensation?",
    "options": [
      "Financial incentives such as unvested stock options or deferred bonuses designed to encourage retention",
      "Legal penalties for violating non-compete agreements",
      "Excessive severance packages paid to departing executives",
      "Mandatory insurance deductions for high-risk workers"
    ],
    "correctAnswer": 0,
    "explanation": "Golden handcuffs refer to valuable incentives (deferred stock, retention bonuses) that encourage key talent to remain with the company."
  },
  {
    "id": "hr_30",
    "teamId": "HR",
    "category": "Employee Relations",
    "difficulty": "medium",
    "question": "What is the primary function of an Employee Assistance Program (EAP)?",
    "options": [
      "To handle formal union grievance filings and legal lawsuits",
      "To provide confidential counseling and support for personal and mental health issues affecting work life",
      "To approve quarterly overtime pay distributions",
      "To organize internal company marketing newsletters"
    ],
    "correctAnswer": 1,
    "explanation": "EAPs provide free, confidential counseling and assessment services for employees facing personal, family, or mental health challenges."
  },
  {
    "id": "hr_31",
    "teamId": "HR",
    "category": "Metrics & Calculations",
    "difficulty": "hard",
    "question": "A company with 500 employees generated $100M in revenue and had operating costs of $60M (excluding labor costs of $25M). What is the Human Capital Value Added (HCVA)?",
    "options": [
      "$300,000 per FTE",
      "$50,000 per FTE",
      "$80,000 per FTE",
      "$200,000 per FTE"
    ],
    "correctAnswer": 2,
    "explanation": "HCVA = [Revenue - (Total Expenses - Total Labor Costs)] / Total FTEs = [$100M - ($60M)] / 500 = $40M / 500 = $80,000 per FTE."
  },
  {
    "id": "hr_32",
    "teamId": "HR",
    "category": "Diversity, Equity & Inclusion",
    "difficulty": "medium",
    "question": "In recruitment, what is the 'Rooney Rule' concept adapted to corporate hiring?",
    "options": [
      "Capping executive compensation at 20 times the median employee salary",
      "Offering identical benefits to contract and full-time employees",
      "Mandating blind resume screening with names removed",
      "Requiring that at least one qualified underrepresented candidate is interviewed for senior open positions"
    ],
    "correctAnswer": 3,
    "explanation": "The Rooney Rule requires organizations to interview at least one qualified woman or minority candidate for open leadership positions."
  },
  {
    "id": "hr_33",
    "teamId": "HR",
    "category": "Legal & Compliance",
    "difficulty": "medium",
    "question": "What does the WARN Act (Worker Adjustment and Retraining Notification) require in the United States?",
    "options": [
      "Employers with 100+ employees to provide 60 days advance written notice of plant closings or mass layoffs",
      "Employers to pay 6 months of severance to any employee let go without cause",
      "Mandatory drug screening prior to operating heavy machinery",
      "Immediate re-hiring rights for strike workers"
    ],
    "correctAnswer": 0,
    "explanation": "The WARN Act protects workers by requiring qualifying employers to provide a 60-day notice prior to covered mass layoffs or closings."
  },
  {
    "id": "hr_34",
    "teamId": "HR",
    "category": "Talent Acquisition",
    "difficulty": "medium",
    "question": "What is Boolean search syntax primarily used for by talent sourcing specialists?",
    "options": [
      "Compiling financial balance sheets into payroll software",
      "Targeting candidate search queries on platforms like LinkedIn using operators like AND, OR, NOT",
      "Encrypting employee social security numbers",
      "Automating background reference call recordings"
    ],
    "correctAnswer": 1,
    "explanation": "Boolean search uses logical operators (AND, OR, NOT, quotations) to refine search queries in talent databases and search engines."
  },
  {
    "id": "hr_35",
    "teamId": "HR",
    "category": "Retention & Engagement",
    "difficulty": "medium",
    "question": "What is a 'Stay Interview' and how does it differ from an Exit Interview?",
    "options": [
      "It is an interview held while an employee is serving their two-week resignation notice",
      "It is a legal deposition conducted during a wrongful termination lawsuit",
      "It is conducted with current high-performing employees to understand what keeps them engaged before they consider leaving",
      "It is an annual interview to discuss pay raises and promotion quotas"
    ],
    "correctAnswer": 2,
    "explanation": "A stay interview proactively engages valued current employees to uncover what motivates them and resolve pain points before they decide to resign."
  },
  {
    "id": "hr_36",
    "teamId": "HR",
    "category": "Performance Management",
    "difficulty": "easy",
    "question": "What is the primary critique of the 'stack ranking' (forced curve distribution) review system?",
    "options": [
      "It is too complicated for computers to calculate",
      "It awards excessive pay raises to every employee equally",
      "It prevents managers from writing written feedback",
      "It can destroy collaboration, create toxic internal competition, and force arbitrary low ratings on good performers"
    ],
    "correctAnswer": 3,
    "explanation": "Forced ranking forces a set percentage of workers into the lowest tier, which damages teamwork and morale."
  },
  {
    "id": "hr_37",
    "teamId": "HR",
    "category": "Compensation & Benefits",
    "difficulty": "medium",
    "question": "What is 'broadbanding' in salary structure design?",
    "options": [
      "Consolidating numerous narrow salary grades into a smaller number of wide salary bands",
      "Paying all employees across all departments the exact same base wage",
      "Eliminating all health insurance benefits in exchange for higher cash wages",
      "Matching salary to the local internet bandwidth speeds"
    ],
    "correctAnswer": 0,
    "explanation": "Broadbanding collapses multiple narrow pay grades into fewer wider salary bands, offering greater managerial flexibility in compensation."
  },
  {
    "id": "hr_38",
    "teamId": "HR",
    "category": "Training & Development",
    "difficulty": "hard",
    "question": "What is the difference between synchronous and asynchronous corporate training?",
    "options": [
      "Synchronous is for executives; asynchronous is for junior staff",
      "Synchronous occurs in real time with an instructor and peers; asynchronous allows self-paced learning on the learner's own schedule",
      "Synchronous uses paper binders; asynchronous uses video projectors",
      "Synchronous requires passing a state certification exam"
    ],
    "correctAnswer": 1,
    "explanation": "Synchronous training happens live (webinars, in-person workshops); asynchronous happens on-demand (e-learning modules, recorded lectures)."
  },
  {
    "id": "hr_39",
    "teamId": "HR",
    "category": "Talent Acquisition",
    "difficulty": "medium",
    "question": "What is the Halo Effect in candidate interviewing?",
    "options": [
      "When a candidate speaks with a calm and angelic voice",
      "When an interviewer asks only questions about leadership philosophy",
      "When a single positive trait creates an overall positive bias that overshadows critical objective evaluations",
      "When multiple interviewers agree on the exact same rating"
    ],
    "correctAnswer": 2,
    "explanation": "The Halo Effect occurs when one favorable characteristic (e.g., prestigious university) leads an interviewer to view all other traits positively."
  },
  {
    "id": "hr_40",
    "teamId": "HR",
    "category": "Legal & Compliance",
    "difficulty": "hard",
    "question": "What does the 4/5ths (or 80%) rule test for in employment selection procedures (EEOC Uniform Guidelines)?",
    "options": [
      "Whether at least 80% of employees are satisfied with company health benefits",
      "Whether 80% of all open positions are filled through internal promotions",
      "If 80% of workers complete compliance training within 30 days",
      "Adverse impact: if the selection rate for a protected group is less than 80% of the rate for the highest-selected group"
    ],
    "correctAnswer": 3,
    "explanation": "The 80% rule flags adverse impact if the selection rate for any group is less than four-fifths (80%) of the group with the highest selection rate."
  },
  {
    "id": "hr_41",
    "teamId": "HR",
    "category": "Organizational Design",
    "difficulty": "medium",
    "question": "In a matrix organizational structure, what is the defining reporting characteristic?",
    "options": [
      "Employees have dual reporting relationships, typically to both a functional manager and a project/product manager",
      "Employees report to no manager at all and self-govern",
      "Only the CEO has direct reports",
      "Employees rotate reporting managers every two weeks"
    ],
    "correctAnswer": 0,
    "explanation": "Matrix organizations feature dual reporting lines (e.g., functional department head and product/project lead)."
  },
  {
    "id": "hr_42",
    "teamId": "HR",
    "category": "Metrics & Calculations",
    "difficulty": "medium",
    "question": "If a company has 80 new hires in a cohort and 12 leave within the first 90 days, what is the 90-day new hire attrition rate?",
    "options": [
      "12.5%",
      "15.0%",
      "10.0%",
      "16.7%"
    ],
    "correctAnswer": 1,
    "explanation": "New hire attrition rate = (12 departures / 80 new hires) * 100 = 15.0%."
  },
  {
    "id": "hr_43",
    "teamId": "HR",
    "category": "Employee Relations",
    "difficulty": "medium",
    "question": "What is an Ombudsman (or Ombudsperson) in a corporate setting?",
    "options": [
      "The external attorney defending the company in court",
      "The senior human resources executive who oversees payroll and taxes",
      "A designated neutral, independent, and confidential party who assists employees in resolving workplace conflicts",
      "A union representative assigned to negotiate collective bargaining"
    ],
    "correctAnswer": 2,
    "explanation": "An ombudsperson is an independent, confidential problem-solver who provides conflict coaching and impartial dispute resolution."
  },
  {
    "id": "hr_44",
    "teamId": "HR",
    "category": "Talent Management",
    "difficulty": "medium",
    "question": "What is a 'HiPo' program in enterprise talent development?",
    "options": [
      "High-Power internet computing benefit for engineering teams",
      "Health Insurance Preferred Option plan",
      "Hourly Incentive Performance Operations system",
      "High-Potential identification program designed to nurture future executive leadership"
    ],
    "correctAnswer": 3,
    "explanation": "HiPo programs identify high-potential employees demonstrating aptitude, aspiration, and engagement for fast-track leadership development."
  },
  {
    "id": "hr_45",
    "teamId": "HR",
    "category": "Workplace Health & Safety",
    "difficulty": "easy",
    "question": "What does OSHA stand for in the context of federal workplace regulations?",
    "options": [
      "Occupational Safety and Health Administration",
      "Office Safety and Human Administration",
      "Organization for Standard Hiring Assessments",
      "Operational Security and Health Act"
    ],
    "correctAnswer": 0,
    "explanation": "OSHA stands for the Occupational Safety and Health Administration."
  },
  {
    "id": "hr_46",
    "teamId": "HR",
    "category": "Compensation & Benefits",
    "difficulty": "hard",
    "question": "What is the difference between an incentive stock option (ISO) and a non-qualified stock option (NSO)?",
    "options": [
      "NSOs can never be sold on a public market",
      "ISOs are eligible for favorable tax treatment (no tax at exercise, capital gains at sale if holding periods are met) and can only be granted to employees",
      "ISOs can only be given to independent contractors and advisors",
      "There is no legal or tax difference between ISOs and NSOs"
    ],
    "correctAnswer": 1,
    "explanation": "ISOs qualify for special tax status under US IRS code and are reserved for employees, whereas NSOs incur ordinary income tax at exercise."
  },
  {
    "id": "hr_47",
    "teamId": "HR",
    "category": "Strategic HR",
    "difficulty": "medium",
    "question": "What is 'Success Profiling' in competency modeling?",
    "options": [
      "Creating marketing brochures that highlight company earnings",
      "Auditing an employee's personal credit score before promotion",
      "Defining the specific behaviors, knowledge, experience, and personal attributes that distinguish top performers in a role",
      "Filing success certificates with the local government"
    ],
    "correctAnswer": 2,
    "explanation": "Success profiling outlines the competencies, behaviors, and capabilities required for excellence in a given position."
  },
  {
    "id": "hr_48",
    "teamId": "HR",
    "category": "Training & Development",
    "difficulty": "medium",
    "question": "What does Microlearning refer to in modern corporate learning platforms?",
    "options": [
      "Training employees on microchip manufacturing techniques",
      "Training children of company employees during summer camps",
      "Reducing training budgets to micro levels",
      "Delivering short, focused learning units (3-7 minutes) addressing a specific objective or concept"
    ],
    "correctAnswer": 3,
    "explanation": "Microlearning delivers bite-sized, digestible content targeting a specific skill or knowledge point, optimizing retention."
  },
  {
    "id": "hr_49",
    "teamId": "HR",
    "category": "Metrics & Calculations",
    "difficulty": "hard",
    "question": "An organization has 1,000 employees. In a year, employees missed a total of 4,000 scheduled workdays out of 250,000 total scheduled workdays. What is the absenteeism rate?",
    "options": [
      "1.6%",
      "4.0%",
      "2.5%",
      "0.8%"
    ],
    "correctAnswer": 0,
    "explanation": "Absenteeism Rate = (Total Days Lost / Total Days Scheduled) * 100 = (4,000 / 250,000) * 100 = 1.6%."
  },
  {
    "id": "hr_50",
    "teamId": "HR",
    "category": "Change Management",
    "difficulty": "medium",
    "question": "In John Kotter's 8-Step Change Model, what is the very first step leadership must take?",
    "options": [
      "Form a strategic guiding coalition",
      "Create a sense of urgency",
      "Generate short-term quick wins",
      "Institutionalize changes in corporate culture"
    ],
    "correctAnswer": 1,
    "explanation": "Kotter's first step is creating a sense of urgency to help others see the immediate need for change and the importance of acting immediately."
  },
  {
    "id": "mkt_01",
    "teamId": "MARKETING",
    "category": "Digital Advertising & Metrics",
    "difficulty": "medium",
    "question": "A campaign generated 2,000 clicks from 100,000 ad impressions, and 100 conversions from those clicks. What are the Click-Through Rate (CTR) and Conversion Rate (CR)?",
    "options": [
      "CTR: 5.0%, CR: 2.0%",
      "CTR: 0.2%, CR: 5.0%",
      "CTR: 2.0%, CR: 5.0%",
      "CTR: 2.0%, CR: 0.1%"
    ],
    "correctAnswer": 2,
    "explanation": "CTR = (2,000 / 100,000) * 100 = 2.0%. Conversion Rate = (100 / 2,000) * 100 = 5.0%."
  },
  {
    "id": "mkt_02",
    "teamId": "MARKETING",
    "category": "Unit Economics",
    "difficulty": "hard",
    "question": "A company spent $50,000 on marketing and sales in Q1 and acquired 250 new customers. The average customer lifetime value (LTV) is $800. What is the LTV:CAC ratio?",
    "options": [
      "2:1",
      "3:1",
      "5:1",
      "4:1"
    ],
    "correctAnswer": 3,
    "explanation": "CAC = $50,000 / 250 = $200. LTV = $800. LTV:CAC ratio = $800 / $200 = 4:1 (A healthy benchmark is typically 3:1 or higher)."
  },
  {
    "id": "mkt_03",
    "teamId": "MARKETING",
    "category": "Advertising",
    "difficulty": "easy",
    "question": "An e-commerce ad campaign spent $10,000 and directly generated $45,000 in sales revenue. What is the Return on Ad Spend (ROAS)?",
    "options": [
      "4.5x (450%)",
      "3.5x (350%)",
      "5.0x (500%)",
      "0.22x (22%)"
    ],
    "correctAnswer": 0,
    "explanation": "ROAS = Revenue from Ads / Cost of Ads = $45,000 / $10,000 = 4.5x or 450%."
  },
  {
    "id": "mkt_04",
    "teamId": "MARKETING",
    "category": "SEO & Search",
    "difficulty": "medium",
    "question": "In search engine optimization, what does 'Search Intent' categorize?",
    "options": [
      "The programming language used to build the search engine crawler",
      "The underlying objective or motivation a user has when typing a query into a search engine",
      "The maximum price an advertiser is willing to pay per click",
      "The server response latency of a web host"
    ],
    "correctAnswer": 1,
    "explanation": "Search intent identifies the purpose behind a search query (informational, navigational, commercial, or transactional)."
  },
  {
    "id": "mkt_05",
    "teamId": "MARKETING",
    "category": "Brand Strategy",
    "difficulty": "medium",
    "question": "What is the primary difference between brand awareness and brand equity?",
    "options": [
      "Brand awareness is only measured in TV ads; brand equity is only measured online",
      "Brand equity is how much a trademark logo costs to design",
      "Brand awareness is recognition that a brand exists; brand equity is the commercial value derived from consumer perception and loyalty",
      "There is no difference; they are interchangeable marketing terms"
    ],
    "correctAnswer": 2,
    "explanation": "Brand awareness measures whether consumers recognize the brand, while brand equity represents the tangible financial and market power of that reputation."
  },
  {
    "id": "mkt_06",
    "teamId": "MARKETING",
    "category": "Pricing Strategy",
    "difficulty": "hard",
    "question": "What is 'Price Skimming' in product launch strategy?",
    "options": [
      "Setting an artificially low price to rapidly penetrate the market and discourage competitors",
      "Pricing products strictly based on cost-plus 10%",
      "Bundling three unrelated products together at a single flat price",
      "Setting a high introductory price targeting early adopters, then progressively lowering it over time to capture broader segments"
    ],
    "correctAnswer": 3,
    "explanation": "Price skimming sets an initially high price to maximize profits from early adopters with inelastic demand, then drops prices as the market matures."
  },
  {
    "id": "mkt_07",
    "teamId": "MARKETING",
    "category": "Marketing Analytics",
    "difficulty": "medium",
    "question": "In multi-touch attribution, how does 'Linear Attribution' allocate credit across customer touchpoints?",
    "options": [
      "Equal credit is distributed across every touchpoint along the conversion path",
      "100% of the credit is given to the first channel the customer visited",
      "100% of the credit is given to the final link clicked prior to purchase",
      "Exponentially more credit is awarded to the most expensive ad network"
    ],
    "correctAnswer": 0,
    "explanation": "Linear attribution distributes equal percentage credit to all touchpoints a prospect engaged with prior to converting."
  },
  {
    "id": "mkt_08",
    "teamId": "MARKETING",
    "category": "Product Marketing",
    "difficulty": "medium",
    "question": "What are the three pillars of the STP marketing framework?",
    "options": [
      "Sales, Turnover, Profit",
      "Segmentation, Targeting, Positioning",
      "Social, Traditional, Public Relations",
      "Search, Testing, Promotion"
    ],
    "correctAnswer": 1,
    "explanation": "STP stands for Segmentation (dividing market), Targeting (choosing attractive segments), and Positioning (crafting tailored value proposition)."
  },
  {
    "id": "mkt_09",
    "teamId": "MARKETING",
    "category": "Email Marketing",
    "difficulty": "easy",
    "question": "If an email campaign is sent to 10,000 subscribers, 200 bounce, and 2,450 recipients open the email, what is the open rate?",
    "options": [
      "24.5%",
      "20.0%",
      "25.0%",
      "26.2%"
    ],
    "correctAnswer": 2,
    "explanation": "Delivered emails = 10,000 - 200 = 9,800. Open Rate = (2,450 / 9,800) * 100 = 25.0%."
  },
  {
    "id": "mkt_10",
    "teamId": "MARKETING",
    "category": "Growth & Retention",
    "difficulty": "hard",
    "question": "A SaaS company starts the month with 1,000 active subscribers. During the month, 40 subscribers cancel and 100 new subscribers sign up. What was the monthly customer churn rate?",
    "options": [
      "10.0%",
      "6.0%",
      "3.8%",
      "4.0%"
    ],
    "correctAnswer": 3,
    "explanation": "Customer Churn Rate = (Customers Lost during period / Total Customers at start of period) * 100 = (40 / 1,000) * 100 = 4.0%."
  },
  {
    "id": "mkt_11",
    "teamId": "MARKETING",
    "category": "Content Marketing",
    "difficulty": "medium",
    "question": "In the buyer's journey (TOFU, MOFU, BOFU), which content type is most appropriate for Top-of-Funnel (TOFU)?",
    "options": [
      "Educational blog posts, industry trend infographics, and beginner guides",
      "Detailed vendor pricing comparison tables and implementation quotes",
      "Custom product demo videos and customer reference calls",
      "Free 14-day software trial checkout pages"
    ],
    "correctAnswer": 0,
    "explanation": "TOFU content focuses on problem awareness and broad education without aggressive product sales pitches."
  },
  {
    "id": "mkt_12",
    "teamId": "MARKETING",
    "category": "Consumer Psychology",
    "difficulty": "medium",
    "question": "Which cognitive bias describes when people rely too heavily on the first piece of information offered (such as an original anchor price) when making decisions?",
    "options": [
      "Confirmation Bias",
      "Anchoring Bias",
      "Bandwagon Effect",
      "Loss Aversion"
    ],
    "correctAnswer": 1,
    "explanation": "Anchoring bias occurs when initial values heavily anchor human judgment of subsequent values or discounts."
  },
  {
    "id": "mkt_13",
    "teamId": "MARKETING",
    "category": "Social Media & Viral Growth",
    "difficulty": "hard",
    "question": "A product has a Viral Coefficient (K-factor) of 1.4. What does this mathematically imply about user growth?",
    "options": [
      "Growth will decay exponentially without paid advertising",
      "Only 14% of invited users accept invitations",
      "Each user brings in an average of 1.4 new users, creating viral, compounding organic growth",
      "Customer acquisition costs will increase by 40% every cycle"
    ],
    "correctAnswer": 2,
    "explanation": "When K > 1 (e.g. 1.4), each user invites more than one new user on average, generating viral compounding growth."
  },
  {
    "id": "mkt_14",
    "teamId": "MARKETING",
    "category": "Digital Marketing",
    "difficulty": "easy",
    "question": "What does A/B testing (split testing) entail in conversion rate optimization?",
    "options": [
      "Testing two distinct product codebases for bugs simultaneously",
      "Sending emails only on Tuesdays and Thursdays",
      "Comparing ad budgets between Google and Facebook",
      "Directing traffic randomly between two variants of a page to measure which produces higher conversions"
    ],
    "correctAnswer": 3,
    "explanation": "A/B testing splits incoming visitors between version A (control) and version B (variant) to isolate which variable improves performance."
  },
  {
    "id": "mkt_15",
    "teamId": "MARKETING",
    "category": "Unit Economics",
    "difficulty": "hard",
    "question": "A customer pays a monthly subscription fee of $50 with an 80% gross margin. The monthly churn rate is 2.5%. What is the estimated Customer Lifetime Value (LTV)?",
    "options": [
      "$1,600",
      "$2,000",
      "$1,200",
      "$800"
    ],
    "correctAnswer": 0,
    "explanation": "LTV = (Monthly ARPU * Gross Margin) / Churn Rate = ($50 * 0.80) / 0.025 = $40 / 0.025 = $1,600."
  },
  {
    "id": "mkt_16",
    "teamId": "MARKETING",
    "category": "Product Management",
    "difficulty": "medium",
    "question": "What does 'Product-Market Fit' (PMF) signify according to Marc Andreessen?",
    "options": [
      "Having a fully staffed engineering team with zero backlog",
      "Being in a good market with a product that can satisfy that market",
      "Filing a patent for proprietary technology",
      "Having a positive gross margin on paper"
    ],
    "correctAnswer": 1,
    "explanation": "PMF occurs when customers are buying and using the product at a rate fast enough that demand pulls the company forward."
  },
  {
    "id": "mkt_17",
    "teamId": "MARKETING",
    "category": "Public Relations",
    "difficulty": "medium",
    "question": "What is an Embargo in press relations and media communications?",
    "options": [
      "A complete legal ban on exporting physical marketing collateral",
      "A permanent blacklisting of a hostile news reporter",
      "A mutual agreement between PR and journalists not to publish shared news before a specified date and time",
      "An exclusive advertising contract signed with a single publication"
    ],
    "correctAnswer": 2,
    "explanation": "A press embargo provides reporters with advance information under agreement that it will not be published until a scheduled release time."
  },
  {
    "id": "mkt_18",
    "teamId": "MARKETING",
    "category": "Advertising",
    "difficulty": "medium",
    "question": "In programmatic ad buying, what does CPM represent?",
    "options": [
      "Cost Per Million clicks",
      "Customer Purchase Measurement",
      "Clicks Per Minute",
      "Cost Per Mille (cost per one thousand ad impressions)"
    ],
    "correctAnswer": 3,
    "explanation": "CPM is Cost Per Mille (Latin for thousand), indicating the cost an advertiser pays for 1,000 impressions of an advertisement."
  },
  {
    "id": "mkt_19",
    "teamId": "MARKETING",
    "category": "Strategic Marketing",
    "difficulty": "medium",
    "question": "In the BCG Growth-Share Matrix, which quadrant represents products with high market growth rate but low relative market share?",
    "options": [
      "Question Marks (Problem Children)",
      "Stars",
      "Cash Cows",
      "Dogs"
    ],
    "correctAnswer": 0,
    "explanation": "Question Marks have high market growth potential but low current market share, requiring heavy investment to become Stars."
  },
  {
    "id": "mkt_20",
    "teamId": "MARKETING",
    "category": "SEO & Content",
    "difficulty": "hard",
    "question": "What is the purpose of a canonical URL tag (rel='canonical') on a webpage?",
    "options": [
      "To accelerate page loading speed using CDN caching",
      "To inform search engines which version of a page is the master source when duplicate or near-duplicate URLs exist",
      "To encrypt credit card transactions on e-commerce checkout forms",
      "To automatically translate text into multiple languages"
    ],
    "correctAnswer": 1,
    "explanation": "Canonical tags prevent duplicate content issues by telling search engines which URL represents the authoritative master copy."
  },
  {
    "id": "mkt_21",
    "teamId": "MARKETING",
    "category": "Influencer Marketing",
    "difficulty": "medium",
    "question": "Why do many consumer brands prioritize partnerships with 'Micro-Influencers' (10k-50k followers) over mega-celebrities?",
    "options": [
      "Micro-influencers have legally binding exclusivity contracts with state media",
      "Micro-influencers are exempt from FTC disclosure guidelines",
      "Micro-influencers often possess higher niche engagement rates, greater audience trust, and lower cost-per-conversion",
      "Social media algorithms refuse to display posts from verified celebrity accounts"
    ],
    "correctAnswer": 2,
    "explanation": "Micro-influencers often deliver hyper-engaged, highly targeted niche audiences with authentic trust and superior ROI compared to mass celebrity endorsements."
  },
  {
    "id": "mkt_22",
    "teamId": "MARKETING",
    "category": "Customer Experience",
    "difficulty": "easy",
    "question": "What metric asks: 'How likely are you to recommend our company/product to a friend or colleague on a scale of 0 to 10'?",
    "options": [
      "Customer Effort Score (CES)",
      "Customer Satisfaction (CSAT)",
      "Churn Intent Index (CII)",
      "Net Promoter Score (NPS)"
    ],
    "correctAnswer": 3,
    "explanation": "Net Promoter Score (NPS) measures customer loyalty and advocacy through the classic 0-10 recommendation question."
  },
  {
    "id": "mkt_23",
    "teamId": "MARKETING",
    "category": "Unit Economics",
    "difficulty": "hard",
    "question": "If a direct-to-consumer brand has an average order value (AOV) of $80, a purchase frequency of 2.5 orders per year, and customer retention of 3 years, what is the customer lifetime gross revenue?",
    "options": [
      "$600",
      "$400",
      "$500",
      "$200"
    ],
    "correctAnswer": 0,
    "explanation": "Lifetime Revenue = AOV * Frequency * Lifespan = $80 * 2.5 * 3 = $200 * 3 = $600."
  },
  {
    "id": "mkt_24",
    "teamId": "MARKETING",
    "category": "Competitive Analysis",
    "difficulty": "medium",
    "question": "What does 'Share of Voice' (SOV) measure in competitive brand intelligence?",
    "options": [
      "The volume of audio podcasts produced by internal executives",
      "The percentage of total market advertising and conversation owned by a brand relative to its competitors",
      "The decibel volume allowed during television commercials",
      "The ratio of outbound customer phone calls to inbound inquiries"
    ],
    "correctAnswer": 1,
    "explanation": "Share of Voice measures a brand's share of total advertising impressions, mentions, and media attention relative to all competitors in the category."
  },
  {
    "id": "mkt_25",
    "teamId": "MARKETING",
    "category": "Digital Marketing",
    "difficulty": "medium",
    "question": "What is 'Retargeting' (or Remarketing) in online advertising?",
    "options": [
      "Changing the target demographic of a brand from teens to retirees",
      "Targeting only users residing within a 5-mile geographic radius",
      "Serving ads specifically to users who have previously visited your website or engaged with your brand",
      "Deleting unengaged contacts from an email CRM database"
    ],
    "correctAnswer": 2,
    "explanation": "Retargeting uses cookie/pixel tracking to serve tailored ads to people who already browsed pages or took actions on your platform."
  },
  {
    "id": "mkt_26",
    "teamId": "MARKETING",
    "category": "Pricing Strategy",
    "difficulty": "medium",
    "question": "What is 'Freemium' business model structure?",
    "options": [
      "A free trial that automatically charges a credit card after 7 days",
      "Selling physical hardware at cost while giving software away free",
      "Distributing open-source software with zero monetization",
      "Offering a proprietary product with core features free forever, while charging premium fees for advanced capabilities"
    ],
    "correctAnswer": 3,
    "explanation": "Freemium blends 'Free' basic access with 'Premium' paid upgrades (e.g., Slack, Spotify, Dropbox)."
  },
  {
    "id": "mkt_27",
    "teamId": "MARKETING",
    "category": "Marketing Automation",
    "difficulty": "medium",
    "question": "What is 'Lead Scoring' in marketing automation software (e.g. HubSpot, Marketo)?",
    "options": [
      "Assigning numerical values to prospective leads based on their behaviors, company size, and fit to prioritize sales outreach",
      "Grading sales reps based on how fast they dial phone numbers",
      "Counting how many website visitors read the terms of service",
      "Calculating credit risk scores for wholesale purchasing"
    ],
    "correctAnswer": 0,
    "explanation": "Lead scoring ranks prospects according to their perceived value and purchase readiness using engagement points and demographic criteria."
  },
  {
    "id": "mkt_28",
    "teamId": "MARKETING",
    "category": "Brand Positioning",
    "difficulty": "hard",
    "question": "According to Al Ries and Jack Trout in 'Positioning: The Battle for Your Mind', what is the fundamental law of category leadership?",
    "options": [
      "The company with the largest marketing budget always wins",
      "It is better to be first in the mind of the consumer than it is to be better",
      "Lower prices always defeat prestige brand equity",
      "Product features are more memorable than simple verbal slogans"
    ],
    "correctAnswer": 1,
    "explanation": "Ries and Trout emphasize that being first to establish category ownership in the customer's mind is vastly more powerful than trying to convince them of incremental superiority later."
  },
  {
    "id": "mkt_29",
    "teamId": "MARKETING",
    "category": "Event Marketing",
    "difficulty": "easy",
    "question": "What is the primary commercial purpose of an experiential pop-up store or brand activation?",
    "options": [
      "To liquidate excess old inventory at discount clearance rates",
      "To replace long-term permanent retail leases entirely",
      "To build memorable brand immersion, foster social media buzz, and drive authentic emotional engagement",
      "To avoid municipal sales tax compliance"
    ],
    "correctAnswer": 2,
    "explanation": "Experiential marketing creates sensory, immersive physical experiences that generate organic social sharing, press, and brand affinity."
  },
  {
    "id": "mkt_30",
    "teamId": "MARKETING",
    "category": "SEO & Search",
    "difficulty": "medium",
    "question": "What is a 'Long-Tail Keyword' in search engine marketing?",
    "options": [
      "A keyword query that takes longer than 5 seconds to load search results",
      "A search term containing more than 50 characters",
      "A trademarked brand name that cannot be bid on in Google Ads",
      "A highly specific multi-word search phrase that typically has lower search volume but higher conversion intent"
    ],
    "correctAnswer": 3,
    "explanation": "Long-tail keywords are specific 3-5+ word queries (e.g., 'organic vegan running shoes for flat feet') with lower competition and high purchase intent."
  },
  {
    "id": "mkt_31",
    "teamId": "MARKETING",
    "category": "Customer Journey",
    "difficulty": "medium",
    "question": "In e-commerce analytics, what is Cart Abandonment Rate, and what is its standard industry average range?",
    "options": [
      "The percentage of online shoppers who add items to their digital shopping cart but exit without completing purchase (~65-75%)",
      "The rate of physical shopping cart thefts in grocery stores (1-2%)",
      "The percentage of returned parcels due to incorrect addresses (5-10%)",
      "The rate of payment gateway card declines during checkout (20-30%)"
    ],
    "correctAnswer": 0,
    "explanation": "Digital cart abandonment measures users who put items in their cart but leave before buying, with industry benchmarks averaging around 70%."
  },
  {
    "id": "mkt_32",
    "teamId": "MARKETING",
    "category": "Digital Advertising",
    "difficulty": "hard",
    "question": "In Google Ads Search auctions, what factors determine an ad's 'Ad Rank'?",
    "options": [
      "Only the maximum monetary CPC bid placed by the advertiser",
      "Max CPC bid multiplied by Quality Score (expected CTR, ad relevance, landing page experience) plus ad assets impact",
      "The total annual revenue of the advertising company",
      "The age of the Google advertiser's account in years"
    ],
    "correctAnswer": 1,
    "explanation": "Google Ad Rank balances monetary bid with Quality Score (relevance, landing page quality, expected CTR) and ad extensions impact."
  },
  {
    "id": "mkt_33",
    "teamId": "MARKETING",
    "category": "Strategic Marketing",
    "difficulty": "medium",
    "question": "What is a 'Blue Ocean Strategy' in commercial market development?",
    "options": [
      "Focusing on commercial fishing and maritime shipping investments",
      "Spending all marketing funds on aquatic outdoor billboard displays",
      "Creating uncontested market space and making the competition irrelevant rather than fighting in an overcrowded market ('Red Ocean')",
      "Acquiring failing direct competitors at bankruptcy auctions"
    ],
    "correctAnswer": 2,
    "explanation": "Blue Ocean Strategy advocates creating new market demand in uncontested spaces rather than competing for existing share in saturated 'red oceans'."
  },
  {
    "id": "mkt_34",
    "teamId": "MARKETING",
    "category": "Analytics & Conversion",
    "difficulty": "hard",
    "question": "A landing page has 10,000 visitors. 400 people sign up for a free webinar. Of those 400 attendees, 60 purchase the $500 core program. What is the end-to-end visitor-to-sale conversion rate?",
    "options": [
      "1.5%",
      "6.0%",
      "4.0%",
      "0.6%"
    ],
    "correctAnswer": 3,
    "explanation": "Total sales = 60. Total initial visitors = 10,000. End-to-end conversion rate = (60 / 10,000) * 100 = 0.6%."
  },
  {
    "id": "mkt_35",
    "teamId": "MARKETING",
    "category": "Consumer Psychology",
    "difficulty": "medium",
    "question": "What does the 'Decoy Effect' (asymmetric dominance) achieve in pricing design?",
    "options": [
      "Introducing an inferior third option specifically designed to make the target higher-margin option look much more appealing",
      "Hiding the true price until the checkout credit card screen is reached",
      "Offering counterfeit merchandise to confuse competitor pricing bots",
      "Charging different prices depending on the visitor's geographic location"
    ],
    "correctAnswer": 0,
    "explanation": "The decoy effect adds a third option that is clearly inferior to the target option in value, nudging buyers toward the more profitable target."
  },
  {
    "id": "mkt_36",
    "teamId": "MARKETING",
    "category": "Growth & Retention",
    "difficulty": "medium",
    "question": "What is 'Net Revenue Retention' (NRR) in recurring revenue businesses?",
    "options": [
      "Total sales minus corporate income tax",
      "Percentage of recurring revenue retained from existing customers over a period, factoring in expansion, downgrades, and churn",
      "The cash balance remaining in the bank at month end",
      "Gross sales divided by total customer acquisition spend"
    ],
    "correctAnswer": 1,
    "explanation": "NRR measures the percentage of recurring revenue retained from existing cohorts including upgrades, cross-sells, downgrades, and cancellations (>100% indicates net expansion)."
  },
  {
    "id": "mkt_37",
    "teamId": "MARKETING",
    "category": "Direct Marketing",
    "difficulty": "easy",
    "question": "Under the US CAN-SPAM Act, what is a mandatory requirement for commercial marketing emails?",
    "options": [
      "Sending emails only between 9:00 AM and 5:00 PM local time",
      "Verifying every recipient's government identity number",
      "Including a clear opt-out / unsubscribe mechanism and a valid physical postal address",
      "Keeping email lengths under 200 words"
    ],
    "correctAnswer": 2,
    "explanation": "CAN-SPAM mandates a clear, functioning opt-out link, honoring opt-outs promptly, and displaying a valid physical address."
  },
  {
    "id": "mkt_38",
    "teamId": "MARKETING",
    "category": "Content Strategy",
    "difficulty": "medium",
    "question": "What is 'Gated Content' in B2B demand generation?",
    "options": [
      "Content locked behind paid subscription paywalls for revenue",
      "Content blocked by company firewall cybersecurity rules",
      "Internal documentation accessible only via VPN",
      "High-value assets (whitepapers, research reports, templates) that require providing contact info (name, email) to download"
    ],
    "correctAnswer": 3,
    "explanation": "Gated content exchanges valuable educational materials for prospect contact details to capture qualified inbound sales leads."
  },
  {
    "id": "mkt_39",
    "teamId": "MARKETING",
    "category": "Affiliate Marketing",
    "difficulty": "medium",
    "question": "In affiliate marketing networks, what is a 'Cookie Window' (or attribution window)?",
    "options": [
      "The duration of time an affiliate partner is credited and paid a commission for purchases made after a user clicks their referral link",
      "The popup window alerting European users to GDPR compliance",
      "The shelf-life of baked goods sold in company cafes",
      "The timeout interval for an inactive web session"
    ],
    "correctAnswer": 0,
    "explanation": "The cookie window (e.g., 30 or 60 days) dictates how long an affiliate retains credit for sales following a user's initial tracking click."
  },
  {
    "id": "mkt_40",
    "teamId": "MARKETING",
    "category": "Product Marketing",
    "difficulty": "hard",
    "question": "In the Kano Model of customer satisfaction, what is an 'Attractive / Delighter' attribute?",
    "options": [
      "A basic feature whose absence causes dissatisfaction, but presence is taken for granted",
      "An unexpected innovation that generates disproportionate customer delight and competitive differentiation",
      "A feature that costs more than $1,000 to manufacture",
      "A feature that customers actively complain about"
    ],
    "correctAnswer": 1,
    "explanation": "Kano 'delighters' are unexpected positive surprises that trigger high satisfaction without being consciously demanded in advance."
  },
  {
    "id": "mkt_41",
    "teamId": "MARKETING",
    "category": "Digital Advertising",
    "difficulty": "medium",
    "question": "What is 'Ad Fatigue' in social media paid campaigns?",
    "options": [
      "When marketing team members get tired of writing ad copy",
      "When social media platforms run out of advertising inventory",
      "When a target audience sees the same ad too frequently, causing CTR to drop and CPC/CPA to rise",
      "When a user closes their social media account"
    ],
    "correctAnswer": 2,
    "explanation": "Ad fatigue occurs when target audiences are exposed to the same creative too many times, leading to declining engagement and rising acquisition costs."
  },
  {
    "id": "mkt_42",
    "teamId": "MARKETING",
    "category": "Market Research",
    "difficulty": "medium",
    "question": "What is the primary difference between quantitative and qualitative market research?",
    "options": [
      "Quantitative is conducted only in laboratories; qualitative is conducted on social media",
      "Quantitative is always cheap; qualitative is always expensive",
      "Quantitative only studies competitors; qualitative only studies current buyers",
      "Quantitative gathers numerical data for statistical analysis; qualitative gathers in-depth subjective insights, emotions, and motivations"
    ],
    "correctAnswer": 3,
    "explanation": "Quantitative measures numerical patterns at scale (surveys, analytics); qualitative explores the 'why' through focus groups and interviews."
  },
  {
    "id": "mkt_43",
    "teamId": "MARKETING",
    "category": "Unit Economics",
    "difficulty": "hard",
    "question": "If a company's Customer Acquisition Cost (CAC) is $300 and average gross profit contribution per customer is $50 per month, what is the CAC Payback Period?",
    "options": [
      "6 months",
      "3 months",
      "12 months",
      "15 months"
    ],
    "correctAnswer": 0,
    "explanation": "CAC Payback Period = CAC / Monthly Gross Profit per Customer = $300 / $50 = 6 months."
  },
  {
    "id": "mkt_44",
    "teamId": "MARKETING",
    "category": "Brand Strategy",
    "difficulty": "medium",
    "question": "What is 'Brand Architecture' in enterprise marketing?",
    "options": [
      "The interior architectural design of retail flagship stores",
      "The systematic structure organizing a parent company's brands, sub-brands, and product lines (e.g. Branded House vs House of Brands)",
      "The technical database schema supporting an e-commerce platform",
      "The blueprint for patenting manufacturing components"
    ],
    "correctAnswer": 1,
    "explanation": "Brand architecture specifies the hierarchy and relationship between parent brands and products (e.g. Google's Branded House vs P&G's House of Brands)."
  },
  {
    "id": "mkt_45",
    "teamId": "MARKETING",
    "category": "Digital Analytics",
    "difficulty": "easy",
    "question": "What is 'Bounce Rate' in Google Analytics 4 (GA4) compared to legacy Universal Analytics?",
    "options": [
      "The frequency with which users accidentally drop their mobile devices",
      "The rate of email delivery failures",
      "The percentage of sessions that were not 'engaged' (lasted less than 10 seconds, had no conversion, and fewer than 2 page views)",
      "The percentage of users who immediately buy a product"
    ],
    "correctAnswer": 2,
    "explanation": "In GA4, bounce rate is the inverse of Engagement Rate: the percentage of sessions that were not engaged sessions."
  },
  {
    "id": "mkt_46",
    "teamId": "MARKETING",
    "category": "Public Relations",
    "difficulty": "medium",
    "question": "What is 'Earned Media' in the PESO model (Paid, Earned, Shared, Owned)?",
    "options": [
      "Sponsored advertisements on social media feeds",
      "Content published on a brand's corporate blog and website",
      "Engagement generated directly on the company's official TikTok account",
      "Publicity gained through organic promotional efforts, press editorial coverage, word-of-mouth, and reviews"
    ],
    "correctAnswer": 3,
    "explanation": "Earned media is third-party publicity and organic press attention that is earned through news value rather than paid advertising."
  },
  {
    "id": "mkt_47",
    "teamId": "MARKETING",
    "category": "Product Marketing",
    "difficulty": "medium",
    "question": "In product positioning, what is a 'Point of Parity' (POP)?",
    "options": [
      "An attribute where a brand must match industry standards to be considered a viable player by consumers",
      "A feature that is completely unique to your product and nonexistent elsewhere",
      "The exact price point where revenue equals cost",
      "The point where market share reaches 50%"
    ],
    "correctAnswer": 0,
    "explanation": "Points of parity are mandatory industry standard capabilities required simply to be considered credible in the category."
  },
  {
    "id": "mkt_48",
    "teamId": "MARKETING",
    "category": "Pricing Strategy",
    "difficulty": "hard",
    "question": "What is 'Dynamic Pricing' and where is it most prominently used?",
    "options": [
      "Offering a static price on paper coupons printed once a year",
      "Adjusting prices in real time based on algorithms assessing current demand, supply, competitor rates, and timing (e.g. airlines, ride-share)",
      "Letting customers pay whatever they choose via voluntary donation",
      "Charging equal prices for all products regardless of manufacturing costs"
    ],
    "correctAnswer": 1,
    "explanation": "Dynamic pricing algorithms continuously recalibrate prices based on live demand spikes, supply constraints, and market conditions."
  },
  {
    "id": "mkt_49",
    "teamId": "MARKETING",
    "category": "Sales Enablement",
    "difficulty": "medium",
    "question": "What is a 'Battlecard' in B2B product marketing?",
    "options": [
      "A competitive card game played by employees during team retreats",
      "A legal dispute notice sent to rival marketing agencies",
      "A concise internal tactical cheat-sheet helping sales reps counter specific competitor objections and highlight differentiators",
      "An expense report detailing entertainment meals with clients"
    ],
    "correctAnswer": 2,
    "explanation": "A sales battlecard equips account executives with competitive positioning, feature comparisons, objection handling, and win themes."
  },
  {
    "id": "mkt_50",
    "teamId": "MARKETING",
    "category": "Growth & Retention",
    "difficulty": "hard",
    "question": "What is the 'North Star Metric' in modern growth product management?",
    "options": [
      "The total number of press releases sent per calendar quarter",
      "The highest salary paid to an engineering hire",
      "The number of visitors browsing the careers page",
      "The single key metric that best captures the core value a product delivers to customers and predicts long-term business growth"
    ],
    "correctAnswer": 3,
    "explanation": "A North Star Metric aligns the entire company around the fundamental metric representing customer value realization (e.g., Spotify's time spent listening)."
  },
  {
    "id": "fin_01",
    "teamId": "FINANCE",
    "category": "Financial Statements",
    "difficulty": "easy",
    "question": "What is the fundamental accounting equation that governs the corporate Balance Sheet?",
    "options": [
      "Assets = Liabilities + Shareholders' Equity",
      "Revenue = Expenses + Net Income",
      "Assets = Current Assets + Net Cash Flow",
      "Shareholders' Equity = Assets + Liabilities"
    ],
    "correctAnswer": 0,
    "explanation": "The foundational double-entry accounting identity states that Assets = Liabilities + Equity."
  },
  {
    "id": "fin_02",
    "teamId": "FINANCE",
    "category": "Profitability & Metrics",
    "difficulty": "medium",
    "question": "A company reports $10M in Revenue, $4M in Cost of Goods Sold (COGS), $2M in Operating Expenses (SG&A), and $1M in Depreciation & Amortization. What is its EBITDA?",
    "options": [
      "$3M",
      "$4M",
      "$5M",
      "$6M"
    ],
    "correctAnswer": 1,
    "explanation": "Gross Profit = $10M - $4M = $6M. Operating Income before D&A (EBITDA) = Gross Profit - SG&A = $6M - $2M = $4M (or Operating Income $3M + D&A $1M = $4M)."
  },
  {
    "id": "fin_03",
    "teamId": "FINANCE",
    "category": "Working Capital",
    "difficulty": "medium",
    "question": "If a business has $500,000 in Current Assets and $250,000 in Current Liabilities, what is its Current Ratio?",
    "options": [
      "1.5",
      "0.5",
      "2.0",
      "2.5"
    ],
    "correctAnswer": 2,
    "explanation": "Current Ratio = Current Assets / Current Liabilities = $500,000 / $250,000 = 2.0."
  },
  {
    "id": "fin_04",
    "teamId": "FINANCE",
    "category": "Capital Budgeting",
    "difficulty": "hard",
    "question": "In Net Present Value (NPV) analysis, what should a financial manager conclude if a project's NPV is strictly greater than zero at the weighted average cost of capital?",
    "options": [
      "The project should be rejected because it generates zero economic rent",
      "The project will take more than 10 years to reach cash flow payback",
      "The internal rate of return is less than the discount rate",
      "The project is expected to add value to the firm and exceed the required rate of return, so it should be accepted"
    ],
    "correctAnswer": 3,
    "explanation": "A positive NPV indicates that discounted future cash inflows exceed the initial cost, generating surplus shareholder value."
  },
  {
    "id": "fin_05",
    "teamId": "FINANCE",
    "category": "Valuation",
    "difficulty": "hard",
    "question": "According to the Gordon Growth Model (Dividend Discount Model), if next year's dividend D1 is $5.00, the required rate of return r is 10%, and constant dividend growth g is 4%, what is the intrinsic stock price?",
    "options": [
      "$83.33",
      "$50.00",
      "$62.50",
      "$125.00"
    ],
    "correctAnswer": 0,
    "explanation": "P0 = D1 / (r - g) = $5.00 / (0.10 - 0.04) = $5.00 / 0.06 = $83.33."
  },
  {
    "id": "fin_06",
    "teamId": "FINANCE",
    "category": "Financial Statements",
    "difficulty": "medium",
    "question": "Which of the following cash flows is classified under 'Cash Flow from Investing Activities' on the Cash Flow Statement?",
    "options": [
      "Payment of cash dividends to common stockholders",
      "Purchase of manufacturing property, plant, and equipment (CapEx)",
      "Cash received from customers for service invoices",
      "Issuance of senior corporate bonds"
    ],
    "correctAnswer": 1,
    "explanation": "Capital expenditures (purchases of long-term productive assets) are categorized as Cash Flows from Investing Activities."
  },
  {
    "id": "fin_07",
    "teamId": "FINANCE",
    "category": "Break-Even Analysis",
    "difficulty": "medium",
    "question": "A factory produces a gadget with a selling price of $50, variable cost per unit of $30, and total fixed costs of $100,000 per month. How many units must be sold per month to break even?",
    "options": [
      "2,000 units",
      "3,333 units",
      "5,000 units",
      "10,000 units"
    ],
    "correctAnswer": 2,
    "explanation": "Contribution Margin per unit = $50 - $30 = $20. Break-even units = Fixed Costs / Unit CM = $100,000 / $20 = 5,000 units."
  },
  {
    "id": "fin_08",
    "teamId": "FINANCE",
    "category": "Leverage & Risk",
    "difficulty": "medium",
    "question": "What does the Debt-to-Equity (D/E) ratio evaluate in financial health analysis?",
    "options": [
      "The speed with which inventory is converted into cash sales",
      "The tax rate paid on overseas dividend income",
      "The percentage of employees enrolled in stock purchase plans",
      "The proportion of company financing that comes from creditors versus shareholders (financial leverage)"
    ],
    "correctAnswer": 3,
    "explanation": "Debt-to-Equity evaluates financial leverage by measuring the degree to which a company is financing its operations through debt versus wholly-owned funds."
  },
  {
    "id": "fin_09",
    "teamId": "FINANCE",
    "category": "Working Capital",
    "difficulty": "hard",
    "question": "A firm has Days Sales Outstanding (DSO) of 45 days, Days Sales of Inventory (DSI) of 60 days, and Days Payable Outstanding (DPO) of 35 days. What is its Cash Conversion Cycle (CCC)?",
    "options": [
      "70 days",
      "140 days",
      "50 days",
      "90 days"
    ],
    "correctAnswer": 0,
    "explanation": "Cash Conversion Cycle = DSI + DSO - DPO = 60 + 45 - 35 = 70 days."
  },
  {
    "id": "fin_10",
    "teamId": "FINANCE",
    "category": "Depreciation & Taxes",
    "difficulty": "medium",
    "question": "An asset is purchased for $60,000 with an estimated useful life of 5 years and a salvage value of $10,000. Under straight-line depreciation, what is the annual depreciation expense?",
    "options": [
      "$12,000",
      "$10,000",
      "$8,000",
      "$14,000"
    ],
    "correctAnswer": 1,
    "explanation": "Depreciable Base = $60,000 - $10,000 = $50,000. Annual Depreciation = $50,000 / 5 years = $10,000 per year."
  },
  {
    "id": "fin_11",
    "teamId": "FINANCE",
    "category": "Corporate Finance",
    "difficulty": "medium",
    "question": "What is the Weighted Average Cost of Capital (WACC)?",
    "options": [
      "The average interest rate paid on short-term bank credit cards",
      "The maximum statutory corporate tax rate allowed by law",
      "The overall required rate of return a firm must earn on its existing asset base to satisfy all capital providers (debt and equity)",
      "The inflation rate adjusted for raw material commodities"
    ],
    "correctAnswer": 2,
    "explanation": "WACC blends the proportional after-tax cost of debt and the cost of equity to determine the firm's hurdle rate for capital allocation."
  },
  {
    "id": "fin_12",
    "teamId": "FINANCE",
    "category": "Financial Metrics",
    "difficulty": "easy",
    "question": "What does the Price-to-Earnings (P/E) ratio indicate to equity investors?",
    "options": [
      "The total dividends paid out divided by net cash in the bank",
      "The percentage of employees holding stock options",
      "The ratio of debt to annual revenue",
      "The ratio of current stock market price to annual earnings per share (EPS)"
    ],
    "correctAnswer": 3,
    "explanation": "The P/E ratio measures what the market is willing to pay today for a stock relative to its past or forward annual earnings per share."
  },
  {
    "id": "fin_13",
    "teamId": "FINANCE",
    "category": "Variance Analysis",
    "difficulty": "hard",
    "question": "A company budgeted $100,000 for utility expenses based on 10,000 machine hours at $10/hour. In reality, it used 11,000 machine hours and paid $9.50/hour (total $104,500). What was the utility price (rate) variance?",
    "options": [
      "$5,500 Favorable",
      "$4,500 Unfavorable",
      "$10,000 Unfavorable",
      "$5,000 Favorable"
    ],
    "correctAnswer": 0,
    "explanation": "Rate/Price Variance = Actual Hours * (Standard Rate - Actual Rate) = 11,000 * ($10.00 - $9.50) = $5,500 Favorable (since actual rate was lower than standard)."
  },
  {
    "id": "fin_14",
    "teamId": "FINANCE",
    "category": "Treasury & Liquidity",
    "difficulty": "medium",
    "question": "What is the Quick Ratio (Acid-Test Ratio) and how does it differ from the Current Ratio?",
    "options": [
      "It includes long-term bond investments in the numerator",
      "It excludes inventory and prepaid expenses from current assets because they cannot be liquidated immediately",
      "It compares total liabilities to gross sales revenue",
      "It counts only physical cash in vault drawers"
    ],
    "correctAnswer": 1,
    "explanation": "The Quick Ratio = (Cash + Marketable Securities + Receivables) / Current Liabilities, excluding less liquid inventories."
  },
  {
    "id": "fin_15",
    "teamId": "FINANCE",
    "category": "Capital Structure",
    "difficulty": "hard",
    "question": "According to the Modigliani-Miller Theorem (with corporate taxes), why does debt financing provide value to a firm?",
    "options": [
      "Creditors have voting rights that improve management discipline",
      "Debt eliminates all bankruptcy risk",
      "Interest payments are tax-deductible, creating an interest tax shield that increases firm value",
      "Lenders do not require repayment if market conditions decline"
    ],
    "correctAnswer": 2,
    "explanation": "The tax deductibility of interest expense shields taxable corporate income, reducing total taxes paid and boosting firm value."
  },
  {
    "id": "fin_16",
    "teamId": "FINANCE",
    "category": "Cost Accounting",
    "difficulty": "medium",
    "question": "What is Activity-Based Costing (ABC)?",
    "options": [
      "A budgeting system based entirely on daily recreational activities",
      "Recording costs solely on a cash-disbursement basis",
      "Pricing products at whatever the competitor charges",
      "A costing method that assigns overhead and indirect costs to specific activities and then to products based on their consumption of activities"
    ],
    "correctAnswer": 3,
    "explanation": "ABC tracks overhead costs to specific business activities and drivers, providing more accurate product and service margin calculations."
  },
  {
    "id": "fin_17",
    "teamId": "FINANCE",
    "category": "Time Value of Money",
    "difficulty": "medium",
    "question": "If an investor deposits $10,000 into an account earning 8% compounded annually, approximately how many years will it take to double to $20,000 using the Rule of 72?",
    "options": [
      "9.0 years",
      "7.2 years",
      "12.5 years",
      "6.0 years"
    ],
    "correctAnswer": 0,
    "explanation": "Using the Rule of 72: Years to Double ≈ 72 / Interest Rate = 72 / 8 = 9.0 years."
  },
  {
    "id": "fin_18",
    "teamId": "FINANCE",
    "category": "Financial Auditing",
    "difficulty": "medium",
    "question": "In corporate governance, what does an 'Unqualified Opinion' from an independent financial auditor indicate?",
    "options": [
      "The auditor lacks the necessary qualifications to perform the audit",
      "The financial statements are presented fairly, in all material respects, in accordance with applicable accounting standards (a 'clean' audit)",
      "Severe accounting irregularities and potential fraud were detected",
      "The company is immediately liable for bankruptcy proceedings"
    ],
    "correctAnswer": 1,
    "explanation": "An unqualified opinion is a clean audit report confirming the financial statements fairly represent the company's financial position without material misstatement."
  },
  {
    "id": "fin_19",
    "teamId": "FINANCE",
    "category": "Working Capital",
    "difficulty": "medium",
    "question": "A company has annual credit sales of $3,650,000 and ending Accounts Receivable of $300,000. What is its Days Sales Outstanding (DSO) assuming a 365-day year?",
    "options": [
      "25 days",
      "35 days",
      "30 days",
      "40 days"
    ],
    "correctAnswer": 2,
    "explanation": "DSO = (Accounts Receivable / Total Credit Sales) * 365 = ($300,000 / $3,650,000) * 365 = 30 days."
  },
  {
    "id": "fin_20",
    "teamId": "FINANCE",
    "category": "Valuation",
    "difficulty": "hard",
    "question": "What is Enterprise Value (EV) and how is it calculated?",
    "options": [
      "Gross Revenue minus Total Operating Expenses",
      "Total Assets on the balance sheet minus Shareholders' Equity",
      "Net Income multiplied by the P/E ratio",
      "Market Capitalization + Total Debt - Cash & Cash Equivalents"
    ],
    "correctAnswer": 3,
    "explanation": "Enterprise Value represents the theoretical takeover price of the entire operating business: EV = Market Cap + Debt - Cash."
  },
  {
    "id": "fin_21",
    "teamId": "FINANCE",
    "category": "Profitability Ratios",
    "difficulty": "medium",
    "question": "According to the DuPont Analysis framework, Return on Equity (ROE) is decomposed into which three multiplicative components?",
    "options": [
      "Net Profit Margin, Asset Turnover, and Financial Leverage (Equity Multiplier)",
      "Gross Margin, Operating Margin, Net Margin",
      "EBITDA, Free Cash Flow, and WACC",
      "Current Ratio, Quick Ratio, and Cash Ratio"
    ],
    "correctAnswer": 0,
    "explanation": "DuPont identity: ROE = (Net Income/Sales) * (Sales/Assets) * (Assets/Equity) = Profit Margin * Asset Turnover * Financial Leverage."
  },
  {
    "id": "fin_22",
    "teamId": "FINANCE",
    "category": "Fixed Income & Debt",
    "difficulty": "medium",
    "question": "When prevailing market interest rates rise, what happens to the market price of existing fixed-coupon bonds?",
    "options": [
      "Their price increases above par value",
      "Their price decreases because newer bonds offer higher yields",
      "Their price remains completely unchanged",
      "Their coupon interest rate automatically increases"
    ],
    "correctAnswer": 1,
    "explanation": "Bond prices move inversely to interest rates. When market yields rise, existing fixed-rate bonds drop in price to align yields."
  },
  {
    "id": "fin_23",
    "teamId": "FINANCE",
    "category": "Corporate Finance",
    "difficulty": "hard",
    "question": "What is Free Cash Flow to Firm (FCFF)?",
    "options": [
      "Cash left over in petty cash boxes at branch offices",
      "Dividends paid out to common equity holders",
      "Cash generated from operations available to all capital providers after funding necessary operating expenses and capital expenditures (CapEx)",
      "Gross profit before income taxes and depreciation"
    ],
    "correctAnswer": 2,
    "explanation": "FCFF = Operating Cash Flow - CapEx (or EBIT*(1-t) + D&A - CapEx - change in NWC), measuring cash available to debt and equity holders."
  },
  {
    "id": "fin_24",
    "teamId": "FINANCE",
    "category": "Budgeting",
    "difficulty": "medium",
    "question": "What is 'Zero-Based Budgeting' (ZBB)?",
    "options": [
      "A budgeting practice where expenses are reduced to zero across all departments",
      "A policy of spending zero dollars on marketing promotions",
      "A system that runs on zero computer servers",
      "A method where every line-item expense must be newly justified from a zero baseline for each budget cycle, rather than adjusting the prior year's budget"
    ],
    "correctAnswer": 3,
    "explanation": "ZBB requires managers to justify all expenditures from scratch each year, rather than starting with the previous year's actuals and adding a percentage."
  },
  {
    "id": "fin_25",
    "teamId": "FINANCE",
    "category": "Derivatives & Hedging",
    "difficulty": "medium",
    "question": "Why does a multinational corporation enter into a Currency Forward Contract?",
    "options": [
      "To lock in a guaranteed exchange rate for a future transaction and hedge against adverse currency fluctuations",
      "To speculate and maximize foreign exchange gambling gains",
      "To avoid paying corporate income taxes in the home country",
      "To eliminate credit default risk from suppliers"
    ],
    "correctAnswer": 0,
    "explanation": "Forwards hedge foreign exchange risk by locking in a binding future rate, removing uncertainty on international cash flows."
  },
  {
    "id": "fin_26",
    "teamId": "FINANCE",
    "category": "Revenue Recognition",
    "difficulty": "hard",
    "question": "Under ASC 606 / IFRS 15, when is revenue formally recognized?",
    "options": [
      "Only when physical cash is received in the bank account",
      "When performance obligations are satisfied by transferring control of promised goods or services to the customer",
      "Immediately upon signing a binding sales contract",
      "At the end of the fiscal year during tax filing"
    ],
    "correctAnswer": 1,
    "explanation": "ASC 606 stipulates revenue is recognized when or as the entity satisfies a performance obligation by transferring control of goods or services."
  },
  {
    "id": "fin_27",
    "teamId": "FINANCE",
    "category": "Capital Budgeting",
    "difficulty": "medium",
    "question": "What is the Internal Rate of Return (IRR)?",
    "options": [
      "The statutory tax rate imposed on internal corporate dividends",
      "The annual growth rate of corporate employee headcount",
      "The discount rate that makes the Net Present Value (NPV) of all project cash flows equal to exactly zero",
      "The inflation rate measured by the central bank"
    ],
    "correctAnswer": 2,
    "explanation": "IRR is the break-even discount rate where the present value of future cash inflows equals the initial investment outlay (NPV = 0)."
  },
  {
    "id": "fin_28",
    "teamId": "FINANCE",
    "category": "Cost Accounting",
    "difficulty": "easy",
    "question": "Which of the following is considered a Fixed Cost for a software development business?",
    "options": [
      "Cloud server bandwidth costs that scale directly with active users",
      "Hourly contract wages for freelance customer support agents",
      "Credit card payment merchant transaction fees",
      "Monthly commercial office building rent under a 5-year lease"
    ],
    "correctAnswer": 3,
    "explanation": "Office rent under a long-term lease remains constant regardless of company output or customer usage."
  },
  {
    "id": "fin_29",
    "teamId": "FINANCE",
    "category": "Risk Management",
    "difficulty": "hard",
    "question": "What does Value at Risk (VaR) measure in portfolio financial risk management?",
    "options": [
      "The maximum expected monetary loss over a defined time horizon at a specified statistical confidence level (e.g. 95% or 99%)",
      "The total purchase price of all shares held in a retirement fund",
      "The average dividend yield over the past ten years",
      "The risk of sudden inflation affecting commercial bank deposits"
    ],
    "correctAnswer": 0,
    "explanation": "VaR quantifies potential loss over a specific timeframe under normal market conditions at a chosen confidence level (e.g., 99% 1-day VaR of $1M)."
  },
  {
    "id": "fin_30",
    "teamId": "FINANCE",
    "category": "Equity & Shares",
    "difficulty": "medium",
    "question": "How does a corporate Share Repurchase (buyback) impact Earnings Per Share (EPS), assuming net income remains unchanged?",
    "options": [
      "It decreases EPS because cash was spent",
      "It increases EPS because the total number of outstanding shares in the denominator is reduced",
      "It has zero impact on EPS under all circumstances",
      "It forces the company to issue new preferred shares"
    ],
    "correctAnswer": 1,
    "explanation": "EPS = Net Income / Shares Outstanding. Reducing outstanding shares via buybacks increases EPS if earnings remain constant."
  },
  {
    "id": "fin_31",
    "teamId": "FINANCE",
    "category": "Financial Statements",
    "difficulty": "medium",
    "question": "Where on the financial statements is 'Retained Earnings' recorded?",
    "options": [
      "On the Income Statement as an operating expense",
      "On the Cash Flow Statement under Financing Cash Inflows",
      "On the Balance Sheet under Shareholders' Equity",
      "As a Current Liability under Accounts Payable"
    ],
    "correctAnswer": 2,
    "explanation": "Retained Earnings represents cumulative past net profits retained in the business (not paid as dividends) and resides in the Equity section of the Balance Sheet."
  },
  {
    "id": "fin_32",
    "teamId": "FINANCE",
    "category": "Corporate Finance",
    "difficulty": "hard",
    "question": "What is the difference between Operating Lease and Finance (Capital) Lease under modern ASC 842 rules?",
    "options": [
      "Operating leases are never disclosed anywhere in annual reports",
      "Finance leases can only be used for office printers and copiers",
      "There is no longer any difference between lease types in any jurisdiction",
      "Under ASC 842, both appear on the balance sheet as Right-of-Use (ROU) assets and lease liabilities, but finance leases front-load expense recognition via interest and amortization"
    ],
    "correctAnswer": 3,
    "explanation": "Under ASC 842, both leases must be capitalized on the balance sheet, but finance leases recognize amortization and interest separately, creating front-loaded expense."
  },
  {
    "id": "fin_33",
    "teamId": "FINANCE",
    "category": "Profitability Ratios",
    "difficulty": "easy",
    "question": "If a company has Net Income of $2M on Total Revenue of $20M, what is its Net Profit Margin?",
    "options": [
      "10%",
      "20%",
      "5%",
      "15%"
    ],
    "correctAnswer": 0,
    "explanation": "Net Profit Margin = (Net Income / Revenue) * 100 = ($2M / $20M) * 100 = 10%."
  },
  {
    "id": "fin_34",
    "teamId": "FINANCE",
    "category": "Working Capital",
    "difficulty": "medium",
    "question": "What is 'Factoring' of Accounts Receivable?",
    "options": [
      "Auditing invoices for math errors before mailing them",
      "Selling outstanding customer invoices to a third-party financial institution at a discount to receive immediate cash",
      "Extending payment terms from 30 days to 90 days for VIP customers",
      "Writing off bad debt as uncollectible"
    ],
    "correctAnswer": 1,
    "explanation": "Factoring allows companies to sell their receivables to a third party (factor) at a discount to accelerate liquidity."
  },
  {
    "id": "fin_35",
    "teamId": "FINANCE",
    "category": "Mergers & Acquisitions",
    "difficulty": "hard",
    "question": "In an acquisition, what is 'Goodwill' on the acquiring company's post-deal balance sheet?",
    "options": [
      "A cash donation made to a charitable foundation",
      "The target company's historical legal retainers",
      "The excess purchase price paid over the fair market value of the target's identifiable net tangible and intangible assets",
      "The value of unsold physical inventory in warehouses"
    ],
    "correctAnswer": 2,
    "explanation": "Goodwill reflects premium paid above fair value of identifiable net assets, representing brand reputation, workforce, and synergies."
  },
  {
    "id": "fin_36",
    "teamId": "FINANCE",
    "category": "Capital Budgeting",
    "difficulty": "medium",
    "question": "A project costs $120,000 upfront and yields constant net cash inflows of $30,000 each year. What is the simple payback period?",
    "options": [
      "3 years",
      "5 years",
      "2.5 years",
      "4 years"
    ],
    "correctAnswer": 3,
    "explanation": "Payback Period = Initial Investment / Annual Cash Inflow = $120,000 / $30,000 = 4 years."
  },
  {
    "id": "fin_37",
    "teamId": "FINANCE",
    "category": "Corporate Governance",
    "difficulty": "medium",
    "question": "What did the Sarbanes-Oxley Act (SOX) Section 404 mandate for public corporations?",
    "options": [
      "Management and auditors must establish, maintain, and assess the effectiveness of Internal Controls over Financial Reporting (ICFR)",
      "Companies must pay a minimum 20% annual dividend to retail shareholders",
      "Executive stock options must vest over a minimum of 10 years",
      "Corporate tax returns must be made public online"
    ],
    "correctAnswer": 0,
    "explanation": "SOX 404 requires management and external auditors to formally report on the adequacy and effectiveness of internal controls over financial reporting."
  },
  {
    "id": "fin_38",
    "teamId": "FINANCE",
    "category": "Financial Metrics",
    "difficulty": "hard",
    "question": "What is the Interest Coverage Ratio (Times Interest Earned) and what does it assess?",
    "options": [
      "Total Debt divided by Cash in Bank",
      "EBIT divided by Interest Expense; it assesses the firm's ability to service outstanding debt obligations out of operating earnings",
      "Net Income divided by common dividend payouts",
      "Accounts Payable divided by weekly supplier invoices"
    ],
    "correctAnswer": 1,
    "explanation": "Interest Coverage Ratio = EBIT / Interest Expense. A higher ratio reflects comfortable capacity to pay required borrowing interest."
  },
  {
    "id": "fin_39",
    "teamId": "FINANCE",
    "category": "Cost of Capital",
    "difficulty": "medium",
    "question": "In the Capital Asset Pricing Model (CAPM), what does Beta (β) quantify?",
    "options": [
      "The company's dividend payout percentage",
      "The company's probability of defaulting on corporate debt",
      "The sensitivity of an individual stock's returns relative to overall market systematic movements",
      "The historical inflation rate over a 30-year period"
    ],
    "correctAnswer": 2,
    "explanation": "Beta measures systematic volatility relative to the broader market benchmark (Beta > 1 indicates higher volatility than market)."
  },
  {
    "id": "fin_40",
    "teamId": "FINANCE",
    "category": "Inventory Valuation",
    "difficulty": "hard",
    "question": "During periods of rising prices (inflation), how does the FIFO (First-In, First-Out) inventory method compare to LIFO (Last-In, First-Out)?",
    "options": [
      "FIFO reports lower inventory asset values and lower net income",
      "FIFO reports identical financial results to LIFO in all inflationary conditions",
      "FIFO violates standard US GAAP rules",
      "FIFO reports lower Cost of Goods Sold (COGS), higher ending inventory asset value, and higher taxable Net Income"
    ],
    "correctAnswer": 3,
    "explanation": "Under inflation, FIFO matches older cheaper inventory costs to sales, resulting in lower COGS, higher ending inventory valuation, and higher reported earnings."
  },
  {
    "id": "fin_41",
    "teamId": "FINANCE",
    "category": "Valuation",
    "difficulty": "medium",
    "question": "Why do financial analysts often prefer Discounted Cash Flow (DCF) over simple price-to-earnings multiples?",
    "options": [
      "DCF relies on intrinsic cash flow generation and the time value of money rather than accounting distortions and transient market sentiment",
      "DCF requires zero assumptions or estimates",
      "DCF is legally required by the SEC for all public earnings calls",
      "DCF guarantees that a stock price will never drop"
    ],
    "correctAnswer": 0,
    "explanation": "DCF grounds valuation in underlying cash flow fundamentals, risk-adjusted discount rates, and economic cash generation."
  },
  {
    "id": "fin_42",
    "teamId": "FINANCE",
    "category": "Financial Statements",
    "difficulty": "easy",
    "question": "Which financial statement reports a company's financial position at a single specific moment in time (point-in-time snapshot)?",
    "options": [
      "Income Statement",
      "Balance Sheet",
      "Statement of Cash Flows",
      "Statement of Retained Earnings"
    ],
    "correctAnswer": 1,
    "explanation": "The Balance Sheet is a snapshot of assets, liabilities, and equity at a specific date, unlike flow statements covering a period of time."
  },
  {
    "id": "fin_43",
    "teamId": "FINANCE",
    "category": "Capital Structure",
    "difficulty": "medium",
    "question": "What is Mezzanine Financing in corporate capital raises?",
    "options": [
      "Financing used exclusively to remodel corporate architectural mezzanines",
      "Government grant subsidies for clean energy research",
      "A hybrid of debt and equity financing that gives the lender the right to convert to equity if the loan is not paid back on time",
      "Short-term petty cash loans from company employees"
    ],
    "correctAnswer": 2,
    "explanation": "Mezzanine capital bridges senior debt and equity, often structured as subordinated debt with warrants or equity conversion features."
  },
  {
    "id": "fin_44",
    "teamId": "FINANCE",
    "category": "Metrics & Calculations",
    "difficulty": "hard",
    "question": "A company with $10M in Total Assets and $6M in Total Debt generates $1.2M in Net Income. What is its Return on Assets (ROA) and Return on Equity (ROE)?",
    "options": [
      "ROA: 12.0%, ROE: 20.0%",
      "ROA: 20.0%, ROE: 12.0%",
      "ROA: 6.0%, ROE: 12.0%",
      "ROA: 12.0%, ROE: 30.0%"
    ],
    "correctAnswer": 3,
    "explanation": "Equity = Assets - Debt = $10M - $6M = $4M. ROA = $1.2M / $10M = 12.0%. ROE = $1.2M / $4M = 30.0%."
  },
  {
    "id": "fin_45",
    "teamId": "FINANCE",
    "category": "Fixed Income",
    "difficulty": "medium",
    "question": "What is a 'Covenant' in a corporate loan agreement?",
    "options": [
      "A legally binding condition or financial threshold (e.g. maintaining minimum leverage or liquidity ratios) that the borrower must adhere to",
      "A religious ceremony held in the boardroom",
      "The signature page of an executive employment contract",
      "An agreement to purchase rival company products"
    ],
    "correctAnswer": 0,
    "explanation": "Debt covenants protect lenders by stipulating financial health standards (e.g., maximum debt/EBITDA, minimum debt-service coverage)."
  },
  {
    "id": "fin_46",
    "teamId": "FINANCE",
    "category": "Treasury Management",
    "difficulty": "medium",
    "question": "What is the primary function of a Zero-Balance Account (ZBA) in corporate treasury?",
    "options": [
      "To hold zero money permanently so the company avoids bank service charges",
      "To automatically transfer funds from a master concentration account to cover checks presented, eliminating excess idle balances",
      "To store frozen bankruptcy reserves",
      "To hide transactions from tax authorities"
    ],
    "correctAnswer": 1,
    "explanation": "ZBAs automatically sweep funds to and from a central concentration account to cover exact disbursements while preventing idle cash."
  },
  {
    "id": "fin_47",
    "teamId": "FINANCE",
    "category": "Strategic Planning",
    "difficulty": "hard",
    "question": "What is Economic Value Added (EVA)?",
    "options": [
      "Total sales revenue added during an economic boom year",
      "The value of corporate equipment after straight-line depreciation",
      "Net Operating Profit After Tax (NOPAT) minus the capital charge (Invested Capital multiplied by WACC)",
      "Gross domestic product growth attributed to private businesses"
    ],
    "correctAnswer": 2,
    "explanation": "EVA = NOPAT - (Invested Capital * WACC), measuring true economic profit above the full opportunity cost of invested capital."
  },
  {
    "id": "fin_48",
    "teamId": "FINANCE",
    "category": "Cost Accounting",
    "difficulty": "easy",
    "question": "In manufacturing accounting, what is the sum of Direct Materials and Direct Labor called?",
    "options": [
      "Conversion Costs",
      "Period Costs",
      "Administrative Costs",
      "Prime Costs"
    ],
    "correctAnswer": 3,
    "explanation": "Prime Costs = Direct Materials + Direct Labor. (Conversion Costs = Direct Labor + Manufacturing Overhead)."
  },
  {
    "id": "fin_49",
    "teamId": "FINANCE",
    "category": "Tax Strategy",
    "difficulty": "medium",
    "question": "What is a Deferred Tax Asset (DTA) on a corporate balance sheet?",
    "options": [
      "An asset representing future tax deductions or credits that will reduce future tax liabilities (e.g. carryforward losses, temporary book-tax differences)",
      "A tax bill that is past due and accruing interest penalties",
      "Taxes paid in foreign currencies that have not yet converted",
      "A reserve fund dedicated to paying annual executive bonuses"
    ],
    "correctAnswer": 0,
    "explanation": "DTAs arise when taxes paid exceed book tax expense due to timing differences or net operating losses, providing future tax relief."
  },
  {
    "id": "fin_50",
    "teamId": "FINANCE",
    "category": "Mergers & Acquisitions",
    "difficulty": "hard",
    "question": "In an LBO (Leveraged Buyout), what is the primary source of financing used by the private equity acquirer?",
    "options": [
      "100% common equity raised from public stock markets",
      "A substantial portion of debt secured by the assets and cash flows of the target company, supplemented by a smaller equity check",
      "Interest-free loans provided by central governments",
      "Reinvested customer warranty deposits"
    ],
    "correctAnswer": 1,
    "explanation": "LBOs utilize 60-80%+ debt against the target company's assets and future cash flows, boosting equity returns upon debt repayment."
  },
  {
    "id": "ops_01",
    "teamId": "OPERATIONS",
    "category": "Lean & Six Sigma",
    "difficulty": "easy",
    "question": "In Lean manufacturing methodology, what is the Japanese term 'Muda' translated to?",
    "options": [
      "Continuous Improvement (Kaizen)",
      "Mistake-proofing (Poka-yoke)",
      "Waste",
      "Visual signboard (Kanban)"
    ],
    "correctAnswer": 2,
    "explanation": "Muda is the Japanese term for waste—any activity that consumes resources without creating value for the customer."
  },
  {
    "id": "ops_02",
    "teamId": "OPERATIONS",
    "category": "Inventory Management",
    "difficulty": "hard",
    "question": "In the Economic Order Quantity (EOQ) model, what two opposing cost categories are balanced to find the optimal order size?",
    "options": [
      "Marketing acquisition costs and delivery courier charges",
      "Raw material purchase prices and final retail prices",
      "Labor overtime wages and factory lease rent",
      "Annual inventory holding (carrying) costs and order setup costs"
    ],
    "correctAnswer": 3,
    "explanation": "EOQ finds the order quantity where annual ordering costs exactly equal annual inventory holding costs, minimizing total cost."
  },
  {
    "id": "ops_03",
    "teamId": "OPERATIONS",
    "category": "Supply Chain & Logistics",
    "difficulty": "medium",
    "question": "What is the 'Bullwhip Effect' in supply chain distribution networks?",
    "options": [
      "How small fluctuations in consumer retail demand trigger progressively larger swings in demand amplification upstream toward manufacturers and suppliers",
      "A sudden decline in truck driver availability due to weather",
      "The physical damage caused to freight during rapid railway transit",
      "Aggressive price discounting by retail competitors"
    ],
    "correctAnswer": 0,
    "explanation": "The bullwhip effect describes how slight retail demand shifts amplify as orders travel upstream due to lack of visibility, lead times, and batching."
  },
  {
    "id": "ops_04",
    "teamId": "OPERATIONS",
    "category": "Theory of Constraints",
    "difficulty": "medium",
    "question": "According to Goldratt's Theory of Constraints (TOC), what governs the maximum throughput capacity of an entire production system?",
    "options": [
      "The speed of the fastest workstation in the factory",
      "The pace and capacity of the bottleneck (the most constrained resource)",
      "The total square footage of the warehouse",
      "The number of managers supervising the factory floor"
    ],
    "correctAnswer": 1,
    "explanation": "Throughput of any system is limited by its primary constraint/bottleneck. Improving non-bottlenecks creates no additional system output."
  },
  {
    "id": "ops_05",
    "teamId": "OPERATIONS",
    "category": "Queueing & Little's Law",
    "difficulty": "hard",
    "question": "According to Little's Law (L = λ * W), if a fulfillment center has an average arrival rate (throughput) of 200 orders per hour and orders spend an average of 3 hours in the facility, what is the average Work in Process (WIP)?",
    "options": [
      "66.7 orders",
      "1,200 orders",
      "600 orders",
      "203 orders"
    ],
    "correctAnswer": 2,
    "explanation": "Little's Law: WIP (L) = Throughput (λ) * Flow Time (W) = 200 orders/hr * 3 hrs = 600 orders."
  },
  {
    "id": "ops_06",
    "teamId": "OPERATIONS",
    "category": "Quality Management",
    "difficulty": "medium",
    "question": "In Six Sigma quality methodology, a process operating at full 6-Sigma quality produces no more than how many defects per million opportunities (DPMO)?",
    "options": [
      "66.8 DPMO",
      "340 DPMO",
      "1.0 DPMO",
      "3.4 DPMO"
    ],
    "correctAnswer": 3,
    "explanation": "Accounting for a standard 1.5 sigma drift, a Six Sigma process achieves 99.99966% defect-free output, or 3.4 defects per million opportunities."
  },
  {
    "id": "ops_07",
    "teamId": "OPERATIONS",
    "category": "Project Management",
    "difficulty": "medium",
    "question": "In the Critical Path Method (CPM) of project management, what is the defining property of tasks on the 'Critical Path'?",
    "options": [
      "They have zero total float (slack); any delay in these tasks directly delays the overall project completion date",
      "They have the highest financial budget allocations",
      "They must be performed exclusively by outside contractors",
      "They are the easiest tasks to complete"
    ],
    "correctAnswer": 0,
    "explanation": "The critical path represents the longest sequence of dependent activities. Activities on this path have zero slack time."
  },
  {
    "id": "ops_08",
    "teamId": "OPERATIONS",
    "category": "Inventory Management",
    "difficulty": "medium",
    "question": "A factory consumes 50 units of a component per day with a vendor lead time of 6 days and maintains a safety stock of 100 units. What is the Reorder Point (ROP)?",
    "options": [
      "300 units",
      "400 units",
      "350 units",
      "200 units"
    ],
    "correctAnswer": 1,
    "explanation": "ROP = (Daily Demand * Lead Time) + Safety Stock = (50 * 6) + 100 = 300 + 100 = 400 units."
  },
  {
    "id": "ops_09",
    "teamId": "OPERATIONS",
    "category": "Capacity Planning",
    "difficulty": "medium",
    "question": "A manufacturing plant has a design capacity of 1,000 units/day and an effective capacity of 800 units/day. Yesterday it produced 720 units. What were its Capacity Utilization and Efficiency rates?",
    "options": [
      "Utilization: 90%, Efficiency: 72%",
      "Utilization: 80%, Efficiency: 90%",
      "Utilization: 72%, Efficiency: 90%",
      "Utilization: 72%, Efficiency: 80%"
    ],
    "correctAnswer": 2,
    "explanation": "Utilization = Actual Output / Design Capacity = 720 / 1,000 = 72%. Efficiency = Actual Output / Effective Capacity = 720 / 800 = 90%."
  },
  {
    "id": "ops_10",
    "teamId": "OPERATIONS",
    "category": "Lean Tools",
    "difficulty": "easy",
    "question": "What is 'Poka-Yoke' in manufacturing and systems design?",
    "options": [
      "A martial art practice for factory supervisors",
      "A method of sorting scrap metal for resale",
      "An automated inventory barcoding system",
      "A mistake-proofing mechanism that prevents human error or immediately halts the system when an error occurs"
    ],
    "correctAnswer": 3,
    "explanation": "Poka-yoke is mistake-proofing (e.g., a SIM card tray that can only fit in one orientation, preventing incorrect insertion)."
  },
  {
    "id": "ops_11",
    "teamId": "OPERATIONS",
    "category": "Supply Chain",
    "difficulty": "medium",
    "question": "In Incoterms 2020 rules for international shipping, what does 'FOB' (Free On Board) signify?",
    "options": [
      "The seller delivers goods onto the vessel nominated by the buyer; risk of loss passes to the buyer once the goods are on board",
      "The seller delivers goods free of shipping charges to the buyer's home doorstep",
      "The buyer pays zero customs duties upon import",
      "The cargo travels by air freight only"
    ],
    "correctAnswer": 0,
    "explanation": "FOB means the seller clears goods for export and loads them onto the ship. Once on board, all transport costs and risk transfer to the buyer."
  },
  {
    "id": "ops_12",
    "teamId": "OPERATIONS",
    "category": "Facility Layout",
    "difficulty": "medium",
    "question": "In warehouse layout design, what is 'Slotting Optimization'?",
    "options": [
      "Installing coin-operated vending machines in break rooms",
      "Assigning warehouse inventory locations based on velocity, pick frequency, and physical dimensions to minimize worker travel time",
      "Scheduling lunch shift intervals for equipment drivers",
      "Constructing mezzanine balconies for executive offices"
    ],
    "correctAnswer": 1,
    "explanation": "Slotting places high-velocity fast-moving goods in easily accessible, ergonomic picking zones near packing docks to cut travel time."
  },
  {
    "id": "ops_13",
    "teamId": "OPERATIONS",
    "category": "Lean & Six Sigma",
    "difficulty": "medium",
    "question": "What are the 5 phases of the Six Sigma DMAIC improvement cycle?",
    "options": [
      "Design, Manage, Automate, Inspect, Control",
      "Discover, Map, Assemble, Implement, Complete",
      "Define, Measure, Analyze, Improve, Control",
      "Delegate, Motivate, Audit, Incentivize, Calibrate"
    ],
    "correctAnswer": 2,
    "explanation": "DMAIC stands for Define the problem, Measure current performance, Analyze root causes, Improve the process, and Control future performance."
  },
  {
    "id": "ops_14",
    "teamId": "OPERATIONS",
    "category": "Inventory Management",
    "difficulty": "medium",
    "question": "In ABC Inventory Analysis, how is inventory categorized based on the Pareto Principle (80/20 rule)?",
    "options": [
      "A items are perishable foods; B items are chemicals; C items are electronics",
      "Alphabetical sorting by supplier legal registered name",
      "Items stored on Shelf A, Shelf B, and Shelf C",
      "A items: ~20% of SKUs accounting for ~80% of total annual consumption value; B items: moderate; C items: bulk SKUs with low value"
    ],
    "correctAnswer": 3,
    "explanation": "ABC classification segregates inventory by annual value impact: 'A' items represent ~70-80% of value with tightest control."
  },
  {
    "id": "ops_15",
    "teamId": "OPERATIONS",
    "category": "Service Operations",
    "difficulty": "hard",
    "question": "In Kendall's notation for queueing models (e.g. M/M/1), what does the first 'M' specify?",
    "options": [
      "Markovian / Poisson arrival process (exponential inter-arrival times)",
      "Maximum queue length allowed",
      "Manual mechanical service dispensing",
      "Multiple server channels operating in parallel"
    ],
    "correctAnswer": 0,
    "explanation": "In Kendall's notation, M denotes a Markovian (memoryless) exponential distribution for arrival times or service times."
  },
  {
    "id": "ops_16",
    "teamId": "OPERATIONS",
    "category": "Supply Chain",
    "difficulty": "medium",
    "question": "What is 'Vendor-Managed Inventory' (VMI)?",
    "options": [
      "When the customer takes ownership of the vendor's production machinery",
      "An arrangement where the supplier monitors inventory levels at the customer's site and assumes responsibility for replenishment orders",
      "When a vendor refuses to share shipment tracking information",
      "A database that logs vendor invoicing addresses"
    ],
    "correctAnswer": 1,
    "explanation": "VMI shifts replenishment responsibility to the supplier based on shared inventory and consumption data, cutting stockouts and lead time."
  },
  {
    "id": "ops_17",
    "teamId": "OPERATIONS",
    "category": "Operations Metrics",
    "difficulty": "medium",
    "question": "What does Overall Equipment Effectiveness (OEE) measure, and what are its three fundamental components?",
    "options": [
      "Speed * Electricity * Output",
      "Budget * Labor * Uptime",
      "Availability * Performance * Quality",
      "Maintenance * Depreciation * Safety"
    ],
    "correctAnswer": 2,
    "explanation": "OEE = Availability (uptime) * Performance (speed vs ideal cycle time) * Quality (good parts vs total parts produced)."
  },
  {
    "id": "ops_18",
    "teamId": "OPERATIONS",
    "category": "Lean Tools",
    "difficulty": "easy",
    "question": "What are the 5S steps in workplace organization?",
    "options": [
      "Speed, Safety, Security, Standards, Salary",
      "Scan, Store, Ship, Save, Scale",
      "Select, Solve, Support, Schedule, Share",
      "Sort, Set in order, Shine, Standardize, Sustain"
    ],
    "correctAnswer": 3,
    "explanation": "5S comes from Japanese: Seiri (Sort), Seiton (Set in order), Seiso (Shine), Seiketsu (Standardize), and Shitsuke (Sustain)."
  },
  {
    "id": "ops_19",
    "teamId": "OPERATIONS",
    "category": "Production Planning",
    "difficulty": "hard",
    "question": "In Material Requirements Planning (MRP), what is the difference between Gross Requirements and Net Requirements?",
    "options": [
      "Net Requirements = Gross Requirements minus Available On-Hand Inventory and Scheduled Receipts",
      "Gross Requirements include product profit margins; Net Requirements exclude profit",
      "Gross Requirements are for physical parts; Net Requirements are for software licenses",
      "There is no difference; both represent customer orders"
    ],
    "correctAnswer": 0,
    "explanation": "Net requirements represent actual procurement needed: Gross demand minus on-hand inventory minus expected incoming receipts."
  },
  {
    "id": "ops_20",
    "teamId": "OPERATIONS",
    "category": "Procurement",
    "difficulty": "medium",
    "question": "What is the difference between an RFP (Request for Proposal) and an RFQ (Request for Quotation)?",
    "options": [
      "An RFP is only used by military branches; an RFQ is used by retail stores",
      "An RFQ focuses on price bids for well-defined standard specs; an RFP solicits creative technical solutions and proposals for complex requirements",
      "An RFQ requires verbal phone calls; an RFP is always sent via postal mail",
      "An RFP is legally binding upon opening; an RFQ is informal"
    ],
    "correctAnswer": 1,
    "explanation": "An RFQ seeks price quotes for standardized goods with strict specs; an RFP asks vendors how they would design and deliver a solution."
  },
  {
    "id": "ops_21",
    "teamId": "OPERATIONS",
    "category": "Total Quality Management",
    "difficulty": "medium",
    "question": "What is an Ishikawa diagram (Fishbone diagram) utilized for in root cause analysis?",
    "options": [
      "To map the migration routes of supply chain cargo ships",
      "To calculate the compound annual growth rate of production output",
      "To systematically brainstorm and categorize potential causes of a problem across categories like Methods, Machines, Materials, and Manpower",
      "To outline employee career progression hierarchies"
    ],
    "correctAnswer": 2,
    "explanation": "Fishbone diagrams graphically organize cause-and-effect relationships across core operational categories (6Ms) to uncover root causes."
  },
  {
    "id": "ops_22",
    "teamId": "OPERATIONS",
    "category": "Supply Chain",
    "difficulty": "hard",
    "question": "What is 'Cross-Docking' in freight distribution centers?",
    "options": [
      "Moving shipping containers across international maritime borders without inspection",
      "Building bridges between adjacent warehouse buildings",
      "Storing pallets on high mezzanine racks for over 180 days",
      "Unloading materials from an incoming inbound truck and loading them directly onto outbound trucks with little or no storage time in between"
    ],
    "correctAnswer": 3,
    "explanation": "Cross-docking routes products straight from inbound docks to outbound shipping doors, eliminating intermediate storage and put-away handling."
  },
  {
    "id": "ops_23",
    "teamId": "OPERATIONS",
    "category": "Lean & Just-In-Time",
    "difficulty": "medium",
    "question": "What is the fundamental difference between a 'Push' production system (e.g. MRP) and a 'Pull' system (e.g. Kanban)?",
    "options": [
      "Push produces goods according to a forward forecast schedule; Pull authorizes production only in response to actual downstream consumption signals",
      "Push uses electric conveyor belts; Pull uses manual handcarts",
      "Push is only for automotive manufacturing; Pull is for restaurants",
      "Pull systems always maintain larger finished goods inventory reserves"
    ],
    "correctAnswer": 0,
    "explanation": "Push builds based on demand forecasts; Pull reacts to actual consumption signals (Kanban), eliminating overproduction waste."
  },
  {
    "id": "ops_24",
    "teamId": "OPERATIONS",
    "category": "Statistical Process Control",
    "difficulty": "hard",
    "question": "In process capability analysis, what does a Process Capability Index (Cpk) of 1.33 or greater signify?",
    "options": [
      "The process is completely incapable of producing acceptable parts",
      "The process variation is adequately centered and narrow enough that virtually all parts fall comfortably within specification limits (at least 4-sigma capability)",
      "The machines require immediate emergency overhaul",
      "The process speed should be reduced by 33%"
    ],
    "correctAnswer": 1,
    "explanation": "Cpk >= 1.33 is a standard industrial benchmark indicating a capable process whose 3-sigma spread is comfortably inside the customer tolerances."
  },
  {
    "id": "ops_25",
    "teamId": "OPERATIONS",
    "category": "Maintenance Operations",
    "difficulty": "medium",
    "question": "What is the primary difference between Preventive Maintenance (PM) and Predictive Maintenance (PdM)?",
    "options": [
      "Preventive is performed after a machine breaks down; Predictive is performed when purchasing the machine",
      "Predictive requires zero measurement tools",
      "Preventive runs on predetermined time/usage schedules; Predictive uses sensor diagnostics and condition monitoring (vibration, thermal) to service equipment just before failure",
      "Preventive is only for software bugs; Predictive is for hardware"
    ],
    "correctAnswer": 2,
    "explanation": "Preventive maintenance follows calendar or runtime cycles; predictive maintenance monitors real-time condition sensors (IoT) to preempt failure."
  },
  {
    "id": "ops_26",
    "teamId": "OPERATIONS",
    "category": "Lean Tools",
    "difficulty": "easy",
    "question": "What is a 'Kanban' card primarily used for on a production line?",
    "options": [
      "To pay employee daily wages in cash",
      "To record employee vacation time requests",
      "To warn visitors about hazardous noise levels",
      "To serve as a visual signal authorizing the production or movement of parts in a pull replenishment system"
    ],
    "correctAnswer": 3,
    "explanation": "Kanban (Japanese for signboard/card) acts as a visual trigger signaling when upstream stations need to produce or replenish parts."
  },
  {
    "id": "ops_27",
    "teamId": "OPERATIONS",
    "category": "Supply Chain Risk",
    "difficulty": "medium",
    "question": "What is Single-Sourcing versus Sole-Sourcing in strategic procurement?",
    "options": [
      "Single-sourcing is a deliberate choice to use one supplier among multiple options; sole-sourcing occurs when only one supplier exists in the market that can provide the item",
      "Sole-sourcing is illegal under antitrust laws in all countries",
      "Single-sourcing refers to buying from domestic sources only",
      "They are identical terms with no legal or commercial distinction"
    ],
    "correctAnswer": 0,
    "explanation": "Single-sourcing is an intentional strategic decision to partner with one vendor; sole-sourcing is forced because no other viable vendor exists."
  },
  {
    "id": "ops_28",
    "teamId": "OPERATIONS",
    "category": "Continuous Improvement",
    "difficulty": "easy",
    "question": "What does the Japanese concept 'Kaizen' embody in modern operations?",
    "options": [
      "Massive, high-cost overhaul of an entire plant once a decade",
      "Continuous, incremental improvement involving everyone from shop-floor workers to executives",
      "Strict punitive penalties for manufacturing errors",
      "Replacing all human labor with robotic arms"
    ],
    "correctAnswer": 1,
    "explanation": "Kaizen means continuous improvement through small, ongoing, incremental positive changes involving all employees."
  },
  {
    "id": "ops_29",
    "teamId": "OPERATIONS",
    "category": "Line Balancing",
    "difficulty": "hard",
    "question": "A production line operating 8 hours (480 minutes) per day must satisfy customer demand of 240 units per day. What is the required Takt Time?",
    "options": [
      "0.5 minutes per unit",
      "1.5 minutes per unit",
      "2.0 minutes per unit",
      "4.0 minutes per unit"
    ],
    "correctAnswer": 2,
    "explanation": "Takt Time = Available Production Time / Customer Demand = 480 minutes / 240 units = 2.0 minutes per unit."
  },
  {
    "id": "ops_30",
    "teamId": "OPERATIONS",
    "category": "Inventory Accounting",
    "difficulty": "medium",
    "question": "What is 'Cycle Counting' in warehouse inventory management compared to an Annual Physical Inventory?",
    "options": [
      "Counting only items transported on motorized bicycles",
      "Counting inventory once every leap year",
      "Guessing inventory quantities based on historical purchase receipts",
      "Counting a small subset of specific inventory items on a continuous, rotating scheduled basis without shutting down operations"
    ],
    "correctAnswer": 3,
    "explanation": "Cycle counting audits specific inventory categories year-round, maintaining continuous accuracy without halting business for annual inventory shutdown."
  },
  {
    "id": "ops_31",
    "teamId": "OPERATIONS",
    "category": "Lean Tools",
    "difficulty": "medium",
    "question": "What is 'SMED' (Single-Minute Exchange of Die) in manufacturing setups?",
    "options": [
      "A technique to reduce machine changeover and setup time to under 10 minutes (single-digit minutes)",
      "A microchip welding process for semiconductor manufacturing",
      "An automated die casting tool that stamps 60 parts a minute",
      "A mandatory trade union negotiation protocol"
    ],
    "correctAnswer": 0,
    "explanation": "SMED separates and converts internal setup tasks to external tasks, slashing tooling changeover times to single-digit minutes (<10 min)."
  },
  {
    "id": "ops_32",
    "teamId": "OPERATIONS",
    "category": "Project Management",
    "difficulty": "medium",
    "question": "What is 'Fast-Tracking' in project schedule compression?",
    "options": [
      "Adding more staff and money to shorten task durations (crashing)",
      "Performing activities in parallel that were originally planned in sequence, which can increase rework risk",
      "Canceling all project status meetings",
      "Removing quality inspection steps from the schedule"
    ],
    "correctAnswer": 1,
    "explanation": "Fast-tracking compresses schedules by running sequential phases concurrently (e.g. building while still designing), accepting potential rework risk."
  },
  {
    "id": "ops_33",
    "teamId": "OPERATIONS",
    "category": "Quality Management",
    "difficulty": "medium",
    "question": "What is the 80/20 rule as applied in a Pareto Chart for quality defects?",
    "options": [
      "80% of workers cause 20% of product output",
      "Defects should never exceed 20% of total revenue",
      "80% of process problems or defects typically originate from roughly 20% of the vital root causes",
      "Inspectors should check only 20 out of every 100 items"
    ],
    "correctAnswer": 2,
    "explanation": "A Pareto chart isolates the 'vital few' causes (the 20%) responsible for the vast majority (80%) of quality defects."
  },
  {
    "id": "ops_34",
    "teamId": "OPERATIONS",
    "category": "Lean Concepts",
    "difficulty": "easy",
    "question": "In Lean manufacturing, what does a 'Gemba Walk' refer to?",
    "options": [
      "A 5-kilometer charity walk sponsored by the corporate HR team",
      "An evacuation drill conducted during fire alarms",
      "A digital virtual reality simulation of assembly lines",
      "Executives and managers going to the actual workplace ('the real place' where value is created) to observe and listen"
    ],
    "correctAnswer": 3,
    "explanation": "Gemba (Japanese for 'the real place') walk means going to the shop floor to see actual processes, engage with frontline workers, and identify waste."
  },
  {
    "id": "ops_35",
    "teamId": "OPERATIONS",
    "category": "Supply Chain",
    "difficulty": "hard",
    "question": "What is 'Reverse Logistics' in supply chain operations?",
    "options": [
      "The specialized process of handling returned, damaged, recalled, or end-of-life products from customers back through the supply chain for repair, recycling, or disposal",
      "Driving transport trucks backwards into warehouse loading docks",
      "Purchasing materials exclusively from international competitors",
      "Shipping products from retail stores to factory assembly lines"
    ],
    "correctAnswer": 0,
    "explanation": "Reverse logistics manages the backward flow of goods (returns, repairs, refurbishing, recycling) from customer back to seller/manufacturer."
  },
  {
    "id": "ops_36",
    "teamId": "OPERATIONS",
    "category": "Operations Strategy",
    "difficulty": "medium",
    "question": "What is the difference between Make-to-Stock (MTS) and Make-to-Order (MTO)?",
    "options": [
      "MTS is for perishable foods; MTO is for automobiles",
      "MTS manufactures products in advance based on forecasts; MTO begins production only after receiving a confirmed customer order",
      "MTS requires zero inventory storage; MTO requires huge warehouses",
      "MTO is only utilized by government defense contractors"
    ],
    "correctAnswer": 1,
    "explanation": "MTS anticipates demand and builds inventory; MTO triggers custom or tailored production only upon receipt of actual customer orders."
  },
  {
    "id": "ops_37",
    "teamId": "OPERATIONS",
    "category": "Service Operations",
    "difficulty": "medium",
    "question": "What is 'Service Level Agreement' (SLA) in operations and vendor management?",
    "options": [
      "The contract price paid for corporate catering lunches",
      "An agreement signed by customers waiving their right to return goods",
      "A document outlining the exact metrics and standards of performance, response time, and availability guaranteed by a service provider",
      "The architectural floor plan of customer service call centers"
    ],
    "correctAnswer": 2,
    "explanation": "An SLA defines measurable commitments between provider and client (e.g. 99.9% system uptime, 15-minute response to critical outages)."
  },
  {
    "id": "ops_38",
    "teamId": "OPERATIONS",
    "category": "Procurement",
    "difficulty": "hard",
    "question": "In the Kraljic Matrix for strategic procurement, which quadrant represents high financial impact and high supply market risk?",
    "options": [
      "Non-critical items",
      "Leverage items",
      "Bottleneck items",
      "Strategic items"
    ],
    "correctAnswer": 3,
    "explanation": "Strategic items (high profit impact, high supply risk) require close long-term partnerships, risk management, and collaborative development."
  },
  {
    "id": "ops_39",
    "teamId": "OPERATIONS",
    "category": "Process Design",
    "difficulty": "medium",
    "question": "What is Value Stream Mapping (VSM) in Lean operations?",
    "options": [
      "A flowchart method that maps every step in the material and information flow, distinguishing value-adding time from non-value-adding waste",
      "A financial balance sheet showing stock equity changes over time",
      "A GPS tracking map of delivery trucks on highways",
      "An organization chart showing senior executive salaries"
    ],
    "correctAnswer": 0,
    "explanation": "VSM visually charts the end-to-end journey of a product or service, highlighting lead times, cycle times, inventory build-ups, and waste."
  },
  {
    "id": "ops_40",
    "teamId": "OPERATIONS",
    "category": "Total Quality Management",
    "difficulty": "medium",
    "question": "In quality management, what are the Four Costs of Quality (COQ)?",
    "options": [
      "Labor costs, Machine costs, Electricity costs, and Shipping costs",
      "Prevention costs, Appraisal costs, Internal failure costs, and External failure costs",
      "Software costs, Hardware costs, Cloud costs, and Training costs",
      "Advertising costs, Sales costs, Promotion costs, and Legal costs"
    ],
    "correctAnswer": 1,
    "explanation": "Cost of Quality classifies costs into Prevention, Appraisal (inspection/testing), Internal failure (rework/scrap), and External failure (warranties/recalls)."
  },
  {
    "id": "ops_41",
    "teamId": "OPERATIONS",
    "category": "Inventory Management",
    "difficulty": "hard",
    "question": "A company operates 365 days a year with an annual Cost of Goods Sold (COGS) of $7,300,000 and average inventory of $1,000,000. What is its Inventory Turnover and Days of Inventory on Hand (DSI)?",
    "options": [
      "Turnover: 5.0 times/yr, DSI: 73 days",
      "Turnover: 7.3 times/yr, DSI: 73 days",
      "Turnover: 7.3 times/yr, DSI: 50 days",
      "Turnover: 10.0 times/yr, DSI: 36.5 days"
    ],
    "correctAnswer": 2,
    "explanation": "Inventory Turnover = COGS / Average Inventory = $7,300,000 / $1,000,000 = 7.3 turns. DSI = 365 / 7.3 = 50 days."
  },
  {
    "id": "ops_42",
    "teamId": "OPERATIONS",
    "category": "Supply Chain",
    "difficulty": "medium",
    "question": "What does '3PL' stand for in commercial logistics operations?",
    "options": [
      "Three-Phase Laser cutting machine",
      "Third-tier Production License",
      "Triple Packing Layer standards for cargo",
      "Third-Party Logistics (outsourcing e-commerce warehousing, fulfillment, freight packing, and transportation to a specialized logistics provider)"
    ],
    "correctAnswer": 3,
    "explanation": "3PL refers to third-party logistics firms that handle supply chain execution (storage, fulfillment, transport) on behalf of companies."
  },
  {
    "id": "ops_43",
    "teamId": "OPERATIONS",
    "category": "Project Management",
    "difficulty": "medium",
    "question": "What is 'Scope Creep' in project and program management?",
    "options": [
      "The slow, uncontrolled addition of features, requirements, or deliverables to a project without corresponding adjustments to time, budget, or resources",
      "The natural settling of concrete foundations under a new factory",
      "A reduction in project team headcount midway through execution",
      "The stealthy monitoring of employee computer screens"
    ],
    "correctAnswer": 0,
    "explanation": "Scope creep occurs when new requirements continually expand project boundaries without formal approval or budget/timeline expansion."
  },
  {
    "id": "ops_44",
    "teamId": "OPERATIONS",
    "category": "Statistical Quality Control",
    "difficulty": "hard",
    "question": "In statistical process control, what is the fundamental difference between 'Common Cause Variation' and 'Special Cause Variation'?",
    "options": [
      "Common cause is caused by workers; special cause is caused by software",
      "Common cause is inherent, predictable system noise; special cause is an external, assignable abnormality that requires immediate root-cause investigation",
      "Common cause occurs once a year; special cause occurs every hour",
      "There is no statistical difference between variation types"
    ],
    "correctAnswer": 1,
    "explanation": "Dr. Deming established that common cause variation is natural to the process design, while special causes stem from specific outside disruptions."
  },
  {
    "id": "ops_45",
    "teamId": "OPERATIONS",
    "category": "Safety & Human Factors",
    "difficulty": "easy",
    "question": "What is the primary objective of a 'Lockout/Tagout' (LOTO) safety procedure in industrial plants?",
    "options": [
      "To lock factory perimeter gates after midnight to prevent theft",
      "To prevent unauthorized workers from entering the executive cafeteria",
      "To ensure dangerous machinery is properly de-energized and unable to start up unexpectedly during maintenance or servicing",
      "To tag defect pallets for warehouse recycling"
    ],
    "correctAnswer": 2,
    "explanation": "LOTO safeguards workers by isolating and locking hazardous energy sources (electrical, hydraulic, pneumatic) before repairs."
  },
  {
    "id": "ops_46",
    "teamId": "OPERATIONS",
    "category": "Forecasting",
    "difficulty": "medium",
    "question": "In time-series demand forecasting, what does Exponential Smoothing accomplish?",
    "options": [
      "It assumes demand will double every calendar quarter",
      "It flattens seasonal spikes by dividing sales numbers by 12",
      "It eliminates the need for mathematical calculations",
      "It assigns exponentially decreasing weights to older historical demand observations, giving the highest weight to the most recent period"
    ],
    "correctAnswer": 3,
    "explanation": "Exponential smoothing weights recent historical data more heavily while discounting older data with an alpha smoothing parameter."
  },
  {
    "id": "ops_47",
    "teamId": "OPERATIONS",
    "category": "Operations Strategy",
    "difficulty": "medium",
    "question": "What is the concept of 'Agile' in operations management compared to rigid Waterfall execution?",
    "options": [
      "Iterative, rapid sprint cycles with continuous stakeholder feedback and adaptability to changing requirements, rather than rigid sequential execution",
      "Requiring all workers to perform morning stretching exercises",
      "Eliminating all quality documentation and checklists",
      "Outsourcing all engineering tasks to overseas contractors"
    ],
    "correctAnswer": 0,
    "explanation": "Agile emphasizes short iterative cycles, adaptive planning, early delivery, and flexible response to changing requirements."
  },
  {
    "id": "ops_48",
    "teamId": "OPERATIONS",
    "category": "Warehouse Logistics",
    "difficulty": "medium",
    "question": "What is 'Wave Picking' in e-commerce fulfillment centers?",
    "options": [
      "Workers waving hand scanners at pallets from a distance",
      "Picking orders organized in synchronized batches or waves aligned with shipping carrier departure schedules and delivery routes",
      "Only picking items during high tide in coastal ports",
      "Allowing workers to pick whatever items they want randomly"
    ],
    "correctAnswer": 1,
    "explanation": "Wave picking groups customer orders into scheduled batches (waves) based on factors like carrier departure times, zones, or product types."
  },
  {
    "id": "ops_49",
    "teamId": "OPERATIONS",
    "category": "Supply Chain",
    "difficulty": "hard",
    "question": "What is 'Nearshoring' and why has it accelerated among global manufacturers?",
    "options": [
      "Moving corporate headquarters onto coastal beachfront properties",
      "Subcontracting all manufacturing to oceanic shipping vessels",
      "Relocating supply chain manufacturing closer to the primary consumer market (e.g. from Asia to Mexico/Eastern Europe) to cut lead times, freight costs, and geopolitical risk",
      "Replacing ocean transport entirely with passenger airplanes"
    ],
    "correctAnswer": 2,
    "explanation": "Nearshoring brings production closer to end consumers to shorten lead times, reduce tariff and geopolitical exposure, and boost resilience."
  },
  {
    "id": "ops_50",
    "teamId": "OPERATIONS",
    "category": "Lean Tools",
    "difficulty": "medium",
    "question": "What does the 'Andon Cord' (or Andon Board) signify on a Toyota Production System line?",
    "options": [
      "A decorative green ribbon hung over newly assembled vehicles",
      "A cable used to tie pallets onto delivery trucks",
      "A computer power cord connecting factory servers",
      "A signal or physical cord that any worker can pull to immediately pause the assembly line when a defect or safety problem is detected"
    ],
    "correctAnswer": 3,
    "explanation": "The Andon cord empowers any line worker to stop production immediately upon detecting an anomaly (Jidoka principle), solving defects at source."
  }
,
  {
    "id": "binary_01",
    "teamId": "HR",
    "category": "Binary Code Challenge",
    "difficulty": "hard",
    "question": "Decode this binary-coded statement and choose its wording:\\n00010/10101/10011/01001/01110/00101/10011/10011 | 00001/01110/00001/01100/11001/10100/01001/00011/10011 | 10101/10011/00101/10011 | 00100/00001/10100/00001 | 10100/01111 | 10011/10101/10000/10000/01111/10010/10100 | 00010/00101/10100/10100/00101/10010 | 00010/10101/10011/01001/01110/00101/10011/10011 | 00100/00101/00011/01001/10011/01001/01111/01110/10011",
    "options": ["Prescriptive analytics recommends actions based on data insights.", "Business analytics uses data to support better business decisions.", "Scenario analysis evaluates possible outcomes under different conditions.", "Trend analysis identifies changes in business performance over time."],
    "correctAnswer": 1,
    "explanation": "Business analytics uses data to support better business decisions."
  },
  {
    "id": "binary_02",
    "teamId": "MARKETING",
    "category": "Binary Code Challenge",
    "difficulty": "hard",
    "question": "Decode this binary-coded statement and choose its wording:\\n00100/00001/10100/00001 | 00001/01110/00001/01100/11001/10011/01001/10011 | 01000/00101/01100/10000/10011 | 01111/10010/00111/00001/01110/01001/11010/00001/10100/01001/01111/01110/10011 | 01001/00100/00101/01110/10100/01001/00110/11001 | 01001/01101/10000/01111/10010/10100/00001/01110/10100 | 00010/10101/10011/01001/01110/00101/10011/10011 | 10100/10010/00101/01110/00100/10011",
    "options": ["Data visualization makes complex business information easier to understand.", "What-if analysis helps compare alternative business decisions.", "Data segmentation helps organizations analyze different customer groups.", "Data analysis helps organizations identify important business trends."],
    "correctAnswer": 3,
    "explanation": "Data analysis helps organizations identify important business trends."
  },
  {
    "id": "binary_03",
    "teamId": "FINANCE",
    "category": "Binary Code Challenge",
    "difficulty": "hard",
    "question": "Decode this binary-coded statement and choose its wording:\\n00010/10101/10011/01001/01110/00101/10011/10011 | 00001/01110/00001/01100/11001/10100/01001/00011/10011 | 00011/01111/01110/10110/00101/10010/10100/10011 | 10010/00001/10111 | 00100/00001/10100/00001 | 01001/01110/10100/01111 | 01101/00101/00001/01110/01001/01110/00111/00110/10101/01100 | 01001/01110/10011/01001/00111/01000/10100/10011",
    "options": ["Data cleaning improves the accuracy and reliability of analysis.", "KPIs help organizations measure business performance.", "Business analytics converts raw data into meaningful insights.", "Profitability analysis identifies products or services generating higher returns."],
    "correctAnswer": 2,
    "explanation": "Business analytics converts raw data into meaningful insights."
  },
  {
    "id": "binary_04",
    "teamId": "OPERATIONS",
    "category": "Binary Code Challenge",
    "difficulty": "hard",
    "question": "Decode this binary-coded statement and choose its wording:\\n01000/01001/10011/10100/01111/10010/01001/00011/00001/01100 | 00100/00001/10100/00001 | 00011/00001/01110 | 00010/00101 | 00001/01110/00001/01100/11001/11010/00101/00100 | 10100/01111 | 10101/01110/00100/00101/10010/10011/10100/00001/01110/00100 | 00010/10101/10011/01001/01110/00101/10011/10011 | 10000/00101/10010/00110/01111/10010/01101/00001/01110/00011/00101",
    "options": ["Cost analysis helps organizations identify areas of unnecessary expenditure.", "Data validation ensures that analytical data is accurate and consistent.", "Sales data can reveal patterns in customer purchasing behavior.", "Historical data can be analyzed to understand business performance."],
    "correctAnswer": 3,
    "explanation": "Historical data can be analyzed to understand business performance."
  },
  {
    "id": "binary_05",
    "teamId": "HR",
    "category": "Binary Code Challenge",
    "difficulty": "hard",
    "question": "Decode this binary-coded statement and choose its wording:\\n00100/00101/10011/00011/10010/01001/10000/10100/01001/10110/00101 | 00001/01110/00001/01100/11001/10100/01001/00011/10011 | 00101/11000/10000/01100/00001/01001/01110/10011 | 10111/01000/00001/10100 | 01000/00001/10000/10000/00101/01110/00101/00100 | 01001/01110 | 00001 | 00010/10101/10011/01001/01110/00101/10011/10011",
    "options": ["Descriptive analytics explains what happened in a business.", "Customer analytics helps organizations understand customer preferences.", "Customer churn analysis helps predict customers likely to leave.", "Data integration combines information from multiple business sources."],
    "correctAnswer": 0,
    "explanation": "Descriptive analytics explains what happened in a business."
  },
  {
    "id": "binary_06",
    "teamId": "MARKETING",
    "category": "Binary Code Challenge",
    "difficulty": "hard",
    "question": "Decode this binary-coded statement and choose its wording:\\n00100/01001/00001/00111/01110/01111/10011/10100/01001/00011 | 00001/01110/00001/01100/11001/10100/01001/00011/10011 | 01001/00100/00101/01110/10100/01001/00110/01001/00101/10011 | 10111/01000/11001 | 00001 | 00010/10101/10011/01001/01110/00101/10011/10011 | 01111/10101/10100/00011/01111/01101/00101 | 01111/00011/00011/10101/10010/10010/00101/00100",
    "options": ["Diagnostic analytics identifies why a business outcome occurred.", "SQL can be used to extract relevant business data from databases.", "Employee data can be analyzed to improve workforce performance.", "Customer lifetime value analysis estimates the long-term value of customers."],
    "correctAnswer": 0,
    "explanation": "Diagnostic analytics identifies why a business outcome occurred."
  },
  {
    "id": "binary_07",
    "teamId": "FINANCE",
    "category": "Binary Code Challenge",
    "difficulty": "hard",
    "question": "Decode this binary-coded statement and choose its wording:\\n10000/10010/00101/00100/01001/00011/10100/01001/10110/00101 | 00001/01110/00001/01100/11001/10100/01001/00011/10011 | 00101/10011/10100/01001/01101/00001/10100/00101/10011 | 10111/01000/00001/10100 | 01101/00001/11001 | 01000/00001/10000/10000/00101/01110 | 01001/01110 | 10100/01000/00101 | 00110/10101/10100/10101/10010/00101",
    "options": ["Excel can be used to perform business calculations and data analysis.", "Predictive analytics estimates what may happen in the future.", "Financial analytics supports better budgeting and financial planning.", "Market analysis helps identify opportunities and competitive trends."],
    "correctAnswer": 1,
    "explanation": "Predictive analytics estimates what may happen in the future."
  },
  {
    "id": "binary_08",
    "teamId": "OPERATIONS",
    "category": "Binary Code Challenge",
    "difficulty": "hard",
    "question": "Decode this binary-coded statement and choose its wording:\\n10000/10010/00101/10011/00011/10010/01001/10000/10100/01001/10110/00101 | 00001/01110/00001/01100/11001/10100/01001/00011/10011 | 10010/00101/00011/01111/01101/01101/00101/01110/00100/10011 | 00001/00011/10100/01001/01111/01110/10011 | 00010/00001/10011/00101/00100 | 01111/01110 | 00100/00001/10100/00001 | 01001/01110/10011/01001/00111/01000/10100/10011",
    "options": ["Inventory analytics helps organizations optimize stock levels.", "Power BI can be used to create interactive business dashboards.", "Prescriptive analytics recommends actions based on data insights.", "Marketing analytics measures the effectiveness of marketing campaigns."],
    "correctAnswer": 2,
    "explanation": "Prescriptive analytics recommends actions based on data insights."
  },
  {
    "id": "binary_09",
    "teamId": "HR",
    "category": "Binary Code Challenge",
    "difficulty": "hard",
    "question": "Decode this binary-coded statement and choose its wording:\\n00100/00001/10100/00001 | 10110/01001/10011/10101/00001/01100/01001/11010/00001/10100/01001/01111/01110 | 01101/00001/01011/00101/10011 | 00011/01111/01101/10000/01100/00101/11000 | 00010/10101/10011/01001/01110/00101/10011/10011 | 01001/01110/00110/01111/10010/01101/00001/10100/01001/01111/01110 | 00101/00001/10011/01001/00101/10010 | 10100/01111 | 10101/01110/00100/00101/10010/10011/10100/00001/01110/00100",
    "options": ["Data visualization makes complex business information easier to understand.", "Supply chain analytics improves the efficiency of supply chain operations.", "Dashboards provide real-time visibility into important business metrics.", "Operational analytics helps improve business process efficiency."],
    "correctAnswer": 0,
    "explanation": "Data visualization makes complex business information easier to understand."
  },
  {
    "id": "binary_10",
    "teamId": "MARKETING",
    "category": "Binary Code Challenge",
    "difficulty": "hard",
    "question": "Decode this binary-coded statement and choose its wording:\\n01011/10000/01001/10011 | 01000/00101/01100/10000 | 01111/10010/00111/00001/01110/01001/11010/00001/10100/01001/01111/01110/10011 | 01101/00101/00001/10011/10101/10010/00101 | 00010/10101/10011/01001/01110/00101/10011/10011 | 10000/00101/10010/00110/01111/10010/01101/00001/01110/00011/00101",
    "options": ["KPIs help organizations measure business performance.", "Data visualization can reveal patterns that are difficult to identify in tables.", "Business forecasting uses historical data to predict future outcomes.", "Workforce analytics supports data-driven employee planning."],
    "correctAnswer": 0,
    "explanation": "KPIs help organizations measure business performance."
  },
  {
    "id": "binary_11",
    "teamId": "FINANCE",
    "category": "Binary Code Challenge",
    "difficulty": "hard",
    "question": "Decode this binary-coded statement and choose its wording:\\n10011/00001/01100/00101/10011 | 00100/00001/10100/00001 | 00011/00001/01110 | 10010/00101/10110/00101/00001/01100 | 10000/00001/10100/10100/00101/10010/01110/10011 | 01001/01110 | 00011/10101/10011/10100/01111/01101/00101/10010 | 10000/10101/10010/00011/01000/00001/10011/01001/01110/00111 | 00010/00101/01000/00001/10110/01001/01111/10010",
    "options": ["Sales data can reveal patterns in customer purchasing behavior.", "Performance analytics helps measure organizational productivity.", "Regression analysis identifies relationships between business variables.", "Outlier analysis helps identify unusual business observations."],
    "correctAnswer": 0,
    "explanation": "Sales data can reveal patterns in customer purchasing behavior."
  },
  {
    "id": "binary_12",
    "teamId": "OPERATIONS",
    "category": "Binary Code Challenge",
    "difficulty": "hard",
    "question": "Decode this binary-coded statement and choose its wording:\\n00011/10101/10011/10100/01111/01101/00101/10010 | 00001/01110/00001/01100/11001/10100/01001/00011/10011 | 01000/00101/01100/10000/10011 | 01111/10010/00111/00001/01110/01001/11010/00001/10100/01001/01111/01110/10011 | 10101/01110/00100/00101/10010/10011/10100/00001/01110/00100 | 00011/10101/10011/10100/01111/01101/00101/10010 | 10000/10010/00101/00110/00101/10010/00101/01110/00011/00101/10011",
    "options": ["Customer analytics helps organizations understand customer preferences.", "Risk analytics helps identify and evaluate potential business risks.", "Statistical analysis supports evidence-based business decisions.", "Correlation analysis measures relationships between numerical variables."],
    "correctAnswer": 0,
    "explanation": "Customer analytics helps organizations understand customer preferences."
  },
  {
    "id": "binary_13",
    "teamId": "HR",
    "category": "Binary Code Challenge",
    "difficulty": "hard",
    "question": "Decode this binary-coded statement and choose its wording:\\n00101/01101/10000/01100/01111/11001/00101/00101 | 00100/00001/10100/00001 | 00011/00001/01110 | 00010/00101 | 00001/01110/00001/01100/11001/11010/00101/00100 | 10100/01111 | 01001/01101/10000/10010/01111/10110/00101 | 10111/01111/10010/01011/00110/01111/10010/00011/00101 | 10000/00101/10010/00110/01111/10010/01101/00001/01110/00011/00101",
    "options": ["Scenario analysis evaluates possible outcomes under different conditions.", "Employee data can be analyzed to improve workforce performance.", "Trend analysis identifies changes in business performance over time.", "Probability analysis helps evaluate uncertainty in business situations."],
    "correctAnswer": 1,
    "explanation": "Employee data can be analyzed to improve workforce performance."
  },
  {
    "id": "binary_14",
    "teamId": "MARKETING",
    "category": "Binary Code Challenge",
    "difficulty": "hard",
    "question": "Decode this binary-coded statement and choose its wording:\\n00110/01001/01110/00001/01110/00011/01001/00001/01100 | 00001/01110/00001/01100/11001/10100/01001/00011/10011 | 10011/10101/10000/10000/01111/10010/10100/10011 | 00010/00101/10100/10100/00101/10010 | 00010/10101/00100/00111/00101/10100/01001/01110/00111 | 00001/01110/00100 | 00110/01001/01110/00001/01110/00011/01001/00001/01100 | 10000/01100/00001/01110/01110/01001/01110/00111",
    "options": ["Hypothesis testing helps determine whether business assumptions are supported by data.", "Data segmentation helps organizations analyze different customer groups.", "Financial analytics supports better budgeting and financial planning.", "What-if analysis helps compare alternative business decisions."],
    "correctAnswer": 2,
    "explanation": "Financial analytics supports better budgeting and financial planning."
  },
  {
    "id": "binary_15",
    "teamId": "FINANCE",
    "category": "Binary Code Challenge",
    "difficulty": "hard",
    "question": "Decode this binary-coded statement and choose its wording:\\n01101/00001/10010/01011/00101/10100/01001/01110/00111 | 00001/01110/00001/01100/11001/10100/01001/00011/10011 | 01101/00101/00001/10011/10101/10010/00101/10011 | 10100/01000/00101 | 00101/00110/00110/00101/00011/10100/01001/10110/00101/01110/00101/10011/10011 | 01111/00110 | 01101/00001/10010/01011/00101/10100/01001/01110/00111 | 00011/00001/01101/10000/00001/01001/00111/01110/10011",
    "options": ["Time-series analysis examines business data across different periods.", "Marketing analytics measures the effectiveness of marketing campaigns.", "Data cleaning improves the accuracy and reliability of analysis.", "Profitability analysis identifies products or services generating higher returns."],
    "correctAnswer": 1,
    "explanation": "Marketing analytics measures the effectiveness of marketing campaigns."
  },
  {
    "id": "binary_16",
    "teamId": "OPERATIONS",
    "category": "Binary Code Challenge",
    "difficulty": "hard",
    "question": "Decode this binary-coded statement and choose its wording:\\n01111/10000/00101/10010/00001/10100/01001/01111/01110/00001/01100 | 00001/01110/00001/01100/11001/10100/01001/00011/10011 | 01000/00101/01100/10000/10011 | 01001/01101/10000/10010/01111/10110/00101 | 00010/10101/10011/01001/01110/00101/10011/10011 | 10000/10010/01111/00011/00101/10011/10011 | 00101/00110/00110/01001/00011/01001/00101/01110/00011/11001",
    "options": ["Customer satisfaction data can be analyzed to improve service quality.", "Cost analysis helps organizations identify areas of unnecessary expenditure.", "Data validation ensures that analytical data is accurate and consistent.", "Operational analytics helps improve business process efficiency."],
    "correctAnswer": 3,
    "explanation": "Operational analytics helps improve business process efficiency."
  },
  {
    "id": "binary_17",
    "teamId": "HR",
    "category": "Binary Code Challenge",
    "difficulty": "hard",
    "question": "Decode this binary-coded statement and choose its wording:\\n00010/10101/10011/01001/01110/00101/10011/10011 | 00110/01111/10010/00101/00011/00001/10011/10100/01001/01110/00111 | 10101/10011/00101/10011 | 01000/01001/10011/10100/01111/10010/01001/00011/00001/01100 | 00100/00001/10100/00001 | 10100/01111 | 10000/10010/00101/00100/01001/00011/10100 | 00110/10101/10100/10101/10010/00101 | 01111/10101/10100/00011/01111/01101/00101/10011",
    "options": ["Sales forecasting helps organizations plan future sales activities.", "Business forecasting uses historical data to predict future outcomes.", "Data integration combines information from multiple business sources.", "Customer churn analysis helps predict customers likely to leave."],
    "correctAnswer": 1,
    "explanation": "Business forecasting uses historical data to predict future outcomes."
  },
  {
    "id": "binary_18",
    "teamId": "MARKETING",
    "category": "Binary Code Challenge",
    "difficulty": "hard",
    "question": "Decode this binary-coded statement and choose its wording:\\n10010/00101/00111/10010/00101/10011/10011/01001/01111/01110 | 00001/01110/00001/01100/11001/10011/01001/10011 | 01001/00100/00101/01110/10100/01001/00110/01001/00101/10011 | 10010/00101/01100/00001/10100/01001/01111/01110/10011/01000/01001/10000/10011 | 00010/00101/10100/10111/00101/00101/01110 | 00010/10101/10011/01001/01110/00101/10011/10011 | 10110/00001/10010/01001/00001/00010/01100/00101/10011",
    "options": ["SQL can be used to extract relevant business data from databases.", "Customer lifetime value analysis estimates the long-term value of customers.", "Regression analysis identifies relationships between business variables.", "Demand forecasting helps businesses prepare for changes in customer demand."],
    "correctAnswer": 2,
    "explanation": "Regression analysis identifies relationships between business variables."
  },
  {
    "id": "binary_19",
    "teamId": "FINANCE",
    "category": "Binary Code Challenge",
    "difficulty": "hard",
    "question": "Decode this binary-coded statement and choose its wording:\\n00011/01111/10010/10010/00101/01100/00001/10100/01001/01111/01110 | 00001/01110/00001/01100/11001/10011/01001/10011 | 01101/00101/00001/10011/10101/10010/00101/10011 | 10010/00101/01100/00001/10100/01001/01111/01110/10011/01000/01001/10000/10011 | 00010/00101/10100/10111/00101/00101/01110 | 01110/10101/01101/00101/10010/01001/00011/00001/01100 | 10110/00001/10010/01001/00001/00010/01100/00101/10011",
    "options": ["Pricing analytics helps organizations evaluate effective pricing strategies.", "Market analysis helps identify opportunities and competitive trends.", "Excel can be used to perform business calculations and data analysis.", "Correlation analysis measures relationships between numerical variables."],
    "correctAnswer": 3,
    "explanation": "Correlation analysis measures relationships between numerical variables."
  },
  {
    "id": "binary_20",
    "teamId": "OPERATIONS",
    "category": "Binary Code Challenge",
    "difficulty": "hard",
    "question": "Decode this binary-coded statement and choose its wording:\\n10100/10010/00101/01110/00100 | 00001/01110/00001/01100/11001/10011/01001/10011 | 01001/00100/00101/01110/10100/01001/00110/01001/00101/10011 | 00011/01000/00001/01110/00111/00101/10011 | 01001/01110 | 00010/10101/10011/01001/01110/00101/10011/10011 | 10000/00101/10010/00110/01111/10010/01101/00001/01110/00011/00101 | 01111/10110/00101/10010 | 10100/01001/01101/00101",
    "options": ["Marketing analytics can measure customer acquisition performance.", "Trend analysis identifies changes in business performance over time.", "Power BI can be used to create interactive business dashboards.", "Inventory analytics helps organizations optimize stock levels."],
    "correctAnswer": 1,
    "explanation": "Trend analysis identifies changes in business performance over time."
  },
  {
    "id": "binary_21",
    "teamId": "HR",
    "category": "Binary Code Challenge",
    "difficulty": "hard",
    "question": "Decode this binary-coded statement and choose its wording:\\n00100/00001/10100/00001 | 10011/00101/00111/01101/00101/01110/10100/00001/10100/01001/01111/01110 | 01000/00101/01100/10000/10011 | 01111/10010/00111/00001/01110/01001/11010/00001/10100/01001/01111/01110/10011 | 00001/01110/00001/01100/11001/11010/00101 | 00100/01001/00110/00110/00101/10010/00101/01110/10100 | 00011/10101/10011/10100/01111/01101/00101/10010 | 00111/10010/01111/10101/10000/10011",
    "options": ["Supply chain analytics improves the efficiency of supply chain operations.", "Conversion analysis helps evaluate the effectiveness of business campaigns.", "Dashboards provide real-time visibility into important business metrics.", "Data segmentation helps organizations analyze different customer groups."],
    "correctAnswer": 3,
    "explanation": "Data segmentation helps organizations analyze different customer groups."
  },
  {
    "id": "binary_22",
    "teamId": "MARKETING",
    "category": "Binary Code Challenge",
    "difficulty": "hard",
    "question": "Decode this binary-coded statement and choose its wording:\\n10000/10010/01111/00110/01001/10100/00001/00010/01001/01100/01001/10100/11001 | 00001/01110/00001/01100/11001/10011/01001/10011 | 01001/00100/00101/01110/10100/01001/00110/01001/00101/10011 | 10000/10010/01111/00100/10101/00011/10100/10011 | 01111/10010 | 10011/00101/10010/10110/01001/00011/00101/10011 | 00111/00101/01110/00101/10010/00001/10100/01001/01110/00111 | 01000/01001/00111/01000/00101/10010 | 10010/00101/10100/10101/10010/01110/10011",
    "options": ["Profitability analysis identifies products or services generating higher returns.", "Workforce analytics supports data-driven employee planning.", "Data visualization can reveal patterns that are difficult to identify in tables.", "Business analytics can identify opportunities for process improvement."],
    "correctAnswer": 0,
    "explanation": "Profitability analysis identifies products or services generating higher returns."
  },
  {
    "id": "binary_23",
    "teamId": "FINANCE",
    "category": "Binary Code Challenge",
    "difficulty": "hard",
    "question": "Decode this binary-coded statement and choose its wording:\\n00011/01111/10011/10100 | 00001/01110/00001/01100/11001/10011/01001/10011 | 01000/00101/01100/10000/10011 | 01111/10010/00111/00001/01110/01001/11010/00001/10100/01001/01111/01110/10011 | 01001/00100/00101/01110/10100/01001/00110/11001 | 00001/10010/00101/00001/10011 | 01111/00110 | 10101/01110/01110/00101/00011/00101/10011/10011/00001/10010/11001 | 00101/11000/10000/00101/01110/00100/01001/10100/10101/10010/00101",
    "options": ["Cost analysis helps organizations identify areas of unnecessary expenditure.", "Performance analytics helps measure organizational productivity.", "Outlier analysis helps identify unusual business observations.", "Root cause analysis helps identify the underlying reasons for business problems."],
    "correctAnswer": 0,
    "explanation": "Cost analysis helps organizations identify areas of unnecessary expenditure."
  },
  {
    "id": "binary_24",
    "teamId": "OPERATIONS",
    "category": "Binary Code Challenge",
    "difficulty": "hard",
    "question": "Decode this binary-coded statement and choose its wording:\\n00011/10101/10011/10100/01111/01101/00101/10010 | 00011/01000/10101/10010/01110 | 00001/01110/00001/01100/11001/10011/01001/10011 | 01000/00101/01100/10000/10011 | 10000/10010/00101/00100/01001/00011/10100 | 00011/10101/10011/10100/01111/01101/00101/10010/10011 | 01100/01001/01011/00101/01100/11001 | 10100/01111 | 01100/00101/00001/10110/00101",
    "options": ["Statistical analysis supports evidence-based business decisions.", "Data-driven decision-making reduces dependence on assumptions.", "Customer churn analysis helps predict customers likely to leave.", "Risk analytics helps identify and evaluate potential business risks."],
    "correctAnswer": 2,
    "explanation": "Customer churn analysis helps predict customers likely to leave."
  },
  {
    "id": "binary_25",
    "teamId": "HR",
    "category": "Binary Code Challenge",
    "difficulty": "hard",
    "question": "Decode this binary-coded statement and choose its wording:\\n00011/10101/10011/10100/01111/01101/00101/10010 | 01100/01001/00110/00101/10100/01001/01101/00101 | 10110/00001/01100/10101/00101 | 00001/01110/00001/01100/11001/10011/01001/10011 | 00101/10011/10100/01001/01101/00001/10100/00101/10011 | 10100/01000/00101 | 01100/01111/01110/00111 | 10100/00101/10010/01101 | 10110/00001/01100/10101/00101 | 01111/00110 | 00011/10101/10011/10100/01111/01101/00101/10010/10011",
    "options": ["Probability analysis helps evaluate uncertainty in business situations.", "Customer lifetime value analysis estimates the long-term value of customers.", "Analytics can help organizations improve operational efficiency.", "Scenario analysis evaluates possible outcomes under different conditions."],
    "correctAnswer": 1,
    "explanation": "Customer lifetime value analysis estimates the long-term value of customers."
  },
  {
    "id": "binary_26",
    "teamId": "MARKETING",
    "category": "Binary Code Challenge",
    "difficulty": "hard",
    "question": "Decode this binary-coded statement and choose its wording:\\n01101/00001/10010/01011/00101/10100 | 00001/01110/00001/01100/11001/10011/01001/10011 | 01000/00101/01100/10000/10011 | 01001/00100/00101/01110/10100/01001/00110/11001 | 01111/10000/10000/01111/10010/10100/10101/01110/01001/10100/01001/00101/10011 | 00001/01110/00100 | 00011/01111/01101/10000/00101/10100/01001/10100/01001/10110/00101 | 10100/10010/00101/01110/00100/10011",
    "options": ["Market analysis helps identify opportunities and competitive trends.", "Predictive models can support better business planning.", "What-if analysis helps compare alternative business decisions.", "Hypothesis testing helps determine whether business assumptions are supported by data."],
    "correctAnswer": 0,
    "explanation": "Market analysis helps identify opportunities and competitive trends."
  },
  {
    "id": "binary_27",
    "teamId": "FINANCE",
    "category": "Binary Code Challenge",
    "difficulty": "hard",
    "question": "Decode this binary-coded statement and choose its wording:\\n01001/01110/10110/00101/01110/10100/01111/10010/11001 | 00001/01110/00001/01100/11001/10100/01001/00011/10011 | 01000/00101/01100/10000/10011 | 01111/10010/00111/00001/01110/01001/11010/00001/10100/01001/01111/01110/10011 | 01111/10000/10100/01001/01101/01001/11010/00101 | 10011/10100/01111/00011/01011 | 01100/00101/10110/00101/01100/10011",
    "options": ["Inventory analytics helps organizations optimize stock levels.", "Time-series analysis examines business data across different periods.", "Business intelligence provides insights through reports and dashboards.", "Data cleaning improves the accuracy and reliability of analysis."],
    "correctAnswer": 0,
    "explanation": "Inventory analytics helps organizations optimize stock levels."
  },
  {
    "id": "binary_28",
    "teamId": "OPERATIONS",
    "category": "Binary Code Challenge",
    "difficulty": "hard",
    "question": "Decode this binary-coded statement and choose its wording:\\n10011/10101/10000/10000/01100/11001 | 00011/01000/00001/01001/01110 | 00001/01110/00001/01100/11001/10100/01001/00011/10011 | 01001/01101/10000/10010/01111/10110/00101/10011 | 10100/01000/00101 | 00101/00110/00110/01001/00011/01001/00101/01110/00011/11001 | 01111/00110 | 10011/10101/10000/10000/01100/11001 | 00011/01000/00001/01001/01110 | 01111/10000/00101/10010/00001/10100/01001/01111/01110/10011",
    "options": ["Data validation ensures that analytical data is accurate and consistent.", "Supply chain analytics improves the efficiency of supply chain operations.", "Data-driven insights can help organizations gain a competitive advantage.", "Customer satisfaction data can be analyzed to improve service quality."],
    "correctAnswer": 1,
    "explanation": "Supply chain analytics improves the efficiency of supply chain operations."
  },
  {
    "id": "binary_29",
    "teamId": "HR",
    "category": "Binary Code Challenge",
    "difficulty": "hard",
    "question": "Decode this binary-coded statement and choose its wording:\\n10111/01111/10010/01011/00110/01111/10010/00011/00101 | 00001/01110/00001/01100/11001/10100/01001/00011/10011 | 10011/10101/10000/10000/01111/10010/10100/10011 | 00100/00001/10100/00001 | 00100/10010/01001/10110/00101/01110 | 00101/01101/10000/01100/01111/11001/00101/00101 | 10000/01100/00001/01110/01110/01001/01110/00111",
    "options": ["Sales forecasting helps organizations plan future sales activities.", "Workforce analytics supports data-driven employee planning.", "Data integration combines information from multiple business sources.", "Business analytics transforms business data into actionable insights."],
    "correctAnswer": 1,
    "explanation": "Workforce analytics supports data-driven employee planning."
  },
  {
    "id": "binary_30",
    "teamId": "MARKETING",
    "category": "Binary Code Challenge",
    "difficulty": "hard",
    "question": "Decode this binary-coded statement and choose its wording:\\n10000/00101/10010/00110/01111/10010/01101/00001/01110/00011/00101 | 00001/01110/00001/01100/11001/10100/01001/00011/10011 | 01000/00101/01100/10000/10011 | 01101/00101/00001/10011/10101/10010/00101 | 01111/10010/00111/00001/01110/01001/11010/00001/10100/01001/01111/01110/00001/01100 | 10000/10010/01111/00100/10101/00011/10100/01001/10110/01001/10100/11001",
    "options": ["Performance analytics helps measure organizational productivity.", "Demand forecasting helps businesses prepare for changes in customer demand.", "Business analytics uses data to support better business decisions.", "SQL can be used to extract relevant business data from databases."],
    "correctAnswer": 0,
    "explanation": "Performance analytics helps measure organizational productivity."
  },
  {
    "id": "binary_31",
    "teamId": "FINANCE",
    "category": "Binary Code Challenge",
    "difficulty": "hard",
    "question": "Decode this binary-coded statement and choose its wording:\\n10010/01001/10011/01011 | 00001/01110/00001/01100/11001/10100/01001/00011/10011 | 01000/00101/01100/10000/10011 | 01001/00100/00101/01110/10100/01001/00110/11001 | 00001/01110/00100 | 00101/10110/00001/01100/10101/00001/10100/00101 | 10000/01111/10100/00101/01110/10100/01001/00001/01100 | 00010/10101/10011/01001/01110/00101/10011/10011 | 10010/01001/10011/01011/10011",
    "options": ["Risk analytics helps identify and evaluate potential business risks.", "Data analysis helps organizations identify important business trends.", "Pricing analytics helps organizations evaluate effective pricing strategies.", "Excel can be used to perform business calculations and data analysis."],
    "correctAnswer": 0,
    "explanation": "Risk analytics helps identify and evaluate potential business risks."
  },
  {
    "id": "binary_32",
    "teamId": "OPERATIONS",
    "category": "Binary Code Challenge",
    "difficulty": "hard",
    "question": "Decode this binary-coded statement and choose its wording:\\n10011/00011/00101/01110/00001/10010/01001/01111 | 00001/01110/00001/01100/11001/10011/01001/10011 | 00101/10110/00001/01100/10101/00001/10100/00101/10011 | 10000/01111/10011/10011/01001/00010/01100/00101 | 01111/10101/10100/00011/01111/01101/00101/10011 | 10101/01110/00100/00101/10010 | 00100/01001/00110/00110/00101/10010/00101/01110/10100 | 00011/01111/01110/00100/01001/10100/01001/01111/01110/10011",
    "options": ["Scenario analysis evaluates possible outcomes under different conditions.", "Business analytics converts raw data into meaningful insights.", "Marketing analytics can measure customer acquisition performance.", "Power BI can be used to create interactive business dashboards."],
    "correctAnswer": 0,
    "explanation": "Scenario analysis evaluates possible outcomes under different conditions."
  },
  {
    "id": "binary_33",
    "teamId": "HR",
    "category": "Binary Code Challenge",
    "difficulty": "hard",
    "question": "Decode this binary-coded statement and choose its wording:\\n10111/01000/00001/10100 | 01001/00110 | 00001/01110/00001/01100/11001/10011/01001/10011 | 01000/00101/01100/10000/10011 | 00011/01111/01101/10000/00001/10010/00101 | 00001/01100/10100/00101/10010/01110/00001/10100/01001/10110/00101 | 00010/10101/10011/01001/01110/00101/10011/10011 | 00100/00101/00011/01001/10011/01001/01111/01110/10011",
    "options": ["Dashboards provide real-time visibility into important business metrics.", "What-if analysis helps compare alternative business decisions.", "Conversion analysis helps evaluate the effectiveness of business campaigns.", "Historical data can be analyzed to understand business performance."],
    "correctAnswer": 1,
    "explanation": "What-if analysis helps compare alternative business decisions."
  },
  {
    "id": "binary_34",
    "teamId": "MARKETING",
    "category": "Binary Code Challenge",
    "difficulty": "hard",
    "question": "Decode this binary-coded statement and choose its wording:\\n00100/00001/10100/00001 | 00011/01100/00101/00001/01110/01001/01110/00111 | 01001/01101/10000/10010/01111/10110/00101/10011 | 10100/01000/00101 | 00001/00011/00011/10101/10010/00001/00011/11001 | 00001/01110/00100 | 10010/00101/01100/01001/00001/00010/01001/01100/01001/10100/11001 | 01111/00110 | 00001/01110/00001/01100/11001/10011/01001/10011",
    "options": ["Data visualization can reveal patterns that are difficult to identify in tables.", "Business analytics can identify opportunities for process improvement.", "Descriptive analytics explains what happened in a business.", "Data cleaning improves the accuracy and reliability of analysis."],
    "correctAnswer": 3,
    "explanation": "Data cleaning improves the accuracy and reliability of analysis."
  },
  {
    "id": "binary_35",
    "teamId": "FINANCE",
    "category": "Binary Code Challenge",
    "difficulty": "hard",
    "question": "Decode this binary-coded statement and choose its wording:\\n00100/00001/10100/00001 | 10110/00001/01100/01001/00100/00001/10100/01001/01111/01110 | 00101/01110/10011/10101/10010/00101/10011 | 10100/01000/00001/10100 | 00001/01110/00001/01100/11001/10100/01001/00011/00001/01100 | 00100/00001/10100/00001 | 01001/10011 | 00001/00011/00011/10101/10010/00001/10100/00101 | 00001/01110/00100 | 00011/01111/01110/10011/01001/10011/10100/00101/01110/10100",
    "options": ["Outlier analysis helps identify unusual business observations.", "Data validation ensures that analytical data is accurate and consistent.", "Diagnostic analytics identifies why a business outcome occurred.", "Root cause analysis helps identify the underlying reasons for business problems."],
    "correctAnswer": 1,
    "explanation": "Data validation ensures that analytical data is accurate and consistent."
  },
  {
    "id": "binary_36",
    "teamId": "OPERATIONS",
    "category": "Binary Code Challenge",
    "difficulty": "hard",
    "question": "Decode this binary-coded statement and choose its wording:\\n00100/00001/10100/00001 | 01001/01110/10100/00101/00111/10010/00001/10100/01001/01111/01110 | 00011/01111/01101/00010/01001/01110/00101/10011 | 01001/01110/00110/01111/10010/01101/00001/10100/01001/01111/01110 | 00110/10010/01111/01101 | 01101/10101/01100/10100/01001/10000/01100/00101 | 00010/10101/10011/01001/01110/00101/10011/10011 | 10011/01111/10101/10010/00011/00101/10011",
    "options": ["Data-driven decision-making reduces dependence on assumptions.", "Statistical analysis supports evidence-based business decisions.", "Data integration combines information from multiple business sources.", "Predictive analytics estimates what may happen in the future."],
    "correctAnswer": 2,
    "explanation": "Data integration combines information from multiple business sources."
  },
  {
    "id": "binary_37",
    "teamId": "HR",
    "category": "Binary Code Challenge",
    "difficulty": "hard",
    "question": "Decode this binary-coded statement and choose its wording:\\n10011/10001/01100 | 00011/00001/01110 | 00010/00101 | 10101/10011/00101/00100 | 10100/01111 | 00101/11000/10100/10010/00001/00011/10100 | 10010/00101/01100/00101/10110/00001/01110/10100 | 00010/10101/10011/01001/01110/00101/10011/10011 | 00100/00001/10100/00001 | 00110/10010/01111/01101 | 00100/00001/10100/00001/00010/00001/10011/00101/10011",
    "options": ["SQL can be used to extract relevant business data from databases.", "Prescriptive analytics recommends actions based on data insights.", "Analytics can help organizations improve operational efficiency.", "Probability analysis helps evaluate uncertainty in business situations."],
    "correctAnswer": 0,
    "explanation": "SQL can be used to extract relevant business data from databases."
  },
  {
    "id": "binary_38",
    "teamId": "MARKETING",
    "category": "Binary Code Challenge",
    "difficulty": "hard",
    "question": "Decode this binary-coded statement and choose its wording:\\n00101/11000/00011/00101/01100 | 00011/00001/01110 | 00010/00101 | 10101/10011/00101/00100 | 10100/01111 | 10000/00101/10010/00110/01111/10010/01101 | 00010/10101/10011/01001/01110/00101/10011/10011 | 00011/00001/01100/00011/10101/01100/00001/10100/01001/01111/01110/10011 | 00001/01110/00100 | 00100/00001/10100/00001 | 00001/01110/00001/01100/11001/10011/01001/10011",
    "options": ["Data visualization makes complex business information easier to understand.", "Excel can be used to perform business calculations and data analysis.", "Predictive models can support better business planning.", "Hypothesis testing helps determine whether business assumptions are supported by data."],
    "correctAnswer": 1,
    "explanation": "Excel can be used to perform business calculations and data analysis."
  },
  {
    "id": "binary_39",
    "teamId": "FINANCE",
    "category": "Binary Code Challenge",
    "difficulty": "hard",
    "question": "Decode this binary-coded statement and choose its wording:\\n10000/01111/10111/00101/10010 | 00010/01001 | 00011/00001/01110 | 00010/00101 | 10101/10011/00101/00100 | 10100/01111 | 00011/10010/00101/00001/10100/00101 | 01001/01110/10100/00101/10010/00001/00011/10100/01001/10110/00101 | 00010/10101/10011/01001/01110/00101/10011/10011 | 00100/00001/10011/01000/00010/01111/00001/10010/00100/10011",
    "options": ["KPIs help organizations measure business performance.", "Time-series analysis examines business data across different periods.", "Power BI can be used to create interactive business dashboards.", "Business intelligence provides insights through reports and dashboards."],
    "correctAnswer": 2,
    "explanation": "Power BI can be used to create interactive business dashboards."
  },
  {
    "id": "binary_40",
    "teamId": "OPERATIONS",
    "category": "Binary Code Challenge",
    "difficulty": "hard",
    "question": "Decode this binary-coded statement and choose its wording:\\n00100/00001/10011/01000/00010/01111/00001/10010/00100/10011 | 10000/10010/01111/10110/01001/00100/00101 | 10010/00101/00001/01100 | 10100/01001/01101/00101 | 10110/01001/10011/01001/00010/01001/01100/01001/10100/11001 | 01001/01110/10100/01111 | 01001/01101/10000/01111/10010/10100/00001/01110/10100 | 00010/10101/10011/01001/01110/00101/10011/10011 | 01101/00101/10100/10010/01001/00011/10011",
    "options": ["Customer satisfaction data can be analyzed to improve service quality.", "Dashboards provide real-time visibility into important business metrics.", "Data-driven insights can help organizations gain a competitive advantage.", "Sales data can reveal patterns in customer purchasing behavior."],
    "correctAnswer": 1,
    "explanation": "Dashboards provide real-time visibility into important business metrics."
  },
  {
    "id": "binary_41",
    "teamId": "HR",
    "category": "Binary Code Challenge",
    "difficulty": "hard",
    "question": "Decode this binary-coded statement and choose its wording:\\n00100/00001/10100/00001 | 10110/01001/10011/10101/00001/01100/01001/11010/00001/10100/01001/01111/01110 | 00011/00001/01110 | 10010/00101/10110/00101/00001/01100 | 10000/00001/10100/10100/00101/10010/01110/10011 | 10100/01000/00001/10100 | 00001/10010/00101 | 00100/01001/00110/00110/01001/00011/10101/01100/10100 | 10100/01111 | 01001/00100/00101/01110/10100/01001/00110/11001 | 01001/01110 | 10100/00001/00010/01100/00101/10011",
    "options": ["Data visualization can reveal patterns that are difficult to identify in tables.", "Business analytics transforms business data into actionable insights.", "Customer analytics helps organizations understand customer preferences.", "Sales forecasting helps organizations plan future sales activities."],
    "correctAnswer": 0,
    "explanation": "Data visualization can reveal patterns that are difficult to identify in tables."
  },
  {
    "id": "binary_42",
    "teamId": "MARKETING",
    "category": "Binary Code Challenge",
    "difficulty": "hard",
    "question": "Decode this binary-coded statement and choose its wording:\\n01111/10101/10100/01100/01001/00101/10010 | 00001/01110/00001/01100/11001/10011/01001/10011 | 01000/00101/01100/10000/10011 | 01001/00100/00101/01110/10100/01001/00110/11001 | 10101/01110/10101/10011/10101/00001/01100 | 00010/10101/10011/01001/01110/00101/10011/10011 | 01111/00010/10011/00101/10010/10110/00001/10100/01001/01111/01110/10011",
    "options": ["Outlier analysis helps identify unusual business observations.", "Demand forecasting helps businesses prepare for changes in customer demand.", "Business analytics uses data to support better business decisions.", "Employee data can be analyzed to improve workforce performance."],
    "correctAnswer": 0,
    "explanation": "Outlier analysis helps identify unusual business observations."
  },
  {
    "id": "binary_43",
    "teamId": "FINANCE",
    "category": "Binary Code Challenge",
    "difficulty": "hard",
    "question": "Decode this binary-coded statement and choose its wording:\\n10011/10100/00001/10100/01001/10011/10100/01001/00011/00001/01100 | 00001/01110/00001/01100/11001/10011/01001/10011 | 10011/10101/10000/10000/01111/10010/10100/10011 | 00101/10110/01001/00100/00101/01110/00011/00101 | 00010/00001/10011/00101/00100 | 00010/10101/10011/01001/01110/00101/10011/10011 | 00100/00101/00011/01001/10011/01001/01111/01110/10011",
    "options": ["Financial analytics supports better budgeting and financial planning.", "Pricing analytics helps organizations evaluate effective pricing strategies.", "Data analysis helps organizations identify important business trends.", "Statistical analysis supports evidence-based business decisions."],
    "correctAnswer": 3,
    "explanation": "Statistical analysis supports evidence-based business decisions."
  },
  {
    "id": "binary_44",
    "teamId": "OPERATIONS",
    "category": "Binary Code Challenge",
    "difficulty": "hard",
    "question": "Decode this binary-coded statement and choose its wording:\\n10000/10010/01111/00010/00001/00010/01001/01100/01001/10100/11001 | 00001/01110/00001/01100/11001/10011/01001/10011 | 01000/00101/01100/10000/10011 | 00101/10110/00001/01100/10101/00001/10100/00101 | 10101/01110/00011/00101/10010/10100/00001/01001/01110/10100/11001 | 01001/01110 | 00010/10101/10011/01001/01110/00101/10011/10011 | 10011/01001/10100/10101/00001/10100/01001/01111/01110/10011",
    "options": ["Marketing analytics measures the effectiveness of marketing campaigns.", "Probability analysis helps evaluate uncertainty in business situations.", "Business analytics converts raw data into meaningful insights.", "Marketing analytics can measure customer acquisition performance."],
    "correctAnswer": 1,
    "explanation": "Probability analysis helps evaluate uncertainty in business situations."
  },
  {
    "id": "binary_45",
    "teamId": "HR",
    "category": "Binary Code Challenge",
    "difficulty": "hard",
    "question": "Decode this binary-coded statement and choose its wording:\\n01000/11001/10000/01111/10100/01000/00101/10011/01001/10011 | 10100/00101/10011/10100/01001/01110/00111 | 01000/00101/01100/10000/10011 | 00100/00101/10100/00101/10010/01101/01001/01110/00101 | 10111/01000/00101/10100/01000/00101/10010 | 00010/10101/10011/01001/01110/00101/10011/10011 | 00001/10011/10011/10101/01101/10000/10100/01001/01111/01110/10011 | 00001/10010/00101 | 10011/10101/10000/10000/01111/10010/10100/00101/00100 | 00010/11001 | 00100/00001/10100/00001",
    "options": ["Conversion analysis helps evaluate the effectiveness of business campaigns.", "Operational analytics helps improve business process efficiency.", "Hypothesis testing helps determine whether business assumptions are supported by data.", "Historical data can be analyzed to understand business performance."],
    "correctAnswer": 2,
    "explanation": "Hypothesis testing helps determine whether business assumptions are supported by data."
  },
  {
    "id": "binary_46",
    "teamId": "MARKETING",
    "category": "Binary Code Challenge",
    "difficulty": "hard",
    "question": "Decode this binary-coded statement and choose its wording:\\n10100/01001/01101/00101 | 10011/00101/10010/01001/00101/10011 | 00001/01110/00001/01100/11001/10011/01001/10011 | 00101/11000/00001/01101/01001/01110/00101/10011 | 00010/10101/10011/01001/01110/00101/10011/10011 | 00100/00001/10100/00001 | 00001/00011/10010/01111/10011/10011 | 00100/01001/00110/00110/00101/10010/00101/01110/10100 | 10000/00101/10010/01001/01111/00100/10011",
    "options": ["Business analytics can identify opportunities for process improvement.", "Business forecasting uses historical data to predict future outcomes.", "Time-series analysis examines business data across different periods.", "Descriptive analytics explains what happened in a business."],
    "correctAnswer": 2,
    "explanation": "Time-series analysis examines business data across different periods."
  },
  {
    "id": "binary_47",
    "teamId": "FINANCE",
    "category": "Binary Code Challenge",
    "difficulty": "hard",
    "question": "Decode this binary-coded statement and choose its wording:\\n00011/10101/10011/10100/01111/01101/00101/10010 | 10011/00001/10100/01001/10011/00110/00001/00011/10100/01001/01111/01110 | 00100/00001/10100/00001 | 00011/00001/01110 | 00010/00101 | 00001/01110/00001/01100/11001/11010/00101/00100 | 10100/01111 | 01001/01101/10000/10010/01111/10110/00101 | 10011/00101/10010/10110/01001/00011/00101 | 10001/10101/00001/01100/01001/10100/11001",
    "options": ["Regression analysis identifies relationships between business variables.", "Diagnostic analytics identifies why a business outcome occurred.", "Customer satisfaction data can be analyzed to improve service quality.", "Root cause analysis helps identify the underlying reasons for business problems."],
    "correctAnswer": 2,
    "explanation": "Customer satisfaction data can be analyzed to improve service quality."
  },
  {
    "id": "binary_48",
    "teamId": "OPERATIONS",
    "category": "Binary Code Challenge",
    "difficulty": "hard",
    "question": "Decode this binary-coded statement and choose its wording:\\n10011/00001/01100/00101/10011 | 00110/01111/10010/00101/00011/00001/10011/10100/01001/01110/00111 | 01000/00101/01100/10000/10011 | 01111/10010/00111/00001/01110/01001/11010/00001/10100/01001/01111/01110/10011 | 10000/01100/00001/01110 | 00110/10101/10100/10101/10010/00101 | 10011/00001/01100/00101/10011 | 00001/00011/10100/01001/10110/01001/10100/01001/00101/10011",
    "options": ["Predictive analytics estimates what may happen in the future.", "Sales forecasting helps organizations plan future sales activities.", "Correlation analysis measures relationships between numerical variables.", "Data-driven decision-making reduces dependence on assumptions."],
    "correctAnswer": 1,
    "explanation": "Sales forecasting helps organizations plan future sales activities."
  },
  {
    "id": "binary_49",
    "teamId": "HR",
    "category": "Binary Code Challenge",
    "difficulty": "hard",
    "question": "Decode this binary-coded statement and choose its wording:\\n00100/00101/01101/00001/01110/00100 | 00110/01111/10010/00101/00011/00001/10011/10100/01001/01110/00111 | 01000/00101/01100/10000/10011 | 00010/10101/10011/01001/01110/00101/10011/10011/00101/10011 | 10000/10010/00101/10000/00001/10010/00101 | 00110/01111/10010 | 00011/01000/00001/01110/00111/00101/10011 | 01001/01110 | 00011/10101/10011/10100/01111/01101/00101/10010 | 00100/00101/01101/00001/01110/00100",
    "options": ["Trend analysis identifies changes in business performance over time.", "Analytics can help organizations improve operational efficiency.", "Demand forecasting helps businesses prepare for changes in customer demand.", "Prescriptive analytics recommends actions based on data insights."],
    "correctAnswer": 2,
    "explanation": "Demand forecasting helps businesses prepare for changes in customer demand."
  },
  {
    "id": "binary_50",
    "teamId": "MARKETING",
    "category": "Binary Code Challenge",
    "difficulty": "hard",
    "question": "Decode this binary-coded statement and choose its wording:\\n10000/10010/01001/00011/01001/01110/00111 | 00001/01110/00001/01100/11001/10100/01001/00011/10011 | 01000/00101/01100/10000/10011 | 01111/10010/00111/00001/01110/01001/11010/00001/10100/01001/01111/01110/10011 | 00101/10110/00001/01100/10101/00001/10100/00101 | 00101/00110/00110/00101/00011/10100/01001/10110/00101 | 10000/10010/01001/00011/01001/01110/00111 | 10011/10100/10010/00001/10100/00101/00111/01001/00101/10011",
    "options": ["Data visualization makes complex business information easier to understand.", "Data segmentation helps organizations analyze different customer groups.", "Pricing analytics helps organizations evaluate effective pricing strategies.", "Predictive models can support better business planning."],
    "correctAnswer": 2,
    "explanation": "Pricing analytics helps organizations evaluate effective pricing strategies."
  },
  {
    "id": "binary_51",
    "teamId": "FINANCE",
    "category": "Binary Code Challenge",
    "difficulty": "hard",
    "question": "Decode this binary-coded statement and choose its wording:\\n01101/00001/10010/01011/00101/10100/01001/01110/00111 | 00001/01110/00001/01100/11001/10100/01001/00011/10011 | 00011/00001/01110 | 01101/00101/00001/10011/10101/10010/00101 | 00011/10101/10011/10100/01111/01101/00101/10010 | 00001/00011/10001/10101/01001/10011/01001/10100/01001/01111/01110 | 10000/00101/10010/00110/01111/10010/01101/00001/01110/00011/00101",
    "options": ["KPIs help organizations measure business performance.", "Business intelligence provides insights through reports and dashboards.", "Profitability analysis identifies products or services generating higher returns.", "Marketing analytics can measure customer acquisition performance."],
    "correctAnswer": 3,
    "explanation": "Marketing analytics can measure customer acquisition performance."
  },
  {
    "id": "binary_52",
    "teamId": "OPERATIONS",
    "category": "Binary Code Challenge",
    "difficulty": "hard",
    "question": "Decode this binary-coded statement and choose its wording:\\n00011/01111/01110/10110/00101/10010/10011/01001/01111/01110 | 00001/01110/00001/01100/11001/10011/01001/10011 | 01000/00101/01100/10000/10011 | 00101/10110/00001/01100/10101/00001/10100/00101 | 10100/01000/00101 | 00101/00110/00110/00101/00011/10100/01001/10110/00101/01110/00101/10011/10011 | 01111/00110 | 00010/10101/10011/01001/01110/00101/10011/10011 | 00011/00001/01101/10000/00001/01001/00111/01110/10011",
    "options": ["Conversion analysis helps evaluate the effectiveness of business campaigns.", "Cost analysis helps organizations identify areas of unnecessary expenditure.", "Sales data can reveal patterns in customer purchasing behavior.", "Data-driven insights can help organizations gain a competitive advantage."],
    "correctAnswer": 0,
    "explanation": "Conversion analysis helps evaluate the effectiveness of business campaigns."
  },
  {
    "id": "binary_53",
    "teamId": "HR",
    "category": "Binary Code Challenge",
    "difficulty": "hard",
    "question": "Decode this binary-coded statement and choose its wording:\\n00010/10101/10011/01001/01110/00101/10011/10011 | 00001/01110/00001/01100/11001/10100/01001/00011/10011 | 00011/00001/01110 | 01001/00100/00101/01110/10100/01001/00110/11001 | 01111/10000/10000/01111/10010/10100/10101/01110/01001/10100/01001/00101/10011 | 00110/01111/10010 | 10000/10010/01111/00011/00101/10011/10011 | 01001/01101/10000/10010/01111/10110/00101/01101/00101/01110/10100",
    "options": ["Customer analytics helps organizations understand customer preferences.", "Customer churn analysis helps predict customers likely to leave.", "Business analytics transforms business data into actionable insights.", "Business analytics can identify opportunities for process improvement."],
    "correctAnswer": 3,
    "explanation": "Business analytics can identify opportunities for process improvement."
  },
  {
    "id": "binary_54",
    "teamId": "MARKETING",
    "category": "Binary Code Challenge",
    "difficulty": "hard",
    "question": "Decode this binary-coded statement and choose its wording:\\n10010/01111/01111/10100 | 00011/00001/10101/10011/00101 | 00001/01110/00001/01100/11001/10011/01001/10011 | 01000/00101/01100/10000/10011 | 01001/00100/00101/01110/10100/01001/00110/11001 | 10100/01000/00101 | 10101/01110/00100/00101/10010/01100/11001/01001/01110/00111 | 10010/00101/00001/10011/01111/01110/10011 | 00110/01111/10010 | 00010/10101/10011/01001/01110/00101/10011/10011 | 10000/10010/01111/00010/01100/00101/01101/10011",
    "options": ["Business analytics uses data to support better business decisions.", "Root cause analysis helps identify the underlying reasons for business problems.", "Customer lifetime value analysis estimates the long-term value of customers.", "Employee data can be analyzed to improve workforce performance."],
    "correctAnswer": 1,
    "explanation": "Root cause analysis helps identify the underlying reasons for business problems."
  },
  {
    "id": "binary_55",
    "teamId": "FINANCE",
    "category": "Binary Code Challenge",
    "difficulty": "hard",
    "question": "Decode this binary-coded statement and choose its wording:\\n00100/00001/10100/00001 | 00100/10010/01001/10110/00101/01110 | 00100/00101/00011/01001/10011/01001/01111/01110 | 01101/00001/01011/01001/01110/00111 | 10010/00101/00100/10101/00011/00101/10011 | 00100/00101/10000/00101/01110/00100/00101/01110/00011/00101 | 01111/01110 | 00001/10011/10011/10101/01101/10000/10100/01001/01111/01110/10011",
    "options": ["Financial analytics supports better budgeting and financial planning.", "Market analysis helps identify opportunities and competitive trends.", "Data-driven decision-making reduces dependence on assumptions.", "Data analysis helps organizations identify important business trends."],
    "correctAnswer": 2,
    "explanation": "Data-driven decision-making reduces dependence on assumptions."
  },
  {
    "id": "binary_56",
    "teamId": "OPERATIONS",
    "category": "Binary Code Challenge",
    "difficulty": "hard",
    "question": "Decode this binary-coded statement and choose its wording:\\n00001/01110/00001/01100/11001/10100/01001/00011/10011 | 00011/00001/01110 | 01000/00101/01100/10000 | 01111/10010/00111/00001/01110/01001/11010/00001/10100/01001/01111/01110/10011 | 01001/01101/10000/10010/01111/10110/00101 | 01111/10000/00101/10010/00001/10100/01001/01111/01110/00001/01100 | 00101/00110/00110/01001/00011/01001/00101/01110/00011/11001",
    "options": ["Inventory analytics helps organizations optimize stock levels.", "Business analytics converts raw data into meaningful insights.", "Marketing analytics measures the effectiveness of marketing campaigns.", "Analytics can help organizations improve operational efficiency."],
    "correctAnswer": 3,
    "explanation": "Analytics can help organizations improve operational efficiency."
  },
  {
    "id": "binary_57",
    "teamId": "HR",
    "category": "Binary Code Challenge",
    "difficulty": "hard",
    "question": "Decode this binary-coded statement and choose its wording:\\n10000/10010/00101/00100/01001/00011/10100/01001/10110/00101 | 01101/01111/00100/00101/01100/10011 | 00011/00001/01110 | 10011/10101/10000/10000/01111/10010/10100 | 00010/00101/10100/10100/00101/10010 | 00010/10101/10011/01001/01110/00101/10011/10011 | 10000/01100/00001/01110/01110/01001/01110/00111",
    "options": ["Historical data can be analyzed to understand business performance.", "Supply chain analytics improves the efficiency of supply chain operations.", "Operational analytics helps improve business process efficiency.", "Predictive models can support better business planning."],
    "correctAnswer": 3,
    "explanation": "Predictive models can support better business planning."
  },
  {
    "id": "binary_58",
    "teamId": "MARKETING",
    "category": "Binary Code Challenge",
    "difficulty": "hard",
    "question": "Decode this binary-coded statement and choose its wording:\\n00010/10101/10011/01001/01110/00101/10011/10011 | 01001/01110/10100/00101/01100/01100/01001/00111/00101/01110/00011/00101 | 10000/10010/01111/10110/01001/00100/00101/10011 | 01001/01110/10011/01001/00111/01000/10100/10011 | 10100/01000/10010/01111/10101/00111/01000 | 10010/00101/10000/01111/10010/10100/10011 | 00001/01110/00100 | 00100/00001/10011/01000/00010/01111/00001/10010/00100/10011",
    "options": ["Business intelligence provides insights through reports and dashboards.", "Business forecasting uses historical data to predict future outcomes.", "Workforce analytics supports data-driven employee planning.", "Descriptive analytics explains what happened in a business."],
    "correctAnswer": 0,
    "explanation": "Business intelligence provides insights through reports and dashboards."
  },
  {
    "id": "binary_59",
    "teamId": "FINANCE",
    "category": "Binary Code Challenge",
    "difficulty": "hard",
    "question": "Decode this binary-coded statement and choose its wording:\\n00100/00001/10100/00001 | 00100/10010/01001/10110/00101/01110 | 01001/01110/10011/01001/00111/01000/10100/10011 | 00011/00001/01110 | 01000/00101/01100/10000 | 01111/10010/00111/00001/01110/01001/11010/00001/10100/01001/01111/01110/10011 | 00111/00001/01001/01110 | 00001 | 00011/01111/01101/10000/00101/10100/01001/10100/01001/10110/00101 | 00001/00100/10110/00001/01110/10100/00001/00111/00101",
    "options": ["Performance analytics helps measure organizational productivity.", "Diagnostic analytics identifies why a business outcome occurred.", "Data-driven insights can help organizations gain a competitive advantage.", "Regression analysis identifies relationships between business variables."],
    "correctAnswer": 2,
    "explanation": "Data-driven insights can help organizations gain a competitive advantage."
  },
  {
    "id": "binary_60",
    "teamId": "OPERATIONS",
    "category": "Binary Code Challenge",
    "difficulty": "hard",
    "question": "Decode this binary-coded statement and choose its wording:\\n00010/10101/10011/01001/01110/00101/10011/10011 | 00001/01110/00001/01100/11001/10100/01001/00011/10011 | 10100/10010/00001/01110/10011/00110/01111/10010/01101/10011 | 00010/10101/10011/01001/01110/00101/10011/10011 | 00100/00001/10100/00001 | 01001/01110/10100/01111 | 00001/00011/10100/01001/01111/01110/00001/00010/01100/00101 | 01001/01110/10011/01001/00111/01000/10100/10011",
    "options": ["Business analytics transforms business data into actionable insights.", "Correlation analysis measures relationships between numerical variables.", "Predictive analytics estimates what may happen in the future.", "Risk analytics helps identify and evaluate potential business risks."],
    "correctAnswer": 0,
    "explanation": "Business analytics transforms business data into actionable insights."
  }
];

export function getQuestionsForTeam(teamId: TeamId): BankQuestion[] {
  return QUESTION_BANK.filter(q => q.teamId === teamId);
}

export function getQuestionById(id: string): BankQuestion | undefined {
  return QUESTION_BANK.find(q => q.id === id);
}
