"use client";

import Script from "next/script";
import { useEffect, useState } from "react";

export default function AnalyticsScripts({ settings }: { settings: any }) {
  const [consent, setConsent] = useState<any>(null);

  useEffect(() => {
    const checkConsent = () => {
      const stored = localStorage.getItem("ranknexis_cookie_consent");
      if (stored === "all") {
        setConsent({ analytics: true, marketing: true });
      } else if (stored === "rejected") {
        setConsent({ analytics: false, marketing: false });
      } else if (stored) {
        try {
          setConsent(JSON.parse(stored));
        } catch {
          setConsent(null);
        }
      }
    };

    checkConsent();
    window.addEventListener("storage", checkConsent);
    window.addEventListener("cookie-consent-updated", checkConsent);
    
    return () => {
      window.removeEventListener("storage", checkConsent);
      window.removeEventListener("cookie-consent-updated", checkConsent);
    };
  }, []);

  if (!consent || !settings) return null;

  return (
    <>
      {/* Google Tag Manager (GTM) - Hybrid */}
      {(consent.analytics || consent.marketing) && settings.gtmId && (
        <Script id="gtm" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','${settings.gtmId}');`}
        </Script>
      )}

      {/* Google Analytics (GA4) - Analytics */}
      {consent.analytics && settings.gaId && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${settings.gaId}`} strategy="afterInteractive" />
          <Script id="ga4" strategy="afterInteractive">
            {`window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${settings.gaId}');`}
          </Script>
        </>
      )}

      {/* Google Ads - Marketing */}
      {consent.marketing && settings.googleAdsId && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${settings.googleAdsId}`} strategy="afterInteractive" />
          <Script id="google-ads" strategy="afterInteractive">
            {`window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${settings.googleAdsId}');`}
          </Script>
        </>
      )}

      {/* Meta (Facebook) Pixel - Marketing */}
      {consent.marketing && settings.pixelId && (
        <Script id="fb-pixel" strategy="afterInteractive">
          {`!function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '${settings.pixelId}');
          fbq('track', 'PageView');`}
        </Script>
      )}

      {/* Hotjar - Analytics */}
      {consent.analytics && settings.hotjarId && (
        <Script id="hotjar" strategy="afterInteractive">
          {`(function(h,o,t,j,a,r){
              h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
              h._hjSettings={hjid:${settings.hotjarId},hjsv:6};
              a=o.getElementsByTagName('head')[0];
              r=o.createElement('script');r.async=1;
              r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
              a.appendChild(r);
          })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');`}
        </Script>
      )}

      {/* Microsoft Clarity - Analytics */}
      {consent.analytics && settings.clarityId && (
        <Script id="clarity" strategy="afterInteractive">
          {`(function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "${settings.clarityId}");`}
        </Script>
      )}

      {/* LinkedIn Insight - Marketing */}
      {consent.marketing && settings.linkedinInsightId && (
        <Script id="linkedin-insight" strategy="afterInteractive">
          {`_linkedin_partner_id = "${settings.linkedinInsightId}";
          window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
          window._linkedin_data_partner_ids.push(_linkedin_partner_id);
          (function(l) {
          if (!l){window.lintrk = function(a,b){window.lintrk.q.push([a,b])};
          window.lintrk.q=[]}
          var s = document.getElementsByTagName("script")[0];
          var b = document.createElement("script");
          b.type = "text/javascript";b.async = true;
          b.src = "https://snap.licdn.com/li.lms-analytics/insight.min.js";
          s.parentNode.insertBefore(b, s);})(window.lintrk);`}
        </Script>
      )}

      {/* TikTok Pixel - Marketing */}
      {consent.marketing && settings.tiktokId && (
        <Script id="tiktok-pixel" strategy="afterInteractive">
          {`!function (w, d, t) {
            w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","detach","hooks"],ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e},ttq.load=function(e,n){var i="https://analytics.tiktok.com/i18n/pixel/events.js";ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=i,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};var o=document.createElement("script");o.type="text/javascript",o.async=!0,o.src=i+"?sdkid="+e+"&lib="+t;var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(o,a)};
            ttq.load('${settings.tiktokId}');
            ttq.page();
          }(window, document, 'ttq');`}
        </Script>
      )}

      {/* Pinterest Tag - Marketing */}
      {consent.marketing && settings.pinterestId && (
        <Script id="pinterest-tag" strategy="afterInteractive">
          {`!function(e){if(!window.pintrk){window.pintrk=function(){window.pintrk.queue.push(Array.prototype.slice.call(arguments))};var n=window.pintrk;n.queue=[],n.version="3.0";var t=document.createElement("script");t.async=!0,t.src=e;var r=document.getElementsByTagName("script")[0];r.parentNode.insertBefore(t,r)}}("https://s.pinimg.com/ct/core.js");
          pintrk('load', '${settings.pinterestId}');
          pintrk('page');`}
        </Script>
      )}

      {/* Twitter (X) Pixel - Marketing */}
      {consent.marketing && settings.twitterId && (
        <Script id="twitter-pixel" strategy="afterInteractive">
          {`!function(e,t,n,s,u,a){e.twq||(s=e.twq=function(){s.exe?s.exe.apply(s,arguments):s.queue.push(arguments);
          },s.version='1.1',s.queue=[],u=t.createElement(n),u.async=!0,u.src='https://static.ads-twitter.com/uwt.js',
          a=t.getElementsByTagName(n)[0],a.parentNode.insertBefore(u,a))}(window,document,'script');
          twq('config','${settings.twitterId}');`}
        </Script>
      )}

      {/* Snapchat Pixel - Marketing */}
      {consent.marketing && settings.snapchatId && (
        <Script id="snapchat-pixel" strategy="afterInteractive">
          {`(function(e,t,n){if(e.snaptr)return;var a=e.snaptr=function()
          {a.handleRequest?a.handleRequest.apply(a,arguments):a.queue.push(arguments)};
          a.queue=[];var s='script';r=t.createElement(s);r.async=!0;
          r.src=n;var u=t.getElementsByTagName(s)[0];
          u.parentNode.insertBefore(r,u);})(window,document,
          'https://sc-static.net/scevent.min.js');
          snaptr('init', '${settings.snapchatId}');
          snaptr('track', 'PAGE_VIEW');`}
        </Script>
      )}

      {/* Reddit Pixel - Marketing */}
      {consent.marketing && settings.redditId && (
        <Script id="reddit-pixel" strategy="afterInteractive">
          {`!function(w,d){if(!w.rdt){var p=w.rdt=function(){p.sendEvent?p.sendEvent.apply(p,arguments):p.queue.push(arguments)};p.queue=[];var t=d.createElement("script");t.src="https://www.redditstatic.com/ads/pixel.js",t.async=!0;var s=d.getElementsByTagName("script")[0];s.parentNode.insertBefore(t,s)}}(window,document);
          rdt('init','${settings.redditId}');
          rdt('track', 'PageVisit');`}
        </Script>
      )}

      {/* Quora Pixel - Marketing */}
      {consent.marketing && settings.quoraId && (
        <Script id="quora-pixel" strategy="afterInteractive">
          {`!function(q,e,v,n,t,s){if(q.qp)return; n=q.qp=function(){n.qp?n.qp.apply(n,arguments):n.queue.push(arguments);}; n.queue=[];t=document.createElement(e);t.async=!0;t.src=v; s=document.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t,s);}(window, 'script', 'https://a.quora.com/qpx.js');
          qp('init', '${settings.quoraId}');
          qp('track', 'ViewContent');`}
        </Script>
      )}
    </>
  );
}
