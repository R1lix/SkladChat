# База проекта
FROM node:20.9.0

# Установка папки приложения в контейнер
WORKDIR /usr/src/app

# Копирование package.json и package-lock.json
COPY package*.json ./

# Установка зависимостей проекта
RUN npm install

# Копирование файлов в контейнер
COPY . .

# Открытие порта
EXPOSE 3000

# Запуск
CMD ["npm", "run", "start"]