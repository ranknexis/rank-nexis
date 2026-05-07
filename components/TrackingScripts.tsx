"use client";

import Script from "next/script";

interface TrackingProps {
    settings: {
        gtmId?: string | null;
        gaId?: string | null;
        pixelId?: string | null;
        linkedinInsightId?: string | null;
        clarityId?: string | null;
        hotjarId?: string | null;
    }
}

export default function TrackingScripts({ settings }: TrackingProps) {
    return (
        <>
            {/* Google Analytics (GA4) */}
            {settings.gaId && (
                <>
                    <Script
                        src={`https://www.googletagmanager.com/gtag/js?id=${settings.gaId}`}
                        strategy="afterInteractive"
                    />
                    <Script id="google-analytics" strategy="afterInteractive">
                        {`
                            window.dataLayer = window.dataLayer || [];
                            function gtag(){dataLayer.push(arguments);}
                            gtag('js', new Date());
                            gtag('config', '${settings.gaId}');
                        `}
                    </Script>
                </>
            )}

            {/* Google Tag Manager (GTM) */}
            {settings.gtmId && (
                <Script id="google-tag-manager" strategy="afterInteractive">
                    {`
                        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                        })(window,document,'script','dataLayer','${settings.gtmId}');
                    `}
                </Script>
            )}

            {/* Meta Pixel */}
            {settings.pixelId && (
                <Script id="fb-pixel" strategy="afterInteractive">
                    {`
                        !function(f,b,e,v,n,t,s)
                        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                        n.queue=[];t=b.createElement(e);t.async=!0;
                        t.src=v;s=b.getElementsByTagName(e)[0];
                        s.parentNode.insertBefore(t,s)}(window, document,'script',
                        'https://connect.facebook.net/en_US/fbevents.js');
                        fbq('init', '${settings.pixelId}');
                        fbq('track', 'PageView');
                    `}
                </Script>
            )}

            {/* Microsoft Clarity */}
            {settings.clarityId && (
                <Script id="ms-clarity" strategy="afterInteractive">
                    {`
                        (function(c,l,a,r,i,t,y){
                            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                            y=l.getElementsByTagName(s)[0];y.parentNode.insertBefore(t,y);
                        })(window, document, "clarity", "script", "${settings.clarityId}");
                    `}
                </Script>
            )}

            {/* Hotjar */}
            {settings.hotjarId && (
                <Script id="hotjar" strategy="afterInteractive">
                    {`
                        (function(h,o,t,j,a,r){
                            h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
                            h._hjSettings={hjid:${settings.hotjarId},hjsv:6};
                            a=o.getElementsByTagName('head')[0];
                            r=o.createElement('script');r.async=1;
                            r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
                            a.appendChild(r);
                        })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
                    `}
                </Script>
            )}
        </>
    );
}
