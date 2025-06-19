/*
 * @Author: xiongdou-20250617 1126927171@qq.com
 * @Date: 2025-06-17 15:20:20
 * @LastEditors: xiongdou-20250617 1126927171@qq.com
 * @LastEditTime: 2025-06-19 11:53:48
 * @FilePath: \web\next.config.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
// Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
// SPDX-License-Identifier: MIT

import "./src/env.js";

/** @type {import("next").NextConfig} */

// DeerFlow leverages **Turbopack** during development for faster builds and a smoother developer experience.
// However, in production, **Webpack** is used instead.
//
// This decision is based on the current recommendation to avoid using Turbopack for critical projects, as it
// is still evolving and may not yet be fully stable for production environments.

const config = {
  // For development mode
  turbopack: {
    rules: {
      "*.md": {
        loaders: ["raw-loader"],
        as: "*.js",
      },
    },
  },

  // 添加API代理配置
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://n2.antoma.cn/:path*',
      },
    ];
  },

  // For production mode
  webpack: (config) => {
    config.module.rules.push({
      test: /\.md$/,
      use: "raw-loader",
    });
    return config;
  },

  output: "standalone",
};

export default config;
