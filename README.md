# opsot_front
Opspot Front end

# to run in DEV env
ng serve --proxy-config proxy.conf.json

# for prod deployment
1. Front build: node --max-old-space-size=6096 ./node_modules/@angular/cli/bin/ng build --prod --output-path dist/ --deploy-url=/
2. Deployment: ./opspot_front/dist => /var/www/Opspot/front/dist/en
3. Update: index.php with new scripts and css bundles

# for dev deployment
1. Change config in angular.json: src/index.html => src/index.php
1. Front build: node --max-old-space-size=6096 ./node_modules/@angular/cli/bin/ng build --prod
2. Deployment: scp -r -i ~/.ssh/pems/ege-minds001.pem /home/ege/workspace/opspot_front/dist/* ubuntu@13.234.47.103:/home/ubuntu/opspot/front/dist/
3. Index file update: On server copy index.php from /home/ubuntu/opspot/front/dist/ to /home/ubuntu/opspot/front/dist/en/