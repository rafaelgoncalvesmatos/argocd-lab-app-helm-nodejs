# Use Node LTS mais atual (18 ou 20 são boas escolhas)
FROM node:20

# Definir diretório de trabalho
WORKDIR /usr/src/app

# Copiar package.json e package-lock.json
COPY package*.json ./

# Instalar dependências de produção
RUN npm ci --only=production

# Copiar código da aplicação
COPY . .

# Expor porta
EXPOSE 3000

# Rodar aplicação
CMD ["node", "index.js"]