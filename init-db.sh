#!/usr/bin/env sh
# factory reset db
if [ "$1" = "reset" ]
then
    echo "DROP DATABASE arithmetix_db;"| psql postgres 
fi

createdb arithmetix_db

psql arithmetix_db -v ON_ERROR_STOP=on -f ./sql/1-tables.sql 
psql arithmetix_db -f ./sql/2-user.sql 
psql arithmetix_db -v ON_ERROR_STOP=on -f ./sql/3-populate.sql