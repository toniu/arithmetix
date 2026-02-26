#!/usr/bin/env sh
#
# Initialise or reset the Arithmetix PostgreSQL database.
#
# Usage:
#   ./factory-db.sh          Create the database and run all SQL scripts
#   ./factory-db.sh reset    Drop the existing database first, then recreate
#

set -e

DB_NAME="arithmetix_db"
SQL_DIR="./app-backend/sql"

if [ "$1" = "reset" ]; then
    echo "Dropping database '$DB_NAME'..."
    dropdb --if-exists "$DB_NAME"
fi

echo "Creating database '$DB_NAME'..."
createdb "$DB_NAME" 2>/dev/null || echo "Database '$DB_NAME' already exists — skipping creation."

echo "Running schema migration (1-tables.sql)..."
psql "$DB_NAME" -v ON_ERROR_STOP=on -f "$SQL_DIR/1-tables.sql"

echo "Creating database user (2-user.sql)..."
psql "$DB_NAME" -f "$SQL_DIR/2-user.sql"

echo "Seeding test data (3-populate.sql)..."
psql "$DB_NAME" -v ON_ERROR_STOP=on -f "$SQL_DIR/3-populate.sql"

echo ""
echo "Done. Database '$DB_NAME' is ready."
echo "  Start the backend:  cd app-backend && npm start"