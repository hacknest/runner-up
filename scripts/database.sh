#!/bin/bash
cockroach start --background --store=dbfile
cockroach user set runnerup
cockroach sql -e 'DROP DATABASE IF EXISTS Runnerdb'
cockroach sql -e 'CREATE DATABASE Runnerdb'
cockroach sql -e 'GRANT ALL ON DATABASE Runnerdb TO runnerup'