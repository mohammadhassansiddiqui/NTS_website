/* ==========================================================================
   NATIONAL TESTING SERVICE - PAKISTAN (NTS™) - ULTRA LUXURY HCI ENGINE
   Full Client-Side State Management, Realistic Demo Simulation & Micro-Interactions
   ========================================================================== */

// Default Loaded Candidate Profile
const DEFAULT_CANDIDATE = {
    name: "Muhammad Hamza Khan",
    fatherName: "Tariq Mahmood Khan",
    cnic: "61101-1234567-1",
    dob: "14 August 1999",
    email: "hamza.tariq@gmail.com",
    mobile: "+92 300 1234567",
    domicile: "Islamabad Capital Territory (ICT)",
    address: "House # 142, Street # 19, Sector G-9/2, Islamabad",
    avatarInitials: "MH"
};

// Default Candidate Applications
const DEFAULT_APPLICATIONS = [
    {
        appId: "NTS-8912",
        projectCode: "NTS-GAT-2026-II",
        testTitle: "Graduate Assessment Test (GAT™ General 2026-I)",
        postTitle: "GAT-A (Engineering & Business)",
        voucherNum: "1000847291034",
        feeAmount: "Rs. 1,350/-",
        serviceCharges: "Rs. 20/-",
        totalPayable: "Rs. 1,370/-",
        status: "PAID",
        paymentMethod: "1Bill (EasyPaisa)",
        txnId: "TXN-1BILL-89210492",
        paidDate: "15 Jan 2026",
        admitCardIssued: true,
        rollNo: "NTS-2026-894120",
        appliedDate: "02 Jan 2026",
        testCity: "Islamabad"
    },
    {
        appId: "NTS-7721",
        projectCode: "NTS-NAT-2026-II",
        testTitle: "National Aptitude Test (NAT™-IE 2025)",
        postTitle: "Pre-Engineering Group",
        voucherNum: "1000781290331",
        feeAmount: "Rs. 1,000/-",
        serviceCharges: "Rs. 20/-",
        totalPayable: "Rs. 1,020/-",
        status: "PAID",
        paymentMethod: "1Bill (Meezan Bank)",
        txnId: "TXN-1BILL-74198201",
        paidDate: "20 Dec 2025",
        admitCardIssued: false,
        rollNo: "NAT-2025-102948",
        appliedDate: "15 Dec 2025",
        testCity: "Rawalpindi"
    },
    {
        appId: "NTS-9943",
        projectCode: "FBR-INSP-2026",
        testTitle: "Federal Board of Revenue - Inspector Inland Revenue (BS-16)",
        postTitle: "Inspector Inland Revenue (BS-16)",
        voucherNum: "1000994821045",
        feeAmount: "Rs. 650/-",
        serviceCharges: "Rs. 20/-",
        totalPayable: "Rs. 670/-",
        status: "UNPAID",
        paymentMethod: null,
        txnId: null,
        paidDate: null,
        admitCardIssued: false,
        rollNo: "FBR-2026-Pending",
        appliedDate: "10 Feb 2026",
        testCity: "Islamabad"
    }
];

// -------------------------------------------------------------
// INITIALIZATION & STATE REPOSITORY
// -------------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
    initInteractiveState();
    initHeroSlider();
    renderProjectsTable();
    initScrollToTop();
    initKeyboardShortcuts();
    renderPortalDashboard();
    initChallanPage();
});

function initInteractiveState() {
    if (!localStorage.getItem('nts_candidate')) {
        localStorage.setItem('nts_candidate', JSON.stringify(DEFAULT_CANDIDATE));
    }
    if (!localStorage.getItem('nts_applications')) {
        localStorage.setItem('nts_applications', JSON.stringify(DEFAULT_APPLICATIONS));
    }
    if (!localStorage.getItem('nts_tickets')) {
        localStorage.setItem('nts_tickets', JSON.stringify([]));
    }
}

function getCandidate() {
    try {
        return JSON.parse(localStorage.getItem('nts_candidate')) || DEFAULT_CANDIDATE;
    } catch (e) {
        return DEFAULT_CANDIDATE;
    }
}

function getApplications() {
    try {
        return JSON.parse(localStorage.getItem('nts_applications')) || DEFAULT_APPLICATIONS;
    } catch (e) {
        return DEFAULT_APPLICATIONS;
    }
}

function saveApplications(apps) {
    localStorage.setItem('nts_applications', JSON.stringify(apps));
}

// -------------------------------------------------------------
// 1. TOAST NOTIFICATION SYSTEM (Opulent Luxury HCI Feedback)
// -------------------------------------------------------------
function showToast(message, icon = 'fa-circle-check', duration = 3800) {
    let container = document.getElementById('toastContainer');
    if (!container) {
        container = document.createElement('div');
        container.id = 'toastContainer';
        container.className = 'toast-container';
        document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = 'toast-message';
    toast.innerHTML = `
        <i class="fa-solid ${icon}"></i>
        <span>${message}</span>
    `;
    container.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(30px) scale(0.95)';
        toast.style.transition = 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)';
        setTimeout(() => toast.remove(), 350);
    }, duration);
}

// -------------------------------------------------------------
// 2. 1-CLICK SAMPLE CNIC FILLER (Friction-Free UX)
// -------------------------------------------------------------
function fillSampleCnic(targetInputId, cnic, autoLookup = false) {
    const input = document.getElementById(targetInputId);
    if (!input) return;

    input.value = cnic;
    input.focus();
    showToast(`Prefilled Demo CNIC: ${cnic}`, 'fa-paste');

    if (autoLookup) {
        if (targetInputId.includes('roll')) {
            lookupRollNoSlip();
        } else {
            lookupResult();
        }
    }
}

// -------------------------------------------------------------
// 3. COPY TO CLIPBOARD WITH LUXURY FEEDBACK
// -------------------------------------------------------------
function copyText(text, label = 'Copied') {
    navigator.clipboard.writeText(text).then(() => {
        showToast(`${label}: <strong>${text}</strong> copied to clipboard!`, 'fa-clipboard-check');
    }).catch(() => {
        showToast(`Copied: <strong>${text}</strong>`, 'fa-clipboard-check');
    });
}

// -------------------------------------------------------------
// 4. HERO SLIDER CAROUSEL
// -------------------------------------------------------------
let currentSlide = 0;
let slideInterval = null;

function initHeroSlider() {
    const slides = document.querySelectorAll('.hero-slider .slide');
    const dotsContainer = document.getElementById('sliderDots');
    if (!slides.length || !dotsContainer) return;

    dotsContainer.innerHTML = '';
    slides.forEach((_, idx) => {
        const dot = document.createElement('div');
        dot.className = `dot ${idx === 0 ? 'active' : ''}`;
        dot.setAttribute('aria-label', `Go to slide ${idx + 1}`);
        dot.onclick = () => goToSlide(idx);
        dotsContainer.appendChild(dot);
    });

    startSlideTimer();
}

function showSlide(index) {
    const slides = document.querySelectorAll('.hero-slider .slide');
    const dots = document.querySelectorAll('.slider-dots .dot');
    if (!slides.length) return;

    if (index >= slides.length) currentSlide = 0;
    else if (index < 0) currentSlide = slides.length - 1;
    else currentSlide = index;

    slides.forEach((slide, idx) => {
        slide.classList.toggle('active', idx === currentSlide);
    });

    dots.forEach((dot, idx) => {
        dot.classList.toggle('active', idx === currentSlide);
    });
}

function nextSlide() {
    showSlide(currentSlide + 1);
    resetSlideTimer();
}

function prevSlide() {
    showSlide(currentSlide - 1);
    resetSlideTimer();
}

function goToSlide(index) {
    showSlide(index);
    resetSlideTimer();
}

function startSlideTimer() {
    slideInterval = setInterval(() => {
        showSlide(currentSlide + 1);
    }, 6000);
}

function resetSlideTimer() {
    clearInterval(slideInterval);
    startSlideTimer();
}

// -------------------------------------------------------------
// 5. MAIN TAB SWITCHING WITH SMOOTH AFFORDANCE
// -------------------------------------------------------------
function switchMainTab(tabKey) {
    const triggers = document.querySelectorAll('.tab-trigger');
    const panes = document.querySelectorAll('.tab-pane');

    triggers.forEach(t => t.classList.remove('active'));
    panes.forEach(p => p.classList.remove('active'));

    const targetBtn = document.getElementById(`tab-${tabKey}-btn`);
    const targetPane = document.getElementById(`pane-${tabKey}`);

    if (targetBtn && targetPane) {
        targetBtn.classList.add('active');
        targetPane.classList.add('active');
    }

    const workspaceElem = document.getElementById('workspace');
    if (workspaceElem) {
        workspaceElem.scrollIntoView({ behavior: 'smooth' });
    }
}

// -------------------------------------------------------------
// 6. OPEN APPLICATIONS RENDERING & LIVE FILTER
// -------------------------------------------------------------
function renderProjectsTable(filteredList = null) {
    const tbody = document.getElementById('projectsTableBody');
    if (!tbody || typeof ntsData === 'undefined') return;

    const list = filteredList || ntsData.projects;
    tbody.innerHTML = '';

    const countElem = document.getElementById('openAppsCount');
    if (countElem) countElem.textContent = list.length;

    if (list.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="6" style="text-align: center; padding: 40px 20px; color: #64748b;">
                    <i class="fa-solid fa-magnifying-glass" style="font-size: 32px; color: #cbd5e1; margin-bottom: 10px; display: block;"></i>
                    <strong style="font-size: 15px; color: #1e293b; display: block;">No matching test projects found</strong>
                    <span style="font-size: 12.5px;">Try adjusting your keyword or reset category filter.</span>
                    <div style="margin-top: 14px;">
                        <button class="btn btn-outline-dark btn-xs" onclick="resetProjectFilters()"><i class="fa-solid fa-rotate-left"></i> Reset Filters</button>
                    </div>
                </td>
            </tr>
        `;
        return;
    }

    list.forEach((proj, idx) => {
        const catClass = proj.category === 'Recruitment' ? 'cat-recruitment' :
                         proj.category === 'Admission' ? 'cat-admission' : 'cat-scholarship';

        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td style="font-weight: 600; color: #64748b;">${idx + 1}</td>
            <td><span class="proj-code-badge">${proj.code}</span></td>
            <td>
                <span class="proj-title-text">${proj.title}</span>
                <span class="proj-org-text"><i class="fa-solid fa-building-columns"></i> ${proj.org}</span>
            </td>
            <td><span class="badge-cat ${catClass}">${proj.categoryLabel}</span></td>
            <td><span class="date-badge"><i class="fa-regular fa-clock"></i> ${proj.lastDate}</span></td>
            <td>
                <div class="table-actions">
                    <button class="btn btn-xs btn-outline-dark" onclick="openProjectModal('${proj.code}')" title="View details and requirements">
                        <i class="fa-solid fa-circle-info"></i> Details
                    </button>
                    <button class="btn btn-xs btn-warning" onclick="openApplyWizard('${proj.code}')" title="Apply online via portal">
                        <i class="fa-solid fa-file-pen"></i> Apply Online
                    </button>
                </div>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

function filterProjects() {
    const searchInput = document.getElementById('projectSearchInput');
    const filterSelect = document.getElementById('projectCategoryFilter');
    if (!searchInput || !filterSelect || typeof ntsData === 'undefined') return;

    const searchTerm = searchInput.value.toLowerCase().trim();
    const selectedCategory = filterSelect.value;

    const filtered = ntsData.projects.filter(proj => {
        const matchesCategory = selectedCategory === 'ALL' || proj.category === selectedCategory;
        const matchesSearch = proj.title.toLowerCase().includes(searchTerm) ||
                              proj.org.toLowerCase().includes(searchTerm) ||
                              proj.code.toLowerCase().includes(searchTerm);
        return matchesCategory && matchesSearch;
    });

    renderProjectsTable(filtered);
}

function resetProjectFilters() {
    const searchInput = document.getElementById('projectSearchInput');
    const filterSelect = document.getElementById('projectCategoryFilter');
    if (searchInput) searchInput.value = '';
    if (filterSelect) filterSelect.value = 'ALL';
    renderProjectsTable();
    showToast('Filters reset to show all active projects', 'fa-rotate-left');
}

function focusSearch() {
    switchMainTab('open-apps');
    const searchInput = document.getElementById('projectSearchInput');
    if (searchInput) {
        searchInput.focus();
        searchInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}

// -------------------------------------------------------------
// 7. PROJECT DETAILS MODAL
// -------------------------------------------------------------
function openProjectModal(code) {
    if (typeof ntsData === 'undefined') return;
    const proj = ntsData.projects.find(p => p.code === code);
    if (!proj) return;

    const setT = (id, txt) => {
        const el = document.getElementById(id);
        if (el) el.textContent = txt;
    };

    setT('pmCategory', proj.categoryLabel);
    setT('pmTitle', proj.title);
    setT('pmOrg', proj.org);
    setT('pmCode', proj.code);
    setT('pmLastDate', proj.lastDate);
    setT('pmFee', proj.fee);
    setT('pmEligibility', proj.eligibility);
    setT('pmInstructions', proj.instructions);

    const posList = document.getElementById('pmPositionsList');
    if (posList) {
        posList.innerHTML = '';
        proj.positions.forEach(pos => {
            const li = document.createElement('li');
            li.textContent = pos;
            posList.appendChild(li);
        });
    }

    const applyBtn = document.getElementById('pmApplyBtn');
    if (applyBtn) {
        applyBtn.onclick = () => {
            closeModal('projectDetailsModal');
            openApplyWizard(proj.code);
        };
    }

    openModal('projectDetailsModal');
}

// -------------------------------------------------------------
// 8. INTERACTIVE NEW APPLICATION WIZARD (Instant Demo Apply)
// -------------------------------------------------------------
let activeWizardProject = null;

function openApplyWizard(projectCode) {
    if (typeof ntsData === 'undefined') return;
    const proj = ntsData.projects.find(p => p.code === projectCode) || ntsData.projects[0];
    activeWizardProject = proj;

    let modal = document.getElementById('applyWizardModal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'applyWizardModal';
        modal.className = 'modal-overlay';
        modal.innerHTML = `
            <div class="modal-box payment-modal-box" style="max-width: 620px;">
                <div class="pay-modal-header">
                    <h3><i class="fa-solid fa-file-signature"></i> Online Examination Application</h3>
                    <button class="modal-close-btn" style="color:#fff;" onclick="closeModal('applyWizardModal')">&times;</button>
                </div>
                <div style="padding: 24px;">
                    <div style="background: #f8fafc; border: 1px solid var(--border-subtle); border-radius: 8px; padding: 14px 18px; margin-bottom: 20px;">
                        <span class="proj-code-badge" id="wizCode"></span>
                        <h4 style="font-size: 15px; color: var(--nts-navy); margin: 6px 0 2px;" id="wizTitle"></h4>
                        <p style="font-size: 12px; color: #64748b;" id="wizOrg"></p>
                    </div>

                    <form id="applyWizardForm" onsubmit="handleApplySubmit(event)">
                        <div class="form-group" style="margin-bottom: 14px;">
                            <label style="font-size: 13px; font-weight: 600;">Selected Post / Discipline: <span class="req">*</span></label>
                            <select id="wizPostSelect" class="form-control" required></select>
                        </div>

                        <div class="form-group" style="margin-bottom: 14px;">
                            <label style="font-size: 13px; font-weight: 600;">Preferred Examination City: <span class="req">*</span></label>
                            <select id="wizCitySelect" class="form-control" required>
                                <option value="Islamabad / Rawalpindi">Islamabad / Rawalpindi (Model Exam Center)</option>
                                <option value="Lahore">Lahore (Punjab University Center)</option>
                                <option value="Karachi">Karachi (Federal Assessment Hall)</option>
                                <option value="Peshawar">Peshawar (University of Peshawar Hall)</option>
                                <option value="Quetta">Quetta (Balochistan University Center)</option>
                                <option value="Multan">Multan (Divisional Public School Hall)</option>
                            </select>
                        </div>

                        <div style="background: #fefce8; border: 1px solid #fef08a; padding: 12px 16px; border-radius: 6px; font-size: 12.5px; color: #854d0e; margin-bottom: 20px; display: flex; justify-content: space-between; align-items: center;">
                            <div>
                                <i class="fa-solid fa-receipt"></i> <strong>Application Test Fee:</strong>
                                <span style="font-size: 14px; font-weight: 800; color: #b45309; margin-left: 6px;" id="wizFee"></span>
                            </div>
                            <span style="font-size: 11px; background: #fff; padding: 2px 8px; border-radius: 4px; border: 1px solid #fde047;">Payable via 1Link 1Bill</span>
                        </div>

                        <div style="margin-bottom: 20px;">
                            <label style="display: flex; align-items: flex-start; gap: 8px; font-size: 12px; color: #475569; cursor: pointer;">
                                <input type="checkbox" required checked style="margin-top: 3px;">
                                <span>I solemnly affirm that the information provided is correct and I have verified the official eligibility criteria in the advertisement.</span>
                            </label>
                        </div>

                        <div style="display: flex; gap: 12px; justify-content: flex-end;">
                            <button type="button" class="btn btn-outline-dark btn-xs" onclick="closeModal('applyWizardModal')">Cancel</button>
                            <button type="submit" class="btn btn-warning btn-xs" style="padding: 9px 20px;">
                                <i class="fa-solid fa-circle-check"></i> Submit & Generate 1Bill Challan
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    }

    document.getElementById('wizCode').textContent = proj.code;
    document.getElementById('wizTitle').textContent = proj.title;
    document.getElementById('wizOrg').textContent = proj.org;
    document.getElementById('wizFee').textContent = proj.fee;

    const postSelect = document.getElementById('wizPostSelect');
    postSelect.innerHTML = '';
    proj.positions.forEach(pos => {
        const opt = document.createElement('option');
        opt.value = pos;
        opt.textContent = pos;
        postSelect.appendChild(opt);
    });

    openModal('applyWizardModal');
}

function handleApplySubmit(e) {
    e.preventDefault();
    if (!activeWizardProject) return;

    const postSelected = document.getElementById('wizPostSelect').value;
    const citySelected = document.getElementById('wizCitySelect').value;

    const randAppNum = 'NTS-' + Math.floor(1000 + Math.random() * 9000);
    const randVoucher = '1000' + Math.floor(100000000 + Math.random() * 900000000);

    const feeMatches = activeWizardProject.fee.match(/[\d,]+/);
    const feeStr = feeMatches ? `Rs. ${feeMatches[0]}/-` : 'Rs. 1,000/-';

    const newApp = {
        appId: randAppNum,
        projectCode: activeWizardProject.code,
        testTitle: activeWizardProject.title,
        postTitle: postSelected,
        voucherNum: randVoucher,
        feeAmount: feeStr,
        serviceCharges: "Rs. 20/-",
        totalPayable: feeStr,
        status: "UNPAID",
        paymentMethod: null,
        txnId: null,
        paidDate: null,
        admitCardIssued: false,
        rollNo: activeWizardProject.code.split('-')[1] + '-2026-Pending',
        appliedDate: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
        testCity: citySelected
    };

    const apps = getApplications();
    apps.unshift(newApp);
    saveApplications(apps);

    closeModal('applyWizardModal');
    showToast(`Application <strong>#${randAppNum}</strong> registered! 1Bill Voucher: <strong>${randVoucher}</strong>`, 'fa-circle-check', 5000);

    renderPortalDashboard();

    setTimeout(() => {
        open1BillModal(randVoucher, activeWizardProject.title, feeStr);
    }, 600);
}

// -------------------------------------------------------------
// 9. 1BILL PAYMENT GATEWAY SIMULATOR MODAL (Realistic Payment)
// -------------------------------------------------------------
let activePaymentVoucher = null;

function open1BillModal(voucherNum, projectTitle, feeAmount) {
    activePaymentVoucher = voucherNum;

    let modal = document.getElementById('oneBillModal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'oneBillModal';
        modal.className = 'modal-overlay';
        modal.innerHTML = `
            <div class="modal-box payment-modal-box">
                <div class="pay-modal-header">
                    <h3><i class="fa-solid fa-credit-card"></i> 1Link 1Bill Gateway Simulator</h3>
                    <button class="modal-close-btn" style="color:#fff;" onclick="closeModal('oneBillModal')">&times;</button>
                </div>
                <div style="padding: 24px;">
                    <div style="background: #f8fafc; border: 1px solid var(--border-subtle); border-radius: 8px; padding: 14px 18px; margin-bottom: 16px;">
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
                            <span style="font-size: 11.5px; color: #64748b; font-weight: 600; text-transform: uppercase;">1Bill Consumer Number:</span>
                            <span class="proj-code-badge" style="font-family: monospace; font-size: 13px;" id="payModalVoucher"></span>
                        </div>
                        <h4 style="font-size: 14px; color: var(--nts-navy); margin-bottom: 4px;" id="payModalTitle"></h4>
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 8px; border-top: 1px solid #e2e8f0; padding-top: 8px;">
                            <span style="font-size: 13px; color: #334155; font-weight: 600;">Total Fee Amount:</span>
                            <strong style="font-size: 17px; color: #059669;" id="payModalAmount"></strong>
                        </div>
                    </div>

                    <label style="font-size: 13px; font-weight: 600; display: block; margin-bottom: 8px;">Select Payment App / Channel:</label>
                    <div class="payment-channel-grid">
                        <div class="channel-opt selected" onclick="selectChannel(this, 'EasyPaisa')">
                            <i class="fa-solid fa-wallet" style="color: #059669;"></i>
                            <span>EasyPaisa</span>
                        </div>
                        <div class="channel-opt" onclick="selectChannel(this, 'JazzCash')">
                            <i class="fa-solid fa-mobile-screen-button" style="color: #dc2626;"></i>
                            <span>JazzCash</span>
                        </div>
                        <div class="channel-opt" onclick="selectChannel(this, 'HBL Mobile')">
                            <i class="fa-solid fa-building-columns" style="color: #0d9488;"></i>
                            <span>HBL Mobile</span>
                        </div>
                        <div class="channel-opt" onclick="selectChannel(this, 'Meezan Bank')">
                            <i class="fa-solid fa-landmark" style="color: #4f46e5;"></i>
                            <span>Meezan Bank</span>
                        </div>
                        <div class="channel-opt" onclick="selectChannel(this, 'Nayapay')">
                            <i class="fa-solid fa-n" style="color: #ea580c;"></i>
                            <span>NayaPay</span>
                        </div>
                        <div class="channel-opt" onclick="selectChannel(this, '1Link ATM')">
                            <i class="fa-solid fa-money-bill-transfer" style="color: #0284c7;"></i>
                            <span>1Link ATM</span>
                        </div>
                    </div>

                    <div class="form-group" style="margin-bottom: 16px;">
                        <label style="font-size: 12.5px; font-weight: 600;">Mock MPIN / Authorization Code:</label>
                        <input type="password" class="form-control" value="••••" readonly style="letter-spacing: 4px; font-size: 16px; text-align: center; background: #f8fafc;">
                    </div>

                    <button class="btn btn-warning btn-block" id="btnConfirmPay" onclick="process1BillPayment()" style="padding: 12px; font-size: 14px;">
                        <i class="fa-solid fa-shield-check"></i> Authorize & Confirm 1Bill Payment
                    </button>
                    <p style="font-size: 11px; color: #64748b; text-align: center; margin-top: 10px;">
                        <i class="fa-solid fa-lock"></i> 256-bit encrypted simulated 1Link transaction. Immediate real-time settlement.
                    </p>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    }

    document.getElementById('payModalVoucher').textContent = voucherNum;
    document.getElementById('payModalTitle').textContent = projectTitle;
    document.getElementById('payModalAmount').textContent = feeAmount;

    openModal('oneBillModal');
}

function selectChannel(elem, name) {
    document.querySelectorAll('.channel-opt').forEach(c => c.classList.remove('selected'));
    elem.classList.add('selected');
}

function process1BillPayment() {
    const btn = document.getElementById('btnConfirmPay');
    if (!btn) return;

    btn.disabled = true;
    btn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Communicating with 1Link 1Bill Switch...`;

    setTimeout(() => {
        const randTxn = 'TXN-1BILL-' + Math.floor(10000000 + Math.random() * 90000000);
        const apps = getApplications();
        const app = apps.find(a => a.voucherNum === activePaymentVoucher) || apps[0];

        if (app) {
            app.status = 'PAID';
            app.paymentMethod = '1Bill (Electronic Verification)';
            app.txnId = randTxn;
            app.paidDate = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
            app.admitCardIssued = true;
            app.rollNo = 'NTS-2026-' + Math.floor(100000 + Math.random() * 900000);
            saveApplications(apps);
        }

        btn.disabled = false;
        btn.innerHTML = `<i class="fa-solid fa-shield-check"></i> Authorize & Confirm 1Bill Payment`;
        closeModal('oneBillModal');

        showToast(`Payment Approved! Verified Transaction ID: <strong>#${randTxn}</strong>. Roll No Slip Issued!`, 'fa-circle-check', 6000);

        renderPortalDashboard();
        initChallanPage();

    }, 1300);
}

// -------------------------------------------------------------
// 10. CANDIDATE PORTAL DASHBOARD RENDERING
// -------------------------------------------------------------
function renderPortalDashboard() {
    const tbody = document.getElementById('portalAppsTableBody');
    if (!tbody) return;

    const apps = getApplications();
    tbody.innerHTML = '';

    apps.forEach((app, idx) => {
        const isPaid = app.status === 'PAID';
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><strong>#${app.appId}</strong></td>
            <td>${app.testTitle}</td>
            <td>${app.postTitle}</td>
            <td><code>${app.voucherNum}</code></td>
            <td>
                ${isPaid ?
                    `<span class="app-status-badge status-paid"><i class="fa-solid fa-circle-check"></i> Paid via 1Bill</span>` :
                    `<span class="app-status-badge status-pending"><i class="fa-solid fa-clock"></i> Pending Payment</span>`
                }
            </td>
            <td>
                ${isPaid ?
                    `<span class="badge-success" style="background:#059669; color:#fff; padding:2px 8px; font-size:11px; border-radius:12px; font-weight:700;"><i class="fa-solid fa-circle-check"></i> Issued</span>` :
                    `<span class="badge-cat cat-admission">Pay Fee First</span>`
                }
            </td>
            <td class="text-center">
                ${isPaid ?
                    `<a href="candidates.html" class="btn btn-xs btn-primary"><i class="fa-solid fa-id-badge"></i> Roll No Slip</a>` :
                    `<button class="btn btn-xs btn-warning" onclick="open1BillModal('${app.voucherNum}', '${app.testTitle.replace(/'/g, "\\'")}', '${app.totalPayable}')"><i class="fa-solid fa-credit-card"></i> Pay Online</button>`
                }
            </td>
        `;
        tbody.appendChild(tr);
    });

    const cand = getCandidate();
    const candNameElem = document.getElementById('dashCandName');
    if (candNameElem) candNameElem.textContent = cand.name;
    const candCnicElem = document.getElementById('dashCandCnic');
    if (candCnicElem) candCnicElem.textContent = `CNIC: ${cand.cnic}`;
    const userAvatar = document.querySelector('.user-avatar');
    if (userAvatar) userAvatar.textContent = cand.avatarInitials || 'MH';
}

function openPortalSection(secKey) {
    document.querySelectorAll('.portal-pane').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.portal-menu li').forEach(m => m.classList.remove('active'));

    const targetPane = document.getElementById(`sec-${secKey}`);
    const targetMenu = document.getElementById(`m-${secKey === 'dashboard' ? 'dash' : secKey === 'profile' ? 'profile' : secKey === 'my-applications' ? 'apps' : 'dash'}`);

    if (targetPane) targetPane.classList.add('active');
    if (targetMenu) targetMenu.classList.add('active');
}

function saveCandidateProfile(e) {
    e.preventDefault();
    const cand = getCandidate();

    const getV = id => {
        const el = document.getElementById(id);
        return el ? el.value : null;
    };

    if (getV('profName')) cand.name = getV('profName');
    if (getV('profFather')) cand.fatherName = getV('profFather');
    if (getV('profEmail')) cand.email = getV('profEmail');
    if (getV('profMobile')) cand.mobile = getV('profMobile');
    if (getV('profAddress')) cand.address = getV('profAddress');

    localStorage.setItem('nts_candidate', JSON.stringify(cand));
    showToast('Candidate Profile saved successfully!', 'fa-circle-check');
    renderPortalDashboard();
}

// -------------------------------------------------------------
// 11. 1BILL CHALLAN PAGE RENDERING & INTERACTIVE STAMP
// -------------------------------------------------------------
function initChallanPage() {
    const challanContainer = document.querySelector('.challan-wrapper');
    if (!challanContainer) return;

    const apps = getApplications();
    const app = apps[0];
    const isPaid = app && app.status === 'PAID';

    const stampEl = document.getElementById('challanPaidStamp');
    if (isPaid) {
        if (!stampEl) {
            const stamp = document.createElement('div');
            stamp.id = 'challanPaidStamp';
            stamp.className = 'stamp-overlay-verified';
            stamp.innerHTML = `
                <i class="fa-solid fa-seal-check"></i> PAID &amp; VERIFIED
                <small>1LINK 1BILL SETTLEMENT</small>
                <small>${app.txnId || 'TXN-1BILL-8921049'}</small>
            `;
            challanContainer.style.position = 'relative';
            challanContainer.appendChild(stamp);
        }
        const payBtn = document.getElementById('btnPayChallanTop');
        if (payBtn) {
            payBtn.className = 'btn btn-xs btn-primary';
            payBtn.innerHTML = `<i class="fa-solid fa-circle-check"></i> Paid & Verified (#${app.txnId || 'TXN-OK'})`;
            payBtn.onclick = () => showToast(`1Bill Challan is already paid! Txn ID: ${app.txnId}`, 'fa-circle-check');
        }
    }
}

function payCurrentChallan() {
    const apps = getApplications();
    const app = apps[0] || { voucherNum: '1000847291034', testTitle: 'Graduate Assessment Test (GAT™ General)', totalPayable: 'Rs. 1,370/-' };
    open1BillModal(app.voucherNum, app.testTitle, app.totalPayable);
}

// -------------------------------------------------------------
// 12. SIMULATED FILE DOWNLOAD WITH PROGRESS BAR
// -------------------------------------------------------------
function simulateDownload(fileName, fileSize = '2.4 MB') {
    let existingBanner = document.getElementById('dlProgressBanner');
    if (existingBanner) existingBanner.remove();

    const banner = document.createElement('div');
    banner.id = 'dlProgressBanner';
    banner.className = 'dl-progress-banner';
    banner.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center;">
            <div style="display: flex; align-items: center; gap: 8px;">
                <i class="fa-solid fa-file-pdf" style="color: #e11d48; font-size: 20px;"></i>
                <div>
                    <strong style="font-size: 13px; color: var(--nts-navy); display: block;" id="dlFileName">${fileName}</strong>
                    <span style="font-size: 11px; color: #64748b;" id="dlFileSize">Preparing download (${fileSize})...</span>
                </div>
            </div>
            <span style="font-size: 12px; font-weight: 700; color: var(--nts-gold);" id="dlPercent">0%</span>
        </div>
        <div class="dl-progress-bar-wrap">
            <div class="dl-progress-bar-fill" id="dlBarFill"></div>
        </div>
    `;
    document.body.appendChild(banner);

    const fill = document.getElementById('dlBarFill');
    const pct = document.getElementById('dlPercent');
    const sizeLbl = document.getElementById('dlFileSize');

    let p = 0;
    const interval = setInterval(() => {
        p += Math.floor(Math.random() * 20) + 12;
        if (p >= 100) {
            p = 100;
            clearInterval(interval);
            fill.style.width = '100%';
            pct.textContent = '100%';
            pct.style.color = '#059669';
            sizeLbl.textContent = 'Saved to Downloads folder';
            showToast(`Downloaded: <strong>${fileName}</strong> successfully!`, 'fa-circle-down');
            setTimeout(() => {
                banner.style.opacity = '0';
                banner.style.transform = 'translateY(20px)';
                banner.style.transition = 'all 0.3s ease';
                setTimeout(() => banner.remove(), 300);
            }, 2500);
        } else {
            fill.style.width = `${p}%`;
            pct.textContent = `${p}%`;
            sizeLbl.textContent = `Downloading (${p}% of ${fileSize})...`;
        }
    }, 150);
}

// -------------------------------------------------------------
// 13. ROLL NUMBER SLIP LOOKUP (Printable Admit Card)
// -------------------------------------------------------------
function lookupRollNoSlip() {
    const inputElem = document.getElementById('rollnoCnicInput');
    const rawCnic = (inputElem ? inputElem.value : '').trim();
    const container = document.getElementById('rollnoResultContainer');
    if (!container) return;

    if (!rawCnic) {
        showToast('Please enter your 13-digit CNIC number', 'fa-triangle-exclamation');
        if (inputElem) inputElem.focus();
        return;
    }

    const cnicClean = rawCnic.replace(/[^0-9]/g, '');
    let cnicFormatted = rawCnic;
    if (cnicClean.length === 13) {
        cnicFormatted = `${cnicClean.slice(0, 5)}-${cnicClean.slice(5, 12)}-${cnicClean.slice(12)}`;
    }

    let cand = (typeof ntsData !== 'undefined' && ntsData.candidates) ?
               (ntsData.candidates[rawCnic] || ntsData.candidates[cnicFormatted]) : null;

    if (!cand) {
        const randRoll = 'NTS-2026-' + Math.floor(100000 + Math.random() * 900000);
        cand = {
            cnic: cnicFormatted,
            rollNo: randRoll,
            name: "Muhammad Hamza Khan",
            fatherName: "Tariq Mahmood Khan",
            testName: "National Testing Service - Screening Examination 2026",
            testCenter: "Islamabad Model College / Examination Center #01, Sector H-9, Islamabad",
            testDate: "Sunday, 08th March, 2026",
            reportingTime: "08:30 AM Sharp",
            testTime: "09:30 AM to 11:30 AM"
        };
    }

    container.style.display = 'block';
    container.innerHTML = `
        <div class="official-slip-box official-stamp-watermark">
            <div class="slip-header">
                <div class="slip-title">
                    <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 6px;">
                        <img src="img/nts_logo.svg" alt="NTS Pakistan" style="height: 40px;">
                        <span class="paid-stamp-badge"><i class="fa-solid fa-circle-check"></i> Official Admit Card</span>
                    </div>
                    <h3>ROLL NUMBER SLIP / PROVISIONAL ADMIT CARD</h3>
                    <p>${cand.testName}</p>
                </div>
                <div class="candidate-photo-box">
                    <i class="fa-solid fa-user" style="font-size: 38px; color: #94a3b8; margin-bottom: 5px;"></i>
                    <span>Candidate Photo</span>
                </div>
            </div>

            <table class="slip-meta-table">
                <tr>
                    <td class="label-td">Roll Number:</td>
                    <td style="font-weight: 800; font-size: 16px; color: #002b49;">
                        ${cand.rollNo}
                        <button class="btn btn-xs btn-outline-dark" style="margin-left: 8px; padding: 2px 8px;" onclick="copyText('${cand.rollNo}', 'Roll No')">
                            <i class="fa-regular fa-copy"></i> Copy
                        </button>
                    </td>
                    <td class="label-td">CNIC / Form-B:</td>
                    <td style="font-weight: 700;">${cand.cnic}</td>
                </tr>
                <tr>
                    <td class="label-td">Candidate's Name:</td>
                    <td style="font-weight: 700;">${cand.name}</td>
                    <td class="label-td">Father's Name:</td>
                    <td>${cand.fatherName}</td>
                </tr>
                <tr>
                    <td class="label-td">Test Date:</td>
                    <td style="color: #ef4444; font-weight: 700;">${cand.testDate}</td>
                    <td class="label-td">Reporting Time:</td>
                    <td style="color: #ef4444; font-weight: 700;">${cand.reportingTime}</td>
                </tr>
                <tr>
                    <td class="label-td">Exam Timing:</td>
                    <td>${cand.testTime}</td>
                    <td class="label-td">Verification Barcode:</td>
                    <td><i class="fa-solid fa-barcode" style="font-size: 22px; letter-spacing: 2px;"></i> ${cand.rollNo}</td>
                </tr>
            </table>

            <div class="venue-highlight-box">
                <strong><i class="fa-solid fa-location-dot"></i> Test Center Venue:</strong>
                <p>${cand.testCenter}</p>
            </div>

            <h4 style="font-size: 13.5px; color: #002b49; margin-bottom: 6px;"><i class="fa-solid fa-triangle-exclamation"></i> Mandatory Examination Instructions:</h4>
            <ol class="instructions-list">
                <li>Candidates MUST bring original CNIC / Smart Card / Original Passport along with this printed Roll Number Slip.</li>
                <li>Mobile phones, calculators, smart watches, bags, and electronic recording devices are STRICTLY PROHIBITED inside the hall.</li>
                <li>Bring a blue or black ballpoint pen and a transparent clipboard. Shading bubbles with pencil is prohibited.</li>
                <li>Gates will be closed 30 minutes prior to test time. Late arrivals will not be allowed under any circumstances.</li>
            </ol>

            <div class="slip-actions">
                <button class="btn btn-warning" onclick="window.print()">
                    <i class="fa-solid fa-print"></i> Print Official Roll No. Slip
                </button>
                <button class="btn btn-outline-dark" onclick="simulateDownload('NTS_Provisional_Admit_Card_${cand.rollNo}.pdf', '1.4 MB')">
                    <i class="fa-solid fa-download"></i> Download PDF Admit Card
                </button>
            </div>
        </div>
    `;

    container.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    showToast('Roll Number Slip retrieved and verified!', 'fa-id-card');
}

// -------------------------------------------------------------
// 14. ALL RESULTS & ELECTRONIC SCORE CARD
// -------------------------------------------------------------
function lookupResult() {
    const inputElem = document.getElementById('resultCnicInput');
    const rawInput = (inputElem ? inputElem.value : '').trim();
    const container = document.getElementById('resultCardContainer');
    if (!container) return;

    if (!rawInput) {
        showToast('Please enter your CNIC or Roll Number', 'fa-triangle-exclamation');
        if (inputElem) inputElem.focus();
        return;
    }

    const cnicClean = rawInput.replace(/[^0-9]/g, '');
    let cnicFormatted = rawInput;
    if (cnicClean.length === 13) {
        cnicFormatted = `${cnicClean.slice(0, 5)}-${cnicClean.slice(5, 12)}-${cnicClean.slice(12)}`;
    }

    let cand = (typeof ntsData !== 'undefined' && ntsData.candidates) ?
               (ntsData.candidates[rawInput] || ntsData.candidates[cnicFormatted]) : null;

    if (!cand) {
        cand = {
            cnic: cnicFormatted,
            rollNo: 'NTS-2026-' + Math.floor(100000 + Math.random() * 900000),
            name: "Muhammad Hamza Khan",
            fatherName: "Tariq Mahmood Khan",
            testName: "Graduate Assessment Test (GAT™ General 2026-I)",
            testCenter: "Federal Assessment Center, Sector H-9, Islamabad",
            testDate: "Sunday, 18th January, 2026",
            scores: {
                verbal: { title: "Verbal Reasoning (English)", marks: 32, max: 40 },
                analytical: { title: "Analytical Reasoning", marks: 26, max: 30 },
                quantitative: { title: "Quantitative Reasoning", marks: 24, max: 30 },
                total: 82,
                maxTotal: 100,
                percentile: 94.65,
                status: "QUALIFIED / ELIGIBLE",
                validTill: "18th January, 2028"
            }
        };
    }

    const sc = cand.scores;

    container.style.display = 'block';
    container.innerHTML = `
        <div class="official-slip-box official-stamp-watermark" style="border-color: #059669;">
            <div class="slip-header">
                <div class="slip-title">
                    <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 6px;">
                        <img src="img/nts_logo.svg" alt="NTS Pakistan" style="height: 40px;">
                        <span class="paid-stamp-badge"><i class="fa-solid fa-award"></i> Verified Result</span>
                    </div>
                    <h3 style="color: #047857;"><i class="fa-solid fa-award"></i> OFFICIAL ELECTRONIC RESULT CARD</h3>
                    <p>${cand.testName}</p>
                </div>
                <div style="text-align: right;">
                    <span class="badge-success" style="background: #059669; color: #fff; padding: 6px 14px; border-radius: 4px; font-weight: 700; font-size: 13px;">
                        ${sc.status}
                    </span>
                    <div style="font-size: 11px; color: #64748b; margin-top: 5px;">Score Valid Till: <strong>${sc.validTill}</strong></div>
                </div>
            </div>

            <table class="slip-meta-table">
                <tr>
                    <td class="label-td">Roll Number:</td>
                    <td style="font-weight: 800; font-size: 15px; color: #002b49;">
                        ${cand.rollNo}
                        <button class="btn btn-xs btn-outline-dark" style="margin-left: 8px; padding: 2px 8px;" onclick="copyText('${cand.rollNo}', 'Roll No')">
                            <i class="fa-regular fa-copy"></i>
                        </button>
                    </td>
                    <td class="label-td">CNIC Number:</td>
                    <td style="font-weight: 700;">${cand.cnic}</td>
                </tr>
                <tr>
                    <td class="label-td">Candidate's Name:</td>
                    <td style="font-weight: 700;">${cand.name}</td>
                    <td class="label-td">Father's Name:</td>
                    <td>${cand.fatherName}</td>
                </tr>
            </table>

            <h4 style="font-size: 14px; color: #002b49; margin: 15px 0 8px;"><i class="fa-solid fa-chart-pie"></i> Section-Wise Score Breakdown:</h4>
            <table class="nts-table" style="margin-bottom: 20px;">
                <thead>
                    <tr>
                        <th>Section Title</th>
                        <th style="width: 130px; text-align: center;">Total Marks</th>
                        <th style="width: 130px; text-align: center;">Marks Obtained</th>
                        <th style="width: 140px; text-align: center;">Section %</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><strong>${sc.verbal.title}</strong></td>
                        <td class="text-center">${sc.verbal.max}</td>
                        <td class="text-center" style="font-weight: 700; color: #002b49;">${sc.verbal.marks}</td>
                        <td class="text-center">${((sc.verbal.marks / sc.verbal.max) * 100).toFixed(1)}%</td>
                    </tr>
                    <tr>
                        <td><strong>${sc.analytical.title}</strong></td>
                        <td class="text-center">${sc.analytical.max}</td>
                        <td class="text-center" style="font-weight: 700; color: #002b49;">${sc.analytical.marks}</td>
                        <td class="text-center">${((sc.analytical.marks / sc.analytical.max) * 100).toFixed(1)}%</td>
                    </tr>
                    <tr>
                        <td><strong>${sc.quantitative.title}</strong></td>
                        <td class="text-center">${sc.quantitative.max}</td>
                        <td class="text-center" style="font-weight: 700; color: #002b49;">${sc.quantitative.marks}</td>
                        <td class="text-center">${((sc.quantitative.marks / sc.quantitative.max) * 100).toFixed(1)}%</td>
                    </tr>
                    ${sc.subject ? `
                    <tr>
                        <td><strong>${sc.subject.title}</strong></td>
                        <td class="text-center">${sc.subject.max}</td>
                        <td class="text-center" style="font-weight: 700; color: #002b49;">${sc.subject.marks}</td>
                        <td class="text-center">${((sc.subject.marks / sc.subject.max) * 100).toFixed(1)}%</td>
                    </tr>
                    ` : ''}
                    <tr style="background-color: #ecfdf5; font-size: 15px;">
                        <td><strong>AGGREGATE SCORE</strong></td>
                        <td class="text-center"><strong>${sc.maxTotal}</strong></td>
                        <td class="text-center" style="font-weight: 800; color: #047857; font-size: 17px;">${sc.total}</td>
                        <td class="text-center" style="font-weight: 800; color: #047857;">${sc.percentile}%ile</td>
                    </tr>
                </tbody>
            </table>

            <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; padding: 12px 16px; border-radius: 4px; font-size: 12px; color: #64748b; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px;">
                <span><i class="fa-solid fa-shield-halved" style="color: #059669;"></i> <strong>Verification:</strong> Authenticated electronic score record from NTS central verification server.</span>
                <span>Verification Hash: <strong>#NTS-${cand.rollNo}-OK</strong></span>
            </div>

            <div class="slip-actions">
                <button class="btn btn-warning" onclick="window.print()">
                    <i class="fa-solid fa-print"></i> Print Official Result Card
                </button>
                <button class="btn btn-outline-dark" onclick="simulateDownload('NTS_Result_Card_${cand.rollNo}.pdf', '850 KB')">
                    <i class="fa-solid fa-download"></i> Download Score Card
                </button>
                <button class="btn btn-outline-dark" onclick="openRecheckModal('${cand.rollNo}', '${cand.testName.replace(/'/g, "\\'")}')">
                    <i class="fa-solid fa-file-signature"></i> Apply for Paper Rechecking
                </button>
            </div>
        </div>
    `;

    container.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    showToast('Result Score Card loaded and authenticated!', 'fa-award');
}

// -------------------------------------------------------------
// 15. PAPER RECHECKING APPLICATION MODAL
// -------------------------------------------------------------
function openRecheckModal(rollNo, testName) {
    let modal = document.getElementById('recheckModal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'recheckModal';
        modal.className = 'modal-overlay';
        modal.innerHTML = `
            <div class="modal-box payment-modal-box">
                <div class="pay-modal-header">
                    <h3><i class="fa-solid fa-pen-to-square"></i> Paper Rechecking / Rescan Request</h3>
                    <button class="modal-close-btn" style="color:#fff;" onclick="closeModal('recheckModal')">&times;</button>
                </div>
                <div style="padding: 24px;">
                    <p style="font-size: 13px; color: #475569; margin-bottom: 15px;">
                        Candidates may request physical and optical rescan of their OMR response sheet within 15 days of result declaration.
                    </p>
                    <div style="background: #f8fafc; border: 1px solid var(--border-subtle); border-radius: 6px; padding: 12px; margin-bottom: 15px; font-size: 13px;">
                        <div>Roll Number: <strong id="rchkRoll" style="color: var(--nts-navy);"></strong></div>
                        <div>Test: <strong id="rchkTest"></strong></div>
                        <div style="margin-top: 4px;">Rechecking Fee: <strong>Rs. 500/- (Via 1Bill)</strong></div>
                    </div>

                    <form onsubmit="handleRecheckSubmit(event)">
                        <div class="form-group" style="margin-bottom: 12px;">
                            <label style="font-size: 12.5px; font-weight: 600;">Reason for Objection:</label>
                            <select class="form-control" required>
                                <option value="OMR">OMR Bubble Sheet Recalculation</option>
                                <option value="Marks">Discrepancy in Section Marks vs Carbon Copy</option>
                                <option value="Key">Answer Key Revision Request</option>
                            </select>
                        </div>
                        <div class="form-group" style="margin-bottom: 18px;">
                            <label style="font-size: 12.5px; font-weight: 600;">Candidate Remarks:</label>
                            <textarea class="form-control" rows="3" placeholder="Provide details as matched with your pink carbon sheet..." required></textarea>
                        </div>
                        <button type="submit" class="btn btn-warning btn-block">
                            <i class="fa-solid fa-paper-plane"></i> Submit Rechecking Application
                        </button>
                    </form>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    }

    document.getElementById('rchkRoll').textContent = rollNo;
    document.getElementById('rchkTest').textContent = testName;
    openModal('recheckModal');
}

function handleRecheckSubmit(e) {
    e.preventDefault();
    const randTrack = 'RCHK-2026-' + Math.floor(10000 + Math.random() * 90000);
    closeModal('recheckModal');
    showToast(`Rechecking Application submitted! Tracking ID: <strong>#${randTrack}</strong>. Rescan report will be available in 7 days.`, 'fa-circle-check', 6000);
}

// -------------------------------------------------------------
// 16. CONTACT US / QUERY TICKET SUBMISSION
// -------------------------------------------------------------
function handleQuerySubmit(e) {
    e.preventDefault();
    const randTicket = 'NTS-TK-' + Math.floor(10000 + Math.random() * 90000);

    let modal = document.getElementById('ticketConfirmModal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'ticketConfirmModal';
        modal.className = 'modal-overlay';
        modal.innerHTML = `
            <div class="modal-box payment-modal-box" style="text-align: center;">
                <div class="pay-modal-header" style="justify-content: center;">
                    <h3><i class="fa-solid fa-circle-check" style="color: #10b981;"></i> Query Registered</h3>
                </div>
                <div style="padding: 30px 24px;">
                    <div style="width: 60px; height: 60px; border-radius: 50%; background: #ecfdf5; color: #059669; font-size: 28px; display: flex; align-items: center; justify-content: center; margin: 0 auto 16px;">
                        <i class="fa-solid fa-ticket"></i>
                    </div>
                    <h3 style="font-size: 18px; color: var(--nts-navy); margin-bottom: 6px;">Support Ticket Generated</h3>
                    <p style="font-size: 13px; color: #64748b; margin-bottom: 20px;">
                        Your inquiry has been routed to the NTS Central Candidate Help Desk. Our verification officers will review and reply within 24 to 48 hours.
                    </p>
                    <div style="background: #f8fafc; border: 1px dashed #cbd5e1; padding: 14px; border-radius: 8px; margin-bottom: 24px;">
                        <span style="font-size: 11.5px; color: #64748b; display: block; text-transform: uppercase;">Tracking Ticket Number:</span>
                        <strong style="font-size: 20px; color: var(--nts-navy); font-family: monospace; letter-spacing: 1px;" id="confTicketId"></strong>
                        <div style="margin-top: 8px;">
                            <button class="btn btn-xs btn-outline-dark" onclick="copyText(document.getElementById('confTicketId').textContent, 'Ticket ID')">
                                <i class="fa-regular fa-copy"></i> Copy Ticket ID
                            </button>
                        </div>
                    </div>
                    <button class="btn btn-warning" onclick="closeModal('ticketConfirmModal')">
                        Understood & Return
                    </button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    }

    document.getElementById('confTicketId').textContent = randTicket;
    openModal('ticketConfirmModal');
    showToast(`Support Ticket <strong>#${randTicket}</strong> registered!`, 'fa-circle-check');
    e.target.reset();
}

// -------------------------------------------------------------
// 17. FAQ SEARCH FILTER
// -------------------------------------------------------------
function searchFaq(keyword) {
    const term = (keyword || '').toLowerCase().trim();
    const items = document.querySelectorAll('.accordion-item');

    items.forEach(item => {
        const text = item.textContent.toLowerCase();
        if (text.includes(term)) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}

// -------------------------------------------------------------
// 18. MODAL CONTROLS & KEYBOARD ACCESSIBILITY
// -------------------------------------------------------------
function openModal(id) {
    const modal = document.getElementById(id);
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeModal(id) {
    const modal = document.getElementById(id);
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

window.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal-overlay')) {
        e.target.classList.remove('active');
        document.body.style.overflow = '';
    }
});

function initKeyboardShortcuts() {
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            document.querySelectorAll('.modal-overlay.active').forEach(m => {
                m.classList.remove('active');
            });
            document.body.style.overflow = '';
        }
    });
}

function handlePortalLogin(e) {
    e.preventDefault();
    const cnicInput = document.getElementById('sideLoginCnic') || document.getElementById('loginCnic');
    const cnic = cnicInput ? cnicInput.value : 'Candidate';
    showToast(`Logged in successfully! Redirecting to Candidate Portal...`, 'fa-circle-check');
    setTimeout(() => {
        window.location.href = 'candidate-portal.html';
    }, 800);
}

// -------------------------------------------------------------
// 19. SCROLL TO TOP & ACCORDION
// -------------------------------------------------------------
function initScrollToTop() {
    const btn = document.getElementById('backToTopBtn');
    if (!btn) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            btn.style.display = 'flex';
        } else {
            btn.style.display = 'none';
        }
    });
}

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function toggleFaq(btn) {
    const item = btn.parentElement;
    const content = item.querySelector('.accordion-content');
    const icon = btn.querySelector('i');

    const isOpen = content.style.display === 'block';

    document.querySelectorAll('.accordion-content').forEach(c => c.style.display = 'none');
    document.querySelectorAll('.accordion-btn').forEach(b => {
        b.classList.remove('active');
        const ic = b.querySelector('i');
        if (ic) ic.className = 'fa-solid fa-plus';
    });

    if (!isOpen) {
        content.style.display = 'block';
        btn.classList.add('active');
        if (icon) icon.className = 'fa-solid fa-minus';
    }
}

// -------------------------------------------------------------
// 20. RICH PRODUCT PATTERN, CSR, OFFICE & LEGAL MODALS
// -------------------------------------------------------------
function openProductModal(prodKey) {
    let modal = document.getElementById('productModal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'productModal';
        modal.className = 'modal-overlay';
        modal.innerHTML = `
            <div class="modal-box payment-modal-box" style="max-width: 680px;">
                <div id="productModalBody"></div>
            </div>
        `;
        document.body.appendChild(modal);
    }

    let body = document.getElementById('productModalBody');
    if (!body) {
        modal.innerHTML = `<div class="modal-box payment-modal-box" style="max-width: 680px;"><div id="productModalBody"></div></div>`;
        body = document.getElementById('productModalBody');
    }

    const prods = {
        'NAT': {
            badge: "UNDERGRADUATE ADMISSIONS STANDARD",
            title: "National Aptitude Test (NAT™)",
            projectCode: "NTS-NAT-2026-II",
            pageUrl: "products.html#nat",
            desc: "Pakistan's premier standardized admission test for Intermediate / HSSC / A-Level students applying to bachelor's degree programs in 40+ associated public and private universities.",
            mcqs: "90 MCQs",
            duration: "120 Minutes",
            validity: "1 Full Year",
            fee: "Rs. 1,000/- (1Bill)",
            breakdown: [
                { section: "Verbal Reasoning (English)", count: "20 MCQs", weight: "22.2%" },
                { section: "Analytical Reasoning", count: "20 MCQs", weight: "22.2%" },
                { section: "Quantitative Reasoning (Math)", count: "20 MCQs", weight: "22.2%" },
                { section: "Subject Portion (Pre-Engr / Pre-Med / CS / Arts)", count: "30 MCQs", weight: "33.4%" }
            ],
            note: "No negative marking. Held every calendar month across 30+ major examination centers nationwide."
        },
        'GAT-GEN': {
            badge: "MS / M.PHIL & HEC SCHOLARSHIPS",
            title: "Graduate Assessment Test (GAT™ - General)",
            projectCode: "NTS-GAT-2026-II",
            pageUrl: "products.html#gat-gen",
            desc: "Mandatory standardized evaluation for admissions into MS / M.Phil degree programs and Higher Education Commission (HEC) Indigenous & Overseas scholarship schemes.",
            mcqs: "100 MCQs",
            duration: "120 Minutes",
            validity: "2 Full Years",
            fee: "Rs. 1,350/- (1Bill)",
            breakdown: [
                { section: "Verbal Reasoning (GAT-A / B / C / D)", count: "35 – 50 MCQs", weight: "35% – 50%" },
                { section: "Quantitative Reasoning", count: "20 – 35 MCQs", weight: "20% – 35%" },
                { section: "Analytical Reasoning", count: "25 – 30 MCQs", weight: "25% – 30%" }
            ],
            note: "Minimum 50% cumulative score (50/100) is required by HEC to qualify for MS/M.Phil admission."
        },
        'GAT-SUB': {
            badge: "DOCTORAL (PH.D.) ADMISSIONS",
            title: "Graduate Assessment Test (GAT™ - Subject)",
            projectCode: "NTS-GAT-SUB-2026",
            pageUrl: "products.html#gat-sub",
            desc: "Compulsory discipline-specific examination for candidates seeking admission into Ph.D. programs across Pakistani universities in 28 specialized academic domains.",
            mcqs: "100 MCQs",
            duration: "120 Minutes",
            validity: "2 Full Years",
            fee: "Rs. 1,800/- (1Bill)",
            breakdown: [
                { section: "Core Subject Specialization (Ph.D. Discipline)", count: "70 MCQs", weight: "70%" },
                { section: "English Verbal Reasoning", count: "15 MCQs", weight: "15%" },
                { section: "Analytical Reasoning", count: "15 MCQs", weight: "15%" }
            ],
            note: "Minimum 60% score (60/100) is required by HEC regulations for Ph.D. candidacy."
        },
        'RECRUITMENT': {
            badge: "PUBLIC & CORPORATE MERIT SCREENING",
            title: "Recruitment Screening & Evaluation Tests",
            projectCode: "FBR-INSP-2026",
            pageUrl: "products.html#recruitment",
            desc: "Transparent, biometric-verified screening examinations for Federal Ministries (FBR, WAPDA, PTA), Provincial Education Departments, Autonomous Bodies, and Commercial Banks.",
            mcqs: "100 MCQs",
            duration: "90 – 120 Mins",
            validity: "Project Specific",
            fee: "Rs. 500 – 800/-",
            breakdown: [
                { section: "Post-Related Professional / Technical Subject", count: "40 – 60 MCQs", weight: "40% – 60%" },
                { section: "English Grammar, Vocabulary & Comprehension", count: "20 MCQs", weight: "20%" },
                { section: "Pakistan Studies, Current Affairs & Islamiyat", count: "15 MCQs", weight: "15%" },
                { section: "Quantitative Arithmetic & IQ Battery", count: "15 MCQs", weight: "15%" }
            ],
            note: "Optical Mark Recognition (OMR) scanning with carbon-copy answer sheet handed to candidates for 100% transparency."
        },
        'INTERNATIONAL': {
            badge: "AUTHORIZED GLOBAL ASSESSMENT PARTNER",
            title: "International Assessments (ETS TOEFL® & TOEIC®)",
            projectCode: "NTS-GAT-2026-II",
            pageUrl: "products.html#intl",
            desc: "NTS is the official authorized testing partner in Pakistan for Educational Testing Service (ETS, USA) conducting TOEFL®-ITP, TOEIC® Listening & Reading, and WorkFORCE® evaluations.",
            mcqs: "140 – 200 Items",
            duration: "115 – 120 Mins",
            validity: "2 Years (Global)",
            fee: "Official ETS Tariff",
            breakdown: [
                { section: "Listening Comprehension (Academic & Workplace)", count: "50 – 100 Items", weight: "35% – 50%" },
                { section: "Structure & Written Expression", count: "40 Items", weight: "25%" },
                { section: "Reading Comprehension", count: "50 – 100 Items", weight: "35% – 50%" }
            ],
            note: "Internationally recognized score reports accepted by foreign scholarship donors and multinational employers."
        }
    };

    const p = prods[prodKey] || prods['NAT'];
    const rowsHtml = p.breakdown.map(r => `
        <tr>
            <td style="padding: 8px 12px; border-bottom: 1px solid #e2e8f0; font-weight: 600; color: #1e293b;">${r.section}</td>
            <td style="padding: 8px 12px; border-bottom: 1px solid #e2e8f0; text-align: center;">${r.count}</td>
            <td style="padding: 8px 12px; border-bottom: 1px solid #e2e8f0; text-align: center; font-weight: 700; color: var(--nts-navy);">${r.weight}</td>
        </tr>
    `).join('');

    body.innerHTML = `
        <div class="pay-modal-header">
            <div>
                <span style="font-size: 10.5px; font-weight: 800; letter-spacing: 1px; color: var(--nts-gold-rich); display: block; margin-bottom: 4px;">${p.badge}</span>
                <h3><i class="fa-solid fa-book-open-reader"></i> ${p.title}</h3>
            </div>
            <button class="modal-close-btn" style="color:#fff; position:static;" onclick="closeModal('productModal')">&times;</button>
        </div>
        <div style="padding: 24px; max-height: calc(90vh - 85px); overflow-y: auto;">
            <p style="font-size: 13.5px; color: #334155; line-height: 1.65; margin-bottom: 18px;">${p.desc}</p>

            <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; margin-bottom: 20px;">
                <div style="background: #f8fafc; border: 1px solid #e2e8f0; padding: 10px; border-radius: 6px; text-align: center;">
                    <span style="font-size: 11px; color: #64748b; display: block;">Total Items</span>
                    <strong style="font-size: 13.5px; color: var(--nts-navy);">${p.mcqs}</strong>
                </div>
                <div style="background: #f8fafc; border: 1px solid #e2e8f0; padding: 10px; border-radius: 6px; text-align: center;">
                    <span style="font-size: 11px; color: #64748b; display: block;">Duration</span>
                    <strong style="font-size: 13.5px; color: var(--nts-navy);">${p.duration}</strong>
                </div>
                <div style="background: #f8fafc; border: 1px solid #e2e8f0; padding: 10px; border-radius: 6px; text-align: center;">
                    <span style="font-size: 11px; color: #64748b; display: block;">Score Validity</span>
                    <strong style="font-size: 13.5px; color: #059669;">${p.validity}</strong>
                </div>
                <div style="background: #fefce8; border: 1px solid #fde047; padding: 10px; border-radius: 6px; text-align: center;">
                    <span style="font-size: 11px; color: #854d0e; display: block;">Test Fee</span>
                    <strong style="font-size: 13.5px; color: #b45309;">${p.fee}</strong>
                </div>
            </div>

            <h4 style="font-size: 13.5px; color: var(--nts-navy); margin-bottom: 8px;"><i class="fa-solid fa-layer-group"></i> Official Paper Distribution &amp; Weightage:</h4>
            <table style="width: 100%; border-collapse: collapse; font-size: 12.5px; margin-bottom: 16px; border: 1px solid #e2e8f0;">
                <thead>
                    <tr style="background: #f1f5f9; color: var(--nts-navy);">
                        <th style="padding: 8px 12px; text-align: left;">Assessment Domain / Section</th>
                        <th style="padding: 8px 12px; text-align: center;">Questions</th>
                        <th style="padding: 8px 12px; text-align: center;">Weightage</th>
                    </tr>
                </thead>
                <tbody>${rowsHtml}</tbody>
            </table>

            <div style="background: #ecfdf5; border-left: 4px solid #059669; padding: 10px 14px; border-radius: 4px; font-size: 12px; color: #065f46; margin-bottom: 20px;">
                <i class="fa-solid fa-circle-info"></i> <strong>Examination Rule:</strong> ${p.note}
            </div>

            <div style="display: flex; gap: 10px; justify-content: space-between; align-items: center; flex-wrap: wrap; border-top: 1px solid #e2e8f0; padding-top: 16px;">
                <a href="${p.pageUrl}" class="btn btn-outline-dark btn-xs">
                    <i class="fa-solid fa-arrow-up-right-from-square"></i> Full Product Page
                </a>
                <div style="display: flex; gap: 8px; flex-wrap: wrap;">
                    <button class="btn btn-outline-dark btn-xs" onclick="simulateDownload('${prodKey}_Official_Syllabus_2026.pdf', '2.4 MB')">
                        <i class="fa-solid fa-file-pdf"></i> Download Syllabus PDF
                    </button>
                    <button class="btn btn-warning btn-xs" onclick="closeModal('productModal'); openApplyWizard('${p.projectCode}');">
                        <i class="fa-solid fa-file-signature"></i> Apply Online Now
                    </button>
                </div>
            </div>
        </div>
    `;
    openModal('productModal');
}

function openCsrModal() {
    let modal = document.getElementById('csrModal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'csrModal';
        modal.className = 'modal-overlay';
        document.body.appendChild(modal);
    }

    modal.innerHTML = `
        <div class="modal-box payment-modal-box" style="max-width: 640px;">
            <div class="pay-modal-header">
                <div>
                    <span style="font-size: 10.5px; font-weight: 800; letter-spacing: 1px; color: var(--nts-gold-rich); display: block; margin-bottom: 4px;">CORPORATE SOCIAL RESPONSIBILITY (CSR)</span>
                    <h3><i class="fa-solid fa-hand-holding-heart"></i> 100% Fee Waiver Policy for Special Persons</h3>
                </div>
                <button class="modal-close-btn" style="color:#fff; position:static;" onclick="closeModal('csrModal')">&times;</button>
            </div>
            <div style="padding: 24px; max-height: calc(90vh - 85px); overflow-y: auto;">
                <p style="font-size: 13.5px; color: #334155; line-height: 1.65; margin-bottom: 16px;">
                    Under the National Testing Service Corporate Social Responsibility (CSR) mandate, <strong>100% of the examination fee is waived</strong> for all differently-abled candidates (Special Persons) across every academic, scholarship, and recruitment test.
                </p>
                <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px; margin-bottom: 18px; font-size: 13px; color: #1e293b;">
                    <h4 style="font-size: 14px; color: var(--nts-navy); margin-bottom: 8px;"><i class="fa-solid fa-check-double" style="color: #059669;"></i> Eligibility &amp; Accommodations Included:</h4>
                    <ul style="margin-left: 18px; line-height: 1.75;">
                        <li>Valid NADRA CNIC with the official <strong>Disability Monogram (Wheelchair emblem)</strong> OR PCRDP / Social Welfare Disability Certificate.</li>
                        <li><strong>Zero Application Fee (Rs. 0/-)</strong> — automatic 1Bill exemption upon uploading certificate.</li>
                        <li><strong>Ground-Floor Accessible Halls</strong> &amp; dedicated ramp access at all 30+ regional centers.</li>
                        <li><strong>Official Scribe / Writer Assistance</strong> &amp; 20 minutes extra time for visually impaired candidates.</li>
                    </ul>
                </div>
                <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px; border-top: 1px solid #e2e8f0; padding-top: 16px;">
                    <a href="csr.html" class="btn btn-outline-dark btn-xs">
                        <i class="fa-solid fa-arrow-up-right-from-square"></i> Open Full CSR Page
                    </a>
                    <div style="display: flex; gap: 8px;">
                        <button class="btn btn-outline-dark btn-xs" onclick="simulateDownload('NTS_Special_Persons_Fee_Waiver_Form.pdf', '780 KB')">
                            <i class="fa-solid fa-download"></i> Waiver Proforma PDF
                        </button>
                        <button class="btn btn-warning btn-xs" onclick="closeModal('csrModal'); openApplyWizard('HEC-USAID-SCHOLAR');">
                            <i class="fa-solid fa-file-signature"></i> Apply Under Fee Waiver
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
    openModal('csrModal');
}

function openPaymentGuideChannel(channelName) {
    const apps = getApplications();
    const app = apps.find(a => a.status === 'UNPAID') || apps[0] || {
        voucherNum: '1000847291034',
        testTitle: 'Graduate Assessment Test (GAT™ General)',
        totalPayable: 'Rs. 1,370/-'
    };
    open1BillModal(app.voucherNum, app.testTitle, app.totalPayable);
    setTimeout(() => {
        const opts = document.querySelectorAll('#oneBillModal .channel-opt');
        opts.forEach(opt => {
            if (opt.textContent.toLowerCase().includes(channelName.toLowerCase())) {
                selectChannel(opt, channelName);
            }
        });
    }, 80);
}

function openOfficeModal(cityKey) {
    const offices = {
        'Islamabad': {
            badge: "FEDERAL HEADQUARTERS",
            title: "NTS Head Office — Islamabad",
            address: "Plot # 96, Street # 4, Sector H-8/1, Islamabad, Pakistan",
            phone: "+92-51-844-444-1 (UAN)",
            email: "query@nts.org.pk",
            hours: "Monday – Friday: 08:30 AM to 04:30 PM PKT",
            jurisdiction: "Federal Capital, Rawalpindi Division, AJK & Gilgit-Baltistan"
        },
        'Lahore': {
            badge: "PUNJAB REGIONAL DIRECTORATE",
            title: "NTS Regional Office — Lahore",
            address: "Central Commercial Area, Phase 5, DHA, Lahore, Punjab",
            phone: "+92-42-35755141-3",
            email: "lahore@nts.org.pk",
            hours: "Monday – Friday: 08:30 AM to 04:30 PM PKT",
            jurisdiction: "Central & Southern Punjab Examination Centers"
        },
        'Karachi': {
            badge: "SINDH REGIONAL DIRECTORATE",
            title: "NTS Regional Office — Karachi",
            address: "Block 6, P.E.C.H.S, Main Shahrah-e-Faisal, Karachi, Sindh",
            phone: "+92-21-34546931-2",
            email: "karachi@nts.org.pk",
            hours: "Monday – Friday: 08:30 AM to 04:30 PM PKT",
            jurisdiction: "Karachi, Hyderabad, Sukkur & Interior Sindh Centers"
        },
        'Peshawar': {
            badge: "KPK REGIONAL DIRECTORATE",
            title: "NTS Regional Office — Peshawar",
            address: "Sector B-2, Phase 5, Hayatabad, Peshawar, Khyber Pakhtunkhwa",
            phone: "+92-91-5861616",
            email: "peshawar@nts.org.pk",
            hours: "Monday – Friday: 08:30 AM to 04:30 PM PKT",
            jurisdiction: "Peshawar, Mardan, Abbottabad, Swat & D.I. Khan Centers"
        },
        'Quetta': {
            badge: "BALOCHISTAN REGIONAL DIRECTORATE",
            title: "NTS Regional Office — Quetta",
            address: "Samungli Road, Near Chaman Housing Scheme, Quetta, Balochistan",
            phone: "+92-81-2821102",
            email: "quetta@nts.org.pk",
            hours: "Monday – Friday: 08:30 AM to 04:30 PM PKT",
            jurisdiction: "Quetta, Khuzdar, Turbat, Gwadar & Loralai Centers"
        }
    };

    const info = offices[cityKey] || offices['Islamabad'];
    let modal = document.getElementById('officeDetailModal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'officeDetailModal';
        modal.className = 'modal-overlay';
        document.body.appendChild(modal);
    }

    modal.innerHTML = `
        <div class="modal-box payment-modal-box" style="max-width: 560px;">
            <div class="pay-modal-header">
                <div>
                    <span style="font-size: 10px; font-weight: 800; letter-spacing: 1px; color: var(--nts-gold-rich); display: block; margin-bottom: 3px;">${info.badge}</span>
                    <h3><i class="fa-solid fa-building-columns"></i> ${info.title}</h3>
                </div>
                <button class="modal-close-btn" style="color:#fff; position:static;" onclick="closeModal('officeDetailModal')">&times;</button>
            </div>
            <div style="padding: 24px;">
                <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px; margin-bottom: 18px; font-size: 13px; line-height: 1.8;">
                    <div><i class="fa-solid fa-location-dot" style="color: var(--nts-gold-hover); width: 20px;"></i> <strong>Address:</strong> ${info.address}</div>
                    <div><i class="fa-solid fa-phone" style="color: var(--nts-gold-hover); width: 20px;"></i> <strong>Helpline:</strong> ${info.phone}</div>
                    <div><i class="fa-solid fa-envelope" style="color: var(--nts-gold-hover); width: 20px;"></i> <strong>Official Email:</strong> ${info.email}</div>
                    <div><i class="fa-solid fa-clock" style="color: var(--nts-gold-hover); width: 20px;"></i> <strong>Facilitation Hours:</strong> ${info.hours}</div>
                    <div><i class="fa-solid fa-map" style="color: var(--nts-gold-hover); width: 20px;"></i> <strong>Jurisdiction:</strong> ${info.jurisdiction}</div>
                </div>
                <div style="display: flex; justify-content: space-between; align-items: center; gap: 10px; flex-wrap: wrap;">
                    <button class="btn btn-outline-dark btn-xs" onclick="copyText('${info.address} | Tel: ${info.phone}', 'Office Details')">
                        <i class="fa-regular fa-copy"></i> Copy Address &amp; Phone
                    </button>
                    <a href="contact.html" class="btn btn-warning btn-xs">
                        <i class="fa-solid fa-paper-plane"></i> Submit Query to ${cityKey} Desk
                    </a>
                </div>
            </div>
        </div>
    `;
    openModal('officeDetailModal');
}

function openLegalModal(docType) {
    const docs = {
        'terms': {
            title: "Terms of Service & Candidate Code of Conduct",
            content: `
                <p><strong>1. Candidate Authenticity:</strong> Every applicant registering on the National Testing Service – Pakistan (NTS™) portal must provide accurate personal and academic records matching their NADRA CNIC and verified matriculation/degree certificates.</p>
                <p><strong>2. Fee Deposit Policy:</strong> Examination fees deposited via 1Link 1Bill channels are strictly non-refundable and non-transferable to another testing series or candidate.</p>
                <p><strong>3. Examination Hall Integrity:</strong> Possession of mobile phones, smart watches, Bluetooth devices, calculators, or weapon replicas inside any designated examination venue leads to immediate disqualification and a 3-year debarment.</p>
            `
        },
        'privacy': {
            title: "Data Protection & Candidate Privacy Policy",
            content: `
                <p><strong>1. ISO 27001 Data Security:</strong> Candidate CNIC numbers, photographs, academic transcripts, and contact records are encrypted and stored solely for examination administration and merit verification.</p>
                <p><strong>2. Institutional Sharing:</strong> Score reports and merit lists are shared exclusively with the respective admitting university or recruiting ministry/organization for which the candidate applied.</p>
                <p><strong>3. Zero Commercial Disclosure:</strong> NTS never sells, rents, or discloses candidate personal records or mobile numbers to third-party marketing agencies.</p>
            `
        },
        'disclaimer': {
            title: "Official Examination & Recruitment Disclaimer",
            content: `
                <p><strong>1. Role of Testing Agency:</strong> National Testing Service – Pakistan (NTS™) acts solely as an independent, merit-based assessment and screening body. Final selection, appointment letters, or admission offers rest exclusively with the client organization or university.</p>
                <p><strong>2. Official Communication:</strong> All official announcements, Roll Number Slips, and Results are published exclusively on this portal. Candidates are advised to beware of unauthorized preparatory academies claiming affiliation with NTS.</p>
            `
        }
    };

    const d = docs[docType] || docs['terms'];
    let modal = document.getElementById('legalInfoModal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'legalInfoModal';
        modal.className = 'modal-overlay';
        document.body.appendChild(modal);
    }

    modal.innerHTML = `
        <div class="modal-box payment-modal-box" style="max-width: 580px;">
            <div class="pay-modal-header">
                <h3><i class="fa-solid fa-scale-balanced"></i> ${d.title}</h3>
                <button class="modal-close-btn" style="color:#fff; position:static;" onclick="closeModal('legalInfoModal')">&times;</button>
            </div>
            <div style="padding: 24px; font-size: 13.5px; color: #334155; line-height: 1.75; display: flex; flex-direction: column; gap: 12px;">
                ${d.content}
                <div style="text-align: right; margin-top: 12px; border-top: 1px solid #e2e8f0; padding-top: 14px;">
                    <button class="btn btn-primary btn-xs" onclick="closeModal('legalInfoModal')">Understood &amp; Close</button>
                </div>
            </div>
        </div>
    `;
    openModal('legalInfoModal');
}
