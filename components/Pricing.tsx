// Pricing组件 - 价格计划展示
'use client'
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { PRICING_PLANS, SINGLE_PRICE } from '../data/pricing';

export function Pricing() {
  const [selectedPlan, setSelectedPlan] = useState<string | null>('standard');

  const handlePlanSelect = (planId: string) => {
    setSelectedPlan(planId);
  };

  const handleSinglePurchase = () => {
    setSelectedPlan('single');
  };

  // 获取当前选中套餐的详细信息
  const getSelectedPlanInfo = () => {
    if (selectedPlan === 'single') {
      return {
        name: '单次生成',
        description: '适合偶尔使用的用户，按次付费无压力',
        price: SINGLE_PRICE,
        priceUnit: '/ 次'
      };
    }
    return PRICING_PLANS.find(plan => plan.id === selectedPlan);
  };

  return (
    <section className="py-20 px-4 bg-background/50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 mt-10">
          <h2 className="text-3xl md:text-5xl font-black tracking-tighter uppercase mb-6 mt-8">
            简单透明的 <span className="text-primary">定价</span>
          </h2>
          <p className="max-w-2xl mx-auto text-muted-foreground">
            按次付费，无需订阅。高品质输出，稳定可靠的AI风格转换服务。
          </p>
        </div>

        {/* 单次生成 */}
        <div className="mb-16">
          <div className={`border-2 ${selectedPlan === 'single' ? 'border-primary bg-primary/10 shadow-[8px_8px_0px_0px_rgba(0,0,0,0.15)]' : 'border-primary bg-primary/5 shadow-[6px_6px_0px_0px_rgba(0,0,0,0.1)]'} p-8 rounded-none transition-all hover:translate-y-[-2px]`} onClick={handleSinglePurchase} style={{ cursor: 'pointer' }}>
            <div className="flex flex-col md:flex-row justify-between items-center gap-8">
              <div>
                <h3 className="text-xl font-bold uppercase mb-2">单次生成</h3>
                <p className="text-sm text-muted-foreground">适合偶尔使用的用户，按次付费无压力</p>
              </div>
              <div className="text-center md:text-right">
                <div className="text-4xl font-black mb-2">¥{SINGLE_PRICE}</div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider">/ 次</p>
              </div>
              <div>
                <Button 
                  className="rounded-none bg-primary text-primary-foreground font-bold uppercase text-sm px-8 py-3 hover:bg-primary/90 border-2 border-transparent hover:border-primary transition-all hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)]"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSinglePurchase();
                  }}
                >
                  立即购买
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* 套餐优惠 */}
        <div className="mb-12">
          {/* 选中套餐确认区域 */}
          {selectedPlan && (
            <div className="mb-8 border-2 border-primary bg-primary/10 p-6 rounded-none shadow-[6px_6px_0px_0px_rgba(0,0,0,0.1)]">
              <h3 className="text-xl font-bold uppercase mb-4">确认选择</h3>
              {(() => {
                const planInfo = getSelectedPlanInfo();
                if (planInfo) {
                  return (
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                      <div>
                        <h4 className="font-bold text-lg">{planInfo.name}</h4>
                        <p className="text-muted-foreground">{planInfo.description}</p>
                      </div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-black">¥{planInfo.price}</span>
                        {selectedPlan === 'single' && <span className="text-sm text-muted-foreground">/ 次</span>}
                      </div>
                      <div>
                        <Button 
                          className="rounded-none bg-primary text-primary-foreground font-bold uppercase text-sm px-8 py-3 hover:bg-primary/90 border-2 border-transparent hover:border-primary transition-all hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)]"
                          onClick={() => {
                            // 这里可以添加购买逻辑
                            alert(`确认购买 ${planInfo.name}，价格：¥${planInfo.price}`);
                          }}
                        >
                          理解购买
                        </Button>
                      </div>
                    </div>
                  );
                }
              })()}
            </div>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PRICING_PLANS.map((plan) => (
              <div 
                key={plan.id} 
                className={`border-2 ${selectedPlan === plan.id ? 'border-primary bg-primary/10 shadow-[8px_8px_0px_0px_rgba(0,0,0,0.15)]' : (plan.popular ? 'border-border bg-background shadow-[6px_6px_0px_0px_rgba(0,0,0,0.1)]' : 'border-border bg-background')} transition-all hover:translate-y-[-4px] h-full flex flex-col`}
                onClick={() => handlePlanSelect(plan.id)}
                style={{ cursor: 'pointer' }}
              >
                {plan.popular && (
                  <div className="bg-primary text-primary-foreground text-xs font-mono font-bold uppercase tracking-wide px-4 py-1">
                    最受欢迎
                  </div>
                )}
                
                <div className="p-6 flex flex-col h-full">
                  <h3 className="text-xl font-bold uppercase mb-1">{plan.name || '套餐'}</h3>
                  <p className="text-sm text-muted-foreground mb-6">{plan.description || '标准套餐'}</p>
                  
                  <div className="border-t border-border pt-6 mb-6">
                    <div className="text-3xl font-bold mb-2">¥{plan.price || 0}</div>
                    <p className="text-xs text-muted-foreground">{plan.description || '按次计费'}</p>
                  </div>
                  
                  <div className="mb-8 space-y-3 flex-grow">
                    <div className="flex items-start gap-3">
                      <div className="mt-1 w-4 h-4 bg-primary text-primary-foreground flex items-center justify-center font-bold text-xs">✓</div>
                      <p className="text-sm">标准功能套餐</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="mt-1 w-4 h-4 bg-primary text-primary-foreground flex items-center justify-center font-bold text-xs">✓</div>
                      <p className="text-sm">无限次生成</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="mt-1 w-4 h-4 bg-primary text-primary-foreground flex items-center justify-center font-bold text-xs">✓</div>
                      <p className="text-sm">30 天有效期</p>
                    </div>
                  </div>
                  
                  <Button 
                    className={`w-full rounded-none font-bold uppercase text-sm ${plan.popular 
                      ? 'bg-primary text-primary-foreground hover:bg-primary/90' 
                      : 'bg-background border-2 border-border hover:border-primary hover:text-primary'} ${selectedPlan === plan.id ? 'scale-105 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.15)]' : ''}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePlanSelect(plan.id);
                    }}
                  >
                    立即购买
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 底部说明 */}
        <div className="mt-12 text-center text-xs text-muted-foreground max-w-2xl mx-auto">
          <p>注意事项：生成失败不扣除次数，支持常见图片格式，生成结果可永久保存。如有任何问题，请联系客服。</p>
        </div>
      </div>
    </section>
  );
}