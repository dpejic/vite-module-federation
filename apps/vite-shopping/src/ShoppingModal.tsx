import { tw } from "./utils/tw";
import { useEffect, useState } from "react";
import classNames from "classnames";
import styles from "./ShoppingModal.module.css";
import { useSharedStore } from "./hooks/useSharedStore";
import { emitter, EventsEmitter } from "@dp-wk/emitter";

function ShoppingModal() {
  const [isOpen, setIsOpen] = useState(true);
  const { items } = useSharedStore();
  const closeModal = () => setIsOpen(false);

  useEffect(() => {
    const listener = emitter.addListener(
      EventsEmitter.TOGGLE_SHOPPING_MODAL,
      (value: boolean) => {
        setIsOpen(value);
      }
    );

    return () => {
      listener.remove();
    };
  }, []);

  return (
    <div className={classNames(tw("relative"), styles.moduleWrapper)}>
      {isOpen && (
        <div
          className={tw("fixed inset-0 flex justify-end z-50")}
          onClick={closeModal}
        >
          <div className={tw("absolute inset-0 bg-black opacity-50")}></div>

          <div
            className={tw(
              "bg-white w-[300px] h-full shadow-lg transform transition-transform"
            )}
            style={{ transition: "transform 0.3s ease" }}
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={`${import.meta.env.VITE_APP_URL}/shopping-cart.jpg`}
              className={tw("w-full h-[300px]")}
              width="100%"
              height="300px"
            />
            <div className={tw("p-4")}>
              {items.length > 0 ? (
                items.map((item) => (
                  <p key={item.price} className={tw("text-sm text-gray-700")}>
                    {item.name} {item.price}
                  </p>
                ))
              ) : (
                <p>Nothing here mate</p>
              )}
              <button
                onClick={closeModal}
                className={tw("mt-4 px-4 py-2 bg-red-500 text-white rounded")}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ShoppingModal;
