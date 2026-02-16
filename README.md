Built a full-stack job platform using Next.js, Drizzle, PostgreSQL with:

Role-based authentication
Advanced filtering
Skill-based match scoring
Relational data modeling
Application workflow system

## TODO

### Core features

- Authentication, email password, role (Employee, Job seeker),
- Employes can create, edit, delete, close jobs. (fields: title, description, location, remote/on-site, salary, skills(tags), experience-level)
- Advanced search: Keyword search, skill tag, salaray range, remote filter, sorting options(newest, salary), mybe FTS for title search
- Job-seeker page, bio, skills(tags), resume upload, experience level
- Applying, one click if signed-in with optional message if employer enabled, track status applied, interview, rejected. Empl updates status.
- Match score, matchScore = matchedSkills / totalRequiredSkills \* 100
- Saved jobs, bookmarks
- Employer dashboard, see jobs, applications, update statuses

DB:
User: id, email, name, role, bio, experience,
Jobs: id, title, description, location, remote, salary, employerId, createdAt
Skills: id, name
JobSkills: jobId, skillId
UserSkills: userId, skillId
Applications: id, jobId, userId, status, message, createdAt
SavedJobs(bookmarks): userId, jobId
Notifications: id, userId, message, read(boolean), link (optional URL), types: APPLICATION_STATUS, NEW_MATCH, NEW_APPLICATION, JOB_EXPIRING

Notifations:
1️⃣ Application Status Updates (Most Important)
When it triggers:
Employer changes status:
Applied → Interview
Interview → Rejected
Interview → Offer

Why it’s useful:
Job seekers want feedback. This keeps them coming back.
Example notification:
🎉 You’ve been moved to Interview for “Frontend Developer”
Implementation:
When employer updates status
Create a Notification record for that user
Simple. No real-time required.

2️⃣ New Job Matches
When it triggers:
A new job is posted
AND the user has overlapping skills

Why it’s useful:
It makes your platform feel intelligent.
Example:
🎯 New job matches your profile: React Developer (82% match)
Implementation (simple version):
When job is created:
Check users with matching skills
Create notifications
Or:
Run a daily cron job
Generate match notifications

3️⃣ Job Expiring Soon (For Saved Jobs)
When it triggers:
Job expires in 24–48 hours
User saved the job
Has not applied
Why it’s useful:
Creates urgency → increases applications.
Example:
⏰ “Full Stack Engineer” expires tomorrow
This is very powerful engagement-wise.

4️⃣ Employer Viewed Your Application (Optional but Nice)
When employer opens an application page.
Feels premium.
Example:
👀 Your application for Backend Developer was viewed
This is simple:
On page view
Create notification

🏢 Notifications for Employers

Cronjobs

1️⃣ New Application
When someone applies.
Example:
📩 New application from Sarah Ahmed for Frontend Developer
Very useful.
Keeps employer engaged.

2️⃣ Job Getting High Traffic
If job receives:
50 views
10 applications
Example:
🔥 Your “React Developer” job is trending
This is optional but impressive.

3️⃣ Job Expiring Soon
Reminder:
⏰ Your job post expires in 2 days
Encourages renewal or extension.
