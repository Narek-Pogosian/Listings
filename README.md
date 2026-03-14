## TODO

- [ ] Listings page, filters and sorting, skill tag, salary range, location.
- [ ] Match score = matchedSkills / totalRequiredSkills \* 100
- [ ] Bookmarks with optimistic updats
- [ ] Apply to job
- [ ] Add pending applications to listing-card in employer page.
- [ ] Employer view applications, update statuses
- [ ] Notifications
- [ ] Admin, delete skills, also delete from jobSkills, userSkills
- [ ] Allow employers to create skills if not available
- [ ] Employer - Listings filters (client side)

---

Bookmarking

✔ Fetch jobs server-side
✔ Include bookmark state in same request, if userId
✔ Pass initialBookmarked into client component
✔ Use useOptimistic for toggling

- Also get user skills when getting jobs
- Maybe if not sign-in the the toggle button opens dialog to sign-in or is hidden (the button).

---

Notifations

1️⃣ Application Status Updates (Most Important)
Trigger when emplyer changes application status.
Message, status has been updated and link to the application.

2️⃣ New Job Matches (Maybe) (Cronjob)
Trigger when new job is created, maybe send to all users where skills overlap

3️⃣ Job Expiring Soon (For Bookmarks) (Cronjob)
Triggers when job expires in 24-48 hours.

4️⃣ Employer Viewed Your Application (Optional but Nice)
When employer opens an application page.

🏢 Notifications for Employers, Cronjobs

- New Application
- Job Expiring Soon
