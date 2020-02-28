# opsot_front
Opspot Front end

# to run in DEV env
ng serve --proxy-config proxy.conf.json

# to generate release notes (between 2 tags) sand save on Desktop
# example: git log v1.2.1..v1.2.2
git log tag1..tag2 --pretty=format:'"%an","%ae","%aD","%s",' --shortstat --no-merges | paste - - - > ~/Desktop/release_notes_tag2.csv

# for weekly updates
git log --after="2020-02-16T16:00:00-00:00" --before="2020-02-23T16:00:00-00:00" --pretty=format:'"%s"' --shortstat --no-merges | paste - - - > ~/Desktop/weekly_updates.csv

# for prod deployment
1. Change config in angular.json: src/index.html => src/index.php
2. Front build: node --max-old-space-size=6096 ./node_modules/@angular/cli/bin/ng build --prod --output-path dist/ --deploy-url=/
3. Deployment: ./opspot_front/dist => /var/www/Opspot/front/dist/en

# for dev deployment
1. Change config in angular.json: src/index.html => src/index.php
2. Front build: node --max-old-space-size=6096 ./node_modules/@angular/cli/bin/ng build --prod
3. Deployment: scp -r -i ~/.ssh/pems/ege-minds001.pem /home/ege/workspace/opspot_front/dist/* ubuntu@13.234.47.103:/home/ubuntu/opspot/front/dist/
4. Index file update: On server copy index.php from /home/ubuntu/opspot/front/dist/ to /home/ubuntu/opspot/front/dist/en/