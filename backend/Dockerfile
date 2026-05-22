FROM python:3.11

# Evita que Python escriba archivos .pyc y fuerza el buffer de salida
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Establezco el directorio de trabajo dentro del contenedor
WORKDIR /code

RUN apt-get update && apt-get install -y \
    libgl1 \
    libglib2.0-0 \
    libsm6 \
    libxext6 \
    libxrender-dev \
    libxcb1 \
    && rm -rf /var/lib/apt/lists/*

# Copio el archivo de requerimientos primero (aprovecha la caché de Docker)
COPY requirements.txt /code/requirements.txt

RUN pip install --no-cache-dir -r /code/requirements.txt

RUN pip install --no-cache-dir \
    torch torchvision \
    --index-url https://download.pytorch.org/whl/cpu

RUN pip install --no-cache-dir ultralytics --no-deps

# Copio el resto del código del backend
COPY ./app /code/app

# Expongo el puerto en el que correrá FastAPI
EXPOSE 8000

# Comando para arrancar la app usando Uvicorn
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]