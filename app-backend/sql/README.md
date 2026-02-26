# Database Scripts

SQL scripts for initialising the PostgreSQL database.

| Script | Purpose |
|--------|---------|
| `1-tables.sql` | Creates all tables, foreign keys, and enables the `pgcrypto` extension |
| `2-user.sql` | Creates the `arithmetix_admin` database role with appropriate privileges |
| `3-populate.sql` | Seeds the database with test data (schools, students, teachers, classes, assignments) |

## Usage

From the project root:

```bash
./factory-db.sh          # Initialise the database
./factory-db.sh reset    # Drop and recreate from scratch
```

The seed data in `3-populate.sql` is intended for development and testing. Modify it freely to suit your needs.