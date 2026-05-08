document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            this.classList.toggle('active');
        });
    }

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    if (navLinks) {
                        navLinks.classList.remove('active');
                    }
                }
            }
        });
    });

    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const tabName = this.dataset.tab;

            tabBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            tabPanes.forEach(pane => {
                pane.classList.remove('active');
                if (pane.dataset.tab === tabName) {
                    pane.classList.add('active');
                }
            });
        });
    });

    let currentStep = 1;
    const totalSteps = 4;

    window.nextStep = function() {
        if (currentStep < totalSteps) {
            updateStep(currentStep + 1);
        }
    };

    window.prevStep = function() {
        if (currentStep > 1) {
            updateStep(currentStep - 1);
        }
    };

    function updateStep(step) {
        document.querySelectorAll('.form-step').forEach((el, index) => {
            el.classList.remove('active', 'completed');
            if (index + 1 < step) {
                el.classList.add('completed');
            } else if (index + 1 === step) {
                el.classList.add('active');
            }
        });

        document.querySelectorAll('.form-step-content').forEach((el, index) => {
            el.classList.remove('active');
            if (index + 1 === step) {
                el.classList.add('active');
            }
        });

        currentStep = step;

        if (step === totalSteps) {
            updateSummary();
        }
    }

    function updateSummary() {
        const projectName = document.getElementById('projectName');
        const projectType = document.querySelector('input[name="projectType"]:checked');
        const budget = document.getElementById('budget');
        const deadline = document.getElementById('deadline');
        const description = document.getElementById('description');

        const summaryName = document.getElementById('summaryName');
        const summaryType = document.getElementById('summaryType');
        const summaryBudget = document.getElementById('summaryBudget');
        const summaryDeadline = document.getElementById('summaryDeadline');
        const summaryDescription = document.getElementById('summaryDescription');

        if (summaryName && projectName) {
            summaryName.textContent = projectName.value || '–';
        }

        if (summaryType && projectType) {
            const typeLabels = {
                foto: '📸 Fotografie',
                video: '🎬 Video',
                social: '📱 Social Media',
                mixed: '🎨 Gemischt'
            };
            summaryType.textContent = typeLabels[projectType.value] || '–';
        }

        if (summaryBudget && budget) {
            summaryBudget.textContent = budget.value ? `CHF ${budget.value}` : '–';
        }

        if (summaryDeadline && deadline) {
            if (deadline.value) {
                const date = new Date(deadline.value);
                summaryDeadline.textContent = date.toLocaleDateString('de-CH', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                });
            } else {
                summaryDeadline.textContent = '–';
            }
        }

        if (summaryDescription && description) {
            summaryDescription.textContent = description.value || '–';
        }
    }

    const projectForm = document.getElementById('projectForm');
    const successModal = document.getElementById('successModal');

    if (projectForm) {
        projectForm.addEventListener('submit', function(e) {
            e.preventDefault();

            if (successModal) {
                successModal.classList.add('active');
            }
        });
    }

    const uploadArea = document.getElementById('uploadArea');
    const fileInput = document.getElementById('fileInput');

    if (uploadArea && fileInput) {
        uploadArea.addEventListener('click', () => fileInput.click());

        uploadArea.addEventListener('dragover', e => {
            e.preventDefault();
            uploadArea.style.borderColor = 'var(--color-primary)';
            uploadArea.style.background = 'rgba(37, 99, 235, 0.05)';
        });

        uploadArea.addEventListener('dragleave', () => {
            uploadArea.style.borderColor = '';
            uploadArea.style.background = '';
        });

        uploadArea.addEventListener('drop', e => {
            e.preventDefault();
            uploadArea.style.borderColor = '';
            uploadArea.style.background = '';
            console.log('Files dropped:', e.dataTransfer.files);
        });
    }

    document.querySelectorAll('.file-remove').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const fileItem = this.closest('.file-item');
            if (fileItem) {
                fileItem.style.opacity = '0';
                fileItem.style.transform = 'translateX(20px)';
                setTimeout(() => fileItem.remove(), 200);
            }
        });
    });

    window.showContactModal = function() {
        const modal = document.getElementById('contactModal');
        if (modal) {
            modal.classList.add('active');
        }
    };

    window.closeContactModal = function() {
        const modal = document.getElementById('contactModal');
        if (modal) {
            modal.classList.remove('active');
        }
    };

    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                this.classList.remove('active');
            }
        });
    });

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            document.querySelectorAll('.modal.active').forEach(modal => {
                modal.classList.remove('active');
            });
        }
    });

    document.querySelectorAll('.task-checkbox').forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const taskContent = this.closest('.task-item')?.querySelector('.task-content');
            if (!taskContent) return;

            if (this.checked) {
                taskContent.classList.add('completed');
            } else {
                taskContent.classList.remove('completed');
            }
        });
    });

    const chatInput = document.querySelector('.chat-input input');
    const chatSendBtn = document.querySelector('.chat-input .btn');
    const chatMessages = document.querySelector('.chat-messages');

    if (chatInput && chatSendBtn && chatMessages) {
        function sendMessage() {
            const message = chatInput.value.trim();
            if (message) {
                const messageEl = document.createElement('div');
                messageEl.className = 'chat-message sent';
                messageEl.innerHTML = `
                    <div class="chat-bubble">
                        <p>${escapeHtml(message)}</p>
                        <span class="chat-time">Gerade eben</span>
                    </div>
                `;
                chatMessages.appendChild(messageEl);
                chatInput.value = '';
                chatMessages.scrollTop = chatMessages.scrollHeight;
            }
        }

        chatSendBtn.addEventListener('click', sendMessage);

        chatInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    }

    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    const navbar = document.querySelector('.navbar');

    if (navbar) {
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
            if (currentScroll > 50) {
                navbar.style.boxShadow = 'var(--shadow-md)';
            } else {
                navbar.style.boxShadow = '';
            }
        });
    }

    const filterSelects = document.querySelectorAll('.filter-group select');

    filterSelects.forEach(select => {
        select.addEventListener('change', function() {
            console.log('Filter changed:', this.id, this.value);
        });
    });

    const viewBtns = document.querySelectorAll('.view-btn');

    viewBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            viewBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
        });
    });

    const progressBars = document.querySelectorAll('.progress-fill');

    const observerOptions = {
        threshold: 0.5
    };

    const progressObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.width = entry.target.style.width;
            }
        });
    }, observerOptions);

    progressBars.forEach(bar => {
        progressObserver.observe(bar);
    });

    const typeCards = document.querySelectorAll('.type-card');

    typeCards.forEach(card => {
        card.addEventListener('click', function() {
            typeCards.forEach(c => {
                const content = c.querySelector('.type-card-content');
                if (content) content.style.transform = '';
            });

            const currentContent = this.querySelector('.type-card-content');
            if (currentContent) {
                currentContent.style.transform = 'scale(0.98)';
                setTimeout(() => {
                    currentContent.style.transform = '';
                }, 150);
            }
        });
    });

    const deadlineInput = document.getElementById('deadline');

    if (deadlineInput) {
        const today = new Date();
        const minDate = new Date(today);
        minDate.setDate(today.getDate() + 7);
        deadlineInput.min = minDate.toISOString().split('T')[0];
    }

    const animateElements = document.querySelectorAll('.problem-card, .solution-card, .step-card, .testimonial-card, .creator-card, .project-card');

    const animateObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    animateElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`;
        animateObserver.observe(el);
    });

    const contactForm = document.querySelector('.contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;

            submitBtn.textContent = 'Wird gesendet...';
            submitBtn.disabled = true;

            setTimeout(() => {
                closeContactModal();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                this.reset();
                alert('Ihre Anfrage wurde erfolgreich gesendet!');
            }, 1500);
        });
    }

    function updatePricingCalculator() {
        const creatorPriceInput = document.getElementById('creatorPrice');
        const platformFeeInput = document.getElementById('platformFee');
        const creatorAmount = document.getElementById('creatorAmount');
        const platformAmount = document.getElementById('platformAmount');
        const totalAmount = document.getElementById('totalAmount');

        if (!creatorPriceInput || !platformFeeInput || !creatorAmount || !platformAmount || !totalAmount) {
            return;
        }

        const creatorPrice = parseFloat(creatorPriceInput.value) || 0;
        const platformFee = parseFloat(platformFeeInput.value) || 0;
        const feeAmount = creatorPrice * (platformFee / 100);
        const total = creatorPrice + feeAmount;

        creatorAmount.textContent = `CHF ${creatorPrice.toFixed(2)}`;
        platformAmount.textContent = `CHF ${feeAmount.toFixed(2)}`;
        totalAmount.textContent = `CHF ${total.toFixed(2)}`;
    }

    const creatorPriceInput = document.getElementById('creatorPrice');
    const platformFeeInput = document.getElementById('platformFee');

    if (creatorPriceInput && platformFeeInput) {
        creatorPriceInput.addEventListener('input', updatePricingCalculator);
        platformFeeInput.addEventListener('input', updatePricingCalculator);
        updatePricingCalculator();
    }

    document.querySelectorAll('.file-version-actions .btn-primary').forEach(button => {
        button.addEventListener('click', function() {
            this.textContent = 'Freigegeben';
            this.disabled = true;
            this.classList.remove('btn-primary');
            this.classList.add('btn-secondary');
        });
    });

    console.log('FrameFlow initialized successfully!');
});
