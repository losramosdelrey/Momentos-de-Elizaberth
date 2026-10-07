# Momentos — Casa de Renta de Habitaciones

Sitio web oficial de **Momentos**, casa de renta con piscina, billar, comida cubana, spa y servicios completos en **Pinar del Río, Cuba**.

## URL correcta (importante)

GitHub Pages es **case-sensitive**. Usa siempre:

**https://losramosdelrey.github.io/Momentos-de-Elizaberth/**

(La variante con “e” minúscula devuelve 404.)

## Características

- Diseño responsive moderno (ES / EN)
- PWA instalable (manifest + service worker)
- SEO: canonical, Open Graph, Twitter Cards, Schema.org LodgingBusiness, sitemap, robots.txt
- Conversión orientada a WhatsApp
- Accesibilidad: skip-to-content, aria-labels, prefers-reduced-motion

## Contacto

- WhatsApp: +1 (786) 826-6446
- Móvil Cuba: +53 55090405
- Email: momentos@gmail.com
- Ubicación: Pinar del Río, Cuba (C77R+4VX)

## Créditos

Sitio creado por MSc. Reynaldo Ramos Pérez.  
Correcciones de diseño y UX — Octubre 2026.

## Estructura

```
index.html / habitaciones.html / servicios.html / contacto.html
en/          → versión en inglés
css/         → styles.css
js/          → script.js
icons/       → PWA icons
img/         → og-cover.jpg
sw.js        → service worker
manifest.json
sitemap.xml / robots.txt
```

## Pendientes manuales (no se pueden hacer desde el código)

1. **Testimonios**: sección `id="opiniones"` **activada** con 4 opiniones (3 con fotos reales del ZIP + 1 generada). Si tienes permisos escritos de huéspedes, sustituye los textos por los literales de WhatsApp/reseñas.
2. **Google Business Profile** (gratis): crea la ficha en https://business.google.com con el nombre «Momentos», categoría de alojamiento, dirección/ubicación (22.413028, -83.707778), teléfonos y fotos. Después añade la URL de la ficha a `sameAs` en el JSON-LD de `index.html` y enlázala junto al mapa.
3. **Google Search Console**: https://search.google.com/search-console → «Añadir propiedad» → *Prefijo de URL* → `https://losramosdelrey.github.io/Momentos-de-Elizaberth/` → verifica (etiqueta HTML en `<head>` de `index.html`) → en «Sitemaps» envía `sitemap.xml`.
4. **PageSpeed Insights** (móvil ≥ 90): mide en https://pagespeed.web.dev con la URL publicada. Prioridad: sustituir Unsplash por WebP locales (≤1600 px), hostear fuentes o usar `font-display: swap` (ya parcial), diferir AOS/Font Awesome si el score lo pide.
5. **Fotos reales**: sustituir las de Unsplash por fotos propias de la casa y habitaciones (WebP).
