export const PAGES_DATA = [
  {
    slug: 'home',
    metaTitle: 'RankNexis | Leading Digital Marketing Agency for Business Growth',
    metaDescription: 'RankNexis is a professional digital marketing agency helping businesses grow with SEO, Social Media, Web Design, and PPC strategies.',
    sections: [
      { 
        key: 'hero', 
        type: 'hero', 
        content: { 
          badge: 'Growth & Strategy',
          heading: 'Results Driven',
          headingAccent: 'Digital Agency.',
          subtext: 'Ranknexis is a professional digital marketing agency dedicated to helping businesses grow online through data-driven strategies.',
          ctaText: 'Free Consultation',
          ctaLink: '/#contact',
          ctaSecondaryText: 'Our Success',
          ctaSecondaryLink: '/work'
        } 
      },
      { 
        key: 'trust', 
        type: 'trust_block', 
        content: { 
          badge: 'How We Work',
          heading: 'Our',
          headingAccent: 'Expertise.',
          subtext: "We don't just build websites; we create high-performance systems where great design meets expert tech.",
          items: [
            { id: '01', title: 'What We Do', description: 'We provide complete digital marketing solutions designed to meet the needs of modern businesses.' },
            { id: '02', title: 'Why Choose Ranknexis', description: 'We believe in clear communication, honest work, and measurable results through smart strategies.' },
            { id: '03', title: 'Our Approach', description: 'Every business is different, so we create custom strategies focused on quality and long-term growth.' }
          ]
        } 
      },
      { 
        key: 'stats', 
        type: 'stats_strip', 
        content: { 
          items: [
             { label: 'Active Projects', value: '120+', icon: 'Zap' },
             { label: 'Search Dominance', value: '98%', icon: 'TrendingUp' },
             { label: 'Client Satisfaction', value: '100%', icon: 'ShieldCheck' },
             { label: 'Market Reach', value: '25+', icon: 'Globe' }
          ]
        } 
      }
    ]
  },
  {
    slug: 'about',
    metaTitle: 'About RankNexis | Our Mission, Vision & Team',
    metaDescription: 'Learn about RankNexis, a premier digital agency focused on delivering smart, affordable, and results-oriented marketing solutions.',
    sections: [
      {
        key: 'hero',
        type: 'hero',
        content: {
          badge: 'Studio Philosophy',
          heading: 'Smart &',
          headingAccent: 'Affordable.',
          subtext: 'Ranknexis – Smart & Affordable Digital Marketing for Small Businesses focused on high-velocity growth.'
        }
      },
      {
        key: 'narrative',
        type: 'text_block',
        content: {
          label: 'Our Philosophy',
          heading: 'Driven By',
          headingAccent: 'Results.',
          body: 'Ranknexis is a reliable and professional digital marketing agency. We provide top-rated digital marketing services, including SEO, Social Media Marketing, Graphic Design, and Web Design. Our mission is to empower businesses with the tools they need to dominate their niche.',
          imageUrl: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=2071'
        }
      }
    ]
  },
  {
    slug: 'services/seo-service',
    metaTitle: 'Expert SEO Services | RankNexis Digital Agency',
    metaDescription: 'Boost your search rankings and drive organic traffic with our professional SEO services including technical, on-page, and local SEO.',
    sections: [
      { key: 'hero', type: 'hero', content: { title: 'Affordable SEO', image: '/website-images/seo-page/affordable-seo-services-for-small-business.webp' } },
      { key: 'ecommerce', type: 'text_block', content: { title: 'Ecommerce SEO', text: 'Dominate search results and increase your store revenue.', image: '/website-images/seo-page/ecommerce-seo-company.webp' } },
      { key: 'enterprise', type: 'text_block', content: { title: 'Enterprise SEO', text: 'Scalable SEO strategies for large organizations.', image: '/website-images/seo-page/enterprise-seo-services.webp' } },
      { key: 'international', type: 'text_block', content: { title: 'International SEO', text: 'Expand your business reach to a global audience.', image: '/website-images/seo-page/international-seo-services.webp' } },
      { key: 'local', type: 'text_block', content: { title: 'Local SEO', text: 'Own your local market and attract nearby customers.', image: '/website-images/seo-page/white-label-local-seo.webp' } }
    ]
  },
  {
    slug: 'services/facebook-ads',
    metaTitle: 'Facebook Ad Agency | High-ROI Meta Campaigns | RankNexis',
    metaDescription: 'Scalable Facebook and Instagram ad campaigns designed to convert. Our Meta ad agency delivers high ROI for e-commerce and professional services.',
    sections: [
      { key: 'hero', type: 'hero', content: { title: 'Meta Ad Agency', image: '/website-images/facebook-ads-page/facebook-ad-agency-.webp' } },
      { key: 'shopify', type: 'text_block', content: { title: 'Shopify Store Ads', text: 'E-commerce growth engine for Shopify merchants.', image: '/website-images/facebook-ads-page/facebook-ads-for-shopify-stores.webp' } },
      { key: 'accountants', type: 'text_block', content: { title: 'Ads for Professionals', text: 'Targeted lead generation for service-based businesses.', image: '/website-images/facebook-ads-page/facebook-ads-for-accountants.webp' } },
      { key: 'leads', type: 'text_block', content: { title: 'Lead Gen Mastery', text: 'Convert clicks to loyal clients with optimized funnels.', image: '/website-images/facebook-ads-page/lead-generation-campaigns.webp' } }
    ]
  },
  {
    slug: 'services/ui-ux-design',
    metaTitle: 'Premium UI UX Design Agency | Frictionless Digital Products',
    metaDescription: 'Crafting intuitive user experiences and stunning interfaces. From web apps to mobile designs, we build products that users love.',
    sections: [
      { key: 'hero', type: 'hero', content: { title: 'UI UX Design', image: '/website-images/ui-ux-design-page/ui-ux-design-and-development-services.webp' } },
      { key: 'dashboard', type: 'text_block', content: { title: 'Admin Dashboards', image: '/website-images/ui-ux-design-page/admin-dashboard-design.webp' } },
      { key: 'ecommerce_store', type: 'text_block', content: { title: 'E-Commerce Interface', image: '/website-images/ui-ux-design-page/ecommerce-store-design.webp' } },
      { key: 'landing', type: 'text_block', content: { title: 'Landing Pages', image: '/website-images/ui-ux-design-page/landing-page-design.webp' } },
      { key: 'mobile', type: 'text_block', content: { title: 'Mobile App Design', image: '/website-images/ui-ux-design-page/mobile-app-design.webp' } },
      { key: 'web_app', type: 'text_block', content: { title: 'Web Applications', image: '/website-images/ui-ux-design-page/web-application-interface-design.webp' } }
    ]
  },
  {
    slug: 'services/google-ads',
    metaTitle: 'Google Ads Agency | Performance PPC Management | RankNexis',
    metaDescription: 'Get instant traffic and high-quality leads with our expert Google Ads management. Search, Display, and Video campaigns optimized for ROI.',
    sections: [
      { key: 'hero', type: 'hero', content: { title: 'Google Ads', image: '/website-images/google-ads-page/google-ads-agency.webp' } },
      { key: 'small_biz', type: 'text_block', content: { title: 'Small Business Ads', image: '/website-images/google-ads-page/google-ads-for-small-businesses.webp' } },
      { key: 'mgt', type: 'text_block', content: { title: 'Ads Management', image: '/website-images/google-ads-page/google-ads-management-agency.webp' } },
      { key: 'ppc', type: 'text_block', content: { title: 'PPC Management', image: '/website-images/google-ads-page/ppc-management-services.webp' } }
    ]
  },
  {
    slug: 'services/graphic-design',
    metaTitle: 'Professional Graphic Design Services | RankNexis Branding',
    metaDescription: 'Elevate your brand with premium graphic design. Logo design, brand identity, social media posts, and packaging solutions.',
    sections: [
      { key: 'hero', type: 'hero', content: { title: 'Graphic Design', image: '/website-images/graphic-design-page/agency-for-graphic-design-.webp' } },
      { key: 'identity', type: 'text_block', content: { title: 'Brand Identity', image: '/website-images/graphic-design-page/brand-identity-design-services.webp' } },
      { key: 'logo', type: 'text_block', content: { title: 'Logo Design', image: '/website-images/graphic-design-page/logo-design-services.webp' } },
      { key: 'packaging', type: 'text_block', content: { title: 'Packaging Design', image: '/website-images/graphic-design-page/product-packging-design-services.webp' } },
      { key: 'social', type: 'text_block', content: { title: 'Social Media Posts', image: '/website-images/graphic-design-page/social-media-post-design-services-.webp' } }
    ]
  },
  {
    slug: 'services/social-media-marketing',
    metaTitle: 'Social Media Marketing Agency | RankNexis SMM Services',
    metaDescription: 'Grow your community and engage your audience across Facebook, Instagram, LinkedIn, and Twitter with our expert SMM packages.',
    sections: [
      { key: 'hero', type: 'hero', content: { title: 'Social Media', image: '/website-images/social-media-marketing-page/b2b-social-media-marketing-.webp' } },
      { key: 'smm', type: 'text_block', content: { title: 'SMM Marketing', image: '/website-images/social-media-marketing-page/smm-marketing.webp' } },
      { key: 'pkg', type: 'text_block', content: { title: 'SMM Packages', image: '/website-images/social-media-marketing-page/social-media-marketing-packages.webp' } },
      { key: 'core_svcs', type: 'text_block', content: { title: 'Core Marketing', image: '/website-images/social-media-marketing-page/social-media-marketing-services.webp' } }
    ]
  },
  {
    slug: 'services/web-development',
    metaTitle: 'Custom Web Development Services | Scalable Web Solutions',
    metaDescription: 'High-performance websites built with modern technologies. Custom development, WordPress, and e-commerce solutions for business growth.',
    sections: [
      { key: 'hero', type: 'hero', content: { title: 'Web Development', image: '/website-images/web-development-page/web-design-services.webp' } },
      { key: 'custom_dev', type: 'text_block', content: { title: 'Custom Dev', image: '/website-images/web-development-page/custom-web-development-services.webp' } },
      { key: 'ecommerce_dev', type: 'text_block', content: { title: 'Ecommerce Websites', image: '/website-images/web-development-page/ecommerce-website-development-services.webp' } },
      { key: 'wp', type: 'text_block', content: { title: 'WordPress Mastery', image: '/website-images/web-development-page/wordpress-website-development.webp' } }
    ]
  },
  {
    slug: 'services/video-motion',
    metaTitle: 'Creative Video Editing & Motion Graphics | RankNexis',
    metaDescription: 'Stunning video content that captures attention. Logo animations, product videos, and commercial editing for digital campaigns.',
    sections: [
      { key: 'hero', type: 'hero', content: { title: 'Video & Motion', image: '/website-images/video-editing-page/creative-video-editing-services.webp' } },
      { key: 'logo_anim', type: 'text_block', content: { title: 'Logo Animation', image: '/website-images/video-editing-page/logo-animation-services.webp' } },
      { key: 'motion', type: 'text_block', content: { title: 'Motion Design', image: '/website-images/video-editing-page/motion-design-services.webp' } },
      { key: 'product', type: 'text_block', content: { title: 'Product Videos', image: '/website-images/video-editing-page/product-video-editing.webp' } }
    ]
  },
  {
    slug: 'services/full-stack-solution',
    metaTitle: 'Full-Stack Web Application Development | RankNexis',
    metaDescription: 'End-to-end web application development. We build robust, scalable, and secure software solutions tailored to your business needs.',
    sections: [
      { key: 'hero', type: 'hero', content: { title: 'Web Applications', image: '/website-images/web-application-development/custom-web-application-development-services.webp' } },
      { key: 'company', type: 'text_block', content: { title: 'App Company', image: '/website-images/web-application-development/custom-web-application-development-company.webp' } },
      { key: 'app_dev', type: 'text_block', content: { title: 'App Development', image: '/website-images/web-application-development/custom-web-application-development.webp' } }
    ]
  }
];

