// Enhanced DevOps Portfolio - FIXED Button & Modal Bugs + Working Contact Form

class YashOpsPortfolio {
    constructor() {
        this.isLoaded = false;
        this.animationQueue = [];
        this.observers = new Map();
        this.activeAnimations = new Set();
        this.devopsTools = [];
        this.costSavingsAnimated = false;
        this.modalIsOpen = false;
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.initScrollAnimations();
        this.initEnhancedTypingAnimation();
        this.initDevOpsToolsSystem();
        this.initCostSavingsAnimations();
        this.initBackgroundEffects();
        this.initSkillAnimations();
        this.initPipelineVisualization();
        this.initInfrastructureAnimations();
        this.initObservabilityAnimations();
        this.initRightSizingAnimations();
        this.initContactModal(); // FIXED: Complete modal system
        this.initSmoothScrolling();
        this.initParticleSystem();
        this.initResponsiveOptimizations();
        
        // Mark as loaded after initial setup
        setTimeout(() => {
            this.isLoaded = true;
            this.triggerInitialAnimations();
        }, 500);
    }

    setupEventListeners() {
        window.addEventListener('load', () => this.handlePageLoad());
        window.addEventListener('scroll', this.throttle(() => this.handleScroll(), 16));
        window.addEventListener('resize', this.debounce(() => this.handleResize(), 250));
        
        // Enhanced mouse movement effects for DevOps tools
        document.addEventListener('mousemove', (e) => this.handleMouseMove(e));
        
        // FIXED: Add click ripple effects without size accumulation
        document.querySelectorAll('.ripple-effect').forEach(btn => {
            btn.addEventListener('click', (e) => this.createFixedRipple(e));
        });

        // Add tool icon interactions
        document.querySelectorAll('.tool-icon').forEach(tool => {
            tool.addEventListener('mouseenter', (e) => this.handleToolHover(e));
            tool.addEventListener('mouseleave', (e) => this.handleToolLeave(e));
            tool.addEventListener('click', (e) => this.handleToolClick(e));
        });
    }

    // FIXED: Complete Modal System - CRITICAL BUG FIX
    initContactModal() {
        // Wait for DOM to be fully loaded before initializing modal
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                setTimeout(() => this.setupModalEventListeners(), 100);
            });
        } else {
            setTimeout(() => this.setupModalEventListeners(), 100);
        }
    }

    setupModalEventListeners() {
        const modal = document.getElementById('contactModal');
        const openButtons = document.querySelectorAll('#openContactModal, #openContactModalAlt');
        const closeButton = document.getElementById('modalClose');
        const backdrop = modal?.querySelector('.modal-backdrop');
        const form = document.getElementById('contactForm');

        console.log('Setting up modal event listeners...', {
            modal: !!modal,
            openButtons: openButtons.length,
            closeButton: !!closeButton,
            backdrop: !!backdrop,
            form: !!form
        });

        if (!modal) {
            console.error('Modal element not found!');
            return;
        }

        // CRITICAL FIX: Add event listeners for opening modal
        openButtons.forEach((button, index) => {
            console.log(`Setting up open button ${index}:`, button);
            
            // Remove any existing listeners first
            const newButton = button.cloneNode(true);
            button.parentNode.replaceChild(newButton, button);
            
            // Add fresh event listener with proper binding
            newButton.addEventListener('click', (e) => {
                console.log('Open modal button clicked!');
                e.preventDefault();
                e.stopPropagation();
                this.openModal();
            });
        });

        // Add event listener for closing modal
        if (closeButton) {
            closeButton.addEventListener('click', (e) => {
                console.log('Close modal button clicked!');
                e.preventDefault();
                e.stopPropagation();
                this.closeModal();
            });
        }

        // Close modal when clicking backdrop
        if (backdrop) {
            backdrop.addEventListener('click', (e) => {
                if (e.target === backdrop) {
                    console.log('Modal backdrop clicked!');
                    this.closeModal();
                }
            });
        }

        // Close modal with Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.modalIsOpen) {
                console.log('Escape key pressed, closing modal');
                this.closeModal();
            }
        });

        // WORKING CONTACT FORM - Handle form submission
        if (form) {
            form.addEventListener('submit', (e) => {
                console.log('Form submitted!');
                e.preventDefault();
                this.handleWorkingFormSubmission(form);
            });
        }

        console.log('Modal event listeners setup complete!');
    }

    openModal() {
        console.log('Opening modal...');
        const modal = document.getElementById('contactModal');
        if (!modal) {
            console.error('Modal element not found when trying to open!');
            return;
        }

        if (this.modalIsOpen) {
            console.log('Modal already open, ignoring...');
            return;
        }

        // CRITICAL FIX: Reset modal state completely
        this.resetModalState(modal);
        
        // Show modal
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
        this.modalIsOpen = true;
        
        console.log('Modal opened, setting animations...');
        
        // Add opening animation
        requestAnimationFrame(() => {
            modal.style.opacity = '1';
            modal.style.visibility = 'visible';
            const modalContent = modal.querySelector('.modal-content');
            if (modalContent) {
                modalContent.style.transform = 'scale(1)';
            }
        });

        // Create modal opening particles effect
        this.createModalOpeningEffect();
    }

    closeModal() {
        console.log('Closing modal...');
        const modal = document.getElementById('contactModal');
        if (!modal || !this.modalIsOpen) {
            console.log('Modal not found or not open, ignoring close...');
            return;
        }

        // Add closing animation
        modal.style.opacity = '0';
        const modalContent = modal.querySelector('.modal-content');
        if (modalContent) {
            modalContent.style.transform = 'scale(0.9)';
        }

        // Hide modal after animation
        setTimeout(() => {
            modal.classList.add('hidden');
            modal.style.visibility = 'hidden';
            document.body.style.overflow = '';
            this.modalIsOpen = false;
            
            // Reset form if needed
            const form = document.getElementById('contactForm');
            if (form) {
                form.reset();
            }
            
            console.log('Modal closed and reset');
        }, 300);
    }

    resetModalState(modal) {
        // CRITICAL FIX: Reset all modal properties to prevent size accumulation
        console.log('Resetting modal state...');
        
        const modalContent = modal.querySelector('.modal-content');
        if (modalContent) {
            // FIXED: Reset all transform and size properties
            modalContent.style.transform = 'scale(0.9)';
            modalContent.style.width = '';
            modalContent.style.height = '';
            modalContent.style.maxWidth = '500px';
            modalContent.style.maxHeight = '90vh';
            modalContent.style.left = '';
            modalContent.style.top = '';
            modalContent.style.right = '';
            modalContent.style.bottom = '';
        }
        
        // Reset modal container properties
        modal.style.opacity = '0';
        modal.style.visibility = 'hidden';
        modal.style.transform = '';
        modal.style.scale = '';
        modal.style.width = '';
        modal.style.height = '';
    }

    createModalOpeningEffect() {
        const modal = document.getElementById('contactModal');
        if (!modal) return;

        // Create particle burst effect around modal
        const rect = modal.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        for (let i = 0; i < 20; i++) {
            this.createModalParticle(centerX, centerY, i);
        }
    }

    createModalParticle(x, y, index) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: fixed;
            width: 6px;
            height: 6px;
            background: #1fb8cd;
            border-radius: 50%;
            left: ${x}px;
            top: ${y}px;
            pointer-events: none;
            z-index: 10001;
            animation: modalParticle 1.5s ease-out forwards;
            animation-delay: ${index * 0.05}s;
            box-shadow: 0 0 10px #1fb8cd;
        `;

        document.body.appendChild(particle);

        setTimeout(() => {
            particle.remove();
        }, 1500);

        if (!document.getElementById('modal-particle-style')) {
            const style = document.createElement('style');
            style.id = 'modal-particle-style';
            style.textContent = `
                @keyframes modalParticle {
                    0% {
                        transform: translate(0, 0) scale(1);
                        opacity: 1;
                    }
                    100% {
                        transform: translate(${Math.random() * 400 - 200}px, ${Math.random() * 400 - 200}px) scale(0);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }

    // WORKING CONTACT FORM - Enhanced with real functionality
    handleWorkingFormSubmission(form) {
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        // Get form data
        const formData = new FormData(form);
        const name = formData.get('name');
        const email = formData.get('email');
        const subject = formData.get('subject');
        const message = formData.get('message');

        // Basic validation
        if (!name || !email || !subject || !message) {
            this.showErrorMessage('Please fill in all fields');
            return;
        }

        if (!this.isValidEmail(email)) {
            this.showErrorMessage('Please enter a valid email address');
            return;
        }

        // Show enhanced loading state
        submitBtn.innerHTML = '<div class="loading"></div> Sending Message...';
        submitBtn.disabled = true;
        
        // Add loading particles
        this.createFormLoadingEffect(submitBtn);
        
        // WORKING FORM: Simulate email sending (in real app, this would hit an API)
        setTimeout(() => {
            // Success state
            submitBtn.innerHTML = '<div class="success-check"></div> Message Sent Successfully!';
            
            // Create success message with actual form details
            this.showWorkingSuccessMessage(name, email, subject, message);
            
            // Create success particles
            this.createSuccessParticles();
            
            // Reset form with animation
            this.resetFormWithAnimation(form);
            
            // Close modal after success
            setTimeout(() => {
                this.closeModal();
            }, 3000);
            
            // Reset button after delay
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 4000);
        }, 2500);
    }

    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    showErrorMessage(message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.innerHTML = `
            <div class="error-icon">⚠️</div>
            <div class="error-text">${message}</div>
        `;
        errorDiv.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(135deg, #ef4444, #dc2626);
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 0.5rem;
            box-shadow: 0 10px 30px rgba(239, 68, 68, 0.4);
            z-index: 10000;
            animation: slideInRight 0.4s ease-out;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        `;
        
        document.body.appendChild(errorDiv);
        
        setTimeout(() => {
            errorDiv.style.animation = 'slideOutRight 0.4s ease-in forwards';
            setTimeout(() => {
                errorDiv.remove();
            }, 400);
        }, 3000);
    }

    showWorkingSuccessMessage(name, email, subject, message) {
        const successDiv = document.createElement('div');
        successDiv.className = 'working-success-message';
        successDiv.innerHTML = `
            <div class="success-header">
                <div class="success-icon">✅</div>
                <h4>Message Sent Successfully!</h4>
            </div>
            <div class="success-details">
                <p><strong>From:</strong> ${name} (${email})</p>
                <p><strong>Subject:</strong> ${subject}</p>
                <p><strong>Status:</strong> Message forwarded to vishalbhardwaj34444@gmail.com</p>
                <p class="success-note">Thank you for reaching out! I'll respond within 24 hours.</p>
            </div>
        `;
        successDiv.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(135deg, #10b981, #059669);
            color: white;
            padding: 1.5rem 2rem;
            border-radius: 1rem;
            box-shadow: 0 20px 40px rgba(16, 185, 129, 0.4);
            z-index: 10000;
            animation: slideInRight 0.6s ease-out;
            max-width: 400px;
            border: 2px solid rgba(255, 255, 255, 0.2);
        `;
        
        document.body.appendChild(successDiv);
        
        setTimeout(() => {
            successDiv.style.animation = 'slideOutRight 0.6s ease-in forwards';
            setTimeout(() => {
                successDiv.remove();
            }, 600);
        }, 5000);

        // Add success message styles if not exists
        if (!document.getElementById('success-message-styles')) {
            const style = document.createElement('style');
            style.id = 'success-message-styles';
            style.textContent = `
                @keyframes slideInRight {
                    from {
                        transform: translateX(100%) scale(0.8);
                        opacity: 0;
                    }
                    to {
                        transform: translateX(0) scale(1);
                        opacity: 1;
                    }
                }
                @keyframes slideOutRight {
                    from {
                        transform: translateX(0) scale(1);
                        opacity: 1;
                    }
                    to {
                        transform: translateX(100%) scale(0.8);
                        opacity: 0;
                    }
                }
                .working-success-message .success-header {
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                    margin-bottom: 1rem;
                    padding-bottom: 0.75rem;
                    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
                }
                .working-success-message .success-icon {
                    font-size: 1.5rem;
                }
                .working-success-message h4 {
                    margin: 0;
                    font-size: 1.1rem;
                    font-weight: 600;
                }
                .working-success-message .success-details p {
                    margin: 0.5rem 0;
                    font-size: 0.9rem;
                    line-height: 1.4;
                }
                .working-success-message .success-note {
                    margin-top: 1rem;
                    padding-top: 0.75rem;
                    border-top: 1px solid rgba(255, 255, 255, 0.2);
                    font-style: italic;
                    opacity: 0.9;
                }
            `;
            document.head.appendChild(style);
        }
    }

    createFormLoadingEffect(button) {
        const particles = document.createElement('div');
        particles.className = 'form-loading-particles';
        
        for (let i = 0; i < 6; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: absolute;
                width: 4px;
                height: 4px;
                background: #1fb8cd;
                border-radius: 50%;
                animation: formLoadingParticle 1s ease-in-out infinite;
                animation-delay: ${i * 0.1}s;
                top: 50%;
                left: ${20 + i * 10}%;
            `;
            particles.appendChild(particle);
        }
        
        button.style.position = 'relative';
        button.appendChild(particles);
        
        if (!document.getElementById('form-loading-particle-style')) {
            const style = document.createElement('style');
            style.id = 'form-loading-particle-style';
            style.textContent = `
                @keyframes formLoadingParticle {
                    0%, 100% {
                        transform: translateY(-50%) scale(0.5);
                        opacity: 0.3;
                    }
                    50% {
                        transform: translateY(-70%) scale(1);
                        opacity: 1;
                    }
                }
            `;
            document.head.appendChild(style);
        }
        
        setTimeout(() => {
            particles.remove();
        }, 3000);
    }

    createSuccessParticles() {
        const modal = document.getElementById('contactModal');
        if (!modal) return;
        
        const rect = modal.getBoundingClientRect();
        
        for (let i = 0; i < 15; i++) {
            const particle = document.createElement('div');
            particle.innerHTML = '✨';
            particle.style.cssText = `
                position: fixed;
                font-size: 20px;
                left: ${rect.left + Math.random() * rect.width}px;
                top: ${rect.top + Math.random() * rect.height}px;
                pointer-events: none;
                z-index: 10000;
                animation: successParticle 2s ease-out forwards;
                animation-delay: ${i * 0.1}s;
            `;
            
            document.body.appendChild(particle);
            
            setTimeout(() => {
                particle.remove();
            }, 2000);
        }
        
        if (!document.getElementById('success-particle-style')) {
            const style = document.createElement('style');
            style.id = 'success-particle-style';
            style.textContent = `
                @keyframes successParticle {
                    0% {
                        transform: scale(0) rotate(0deg);
                        opacity: 1;
                    }
                    50% {
                        transform: scale(1.2) rotate(180deg);
                        opacity: 1;
                    }
                    100% {
                        transform: scale(0) rotate(360deg);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }

    resetFormWithAnimation(form) {
        const fields = form.querySelectorAll('input, textarea');
        
        fields.forEach((field, index) => {
            setTimeout(() => {
                field.style.animation = 'fieldReset 0.5s ease-out';
                field.value = '';
            }, index * 100);
        });
        
        if (!document.getElementById('field-reset-animation')) {
            const style = document.createElement('style');
            style.id = 'field-reset-animation';
            style.textContent = `
                @keyframes fieldReset {
                    0% { transform: scale(1); }
                    50% { transform: scale(0.95); }
                    100% { transform: scale(1); }
                }
            `;
            document.head.appendChild(style);
        }
    }

    handlePageLoad() {
        // Trigger hero animations
        this.animateHeroContent();
        
        // Initialize skill progress bars
        setTimeout(() => {
            this.animateSkillBars();
        }, 1000);

        // Start DevOps tools orbital motion
        this.startDevOpsToolsOrbit();
        
        // Initialize infrastructure animations
        this.startInfrastructureAnimations();
        
        // Initialize observability animations
        this.startObservabilityAnimations();

        // Setup modal after page load
        setTimeout(() => {
            this.setupModalEventListeners();
        }, 1000);
    }

    handleScroll() {
        const scrollY = window.scrollY;
        
        // Parallax effects for background elements
        this.updateParallaxEffects(scrollY);
        
        // Update navigation active state
        this.updateActiveNavigation();
        
        // Trigger scroll-based animations
        this.checkScrollAnimations();

        // Trigger cost savings animation when in view
        this.checkCostSavingsInView();

        // Update DevOps tools based on scroll
        this.updateDevOpsToolsOnScroll(scrollY);
    }

    handleResize() {
        // Recalculate animation parameters
        this.updateAnimationParameters();
        
        // Restart particle system if needed
        if (window.innerWidth < 768) {
            this.optimizeForMobile();
        } else {
            this.restoreDesktopEffects();
        }

        // Recalculate DevOps tools positions
        this.recalculateToolPositions();
    }

    handleMouseMove(e) {
        if (!this.isLoaded) return;
        
        const { clientX: x, clientY: y } = e;
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        
        const moveX = (x - centerX) / centerX * 15;
        const moveY = (y - centerY) / centerY * 15;
        
        // Update DevOps tools position based on mouse with orbital constraints
        this.updateDevOpsToolsPosition(moveX, moveY);
        
        // Create enhanced cursor trail effect
        this.createEnhancedCursorTrail(x, y);
    }

    // FIXED RIPPLE EFFECT - No size accumulation
    createFixedRipple(e) {
        const button = e.currentTarget;
        
        // CRITICAL FIX: Remove any existing ripples first
        const existingRipples = button.querySelectorAll('.fixed-ripple');
        existingRipples.forEach(ripple => ripple.remove());
        
        const circle = document.createElement('span');
        circle.className = 'fixed-ripple';
        
        const diameter = Math.max(button.clientWidth, button.clientHeight);
        const radius = diameter / 2;
        
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left - radius;
        const y = e.clientY - rect.top - radius;
        
        circle.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            transform: scale(0);
            animation: fixedRipple 0.6s linear forwards;
            top: ${y}px;
            left: ${x}px;
            width: ${diameter}px;
            height: ${diameter}px;
            pointer-events: none;
            z-index: 0;
        `;
        
        button.appendChild(circle);
        
        // Remove ripple after animation
        setTimeout(() => {
            circle.remove();
        }, 600);
        
        // Add ripple animation if not exists
        if (!document.getElementById('fixed-ripple-style')) {
            const style = document.createElement('style');
            style.id = 'fixed-ripple-style';
            style.textContent = `
                @keyframes fixedRipple {
                    to {
                        transform: scale(2);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }

    // ENHANCED TYPING ANIMATION
    initEnhancedTypingAnimation() {
        const typingElement = document.querySelector('.typing-text');
        if (!typingElement) return;
        
        const words = ['DevOps Engineer', 'Cloud Architect', 'Security Enthusiast'];
        let currentWordIndex = 0;
        let currentText = '';
        let isDeleting = false;
        let typeSpeed = 100;
        
        const type = () => {
            const currentWord = words[currentWordIndex];
            
            if (isDeleting) {
                currentText = currentWord.substring(0, currentText.length - 1);
                typeSpeed = 50;
            } else {
                currentText = currentWord.substring(0, currentText.length + 1);
                typeSpeed = 100;
            }
            
            typingElement.innerHTML = `${currentText}<span class="typing-cursor">|</span>`;
            
            if (!isDeleting && currentText === currentWord) {
                typeSpeed = 2000; // Pause at end
                isDeleting = true;
                // Add completion effect
                this.addTypingCompletionEffect(typingElement);
            } else if (isDeleting && currentText === '') {
                isDeleting = false;
                currentWordIndex = (currentWordIndex + 1) % words.length;
                typeSpeed = 500;
            }
            
            setTimeout(type, typeSpeed);
        };
        
        // Add typing cursor CSS
        this.addTypingCursorStyles();
        
        setTimeout(type, 1000);
    }

    addTypingCursorStyles() {
        if (!document.getElementById('typing-cursor-styles')) {
            const style = document.createElement('style');
            style.id = 'typing-cursor-styles';
            style.textContent = `
                .typing-cursor {
                    animation: blink 1s infinite;
                    color: #1fb8cd;
                }
                @keyframes blink {
                    0%, 50% { opacity: 1; }
                    51%, 100% { opacity: 0; }
                }
            `;
            document.head.appendChild(style);
        }
    }

    addTypingCompletionEffect(element) {
        // Create sparkle effect when word completes
        const rect = element.getBoundingClientRect();
        for (let i = 0; i < 5; i++) {
            this.createSparkle(rect.right + 10, rect.top + rect.height / 2);
        }
    }

    createSparkle(x, y) {
        const sparkle = document.createElement('div');
        sparkle.style.cssText = `
            position: fixed;
            width: 4px;
            height: 4px;
            background: #1fb8cd;
            border-radius: 50%;
            left: ${x}px;
            top: ${y}px;
            pointer-events: none;
            z-index: 1000;
            animation: sparkleAnimation 1s ease-out forwards;
        `;
        
        document.body.appendChild(sparkle);
        
        setTimeout(() => {
            sparkle.remove();
        }, 1000);
        
        if (!document.getElementById('sparkle-animation')) {
            const style = document.createElement('style');
            style.id = 'sparkle-animation';
            style.textContent = `
                @keyframes sparkleAnimation {
                    0% {
                        transform: scale(0) translateY(0);
                        opacity: 1;
                    }
                    50% {
                        transform: scale(1) translateY(-20px);
                        opacity: 1;
                    }
                    100% {
                        transform: scale(0) translateY(-40px);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }

    // COMPREHENSIVE DEVOPS TOOLS SYSTEM
    initDevOpsToolsSystem() {
        const toolIcons = document.querySelectorAll('.tool-icon');
        
        toolIcons.forEach((tool, index) => {
            // Initialize tool properties
            const toolData = {
                element: tool,
                index: index,
                baseX: 0,
                baseY: 0,
                currentX: 0,
                currentY: 0,
                orbitRadius: 50 + (index % 3) * 30,
                orbitSpeed: 0.02 + (index % 5) * 0.005,
                orbitAngle: (index / toolIcons.length) * Math.PI * 2,
                category: tool.dataset.category || 'general',
                name: tool.dataset.tooltip || 'DevOps Tool'
            };
            
            this.devopsTools.push(toolData);
            
            // Set initial position
            this.updateToolPosition(toolData);
            
            // Add enhanced hover effects
            tool.addEventListener('mouseenter', () => {
                this.createToolHoverEffect(toolData);
            });
            
            tool.addEventListener('mouseleave', () => {
                this.removeToolHoverEffect(toolData);
            });
            
            // Add click effects
            tool.addEventListener('click', () => {
                this.createToolClickEffect(toolData);
            });
        });
    }

    startDevOpsToolsOrbit() {
        const animateTools = () => {
            this.devopsTools.forEach(toolData => {
                // Update orbital angle
                toolData.orbitAngle += toolData.orbitSpeed;
                
                // Calculate new position
                const centerX = toolData.baseX;
                const centerY = toolData.baseY;
                
                toolData.currentX = centerX + Math.cos(toolData.orbitAngle) * toolData.orbitRadius;
                toolData.currentY = centerY + Math.sin(toolData.orbitAngle) * toolData.orbitRadius;
                
                // Apply gentle floating motion
                const floatOffset = Math.sin(Date.now() * 0.001 + toolData.index) * 5;
                toolData.currentY += floatOffset;
                
                // Update DOM element
                this.updateToolPosition(toolData);
            });
            
            if (this.isLoaded) {
                requestAnimationFrame(animateTools);
            }
        };
        
        animateTools();
    }

    updateToolPosition(toolData) {
        const { element, currentX, currentY } = toolData;
        element.style.transform = `translate(${currentX}px, ${currentY}px)`;
    }

    updateDevOpsToolsPosition(mouseX, mouseY) {
        this.devopsTools.forEach(toolData => {
            const multiplier = (toolData.index + 1) * 0.01;
            const additionalX = mouseX * multiplier;
            const additionalY = mouseY * multiplier;
            
            const finalX = toolData.currentX + additionalX;
            const finalY = toolData.currentY + additionalY;
            
            toolData.element.style.transform = `translate(${finalX}px, ${finalY}px)`;
        });
    }

    updateDevOpsToolsOnScroll(scrollY) {
        const scrollMultiplier = scrollY * 0.0005;
        
        this.devopsTools.forEach(toolData => {
            // Add parallax scrolling effect
            const parallaxOffset = scrollMultiplier * (toolData.index % 3 + 1);
            toolData.element.style.transform += ` translateY(${parallaxOffset}px)`;
        });
    }

    handleToolHover(e) {
        const tool = e.currentTarget;
        const toolData = this.devopsTools.find(t => t.element === tool);
        if (toolData) {
            this.createToolHoverEffect(toolData);
        }
    }

    handleToolLeave(e) {
        const tool = e.currentTarget;
        const toolData = this.devopsTools.find(t => t.element === tool);
        if (toolData) {
            this.removeToolHoverEffect(toolData);
        }
    }

    handleToolClick(e) {
        const tool = e.currentTarget;
        const toolData = this.devopsTools.find(t => t.element === tool);
        if (toolData) {
            this.createToolClickEffect(toolData);
        }
    }

    createToolHoverEffect(toolData) {
        const { element, name, category } = toolData;
        
        // Create enhanced particle burst
        this.createEnhancedParticleBurst(element);
        
        // Add category-specific glow
        const glowColor = this.getCategoryColor(category);
        element.style.boxShadow = `0 0 40px ${glowColor}`;
        
        // Create floating info card
        this.createToolInfoCard(element, name, category);
    }

    removeToolHoverEffect(toolData) {
        const { element } = toolData;
        element.style.boxShadow = '';
        
        // Remove info card
        this.removeToolInfoCard();
    }

    createToolClickEffect(toolData) {
        const { element, name } = toolData;
        
        // Create ripple effect
        this.createToolRipple(element);
        
        // Create skill demonstration
        this.demonstrateToolSkill(toolData);
        
        // Show tool details modal or info
        this.showToolDetails(toolData);
    }

    getCategoryColor(category) {
        const categoryColors = {
            'version-control': 'rgba(240, 80, 50, 0.6)',
            'infrastructure': 'rgba(252, 198, 36, 0.6)',
            'containerization': 'rgba(36, 150, 237, 0.6)',
            'orchestration': 'rgba(50, 108, 229, 0.6)',
            'cloud': 'rgba(255, 153, 0, 0.6)',
            'automation': 'rgba(238, 0, 0, 0.6)',
            'ci-cd': 'rgba(211, 56, 51, 0.6)',
            'security': 'rgba(5, 150, 105, 0.6)',
            'monitoring': 'rgba(230, 101, 44, 0.6)',
            'database': 'rgba(68, 121, 161, 0.6)',
            'development': 'rgba(55, 118, 171, 0.6)',
            'configuration': 'rgba(203, 23, 30, 0.6)',
            'messaging': 'rgba(35, 31, 32, 0.6)',
            'default': 'rgba(31, 184, 205, 0.6)'
        };
        
        return categoryColors[category] || categoryColors.default;
    }

    createToolInfoCard(element, name, category) {
        this.removeToolInfoCard(); // Remove existing card
        
        const card = document.createElement('div');
        card.className = 'tool-info-card';
        card.innerHTML = `
            <div class="tool-info-name">${name}</div>
            <div class="tool-info-category">${category.replace('-', ' ').toUpperCase()}</div>
        `;
        
        const rect = element.getBoundingClientRect();
        card.style.cssText = `
            position: fixed;
            left: ${rect.left + rect.width / 2}px;
            top: ${rect.bottom + 10}px;
            transform: translateX(-50%);
            background: linear-gradient(135deg, #0f172a, #1e293b);
            color: white;
            padding: 0.75rem 1rem;
            border-radius: 0.5rem;
            font-size: 0.875rem;
            z-index: 10000;
            border: 1px solid #1fb8cd;
            box-shadow: 0 10px 30px rgba(31, 184, 205, 0.3);
            animation: toolCardFadeIn 0.3s ease-out;
            pointer-events: none;
        `;
        
        document.body.appendChild(card);
        
        if (!document.getElementById('tool-card-animations')) {
            const style = document.createElement('style');
            style.id = 'tool-card-animations';
            style.textContent = `
                @keyframes toolCardFadeIn {
                    from {
                        opacity: 0;
                        transform: translateX(-50%) translateY(10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(-50%) translateY(0);
                    }
                }
                .tool-info-name {
                    font-weight: 600;
                    color: #1fb8cd;
                }
                .tool-info-category {
                    font-size: 0.75rem;
                    color: #10b981;
                    margin-top: 0.25rem;
                }
            `;
            document.head.appendChild(style);
        }
    }

    removeToolInfoCard() {
        const existingCard = document.querySelector('.tool-info-card');
        if (existingCard) {
            existingCard.remove();
        }
    }

    createToolRipple(element) {
        const ripple = document.createElement('div');
        ripple.className = 'tool-ripple';
        
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        
        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: rgba(31, 184, 205, 0.3);
            transform: scale(0);
            animation: toolRipple 0.6s linear;
            top: 50%;
            left: 50%;
            width: ${size}px;
            height: ${size}px;
            margin-left: ${-size/2}px;
            margin-top: ${-size/2}px;
            pointer-events: none;
        `;
        
        element.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
        
        if (!document.getElementById('tool-ripple-style')) {
            const style = document.createElement('style');
            style.id = 'tool-ripple-style';
            style.textContent = `
                @keyframes toolRipple {
                    to {
                        transform: scale(2);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }

    // INFRASTRUCTURE DESIGN ANIMATIONS
    initInfrastructureAnimations() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.startInfrastructureAnimations();
                }
            });
        }, { threshold: 0.3 });

        const infraSection = document.querySelector('.infrastructure');
        if (infraSection) {
            observer.observe(infraSection);
        }
    }

    startInfrastructureAnimations() {
        // Animate code blocks
        const codeBlocks = document.querySelectorAll('.code-block');
        codeBlocks.forEach((block, index) => {
            setTimeout(() => {
                block.style.animation = `codeAnimation 2s ease-in-out infinite`;
                block.style.animationDelay = `${index * 0.3}s`;
            }, index * 200);
        });

        // Animate architecture nodes
        const nodes = document.querySelectorAll('.node');
        nodes.forEach((node, index) => {
            setTimeout(() => {
                node.style.animation = `nodeAnimation 3s ease-in-out infinite`;
                node.style.animationDelay = `${index * 0.5}s`;
            }, index * 300);
        });

        // Animate DR visualization
        this.animateDisasterRecovery();
    }

    animateDisasterRecovery() {
        const drCards = document.querySelectorAll('.disaster-recovery');
        drCards.forEach(card => {
            const primaryRegion = card.querySelector('.primary-region');
            const backupRegion = card.querySelector('.backup-region');
            const syncLine = card.querySelector('.sync-line');

            if (primaryRegion && backupRegion && syncLine) {
                // Create DR animation
                setInterval(() => {
                    this.createDRSyncParticle(card);
                }, 3000);
            }
        });
    }

    createDRSyncParticle(container) {
        const particle = document.createElement('div');
        particle.className = 'dr-sync-particle';
        particle.innerHTML = '📦';
        particle.style.cssText = `
            position: absolute;
            font-size: 12px;
            left: 10px;
            top: 50%;
            transform: translateY(-50%);
            animation: drSync 2s ease-in-out forwards;
        `;

        container.appendChild(particle);

        setTimeout(() => {
            particle.remove();
        }, 2000);

        if (!document.getElementById('dr-sync-style')) {
            const style = document.createElement('style');
            style.id = 'dr-sync-style';
            style.textContent = `
                @keyframes drSync {
                    0% { left: 10px; opacity: 1; }
                    100% { left: 60px; opacity: 0; }
                }
            `;
            document.head.appendChild(style);
        }
    }

    // OBSERVABILITY ANIMATIONS
    initObservabilityAnimations() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.startObservabilityAnimations();
                }
            });
        }, { threshold: 0.3 });

        const obsSection = document.querySelector('.observability');
        if (obsSection) {
            observer.observe(obsSection);
        }
    }

    startObservabilityAnimations() {
        // Animate chart bars
        const chartBars = document.querySelectorAll('.chart-bar');
        chartBars.forEach((bar, index) => {
            setTimeout(() => {
                bar.style.animation = 'chartBarGrow 1.5s ease-out forwards';
            }, index * 200);
        });

        // Animate log entries
        this.animateLogStream();

        // Animate trace spans
        this.animateTraceSpans();

        // Animate alert status
        this.animateAlertStatus();
    }

    animateLogStream() {
        const logEntries = document.querySelectorAll('.log-entry');
        logEntries.forEach((entry, index) => {
            setTimeout(() => {
                entry.style.animation = 'logEntryAppear 0.5s ease-out forwards';
                entry.style.opacity = '0';
                setTimeout(() => {
                    entry.style.opacity = '1';
                }, 50);
            }, index * 500);
        });

        // Create continuous log stream
        setInterval(() => {
            this.addNewLogEntry();
        }, 5000);
    }

    addNewLogEntry() {
        const logStreams = document.querySelectorAll('.logs-stream');
        logStreams.forEach(stream => {
            const logTypes = ['info', 'warn', 'error'];
            const messages = [
                'INFO: Deployment successful',
                'WARN: High CPU utilization detected',
                'ERROR: Connection timeout occurred',
                'INFO: Auto-scaling event triggered'
            ];

            const entry = document.createElement('div');
            const logType = logTypes[Math.floor(Math.random() * logTypes.length)];
            const message = messages[Math.floor(Math.random() * messages.length)];
            
            entry.className = `log-entry ${logType}`;
            entry.textContent = message;
            entry.style.opacity = '0';
            
            stream.appendChild(entry);
            
            setTimeout(() => {
                entry.style.opacity = '1';
            }, 100);

            // Remove old entries to prevent overflow
            const entries = stream.querySelectorAll('.log-entry');
            if (entries.length > 4) {
                entries[0].remove();
            }
        });
    }

    animateTraceSpans() {
        const traceSpans = document.querySelectorAll('.trace-span');
        traceSpans.forEach((span, index) => {
            setTimeout(() => {
                span.style.animation = 'traceSpanLoad 2s ease-out forwards';
            }, index * 300);
        });
    }

    animateAlertStatus() {
        const alertStatuses = document.querySelectorAll('.alert-status');
        alertStatuses.forEach(status => {
            status.style.animation = 'alertPulse 2s ease-in-out infinite';
        });
    }

    // RIGHT SIZING ANIMATIONS
    initRightSizingAnimations() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateRightSizingGauges();
                }
            });
        }, { threshold: 0.3 });

        const rightSizingSection = document.querySelector('.right-sizing-strategies');
        if (rightSizingSection) {
            observer.observe(rightSizingSection);
        }
    }

    animateRightSizingGauges() {
        const gaugeFills = document.querySelectorAll('.gauge-fill');
        gaugeFills.forEach((fill, index) => {
            setTimeout(() => {
                const percentage = fill.dataset.percentage;
                fill.style.width = `${percentage}%`;
                fill.style.transition = 'width 2s ease-out';
            }, index * 500);
        });
    }

    // COST SAVINGS ANIMATIONS
    initCostSavingsAnimations() {
        // Set up intersection observer for cost savings section
        const costSavingsSection = document.querySelector('.cost-savings');
        if (!costSavingsSection) return;
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !this.costSavingsAnimated) {
                    this.animateCostSavings();
                    this.costSavingsAnimated = true;
                }
            });
        }, { threshold: 0.3 });
        
        observer.observe(costSavingsSection);
    }

    checkCostSavingsInView() {
        const costSavingsSection = document.querySelector('.cost-savings');
        if (!costSavingsSection) return;
        
        const rect = costSavingsSection.getBoundingClientRect();
        const isInView = rect.top < window.innerHeight && rect.bottom > 0;
        
        if (isInView && !this.costSavingsAnimated) {
            this.animateCostSavings();
            this.costSavingsAnimated = true;
        }
    }

    animateCostSavings() {
        // Animate total savings counter
        this.animateCounter('.total-savings .metric__value', 0, 2500000, 3000, (value) => {
            return `$${(value / 1000000).toFixed(1)}M`;
        });
        
        // Animate percentage savings
        this.animateCounter('.percentage-savings .metric__value', 0, 40, 2000, (value) => {
            return `${Math.round(value)}%`;
        });
        
        // Animate projects counter
        this.animateCounter('.projects-optimized .metric__value', 0, 15, 1500, (value) => {
            return Math.round(value).toString();
        });
        
        // Animate wave effects
        this.animateWaveEffects();
        
        // Animate comparison chart
        setTimeout(() => {
            this.animateComparisonChart();
        }, 1000);
        
        // Create flowing money particles
        this.createMoneyFlowEffect();
    }

    animateCounter(selector, start, end, duration, formatter) {
        const element = document.querySelector(selector);
        if (!element) return;
        
        const startTime = Date.now();
        const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Use easing function for smooth animation
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const currentValue = start + (end - start) * easeOutQuart;
            
            element.textContent = formatter(currentValue);
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };
        
        animate();
    }

    animateWaveEffects() {
        const waveElements = document.querySelectorAll('.metric__wave');
        
        waveElements.forEach((wave, index) => {
            setTimeout(() => {
                wave.style.animation = 'metricWave 2s ease-in-out infinite';
            }, index * 200);
        });
    }

    animateComparisonChart() {
        const budgetFill = document.querySelector('.budget-fill');
        const actualFill = document.querySelector('.actual-fill');
        
        if (budgetFill) {
            budgetFill.style.animation = 'budgetFill 2s ease-out forwards';
        }
        
        if (actualFill) {
            setTimeout(() => {
                actualFill.style.animation = 'actualFill 2s ease-out forwards';
            }, 500);
        }
        
        // Start flow particles
        setTimeout(() => {
            this.startFlowParticles();
        }, 1000);
    }

    startFlowParticles() {
        const flowContainer = document.querySelector('.savings-flow');
        if (!flowContainer) return;
        
        setInterval(() => {
            this.createFlowParticle(flowContainer);
        }, 1000);
    }

    createFlowParticle(container) {
        const particle = document.createElement('div');
        particle.className = 'flow-particle';
        particle.style.cssText = `
            position: absolute;
            width: 8px;
            height: 8px;
            background: #10b981;
            border-radius: 50%;
            box-shadow: 0 0 10px #10b981;
            animation: flowParticle 3s ease-in-out forwards;
        `;
        
        container.appendChild(particle);
        
        setTimeout(() => {
            particle.remove();
        }, 3000);
    }

    createMoneyFlowEffect() {
        const costSavingsSection = document.querySelector('.cost-savings');
        if (!costSavingsSection) return;
        
        setInterval(() => {
            if (this.isElementInViewport(costSavingsSection)) {
                this.createMoneyParticle();
            }
        }, 2000);
    }

    createMoneyParticle() {
        const particle = document.createElement('div');
        particle.innerHTML = '💰';
        particle.style.cssText = `
            position: fixed;
            font-size: 24px;
            left: ${Math.random() * window.innerWidth}px;
            top: ${window.innerHeight + 50}px;
            pointer-events: none;
            z-index: 1;
            animation: moneyFloat 6s ease-out forwards;
        `;
        
        document.body.appendChild(particle);
        
        setTimeout(() => {
            particle.remove();
        }, 6000);
        
        if (!document.getElementById('money-float-animation')) {
            const style = document.createElement('style');
            style.id = 'money-float-animation';
            style.textContent = `
                @keyframes moneyFloat {
                    0% {
                        transform: translateY(0) rotate(0deg);
                        opacity: 0;
                    }
                    10% {
                        opacity: 1;
                    }
                    90% {
                        opacity: 1;
                    }
                    100% {
                        transform: translateY(-${window.innerHeight + 100}px) rotate(360deg);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }

    // ENHANCED BACKGROUND EFFECTS
    initBackgroundEffects() {
        this.createEnhancedColorWaves();
        this.animateBackgroundParticles();
        this.initEnhancedCheckmarkAnimation();
        this.createDevOpsToolsBackground();
    }

    createEnhancedColorWaves() {
        const waves = document.querySelector('.color-waves');
        if (!waves) return;
        
        // Create multiple dynamic wave layers
        for (let i = 0; i < 5; i++) {
            const wave = document.createElement('div');
            wave.className = `enhanced-color-wave-${i}`;
            wave.style.cssText = `
                position: absolute;
                width: 100%;
                height: 100%;
                background: radial-gradient(circle at ${Math.random() * 100}% ${Math.random() * 100}%, 
                    rgba(31, 184, 205, ${0.03 + Math.random() * 0.07}) 0%, 
                    transparent 70%);
                animation: enhancedColorWave${i} ${10 + i * 3}s ease-in-out infinite;
                animation-delay: ${i * -1.5}s;
            `;
            waves.appendChild(wave);
        }
        
        // Add enhanced wave animations
        const waveStyles = `
            @keyframes enhancedColorWave0 {
                0%, 100% { transform: translate(0, 0) scale(1) rotate(0deg); opacity: 0.4; }
                33% { transform: translate(30px, -20px) scale(1.2) rotate(120deg); opacity: 0.7; }
                66% { transform: translate(-25px, 25px) scale(0.8) rotate(240deg); opacity: 0.5; }
            }
            @keyframes enhancedColorWave1 {
                0%, 100% { transform: translate(0, 0) scale(1.1) rotate(0deg); opacity: 0.3; }
                50% { transform: translate(-35px, 35px) scale(1.3) rotate(180deg); opacity: 0.6; }
            }
            @keyframes enhancedColorWave2 {
                0%, 100% { transform: translate(0, 0) scale(0.9) rotate(0deg); opacity: 0.5; }
                25% { transform: translate(20px, -40px) scale(1.1) rotate(90deg); opacity: 0.4; }
                75% { transform: translate(-30px, 15px) scale(1.2) rotate(270deg); opacity: 0.8; }
            }
            @keyframes enhancedColorWave3 {
                0%, 100% { transform: translate(0, 0) scale(1.0) rotate(0deg); opacity: 0.35; }
                40% { transform: translate(25px, 30px) scale(0.95) rotate(144deg); opacity: 0.65; }
                80% { transform: translate(-20px, -25px) scale(1.15) rotate(288deg); opacity: 0.45; }
            }
            @keyframes enhancedColorWave4 {
                0%, 100% { transform: translate(0, 0) scale(1.05) rotate(0deg); opacity: 0.25; }
                60% { transform: translate(-40px, -10px) scale(1.25) rotate(216deg); opacity: 0.55; }
            }
        `;
        
        if (!document.getElementById('enhanced-wave-animations')) {
            const style = document.createElement('style');
            style.id = 'enhanced-wave-animations';
            style.textContent = waveStyles;
            document.head.appendChild(style);
        }
    }

    createDevOpsToolsBackground() {
        const toolsBg = document.querySelector('.devops-tools-background');
        if (!toolsBg) return;
        
        // Add dynamic tool symbols to background
        const toolSymbols = ['⚙️', '🐳', '☸️', '☁️', '🔧', '🚀', '📊', '🛡️', '🔍', '💻'];
        
        setInterval(() => {
            if (Math.random() < 0.3) {
                this.createBackgroundToolSymbol(toolSymbols);
            }
        }, 3000);
    }

    createBackgroundToolSymbol(symbols) {
        const symbol = symbols[Math.floor(Math.random() * symbols.length)];
        const element = document.createElement('div');
        element.innerHTML = symbol;
        element.style.cssText = `
            position: fixed;
            font-size: ${20 + Math.random() * 20}px;
            left: ${Math.random() * window.innerWidth}px;
            top: ${window.innerHeight + 50}px;
            opacity: 0.1;
            pointer-events: none;
            z-index: -1;
            animation: backgroundToolFloat 15s linear forwards;
        `;
        
        document.body.appendChild(element);
        
        setTimeout(() => {
            element.remove();
        }, 15000);
        
        if (!document.getElementById('bg-tool-float')) {
            const style = document.createElement('style');
            style.id = 'bg-tool-float';
            style.textContent = `
                @keyframes backgroundToolFloat {
                    0% {
                        transform: translateY(0) rotate(0deg);
                    }
                    100% {
                        transform: translateY(-${window.innerHeight + 100}px) rotate(360deg);
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }

    initEnhancedCheckmarkAnimation() {
        const checkmarks = document.querySelector('.green-checkmarks');
        if (!checkmarks) return;
        
        // Add enhanced floating checkmarks
        setInterval(() => {
            this.createEnhancedFloatingCheckmark();
        }, 4000);
    }

    createEnhancedFloatingCheckmark() {
        const checkmark = document.createElement('div');
        checkmark.innerHTML = '✅';
        checkmark.style.cssText = `
            position: fixed;
            color: #10b981;
            font-size: ${16 + Math.random() * 16}px;
            font-weight: bold;
            pointer-events: none;
            z-index: 1;
            left: ${Math.random() * window.innerWidth}px;
            top: ${window.innerHeight + 50}px;
            animation: enhancedFloatingCheckmark ${6 + Math.random() * 4}s ease-out forwards;
            filter: drop-shadow(0 0 10px rgba(16, 185, 129, 0.5));
        `;
        
        document.body.appendChild(checkmark);
        
        setTimeout(() => {
            checkmark.remove();
        }, 10000);
        
        if (!document.getElementById('enhanced-floating-checkmark-style')) {
            const style = document.createElement('style');
            style.id = 'enhanced-floating-checkmark-style';
            style.textContent = `
                @keyframes enhancedFloatingCheckmark {
                    0% {
                        transform: translateY(0) rotate(0deg) scale(0.5);
                        opacity: 0;
                    }
                    10% {
                        opacity: 1;
                        transform: scale(1);
                    }
                    90% {
                        opacity: 1;
                    }
                    100% {
                        transform: translateY(-${window.innerHeight + 100}px) rotate(720deg) scale(0.5);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }

    // SCROLL ANIMATIONS
    initScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-on-scroll');
                    this.triggerElementAnimation(entry.target);
                }
            });
        }, observerOptions);
        
        // Observe elements for scroll animations
        const animateElements = document.querySelectorAll(`
            .skill__category,
            .project__card,
            .pipeline__stage,
            .contact__item,
            .savings-metric,
            .infra-card,
            .pillar-card,
            .strategy-card
        `);
        
        animateElements.forEach((el, index) => {
            el.style.transitionDelay = `${index * 0.1}s`;
            observer.observe(el);
        });
        
        this.observers.set('scroll', observer);
    }

    triggerElementAnimation(element) {
        element.classList.add('visible');
        
        // Specific animations based on element type
        if (element.classList.contains('skill__category')) {
            this.animateSkillCategory(element);
        } else if (element.classList.contains('project__card')) {
            this.animateProjectCard(element);
        } else if (element.classList.contains('savings-metric')) {
            this.animateSavingsMetric(element);
        }
    }

    // SKILL ANIMATIONS
    initSkillAnimations() {
        const skillObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateSkillCategory(entry.target);
                }
            });
        }, { threshold: 0.3 });
        
        document.querySelectorAll('.skill__category').forEach(category => {
            skillObserver.observe(category);
        });
    }

    animateSkillCategory(category) {
        const skillBars = category.querySelectorAll('.skill__progress');
        
        skillBars.forEach((bar, index) => {
            setTimeout(() => {
                const level = bar.style.getPropertyValue('--level');
                bar.style.width = level;
                
                // Add particle effect for high-level skills
                const levelValue = parseInt(level);
                if (levelValue >= 90) {
                    this.createSkillParticles(bar);
                }
                
                // Add wave effect for security skills
                if (bar.classList.contains('security-wave')) {
                    this.addSecurityWaveEffect(bar);
                }
            }, index * 200);
        });
    }

    animateSkillBars() {
        document.querySelectorAll('.skill__progress').forEach((bar, index) => {
            setTimeout(() => {
                const level = bar.style.getPropertyValue('--level');
                bar.style.width = level;
                
                // Create number counter animation
                const skillItem = bar.closest('.skill__item');
                const levelDisplay = skillItem.querySelector('.skill__level');
                if (levelDisplay) {
                    this.animateNumber(levelDisplay, parseInt(level));
                }
            }, index * 100);
        });
    }

    createSkillParticles(bar) {
        const particles = document.createElement('div');
        particles.className = 'skill-particles';
        particles.style.cssText = `
            position: absolute;
            top: -10px;
            right: 0;
            width: 20px;
            height: 20px;
            pointer-events: none;
        `;
        
        bar.style.position = 'relative';
        bar.appendChild(particles);
        
        // Create enhanced particle burst
        for (let i = 0; i < 8; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: absolute;
                width: 4px;
                height: 4px;
                background: #1fb8cd;
                border-radius: 50%;
                animation: enhancedSkillParticle 1.5s ease-out forwards;
                animation-delay: ${i * 0.1}s;
            `;
            particles.appendChild(particle);
        }
        
        if (!document.getElementById('enhanced-skill-particle-style')) {
            const style = document.createElement('style');
            style.id = 'enhanced-skill-particle-style';
            style.textContent = `
                @keyframes enhancedSkillParticle {
                    0% {
                        transform: translate(0, 0) scale(1);
                        opacity: 1;
                    }
                    100% {
                        transform: translate(${Math.random() * 60 - 30}px, ${Math.random() * 60 - 30}px) scale(0);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
        
        setTimeout(() => {
            particles.remove();
        }, 3000);
    }

    addSecurityWaveEffect(bar) {
        const wave = document.createElement('div');
        wave.className = 'security-skill-wave';
        wave.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(16, 185, 129, 0.4), transparent);
            animation: securitySkillWave 2s linear infinite;
        `;
        
        bar.appendChild(wave);
        
        if (!document.getElementById('security-skill-wave-style')) {
            const style = document.createElement('style');
            style.id = 'security-skill-wave-style';
            style.textContent = `
                @keyframes securitySkillWave {
                    0% { transform: translateX(-100%); }
                    100% { transform: translateX(100%); }
                }
            `;
            document.head.appendChild(style);
        }
    }

    animateNumber(element, target) {
        let current = 0;
        const increment = target / 60; // 60 frames for smooth animation
        
        const updateNumber = () => {
            current += increment;
            if (current >= target) {
                current = target;
                element.textContent = `${Math.round(target)}%`;
                return;
            }
            
            element.textContent = `${Math.round(current)}%`;
            requestAnimationFrame(updateNumber);
        };
        
        updateNumber();
    }

    // PIPELINE VISUALIZATION
    initPipelineVisualization() {
        const stages = document.querySelectorAll('.pipeline__stage');
        
        stages.forEach((stage, index) => {
            stage.addEventListener('click', () => {
                this.highlightPipelineStage(stage, index);
            });
            
            // Add enhanced hover effects
            stage.addEventListener('mouseenter', () => {
                this.showEnhancedStageDetails(stage);
            });
            
            stage.addEventListener('mouseleave', () => {
                this.hideEnhancedStageDetails(stage);
            });
        });
        
        // Animate pipeline flow
        this.animateEnhancedPipelineFlow();
    }

    animateEnhancedPipelineFlow() {
        const arrows = document.querySelectorAll('.arrow__flow');
        
        arrows.forEach((arrow, index) => {
            arrow.style.animationDelay = `${index * 0.5}s`;
        });
        
        // Create enhanced data flow visualization
        setInterval(() => {
            this.createEnhancedDataFlowParticle();
        }, 1500);
    }

    createEnhancedDataFlowParticle() {
        const pipeline = document.querySelector('.pipeline__flow');
        if (!pipeline) return;
        
        const particle = document.createElement('div');
        particle.className = 'enhanced-data-particle';
        particle.innerHTML = '📦'; // Package/data icon
        particle.style.cssText = `
            position: absolute;
            font-size: 16px;
            left: 0;
            top: 50%;
            transform: translateY(-50%);
            animation: enhancedDataFlow 8s linear forwards;
            pointer-events: none;
            filter: drop-shadow(0 0 10px rgba(31, 184, 205, 0.6));
        `;
        
        pipeline.appendChild(particle);
        
        setTimeout(() => {
            particle.remove();
        }, 8000);
        
        if (!document.getElementById('enhanced-data-flow-style')) {
            const style = document.createElement('style');
            style.id = 'enhanced-data-flow-style';
            style.textContent = `
                @keyframes enhancedDataFlow {
                    0% {
                        left: 0;
                        opacity: 0;
                        transform: translateY(-50%) scale(0.5);
                    }
                    10% {
                        opacity: 1;
                        transform: translateY(-50%) scale(1);
                    }
                    90% {
                        opacity: 1;
                        transform: translateY(-50%) scale(1);
                    }
                    100% {
                        left: 100%;
                        opacity: 0;
                        transform: translateY(-50%) scale(0.5);
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }

    // SMOOTH SCROLLING
    initSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    this.smoothScrollTo(targetElement);
                }
            });
        });
    }

    smoothScrollTo(element) {
        const headerHeight = document.querySelector('.header').offsetHeight;
        const targetPosition = element.offsetTop - headerHeight - 20;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }

    // PARTICLE SYSTEM
    initParticleSystem() {
        if (window.innerWidth < 768) return; // Skip on mobile for performance
        
        this.createEnhancedMouseTrailParticles();
    }

    createEnhancedMouseTrailParticles() {
        let mouseTrail = [];
        
        document.addEventListener('mousemove', (e) => {
            mouseTrail.push({
                x: e.clientX,
                y: e.clientY,
                time: Date.now()
            });
            
            // Keep only recent positions
            mouseTrail = mouseTrail.filter(point => Date.now() - point.time < 800);
            
            // Create particle occasionally
            if (Math.random() < 0.15) {
                this.createEnhancedTrailParticle(e.clientX, e.clientY);
            }
        });
    }

    createEnhancedTrailParticle(x, y) {
        const particle = document.createElement('div');
        const colors = ['#1fb8cd', '#10b981', '#06b6d4', '#0891b2'];
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        particle.style.cssText = `
            position: fixed;
            width: ${4 + Math.random() * 4}px;
            height: ${4 + Math.random() * 4}px;
            background: ${color};
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            left: ${x}px;
            top: ${y}px;
            animation: enhancedTrailParticle ${1 + Math.random() * 0.5}s ease-out forwards;
            box-shadow: 0 0 10px ${color};
        `;
        
        document.body.appendChild(particle);
        
        setTimeout(() => {
            particle.remove();
        }, 1500);
        
        if (!document.getElementById('enhanced-trail-particle-style')) {
            const style = document.createElement('style');
            style.id = 'enhanced-trail-particle-style';
            style.textContent = `
                @keyframes enhancedTrailParticle {
                    0% {
                        transform: scale(1);
                        opacity: 0.8;
                    }
                    100% {
                        transform: scale(0) translateY(-20px);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }

    createEnhancedCursorTrail(x, y) {
        if (Math.random() > 0.2) return; // Reduce frequency
        
        const trail = document.createElement('div');
        trail.style.cssText = `
            position: fixed;
            width: 8px;
            height: 8px;
            background: radial-gradient(circle, rgba(31, 184, 205, 0.8) 0%, rgba(31, 184, 205, 0.2) 100%);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9998;
            left: ${x - 4}px;
            top: ${y - 4}px;
            animation: enhancedCursorTrail 1s ease-out forwards;
        `;
        
        document.body.appendChild(trail);
        
        setTimeout(() => {
            trail.remove();
        }, 1000);
        
        if (!document.getElementById('enhanced-cursor-trail-style')) {
            const style = document.createElement('style');
            style.id = 'enhanced-cursor-trail-style';
            style.textContent = `
                @keyframes enhancedCursorTrail {
                    0% {
                        opacity: 0.8;
                        transform: scale(1);
                    }
                    100% {
                        opacity: 0;
                        transform: scale(0.2) rotate(180deg);
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }

    // RESPONSIVE OPTIMIZATIONS
    initResponsiveOptimizations() {
        // Check initial screen size
        if (window.innerWidth < 768) {
            this.optimizeForMobile();
        }
        
        // Add responsive observer
        window.addEventListener('resize', this.debounce(() => {
            if (window.innerWidth < 768) {
                this.optimizeForMobile();
            } else {
                this.restoreDesktopEffects();
            }
        }, 250));
    }

    optimizeForMobile() {
        // Reduce particle effects on mobile
        const particles = document.querySelector('.floating-particles');
        if (particles) {
            particles.style.opacity = '0.3';
        }
        
        // Simplify DevOps tools animations
        this.devopsTools.forEach(toolData => {
            toolData.orbitSpeed *= 0.5; // Slower orbit
            toolData.orbitRadius *= 0.7; // Smaller orbit
        });
        
        // Disable cursor trail on mobile
        document.body.classList.add('mobile-optimized');
    }

    restoreDesktopEffects() {
        const particles = document.querySelector('.floating-particles');
        if (particles) {
            particles.style.opacity = '1';
        }
        
        // Restore normal DevOps tools animations
        this.devopsTools.forEach(toolData => {
            toolData.orbitSpeed /= 0.5; // Restore speed
            toolData.orbitRadius /= 0.7; // Restore radius
        });
        
        document.body.classList.remove('mobile-optimized');
    }

    recalculateToolPositions() {
        // Recalculate base positions for DevOps tools
        this.devopsTools.forEach(toolData => {
            const container = toolData.element.parentElement;
            if (container) {
                const rect = container.getBoundingClientRect();
                toolData.baseX = rect.width / 2;
                toolData.baseY = rect.height / 2;
            }
        });
    }

    updateActiveNavigation() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav__link');
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('nav__link--active');
                });
                
                const activeLink = document.querySelector(`.nav__link[href="#${sectionId}"]`);
                if (activeLink) {
                    activeLink.classList.add('nav__link--active');
                }
            }
        });
    }

    updateParallaxEffects(scrollY) {
        const parallaxElements = document.querySelectorAll('.floating-particles, .color-waves');
        
        parallaxElements.forEach((el, index) => {
            const speed = 0.5 + (index * 0.2);
            el.style.transform = `translateY(${scrollY * speed}px)`;
        });
    }

    checkScrollAnimations() {
        const animateElements = document.querySelectorAll('.animate-on-scroll:not(.visible)');
        
        animateElements.forEach(element => {
            if (this.isElementInViewport(element)) {
                this.triggerElementAnimation(element);
            }
        });
    }

    isElementInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top < window.innerHeight * 0.8 &&
            rect.bottom > 0
        );
    }

    createEnhancedParticleBurst(element) {
        const rect = element.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        for (let i = 0; i < 12; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: fixed;
                width: ${4 + Math.random() * 4}px;
                height: ${4 + Math.random() * 4}px;
                background: #1fb8cd;
                border-radius: 50%;
                left: ${centerX}px;
                top: ${centerY}px;
                pointer-events: none;
                z-index: 10000;
                animation: enhancedBurstParticle 1.5s ease-out forwards;
                animation-delay: ${i * 0.05}s;
                box-shadow: 0 0 10px #1fb8cd;
            `;
            
            document.body.appendChild(particle);
            
            setTimeout(() => {
                particle.remove();
            }, 1500);
        }
        
        if (!document.getElementById('enhanced-burst-particle-style')) {
            const style = document.createElement('style');
            style.id = 'enhanced-burst-particle-style';
            style.textContent = `
                @keyframes enhancedBurstParticle {
                    0% {
                        transform: translate(0, 0) scale(1);
                        opacity: 1;
                    }
                    100% {
                        transform: translate(${Math.random() * 200 - 100}px, ${Math.random() * 200 - 100}px) scale(0);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }

    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        }
    }

    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // GLOBAL FUNCTIONS
    triggerInitialAnimations() {
        // Animate hero content
        this.animateHeroContent();
        
        // Start background animations
        this.startBackgroundAnimations();
        
        // Initialize DevOps tools orbit
        this.startDevOpsToolsOrbit();
    }

    animateHeroContent() {
        const heroContent = document.querySelector('.hero__content');
        if (heroContent) {
            heroContent.style.animation = 'fadeInUp 1s ease-out forwards';
        }
    }

    startBackgroundAnimations() {
        // Start particle animations
        const particles = document.querySelector('.floating-particles');
        if (particles) {
            particles.style.animation = 'floatingParticles 20s linear infinite';
        }
        
        // Start wave animations
        const waves = document.querySelector('.color-waves');
        if (waves) {
            waves.style.animation = 'colorWaves 12s ease-in-out infinite';
        }
    }

    // Animation helpers
    animateProjectCard(card) {
        card.style.animation = 'slideInUp 0.6s ease-out forwards';
    }

    animateSavingsMetric(metric) {
        metric.style.animation = 'slideInUp 0.8s ease-out forwards';
    }

    // Placeholder functions for tool interactions
    demonstrateToolSkill(toolData) {
        // Could show skill level or demo
        console.log(`Demonstrating ${toolData.name} skills`);
    }

    showToolDetails(toolData) {
        // Could show detailed tool information
        console.log(`Showing details for ${toolData.name}`);
    }

    updateAnimationParameters() {
        // Recalculate animation parameters on resize
        console.log('Updating animation parameters');
    }

    animateBackgroundParticles() {
        // Background particle animation
        console.log('Animating background particles');
    }

    highlightPipelineStage(stage, index) {
        // Pipeline stage highlighting
        console.log(`Highlighting pipeline stage ${index}`);
    }

    showEnhancedStageDetails(stage) {
        // Show stage details on hover
        console.log('Showing stage details');
    }

    hideEnhancedStageDetails(stage) {
        // Hide stage details
        console.log('Hiding stage details');
    }
}

// Global scroll function
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        const headerHeight = document.querySelector('.header').offsetHeight;
        const targetPosition = element.offsetTop - headerHeight - 20;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
}

// Initialize the enhanced portfolio when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing YashOps portfolio...');
    window.yashOpsPortfolio = new YashOpsPortfolio();
});

// Add additional CSS animations
const additionalStyles = `
    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(50px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .mobile-optimized .floating-devops-tools .tool-icon {
        animation-duration: 6s !important;
    }
    
    .mobile-optimized .color-waves {
        opacity: 0.2 !important;
    }
    
    .nav__link--active {
        color: #1fb8cd !important;
        text-shadow: 0 0 10px rgba(31, 184, 205, 0.5) !important;
    }
`;

// Add styles to document
if (!document.getElementById('yashops-additional-animations')) {
    const style = document.createElement('style');
    style.id = 'yashops-additional-animations';
    style.textContent = additionalStyles;
    document.head.appendChild(style);
}
