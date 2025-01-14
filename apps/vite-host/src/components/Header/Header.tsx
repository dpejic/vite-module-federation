import { tw } from "../../utils/tw";
import { FaCartShopping } from "react-icons/fa6";
import { Layout } from "../Layout/Layout";
import { toast } from "react-toastify";
import { useState } from "react";
import { useSharedStore } from "../../hooks/useSharedStore";
import { emitter, EventsEmitter } from "@dp-wk/emitter";

export const Header = () => {
  const { items } = useSharedStore();

  const [isShoppingModalLoading, setIsShoppingModalLoading] = useState(false);
  const [isShoppingModalLoaded, setIsShoppingModalLoaded] = useState(false);

  const openShoppingModal = async () => {
    try {
      if (isShoppingModalLoading) {
        return;
      }

      if (!isShoppingModalLoaded) {
        setIsShoppingModalLoading(true);
        await import("@shopping/shopping-modal");
        setIsShoppingModalLoaded(true);
      }

      emitter.emit(EventsEmitter.TOGGLE_SHOPPING_MODAL, true);
    } catch (err) {
      console.error("Failed to load catalog module:", err);
      handleErrorLoadingShoppingCartModal();
    } finally {
      setIsShoppingModalLoading(false);
    }
  };

  const handleErrorLoadingShoppingCartModal = () => {
    toast.error(
      "There was an issue loading the shopping cart modal. Please try again later."
    );
  };

  return (
    <header>
      <shopping-modal></shopping-modal>

      <nav className={tw("border-gray-200 px-4 lg:px-6 py-2.5 bg-gray-100")}>
        <Layout>
          <div className={tw("flex flex-wrap justify-between items-center")}>
            <a href="/" className={tw("flex items-center")}>
              <img
                src="https://freepngdesign.com/content/uploads/images/t_counter-strike-global-offensive-2-logo-2525.png"
                className={tw("mr-3 h-6 sm:h-9")}
                alt="App Logo"
              />
            </a>
            <div className={tw("flex items-center lg:order-2 relative")}>
              <span
                className={tw(
                  "absolute -left-3 -bottom-3 bg-purple-500 p-[5px] rounded-full text-[10px] heading-[10px] h-[15px] text-white flex items-center"
                )}
              >
                {items.length}
              </span>
              <button
                type="button"
                onClick={openShoppingModal}
                className={tw(
                  "text-gray-800 hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-lg focus:outline-none hover:text-red-800"
                )}
              >
                <FaCartShopping />
              </button>
            </div>
          </div>
        </Layout>
      </nav>
    </header>
  );
};
