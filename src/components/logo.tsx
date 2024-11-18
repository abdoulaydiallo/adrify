import React from "react";
import Link from "next/link";
import {
  CheckSquareOffset,
  MapPinArea,
  Share,
  Star,
} from "@phosphor-icons/react/dist/ssr";
const Logo = () => (
  <Link href="/" className="flex items-center gap-2 text-gray-700">
    <MapPinArea className="size-6" weight="fill" />
    <span className="font-semibold text-lg">adrify</span>
  </Link>
);

export default Logo;
