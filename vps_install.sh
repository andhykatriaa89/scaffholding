#!/bin/bash
set -e

echo "=== [1/6] Updating system packages ==="
export DEBIAN_FRONTEND=noninteractive
apt update -y

echo "=== [2/6] Installing Nginx & Git & Utilities ==="
apt install -y nginx git unzip curl zip software-properties-common

echo "=== [3/6] Installing PHP & Extensions ==="
apt install -y php-cli php-fpm php-mysql php-mbstring php-xml php-bcmath php-curl php-zip php-intl php-gd php-sqlite3 || {
    # Fallback to ppa:ondrej/php if standard repos lack specific extensions
    add-apt-repository -y ppa:ondrej/php
    apt update -y
    apt install -y php8.3-cli php8.3-fpm php8.3-mysql php8.3-mbstring php8.3-xml php8.3-bcmath php8.3-curl php8.3-zip php8.3-intl php8.3-gd
}

echo "=== [4/6] Installing Composer ==="
if ! command -v composer &> /dev/null; then
    curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer
fi

echo "=== [5/6] Installing & Configuring MySQL / MariaDB ==="
apt install -y mariadb-server mariadb-client || apt install -y mysql-server
systemctl enable --now mariadb || systemctl enable --now mysql

# Setup Database & User
mysql -u root << 'EOSQL'
CREATE DATABASE IF NOT EXISTS scaffholding CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER IF NOT EXISTS 'scaff_user'@'localhost' IDENTIFIED BY 'ScaffSecurePass2026!';
GRANT ALL PRIVILEGES ON scaffholding.* TO 'scaff_user'@'localhost';
FLUSH PRIVILEGES;
EOSQL

echo "=== [6/6] Creating web directory ==="
mkdir -p /var/www/scaffholding
chown -R www-data:www-data /var/www/scaffholding

echo "=== VPS STACK INSTALLATION COMPLETED SUCCESSFULLY ==="
php -v
nginx -v
composer -V
mysql -u root -e "SHOW DATABASES;"
