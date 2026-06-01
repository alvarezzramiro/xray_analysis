# frontend/Dockerfile

# 1. Usamos una imagen ligera de Node.js (versión LTS)
FROM node:20-alpine

# 2. Creamos y definimos el directorio de trabajo dentro del contenedor
WORKDIR /app

# 3. Copiamos los archivos de configuración de paquetes primero
# Esto se hace para aprovechar la caché de capas de Docker si las dependencias no cambian
COPY package*.json ./

# 4. Instalamos las dependencias del proyecto
RUN npm install

# 5. Copiamos el resto del código fuente del frontend
COPY . .

# 6. Exponemos el puerto por defecto que usa Vite
EXPOSE 5173

# 7. Comando para arrancar el servidor de desarrollo
CMD ["npm", "run", "dev"]