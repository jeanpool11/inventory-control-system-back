# Imagen base oficial de Node
FROM node:22.14.0

# Crear directorio de trabajo
WORKDIR /app

# Copiar archivos del proyecto
COPY package*.json ./
RUN npm install

# Copiar el resto del código fuente
COPY . .

# Exponer el puerto que usa tu servidor
EXPOSE 3000

# Comando de inicio según entorno
CMD ["npm", "start"]
