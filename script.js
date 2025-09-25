// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the application
    initializeNavigation();
    initializeTabs();
    initializeChart();
    initializeSearch();
    initializeScrollEffects();

    // Track page load completion
    if (window.DD_RUM) {
        window.DD_RUM.addAction('page_loaded', {
            page: 'error_tracking_analysis',
            timestamp: new Date().toISOString()
        });
    }
});

// Navigation functionality
function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                // Track navigation clicks
                if (window.DD_RUM) {
                    window.DD_RUM.addAction('navigation_click', {
                        section: targetId,
                        link_text: this.textContent
                    });
                }

                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Tab functionality for platform taxonomy
function initializeTabs() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const platformPanels = document.querySelectorAll('.platform-panel');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const platform = this.getAttribute('data-platform');

            // Track tab switches
            if (window.DD_RUM) {
                window.DD_RUM.addAction('tab_switch', {
                    platform: platform,
                    tab_text: this.textContent
                });
            }

            // Remove active class from all buttons and panels
            tabButtons.forEach(btn => btn.classList.remove('active'));
            platformPanels.forEach(panel => panel.classList.remove('active'));

            // Add active class to clicked button and corresponding panel
            this.classList.add('active');
            document.getElementById(platform).classList.add('active');
        });
    });
}

// Initialize the cost analysis chart
function initializeChart() {
    const ctx = document.getElementById('costChart');
    if (!ctx) return;

    // Track chart initialization
    if (window.DD_RUM) {
        window.DD_RUM.addAction('chart_initialized', {
            chart_type: 'cost_analysis',
            chart_id: 'costChart'
        });
    }

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Design Phase', 'Development', 'Testing', 'Production'],
            datasets: [{
                label: 'Relative Cost (1x = Design Phase)',
                data: [1, 6, 15, 100],
                backgroundColor: [
                    'rgba(236, 221, 255, 0.8)',
                    'rgba(169, 96, 255, 0.8)',
                    'rgba(128, 0, 255, 0.8)',
                    'rgba(252, 0, 239, 0.8)'
                ],
                borderColor: [
                    'rgba(236, 221, 255, 1)',
                    'rgba(169, 96, 255, 1)',
                    'rgba(128, 0, 255, 1)',
                    'rgba(252, 0, 239, 1)'
                ],
                borderWidth: 2,
                borderRadius: 8,
                borderSkipped: false,
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: 'Cost Multiplier for Fixing Errors by Development Stage',
                    font: {
                        size: 16,
                        weight: 'bold'
                    }
                },
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Cost Multiplier'
                    },
                    grid: {
                        color: 'rgba(0,0,0,0.1)'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Development Stage'
                    },
                    grid: {
                        display: false
                    }
                }
            },
            animation: {
                duration: 2000,
                easing: 'easeInOutQuart'
            }
        }
    });
}

// Search functionality
function initializeSearch() {
    // Create search input
    const searchContainer = document.createElement('div');
    searchContainer.className = 'search-container';
    searchContainer.innerHTML = `
        <div class="search-box">
            <input type="text" id="searchInput" placeholder="Search concepts, tools, or practices...">
            <button id="searchButton">🔍</button>
        </div>
        <div id="searchResults" class="search-results"></div>
    `;
    
    // Insert search after hero section
    const hero = document.querySelector('.hero');
    hero.parentNode.insertBefore(searchContainer, hero.nextSibling);
    
    // Add search styles
    const searchStyles = `
        .search-container {
            max-width: 600px;
            margin: 2rem auto;
            padding: 0 2rem;
        }
        .search-box {
            display: flex;
            background: white;
            border-radius: 25px;
            box-shadow: 0 5px 20px rgba(0,0,0,0.1);
            overflow: hidden;
        }
        #searchInput {
            flex: 1;
            padding: 1rem 1.5rem;
            border: none;
            outline: none;
            font-size: 1rem;
        }
        #searchButton {
            padding: 1rem 1.5rem;
            background: linear-gradient(135deg, #A960FF 0%, #8000FF 100%);
            border: none;
            color: white;
            cursor: pointer;
            font-size: 1.2rem;
        }
        .search-results {
            margin-top: 1rem;
            display: none;
        }
        .search-result {
            background: white;
            padding: 1rem;
            margin: 0.5rem 0;
            border-radius: 10px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            cursor: pointer;
            transition: transform 0.2s ease;
        }
        .search-result:hover {
            transform: translateY(-2px);
        }
    `;
    
    const styleSheet = document.createElement('style');
    styleSheet.textContent = searchStyles;
    document.head.appendChild(styleSheet);
    
    // Search functionality
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    const searchResults = document.getElementById('searchResults');
    
    const searchableContent = [
        { title: 'Error Tracking Workflow', content: 'Detection, Aggregation, Triage, Debugging, Analysis', section: 'workflow' },
        { title: 'Frontend Errors', content: 'JavaScript errors, CORS issues, DOM problems', section: 'taxonomy' },
        { title: 'Backend Errors', content: 'Database issues, API failures, service unavailability', section: 'taxonomy' },
        { title: 'Mobile Errors', content: 'App crashes, ANR, permission issues', section: 'taxonomy' },
        { title: 'Sentry', content: 'Developer-first error tracking with deep code analysis', section: 'tools' },
        { title: 'Datadog', content: 'Enterprise observability platform with unified monitoring', section: 'tools' },
        { title: 'Cost Analysis', content: 'Production fixes cost 15-100x more than design phase', section: 'cost-analysis' },
        { title: 'AI-Powered RCA', content: 'Machine learning for automated root cause analysis', section: 'future' },
        { title: 'Predictive Analytics', content: 'Prevent failures before they occur', section: 'future' },
        { title: 'Structured Logging', content: 'JSON format for machine-readable logs', section: 'best-practices' },
        { title: 'Smart Alerting', content: 'Alert on impact, not volume to prevent fatigue', section: 'best-practices' },
        { title: 'Data Security', content: 'Scrub sensitive data from error reports', section: 'best-practices' }
    ];
    
    function performSearch(query) {
        if (query.length < 2) {
            searchResults.style.display = 'none';
            return;
        }

        // Track search queries
        if (window.DD_RUM) {
            window.DD_RUM.addAction('search_performed', {
                query: query,
                query_length: query.length
            });
        }

        const results = searchableContent.filter(item =>
            item.title.toLowerCase().includes(query.toLowerCase()) ||
            item.content.toLowerCase().includes(query.toLowerCase())
        );

        // Track search results
        if (window.DD_RUM) {
            window.DD_RUM.addAction('search_results', {
                query: query,
                results_count: results.length,
                found_results: results.length > 0
            });
        }

        if (results.length === 0) {
            searchResults.innerHTML = '<div class="search-result">No results found</div>';
        } else {
            searchResults.innerHTML = results.map(result =>
                `<div class="search-result" onclick="scrollToSection('${result.section}')">
                    <strong>${result.title}</strong><br>
                    <small>${result.content}</small>
                </div>`
            ).join('');
        }

        searchResults.style.display = 'block';
    }
    
    searchInput.addEventListener('input', function() {
        performSearch(this.value);
    });
    
    searchButton.addEventListener('click', function() {
        performSearch(searchInput.value);
    });
    
    // Close search results when clicking outside
    document.addEventListener('click', function(e) {
        if (!searchContainer.contains(e.target)) {
            searchResults.style.display = 'none';
        }
    });
}

// Scroll to section function
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        // Track search result clicks
        if (window.DD_RUM) {
            window.DD_RUM.addAction('search_result_click', {
                section: sectionId,
                source: 'search_results'
            });
        }

        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Scroll effects and animations
function initializeScrollEffects() {
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe all sections for animations
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
    
    // Navbar background change on scroll
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.style.background = 'linear-gradient(135deg, #A960FF 0%, #8000FF 100%)';
            navbar.style.boxShadow = '0 2px 20px rgba(160, 96, 255, 0.4)';
        } else {
            navbar.style.background = 'linear-gradient(135deg, #A960FF 0%, #8000FF 100%)';
            navbar.style.boxShadow = '0 2px 20px rgba(160, 96, 255, 0.3)';
        }
    });
}

// Add keyboard navigation
document.addEventListener('keydown', function(e) {
    // ESC to close search results
    if (e.key === 'Escape') {
        const searchResults = document.getElementById('searchResults');
        if (searchResults) {
            searchResults.style.display = 'none';
        }
    }
    
    // Ctrl/Cmd + K to focus search
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.focus();
        }
    }
});

// Add tooltip functionality
function addTooltips() {
    const toolCards = document.querySelectorAll('.tool-card, .insight-card, .trend-card');
    
    toolCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Initialize tooltips
document.addEventListener('DOMContentLoaded', addTooltips);

// Add loading animation
window.addEventListener('load', function() {
    document.body.style.opacity = '1';
    document.body.style.transition = 'opacity 0.5s ease';
});

// Error tracking and monitoring
window.addEventListener('error', function(event) {
    if (window.DD_RUM) {
        window.DD_RUM.addError(event.error, {
            error_type: 'javascript_error',
            filename: event.filename,
            lineno: event.lineno,
            colno: event.colno,
            message: event.message
        });
    }
});

// Promise rejection tracking
window.addEventListener('unhandledrejection', function(event) {
    if (window.DD_RUM) {
        window.DD_RUM.addError(event.reason, {
            error_type: 'unhandled_promise_rejection',
            promise_rejection: true
        });
    }
});

// Track performance issues
function trackPerformanceIssues() {
    if (window.DD_RUM && window.performance && window.performance.timing) {
        const timing = window.performance.timing;
        const loadTime = timing.loadEventEnd - timing.navigationStart;

        if (loadTime > 3000) { // Flag slow loads over 3 seconds
            window.DD_RUM.addAction('slow_page_load', {
                load_time: loadTime,
                performance_issue: true
            });
        }

        // Track Chart.js load time if available
        const chartContainer = document.getElementById('costChart');
        if (chartContainer) {
            const chartLoadStart = performance.now();
            const observer = new MutationObserver(function(mutations) {
                mutations.forEach(function(mutation) {
                    if (mutation.type === 'childList' && chartContainer.querySelector('canvas')) {
                        const chartLoadEnd = performance.now();
                        const chartLoadTime = chartLoadEnd - chartLoadStart;

                        if (window.DD_RUM) {
                            window.DD_RUM.addAction('chart_render_complete', {
                                render_time: chartLoadTime,
                                chart_type: 'cost_analysis'
                            });
                        }
                        observer.disconnect();
                    }
                });
            });
            observer.observe(chartContainer, { childList: true, subtree: true });
        }
    }
}

// Initialize performance tracking when page is fully loaded
window.addEventListener('load', trackPerformanceIssues);

// Add print styles
const printStyles = `
    @media print {
        .navbar, .search-container, .footer {
            display: none;
        }
        .main-content {
            max-width: none;
            padding: 0;
        }
        .hero {
            background: none;
            box-shadow: none;
        }
        .workflow-diagram {
            flex-direction: column;
        }
        .workflow-arrow {
            transform: rotate(90deg);
        }
    }
`;

const printStyleSheet = document.createElement('style');
printStyleSheet.textContent = printStyles;
document.head.appendChild(printStyleSheet);
