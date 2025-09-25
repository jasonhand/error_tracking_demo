# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an interactive web application demonstrating error tracking analysis concepts. It's a static site built with vanilla HTML, CSS, and JavaScript that provides an educational resource about modern error tracking systems.

## Architecture

- **Single-page application** with no build process or frameworks
- **Static files**: HTML, CSS, JS that can be served directly
- **Chart.js integration**: For data visualization of error fixing costs
- **Responsive design**: Mobile-first approach with CSS Grid/Flexbox
- **Interactive components**: Tab switching, smooth scrolling navigation, search functionality

## Key Files

- `index.html` - Main application structure with semantic HTML5
- `styles.css` - Complete CSS styling with gradients, animations, and responsive design
- `script.js` - Interactive functionality including navigation, tabs, chart rendering, and search

## Development Commands

This is a static site with no build process. For development:

```bash
# Serve locally using Python
python -m http.server 8000

# Or using Node.js serve
npx serve .
```

Then visit `http://localhost:8000`

## JavaScript Architecture

The application uses a modular approach with initialization functions:
- `initializeNavigation()` - Smooth scrolling navigation
- `initializeTabs()` - Platform taxonomy tab switching
- `initializeChart()` - Chart.js cost analysis visualization
- `initializeSearch()` - Dynamic search functionality with DOM injection
- `initializeScrollEffects()` - Intersection Observer animations

## Styling Approach

- CSS custom properties for consistent theming
- Linear gradients for modern visual appeal
- Intersection Observer for scroll-triggered animations
- Print-friendly styles included
- Mobile-responsive with breakpoints

## External Dependencies

- **Chart.js** - Loaded via CDN for cost analysis chart
- **Google Fonts** - Inter font family
- **No package.json** - All dependencies are CDN-based

## Content Structure

The application covers error tracking concepts in sections:
1. Strategic overview and business impact
2. Error tracking workflow (5-stage process)
3. Platform-specific error taxonomy (Frontend/Backend/Mobile)
4. Tool comparisons (Sentry, Datadog, New Relic)
5. Cost analysis with interactive chart
6. Future trends and best practices

## Browser Compatibility

Targets modern browsers (Chrome/Edge 90+, Firefox 88+, Safari 14+) with ES6+ features like arrow functions, const/let, and modern DOM APIs.