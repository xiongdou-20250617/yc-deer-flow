// Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
// SPDX-License-Identifier: MIT

import { UserRound } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";

import { Tooltip } from "~/components/deer-flow/tooltip";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
  DialogTitle
} from "~/components/ui/dialog";
import { Tabs, TabsContent } from "~/components/ui/tabs";
import { useReplay } from "~/core/replay";
import {
  type SettingsState,
  changeSettings,
  saveSettings,
  useSettingsStore,
} from "~/core/store";
import { cn } from "~/lib/utils";

import { USER_TABS } from "../tabs";

export function UserDialog() {
  const { isReplay } = useReplay();
  const [activeTabId, setActiveTabId] = useState(USER_TABS[0]!.id);
  const [open, setOpen] = useState(false);
  const [settings, setSettings] = useState(useSettingsStore.getState());
  const [changes, setChanges] = useState<Partial<SettingsState>>({});

  const handleTabChange = useCallback(
    (newChanges: Partial<SettingsState>) => {
      setTimeout(() => {
        if (open) {
          setChanges((prev) => ({
            ...prev,
            ...newChanges,
          }));
        }
      }, 0);
    },
    [open],
  );

  const handleSave = useCallback(() => {
    if (Object.keys(changes).length > 0) {
      const newSettings: SettingsState = {
        ...settings,
        ...changes,
      };
      setSettings(newSettings);
      setChanges({});
      changeSettings(newSettings);
      saveSettings();
    }
    setOpen(false);
  }, [settings, changes]);

  const handleOpen = useCallback(() => {
    setSettings(useSettingsStore.getState());
  }, []);

  const handleClose = useCallback(() => {
    setChanges({});
  }, []);

  // 处理认证成功后的操作
  const handleAuthSuccess = useCallback((action: 'login' | 'register') => {
    if (action === 'login') {
      setOpen(false); // 关闭弹窗
      window.location.reload(); // 添加页面刷新
    } else if (action === 'register') {
      // 注册成功后切换到登录标签页
      const loginTab = USER_TABS.find(tab => tab.label === '登录');
      if (loginTab) {
        setActiveTabId(loginTab.id);
      }
    }
  }, []);

  useEffect(() => {
    if (open) {
      handleOpen();
    } else {
      handleClose();
    }
  }, [open, handleOpen, handleClose]);

  const mergedSettings = useMemo<SettingsState>(() => {
    return {
      ...settings,
      ...changes,
    };
  }, [settings, changes]);

  if (isReplay) {
    return null;
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Tooltip title="登录注册">
        <DialogTrigger asChild>
          <Button variant="ghost" size="icon">
            <UserRound />
          </Button>
        </DialogTrigger>
      </Tooltip>
      <DialogContent className="sm:max-w-[450px]">
        <DialogHeader>
          <DialogTitle>
            <ul className="flex w-50 shrink-0 p-1">
              {USER_TABS.map((tab) => (
                <li
                  key={tab.id}
                  className={cn(
                    "hover:accent-foreground hover:bg-accent mb-1 flex h-8 w-full cursor-pointer items-center justify-center gap-1.5 rounded px-2",
                    activeTabId === tab.id &&
                      "!bg-primary !text-primary-foreground",
                  )}
                  onClick={() => setActiveTabId(tab.id)}
                >
                  <tab.icon size={16} />
                  <span>{tab.label}</span>
                  {tab.badge && (
                    <Badge
                      variant="outline"
                      className={cn(
                        "border-muted-foreground text-muted-foreground ml-auto px-1 py-0 text-xs",
                        activeTabId === tab.id &&
                          "border-primary-foreground text-primary-foreground",
                      )}
                    >
                      {tab.badge}
                    </Badge>
                  )}
                </li>
              ))}
            </ul>
          </DialogTitle>
        </DialogHeader>
        <Tabs value={activeTabId}>
          <div className="h-120 w-full overflow-auto border-y">
            <div className="min-w-0 flex-grow">
              <div
                id="settings-content-scrollable"
                className="size-full overflow-auto p-4 pt-12"
              >
                {USER_TABS.map((tab) => (
                  <TabsContent key={tab.id} value={tab.id}>
                    <tab.component
                      settings={mergedSettings}
                      onChange={handleTabChange}
                      onAuthSuccess={handleAuthSuccess}
                    />
                  </TabsContent>
                ))}
              </div>
            </div>
          </div>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
