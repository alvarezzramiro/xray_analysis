# XRay Fracture Detection Platform

An end-to-end medical imaging platform for X-ray fracture detection powered by Computer Vision and Deep Learning.

## Overview

This project allows users to upload X-ray images, run fracture detection using a YOLO-based model, visualize annotated results, and manage model versions through an administrative panel.

The system is designed with a production-oriented architecture, including authentication, authorization, model versioning, analysis history, and future support for advanced visualization features.

## Current Features

### Authentication & Authorization

* JWT-based authentication
* User registration
* User login
* Protected endpoints
* Role-based access control
* Admin-only endpoints

### X-Ray Management

* Upload X-ray images
* Store uploaded images
* User ownership validation
* Image metadata persistence

### Fracture Detection

* YOLO-based fracture detection
* Detection confidence scores
* Bounding box generation
* Annotated image generation
* Processing time tracking

### Analysis System

* Analysis history storage
* Detection statistics
* Detection count
* Maximum confidence score
* Error tracking
* Analysis status management

### Model Versioning

* Model registration
* Model activation/deactivation
* Active model management
* Metrics tracking:

  * Precision
  * Recall
  * mAP50
  * mAP50-95
* Analysis-to-model traceability

### Administration

* User management
* Role assignment
* Model management
* Admin-only endpoints

### Frontend (in progress)

Implemented:

* Login
* Registration
* Logout
* JWT persistence
* Session recovery
* Protected routes
* Admin routes
* Role-based navigation
* ...

## Architecture

1. Frontend
2. React + TypeScript
3. REST API
4. FastAPI
5. SQLAlchemy
6. PostgreSQL
7. YOLO Fracture Detection Model

## Backend Stack

* FastAPI
* SQLAlchemy
* PostgreSQL
* Alembic
* JWT Authentication
* Ultralytics YOLO

## Frontend Stack

* React
* TypeScript
* Vite
* React Router
* Axios

## Status

Currently under active development.
