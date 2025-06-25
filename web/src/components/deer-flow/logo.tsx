// Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
// SPDX-License-Identifier: MIT

import Link from "next/link";

export function Logo() {
  return (
    <Link
      className="flex items-center opacity-70 transition-opacity duration-300 hover:opacity-100"
      href="/"
    >
      <img src="/images/logo-1.png" className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" style={{
        width: 'auto',
        height: "32px",
        marginRight: '8px'
      }}></img>
      <img src="/images/logo.png" className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" style={{
        width: 'auto',
        height: "32px",
        marginRight: '8px'
      }}></img>
    </Link>
  );
}
