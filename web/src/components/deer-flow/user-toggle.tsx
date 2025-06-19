// Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
// SPDX-License-Identifier: MIT

"use client";

import { Monitor, Moon, Sun, UserRound, LogOut } from "lucide-react";
import { useCallback, useEffect, useMemo, useState,Suspense } from "react";
import { Modal, Tabs, Button as AntdButton, Checkbox, Form, Input, message, Drawer } from 'antd';

import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";

import { UserDialog } from "../../app/user/dialogs/user-dialog";

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

export const UserToggle: React.FC = () => {
  // 登录注册弹窗
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [activeTab, setActiveTab] = useState('1');
  const [loading, setLoading] = useState(false);


  // 用户信息
  const [user, setUser] = useState(null);

  useEffect(() => {
    // 从localStorage中获取user数据
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);


  const handleLogout = async () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    message.success('已退出登录');
    // setLoading(true);
    // try {
    //   const response = await apiClient.post('/api/auth:signOut', {});
    //   localStorage.removeItem('token');
    //   localStorage.removeItem('user');
    //   setUser(null);
    //   message.success('已退出登录');
    // } catch (error) {
    //   console.error("退出失败:", error);
    //   message.error(error.response?.data?.message || '退出失败，请重试');
    // } finally {
    //   setLoading(false);
    // }
  };


  return (
    <>

      {user ? (
        <DropdownMenu>
          <Tooltip title="用户信息">
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon"> 
                <UserRound className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
                <UserRound className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
               
              </Button>
            </DropdownMenuTrigger>
          </Tooltip>
          <DropdownMenuContent align="end">

            <DropdownMenuItem onClick={() => handleLogout()}>
              {/* <LogOut className="mr-2 h-4 w-4" /> */}
              <span >
                {user?.nickname || user?.username}
              </span>
            </DropdownMenuItem>

            <DropdownMenuItem onClick={() => handleLogout()}>
              <LogOut className="mr-2 h-4 w-4" />
              <span >
                退出
              </span>
            </DropdownMenuItem>

          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        
        <Suspense>
          <UserDialog />
        </Suspense>

      )}
    </>

  );
}
