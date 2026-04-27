#!/usr/bin/env fish

set -l root (dirname (status --current-filename))
set -l logs "$root/logs"

mkdir -p "$logs"

# Start database
cd "$root"
docker compose up -d > "$logs/docker.log" 2>&1

# Start servico-clientes (Node.js)
cd "$root/servico-clientes"
if test -f package.json
    npm install > "$logs/clientes-install.log" 2>&1
end

env DB_USER=admin DB_PASSWORD=admin_password DB_HOST=localhost DB_NAME=microsservicos_db DB_PORT=5432 \
    npm run start > "$logs/clientes.log" 2>&1 &

# Start servico-produtos (Spring Boot)
cd "$root/servico-produtos"
mvn spring-boot:run > "$logs/produtos.log" 2>&1 &

# Start servico-pedidos (Spring Boot)
cd "$root/servico-pedidos"
mvn spring-boot:run > "$logs/pedidos.log" 2>&1 &

echo "Servicos iniciados. Logs em $logs"
