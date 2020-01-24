# opsot_front
Opspot Front end

# to run in DEV env
ng serve --proxy-config proxy.conf.json

# for prod deployment
1. Front build: node --max-old-space-size=6096 ./node_modules/@angular/cli/bin/ng build --prod --output-path dist/ --deploy-url=/
2. Deployment: ./opspot_front/dist => /var/www/Opspot/front/dist/en
3. Update: index.php with new scripts and css bundles

# for stg deployment
1. Front build: node --max-old-space-size=6096 ./node_modules/@angular/cli/bin/ng build --prod --output-path dist/en --deploy-url=/en/
2. Deployment: ./opspot_front/dist/en => /home/ubuntu/opspot/front/dist/en and ./opspot_front/dist/en/assets => /home/ubuntu/opspot/front/dist/assets
3. Update: index.php with new scripts and css bundles
