"use client"
import Link from "next/link";

const FooterItem = ({ text, href, active }) => {
  return (
    <Link href={href} legacyBehavior>
      <a className={`nav__link`}>{text}</a>
    </Link>
  );
};

export default FooterItem;