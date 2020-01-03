# TRCC initial wishlist
- Calendar UI (title, days per week)
- Show correct dates per month
- Show correct number of days per month
- Show three shifts per day (time, name)
- Ability to add your name to a shift (not remove)
- UI for email if you need to remove yourself from a shift

## Potential solutions to automate adding someone to a shift
- Drop down of counsellors
- Each counsellor given a set number of hours
- admin user who can remove names from shifts

## Main Stories
1. ~~Create calendar UI (dynamic title, days per week)~~
2. ~~Ability to go through months on single page~~
3. ~~Show correct shifts per day (time, name)~~
4. ~~Responsive~~
5. ~~Ability to add any counsellor to a shift via static dropdown list without DB connection (non-removable)~~
6. Add admin user who can remove counsellors without DB connection
7. Add web EBU logic (admin is only one who can add them?)
8. ~~UI for "need to remove a shift? email." flow~~
9. Improve styles (color palette, font sizes, etc)
10. Create API & DB
11. Store counsellors in DB
12. Store shifts in DB
13. Connect API counsellors to web [GET]
14. Connect API shifts to web [GET] (per month)
15. Connect filled shift logic to API [POST]
16. Connect admin removing counsellor from shift to API [POST]
17. Connect EBU logic (add/remove) to API [POST]

## Additional Stories
1. Error handling (when two counsellors happen to book the same shift at the same time)
2. Browser and device test

## Things to confirm with Laura
- How do we feel about Sunday being the first day of the week now?
- Any concerns with a counsellor being able to schedule *any* counsellor to a shift?
