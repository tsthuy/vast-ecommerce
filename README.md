# Advanced Next.js E-commerce Platform [Design](<https://www.figma.com/design/vcC01RalNtKRSyLMSEmUBL/Full-E-Commerce-Website-UI-UX-Design-(Community)>)

## Overview

A full-featured, production-ready e-commerce platform built with cutting-edge frontend technologies, focusing on performance, SEO, and user experience.

## Key Features

- **Full E-commerce Functionality**: Comprehensive frontend implementation
- **Next.js Page Router**: Deep understanding of Next.js architecture
- **Performance Optimized**:
  - Utilizing `useCallback`, `memo`, `useMemo`
  - Skeleton loading states
  - Efficient data management
- **SEO Optimized**:
  - Leverage Next.js SEO capabilities
  - Dynamic metadata for categories and top-selling products
- **Internationalization**:
  - Full i18n support (dynamic and static translations)
  - Multi-language ready

## Tech Stack

![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)
![Stripe](https://img.shields.io/badge/Stripe-008CDD?style=for-the-badge&logo=stripe&logoColor=white)
![i18next](https://img.shields.io/badge/i18next-26A69A?style=for-the-badge&logo=i18next&logoColor=white)

### Core Technologies

- **Frontend**: Next.js (Page Router), React, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui
- **State Management**:
  - Zustand for global state
  - TanStack Query for data caching
- **Authentication**: Firebase
- **Payments**: Stripe
- **Internationalization**: i18next
- **API Mocking**: Axios Mock Adapter

## Unique Technical Implementations

- Advanced product variant system
- Dynamic multi-language support
- SEO-optimized product and category pages
- Responsive design for all device sizes
- Integrated payment processing
- Comprehensive form protection
- Image lightbox for product visualization
- Coupon code system

## Prerequisites

- Node.js (v20.7.0+)
- npm (v10.2.0+)

## Installation

1. Clone the repository

```bash
git clone https://github.com/tsthuy/vast-ecommerce.git
```

2. Navigate to project directory

```bash
cd vast-ecommerce-frontend
```

3. Install dependencies

```bash
npm install
```

## Available Scripts

| Command              | Description                     |
| -------------------- | ------------------------------- |
| `npm run dev`        | Start development server        |
| `npm run build:dev`  | Build for development           |
| `npm run build:prod` | Build for production            |
| `npm run start:dev`  | Start development build         |
| `npm run start:prod` | Start production build          |
| `npm run lint`       | Run ESLint                      |
| `npm run interface`  | Generate i18n interfaces        |
| `npm run toc`        | Generate i18n table of contents |

## Environment Configuration

The project uses `cross-env` and `yenv` for environment management:

- Supports multiple environments (development, production)
- Automatically generates `.env` files
- Secure environment variable handling

## Key Performance Optimizations

- Memoization techniques (`useCallback`, `memo`, `useMemo`)
- Efficient data fetching with TanStack Query
- Skeleton loading states
- Minimal re-renders through intelligent state management

## Internationalization

- Support for multiple languages
- Dynamic and static translation capabilities
- Easy translation resource management
- Powered by i18next
- Seamless language switching
- Comprehensive translation file management

## Payment Integration

- Stripe payment gateway
- Secure transaction processing
- Multiple payment method support

## Authentication

- Firebase Authentication
- Secure user management
- Multiple authentication methods

## Responsive Design

- Fully responsive across all device sizes
- Mobile-first approach
- Adaptive layouts
