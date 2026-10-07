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

## Pendiente (recomendaciones para el propietario)
1. Sustituir imágenes de Unsplash por **fotografías reales** de la casa y las habitaciones.
2. Publicar precios orientativos (“desde X CUP/USD”) cuando estén definidos.
3. Crear y vincular perfiles reales de Instagram / Facebook.
4. Considerar dominio propio para evitar problemas de mayúsculas/minúsculas en la URL.
5. Añadir testimonios de huéspedes cuando estén disponibles.

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
