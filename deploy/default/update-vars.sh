#!/bin/sh

BASEDIR=/web/woudc-ui

. $BASEDIR/.env

#Escaped characters in state.js
for ui_file in `find $BASEDIR/dist -type f -name "state.js"`
do
    sed -i "s#https:\\\u002F\\\u002Fbeta-woudc-dev.cmc.ec.gc.ca#$WOUDC_UI_BASE_URL#g" $ui_file
    sed -i "s#https:\\\u002F\\\u002Fgeobeta-woudc-dev.cmc.ec.gc.ca\\\u002Foapi#$WOUDC_UI_API_URL#g" $ui_file
    sed -i "s#https:\\\u002F\\\u002Fbeta-woudc-dev.cmc.ec.gc.ca\\\u002Farchive#$WOUDC_UI_WAF_URL#g" $ui_file
done

#Other compiled .js files and the 200.html
for ui_file in `find $BASEDIR/dist -type f -name "*.js" -o -name "200.html"`
do
    sed -i "s#https://beta-woudc-dev.cmc.ec.gc.ca#$WOUDC_UI_BASE_URL#g" $ui_file
    sed -i "s#https://geobeta-woudc-dev.cmc.ec.gc.ca/oapi#$WOUDC_UI_API_URL#g" $ui_file
    sed -i "s#https://beta-woudc-dev.cmc.ec.gc.ca/archive#$WOUDC_UI_WAF_URL#g" $ui_file
done
