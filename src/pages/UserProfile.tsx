import {
  User,
  Award,
  Briefcase,
  Star,
  Book,
  Check,
  MapPin,
  Mail,
  Phone,
  Linkedin,
  ExternalLink,
} from "lucide-react";

// Define types for our data structures
type Skill = string;

type Experience = {
  title: string;
  company: string;
  location: string;
  period: string;
  description: string;
};

type Education = {
  degree: string;
  school: string;
  period: string;
  gpa: string;
  highlights?: string;
};

type CertificationStatus = "EXPERT" | "ADVANCED" | "PROFICIENT";

type Certification = {
  name: string;
  issuer: string;
  date: string;
  verified: boolean;
  status?: CertificationStatus;
  description?: string;
  verificationId?: string;
  externalLink?: string;
  isExternal?: boolean;
};

type AssessmentCategory = {
  name: string;
  score: number; // Out of 5
};

type Assessment = {
  name: string;
  provider: string;
  date: string;
  score: number; // Overall score out of 100
  level: string;
  details: string;
  verificationId: string;
  categories: AssessmentCategory[];
};

type Project = {
  name: string;
  description: string;
  technologies: string[];
  link: string;
};

type Recommendation = {
  name: string;
  title: string;
  text: string;
};

type UserData = {
  name: string;
  title: string;
  location: string;
  email: string;
  phone: string;
  linkedin: string;
  github: string;
  about: string;
  skills: Skill[];
  experience: Experience[];
  education: Education[];
  certifications: Certification[];
  assessments: Assessment[];
  projects: Project[];
  recommendations: Recommendation[];
};

const UserProfile = () => {
  // In a real app, this would come from your API/backend
  const user: UserData = {
    name: "Richard Hendricks",
    title: "Software Engineer & Algorithm Specialist",
    location: "Palo Alto, CA",
    email: "richard.hendricks@piedpiper.com",
    phone: "(650) 555-0123",
    linkedin: "linkedin.com/in/richardhendricks",
    github: "github.com/richardhendricks",
    about:
      "Innovative software engineer with expertise in data compression algorithms and distributed systems. Creator of the revolutionary middle-out compression algorithm. Passionate about developing efficient, scalable software solutions that make the world a better place through elegant code.",
    skills: [
      "Algorithms",
      "Compression",
      "Python",
      "C++",
      "Distributed Systems",
      "AWS",
      "TensorFlow",
      "System Architecture",
      "Neural Networks",
    ],
    experience: [
      {
        title: "Founder & CEO",
        company: "Pied Piper",
        location: "Silicon Valley, CA",
        period: "2014 - Present",
        description:
          "Developed revolutionary middle-out compression algorithm achieving unprecedented Weissman scores. Led technical development of PiedPiperNet, a decentralized internet platform. Managed a team of engineers through multiple pivots while maintaining technical excellence and vision.",
      },
      {
        title: "Software Engineer",
        company: "Hooli",
        location: "Silicon Valley, CA",
        period: "2013 - 2014",
        description:
          "Created backend systems for Hooli Search, improving query response time by 30%. Contributed to internal compression utilities used across Hooli's infrastructure. Maintained code quality through comprehensive unit testing and peer review processes.",
      },
      {
        title: "Systems Administrator",
        company: "Nucleus Data Systems",
        location: "Palo Alto, CA",
        period: "2011 - 2013",
        description:
          "Maintained server infrastructure supporting high-volume data processing operations. Implemented automated backup and recovery solutions that reduced downtime by 45%.",
      },
    ],
    education: [
      {
        degree: "M.S. Computer Science",
        school: "Stanford University",
        period: "2009 - 2011",
        gpa: "3.9/4.0",
        highlights: "Thesis: 'Optimizing Data Storage in Distributed Systems'",
      },
      {
        degree: "B.S. Computer Science",
        school: "California Institute of Technology",
        period: "2005 - 2009",
        gpa: "3.85/4.0",
        highlights: "Minor in Applied Mathematics",
      },
    ],
    certifications: [
      {
        name: "SQL",
        issuer: "JobFrog",
        date: "July 2024",
        verified: true,
        status: "EXPERT",
        description: "Skill expected of the best senior engineers in that area",
        verificationId: "JF-CERT-78945612",
      },
      {
        name: "Back-end",
        issuer: "JobFrog",
        date: "March 2023",
        verified: true,
        status: "ADVANCED",
        description: "Skill expected of a senior engineer in that area",
        verificationId: "JF-CERT-32165498",
      },
      {
        name: "Front-end",
        issuer: "JobFrog",
        date: "September 2022",
        verified: true,
        status: "PROFICIENT",
        description: "Skill expected of a professional engineer in that area",
        verificationId: "JF-CERT-65432198",
      },
      {
        name: "AWS Certified Solutions Architect",
        issuer: "Amazon Web Services",
        date: "May 2023",
        verified: true,
        isExternal: true,
        externalLink: "https://aws.amazon.com/verification",
        verificationId: "AWS-12345-XXYZ",
      },
      {
        name: "Google Cloud Professional Engineer",
        issuer: "Google Cloud",
        date: "January 2024",
        verified: true,
        isExternal: true,
        externalLink: "https://cloud.google.com/certification",
        verificationId: "GCP-98765-ABCD",
      },
    ],
    assessments: [
      {
        name: "Software Engineering Assessment",
        provider: "JobFrog",
        date: "August 2024",
        score: 94,
        level: "Senior",
        details: "Algorithm optimization, system design, coding challenges",
        verificationId: "JF-ASSESS-123456",
        categories: [
          { name: "Algorithms", score: 5 },
          { name: "System Design", score: 5 },
          { name: "Problem Solving", score: 4 },
          { name: "Code Quality", score: 5 },
          { name: "Debugging", score: 4 },
        ],
      },
      {
        name: "Product Management Assessment",
        provider: "JobFrog",
        date: "August 2024",
        score: 86,
        level: "Mid-level",
        details: "Product strategy, market analysis, prioritization",
        verificationId: "JF-ASSESS-789012",
        categories: [
          { name: "Product Strategy", score: 4 },
          { name: "Market Analysis", score: 4 },
          { name: "Feature Prioritization", score: 5 },
          { name: "User Research", score: 3 },
          { name: "Product Analytics", score: 4 },
        ],
      },
      {
        name: "Design Assessment",
        provider: "JobFrog",
        date: "July 2024",
        score: 78,
        level: "Entry-level",
        details: "UI/UX knowledge, design systems, prototyping",
        verificationId: "JF-ASSESS-345678",
        categories: [
          { name: "Visual Design", score: 3 },
          { name: "UX Principles", score: 4 },
          { name: "Design Systems", score: 4 },
          { name: "Prototyping", score: 3 },
          { name: "Accessibility", score: 4 },
        ],
      },
    ],
    projects: [
      {
        name: "PiedPiperNet",
        description:
          "Decentralized internet platform utilizing revolutionary middle-out compression",
        technologies: ["C++", "Python", "Distributed Systems", "Blockchain"],
        link: "github.com/piedpiper/piedpipernet",
      },
      {
        name: "New Internet",
        description:
          "Open-source framework for distributed data storage and retrieval",
        technologies: ["Python", "TensorFlow", "AWS"],
        link: "github.com/richardhendricks/newinternet",
      },
    ],
    recommendations: [
      {
        name: "Bertram Gilfoyle",
        title: "Systems Architect at Pied Piper",
        text: "Richard's algorithm work is unparalleled. His compression capabilities outperform anything I've seen, which is saying something because I don't impress easily.",
      },
      {
        name: "Jared Dunn",
        title: "COO at Pied Piper",
        text: "Richard isn't just a brilliant engineer, he's a visionary. His technical abilities are matched only by his commitment to creating technology that benefits humanity.",
      },
    ],
  };

  const SkillBadge = ({ skill }: { skill: string }) => (
    <span className="bg-primary/10 text-primary text-sm font-medium mr-2 mb-2 px-3 py-1 rounded-full dark:bg-primary/20">
      {skill}
    </span>
  );

  const getCertificationColor = (status: CertificationStatus | undefined) => {
    switch (status) {
      case "EXPERT":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300";
      case "ADVANCED":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300";
      case "PROFICIENT":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
    }
  };

  const SectionHeader = ({
    title,
    icon,
  }: {
    title: string;
    icon: React.ReactNode;
  }) => (
    <div className="flex items-center mb-4 pb-2 border-b border-border">
      <div className="mr-2">{icon}</div>
      <h2 className="text-xl font-semibold">{title}</h2>
    </div>
  );

  const Section = ({
    children,
    className = "",
  }: {
    children: React.ReactNode;
    className?: string;
  }) => (
    <div
      className={`mb-8 p-6 rounded-lg bg-card text-card-foreground shadow-sm border border-border ${className}`}
    >
      {children}
    </div>
  );

  const CategoryRating = ({ name, score }: { name: string; score: number }) => (
    <div className="flex flex-col mb-2">
      <div className="flex justify-between mb-1">
        <span className="text-sm">{name}</span>
        <span className="text-sm font-medium">{score}/5</span>
      </div>
      <div className="flex">
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className={`h-2 w-6 mr-1 rounded-sm ${
              i <= score ? "bg-primary" : "bg-muted"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );

  const VerificationBadge = ({ id }: { id: string }) => (
    <div className="mt-2 border border-border rounded-md p-2 bg-muted/30">
      <div className="flex items-center text-xs text-muted-foreground">
        <Check size={12} className="mr-1 text-green-500" />
        <span>Verification ID: {id}</span>
      </div>
    </div>
  );

  return (
    <div className="bg-background text-foreground min-h-screen">
      <div className="max-w-7xl mx-auto py-8 px-4">
        {/* Header/Profile Card */}
        <Section className="relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-r from-primary to-primary/80"></div>
          <div className="relative pt-20">
            <div className="flex flex-col md:flex-row md:items-end">
              <div className="w-32 h-32 bg-muted rounded-full border-4 border-background flex items-center justify-center overflow-hidden shadow-md">
                <User size={64} className="text-muted-foreground" />
              </div>
              <div className="md:ml-6 mt-4 md:mt-0 flex-grow">
                <h1 className="text-2xl font-bold">{user.name}</h1>
                <p className="text-muted-foreground">{user.title}</p>
                <div className="flex flex-wrap items-center mt-2 text-muted-foreground">
                  <div className="flex items-center mr-4 mb-2">
                    <MapPin size={16} className="mr-1" />
                    <span>{user.location}</span>
                  </div>
                  <div className="flex items-center mr-4 mb-2">
                    <Mail size={16} className="mr-1" />
                    <a
                      href={`mailto:${user.email}`}
                      className="text-primary hover:underline"
                    >
                      {user.email}
                    </a>
                  </div>
                  <div className="flex items-center mr-4 mb-2">
                    <Phone size={16} className="mr-1" />
                    <span>{user.phone}</span>
                  </div>
                  <div className="flex items-center mr-4 mb-2">
                    <Linkedin size={16} className="mr-1" />
                    <a
                      href={`https://${user.linkedin}`}
                      className="text-primary hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {user.linkedin}
                    </a>
                  </div>
                  <div className="flex items-center mb-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mr-1"
                    >
                      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                    </svg>
                    <a
                      href={`https://${user.github}`}
                      className="text-primary hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {user.github}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {/* About Section */}
            <Section>
              <SectionHeader title="About" icon={<User size={20} />} />
              <p className="text-foreground whitespace-pre-line">
                {user.about}
              </p>
            </Section>

            {/* Skills Section */}
            <Section>
              <SectionHeader title="Skills" icon={<Star size={20} />} />
              <div className="flex flex-wrap">
                {user.skills.map((skill, index) => (
                  <SkillBadge key={index} skill={skill} />
                ))}
              </div>
            </Section>

            {/* Experience Section */}
            <Section>
              <SectionHeader
                title="Work Experience"
                icon={<Briefcase size={20} />}
              />
              {user.experience.map((exp, index) => (
                <div
                  key={index}
                  className={`${
                    index !== 0 ? "mt-6 pt-6 border-t border-border" : ""
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:justify-between">
                    <div>
                      <h3 className="text-lg font-semibold">{exp.title}</h3>
                      <p className="text-foreground">
                        {exp.company} • {exp.location}
                      </p>
                    </div>
                    <p className="text-muted-foreground mt-1 sm:mt-0">
                      {exp.period}
                    </p>
                  </div>
                  <p className="mt-2 text-foreground">{exp.description}</p>
                </div>
              ))}
            </Section>

            {/* Projects Section */}
            <Section>
              <SectionHeader title="Projects" icon={<Book size={20} />} />
              {user.projects.map((project, index) => (
                <div
                  key={index}
                  className={`${
                    index !== 0 ? "mt-6 pt-6 border-t border-border" : ""
                  }`}
                >
                  <div className="flex justify-between">
                    <h3 className="text-lg font-semibold">{project.name}</h3>
                    <a
                      href={`https://${project.link}`}
                      className="text-primary hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View Project
                    </a>
                  </div>
                  <p className="mt-1 text-foreground">{project.description}</p>
                  <div className="mt-2 flex flex-wrap">
                    {project.technologies.map((tech, i) => (
                      <SkillBadge key={i} skill={tech} />
                    ))}
                  </div>
                </div>
              ))}
            </Section>

            {/* Education Section */}
            <Section>
              <SectionHeader title="Education" icon={<Book size={20} />} />
              {user.education.map((edu, index) => (
                <div
                  key={index}
                  className={`${
                    index !== 0 ? "mt-6 pt-6 border-t border-border" : ""
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:justify-between">
                    <div>
                      <h3 className="text-lg font-semibold">{edu.degree}</h3>
                      <p className="text-foreground">{edu.school}</p>
                    </div>
                    <p className="text-muted-foreground mt-1 sm:mt-0">
                      {edu.period}
                    </p>
                  </div>
                  <p className="mt-1 text-foreground">GPA: {edu.gpa}</p>
                  {edu.highlights && (
                    <p className="mt-1 text-foreground">{edu.highlights}</p>
                  )}
                </div>
              ))}
            </Section>

            {/* Recommendations Section */}
            <Section>
              <SectionHeader
                title="Recommendations"
                icon={<Star size={20} />}
              />
              {user.recommendations.map((rec, index) => (
                <div
                  key={index}
                  className={`${
                    index !== 0 ? "mt-6 pt-6 border-t border-border" : ""
                  }`}
                >
                  <div className="flex items-start">
                    <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center mr-3">
                      <User size={20} className="text-muted-foreground" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{rec.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {rec.title}
                      </p>
                      <p className="mt-2 text-foreground italic">
                        "{rec.text}"
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </Section>
          </div>

          <div className="lg:col-span-1">
            {/* JobFrog Assessments - With Categories */}
            <Section>
              <SectionHeader
                title="JobFrog Interview Assessments"
                icon={<Award size={20} />}
              />
              {user.assessments.map((assessment, index) => (
                <div
                  key={index}
                  className={`${
                    index !== 0 ? "mt-6 pt-6 border-t border-border" : ""
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold">{assessment.name}</h3>
                    <span className="px-2 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium dark:bg-primary/20">
                      {assessment.level}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {assessment.provider} • {assessment.date}
                  </p>

                  {/* Overall score */}
                  <div className="mt-3 mb-4">
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Overall Score</span>
                      <span className="text-sm font-medium">
                        {assessment.score}/100
                      </span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-1.5 mt-1 mb-1">
                      <div
                        className="bg-primary h-1.5 rounded-full"
                        style={{ width: `${assessment.score}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Categories */}
                  <div className="border-t border-border pt-3">
                    <h4 className="text-sm font-medium mb-2">
                      Category Breakdown
                    </h4>
                    {assessment.categories.map((category, idx) => (
                      <CategoryRating
                        key={idx}
                        name={category.name}
                        score={category.score}
                      />
                    ))}
                  </div>

                  <p className="text-xs text-muted-foreground mt-3">
                    {assessment.details}
                  </p>

                  {assessment.verificationId && (
                    <VerificationBadge id={assessment.verificationId} />
                  )}
                </div>
              ))}
            </Section>

            {/* JobFrog Certifications */}
            <Section>
              <SectionHeader
                title="JobFrog Certifications"
                icon={<Award size={20} />}
              />
              {user.certifications
                .filter((cert) => !cert.isExternal)
                .map((cert, index) => (
                  <div
                    key={index}
                    className={`${
                      index !== 0 ? "mt-4 pt-4 border-t border-border" : ""
                    } flex items-start`}
                  >
                    <div className="mr-3">
                      <div
                        className={`flex w-28 h-8 items-center justify-center rounded-md ${getCertificationColor(
                          cert.status as CertificationStatus
                        )}`}
                      >
                        <span className="text-xs font-semibold">
                          {cert.status}
                        </span>
                      </div>
                    </div>
                    <div className="flex-grow">
                      <div className="flex items-center">
                        <h3 className="font-semibold">{cert.name}</h3>
                        {cert.verified && (
                          <span className="ml-2 bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full flex items-center dark:bg-green-900/30 dark:text-green-300">
                            <Check size={12} className="mr-1" />
                            Verified
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {cert.issuer} • {cert.date}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {cert.description}
                      </p>
                      {cert.verificationId && (
                        <VerificationBadge id={cert.verificationId} />
                      )}
                    </div>
                  </div>
                ))}
            </Section>

            {/* External Certifications */}
            <Section>
              <SectionHeader
                title="External Certifications"
                icon={<Award size={20} />}
              />
              {user.certifications
                .filter((cert) => cert.isExternal)
                .map((cert, index) => (
                  <div
                    key={index}
                    className={`${
                      index !== 0 ? "mt-4 pt-4 border-t border-border" : ""
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold">{cert.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {cert.issuer} • {cert.date}
                        </p>
                      </div>
                      {cert.externalLink && (
                        <a
                          href={cert.externalLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline flex items-center text-sm"
                        >
                          <span className="mr-1">Verify</span>
                          <ExternalLink size={14} />
                        </a>
                      )}
                    </div>
                    {cert.verificationId && (
                      <VerificationBadge id={cert.verificationId} />
                    )}
                  </div>
                ))}
            </Section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
