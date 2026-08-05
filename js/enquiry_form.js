/**
 * R.A. Bhageria Educational Academy
 * Enquiry Form - Validation & Functionality
 */

document.addEventListener('DOMContentLoaded', function() {
    // ========== DOM ELEMENTS ==========
    const form = document.getElementById('inquiryForm');
    const submitBtn = document.getElementById('submitBtn');
    const clearBtn = document.getElementById('clearBtn');
    const formStatus = document.getElementById('formStatus');
    
    // Form Fields
    const enquiryDate = document.getElementById('enquiryDate');
    const enquiryNumber = document.getElementById('enquiryNumber');
    const sourceOfEnquiry = document.getElementById('sourceOfEnquiry');
    const socialMediaRow = document.getElementById('socialMediaRow');
    const socialMediaPlatform = document.getElementById('socialMediaPlatform');
    const referenceName = document.getElementById('referenceName');
    const referenceRow = document.getElementById('referenceRow');
    const firstName = document.getElementById('firstName');
    const lastName = document.getElementById('lastName');
    const dob = document.getElementById('dob');
    const ageDisplay = document.getElementById('ageDisplay');
    const gender = document.getElementById('gender');
    const selectClass = document.getElementById('selectClass');
    const fatherName = document.getElementById('fatherName');
    const fatherMobile = document.getElementById('fatherMobile');
    const fatherEmail = document.getElementById('fatherEmail');
    const motherName = document.getElementById('motherName');
    const motherMobile = document.getElementById('motherMobile');
    const motherEmail = document.getElementById('motherEmail');
    const address = document.getElementById('address');
    const city = document.getElementById('city');
    const state = document.getElementById('state');
    const pincode = document.getElementById('pincode');
    const country = document.getElementById('country');
    const previousSchool = document.getElementById('previousSchool');
    const previousBoard = document.getElementById('previousBoard');
    const mediumOfInstruction = document.getElementById('mediumOfInstruction');
    
    // ========== ENQUIRY NUMBER MANAGEMENT (Starts from 1 per year, 5-digit format) ==========
    function getNextEnquiryNumber() {
        const currentYear = new Date().getFullYear();
        let storedData = localStorage.getItem('enquiryCounter');
        let currentCounter = 1;
        
        if (storedData) {
            try {
                const parsedData = JSON.parse(storedData);
                if (parsedData.year === currentYear) {
                    currentCounter = parsedData.counter + 1;
                } else {
                    currentCounter = 1;
                }
            } catch (e) {
                currentCounter = 1;
            }
        }
        
        // Store the new counter
        localStorage.setItem('enquiryCounter', JSON.stringify({
            year: currentYear,
            counter: currentCounter
        }));
        
        return `ENQ/${currentYear}/${currentCounter.toString().padStart(5, '0')}`;
    }
    
    // Get current enquiry number without incrementing
    function getCurrentEnquiryNumber() {
        const currentYear = new Date().getFullYear();
        let storedData = localStorage.getItem('enquiryCounter');
        let currentCounter = 1;
        
        if (storedData) {
            try {
                const parsedData = JSON.parse(storedData);
                if (parsedData.year === currentYear) {
                    currentCounter = parsedData.counter;
                }
            } catch (e) {
                currentCounter = 1;
            }
        }
        
        return `ENQ/${currentYear}/${currentCounter.toString().padStart(5, '0')}`;
    }
    
    // Reset enquiry number on year change
    function checkYearAndReset() {
        const currentYear = new Date().getFullYear();
        let storedData = localStorage.getItem('enquiryCounter');
        
        if (storedData) {
            try {
                const parsedData = JSON.parse(storedData);
                if (parsedData.year !== currentYear) {
                    localStorage.setItem('enquiryCounter', JSON.stringify({
                        year: currentYear,
                        counter: 1
                    }));
                }
            } catch (e) {
                localStorage.setItem('enquiryCounter', JSON.stringify({
                    year: currentYear,
                    counter: 1
                }));
            }
        } else {
            localStorage.setItem('enquiryCounter', JSON.stringify({
                year: currentYear,
                counter: 1
            }));
        }
    }
    
    // ========== HELPER FUNCTIONS ==========
    
    // Calculate Age from DOB
    function calculateAge(dateOfBirth) {
        const birthDate = new Date(dateOfBirth);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    }
    
    // Show Error Message
    function showError(elementId, message) {
        const errorElement = document.getElementById(elementId);
        const inputElement = document.getElementById(elementId.replace('Error', ''));
        
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.classList.add('show');
        }
        if (inputElement) {
            inputElement.classList.add('error');
        }
    }
    
    // Hide Error Message
    function hideError(elementId) {
        const errorElement = document.getElementById(elementId);
        const inputElement = document.getElementById(elementId.replace('Error', ''));
        
        if (errorElement) {
            errorElement.classList.remove('show');
        }
        if (inputElement) {
            inputElement.classList.remove('error');
        }
    }
    
    // Show Form Status
    function showStatus(message, type) {
        if (formStatus) {
            formStatus.textContent = message;
            formStatus.className = `form-status ${type}`;
            setTimeout(() => {
                if (formStatus) {
                    formStatus.className = 'form-status';
                    formStatus.textContent = '';
                }
            }, 5000);
        }
    }
    
    // ========== VALIDATION FUNCTIONS ==========
    
    // Validate Name (letters and spaces only)
    function validateName(value, fieldId) {
        const regex = /^[A-Za-z\s]{2,100}$/;
        const isValid = value && regex.test(value.trim());
        
        if (!isValid) {
            showError(fieldId, 'Name should contain only letters and spaces (2-100 characters)');
        } else {
            hideError(fieldId);
        }
        return isValid;
    }
    
    // Validate Mobile (10-digit Indian number)
    function validateMobile(value, fieldId, isRequired = true) {
        const regex = /^[6-9]\d{9}$/;
        if (!isRequired && (!value || value === '')) {
            hideError(fieldId);
            return true;
        }
        const isValid = value && regex.test(value);
        
        if (!isValid) {
            showError(fieldId, 'Please enter a valid 10-digit mobile number starting with 6-9');
        } else {
            hideError(fieldId);
        }
        return isValid;
    }
    
    // Validate Email
    function validateEmail(value, fieldId, isRequired = true) {
        const regex = /^[^\s@]+@([^\s@]+\.)+[^\s@]+$/;
        if (!isRequired && (!value || value === '')) {
            hideError(fieldId);
            return true;
        }
        const isValid = value && regex.test(value);
        
        if (!isValid) {
            showError(fieldId, 'Please enter a valid email address');
        } else {
            hideError(fieldId);
        }
        return isValid;
    }
    
    // Validate Date
    function validateDate(value, fieldId, allowFuture = false) {
        if (!value) {
            showError(fieldId, 'This field is required');
            return false;
        }
        
        const selectedDate = new Date(value);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        if (!allowFuture && selectedDate > today) {
            showError(fieldId, 'Date cannot be in the future');
            return false;
        }
        
        hideError(fieldId);
        return true;
    }
    
    // Validate Age (3-25 years)
    function validateAge(value) {
        if (!value) {
            showError('dobError', 'Date of birth is required');
            return false;
        }
        
        const age = calculateAge(value);
        const isValid = age >= 3 && age <= 25;
        
        if (!isValid) {
            showError('dobError', `Age must be between 3 and 25 years (Current: ${age} years)`);
        } else {
            hideError('dobError');
            if (ageDisplay) {
                ageDisplay.value = `${age} years`;
            }
        }
        return isValid;
    }
    
    // Validate Pincode (6 digits)
    function validatePincode(value, fieldId) {
        const regex = /^\d{6}$/;
        const isValid = value && regex.test(value);
        
        if (!isValid) {
            showError(fieldId, 'Please enter a valid 6-digit pincode');
        } else {
            hideError(fieldId);
        }
        return isValid;
    }
    
    // Validate Required Field
    function validateRequired(value, fieldId, message) {
        const isValid = value && value.trim() !== '';
        
        if (!isValid) {
            showError(fieldId, message || 'This field is required');
        } else {
            hideError(fieldId);
        }
        return isValid;
    }
    
    // Validate Gender Dropdown
    function validateGenderSelect() {
        const value = gender?.value;
        const isValid = value && value !== '';
        
        if (!isValid) {
            showError('genderError', 'Please select gender');
        } else {
            hideError('genderError');
        }
        return isValid;
    }
    
    // Validate Social Media Platform
    function validateSocialMediaPlatform() {
        if (sourceOfEnquiry?.value === 'Social Media') {
            const value = socialMediaPlatform?.value;
            const isValid = value && value !== '';
            
            if (!isValid) {
                showError('socialMediaPlatformError', 'Please select social media platform');
                return false;
            } else {
                hideError('socialMediaPlatformError');
                return true;
            }
        }
        return true;
    }
    
    // ========== MAIN FORM VALIDATION ==========
    function validateForm() {
        let isValid = true;
        
        // Enquiry Details
        isValid = validateDate(enquiryDate?.value, 'enquiryDateError') && isValid;
        isValid = validateRequired(sourceOfEnquiry?.value, 'sourceOfEnquiryError', 'Please select source of enquiry') && isValid;
        
        // Validate Social Media Platform if Social Media selected
        if (sourceOfEnquiry?.value === 'Social Media') {
            isValid = validateSocialMediaPlatform() && isValid;
        }
        
        if (sourceOfEnquiry?.value === 'Reference') {
            isValid = validateRequired(referenceName?.value, 'referenceNameError', 'Please enter reference name') && isValid;
        }
        
        // Student Details
        isValid = validateName(firstName?.value, 'firstNameError') && isValid;
        isValid = validateName(lastName?.value, 'lastNameError') && isValid;
        isValid = validateAge(dob?.value) && isValid;
        isValid = validateGenderSelect() && isValid;
        isValid = validateRequired(selectClass?.value, 'selectClassError', 'Please select class') && isValid;
        
        // Parent Details
        isValid = validateName(fatherName?.value, 'fatherNameError') && isValid;
        isValid = validateMobile(fatherMobile?.value, 'fatherMobileError', true) && isValid;
        isValid = validateEmail(fatherEmail?.value, 'fatherEmailError', true) && isValid;
        isValid = validateName(motherName?.value, 'motherNameError') && isValid;
        
        // Optional Parent Details
        if (motherMobile?.value) {
            isValid = validateMobile(motherMobile?.value, 'motherMobileError', true) && isValid;
        }
        if (motherEmail?.value) {
            isValid = validateEmail(motherEmail?.value, 'motherEmailError', true) && isValid;
        }
        
        // Address
        isValid = validateRequired(address?.value, 'addressError', 'Address is required') && isValid;
        isValid = validateRequired(city?.value, 'cityError', 'City is required') && isValid;
        isValid = validateRequired(state?.value, 'stateError', 'State is required') && isValid;
        isValid = validatePincode(pincode?.value, 'pincodeError') && isValid;
        isValid = validateRequired(country?.value, 'countryError', 'Country is required') && isValid;
        
        return isValid;
    }
    
    // ========== FORM RESET ==========
    function resetForm() {
        form?.reset();
        
        // Reset default values
        if (enquiryDate) {
            const today = new Date().toISOString().split('T')[0];
            enquiryDate.value = today;
            enquiryDate.max = today;
        }
        if (enquiryNumber) enquiryNumber.value = getCurrentEnquiryNumber();
        if (country) country.value = 'India';
        
        // Reset gender dropdown
        if (gender) gender.value = '';
        
        // Hide conditional rows
        if (socialMediaRow) socialMediaRow.style.display = 'none';
        if (referenceRow) referenceRow.style.display = 'none';
        
        // Clear age display
        if (ageDisplay) ageDisplay.value = '';
        
        // Clear all errors
        document.querySelectorAll('.error-msg').forEach(el => el.classList.remove('show'));
        document.querySelectorAll('.error').forEach(el => el.classList.remove('error'));
        
        showStatus('Form has been cleared', 'success');
    }
    
    // ========== FORM SUBMISSION ==========
    async function submitFormData(formData) {
        try {
            // Replace with your actual API endpoint
            const response = await fetch('/api/enquiries', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });
            
            if (response.ok) {
                showStatus('Enquiry submitted successfully! We will contact you soon.', 'success');
                // After successful submission, increment the counter for next enquiry
                getNextEnquiryNumber();
                resetForm();
                // Update the enquiry number to the new one after reset
                if (enquiryNumber) enquiryNumber.value = getCurrentEnquiryNumber();
                return true;
            } else {
                throw new Error('Server error');
            }
        } catch (error) {
            console.error('Submission error:', error);
            showStatus('Failed to submit enquiry. Please try again later.', 'error');
            return false;
        }
    }
    
    async function handleSubmit(e) {
        e.preventDefault();
        
        if (!validateForm()) {
            showStatus('Please fill all required fields correctly.', 'error');
            const firstError = document.querySelector('.error');
            if (firstError) {
                firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
            return;
        }
        
        // Show loading state
        if (submitBtn) {
            submitBtn.classList.add('loading');
            submitBtn.textContent = 'Submitting...';
        }
        showStatus('Submitting your enquiry...', 'loading');
        
        // Collect form data
        const formData = {
            enquiryDate: enquiryDate?.value,
            enquiryNumber: enquiryNumber?.value,
            sourceOfEnquiry: sourceOfEnquiry?.value,
            socialMediaPlatform: (sourceOfEnquiry?.value === 'Social Media') ? socialMediaPlatform?.value : null,
            referenceName: referenceName?.value,
            status: 'New',
            firstName: firstName?.value,
            middleName: document.getElementById('middleName')?.value,
            lastName: lastName?.value,
            dob: dob?.value,
            gender: gender?.value,
            selectClass: selectClass?.value,
            previousSchool: previousSchool?.value,
            previousBoard: previousBoard?.value,
            mediumOfInstruction: mediumOfInstruction?.value,
            fatherName: fatherName?.value,
            fatherMobile: fatherMobile?.value,
            fatherEmail: fatherEmail?.value,
            motherName: motherName?.value,
            motherMobile: motherMobile?.value,
            motherEmail: motherEmail?.value,
            address: address?.value,
            city: city?.value,
            state: state?.value,
            pincode: pincode?.value,
            country: country?.value
        };
        
        await submitFormData(formData);
        
        // Reset button state
        if (submitBtn) {
            submitBtn.classList.remove('loading');
            submitBtn.textContent = 'Submit Enquiry';
        }
    }
    
    // ========== EVENT LISTENERS ==========
    
    // Initialize form with default values
    function initializeForm() {
        const today = new Date().toISOString().split('T')[0];
        if (enquiryDate) {
            enquiryDate.value = today;
            enquiryDate.max = today;
        }
        
        // Check and reset counter if year changed
        checkYearAndReset();
        
        if (enquiryNumber) enquiryNumber.value = getCurrentEnquiryNumber();
        if (country) country.value = 'India';
        
        // Set DOB min and max dates
        if (dob) {
            const todayDate = new Date();
            const minDate = new Date(todayDate.getFullYear() - 25, todayDate.getMonth(), todayDate.getDate());
            const maxDate = new Date(todayDate.getFullYear() - 3, todayDate.getMonth(), todayDate.getDate());
            dob.min = minDate.toISOString().split('T')[0];
            dob.max = maxDate.toISOString().split('T')[0];
        }
    }
    
    // Show/hide social media platform field
    if (sourceOfEnquiry) {
        sourceOfEnquiry.addEventListener('change', function() {
            // Handle Social Media
            if (this.value === 'Social Media') {
                if (socialMediaRow) socialMediaRow.style.display = 'flex';
            } else {
                if (socialMediaRow) socialMediaRow.style.display = 'none';
                if (socialMediaPlatform) socialMediaPlatform.value = '';
                hideError('socialMediaPlatformError');
            }
            
            // Handle Reference
            if (this.value === 'Reference') {
                if (referenceRow) referenceRow.style.display = 'flex';
            } else {
                if (referenceRow) referenceRow.style.display = 'none';
                if (referenceName) referenceName.value = '';
                hideError('referenceNameError');
            }
        });
    }
    
    // Auto-calculate age on DOB change
    if (dob) {
        dob.addEventListener('change', function() {
            if (this.value) {
                const age = calculateAge(this.value);
                if (ageDisplay) ageDisplay.value = `${age} years`;
                validateAge(this.value);
            } else {
                if (ageDisplay) ageDisplay.value = '';
            }
        });
    }
    
    // Live validation on input
    const liveValidationFields = [
        { element: firstName, fieldId: 'firstNameError', type: 'name' },
        { element: lastName, fieldId: 'lastNameError', type: 'name' },
        { element: fatherName, fieldId: 'fatherNameError', type: 'name' },
        { element: motherName, fieldId: 'motherNameError', type: 'name' },
        { element: fatherMobile, fieldId: 'fatherMobileError', type: 'mobile' },
        { element: motherMobile, fieldId: 'motherMobileError', type: 'mobileOptional' },
        { element: fatherEmail, fieldId: 'fatherEmailError', type: 'email' },
        { element: motherEmail, fieldId: 'motherEmailError', type: 'emailOptional' },
        { element: pincode, fieldId: 'pincodeError', type: 'pincode' },
        { element: city, fieldId: 'cityError', type: 'required' },
        { element: state, fieldId: 'stateError', type: 'required' },
        { element: country, fieldId: 'countryError', type: 'required' },
        { element: address, fieldId: 'addressError', type: 'required' },
        { element: selectClass, fieldId: 'selectClassError', type: 'required' },
        { element: sourceOfEnquiry, fieldId: 'sourceOfEnquiryError', type: 'required' },
        { element: gender, fieldId: 'genderError', type: 'gender' },
        { element: socialMediaPlatform, fieldId: 'socialMediaPlatformError', type: 'socialMedia' }
    ];
    
    liveValidationFields.forEach(field => {
        if (field.element) {
            field.element.addEventListener('input', () => {
                if (field.type === 'name') validateName(field.element.value, field.fieldId);
                else if (field.type === 'mobile') validateMobile(field.element.value, field.fieldId, true);
                else if (field.type === 'mobileOptional') validateMobile(field.element.value, field.fieldId, false);
                else if (field.type === 'email') validateEmail(field.element.value, field.fieldId, true);
                else if (field.type === 'emailOptional') validateEmail(field.element.value, field.fieldId, false);
                else if (field.type === 'pincode') validatePincode(field.element.value, field.fieldId);
                else if (field.type === 'required') validateRequired(field.element.value, field.fieldId);
                else if (field.type === 'gender') validateGenderSelect();
                else if (field.type === 'socialMedia') {
                    if (sourceOfEnquiry?.value === 'Social Media') {
                        validateSocialMediaPlatform();
                    }
                }
            });
            
            field.element.addEventListener('blur', () => {
                if (field.type === 'name') validateName(field.element.value, field.fieldId);
                else if (field.type === 'mobile') validateMobile(field.element.value, field.fieldId, true);
                else if (field.type === 'mobileOptional') validateMobile(field.element.value, field.fieldId, false);
                else if (field.type === 'email') validateEmail(field.element.value, field.fieldId, true);
                else if (field.type === 'emailOptional') validateEmail(field.element.value, field.fieldId, false);
                else if (field.type === 'pincode') validatePincode(field.element.value, field.fieldId);
                else if (field.type === 'required') validateRequired(field.element.value, field.fieldId);
                else if (field.type === 'gender') validateGenderSelect();
                else if (field.type === 'socialMedia') {
                    if (sourceOfEnquiry?.value === 'Social Media') {
                        validateSocialMediaPlatform();
                    }
                }
            });
        }
    });
    
    // ========== NAVIGATION MENU (Mobile) ==========
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const dropdownLinks = document.querySelectorAll('.dropdown > a');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
    
    dropdownLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            if (window.innerWidth <= 992) {
                e.preventDefault();
                link.parentElement.classList.toggle('active');
            }
        });
    });
    
    document.querySelectorAll('.main-nav a').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 992 && !link.parentElement.classList.contains('dropdown')) {
                if (navMenu) navMenu.classList.remove('active');
                if (hamburger) hamburger.classList.remove('active');
            }
        });
    });
    
    // ========== BACK TO TOP BUTTON ==========
    const backToTop = document.getElementById('backToTop');
    if (backToTop) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTop.classList.add('show');
            } else {
                backToTop.classList.remove('show');
            }
        });
        
        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
    
    // ========== FORM EVENT LISTENERS ==========
    if (form) {
        form.addEventListener('submit', handleSubmit);
    }
    
    if (clearBtn) {
        clearBtn.addEventListener('click', resetForm);
    }
    
    // Initialize form
    initializeForm();
});