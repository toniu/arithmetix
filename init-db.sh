#!/usr/bin/env sh
# Factory script to reset database
if [ "$1" = "reset" ]
then
    echo "DROP DATABASE arithmetixDB;"| psql postgres 
fi

createdb arithmetixDB

psql arithmetixDB -v ON_ERROR_STOP=on -f ./arithmetix-backend/sql/1-tables.sql 
psql arithmetixDB -f ./arithmetix-backend/sql/2-users.sql 
psql arithmetixDB -v ON_ERROR_STOP=on -f ./arithmetix-backend/sql/3-populate.sql