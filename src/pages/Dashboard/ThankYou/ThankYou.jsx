import React, { useEffect, useState } from 'react';
import { BoxWrapper } from '../../../style';
import congratulations from "../../../images/congratulations.gif";
import { useNavigate } from 'react-router-dom';
import { getStorage } from '../../../Utils/common';
import { Helmet } from 'react-helmet';
import { initPixel, trackPurchase } from '../../../Utils/metaPixel';

function ThankYou() {
  const navigate = useNavigate();
  const [progressBar, setProgressBar] = useState(getStorage('percent'));

  useEffect(() => {
    // Purchase Pixel
    initPixel()
    trackPurchase()

    // Fire conversion tracking on mount
    if (window.gtag) {
      window.gtag('event', 'conversion', {
        'send_to': 'AW-17408044669/-rDuCOa7qPoaEP3c5uxA',
        'value': 1.0,
        'currency': 'INR',
      });
    }

    // google pixel lead tracker
    const GoogleWhatsappTracker = document.createElement("iframe");
    GoogleWhatsappTracker.src = "https://profuse.gotrackier.com/pixel?av=69a04eac8234421d3f0473c3";
    GoogleWhatsappTracker.width = "1";
    GoogleWhatsappTracker.height = "1";
    GoogleWhatsappTracker.style.display = "none";
    // GoogleWhatsappTracker.scrolling = "no";
    GoogleWhatsappTracker.border = "0";
    document.body.appendChild(GoogleWhatsappTracker);
    return () => {
      document.body.removeChild(GoogleWhatsappTracker);
    };
  }, []);

  return (
    <div>
      <Helmet>
        <script async src="https://www.googletagmanager.com/gtag/js?id=AW-17408044669"></script>
        <script>
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-17408044669');
          `}
        </script>
      </Helmet>

      <BoxWrapper className="w100 gray">
        <div
          className="formmainBox flex"
          style={{
            backgroundImage: `url(${congratulations})`,
            backgroundSize: 'cover',
            height: '615px',
            width: '100%',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        >
          <div className="left">
            {/* Any other content you want to show */}
          </div>
        </div>
      </BoxWrapper>
    </div>
  );
}

export default ThankYou;