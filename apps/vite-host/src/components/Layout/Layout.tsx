import { tw } from "../../utils/tw";

interface IProps {
  children?: React.ReactNode;
}

export const Layout = ({ children }: IProps) => {
  return <div className={tw("mx-auto max-w-screen-xl")}>{children}</div>;
};
