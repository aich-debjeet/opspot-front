# opsot_front
Opspot Front end

# to run in DEV env
ng serve --proxy-config proxy.conf.json

# for prod build
node --max_old_space_size=8192 node_modules/@angular/cli/bin/ng build --prod
