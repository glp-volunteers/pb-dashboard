#!/bin/bash
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
docker build -t pb-dashboard-mysql $DIR
docker run -d -p 3306:3306 --name pb-dashboard-mysql pb-dashboard-mysql
