# Baseline: how the app behaves before the DevOps LUs

Record this once in LU 2.2. Every later LU improves one row.

| Question | Today | Improved in |
| --- | --- | --- |
| How long does setup take a new teammate? | 15 to 30 minutes, several manual steps | LU 2.5 to 2.11 (containers, Compose) |
| Does it run the same on every laptop? | Depends on local Node and PostgreSQL versions | LU 2.5 to 2.7 (image) |
| What happens to data if the database is recreated? | Lost, until you seed again | LU 2.8, 2.12 (volumes, backup) |
| Where do secrets live? | In a local `.env` file | LU 2.9 |
| How do we know it is up? | Open `/health` and `/ready` by hand | LU 2.13, 2.16 |
| Do users reach one address? | No, the app port 3000 is exposed directly | LU 2.14 (Nginx) |
| How do we find why it failed? | Read the terminal where `npm start` runs | LU 2.15 |
| Is every change checked before merge? | No | LU 2.17 to 2.19 (CI) |
| Can we go back to the last good version? | Only by hand, if someone remembers | LU 2.20, 2.21 (rollback, runbook) |
