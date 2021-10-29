#!/usr/bin/env sh
# Factory reset arithmetix database 
if [ "$1" = "reset" ]
then
    echo "DROP DATABASE arithmetix_db;"| psql postgres 
fi

createdb arithmetix_db

psql arithmetix_db -v ON_ERROR_STOP=on -f ./arithmetix-backend/sql/1-tables.sql 
psql arithmetix_db -f ./arithmetix-backend/sql/2-user.sql 
psql arithmetix_db -v ON_ERROR_STOP=on -f ./arithmetix-backend/sql/3-populate.sql