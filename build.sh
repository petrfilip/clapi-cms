#!/bin/sh

mkdir build
cp -r api/ build/
cd build/

rm -r api/public/media-storage/*
rm -r api/database/*


# build php app
EXPECTED_CHECKSUM="$(wget -q -O - https://composer.github.io/installer.sig)"
php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"
ACTUAL_CHECKSUM="$(php -r "echo hash_file('sha384', 'composer-setup.php');")"

if [ "$EXPECTED_CHECKSUM" != "$ACTUAL_CHECKSUM" ]
then
    >&2 echo 'ERROR: Invalid installer checksum'
    rm composer-setup.php
    exit 1
fi

php composer-setup.php --quiet
RESULT=$?

rm composer-setup.php
rm api/composer.lock 
rm -r api/vendor/

./composer.phar install -d api/

rm composer.phar


# build react app
cd ..
cd admin/
npm run build --no-prerender
cp .htaccess build/
cp -r build/ ../build/admin

# create zip
cd ..
cd build/
zip -r build.zip ./*
mv build.zip ../

