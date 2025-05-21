#!/bin/sh

BASEDIR=/web/woudc-ui

. $BASEDIR/.env

#Escaped characters in state.js
for ui_file in `find $BASEDIR/dist -type f -name "state.js"`
do
    sed -i "s#https:\\\u002F\\\u002Fwoudc.org#$WOUDC_UI_BASE_URL#g" $ui_file
    sed -i "s#https:\\\u002F\\\u002Fapi.woudc.org\\\u002Foapi#$WOUDC_UI_API_URL#g" $ui_file
    sed -i "s#https:\\\u002F\\\u002Fwoudc.org\\\u002Farchive#$WOUDC_UI_WAF_URL#g" $ui_file
done

#Other compiled .js files and the 200.html
for ui_file in `find $BASEDIR/dist -type f -name "*.js" -o -name "200.html"`
do
    sed -i "s#https://woudc.org#$WOUDC_UI_BASE_URL#g" $ui_file
    sed -i "s#https://api.woudc.org#$WOUDC_UI_API_URL#g" $ui_file
    sed -i "s#https://woudc.org/archive#$WOUDC_UI_WAF_URL#g" $ui_file
done
