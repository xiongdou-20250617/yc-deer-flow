// Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
// SPDX-License-Identifier: MIT

import { zodResolver } from "@hookform/resolvers/zod";
import { UserRoundCheck } from "lucide-react";
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

const signinFormSchema = z.object({
  account: z.string().min(1, "请输入账号"),
  password: z.string().min(1, "请输入密码"),
});

interface SigninTabProps {
  settings: SettingsState;
  onChange: (changes: Partial<SettingsState>) => void;
  onAuthSuccess?: (action: 'login' | 'register') => void;
}

export const SigninTab: Tab = ({
  settings,
  onChange,
  onAuthSuccess,
}: SigninTabProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof signinFormSchema>>({
    resolver: zodResolver(signinFormSchema),
    defaultValues: settings.general,
    mode: "onBlur",
  });

  const onSubmit = async (values: z.infer<typeof signinFormSchema>) => {
    try {
      setIsLoading(true);
      onChange({ general: values });
      
      const response = await apiClient.post('/api/auth:signIn', {
        account: values.account,
        password: values.password,
      });

      toast.success("登录成功");
      if (response?.data?.token) {
        const { token, user } = response.data;
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
      }
      
      // 调用父组件回调
      onAuthSuccess?.('login');
      
      form.reset();
      
    } catch (error: any) {
      console.error("登录失败:", error);
      toast.error("登录失败", {
        description: error.response?.data?.message || "请检查您的账号和密码",
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
              name="account"
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
            
            <Button 
              type="submit" 
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? "登录中..." : "登录"}
            </Button>
          </form>
        </Form>
      </main>
    </div>
  );
};

SigninTab.displayName = "SigninTab";
SigninTab.label = "登录";
SigninTab.icon = UserRoundCheck;
