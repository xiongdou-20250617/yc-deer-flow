// Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
// SPDX-License-Identifier: MIT

import { zodResolver } from "@hookform/resolvers/zod";
import { Star,UserRoundPlus } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { apiClient } from "~/lib/apiClient";
import { toast } from "sonner";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import type { SettingsState } from "~/core/store";
import type { Tab } from "../../settings/tabs/types";

const signupFormSchema = z.object({
  username: z.string().min(1, "请输入账号"),
  password: z.string().min(6, "密码长度不能少于6位"),
  confirm_password: z.string(),
}).refine((data) => data.password === data.confirm_password, {
  message: "两次输入的密码不一致",
  path: ["confirm_password"],
});

interface SignupTabProps {
  settings: SettingsState;
  onChange: (changes: Partial<SettingsState>) => void;
  onAuthSuccess?: (action: 'login' | 'register') => void; // 新增props
}

export const SignupTab: Tab = ({
  settings,
  onChange,
  onAuthSuccess, // 接收父组件传递的回调
}: SignupTabProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof signupFormSchema>>({
    resolver: zodResolver(signupFormSchema),
    defaultValues: settings.general,
    mode: "onBlur",
  });

  const onSubmit = async (values: z.infer<typeof signupFormSchema>) => {
    try {
      setIsLoading(true);
      onChange({ general: values });
      
      const response = await apiClient.post('/api/auth:signUp', {
        username: values.username,
        password: values.password,
      });

      toast.success("注册成功", {
        description: "您的账号已成功创建",
      });

      form.reset();
      
      // 注册成功后调用父组件的回调，通知注册成功
      onAuthSuccess?.('register');
      
    } catch (error: any) {
      console.error("注册失败:", error);
      toast.error("注册失败", {
        description: error.response?.data?.message || "注册失败，请重试",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <main>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>账号</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="请输入账号" 
                      {...field} 
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>密码</FormLabel>
                  <FormControl>
                    <Input 
                      type="password" 
                      placeholder="请输入密码" 
                      {...field} 
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="confirm_password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>确认密码</FormLabel>
                  <FormControl>
                    <Input 
                      type="password" 
                      placeholder="请再次输入密码" 
                      {...field} 
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <Button 
              type="submit" 
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? "处理中..." : "注册"}
            </Button>
          </form>
        </Form>
      </main>
    </div>
  );
};

SignupTab.displayName = "SignupTab";
SignupTab.label = "注册";
SignupTab.icon = UserRoundPlus;
