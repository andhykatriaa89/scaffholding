#!/bin/bash
COOKIE_FILE=/tmp/cookie.txt
rm -f $COOKIE_FILE
curl -s -c $COOKIE_FILE http://127.0.0.1:8000/sanctum/csrf-cookie
XSRF=$(awk '/XSRF-TOKEN/ {print $7}' $COOKIE_FILE)
echo "Logging in..."
curl -s -c $COOKIE_FILE -b $COOKIE_FILE -X POST http://127.0.0.1:8000/api/auth/login \
  -H "Content-Type: application/json" \
  -H "X-XSRF-TOKEN: $XSRF" \
  -H "Accept: application/json" \
  -H "Referer: http://127.0.0.1:8000" \
  -d '{"username":"admin","password":"admin123"}'
echo ""
echo "Summary:"
curl -s -b $COOKIE_FILE http://127.0.0.1:8000/api/dashboard/summary \
  -H "Accept: application/json" \
  -H "Referer: http://127.0.0.1:8000"
echo ""
