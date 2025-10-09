# Dockerfile optimisé pour Dokploy - Basé sur le portfolio qui fonctionne

# Stage 1: Build
FROM node:22.16.0-alpine AS builder

WORKDIR /app

# Variables d'environnement pour le build (si nécessaire)
ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

# Timestamp du build
RUN echo "Build at $(date)" > /tmp/buildtime

# Copier les fichiers de dépendances avec package-lock.json
COPY package.json package-lock.json ./

# Installer les dépendances avec lockfile figé
RUN npm ci --frozen-lockfile

# Copier tout le code source
COPY . .

# Construire l'application pour la production
RUN npm run build

# Stage 2: Production
FROM node:22.16.0-alpine AS production

# Installer serve avec version spécifique
RUN npm install -g serve@14

# Créer un utilisateur non-root pour la sécurité
RUN addgroup -g 1001 -S nodejs && \
    adduser -S reactuser -u 1001

WORKDIR /app

# Copier seulement les fichiers construits depuis le stage builder
COPY --from=builder /app/dist ./dist

# Changer les permissions pour l'utilisateur non-root
RUN chown -R reactuser:nodejs /app

# Utiliser l'utilisateur non-root
USER reactuser

# Exposer le port 3434
EXPOSE 3434

# Commande pour servir l'application avec serve
CMD ["serve", "-s", "dist", "-l", "3434", "--no-clipboard"]