server {
    listen 80;
    server_name edustein.in www.edustein.in;
    location /.well-known/acme-challenge/ {
        root /var/www/html;
           try_files $uri =404;
    }

      location / {
        return 301 https://$host$request_uri;
    }
}

server {
   listen 443 ssl;
    server_name edustein.in www.edustein.in;

    ssl_certificate /etc/letsencrypt/live/edustein.in/fullchain.pem;
   ssl_certificate_key /etc/letsencrypt/live/edustein.in/privkey.pem;

    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_prefer_server_ciphers on;

    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
       proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}