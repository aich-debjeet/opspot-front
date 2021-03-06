#!/bin/sh

do_locale_build () {
    ng build --prod --vendor-chunk --output-path="$2/$1/" --deploy-url="$3/$1/" --build-optimizer=false --source-map=false \
        --i18nFile="./src/locale/Opspot.$1.xliff" --i18nFormat=xlf --i18nLocale="$1"
}

do_locale_build vi $1 $2
