# Correcciones aplicadas — Diseño profesional (Octubre 2026)

## Problemas resueltos

### 1. Accesibilidad
- Añadido enlace **“Saltar al contenido” / “Skip to content”** visible al recibir foco (todas las páginas ES y EN).
- Identificador `id="main-content"` en la sección principal de cada página.
- `aria-label` coherente en botones de menú y redes.

### 2. Enlaces de redes sociales
- Los enlaces muertos (`href="#"`) se sustituyeron por el canal de contacto real (WhatsApp).
- Se mantiene un único icono de WhatsApp en el footer para evitar confusión mientras no existan perfiles oficiales de Facebook/Instagram.

### 3. Precios (Habitaciones)
- Texto “Consultar / noche” mejorado a **“Consultar precio / noche”** + nota “Reserva por WhatsApp”.
- Versión EN: “Ask for rate / night” + “Book via WhatsApp”.

### 4. Estilos inline
- Reemplazado `style="display:flex;align-items:center;gap:12px;"` por la clase CSS `.nav-actions`.
- Eliminados estilos inline de `.social-links`.

### 5. Schema.org y textos
- Eliminada la denominación “Room Rent: Momentos” del `alternateName` y de los títulos del mapa.
- Títulos del mapa unificados a “Cómo llegar a Momentos” / “How to get to Momentos”.

### 6. Documentación
- README actualizado con la **URL correcta** (case-sensitive de GitHub Pages) y descripción del proyecto.

### 7. CSS añadido
- `.skip-link` (accesible con teclado)
- `.nav-actions`
- `.price-note`
- Estilos para desactivar visualmente enlaces vacíos

## Actualización — Opiniones + conversión (Oct 2026)

- Sección **Opiniones de huéspedes** visible en ES y EN con 4 testimonios (fotos reales del ZIP + 1 texto generado).
- Enlace a Google Maps / ficha junto a las opiniones y al mapa incrustado.
- Textos SEO más descriptivos: «casa de renta en Pinar del Río», «hospedaje con piscina», reserva por fechas → WhatsApp.
- CSS de avatares de testimonio optimizado para móvil (Android / iPhone).
- Selector de fechas + huéspedes + habitación ya arma el mensaje de WhatsApp (sin ida y vuelta extra).
- Botón de llamada: solo número Cuba (+53); internacional vía WhatsApp +1 con código de país visible.

## Pendiente (recomendaciones para el propietario)
1. Sustituir imágenes de Unsplash por **fotografías reales** de la casa y las habitaciones (mejora PageSpeed móvil).
2. Publicar precios orientativos (“desde X CUP/USD”) cuando estén definidos.
3. Crear **Google Business Profile** y vincular la URL en el sitio (sameAs + botón).
4. Registrar el sitio en **Google Search Console** y enviar `sitemap.xml`.
5. Crear y vincular perfiles reales de Instagram / Facebook.
6. Considerar dominio propio para evitar problemas de mayúsculas/minúsculas en la URL de GitHub Pages.

---
Correcciones realizadas como diseñador web profesional a partir de la auditoría de octubre 2026.

## Mensajes de WhatsApp personalizados (marketing)

Se añadieron textos amables y orientados a conversión en **todos los botones de WhatsApp**, según el contexto:

| Contexto | Enfoque del mensaje |
|----------|---------------------|
| Nav / flotante / social | Saludo general + interés en la experiencia |
| Reservar / CTA principal | Reserva de estancia + fechas |
| Habitación Standard / Deluxe / Familiar | Consulta específica de esa habitación |
| Cada servicio (Bar-Piscina, Comida, Spa…) | Interés concreto en ese servicio |
| Formulario de contacto | Mensaje estructurado con datos del usuario |

Versión en inglés con el mismo tono.  
Al hacer clic, WhatsApp se abre con el texto ya escrito listo para enviar.

## Parche rendimiento (Oct 2026) — listo para GitHub Pages

- **AOS CSS** diferido (`media="print" onload`) en todas las páginas ES/EN.
- **AOS JS**: respeta `prefers-reduced-motion` (desactiva animaciones si el usuario lo pide).
- **Dimensiones** `width`/`height` en todas las `<img>` (incluye Unsplash y avatares).
- **CSS** `aspect-ratio: 3/2` + `object-fit: cover` en imágenes de contenido → menos CLS.
- **dns-prefetch** a `unpkg.com`.
- Fuentes y Font Awesome ya diferían; AOS ahora también.

Siguiente salto a ≥90 móvil: sustituir Unsplash por WebP locales propios.
