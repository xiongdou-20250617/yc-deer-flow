// Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
// SPDX-License-Identifier: MIT

"use client";

import { History } from "lucide-react";
import { useCallback, useEffect, useMemo, useState,Suspense } from "react";
import { Modal, Tabs, Button as AntdButton, Checkbox, Form, Input, message, Drawer } from 'antd';

import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";

import { HistoryDrawer } from "../../app/history/history-drawer";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { cn } from "~/lib/utils";
import { apiClient } from "~/lib/apiClient";

import { Tooltip } from "./tooltip";

export const HistoryToggle: React.FC = () => {
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
      {user && (
        <Suspense>
          <HistoryDrawer />
        </Suspense>

      )}
    </>

  );
}
