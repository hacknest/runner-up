#!/bin/bash
cockroach user set runnerup
cockroach sql -e 'CREATE DATABASE Runnerdb'
cockroach sql -e 'GRANT ALL ON DATABASE Runnerdb TO runnerup'