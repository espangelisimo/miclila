# Encargo para Claude Code — Refinamiento de la web "Clinilab Pastor" a nivel agencia (8/10 → 9,5/10)

## Contexto del proyecto
Sitio web **estático** (HTML + CSS + JS vanilla, sin frameworks) ya construido para una **clínica dental** en San José de La Rinconada (Sevilla). Stack y arquitectura existentes:

- `index.html` y páginas internas (`implantes-dentales.html`, `ortodoncia.html`, `tratamientos.html`, `precios-financiacion.html`, `contacto.html`, etc.).
- `css/main.css` → design tokens (`:root`), reset, tipografía, layout base, botones, cards, utilidades.
- `css/components.css` → componentes (navbar, hero, trust-bar, service-cards, price-cards, testimonios, FAQ, formulario, footer…) y overrides de contraste WCAG AA.
- `js/main.js` → navbar al hacer scroll, menú móvil, scroll-reveal (IntersectionObserver), acordeón FAQ, banner de cookies, smooth scroll.
- Fuentes: **Inter** (sans) + **Playfair Display** (display). 
- Paleta (tokens): navy `--color-primary #1B3A5C`, teal `--color-secondary #2A7F7F`, dorado `--color-accent #C8973A`, fondo crema `--color-bg #F7F4EF`.
- SEO: dos bloques **JSON-LD** ya presentes (`Dentist` LocalBusiness + `FAQPage`).

**Objetivo**: elevar el sitio de ~8/10 a **9,5/10 nivel estudio profesional**, optimizado para **conversión de clínica dental** (sector de alta ansiedad y alto ticket: cada decisión de diseño debe reducir miedo y aumentar confianza).

---

## Reglas globales (OBLIGATORIAS — no romper)
1. **Vanilla**: nada de frameworks, build tools ni dependencias nuevas. Solo HTML/CSS/JS.
2. **Reutiliza los design tokens existentes** (`var(--color-*)`, `--space-*`, `--radius-*`, `--shadow-*`, `--transition-*`). **Prohibido** introducir colores hex sueltos fuera de la paleta.
3. **Accesibilidad**: mantén contraste AA (≥4.5:1 en texto), `:focus-visible`, `aria-label`/`aria-labelledby`, y `prefers-reduced-motion`. Toda imagen nueva con `alt` descriptivo + `loading="lazy"` + atributos `width`/`height` (evitar CLS).
4. **Nomenclatura**: respeta el patrón BEM-like ya usado (`.bloque__elemento--modificador`).
5. **CSS nuevo** va en `css/components.css` (o en `css/main.css` si es token o estilo base). **No crear archivos CSS nuevos.** JS nuevo en `js/main.js`.
6. **Contenido de demo (reseñas, fotos de equipo, casos antes/después) debe ir marcado** con un comentario claro:
   `<!-- PLACEHOLDER: sustituir por datos REALES del cliente (reseñas de Google / fotos del equipo con nº colegiado / casos con consentimiento) -->`
   Motivo: es una demo para vender al dueño; ese contenido se reemplazará por material real. **No inventar datos que parezcan reales sin marcarlos** (sería publicidad engañosa / política de Google).

---

## 1) BUGS a corregir (exactos)

1. **`css/components.css` → `.hero__bg`**: cambia `background-image: url('/assets/img/hero-bg.webp');` por ruta **relativa** `url('assets/img/hero-bg.webp');`. La barra inicial rompe la imagen en GitHub Pages bajo `/miclila/` (resuelve a la raíz del dominio → 404).
2. **`css/components.css` → `.price-card--featured`**: el gradiente usa `rgba(22, 236, 208, 0.692)` (turquesa chillón que rompe la paleta sobria). Sustitúyelo por un tinte sutil del dorado, p. ej.:
   `background: linear-gradient(to bottom, rgba(200,151,58,.10), var(--color-surface));`
   Además, para que destaque de verdad: añade un badge "El más elegido" en la tarjeta destacada y un `transform: scale(1.03)` en desktop.
3. **Coordenadas incoherentes**: el JSON-LD (`geo`: lat `37.4897`, lng `-6.0058`) **no coincide** con el iframe del mapa (`37.48222059866249`, `-5.944658843974127`). Unifica ambos a las coordenadas correctas de Calle Santiponce 1, 41300 La Rinconada (verifica; las del mapa parecen las correctas). Corrige en **los dos sitios**.
4. **`CIF: [PENDIENTE]` en el footer**: oculta ese fragmento (o el separador) hasta disponer del dato real. No mostrar placeholders en la demo al cliente.
5. **`css/main.css` → `.card__icon`**: `margin-bottom: var(--color-space, var(--space-4));` corrige a `margin-bottom: var(--space-4);` (token inexistente).

---

## 2) NUEVAS SECCIONES Y MEJORAS (ordenadas por impacto en conversión)

### A. Barra de acción fija en móvil (sticky bottom bar)
- Visible **solo en <768px**, fija abajo, `z-index` por debajo del banner de cookies.
- 3 acciones a ancho completo divididas en 3: **Llamar** (`tel:`), **Pedir cita** (a `contacto.html`), **WhatsApp** (`wa.me` con texto prerrellenado, ver punto G).
- Iconos SVG inline coherentes con los ya usados. Reutiliza tokens y estilos `.btn`.
- Que no tape el contenido: añade `padding-bottom` al `body` en móvil equivalente a la altura de la barra.

### B. Sección "Nuestro equipo" (insertar después de la sección "La clínica")
- Grid responsive de tarjetas: **foto + nombre + especialidad + nº de colegiado**.
- 3–4 tarjetas PLACEHOLDER (p. ej. "Dr. [Nombre]", "Implantología · Nº Col. [—]"). Marcar con el comentario PLACEHOLDER.
- Texto introductorio breve que humanice ("Detrás de cada sonrisa hay un equipo que…"). Reduce la ansiedad de "¿quién me va a tratar?".
- Reutiliza `.section`, `.section-header`, `.card` y estilo de avatar/imagen redondeada coherente con `.testimonial-card__avatar`.

### C. Reseñas reales + valoración agregada (refuerzo de prueba social)
- **Bloque de rating destacado**: cerca del hero (en la `trust-bar` o justo debajo) un módulo "**4,8 ★ · XX reseñas en Google**" con estrellas SVG (reutiliza `.testimonial-card__stars`). Marcar PLACEHOLDER.
- En la sección "Opiniones": añade un encabezado con la nota media y un botón "**Ver reseñas en Google**" (enlace al perfil de Google Business — PLACEHOLDER de URL).
- Mejora las tarjetas de testimonio: avatar con foto (PLACEHOLDER) en vez de solo iniciales, y campo de fuente ("Reseña de Google").
- **JSON-LD**: añade `aggregateRating` y `review` al schema `Dentist`, pero **comentado** y con una nota:
  `<!-- ACTIVAR SOLO con reseñas reales. Marcar ratings falsos viola la política de datos estructurados de Google y la normativa española de publicidad. -->`

### D. Galería "Casos reales (antes / después)"
- Nueva sección con 3–6 casos. Cada caso: imagen **antes** y **después** (comparador con slider de arrastre *o*, más simple y robusto, dos imágenes lado a lado con etiquetas "Antes"/"Después").
- Filtro/tabs opcional por tratamiento (Implantes / Ortodoncia / Estética).
- Imágenes PLACEHOLDER. Añade nota visible discreta: "Casos reales publicados con consentimiento del paciente."
- Es la prueba de competencia más persuasiva en dental.

### E. "Cómo trabajamos" — proceso en 4 pasos
- Insertar antes de "Precios" o antes del CTA final.
- 4 pasos numerados con icono: **1. Primera visita gratis · 2. Diagnóstico 3D · 3. Plan y presupuesto · 4. Tratamiento y seguimiento.**
- Diseño tipo timeline horizontal en desktop / vertical en móvil. Reutiliza tokens; conecta los pasos con una línea/divisor.
- Reduce la incertidumbre ("no sé qué va a pasar") → menos fricción.

### F. Mini-formulario de captación en la home
- Bloque "**Pide tu cita gratis**" con campos mínimos: **Nombre + Teléfono + Tratamiento (select) + checkbox RGPD**. Botón "Solicitar cita gratuita".
- Ubícalo en una sección propia antes del footer (además del CTA actual). **Reutiliza las clases `.form-*` ya existentes** (`.form-card`, `.form-group`, `.form-control`, `.form-check`, estados `.error/.success`) y la validación JS del formulario de contacto.
- Menos clics que ir a otra página = más leads.

### G. WhatsApp con mensaje prerrellenado
- En el botón flotante, en la barra móvil (punto A) y en cualquier CTA de WhatsApp, usa:
  `https://wa.me/34691660780?text=Hola%2C%20me%20gustar%C3%ADa%20pedir%20una%20cita%20en%20Clinilab%20Pastor.`
- Aumenta la tasa de conversaciones iniciadas.

### H. Tira de garantías/reaseguro reforzada
- Refuerza la `trust-bar` o añade una franja con los reductores de fricción clave, juntos y visibles:
  **"Primera visita gratis · Sin compromiso · Garantía en implantes · Financiación 0 % interés · +20 años de experiencia."**
- Iconos coherentes. Es "reversión de riesgo" psicológica.

### I. Pulido de rendimiento / CLS / SEO técnico
- Añade `width` + `height` + `loading="lazy"` a **todas** las imágenes (excepto la del hero, que debe ir con `loading="eager"` y un `<link rel="preload" as="image">`).
- Verifica que no haya layout shift al cargar.
- Revisa que `og:image` y `canonical` apunten a rutas que existirán en producción (advertir si dependen del dominio final).

---

## Criterios de aceptación (verifícalos al terminar)
- **Lighthouse móvil objetivo**: Performance ≥ 90, Accesibilidad ≥ 95, Best Practices ≥ 95, SEO ≥ 95.
- **Cero** colores fuera de la paleta de tokens. **Cero** enlaces rotos. **Cero** texto en inglés residual.
- **Responsive** comprobado a 360 px, 768 px y 1200 px.
- Los **dos** JSON-LD válidos (`Dentist` + `FAQPage`). `AggregateRating` solo activo si hay datos reales (si no, comentado).
- Cada bloque de demo **marcado con su comentario PLACEHOLDER**.
- El hero se ve correctamente (imagen de fondo cargando) tanto en `/miclila/` (GitHub Pages) como en dominio raíz.

---

## Entrega
Modifica los archivos in situ, manteniendo el estilo del código existente. Al final, resume en una lista: (1) bugs corregidos, (2) secciones nuevas añadidas con su ubicación, y (3) cualquier dato real que el cliente deba aportar para reemplazar placeholders (reseñas, fotos de equipo + nº colegiado, casos antes/después, CIF, URL del perfil de Google).
