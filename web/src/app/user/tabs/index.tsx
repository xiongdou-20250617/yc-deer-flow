// Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
// SPDX-License-Identifier: MIT

import { UserRound, type LucideIcon } from "lucide-react";

import { SignupTab } from "./signup-tab";
import { SigninTab } from "./signin-tab";

export const USER_TABS = [SigninTab, SignupTab].map((tab) => {
  const name = tab.name ?? tab.displayName;
  const label = tab.label ?? tab.name
  return {
    ...tab,
    id: name.replace(/Tab$/, "").toLocaleLowerCase(),
    label: label,
    icon: (tab.icon ?? <UserRound />) as LucideIcon,
    component: tab,
  };
});
