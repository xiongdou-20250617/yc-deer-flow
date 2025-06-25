/*
 * @Author: xiongdou-20250617 1126927171@qq.com
 * @Date: 2025-06-24 16:43:08
 * @LastEditors: xiongdou-20250617 1126927171@qq.com
 * @LastEditTime: 2025-06-24 17:09:11
 * @FilePath: \web\src\app\landing\sections\case-study-section.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
// SPDX-License-Identifier: MIT

import { Bike, Building, Film, Github, Ham, Home, Pizza, Hand, Bot,Cherry } from "lucide-react";
import { BentoCard } from "~/components/magicui/bento-grid";

import { SectionHeader } from "../components/section-header";

const caseStudies = [
  {
    id: "yc-dify-to-mcp",
    icon: Hand,
    title: "将Dify工作流包装成MCP的研究计划",
    description: "本研究组合Dify、MCP相关知识，分析Dify与MCP的技术集成方案，包括可能的架构设计、技术选型、集成步骤和预期挑战。",
  },
  {
    id: "yc-lz",
    icon: Cherry,
    title: "研究'红尘一骑妃子笑'的由来",
    description: "研究“红尘一骑妃子笑”的历史典故与文化解读",
  },
  {
    id: "yc-js",
    icon: Hand,
    title: "云创AI测试",
    description: "云创AI测试",
  },
  {
    id: "yc-test-01",
    icon: Bot,
    title: "云创AI测试01",
    description: "云创AI测试",
  },
];

export function CaseStudySection() {
  return (
    <section className="relative container hidden flex-col items-center justify-center md:flex">
      <SectionHeader
        anchor="case-studies"
        title="案例研究"
        description="通过回放演示查看云创AI的实际应用效果"
      />
      <div className="grid w-3/4 grid-cols-1 gap-2 sm:w-full sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {caseStudies.map((caseStudy) => (
          <div key={caseStudy.title} className="w-full p-2">
            <BentoCard
              {...{
                Icon: caseStudy.icon,
                name: caseStudy.title,
                description: caseStudy.description,
                href: `/chat?replay=${caseStudy.id}`,
                cta: "点击观看重播",
                className: "w-full h-full",
              }}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
