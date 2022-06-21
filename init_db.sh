#!/bin/bash
# Ручная инициализация таблицы(без sequalize)
echo "[+] Выполнение инциализируешего SQL запроса.."
sudo mysql -u root < ./init.sql > /dev/null
echo "[+] Готово!"