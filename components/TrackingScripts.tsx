"use client";

import Script from "next/script";

interface TrackingProps {
    settings: {
        gtmId?: string | null;
        gaId?: string | null;
        pixelId?: string | null;
        linkedinInsightId?: string | null;
        tiktokId?: string | null;
        twitterId?: string | null;
        pinterestId?: string | null;
        snapchatId?: string | null;
        redditId?: string | null;
        quoraId?: string | null;
        clarityId?: string | null;
        hotjarId?: string | null;
    }
}

export default function TrackingScripts({ settings }: TrackingProps) {
    return (
        <>

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

            {settings.linkedinInsightId && (
                <Script id="linkedin-insight" strategy="afterInteractive">
                    {`
                        _linkedin_partner_id = "${settings.linkedinInsightId}";
                        window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
                        window._linkedin_data_partner_ids.push(_linkedin_partner_id);
                        (function(l) {
                        if (!l){window.lintrk = function(a,b){window.lintrk.q.push([a,b])};
                        window.lintrk.q=[]}
                        var s = document.getElementsByTagName("script")[0];
                        var b = document.createElement("script");
                        b.type = "text/javascript";b.async = true;
                        b.src = "https://snap.licdn.com/li.lms-analytics/insight.min.js";
                        s.parentNode.insertBefore(b, s);})(window.lintrk);
                    `}
                </Script>
            )}

            {settings.tiktokId && (
                <Script id="tiktok-pixel" strategy="afterInteractive">
                    {`
                        !function (w, d, t) {
                          w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie"],ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e},ttq.load=function(e,n){var i="https://analytics.tiktok.com/i18n/pixel/events.js";ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=i,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};var o=document.createElement("script");o.type="text/javascript",o.async=!0,o.src=i+"?sdkid="+e+"&lib="+t;var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(o,a)};
                          ttq.load('${settings.tiktokId}');
                          ttq.page();
                        }(window, document, 'ttq');
                    `}
                </Script>
            )}

            {settings.twitterId && (
                <Script id="twitter-pixel" strategy="afterInteractive">
                    {`
                        !function(e,t,n,s,u,a){e.twq||(s=e.twq=function(){s.exe?s.exe.apply(s,arguments):s.queue.push(arguments);
                        },s.version='1.1',s.queue=[],u=t.createElement(n),u.async=!0,u.src='https://static.ads-twitter.com/uwt.js',
                        a=t.getElementsByTagName(n)[0],a.parentNode.insertBefore(u,a))}(window,document,'script');
                        twq('config','${settings.twitterId}');
                    `}
                </Script>
            )}

            {settings.pinterestId && (
                <Script id="pinterest-tag" strategy="afterInteractive">
                    {`
                        !function(e){if(!window.pintrk){window.pintrk=function(){window.pintrk.queue.push(Array.prototype.slice.call(arguments))};var n=window.pintrk;n.queue=[],n.version="3.0";var t=document.createElement("script");t.async=!0,t.src=e;var r=document.getElementsByTagName("script")[0];r.parentNode.insertBefore(t,r)}}("https://s.pinimg.com/ct/core.js");
                        pintrk('load', '${settings.pinterestId}');
                        pintrk('page');
                    `}
                </Script>
            )}

            {settings.snapchatId && (
                <Script id="snapchat-pixel" strategy="afterInteractive">
                    {`
                        (function(e,t,n){if(e.snaptr)return;var a=e.snaptr=function()
                        {a.handleRequest?a.handleRequest.apply(a,arguments):a.queue.push(arguments)};
                        a.queue=[];var s='script';var r=t.createElement(s);r.async=!0;
                        r.src=n;var u=t.getElementsByTagName(s)[0];
                        u.parentNode.insertBefore(r,u);})(window,document,'https://sc-static.net/scevent.min.js');
                        snaptr('init', '${settings.snapchatId}');
                        snaptr('track','PAGE_VIEW');
                    `}
                </Script>
            )}

            {settings.redditId && (
                <Script id="reddit-pixel" strategy="afterInteractive">
                    {`
                        !function(w,d,n,s,t){if(!w[n]){var r=w[n]=function(){r.invoke?r.invoke.apply(r,arguments):r.queue.push(arguments)};r.queue=[],r.t=1*new Date;var t=d.createElement(s);t.async=!0,t.src="https://www.redditstatic.com/ads/pixel.js";var a=d.getElementsByTagName(s)[0];a.parentNode.insertBefore(t,a)}}(window,document,"rdt","script");
                        rdt('init','${settings.redditId}');
                        rdt('track', 'PageVisit');
                    `}
                </Script>
            )}

            {settings.quoraId && (
                <Script id="quora-pixel" strategy="afterInteractive">
                    {`
                        !function(q,e,v,n,t,s){if(q.qp)return; n=q.qp=function(){n.qp?n.qp.apply(n,arguments):n.queue.push(arguments);}; n.queue=[];t=document.createElement(e);t.async=!0;t.src=v; s=document.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t,s);}(window, 'script', 'https://a.quora.com/qpc.js');
                        qp('init', '${settings.quoraId}');
                        qp('track', 'ViewContent');
                    `}
                </Script>
            )}

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
