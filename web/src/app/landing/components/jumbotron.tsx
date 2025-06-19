// Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
// SPDX-License-Identifier: MIT

import { GithubFilled } from "@ant-design/icons";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

import { AuroraText } from "~/components/magicui/aurora-text";
import { FlickeringGrid } from "~/components/magicui/flickering-grid";
import { Button } from "~/components/ui/button";
import { env } from "~/env";

export function Jumbotron() {
  return (
    <section className="flex h-[95vh] w-full flex-col items-center justify-center pb-15">
      <div className="relative z-10 flex flex-col items-center justify-center gap-12">
        <h1 className="text-center text-4xl font-bold md:text-6xl">
          <span className="bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
            深度研究{" "}
          </span>
          <AuroraText>触手可及</AuroraText>
        </h1>
        <p className="max-w-4xl p-2 text-center text-sm opacity-85 md:text-2xl">
          认识云创AI, 您的智能深度研究助手。集成搜索引擎、网络爬虫、Python和MCP服务等强大工具，为您即时生成深度洞察、全面报告乃至引人入胜的播客内容。
        </p>
        <div className="flex gap-6">
          <Button className="hidden text-lg md:flex md:w-42" size="lg" asChild>
            <Link
              target={
                env.NEXT_PUBLIC_STATIC_WEBSITE_ONLY ? "_blank" : undefined
              }
              href={
                env.NEXT_PUBLIC_STATIC_WEBSITE_ONLY
                  ? ""
                  : "/chat"
              }
            >
              开始使用 <ChevronRight />
            </Link>
          </Button>
        </div>
      </div>
      <div className="absolute bottom-8 flex text-xs opacity-50">
        <p>* DEER代表深度探索与高效研究。</p>
      </div>
    </section>
  );
}
