REM First set up the tables
REM azure mobile table list elite-schedule-demo

call azure mobile table create elite-schedule-demo leagues

call azure mobile table create elite-schedule-demo locations

call azure mobile table create elite-schedule-demo teams

call azure mobile table create elite-schedule-demo games


REM Now populate tables with data

node elite-schedule-ams-seed-data.js
