// Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
// SPDX-License-Identifier: MIT

"use client";

import { useState, useEffect } from "react";
import { PencilRuler, Trash2, ArrowUpToLine, Ellipsis, History, ChevronsRight, MousePointer2 } from "lucide-react";
import { Tooltip } from "~/components/deer-flow/tooltip";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import {
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerTrigger,
    DrawerTitle
} from "~/components/ui/drawer";
import { cn } from "~/lib/utils";
import { apiClient } from "~/lib/apiClient";
import styles from './history-drawer.module.css';

interface HistoryItem {
    id: number;
    name: string;
}

export function HistoryDrawer() {
    const [open, setOpen] = useState(false);
    const [activeId, setActiveId] = useState<number | null>(null);
    const [loading, setLoading] = useState(false);
    const [histories, setHistories] = useState<HistoryItem[]>([]);

    const handleActiveHistory = (id: number) => {
        // setActiveId(id);

    };

    useEffect(() => {
        console.log('进来了')
        fetchData();
    }, []); // 空依赖数组表示只运行一次

    // 封装异步操作到effect内部
    const fetchData = async () => {
        setLoading(true);
        try {
            // 分类
            const rsp = await apiClient.get("/api/ai_history:list", {
                params: {
                    pageSize: 10,
                    appends: ["event_files"],
                    filter: JSON.stringify({})
                }
            });
            // 修复对象字面量语法并正确映射历史记录数据 ↓
            setHistories(rsp?.data || []); // 确保设置默认空数组
        } catch (error) {
            console.error("页面内容请求失败:", error);
        } finally {
            setLoading(false);
        }
    };
    // 删除
    const hisDelete = async (id: number) => {
        console.log('删除！')
    }

    return (
        <Drawer open={open} onOpenChange={setOpen} >
            <Tooltip title="历史记录">
                <DrawerTrigger asChild>
                    <Button variant="ghost" size="icon">
                        <History />
                    </Button>
                </DrawerTrigger>
            </Tooltip>
            <DrawerContent className={cn("sm:max-w-[450px]", styles.drawerContent)} side="right">
                <DrawerHeader className={styles.drawerHeader}>
                    <DrawerTitle className={styles.drawerTitle}>
                        <div className="flex items-center">
                            <History className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
                            <History className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
                            历史记录
                        </div>

                    </DrawerTitle>
                </DrawerHeader>
                <div className={styles.historyPart}>
                    {histories.length === 0 ? (
                        <div className="text-center py-8 text-gray-500">暂无历史记录</div>
                    ) : (

                        <ul className={styles.historyList}>
                            {histories.map((item) => (
                                <li key={item.id} className={styles.historyItem}>
                                    <Link href={`/chat?replay=${item.id}`}></Link>
                                    <div
                                        className={cn(
                                            styles.chatInfoItem,
                                            activeId === item.id && styles.routerLinkActive
                                        )}
                                        onClick={() => handleActiveHistory(item.id)}
                                    >
                                        <div className={`${styles.chatInfo} text-muted-foreground`}>
                                            <div className={styles.chatName}>{item.title}</div>
                                            <div className={styles.chatEdit}>
                                                <DropdownMenu>
                                                    <Tooltip title="编辑">
                                                        <DropdownMenuTrigger asChild>
                                                            <Button variant="ghost" size="icon">
                                                                <Ellipsis className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
                                                                <Ellipsis className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
                                                            </Button>
                                                        </DropdownMenuTrigger>
                                                    </Tooltip>
                                                    <DropdownMenuContent align="end">
                                                        <DropdownMenuItem >
                                                            <PencilRuler className="mr-2 h-4 w-4" />
                                                            <span>编辑标题</span>
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem>
                                                            <ArrowUpToLine className="mr-2 h-4 w-4" />
                                                            <span>置顶</span>
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem onClick={() => hisDelete(item.id)}>
                                                            <Trash2 className="mr-2 h-4 w-4" />
                                                            <span>删除</span>

                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </div>

                                        </div>

                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}

                </div>
            </DrawerContent>
        </Drawer>
    );
}
