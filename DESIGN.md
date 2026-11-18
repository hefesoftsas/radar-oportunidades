---
name: Radar Oportunidades
description: Sistema visual de una mesa de investigación para oportunidades en Colombia.
colors:
  light-bg: '#f6f8fb'
  light-surface: '#ffffff'
  light-surface-alt: '#f5f8fc'
  light-ink: '#101a30'
  light-muted: '#5d6d89'
  light-soft: '#52647d'
  light-border: '#dce5f1'
  light-accent: '#2563eb'
  light-accent-soft: '#eef5ff'
  light-accent-outline: '#b5d1ff'
  light-success: '#008965'
  light-success-soft: '#e6fbf3'
  light-danger: '#ae3434'
  dark-bg: '#10131a'
  dark-header: '#0b0e14'
  dark-surface: '#191d24'
  dark-surface-alt: '#11151b'
  dark-ink: '#e9edf5'
  dark-muted: '#b4c4ca'
  dark-soft: '#90a1a8'
  dark-border: '#2d353e'
  dark-accent: '#00e4ee'
  dark-accent-ink: '#00363a'
  dark-accent-soft: '#0d3137'
  dark-accent-outline: '#006c73'
  dark-success: '#50e4a6'
  dark-success-soft: '#163830'
  dark-danger: '#ffb4ab'
typography:
  light-body:
    fontFamily: "'Plus Jakarta Sans', system-ui, -apple-system, sans-serif"
    fontSize: '14px'
    lineHeight: '1.5'
  dark-body:
    fontFamily: "'Geist', system-ui, sans-serif"
    fontSize: '14px'
    lineHeight: '1.5'
  dark-heading:
    fontFamily: "'Space Grotesk', system-ui, sans-serif"
  mono:
    fontFamily: "'JetBrains Mono', ui-monospace, SFMono-Regular, monospace"
  wizard-heading:
    fontSize: 'clamp(26px, 2.7vw, 37px)'
    lineHeight: '1.15'
    letterSpacing: '-0.035em'
  report-body:
    fontSize: '14px'
    lineHeight: '1.75'
rounded:
  control: '7px'
  list-item: '8px'
  surface: '12px'
spacing:
  compact: '8px'
  base: '12px'
  section: '24px'
components:
  button-primary-light:
    backgroundColor: '{colors.light-accent}'
    textColor: '{colors.light-surface}'
    rounded: '{rounded.control}'
    padding: '11px 18px'
  button-primary-dark:
    backgroundColor: '{colors.dark-accent}'
    textColor: '{colors.dark-accent-ink}'
    rounded: '{rounded.control}'
    padding: '11px 18px'
  field-light:
    backgroundColor: '{colors.light-surface-alt}'
    textColor: '{colors.light-ink}'
    rounded: '{rounded.control}'
    padding: '12px 13px'
  surface-light:
    backgroundColor: '{colors.light-surface}'
    textColor: '{colors.light-ink}'
    rounded: '{rounded.surface}'
  surface-dark:
    backgroundColor: '{colors.dark-surface}'
    textColor: '{colors.dark-ink}'
    rounded: '{rounded.surface}'
---

# Design System: Radar Oportunidades

## Overview

**Creative North Star: "Mesa de investigación Radar"**

Una interfaz de trabajo que combina navegación persistente, configuración guiada y lectura de informes. El diseño implementa la composición suministrada desde Stitch con información procedente de la aplicación.

Los dos temas comparten estructura y estados. El claro usa superficies blancas y acento azul; el oscuro recurre a superficies grafito y acento cian. El verde señala estados y contexto favorable, sin sustituir la información que los describe.

**Key Characteristics:**
- Historial lateral en escritorio y navegación inferior en móvil.
- Progreso visible en el asistente de tres pasos.
- Jerarquía de superficies, bordes finos y sombras discretas.
- Métricas y enlaces destacados extraídos del informe disponible.

## Colors

El color se asigna mediante variables semánticas que cambian con `data-theme`.

### Primary

- **Azul de acción:** controla acciones y selección en claro (`light-accent`).
- **Cian de acción:** cumple el mismo papel en oscuro (`dark-accent`), con texto oscuro sobre los botones rellenos.

### Secondary

- **Verde de estado:** se aplica a indicadores de conexión y etiquetas en ambos temas (`light-success`, `dark-success`).

### Neutral

- **Fondos y superficies:** cada tema distingue fondo general, encabezado, superficie de contenido y superficie alternativa.
- **Tinta, texto secundario y borde:** las variables de cada tema mantienen legible el contenido y delimitan controles y paneles.

**The Theme Pair Rule.** Cada elemento nuevo debe usar los roles de color existentes para responder a ambos temas, no un color fijado para un solo modo.

## Typography

El tema claro usa Plus Jakarta Sans para cuerpo y titulares. El oscuro usa Geist para cuerpo y Space Grotesk para titulares. JetBrains Mono se reserva para estados, etiquetas breves y datos auxiliares.

- **Título del asistente:** tamaño fluido de 26 a 37 px, interlínea 1.15 y espaciado de letra de -0.035em.
- **Cuerpo:** 14 px con interlínea 1.5; el informe aumenta la interlínea a 1.75.
- **Etiquetas:** monoespaciadas y de tamaño reducido; las acciones y datos principales permanecen en la familia de texto del tema.

## Layout

En escritorio, el historial ocupa una columna de 280 px y el contenido ocupa el espacio restante; el asistente y el informe pueden añadir una columna secundaria de 285 px. A 1100 px se reducen el historial y las columnas auxiliares. A 760 px o menos, el contenido se apila, el historial se desplaza debajo del contenido y aparece la navegación inferior. A 360 px o menos, los campos de presupuesto pueden apilarse.

Los paneles usan separaciones recurrentes de 12 a 24 px. Los informes conservan el texto legible y permiten desplazar horizontalmente las tablas anchas y las tarjetas destacadas en móvil.

## Elevation & Depth

La profundidad se expresa sobre todo con contraste de superficies y bordes. Las superficies reutilizables añaden una sombra discreta: `0 2px 7px rgba(17,35,67,.05)` en claro y `0 2px 8px rgba(0,0,0,.15)` en oscuro.

## Shapes

Los paneles principales usan esquinas de 12 px; los elementos de historial y notas usan 8 px y los controles suelen usar 7 px. Los indicadores de estado son compactos y redondeados.

## Components

### Buttons

Los botones principales usan el acento del tema y texto contrastante, con altura mínima de 44 px. Los secundarios usan superficie y borde neutrales. El enfoque de teclado usa un contorno de 3 px del acento.

### Chips

Los estados se presentan con etiquetas compactas, fondo suave y borde del color semántico. El texto sigue nombrando el estado.

### Cards / Containers

Las tarjetas de categoría combinan icono, título y descripción. La categoría seleccionada usa el fondo suave y el borde del acento, además de una marca de selección. Las tarjetas de informe muestran únicamente enlaces extraídos del informe.

### Inputs / Fields

Campos y áreas de texto usan superficie alternativa, borde fino y esquinas de 7 px. Los importes usan un prefijo de moneda y se formatean como pesos colombianos. Los mensajes de error se muestran como texto junto al flujo afectado.

### Navigation

El encabezado permanece visible al desplazar. El historial muestra estado y fecha de cada investigación; en móvil se complementa con navegación inferior para buscar, historial y Facebook.

## Do's and Don'ts

### Do:
- **Do** aplicar los roles semánticos en los dos temas.
- **Do** mantener títulos, estados y acciones legibles en móvil y con teclado.
- **Do** mostrar métricas, enlaces y textos respaldados por datos disponibles.

### Don't:
- **Don't** presentar imágenes, métricas o resultados de ejemplo como hallazgos reales.
- **Don't** reemplazar el significado de un estado por color únicamente.
