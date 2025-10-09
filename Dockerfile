# Dockerfile optimisé pour Dokploy sans nginx - Multi-stage build

# Stage 1: Build
FROM node:18-alpine AS builder

WORKDIR /app

# Copier les fichiers de dépendances
COPY package.json ./

# Installer toutes les dépendances (y compris dev pour le build)
RUN npm ci --silent

# Copier tout le code source
COPY . .

# Construire l'application pour la production
RUN npm run build

# Stage 2: Production
FROM node:18-alpine

# Installer serve globalement pour servir les fichiers statiques
RUN npm install -g serve

# Créer un utilisateur non-root pour la sécurité
RUN addgroup -g 1001 -S nodejs && \
    adduser -S appuser -u 1001

WORKDIR /app

# Copier seulement les fichiers construits depuis le stage builder
COPY --from=builder /app/dist ./dist

# Changer les permissions pour l'utilisateur non-root
RUN chown -R appuser:nodejs /app

# Utiliser l'utilisateur non-root
USER appuser

# Exposer le port 3434
EXPOSE 3434

# Commande pour servir l'application avec serve
CMD ["serve", "-s", "dist", "-l", "3434"]