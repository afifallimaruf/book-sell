import { useEffect, useState } from "react";
import { MIDTRANS_APP_URL } from "../utils/constant";

const useSnap = () => {
  const [snap, setSnap] = useState(null);

  useEffect(() => {
    // You can also change below url value to any script url you wish to load,
    // for example this is snap.js for Sandbox Env (Note: remove `.sandbox` from url if you want to use production version)
    const midtransScriptUrl = `${MIDTRANS_APP_URL}/snap/snap.js`;

    let scriptTag = document.createElement("script");
    scriptTag.src = midtransScriptUrl;
    scriptTag.async = true;

    // Optional: set script attribute, for example snap.js have data-client-key attribute
    // (change the value according to your client-key)
    const myMidtransClientKey = process.env.REACT_APP_MIDTRANS_CLIENT_KEY;
    scriptTag.setAttribute("data-client-key", myMidtransClientKey);

    scriptTag.onload = () => {
      setSnap(window.snap);
    };

    document.body.appendChild(scriptTag);

    return () => {
      document.body.removeChild(scriptTag);
    };
  }, []);

  // Then somewhere else on your React component, `window.snap` global object will be available to use
  // e.g. you can then call `window.snap.pay( ... )` function.

  const snapEmbed = (snap_token, embedId, action) => {
    if (snap) {
      snap.embed(snap_token, {
        embedId,
        onSuccess: function (result) {
          action.onSuccess(result);
        },
        onPending: function (result) {
          action.onPending(result);
        },
        onClose: function () {
          action.onClose();
        },
      });
    }
  };

  const snapPopup = (snap_token) => {
    if (snap) {
      snap.pay(snap_token, {
        onSuccess: function (result) {},
      });
    }
  };

  return { snapEmbed, snapPopup };
};

export default useSnap;
