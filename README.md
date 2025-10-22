# Daziel's Bar — Sitio estático

Pequeño sitio estático de demostración para el proyecto personal "Daziel's Bar". Está pensado como proyecto de portafolio: HTML/CSS/JS puro con utilidades Node para optimizar/renombrar assets y tests básicos con Jest.

Contenido breve
- HTML estático: `index.html`, `servicios.html`, `contacto.html`.
- Estilos: `style.css`.
- Scripts de cliente: `script.js`.
- Utilidades Node: `scripts/optimize-images.js`, `scripts/rename-assets.js`.
- Tests: `__tests__/utils.test.js` (Jest).

Estado y objetivo
- Tests unitarios: pasan (2/2).
- ESLint y Stylelint: configurados; no se reportan errores en los archivos fuente (ignorando `coverage/`).
- El proyecto está listo para publicarse en GitHub como ejemplo de trabajo.

Cómo ejecutar (Windows / PowerShell)

1. Instalar dependencias:

```powershell
npm install
```

2. Ejecutar tests:

```powershell
npm test
```

3. Ejecutar linters:

```powershell
npm run lint:js
npm run lint:css
```

4. Ejecutar scripts auxiliares:

```powershell
# Renombrado (no modificará nada si no encuentra los archivos esperados)
node scripts/rename-assets.js

# Optimización de imágenes (requiere sharp instalado)
npm run optimize-images
```

- `scripts/optimize-images.js` detecta si `sharp` no está instalado y saldrá con un mensaje en lugar de fallar.

Changelog de correcciones realizadas
- Añadido script `test` en `package.json`.
- Robustecidos `scripts/optimize-images.js` (manejo de `sharp`, glob async, normalización de rutas).
- Mejoras semánticas y accesibilidad en HTML (`header` fuera de `main`, `nav aria-label`, `rel="noopener noreferrer"` en enlaces externos, `aria-current` donde aplica).
- Añadido `.eslintrc.json` y `.stylelintignore` para reducir falsos positivos de linters y evitar analizar `coverage/`.
- Correcciones en `style.css` para cumplir reglas de stylelint (reordenamiento y limpieza de selectores duplicados).


---

Daziel's Bar - Sitio estático

Cómo ejecutar localmente:

- Con Python (sin dependencias):
  1. Abrir terminal en esta carpeta
  2. Ejecutar: python -m http.server 8000
  3. Abrir http://localhost:8000 en el navegador

- Con live-server (si tienes Node.js):
  1. Instalar live-server global: npm i -g live-server
  2. Ejecutar: npm run start

Notas:
- Este es un sitio estático. Las imágenes están en la carpeta `assets/`.
- He estandarizado los meta tags sociales (OG + Twitter), añadido noscript, reemplazado iconos FontAwesome por SVG y añadido mejoras de accesibilidad.
- Recomendaciones: optimizar imágenes (convertir a WebP), ejecutar validación de contraste y añadir un pipeline de build con linting.
 - Para optimizar imágenes localmente (genera webp y tamaños):
   1. Instalar dependencias: npm install
   2. Ejecutar: npm run optimize-images
   3. Las imágenes optimizadas se generarán en `assets/optimized/`.

Nota: El script usa `sharp` para generar WebP y redimensionar. En Windows/Linux necesitarás un entorno compatible con las dependencias nativas de `sharp`.

Alternativa (sin npm): usar Python + Pillow
1. Asegúrate de tener Python 3 instalado.
2. Instala Pillow:
  pip install --user pillow
3. Ejecuta el script Python:
  python .\scripts\optimize-images.py
4. Verás las imágenes optimizadas en `assets/optimized/`.
