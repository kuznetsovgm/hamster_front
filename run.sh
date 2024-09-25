#!/bin/sh

# Получить список переменных окружения, начинающихся с ENV_ или REACT_APP_
vars=$(printenv | awk -F= '/^(ENV|REACT_APP|env|react_app)_/ {print "$" $1}')

# Заменить переменные в файле конфигурации nginx
envsubst "$vars" < /etc/nginx/templates/nginx.conf > /etc/nginx/conf.d/default.conf

# Запустить nginx
exec nginx -g 'daemon off;'