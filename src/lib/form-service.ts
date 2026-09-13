type FormEnhancerOptions = {
    endpoint?: string;
    successMessage: string;
    startedEventName: string;
    submittedEventName: string;
    statusSelector: string;
    errorSelector: string;
    buttonSelector: string;
    resetOnSuccess?: boolean;
};

type AnalyticsWindow = Window & {
    gtag?: (command: string, eventName: string, params?: Record<string, unknown>) => void;
    dataLayer?: unknown[];
};

const trackEvent = (eventName: string, params: Record<string, unknown> = {}) => {
    const analyticsWindow = window as AnalyticsWindow;
    analyticsWindow.gtag?.('event', eventName, params);
    window.dispatchEvent(new CustomEvent('wright2:analytics', { detail: { eventName, params } }));
};

const serializeForm = (form: HTMLFormElement) => new FormData(form);

const clearErrors = (form: HTMLFormElement) => {
    for (const field of Array.from(form.elements)) {
        if (!(field instanceof HTMLInputElement || field instanceof HTMLSelectElement || field instanceof HTMLTextAreaElement)) {
            continue;
        }

        field.removeAttribute('aria-invalid');
        const errorNode = form.querySelector<HTMLElement>(`[data-error-for="${field.name}"]`);
        if (errorNode) {
            errorNode.textContent = '';
        }
    }
};

const renderValidationErrors = (form: HTMLFormElement, errorSelector: string) => {
    const errors: string[] = [];

    for (const field of Array.from(form.elements)) {
        if (!(field instanceof HTMLInputElement || field instanceof HTMLSelectElement || field instanceof HTMLTextAreaElement)) {
            continue;
        }

        if (field.checkValidity()) {
            continue;
        }

        field.setAttribute('aria-invalid', 'true');
        const message = field.validationMessage || 'Please review this field.';
        const label = form.querySelector<HTMLLabelElement>(`label[for="${field.id}"]`);
        const labelText = label?.textContent?.trim() || field.name;
        const errorNode = form.querySelector<HTMLElement>(`[data-error-for="${field.name}"]`);

        if (errorNode) {
            errorNode.textContent = message;
        }

        errors.push(`${labelText}: ${message}`);
    }

    const errorContainer = form.querySelector<HTMLElement>(errorSelector);
    if (!errorContainer) {
        return errors.length === 0;
    }

    if (errors.length === 0) {
        errorContainer.hidden = true;
        errorContainer.innerHTML = '';
        return true;
    }

    errorContainer.hidden = false;
    errorContainer.innerHTML = `<p>Please correct the following before submitting:</p><ul>${errors
        .map((error) => `<li>${error}</li>`)
        .join('')}</ul>`;
    errorContainer.focus();

    return false;
};

const submitToEndpoint = async (endpoint: string | undefined, payload: FormData) => {
    if (!endpoint) {
        await new Promise((resolve) => window.setTimeout(resolve, 900));
        return { ok: true };
    }

    const response = await fetch(endpoint, {
        method: 'POST',
        body: payload,
		signal: AbortSignal.timeout(30000),
    });

    if (!response.ok) {
        throw new Error('Submission failed.');
    }

    return response;
};

export const enhanceForm = (form: HTMLFormElement, options: FormEnhancerOptions) => {
    let started = false;
    const statusNode = form.querySelector<HTMLElement>(options.statusSelector);
    const submitButton = form.querySelector<HTMLButtonElement>(options.buttonSelector);
    const buttonLabel = submitButton?.querySelector<HTMLElement>('[data-submit-label]');
    const initialButtonText = buttonLabel?.textContent ?? submitButton?.textContent ?? 'Submit';

    form.addEventListener(
        'focusin',
        () => {
            if (started) {
                return;
            }

            started = true;
            trackEvent(options.startedEventName);
        },
        { once: true },
    );

    form.addEventListener('input', (event) => {
        const target = event.target;
        if (!(target instanceof HTMLInputElement || target instanceof HTMLSelectElement || target instanceof HTMLTextAreaElement)) {
            return;
        }

        target.removeAttribute('aria-invalid');
        const errorNode = form.querySelector<HTMLElement>(`[data-error-for="${target.name}"]`);
        if (errorNode) {
            errorNode.textContent = '';
        }
    });

    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        clearErrors(form);

        if (!renderValidationErrors(form, options.errorSelector)) {
            statusNode?.setAttribute('data-status', 'error');
            if (statusNode) {
                statusNode.hidden = false;
                statusNode.textContent = 'Please correct the highlighted fields and try again.';
            }
            return;
        }

        if ((form.querySelector<HTMLInputElement>('input[name="website"]')?.value ?? '').trim()) {
            return;
        }

        form.setAttribute('aria-busy', 'true');
        if (submitButton) {
            submitButton.disabled = true;
        }
        if (buttonLabel) {
            buttonLabel.textContent = 'Submitting...';
        }
        if (statusNode) {
            statusNode.hidden = false;
            statusNode.setAttribute('data-status', 'loading');
            statusNode.textContent = 'Submitting your information...';
        }

        try {
            const payload = serializeForm(form);
            await submitToEndpoint(options.endpoint, payload);
            trackEvent(options.submittedEventName);

            if (statusNode) {
                statusNode.setAttribute('data-status', 'success');
                statusNode.textContent = options.successMessage;
            }

            if (options.resetOnSuccess) {
                form.reset();
            }
        } catch (error) {
            if (statusNode) {
                statusNode.setAttribute('data-status', 'error');
                statusNode.textContent = 'We could not submit the form right now. Please try again or contact us directly.';
            }
            console.error(error);
        } finally {
            form.removeAttribute('aria-busy');
            if (submitButton) {
                submitButton.disabled = false;
            }
            if (buttonLabel) {
                buttonLabel.textContent = initialButtonText;
            }
        }
    });
};