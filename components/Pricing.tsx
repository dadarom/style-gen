// Pricing组件 - 价格计划展示
import React from 'react';
import { Button } from '@/components/ui/button';
import { PRICING_PLANS, SINGLE_PRICE } from '../data/pricing';

export function Pricing() {
  return (
    <section className="py-20 px-4 bg-background/50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black tracking-tighter uppercase mb-6">
            简单透明的 <span className="text-primary">定价</span>
          </h2>
          <p className="max-w-2xl mx-auto text-muted-foreground">
            按次付费，无需订阅。高品质输出，稳定可靠的AI风格转换服务。
          </p>
        </div>

        {/* 单次生成 */}
        <div className="mb-16">
          <div className="border-2 border-primary bg-primary/5 p-6 rounded-none">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <div>
                <h3 className="text-xl font-bold uppercase mb-2">单次生成</h3>
                <p className="text-sm text-muted-foreground">适合偶尔使用的用户，按次付费无压力</p>
              </div>
              <div className="text-center md:text-right">
                <div className="text-3xl font-bold mb-2">¥{SINGLE_PRICE}</div>
                <p className="text-xs text-muted-foreground">/ 次</p>
              </div>
              <div>
                <Button className="rounded-none bg-primary text-primary-foreground font-bold uppercase text-sm hover:bg-primary/90 border-2 border-transparent hover:border-primary">
                  立即购买
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* 套餐优惠 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PRICING_PLANS.map((plan) => (
            <div 
              key={plan.id} 
              className={`border-2 ${plan.isPopular ? 'border-primary bg-primary/5 shadow-[8px_8px_0px_0px_rgba(0,0,0,0.1)]' : 'border-border'} transition-all hover:translate-y-[-4px]`}
            >
              {plan.isPopular && (
                <div className="bg-primary text-primary-foreground text-xs font-mono font-bold uppercase tracking-wide px-4 py-1">
                  最受欢迎
                </div>
              )}
              
              <div className="p-6">
                <h3 className="text-xl font-bold uppercase mb-1">{plan.name}</h3>
                <p className="text-sm text-muted-foreground mb-6">{plan.description}</p>
                
                <div className="border-t border-border pt-6 mb-6">
                  <div className="text-3xl font-bold mb-2">¥{plan.price}</div>
                  <p className="text-xs text-muted-foreground">{plan.usageDescription}</p>
                  <p className="text-xs text-primary mt-2 font-mono">省: ¥{plan.savings}</p>
                </div>
                
                <div className="mb-8 space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="mt-1 w-4 h-4 bg-primary text-primary-foreground flex items-center justify-center font-bold text-xs">✓</div>
                    <p className="text-sm">{plan.features}</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="mt-1 w-4 h-4 bg-primary text-primary-foreground flex items-center justify-center font-bold text-xs">✓</div>
                    <p className="text-sm">{plan.generateCount} 次生成</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="mt-1 w-4 h-4 bg-primary text-primary-foreground flex items-center justify-center font-bold text-xs">✓</div>
                    <p className="text-sm">30 天有效期</p>
                  </div>
                </div>
                
                <Button 
                  className={`w-full rounded-none font-bold uppercase text-sm ${plan.isPopular 
                    ? 'bg-primary text-primary-foreground hover:bg-primary/90' 
                    : 'bg-background border-2 border-border hover:border-primary hover:text-primary'}`}
                >
                  选择{plan.name}
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* 底部说明 */}
        <div className="mt-12 text-center text-xs text-muted-foreground max-w-2xl mx-auto">
          <p>注意事项：生成失败不扣除次数，支持常见图片格式，生成结果可永久保存。如有任何问题，请联系客服。</p>
        </div>
      </div>
    </section>
  );
}