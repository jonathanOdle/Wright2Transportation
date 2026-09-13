export type NavItem = {
    href: string;
    label: string;
    highlight?: boolean;
};

export type FeatureItem = {
    title: string;
    body: string;
    eyebrow?: string;
    href?: string;
    ctaLabel?: string;
};

export type ContactLink = {
    label: string;
    href: string;
};

export type DriverBenefit = {
    label: string;
    value: string;
    note?: string;
};

export type DriverRequirement = {
    label: string;
    note?: string;
};

export type EquipmentSpec = {
    title: string;
    description: string;
    specs?: Array<{ label: string; value: string }>;
};

export const company = {
    name: 'Wright 2 Transportation',
    tagline: 'Driving a Stronger Tomorrow',
    primaryMarket: 'Texas',
    focus: 'Dry bulk transportation with a focus on fly ash and concrete-industry materials.',
    serviceAreaLabel: 'Texas',
    brand: {
        accent: '#0058e8',
        accentStrong: '#0048c0',
        text: '#f8f9fb',
        logoPath: '/brand/w2t-nav-borderless.png',
        footerLogoPath: '/brand/w2t-footer-chrome.png',
        logoAlt: 'Wright 2 Transportation logo',
    },
    seo: {
        defaultTitle: 'Wright 2 Transportation | Texas Dry Bulk Trucking',
        defaultDescription:
            'Wright 2 Transportation provides professional fly ash and dry bulk transportation services throughout Texas and career opportunities for qualified CDL drivers.',
        defaultOgImage: '/brand/og-card.svg',
    },
    navigation: [
        { href: '/', label: 'Home' },
        { href: '/drivers', label: 'Drivers', highlight: true },
        { href: '/services', label: 'Services' },
        { href: '/equipment', label: 'Equipment' },
        { href: '/safety', label: 'Safety' },
        { href: '/about', label: 'About' },
        { href: '/contact', label: 'Contact' },
    ] satisfies NavItem[],
    footerLinks: [
        { href: '/privacy', label: 'Privacy Policy' },
        { href: '/terms', label: 'Terms of Use' },
        { href: '/accessibility', label: 'Accessibility' },
    ] satisfies NavItem[],
    contacts: {
        mainPhone: '',
        recruitingPhone: '',
        businessEmail: '',
        recruitingEmail: '',
        addressLines: [] as string[],
        businessHours: '',
    },
    socialLinks: [] as ContactLink[],
    materials: [
        'Fly ash',
        'Dry bulk construction and industrial materials',
        'Cement and concrete-industry materials',
    ],
    homepageServices: [
        {
            title: 'Fly Ash Transportation',
            body: 'Dependable transportation supporting concrete, cement, and construction-material operations.',
        },
        {
            title: 'Dry Bulk Transportation',
            body: 'Specialized trucking for appropriate powdered and dry bulk materials.',
        },
        {
            title: 'Plant-to-Plant Transportation',
            body: 'Reliable material movement between production facilities, terminals, and processing locations.',
        },
        {
            title: 'Plant-to-Customer Transportation',
            body: 'Professional delivery supporting concrete plants, suppliers, and industrial customers.',
        },
        {
            title: 'Dedicated Transportation',
            body: 'Transportation capacity for customers with recurring dry bulk requirements.',
        },
    ] satisfies FeatureItem[],
    values: [
        {
            title: 'Safety First',
            body: 'Professional transportation starts with responsible drivers, equipment, and operating practices.',
        },
        {
            title: 'Dependable Service',
            body: 'Customers depend on transportation to keep operations moving and job sites supplied.',
        },
        {
            title: 'Professional Drivers',
            body: 'Drivers represent Wright 2 Transportation every time they arrive at a plant, terminal, or customer location.',
        },
        {
            title: 'Specialized Equipment',
            body: 'Equipment is selected for the work dry bulk transportation demands.',
        },
        {
            title: 'Texas Focus',
            body: 'The company is built around supporting Texas industries and the people who keep them running.',
        },
    ] satisfies FeatureItem[],
    driverPillars: [
        {
            title: 'Specialized Work',
            body: 'Opportunities are centered on professional dry bulk transportation supporting active Texas industries.',
        },
        {
            title: 'Quality Equipment',
            body: 'Drivers work with specialized equipment built for the demands of bulk hauling.',
        },
        {
            title: 'Texas Operations',
            body: 'The work supports facilities and customers across Texas rather than parcel or warehouse routes.',
        },
        {
            title: 'Safety-Focused',
            body: 'Professional, responsible operation matters on the highway and on customer property.',
        },
        {
            title: 'Driver Respect',
            body: 'Drivers are central to the operation and expected to represent the company with professionalism.',
        },
    ] satisfies FeatureItem[],
    driverBenefits: [] as DriverBenefit[],
    driverRequirements: [
        { label: 'Valid Class A CDL' },
        { label: 'Acceptable driving record' },
        { label: 'Current DOT medical certification' },
        { label: 'Ability to meet DOT drug and alcohol testing requirements' },
        { label: 'Ability to meet company and insurance requirements' },
        { label: 'Pneumatic / dry bulk experience preferred' },
    ] satisfies DriverRequirement[],
    equipment: [
        {
            title: 'Tractors',
            description:
                'Configuration fields are ready for confirmed tractor makes, models, and specifications when Wright 2 Transportation is ready to publish them.',
            specs: [],
        },
        {
            title: 'Dry Bulk Trailers',
            description:
                'Specialized trailers are used for transporting fly ash and other appropriate dry bulk materials.',
            specs: [],
        },
        {
            title: 'Pneumatic Equipment',
            description:
                'This section is ready for confirmed pneumatic trailer details if and when Wright 2 Transportation chooses to publish them.',
            specs: [],
        },
    ] satisfies EquipmentSpec[],
    serviceDetails: [
        {
            title: 'Fly Ash Transportation',
            body: 'Wright 2 Transportation moves fly ash for operations tied to concrete, cement, and construction-material production.',
        },
        {
            title: 'Dry Bulk Transportation',
            body: 'Specialized equipment is used to handle appropriate powdered and dry bulk materials with professional attention to loading, unloading, and delivery.',
        },
        {
            title: 'Plant-to-Plant',
            body: 'Transportation between plants, terminals, storage facilities, and processing locations.',
        },
        {
            title: 'Plant-to-Customer',
            body: 'Professional delivery supporting concrete plants, suppliers, and industrial end users.',
        },
        {
            title: 'Dedicated Transportation',
            body: 'Support for customers that need recurring trucking capacity for dry bulk operations.',
        },
        {
            title: 'Contract Hauling',
            body: 'A straightforward path for businesses that want to discuss ongoing transportation requirements.',
        },
    ] satisfies FeatureItem[],
    about: {
        companyStory:
            'Wright 2 Transportation is a Texas trucking company focused on fly ash and dry bulk transportation. We support the concrete, cement, and construction-material industries with a straightforward commitment to professional drivers and dependable service.',
        principles: [
            { title: 'Dependability', body: 'Do what you say you are going to do.' },
            { title: 'Safety', body: 'Operate responsibly on the road and at customer facilities.' },
            { title: 'Professionalism', body: 'Represent Wright 2 Transportation well in every interaction.' },
            { title: 'Respect', body: 'Respect customers, drivers, equipment, and the work.' },
            { title: 'Accountability', body: 'Take responsibility for getting the job done correctly.' },
        ] satisfies FeatureItem[],
    },
    analytics: {
        ga4MeasurementId: 'PUBLIC_GA4_MEASUREMENT_ID',
        events: {
            driverApplicationStarted: 'driver_application_started',
            driverApplicationSubmitted: 'driver_application_submitted',
            transportationInquirySubmitted: 'transportation_inquiry_submitted',
            recruitingPhoneClicked: 'recruiting_phone_clicked',
            businessPhoneClicked: 'business_phone_clicked',
            recruitingEmailClicked: 'recruiting_email_clicked',
            driveWithUsClicked: 'drive_with_us_clicked',
        },
    },
} as const;

export const hasValue = (value: string | string[] | undefined | null) => {
    if (Array.isArray(value)) {
        return value.length > 0;
    }

    return Boolean(value && value.trim().length > 0);
};