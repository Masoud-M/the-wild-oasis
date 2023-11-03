import { useEffect, useRef } from "react";

export function useOutsideClick(handler, listenCapturing = true) {
  const ref = useRef();

  useEffect(
    function () {
      function handleClick(e) {
        // we are checking if the StyledModal is open and then using the contains method, we can pass an element and check if it contains it. therefor if it doesn't contains e.target it means that the click happened outside of it
        if (ref.current && !ref.current.contains(e.target)) {
          handler();
        }
      }

      // the third argument we pass here changes how the events gets handled by React. if we don't specify it, events would bubble up and causes the StyledMOdal to close shortly after clicking on ADD NEW CABIN or SHOW TABLE button. because we are rendering the Modal window as a direct child to the body, when clicking on the button the click event gets bubbled up, it gets detected as a click outside of the Modal and closes it.
      //  therefore passing the TRUE argument makes the eventListener to handle events in the capturing phase instead of bubbling phase
      document.addEventListener("click", handleClick, listenCapturing);
      return () =>
        document.removeEventListener("click", handleClick, listenCapturing);
    },
    [handler, listenCapturing]
  );

  return ref;
}
