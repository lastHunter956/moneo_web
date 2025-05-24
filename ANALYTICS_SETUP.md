# Configuración de Google Analytics y Google Tag Manager - Moneo

## 🎯 Resumen de Implementación

Se ha implementado un sistema completo de analytics para la aplicación Moneo con:

- **Google Analytics 4 (GA4)** para tracking de eventos y métricas
- **Google Tag Manager (GTM)** para gestión centralizada de tags
- **Eventos personalizados** optimizados para aplicaciones de finanzas personales
- **SEO optimizado** con +80 keywords estratégicas
- **Performance optimizado** con lazy loading y componentes eficientes

## 🚀 Configuración Inicial

### 1. Crear Cuentas de Google Analytics y GTM

#### Google Analytics 4:

1. Ve a [Google Analytics](https://analytics.google.com/)
2. Crea una nueva propiedad
3. Selecciona "GA4" como tipo de propiedad
4. Configura para una "App web"
5. Copia el **Measurement ID** (formato: `G-XXXXXXXXXX`)

#### Google Tag Manager:

1. Ve a [Google Tag Manager](https://tagmanager.google.com/)
2. Crea una nueva cuenta y contenedor
3. Selecciona "Web" como plataforma
4. Copia el **Container ID** (formato: `GTM-XXXXXXX`)

### 2. Configurar Variables de Entorno

Edita el archivo `.env.local` en la raíz del proyecto:

```env
# Reemplaza con tus IDs reales
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-TU_ID_AQUI
NEXT_PUBLIC_GTM_ID=GTM-TU_ID_AQUI

# Para producción cambiar a 'production'
NEXT_PUBLIC_ANALYTICS_ENV=development
```

### 3. Configurar Google Tag Manager

En tu contenedor de GTM, configura las siguientes variables y tags:

#### Variables recomendadas:

- `GA4 Measurement ID`: Variable constante con tu ID de GA4
- `Page Title`: Variable incorporada
- `Page URL`: Variable incorporada

#### Tags recomendados:

- **GA4 Configuration**: Tag principal de configuración
- **GA4 Event**: Para eventos personalizados
- **Enhanced Ecommerce**: Para tracking de conversiones

#### Triggers recomendados:

- `All Pages`: Para pageviews
- `Custom Events`: Para eventos específicos de Moneo

## 📊 Eventos Implementados

### Eventos Principales

| Evento                | Descripción                            | Datos Enviados                           |
| --------------------- | -------------------------------------- | ---------------------------------------- |
| `preregister_start`   | Usuario inicia pre-registro            | `form_type`, `page_section`              |
| `preregister_submit`  | Usuario completa pre-registro          | `email`, `form_type`, `conversion_value` |
| `feature_interaction` | Usuario interactúa con características | `feature_used`, `user_action`            |
| `button_click`        | Clicks en botones principales          | `feature_used`, `page_section`           |
| `section_view`        | Vista de secciones importantes         | `page_section`, `user_action`            |

### Eventos de Características Financieras

| Característica       | Evento             | Descripción                             |
| -------------------- | ------------------ | --------------------------------------- |
| **Budget Tracker**   | `budget_tracker`   | Interfaz adaptativa                     |
| **Expense Tracker**  | `expense_tracker`  | Balance y fondos disponibles            |
| **Account Transfer** | `account_transfer` | Transferencias entre cuentas            |
| **Statistics**       | `statistics`       | Estadísticas avanzadas y almacenamiento |

## 🎨 SEO Implementado

### Keywords Principales

- Personal finance app
- Budget tracker app
- Expense management
- Financial planning
- Money tracker
- Presupuesto personal
- Control gastos

### Meta Tags Optimizados

- Title dinámico con keywords
- Description optimizada
- Open Graph para redes sociales
- Twitter Cards
- Meta tags de idioma (en/es)

## 🔧 Archivos Modificados

### Componentes con Analytics

- `hero-section.tsx`: Tracking de botones principales
- `features-section.tsx`: Tracking de interacciones con características
- `preregister-form.tsx`: Tracking de formulario de pre-registro
- `layout.tsx`: Meta tags SEO + integración GTM/GA

### Sistema de Analytics

- `lib/analytics.ts`: Configuración y funciones core
- `hooks/use-analytics.tsx`: Hook personalizado para components
- `components/analytics/`: Componentes optimizados para GA y GTM

## 🚀 Testing y Validación

### 1. Modo Debug (Desarrollo)

```bash
# Ejecutar en modo desarrollo
npm run dev
```

### 2. Verificar en Google Analytics

1. Ve a Google Analytics > Tiempo real
2. Navega por tu sitio web
3. Verifica que aparecen los eventos en tiempo real

### 3. Debug de Google Tag Manager

1. Instala la extensión "Google Tag Assistant"
2. Activa el modo debug en GTM
3. Navega por el sitio y verifica los tags que se disparan

### 4. Eventos de Prueba

- Click en "Join Waitlist" → `button_click`
- Completar formulario → `preregister_submit`
- Click en características → `feature_interaction`
- Scroll a secciones → `section_view`

## 📈 Métricas Recomendadas a Monitorear

### Conversiones

- Tasa de pre-registro
- Tiempo en página
- Bounce rate por sección
- Clicks en features

### Engagement

- Interacciones con características
- Profundidad de scroll
- Tiempo en formulario
- Abandono de formulario

### SEO

- Posición en keywords objetivo
- CTR desde búsquedas
- Tráfico orgánico
- Core Web Vitals

## 🛠️ Personalización Adicional

### Agregar Nuevos Eventos

```typescript
// En cualquier componente
import { useAnalytics } from "@/hooks/use-analytics";

const { trackCustomEvent } = useAnalytics();

// Trackear evento personalizado
trackCustomEvent("custom_event_name", {
  custom_parameter: "value",
  user_action: "click",
});
```

### Configurar Goals en GA4

1. Ve a GA4 > Configure > Conversions
2. Crea nuevas conversiones basadas en los eventos implementados
3. Configura embudos de conversión para el flujo de pre-registro

## 🔒 Privacidad y GDPR

### Consideraciones Implementadas

- Analytics solo se cargan después del consentimiento
- Datos anonimizados por defecto
- No se almacenan datos personales en analytics
- IP anonimizada automáticamente

### Próximos Pasos Recomendados

1. Implementar banner de cookies
2. Configurar consentimiento específico por región
3. Documentar política de privacidad
4. Configurar retención de datos

## 📞 Soporte

Para dudas sobre la implementación:

1. Revisa la consola del navegador para errores
2. Verifica que las variables de entorno están configuradas
3. Usa el modo debug de GTM para troubleshooting
4. Consulta la documentación oficial de GA4 y GTM

---

**Estado**: ✅ Implementación completa
**Última actualización**: Mayo 2025
**Versión**: 1.0.0
