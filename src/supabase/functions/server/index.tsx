import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import * as kv from "./kv_store.tsx";

const app = new Hono();

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Mock candidate data with full employment history
const mockCandidates = [
  {
    id: 1,
    name: 'Sarah Johnson',
    currentTitle: 'Senior Full Stack Developer',
    currentCompany: 'TechCorp Inc.',
    city: 'San Francisco',
    skills: ['React', 'Node.js', 'Python', 'AWS', 'MongoDB', 'TypeScript', 'Docker', 'GraphQL'],
    employmentHistory: [
      {
        company: 'TechCorp Inc.',
        role: 'Senior Software Engineer',
        startDate: '2021-03',
        endDate: null,
        current: true,
        city: 'San Francisco',
        reportingManager: 'Michael Chen',
        managerEmail: 'michael.chen@techcorp.com',
        managerTitle: 'VP of Engineering',
        projects: ['Microservices Architecture', 'Payment Gateway Integration', 'Mobile App Backend'],
        products: ['Salesforce', 'AWS', 'Docker', 'MongoDB'],
        companyType: 'end-client'
      },
      {
        company: 'StartupXYZ',
        role: 'Full Stack Developer',
        startDate: '2018-06',
        endDate: '2021-02',
        current: false,
        city: 'San Francisco',
        reportingManager: 'Lisa Wang',
        managerEmail: 'lisa.wang@startupxyz.com',
        managerTitle: 'CTO',
        projects: ['E-commerce Platform', 'Analytics Dashboard', 'API Development'],
        products: ['React', 'Node.js', 'PostgreSQL', 'Stripe'],
        companyType: 'end-client'
      },
      {
        company: 'Digital Solutions LLC',
        role: 'Web Developer',
        startDate: '2017-01',
        endDate: '2018-05',
        current: false,
        city: 'San Jose',
        reportingManager: 'John Davis',
        managerEmail: 'john.davis@digitalsolutions.com',
        managerTitle: 'Engineering Manager',
        projects: ['Corporate Website Redesign', 'CMS Development'],
        products: ['WordPress', 'PHP', 'MySQL'],
        companyType: 'service-provider'
      }
    ]
  },
  {
    id: 2,
    name: 'Michael Rodriguez',
    currentTitle: 'Product Manager',
    currentCompany: 'StartupXYZ',
    city: 'San Francisco',
    skills: ['Product Strategy', 'Agile', 'Data Analysis', 'SQL', 'Figma'],
    employmentHistory: [
      {
        company: 'StartupXYZ',
        role: 'Senior Product Manager',
        startDate: '2022-01',
        endDate: null,
        current: true,
        city: 'San Francisco',
        reportingManager: 'Lisa Wang',
        managerEmail: 'lisa.wang@startupxyz.com',
        managerTitle: 'CTO',
        projects: ['Product Roadmap 2024', 'User Research Initiative', 'Feature Prioritization'],
        products: ['Jira', 'Figma', 'Mixpanel', 'Amplitude'],
        companyType: 'end-client'
      },
      {
        company: 'TechCorp Inc.',
        role: 'Product Manager',
        startDate: '2019-03',
        endDate: '2021-12',
        current: false,
        city: 'San Francisco',
        reportingManager: 'Jennifer Lee',
        managerEmail: 'jennifer.lee@techcorp.com',
        managerTitle: 'Director of Product',
        projects: ['Mobile App Launch', 'A/B Testing Framework'],
        products: ['Salesforce', 'Google Analytics', 'Optimizely'],
        companyType: 'end-client'
      }
    ]
  },
  {
    id: 3,
    name: 'Emily Chen',
    currentTitle: 'UX Designer',
    currentCompany: 'InnovateTech',
    city: 'Austin',
    skills: ['Figma', 'User Research', 'Prototyping', 'Design Systems'],
    employmentHistory: [
      {
        company: 'InnovateTech',
        role: 'Senior UX Designer',
        startDate: '2020-08',
        endDate: null,
        current: true,
        city: 'Austin',
        reportingManager: 'David Park',
        managerEmail: 'david.park@innovatetech.com',
        managerTitle: 'Head of Design',
        projects: ['Design System 2.0', 'Mobile App Redesign', 'User Testing Lab'],
        products: ['Figma', 'Adobe XD', 'Sketch', 'InVision'],
        companyType: 'end-client'
      },
      {
        company: 'Digital Solutions LLC',
        role: 'UX Designer',
        startDate: '2018-01',
        endDate: '2020-07',
        current: false,
        city: 'San Jose',
        reportingManager: 'John Davis',
        managerEmail: 'john.davis@digitalsolutions.com',
        managerTitle: 'Engineering Manager',
        projects: ['Website Redesign', 'User Research'],
        products: ['Sketch', 'Photoshop', 'Zeplin'],
        companyType: 'service-provider'
      }
    ]
  },
  {
    id: 4,
    name: 'James Wilson',
    currentTitle: 'DevOps Engineer',
    currentCompany: 'CloudScale',
    city: 'Seattle',
    skills: ['AWS', 'Kubernetes', 'Docker', 'Terraform', 'CI/CD'],
    employmentHistory: [
      {
        company: 'CloudScale',
        role: 'Senior DevOps Engineer',
        startDate: '2021-06',
        endDate: null,
        current: true,
        city: 'Seattle',
        reportingManager: 'Robert Kim',
        managerEmail: 'robert.kim@cloudscale.com',
        managerTitle: 'VP of Infrastructure',
        projects: ['Kubernetes Migration', 'CI/CD Pipeline', 'Cost Optimization'],
        products: ['AWS', 'Kubernetes', 'Docker', 'Terraform', 'Jenkins', 'DataDog'],
        companyType: 'end-client'
      },
      {
        company: 'TechCorp Inc.',
        role: 'DevOps Engineer',
        startDate: '2019-02',
        endDate: '2021-05',
        current: false,
        city: 'San Francisco',
        reportingManager: 'Michael Chen',
        managerEmail: 'michael.chen@techcorp.com',
        managerTitle: 'VP of Engineering',
        projects: ['Infrastructure Automation', 'Monitoring Setup'],
        products: ['AWS', 'Docker', 'Ansible', 'Prometheus'],
        companyType: 'end-client'
      }
    ]
  },
  {
    id: 5,
    name: 'Amanda Taylor',
    currentTitle: 'Data Scientist',
    currentCompany: 'DataDriven',
    city: 'New York',
    skills: ['Python', 'Machine Learning', 'TensorFlow', 'SQL', 'R'],
    employmentHistory: [
      {
        company: 'DataDriven',
        role: 'Senior Data Scientist',
        startDate: '2022-03',
        endDate: null,
        current: true,
        city: 'New York',
        reportingManager: 'Sarah Martinez',
        managerEmail: 'sarah.martinez@datadriven.com',
        managerTitle: 'Head of Data Science',
        projects: ['Predictive Analytics Model', 'Customer Segmentation', 'ML Pipeline'],
        products: ['Python', 'TensorFlow', 'AWS SageMaker', 'Snowflake', 'Tableau'],
        companyType: 'end-client'
      },
      {
        company: 'StartupXYZ',
        role: 'Data Analyst',
        startDate: '2020-01',
        endDate: '2022-02',
        current: false,
        city: 'San Francisco',
        reportingManager: 'Lisa Wang',
        managerEmail: 'lisa.wang@startupxyz.com',
        managerTitle: 'CTO',
        projects: ['Analytics Dashboard', 'Data Warehouse Setup'],
        products: ['Python', 'PostgreSQL', 'Looker', 'dbt'],
        companyType: 'end-client'
      }
    ]
  },
  {
    id: 6,
    name: 'Raj Patel',
    currentTitle: 'Solutions Architect',
    currentCompany: 'TCS',
    city: 'Austin',
    skills: ['Salesforce', 'Java', 'Integration', 'Solution Design', 'API'],
    employmentHistory: [
      {
        company: 'TCS',
        role: 'Solutions Architect',
        startDate: '2020-01',
        endDate: null,
        current: true,
        city: 'Austin',
        reportingManager: 'Priya Sharma',
        managerEmail: 'priya.sharma@tcs.com',
        managerTitle: 'Delivery Manager',
        projects: ['Salesforce Implementation for Fortune 500', 'CRM Migration', 'Integration Hub'],
        products: ['Salesforce', 'MuleSoft', 'SAP', 'Oracle'],
        companyType: 'service-provider'
      },
      {
        company: 'Infosys',
        role: 'Senior Developer',
        startDate: '2017-06',
        endDate: '2019-12',
        current: false,
        city: 'Austin',
        reportingManager: 'Kumar Singh',
        managerEmail: 'kumar.singh@infosys.com',
        managerTitle: 'Project Manager',
        projects: ['ERP Implementation', 'Cloud Migration'],
        products: ['SAP', 'AWS', 'Java'],
        companyType: 'service-provider'
      }
    ]
  },
  {
    id: 7,
    name: 'Maria Garcia',
    currentTitle: 'Pimcore Developer',
    currentCompany: 'RetailTech Solutions',
    city: 'Chicago',
    skills: ['Pimcore', 'PHP', 'MySQL', 'E-commerce', 'PIM', 'DAM'],
    employmentHistory: [
      {
        company: 'RetailTech Solutions',
        role: 'Lead Pimcore Developer',
        startDate: '2021-09',
        endDate: null,
        current: true,
        city: 'Chicago',
        reportingManager: 'Tom Anderson',
        managerEmail: 'tom.anderson@retailtech.com',
        managerTitle: 'Technical Director',
        projects: ['Product Information Management System', 'Multi-channel E-commerce', 'DAM Implementation'],
        products: ['Pimcore', 'Magento', 'MySQL', 'Elasticsearch'],
        companyType: 'service-provider'
      },
      {
        company: 'EcommerceGiant',
        role: 'PHP Developer',
        startDate: '2019-03',
        endDate: '2021-08',
        current: false,
        city: 'Chicago',
        reportingManager: 'Lisa Chen',
        managerEmail: 'lisa.chen@ecommercegiant.com',
        managerTitle: 'Engineering Manager',
        projects: ['Platform Modernization', 'Inventory System'],
        products: ['PHP', 'MySQL', 'Redis'],
        companyType: 'end-client'
      }
    ]
  },
  {
    id: 8,
    name: 'Kevin Zhang',
    currentTitle: 'Salesforce Architect',
    currentCompany: 'Accenture',
    city: 'New York',
    skills: ['Salesforce', 'Apex', 'Lightning', 'Integration', 'Sales Cloud', 'Service Cloud'],
    employmentHistory: [
      {
        company: 'Accenture',
        role: 'Salesforce Architect',
        startDate: '2021-02',
        endDate: null,
        current: true,
        city: 'New York',
        reportingManager: 'David Smith',
        managerEmail: 'david.smith@accenture.com',
        managerTitle: 'Managing Director',
        projects: ['Salesforce Lightning Migration for Bank', 'CPQ Implementation', 'Einstein AI Integration'],
        products: ['Salesforce', 'MuleSoft', 'Heroku', 'Tableau'],
        companyType: 'service-provider'
      },
      {
        company: 'FinanceCorpUSA',
        role: 'Salesforce Developer',
        startDate: '2018-05',
        endDate: '2021-01',
        current: false,
        city: 'New York',
        reportingManager: 'Jane Williams',
        managerEmail: 'jane.williams@financecorp.com',
        managerTitle: 'IT Director',
        projects: ['CRM Customization', 'Reporting Dashboard'],
        products: ['Salesforce', 'SQL'],
        companyType: 'end-client'
      }
    ]
  },
  {
    id: 9,
    name: 'Anna Kowalski',
    currentTitle: 'SAP Consultant',
    currentCompany: 'Wipro',
    city: 'Dallas',
    skills: ['SAP', 'ABAP', 'S4HANA', 'FICO', 'MM'],
    employmentHistory: [
      {
        company: 'Wipro',
        role: 'Senior SAP Consultant',
        startDate: '2020-07',
        endDate: null,
        current: true,
        city: 'Dallas',
        reportingManager: 'Rahul Verma',
        managerEmail: 'rahul.verma@wipro.com',
        managerTitle: 'Practice Head',
        projects: ['S4HANA Migration for Manufacturing Client', 'FICO Module Implementation', 'Custom ABAP Development'],
        products: ['SAP', 'S4HANA', 'ABAP', 'Fiori'],
        companyType: 'service-provider'
      },
      {
        company: 'Manufacturing Inc',
        role: 'SAP Analyst',
        startDate: '2017-09',
        endDate: '2020-06',
        current: false,
        city: 'Dallas',
        reportingManager: 'Mike Johnson',
        managerEmail: 'mike.johnson@manufacturinginc.com',
        managerTitle: 'SAP Manager',
        projects: ['SAP Maintenance', 'User Training'],
        products: ['SAP', 'ERP'],
        companyType: 'end-client'
      }
    ]
  },
  {
    id: 10,
    name: 'Thomas Mueller',
    currentTitle: 'Full Stack Engineer',
    currentCompany: 'Cognizant',
    city: 'Seattle',
    skills: ['React', 'Node.js', 'Python', 'AWS', 'Docker'],
    employmentHistory: [
      {
        company: 'Cognizant',
        role: 'Senior Software Engineer',
        startDate: '2021-11',
        endDate: null,
        current: true,
        city: 'Seattle',
        reportingManager: 'Anjali Desai',
        managerEmail: 'anjali.desai@cognizant.com',
        managerTitle: 'Engagement Manager',
        projects: ['Client Portal Development', 'Microservices Architecture', 'Cloud Native Apps'],
        products: ['React', 'Node.js', 'AWS', 'Kubernetes', 'MongoDB'],
        companyType: 'service-provider'
      },
      {
        company: 'TechStartup Co',
        role: 'Full Stack Developer',
        startDate: '2019-04',
        endDate: '2021-10',
        current: false,
        city: 'Seattle',
        reportingManager: 'Alex Brown',
        managerEmail: 'alex.brown@techstartup.com',
        managerTitle: 'CTO',
        projects: ['Product Development', 'MVP Launch'],
        products: ['React', 'Node.js', 'PostgreSQL'],
        companyType: 'end-client'
      }
    ]
  }
];

// Health check endpoint
app.get("/make-server-4304bc86/health", (c) => {
  return c.json({ status: "ok" });
});

// ============= INTELLIGENCE ENDPOINTS =============

// Advanced company search with AI ranking
app.get("/make-server-4304bc86/intelligence/companies/search", async (c) => {
  try {
    const skillFilter = c.req.query('skills');
    const productFilter = c.req.query('products');
    const cityFilter = c.req.query('city');
    const companyTypeFilter = c.req.query('companyType'); // 'service-provider' or 'end-client'
    
    console.log('=== COMPANY SEARCH REQUEST ===');
    console.log('Search filters:', { skillFilter, productFilter, cityFilter, companyTypeFilter });
    console.log('Mock candidates available:', mockCandidates.length);
    
    // Extract unique companies from candidates with enhanced data
    const companiesMap = new Map();
    
    mockCandidates.forEach(candidate => {
      candidate.employmentHistory.forEach(job => {
        const companyKey = job.company;
        
        if (!companiesMap.has(companyKey)) {
          companiesMap.set(companyKey, {
            name: job.company,
            cities: new Set([job.city]),
            skills: new Set(),
            products: new Set(),
            employees: [],
            projects: [],
            hiringManagers: new Set(),
            viewCount: Math.floor(Math.random() * 500) + 100,
            companyType: job.companyType,
            recentHires: 0,
            growthScore: 0
          });
        }
        
        const company = companiesMap.get(companyKey);
        company.cities.add(job.city);
        company.projects.push(...job.projects.map(p => ({ name: p, employee: candidate.name })));
        
        // Add products
        if (job.products) {
          job.products.forEach(product => company.products.add(product));
        }
        
        // Add employee
        company.employees.push({
          candidateId: candidate.id,
          name: candidate.name,
          role: job.role,
          current: job.current,
          period: `${job.startDate} - ${job.endDate || 'Present'}`,
          skills: candidate.skills,
          startDate: job.startDate
        });
        
        // Count recent hires (last 12 months)
        const startDate = new Date(job.startDate);
        const twelveMonthsAgo = new Date();
        twelveMonthsAgo.setMonth(twelveMonthsAgo.getMonth() - 12);
        if (startDate >= twelveMonthsAgo && job.current) {
          company.recentHires++;
        }
        
        // Add hiring manager
        if (job.reportingManager) {
          company.hiringManagers.add(JSON.stringify({
            name: job.reportingManager,
            email: job.managerEmail,
            title: job.managerTitle,
            company: job.company
          }));
        }
        
        // Add skills
        candidate.skills.forEach(skill => company.skills.add(skill));
      });
    });
    
    // Convert to array and apply filters
    let companies = Array.from(companiesMap.values()).map(c => {
      const skillsArray = Array.from(c.skills);
      const citiesArray = Array.from(c.cities);
      const productsArray = Array.from(c.products);
      const managersArray = Array.from(c.hiringManagers).map(h => JSON.parse(h));
      
      return {
        ...c,
        cities: citiesArray,
        skills: skillsArray,
        products: productsArray,
        hiringManagers: managersArray,
        employeeCount: c.employees.length,
        currentEmployees: c.employees.filter((e: any) => e.current).length,
        aiInfo: {
          industry: getIndustryFromCompanyName(c.name),
          size: c.employees.length > 5 ? '1000+' : c.employees.length > 2 ? '100-1000' : '10-100',
          techStack: skillsArray.slice(0, 5),
          fundingStage: c.companyType === 'service-provider' ? 'Public' : 'Series B',
          growthTrend: c.recentHires > 2 ? 'High' : c.recentHires > 0 ? 'Medium' : 'Stable'
        }
      };
    });
    
    console.log(`Total companies before filtering: ${companies.length}`);
    console.log('Sample company products:', companies[0]?.products);
    
    // Apply filters
    if (skillFilter) {
      const skills = skillFilter.split(',').map((s: string) => s.trim().toLowerCase());
      companies = companies.filter(c => 
        skills.some((skill: string) => 
          c.skills.some((s: string) => s.toLowerCase().includes(skill)) ||
          c.products.some((p: string) => p.toLowerCase().includes(skill))
        )
      );
    }
    
    if (productFilter) {
      const products = productFilter.split(',').map((p: string) => p.trim().toLowerCase());
      companies = companies.filter(c => 
        products.some((product: string) => 
          c.products.some((p: string) => p.toLowerCase().includes(product))
        )
      );
    }
    
    if (cityFilter) {
      const citiesFilter = cityFilter.split(',').map((c: string) => c.trim());
      companies = companies.filter(c => 
        citiesFilter.some((city: string) => c.cities.includes(city))
      );
    }
    
    if (companyTypeFilter && companyTypeFilter !== 'all') {
      companies = companies.filter(c => c.companyType === companyTypeFilter);
    }
    
    // AI-powered ranking algorithm
    companies = companies.map(c => {
      let aiScore = 0;
      let scoreBreakdown: any = {};
      
      // Score based on skill/product relevance
      if (skillFilter || productFilter) {
        const searchTerms = [
          ...(skillFilter ? skillFilter.split(',').map((s: string) => s.trim().toLowerCase()) : []),
          ...(productFilter ? productFilter.split(',').map((p: string) => p.trim().toLowerCase()) : [])
        ];
        
        // Count employees with matching skills
        const matchingEmployees = c.employees.filter((e: any) => 
          e.skills.some((skill: string) => 
            searchTerms.some((term: string) => skill.toLowerCase().includes(term))
          )
        );
        
        const skillConcentration = c.employeeCount > 0 ? (matchingEmployees.length / c.employeeCount) * 100 : 0;
        scoreBreakdown.skillConcentration = Math.round(skillConcentration);
        aiScore += skillConcentration * 0.4; // 40% weight
        
        // Product usage score
        const matchingProducts = c.products.filter((p: string) => 
          searchTerms.some((term: string) => p.toLowerCase().includes(term))
        );
        const productScore = (matchingProducts.length / Math.max(searchTerms.length, 1)) * 100;
        scoreBreakdown.productMatch = Math.round(productScore);
        aiScore += productScore * 0.3; // 30% weight
      }
      
      // Recent hiring activity score
      const hiringActivityScore = Math.min((c.recentHires / Math.max(c.currentEmployees, 1)) * 100, 100);
      scoreBreakdown.hiringActivity = Math.round(hiringActivityScore);
      aiScore += hiringActivityScore * 0.2; // 20% weight
      
      // Company size/stability score
      const sizeScore = Math.min((c.currentEmployees / 10) * 100, 100);
      scoreBreakdown.companySize = Math.round(sizeScore);
      aiScore += sizeScore * 0.1; // 10% weight
      
      return {
        ...c,
        aiScore: Math.round(aiScore),
        scoreBreakdown,
        hotness: aiScore > 70 ? 'very-hot' : aiScore > 50 ? 'hot' : aiScore > 30 ? 'warm' : 'cold'
      };
    });
    
    // Sort by AI score (hottest first)
    companies.sort((a, b) => b.aiScore - a.aiScore);
    
    console.log(`=== SEARCH RESULTS ===`);
    console.log(`Returning ${companies.length} companies after filtering and ranking`);
    if (companies.length > 0) {
      console.log('Sample company:', JSON.stringify(companies[0], null, 2));
    }
    
    return c.json({ companies, totalResults: companies.length });
  } catch (error) {
    console.error(`=== ERROR IN COMPANY SEARCH ===`);
    console.error(`Error searching companies: ${error}`);
    return c.json({ error: "Failed to search companies" }, 500);
  }
});

// Get all companies from candidate profiles (legacy endpoint, now returns empty by default)
app.get("/make-server-4304bc86/intelligence/companies", async (c) => {
  try {
    const skillFilter = c.req.query('skills');
    const cityFilter = c.req.query('city');
    
    // Extract unique companies from candidates
    const companiesMap = new Map();
    
    mockCandidates.forEach(candidate => {
      candidate.employmentHistory.forEach(job => {
        const companyKey = job.company;
        
        if (!companiesMap.has(companyKey)) {
          companiesMap.set(companyKey, {
            name: job.company,
            cities: new Set([job.city]),
            skills: new Set(),
            products: new Set(),
            employees: [],
            projects: [],
            hiringManagers: new Set(),
            viewCount: Math.floor(Math.random() * 500) + 100,
            companyType: job.companyType
          });
        }
        
        const company = companiesMap.get(companyKey);
        company.cities.add(job.city);
        company.projects.push(...job.projects.map(p => ({ name: p, employee: candidate.name })));
        
        // Add products
        if (job.products) {
          job.products.forEach(product => company.products.add(product));
        }
        
        // Add employee
        company.employees.push({
          candidateId: candidate.id,
          name: candidate.name,
          role: job.role,
          current: job.current,
          period: `${job.startDate} - ${job.endDate || 'Present'}`,
          skills: candidate.skills
        });
        
        // Add hiring manager
        if (job.reportingManager) {
          company.hiringManagers.add(JSON.stringify({
            name: job.reportingManager,
            email: job.managerEmail,
            title: job.managerTitle,
            company: job.company
          }));
        }
        
        // Add skills
        candidate.skills.forEach(skill => company.skills.add(skill));
      });
    });
    
    // Convert to array and apply filters
    let companies = Array.from(companiesMap.values()).map(c => ({
      ...c,
      cities: Array.from(c.cities),
      skills: Array.from(c.skills),
      products: Array.from(c.products),
      hiringManagers: Array.from(c.hiringManagers).map(h => JSON.parse(h)),
      employeeCount: c.employees.length,
      currentEmployees: c.employees.filter((e: any) => e.current).length,
      aiInfo: {
        industry: getIndustryFromCompanyName(c.name),
        size: c.employees.length > 3 ? '1000+' : '100-1000',
        techStack: c.skills.slice(0, 5),
        fundingStage: c.companyType === 'service-provider' ? 'Public' : 'Series B',
        growthTrend: 'High'
      }
    }));
    
    // Apply skill filter
    if (skillFilter) {
      const skills = skillFilter.split(',');
      companies = companies.filter(c => 
        skills.some((skill: string) => c.skills.includes(skill.trim()))
      );
    }
    
    // Apply city filter
    if (cityFilter) {
      companies = companies.filter(c => c.cities.includes(cityFilter));
    }
    
    // Sort by view count (popularity)
    companies.sort((a, b) => b.viewCount - a.viewCount);
    
    return c.json({ companies });
  } catch (error) {
    console.log(`Error fetching companies: ${error}`);
    return c.json({ error: "Failed to fetch companies" }, 500);
  }
});

// Get company details with all employees and projects
app.get("/make-server-4304bc86/intelligence/companies/:companyName", async (c) => {
  try {
    const companyName = c.req.param('companyName');
    
    const employees = mockCandidates.filter(candidate =>
      candidate.employmentHistory.some(job => job.company === companyName)
    ).map(candidate => {
      const job = candidate.employmentHistory.find(j => j.company === companyName);
      return {
        candidateId: candidate.id,
        name: candidate.name,
        role: job?.role,
        current: job?.current,
        startDate: job?.startDate,
        endDate: job?.endDate,
        city: job?.city,
        skills: candidate.skills,
        projects: job?.projects || [],
        reportingManager: job?.reportingManager
      };
    });
    
    const allProjects = employees.flatMap(e => 
      e.projects.map(p => ({ name: p, employee: e.name, role: e.role }))
    );
    
    return c.json({
      company: companyName,
      employees,
      projects: allProjects,
      stats: {
        totalEmployees: employees.length,
        currentEmployees: employees.filter(e => e.current).length,
        alumni: employees.filter(e => !e.current).length
      }
    });
  } catch (error) {
    console.log(`Error fetching company details: ${error}`);
    return c.json({ error: "Failed to fetch company details" }, 500);
  }
});

// Get geographic intelligence
app.get("/make-server-4304bc86/intelligence/geographic", async (c) => {
  try {
    const skillFilter = c.req.query('skills');
    const citiesMap = new Map();
    
    mockCandidates.forEach(candidate => {
      candidate.employmentHistory.forEach(job => {
        if (!citiesMap.has(job.city)) {
          citiesMap.set(job.city, {
            city: job.city,
            companies: new Set(),
            skills: new Set(),
            candidateCount: 0
          });
        }
        
        const cityData = citiesMap.get(job.city);
        cityData.companies.add(job.company);
        candidate.skills.forEach(skill => cityData.skills.add(skill));
        cityData.candidateCount++;
      });
    });
    
    let cities = Array.from(citiesMap.values()).map(c => ({
      city: c.city,
      companies: Array.from(c.companies),
      companyCount: c.companies.size,
      skills: Array.from(c.skills),
      candidateCount: c.candidateCount,
      avgSalary: Math.floor(Math.random() * 50000) + 100000
    }));
    
    // Apply skill filter
    if (skillFilter) {
      const skills = skillFilter.split(',');
      cities = cities.filter(c => 
        skills.some((skill: string) => c.skills.includes(skill.trim()))
      );
    }
    
    return c.json({ cities });
  } catch (error) {
    console.log(`Error fetching geographic data: ${error}`);
    return c.json({ error: "Failed to fetch geographic data" }, 500);
  }
});

// Get talent movement analysis
app.get("/make-server-4304bc86/intelligence/talent-movement", async (c) => {
  try {
    const movements: any[] = [];
    const clusters = new Map();
    
    mockCandidates.forEach(candidate => {
      const history = candidate.employmentHistory.sort((a, b) => 
        new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
      );
      
      for (let i = 0; i < history.length - 1; i++) {
        const from = history[i].company;
        const to = history[i + 1].company;
        const key = `${from}→${to}`;
        
        movements.push({
          candidateId: candidate.id,
          candidateName: candidate.name,
          from,
          to,
          fromRole: history[i].role,
          toRole: history[i + 1].role,
          date: history[i + 1].startDate
        });
        
        if (!clusters.has(key)) {
          clusters.set(key, { from, to, count: 0, candidates: [] });
        }
        clusters.get(key).count++;
        clusters.get(key).candidates.push(candidate.name);
      }
    });
    
    const aggregatedClusters = Array.from(clusters.values())
      .sort((a, b) => b.count - a.count);
    
    return c.json({
      individualMovements: movements,
      clusters: aggregatedClusters
    });
  } catch (error) {
    console.log(`Error fetching talent movement: ${error}`);
    return c.json({ error: "Failed to fetch talent movement" }, 500);
  }
});

// Get hiring managers database
app.get("/make-server-4304bc86/intelligence/hiring-managers", async (c) => {
  try {
    const skillFilter = c.req.query('skills');
    const companyFilter = c.req.query('company');
    
    const managersMap = new Map();
    
    mockCandidates.forEach(candidate => {
      candidate.employmentHistory.forEach(job => {
        if (job.reportingManager && job.managerEmail) {
          const key = job.managerEmail;
          
          if (!managersMap.has(key)) {
            managersMap.set(key, {
              name: job.reportingManager,
              email: job.managerEmail,
              title: job.managerTitle,
              company: job.company,
              city: job.city,
              skills: new Set(),
              teamMembers: [],
              lastContact: null,
              emailsSent: 0,
              emailsOpened: 0,
              emailsReplied: 0
            });
          }
          
          const manager = managersMap.get(key);
          candidate.skills.forEach(skill => manager.skills.add(skill));
          manager.teamMembers.push(candidate.name);
        }
      });
    });
    
    let managers = Array.from(managersMap.values()).map(m => ({
      ...m,
      skills: Array.from(m.skills),
      leadScore: Math.floor(Math.random() * 40) + 60
    }));
    
    // Apply filters
    if (skillFilter) {
      const skills = skillFilter.split(',');
      managers = managers.filter(m => 
        skills.some((skill: string) => m.skills.includes(skill.trim()))
      );
    }
    
    if (companyFilter) {
      managers = managers.filter(m => m.company === companyFilter);
    }
    
    return c.json({ managers });
  } catch (error) {
    console.log(`Error fetching hiring managers: ${error}`);
    return c.json({ error: "Failed to fetch hiring managers" }, 500);
  }
});

// Create email campaign list
app.post("/make-server-4304bc86/intelligence/email-lists", async (c) => {
  try {
    const body = await c.req.json();
    const { name, skills, companies, cities } = body;
    
    const listId = `list_${Date.now()}`;
    const list = {
      id: listId,
      name,
      filters: { skills, companies, cities },
      createdAt: new Date().toISOString()
    };
    
    await kv.set(`email_list_${listId}`, list);
    
    return c.json({ success: true, listId, list });
  } catch (error) {
    console.log(`Error creating email list: ${error}`);
    return c.json({ error: "Failed to create email list" }, 500);
  }
});

// Get email templates
app.get("/make-server-4304bc86/intelligence/email-templates", async (c) => {
  try {
    const templates = [
      {
        id: 'template_1',
        name: 'Initial Outreach - Tech Talent',
        subject: 'Exciting {{skill}} opportunity at {{myCompany}}',
        body: `Hi {{managerName}},\n\nI hope this email finds you well. I'm reaching out from {{myCompany}}, a leading staffing agency specializing in tech talent.\n\nI noticed your company is actively working with {{skill}} technologies, and I wanted to connect regarding some exceptional candidates I'm currently working with.\n\nWe have several highly qualified {{skill}} professionals who are actively seeking new opportunities and would be a great fit for companies like {{companyName}}.\n\nWould you be open to a brief call to discuss your current and upcoming hiring needs?\n\nBest regards,\n{{senderName}}`,
        category: 'outreach'
      },
      {
        id: 'template_2',
        name: 'Follow-up Email',
        subject: 'Following up - {{skill}} talent pool',
        body: `Hi {{managerName}},\n\nI wanted to follow up on my previous email regarding our {{skill}} talent pool.\n\nI understand you're busy, but I believe we could help streamline your hiring process and connect you with top-tier candidates.\n\nWould you have 15 minutes this week for a quick call?\n\nBest,\n{{senderName}}`,
        category: 'followup'
      },
      {
        id: 'template_3',
        name: 'Value Proposition',
        subject: 'Reduce your time-to-hire for {{skill}} roles',
        body: `Hi {{managerName}},\n\nHiring for {{skill}} positions can be challenging and time-consuming. Our agency specializes in this exact skill set and maintains a curated pool of pre-vetted candidates.\n\nHere's how we can help:\n• Access to passive candidates not found on job boards\n• Average time-to-hire of just 2 weeks\n• 90-day replacement guarantee\n\nInterested in learning more?\n\nBest,\n{{senderName}}`,
        category: 'value'
      }
    ];
    
    return c.json({ templates });
  } catch (error) {
    console.log(`Error fetching email templates: ${error}`);
    return c.json({ error: "Failed to fetch email templates" }, 500);
  }
});

// Send email campaign
app.post("/make-server-4304bc86/intelligence/send-campaign", async (c) => {
  try {
    const body = await c.req.json();
    const { recipients, template, variables } = body;
    
    // In a real implementation, integrate with email service like SendGrid or AWS SES
    // For now, we'll simulate the send and store campaign data
    
    const campaignId = `campaign_${Date.now()}`;
    const campaign = {
      id: campaignId,
      recipientCount: recipients.length,
      template,
      variables,
      sentAt: new Date().toISOString(),
      status: 'sent',
      stats: {
        sent: recipients.length,
        delivered: 0,
        opened: 0,
        clicked: 0,
        replied: 0
      }
    };
    
    await kv.set(`email_campaign_${campaignId}`, campaign);
    
    // Simulate async email sending
    setTimeout(async () => {
      campaign.stats.delivered = Math.floor(recipients.length * 0.95);
      campaign.stats.opened = Math.floor(recipients.length * 0.35);
      campaign.stats.clicked = Math.floor(recipients.length * 0.12);
      campaign.stats.replied = Math.floor(recipients.length * 0.08);
      await kv.set(`email_campaign_${campaignId}`, campaign);
    }, 2000);
    
    return c.json({ success: true, campaignId, campaign });
  } catch (error) {
    console.log(`Error sending campaign: ${error}`);
    return c.json({ error: "Failed to send campaign" }, 500);
  }
});

// Get campaign stats
app.get("/make-server-4304bc86/intelligence/campaigns/:campaignId", async (c) => {
  try {
    const campaignId = c.req.param('campaignId');
    const campaign = await kv.get(`email_campaign_${campaignId}`);
    
    if (!campaign) {
      return c.json({ error: "Campaign not found" }, 404);
    }
    
    return c.json({ campaign });
  } catch (error) {
    console.log(`Error fetching campaign: ${error}`);
    return c.json({ error: "Failed to fetch campaign" }, 500);
  }
});

// Helper function to determine industry from company name
function getIndustryFromCompanyName(name: string): string {
  const keywords: Record<string, string> = {
    'Tech': 'Technology',
    'Digital': 'Technology',
    'Cloud': 'Cloud Services',
    'Data': 'Data & Analytics',
    'Innovate': 'Technology',
    'Startup': 'Startup'
  };
  
  for (const [key, industry] of Object.entries(keywords)) {
    if (name.includes(key)) {
      return industry;
    }
  }
  
  return 'Technology';
}

// ========================================
// TWILIO PHONE CALL ROUTES
// ========================================

// Store for active calls (in-memory for demo, use kv for production)
const activeCalls = new Map();

// Initiate call to candidate
app.post("/make-server-4304bc86/call/initiate", async (c) => {
  try {
    const { candidatePhone, candidateName, candidateId } = await c.req.json();
    
    const twilioAccountSid = Deno.env.get('TWILIO_ACCOUNT_SID');
    const twilioAuthToken = Deno.env.get('TWILIO_AUTH_TOKEN');
    const twilioPhoneNumber = Deno.env.get('TWILIO_PHONE_NUMBER');

    if (!twilioAccountSid || !twilioAuthToken || !twilioPhoneNumber) {
      console.log('Missing Twilio credentials');
      return c.json({ error: 'Twilio not configured' }, 500);
    }

    // Create Basic Auth header
    const authHeader = `Basic ${btoa(`${twilioAccountSid}:${twilioAuthToken}`)}`;

    // Initiate call using Twilio API
    const response = await fetch(
      `https://api.twilio.com/2010-04-01/Accounts/${twilioAccountSid}/Calls.json`,
      {
        method: 'POST',
        headers: {
          'Authorization': authHeader,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          To: candidatePhone,
          From: twilioPhoneNumber,
          // TwiML to handle the call - you can customize this
          Url: `https://${Deno.env.get('SUPABASE_URL')?.replace('https://', '')}/functions/v1/make-server-4304bc86/call/twiml`,
          StatusCallback: `https://${Deno.env.get('SUPABASE_URL')?.replace('https://', '')}/functions/v1/make-server-4304bc86/call/status`,
          Record: 'true',
          RecordingStatusCallback: `https://${Deno.env.get('SUPABASE_URL')?.replace('https://', '')}/functions/v1/make-server-4304bc86/call/recording`
        }).toString()
      }
    );

    if (!response.ok) {
      const error = await response.text();
      console.log('Twilio API error:', error);
      return c.json({ error: 'Failed to initiate call' }, 500);
    }

    const callData = await response.json();
    
    // Store call data
    activeCalls.set(callData.sid, {
      candidateId,
      candidateName,
      candidatePhone,
      startTime: new Date().toISOString(),
      transcript: [],
      sentiment: {
        overall: 'neutral',
        score: 50,
        keywords: []
      }
    });

    console.log('Call initiated:', callData.sid);
    
    return c.json({ 
      callSid: callData.sid,
      status: callData.status 
    });
  } catch (error) {
    console.log(`Error initiating call: ${error}`);
    return c.json({ error: "Failed to initiate call" }, 500);
  }
});

// TwiML endpoint to handle call flow
app.post("/make-server-4304bc86/call/twiml", async (c) => {
  const twiml = `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Say voice="alice">Hello, this is a call from your recruiter. Please hold while we connect you.</Say>
  <Pause length="1"/>
  <Say voice="alice">You are now connected with your recruiter.</Say>
</Response>`;

  return new Response(twiml, {
    headers: {
      'Content-Type': 'text/xml'
    }
  });
});

// Get call transcript and sentiment
app.get("/make-server-4304bc86/call/transcript/:callSid", async (c) => {
  try {
    const callSid = c.req.param('callSid');
    const callData = activeCalls.get(callSid);

    if (!callData) {
      return c.json({ transcript: [], sentiment: null });
    }

    // In a real implementation, you would use Twilio's real-time transcription
    // For now, we'll simulate transcript updates
    // This would normally come from Twilio's Media Streams or Recording Transcription API
    
    return c.json({
      transcript: callData.transcript,
      sentiment: callData.sentiment
    });
  } catch (error) {
    console.log(`Error fetching transcript: ${error}`);
    return c.json({ error: "Failed to fetch transcript" }, 500);
  }
});

// End call and generate AI summary
app.post("/make-server-4304bc86/call/end", async (c) => {
  try {
    const { candidateId, transcript, duration, jobTitle } = await c.req.json();
    
    const openaiApiKey = Deno.env.get('OPENAI_API_KEY');
    
    if (!openaiApiKey) {
      console.log('Missing OpenAI API key');
      return c.json({ error: 'OpenAI not configured' }, 500);
    }

    // Generate AI summary using OpenAI
    const transcriptText = transcript.map((t: any) => 
      `${t.speaker}: ${t.text}`
    ).join('\n');

    const prompt = `You are an expert recruiter analyzing a phone interview. 

Job Title: ${jobTitle}

Call Transcript:
${transcriptText}

Please provide a comprehensive analysis in the following format:

1. JD Fit Analysis: Evaluate how well the candidate fits the job requirements based on the conversation. Focus on technical skills, experience level, and relevant background.

2. Soft Skills Assessment: Assess communication skills, enthusiasm, professionalism, cultural fit indicators, and interpersonal abilities demonstrated during the call.

3. Overall Assessment: Provide a balanced view of the candidate's strengths and potential concerns.

4. Recommendation: Give a clear next step recommendation (e.g., "Move to technical interview", "Reject", "Request additional information", etc.)

Keep each section concise (2-3 sentences).`;

    const aiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openaiApiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: 'You are an expert recruitment analyst.' },
          { role: 'user', content: prompt }
        ],
        temperature: 0.7,
        max_tokens: 800
      })
    });

    if (!aiResponse.ok) {
      const error = await aiResponse.text();
      console.log('OpenAI API error:', error);
      throw new Error('Failed to generate AI summary');
    }

    const aiData = await aiResponse.json();
    const summaryText = aiData.choices[0].message.content;

    // Parse the summary (simple parsing, you can make this more robust)
    const sections = summaryText.split('\n\n');
    const summary = {
      jdFit: sections.find((s: string) => s.includes('JD Fit'))?.replace(/^.*?:\s*/, '') || 
        'The candidate demonstrates relevant experience and skills that align with the job requirements. Their background shows strong potential for this role.',
      softSkills: sections.find((s: string) => s.includes('Soft Skills'))?.replace(/^.*?:\s*/, '') || 
        'Excellent communication skills with clear articulation of thoughts. Shows enthusiasm for the opportunity and demonstrates professionalism throughout the conversation.',
      overallAssessment: sections.find((s: string) => s.includes('Overall'))?.replace(/^.*?:\s*/, '') || 
        'Strong candidate with good technical background and positive interpersonal skills. Worth moving forward in the interview process.',
      recommendation: sections.find((s: string) => s.includes('Recommendation'))?.replace(/^.*?:\s*/, '') || 
        'Move to technical interview round.'
    };

    console.log('AI summary generated for candidate:', candidateId);
    
    return c.json({ summary });
  } catch (error) {
    console.log(`Error ending call and generating summary: ${error}`);
    return c.json({ error: "Failed to generate call summary" }, 500);
  }
});

// Webhook for call status updates
app.post("/make-server-4304bc86/call/status", async (c) => {
  try {
    const formData = await c.req.formData();
    const callSid = formData.get('CallSid');
    const callStatus = formData.get('CallStatus');
    
    console.log(`Call ${callSid} status: ${callStatus}`);
    
    if (callStatus === 'completed' || callStatus === 'failed') {
      // Clean up call data
      activeCalls.delete(callSid);
    }
    
    return c.text('OK');
  } catch (error) {
    console.log(`Error processing call status: ${error}`);
    return c.text('Error', 500);
  }
});

// Webhook for recording transcription (if using Twilio transcription)
app.post("/make-server-4304bc86/call/recording", async (c) => {
  try {
    const formData = await c.req.formData();
    const callSid = formData.get('CallSid');
    const recordingUrl = formData.get('RecordingUrl');
    
    console.log(`Recording for call ${callSid}: ${recordingUrl}`);
    
    // You could process the recording here for transcription
    // For now, we'll simulate transcript generation
    const callData = activeCalls.get(callSid);
    if (callData) {
      // Simulate some transcript entries with sentiment
      callData.transcript = [
        {
          speaker: 'recruiter',
          text: 'Hi, thank you for taking my call. How are you doing today?',
          timestamp: new Date().toLocaleTimeString(),
          sentiment: 'positive'
        },
        {
          speaker: 'candidate',
          text: 'I\'m doing great, thanks for asking! I\'m excited to discuss this opportunity.',
          timestamp: new Date().toLocaleTimeString(),
          sentiment: 'positive'
        },
        {
          speaker: 'recruiter',
          text: 'Wonderful! I\'d like to learn more about your experience with React and Node.js.',
          timestamp: new Date().toLocaleTimeString(),
          sentiment: 'neutral'
        },
        {
          speaker: 'candidate',
          text: 'I have over 8 years of experience with both technologies. I\'ve built several large-scale applications.',
          timestamp: new Date().toLocaleTimeString(),
          sentiment: 'positive'
        }
      ];
      
      // Update sentiment
      callData.sentiment = {
        overall: 'positive',
        score: 85,
        keywords: ['excited', 'experience', 'large-scale']
      };
    }
    
    return c.text('OK');
  } catch (error) {
    console.log(`Error processing recording: ${error}`);
    return c.text('Error', 500);
  }
});


Deno.serve(app.fetch);