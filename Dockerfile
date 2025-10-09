# Dockerfile optimisé pour Dokploy sans nginx

FROM node:18-alpine

# Installer serve globalement pour servir les fichiers statiques
RUN npm install -g serve

# Créer un utilisateur non-root pour la sécurité
RUN addgroup -g 1001 -S nodejs && \
    adduser -S appuser -u 1001

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers de dépendances
COPY package.json ./

# Installer les dépendances
RUN npm ci --only=production --silent

# Copier tout le code source
COPY . .

# Construire l'application pour la production
RUN npm run build

# Changer les permissions pour l'utilisateur non-root
RUN chown -R appuser:nodejs /app

# Utiliser l'utilisateur non-root
USER appuser

# Exposer le port 3000 (port par défaut de serve)
EXPOSE 3434

# Commande pour servir l'application avec serve
CMD ["serve", "-s", "dist", "-l", "3434"]