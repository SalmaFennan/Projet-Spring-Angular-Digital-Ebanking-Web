// src/app/interceptors/app-http.interceptor.ts
import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const appHttpInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const protectedRoutes = ['/customers', '/admin']; // Ajoutez vos routes protégées

  // Vérifie si la route est protégée
  const isProtectedRoute = protectedRoutes.some(route => req.url.includes(route));

  let token: string | null = null;
  if (typeof window !== 'undefined') {
    token = localStorage.getItem('access_token') || authService.accessToken;
  } else {
    token = authService.accessToken;
  }

  if (token && isProtectedRoute) {
    const cloned = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`)
    });
    return next(cloned);
  }

  return next(req);
};
