// Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
// SPDX-License-Identifier: MIT
"use client";

import { StarFilledIcon, GitHubLogoIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";

import { NumberTicker } from "~/components/magicui/number-ticker";
import { Button } from "~/components/ui/button";
import { UserToggle } from "~/components/deer-flow/user-toggle";
import { HistoryToggle } from "~/components/deer-flow/history-toggle";
import { env } from "~/env";
import { apiClient } from "~/lib/apiClient";

export const SiteHeader: React.FC = () => {
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  // 用户信息
  const [user, setUser] = useState(null);

  useEffect(() => {
    // 从localStorage中获取user数据
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);
  return (
    <>
      <header className="supports-backdrop-blur:bg-background/80 bg-background/40 sticky top-0 left-0 z-40 flex h-15 w-full flex-col items-center backdrop-blur-lg">
        <div className="container flex h-15 items-center justify-between px-3">
          <div className="text-xl font-medium flex items-center justify-center">
            <img src="/images/logo.png" style={{
              width: 'auto',
              height: "32px",
              marginRight: '8px'
            }}></img>
          </div>
          <div className="relative flex items-center">
            <div
              className="pointer-events-none absolute inset-0 z-0 h-full w-full rounded-full opacity-60 blur-2xl"
              style={{
                background: "linear-gradient(90deg, #ff80b5 0%, #9089fc 100%)",
                filter: "blur(32px)",
              }}
            />

            <UserToggle />
          </div>
        </div>
        <hr className="from-border/0 via-border/70 to-border/0 m-0 h-px w-full border-none bg-gradient-to-r" />
      </header>
    </>
  );
}
