import Link, { LinkProps } from "next/link";
import { useRouter } from "next/router";
import { ReactElement, cloneElement } from "react";

type ActiveLinkProps = LinkProps & {
  children: ReactElement;
  activeClassName: string;
};

export const ActiveLink = ({
  children,
  activeClassName,
  ...rest
}: ActiveLinkProps) => {
  const { asPath } = useRouter();

  const getClassName = () => {
    if (rest.href === "/") {
      return asPath === rest.href ? activeClassName : "";
    } else {
      return asPath.includes(String(rest.href)) ? activeClassName : "";
    }
  };

  return (
    <Link {...rest}>
      {cloneElement(children, { className: getClassName() })}
    </Link>
  );
};
