"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Upload, Wand2, Download, Check, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { Textarea } from "@/components/ui/textarea"

type Step = "API_KEY" | "UPLOAD" | "STYLE" | "GENERATING" | "RESULT"

const CATEGORIES = ["全部", "艺术风格", "摄影风格", "电商专用", "人像美化", "创意风格"]

const STYLES = [
  // Art
  { id: "oil", name: "油画", category: "艺术风格", img: "/abstract-oil-painting.png" },
  { id: "watercolor", name: "水彩", category: "艺术风格", img: "/watercolor.jpg" },
  { id: "sketch", name: "素描", category: "艺术风格", img: "/pencil-sketch.png" },
  { id: "cartoon", name: "卡通", category: "艺术风格", img: "/cartoon-art.jpg" },
  { id: "manga", name: "漫画", category: "艺术风格", img: "/manga-style.jpg" },

  // Photography
  { id: "film", name: "复古胶片", category: "摄影风格", img: "/vintage-film.png" },
  { id: "cinematic", name: "电影感", category: "摄影风格", img: "/cinematic-shot.jpg" },
  { id: "cyberpunk", name: "赛博朋克", category: "摄影风格", img: "/cyberpunk-city.png" },
  { id: "ins", name: "INS风", category: "摄影风格", img: "/instagram-filter.jpg" },

  // E-commerce
  { id: "product_polish", name: "商品精修", category: "电商专用", img: "/product-photography-still-life.png" },
  { id: "white_bg", name: "白底图", category: "电商专用", img: "/white-background-product.jpg" },
  { id: "scene", name: "场景图", category: "电商专用", img: "/product-lifestyle.png" },
  { id: "model", name: "模特展示", category: "电商专用", img: "/fashion-model.png" },

  // Portrait
  { id: "beauty", name: "美颜滤镜", category: "人像美化", img: "/beauty-portrait.jpg" },
  { id: "id_photo", name: "证件照", category: "人像美化", img: "/id-photo.jpg" },
  { id: "art_portrait", name: "艺术肖像", category: "人像美化", img: "/artistic-portrait.png" },

  // Creative
  { id: "pixel", name: "像素艺术", category: "创意风格", img: "/pixel-art-cityscape.png" },
  { id: "abstract", name: "抽象画", category: "创意风格", img: "/abstract-composition.png" },
  { id: "ink", name: "国风水墨", category: "创意风格", img: "/chinese-ink-painting.jpg" },
]

export function Workflow() {
  const [step, setStep] = useState<Step>("API_KEY")
  const [apiKey, setApiKey] = useState("")
  const [image, setImage] = useState<string | null>(null)
  const [selectedStyle, setSelectedStyle] = useState<string | null>(null)
  const [customStyle, setCustomStyle] = useState("")
  const [progress, setProgress] = useState(0)
  const [activeCategory, setActiveCategory] = useState("全部")

  // Mock generation progress
  useEffect(() => {
    if (step === "GENERATING") {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval)
            setStep("RESULT")
            return 100
          }
          return prev + 1.5 // Approx 60s to reach 100% if updated every 100ms, actually this is faster (~6.6s). Slowing it down for demo feel.
        })
      }, 100) // Faster than 60s for demo purposes, user won't wait 60s in a preview
      return () => clearInterval(interval)
    } else {
      setProgress(0)
    }
  }, [step])

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setImage(e.target?.result as string)
        setStep("STYLE")
      }
      reader.readAsDataURL(file)
    }
  }

  const filteredStyles = activeCategory === "全部" ? STYLES : STYLES.filter((s) => s.category === activeCategory)

  return (
    <section className="container mx-auto px-4 pb-24 flex flex-col items-center max-w-6xl">
      {/* Progress Steps - Neo-Brutalism Redesign */}
      <div className="w-full mb-12 border border-border bg-card/50 p-4 hidden md:block">
        <div className="flex items-center justify-between relative">
          {/* Connecting Line */}
          <div className="absolute left-0 right-0 top-1/2 h-[1px] bg-border -z-10" />

          <StepIndicator current={step} step="API_KEY" label="01. 验证" number="01" />
          <StepIndicator current={step} step="UPLOAD" label="02. 上传" number="02" />
          <StepIndicator current={step} step="STYLE" label="03. 风格" number="03" />
          <StepIndicator current={step} step="GENERATING" label="04. 生成" number="04" />
          <StepIndicator current={step} step="RESULT" label="05. 结果" number="05" />
        </div>
      </div>

      <div className="w-full min-h-[600px] border-2 border-border bg-card relative overflow-hidden shadow-[8px_8px_0px_0px_rgba(255,255,255,0.1)]">
        {/* Decorative tech elements */}
        <div className="absolute top-0 left-0 p-2 border-b border-r border-border font-mono text-[10px] text-primary/80">
          SYS.V.2.0 // READY
        </div>
        <div className="absolute top-0 right-0 p-2 border-b border-l border-border font-mono text-[10px] text-muted-foreground">
          MEM: 64GB // OK
        </div>

        {/* Corner crosses */}
        <div className="absolute top-4 right-4 w-4 h-4 border-t border-r border-primary opacity-50" />
        <div className="absolute bottom-4 left-4 w-4 h-4 border-b border-l border-primary opacity-50" />

        <AnimatePresence mode="wait">
          {/* Step 1: API Key */}
          {step === "API_KEY" && (
            <motion.div
              key="api"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center"
            >
              <div className="max-w-md w-full space-y-8 border border-border p-8 bg-background/50 relative shadow-[8px_8px_0px_0px_rgba(0,0,0,0.1)]">
                <div className="absolute -top-3 -left-3 bg-primary text-primary-foreground text-xs font-bold px-2 py-1 font-mono">
                  AUTH_MODULE
                </div>

                <div className="space-y-4">
                  <h2 className="text-4xl font-bold uppercase tracking-tighter">身份验证</h2>
                  <p className="text-sm font-mono text-muted-foreground border-l-2 border-primary pl-4 text-left">
                    // ACCESS_CONTROL
                    <br />
                    请输入您的 StyleGen API Key 以解锁神经风格转换引擎。
                  </p>
                </div>
                <div className="flex flex-col gap-4">
                  <div className="relative group">
                    <Input
                      placeholder="sk-..."
                      className="font-mono bg-white border-2 border-border h-14 text-lg rounded-none focus-visible:ring-primary focus-visible:ring-offset-0 pl-4 text-black placeholder:text-gray-400"
                      value={apiKey}
                      onChange={(e) => setApiKey(e.target.value)}
                      type="password"
                    />
                    <div className="absolute right-0 top-0 bottom-0 w-4 bg-border/20 group-hover:bg-primary/20 transition-colors pointer-events-none" />
                  </div>
                  <Button
                    onClick={() => apiKey && setStep("UPLOAD")}
                    disabled={!apiKey}
                    className="h-14 text-lg font-bold uppercase tracking-widest rounded-none border-2 border-primary bg-primary text-primary-foreground hover:bg-primary/90 hover:translate-x-1 hover:translate-y-1 transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)] hover:shadow-none"
                  >
                    验证 / VERIFY
                  </Button>
                </div>
                <div className="text-xs font-mono text-muted-foreground flex justify-between border-t border-border pt-4 mt-4">
                  <span>STATUS: WAITING</span>
                  <a href="#" className="text-primary hover:underline decoration-2 underline-offset-4">
                    GET_API_KEY &rarr;
                  </a>
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 2: Upload */}
          {step === "UPLOAD" && (
            <motion.div
              key="upload"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 p-8 flex flex-col items-center justify-center"
            >
              <div className="w-full max-w-3xl border border-dashed border-border/50 p-2">
                <div className="border border-border p-8 bg-background relative shadow-[8px_8px_0px_0px_rgba(0,0,0,0.1)]">
                  <div className="absolute top-0 left-0 bg-primary text-primary-foreground px-3 py-1 font-mono text-xs font-bold">
                    INPUT_SOURCE
                  </div>

                  <h2 className="text-3xl font-bold uppercase mb-8 text-center tracking-tight">上传源图片</h2>

                  <label className="w-full aspect-video border-2 border-dashed border-border hover:border-primary hover:bg-primary/5 transition-all flex flex-col items-center justify-center cursor-pointer group relative overflow-hidden bg-white/50">
                    {/* Grid background */}
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#888_1px,transparent_1px),linear-gradient(to_bottom,#888_1px,transparent_1px)] bg-[size:24px_24px] opacity-10" />

                    <div className="w-24 h-24 border-2 border-border flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 bg-white z-10 relative shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)]">
                      <Upload className="w-10 h-10 text-primary" />
                    </div>
                    <p className="text-xl font-bold uppercase tracking-wider z-10">DRAG & DROP / CLICK</p>
                    <p className="text-xs text-muted-foreground font-mono mt-2 z-10 bg-white/80 px-2">
                      JPG | PNG | WEBP &lt; 10MB
                    </p>
                    <input type="file" className="hidden" accept="image/*" onChange={handleFileUpload} />
                  </label>

                  <Button
                    variant="ghost"
                    size="sm"
                    className="mt-6 text-muted-foreground hover:text-primary font-mono uppercase text-xs w-full"
                    onClick={() => setStep("API_KEY")}
                  >
                    &lt; BACK_TO_AUTH
                  </Button>
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 3: Style Selection */}
          {step === "STYLE" && (
            <motion.div
              key="style"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 p-6 flex flex-col bg-background"
            >
              <div className="flex items-center justify-between mb-6 shrink-0 border-b border-border pb-4">
                <div>
                  <h2 className="text-2xl font-bold uppercase tracking-tight">选择风格 / SELECT_STYLE</h2>
                  <p className="text-xs font-mono text-primary mt-1">// 配置渲染参数矩阵</p>
                </div>
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    className="font-mono text-xs border-border hover:bg-accent hover:text-accent-foreground rounded-none bg-transparent"
                    onClick={() => {
                      setImage(null)
                      setStep("UPLOAD")
                    }}
                  >
                    RESET_IMAGE
                  </Button>
                  <Button
                    onClick={() => setStep("GENERATING")}
                    disabled={!selectedStyle && !customStyle}
                    className="rounded-none bg-primary text-primary-foreground font-bold uppercase border-2 border-transparent hover:border-primary hover:bg-transparent hover:text-primary transition-all"
                  >
                    EXECUTE_GEN <Wand2 className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>

              <div className="flex gap-2 mb-6 overflow-x-auto pb-2 scrollbar-hide shrink-0 border-b border-border/30">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={cn(
                      "px-6 py-2 text-xs font-bold uppercase tracking-wider border transition-all whitespace-nowrap",
                      activeCategory === cat
                        ? "bg-primary text-primary-foreground border-primary shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)] -translate-y-1"
                        : "bg-background border-border text-muted-foreground hover:border-primary/50 hover:text-foreground",
                    )}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 overflow-y-auto flex-1 pb-4 pr-2 min-h-0 content-start">
                {filteredStyles.map((style) => (
                  <button
                    key={style.id}
                    onClick={() => {
                      setSelectedStyle(style.id)
                      setCustomStyle("")
                    }}
                    className={cn(
                      "relative aspect-[4/3] group overflow-hidden border-2 text-left transition-all",
                      selectedStyle === style.id
                        ? "border-primary shadow-[0_0_20px_rgba(var(--primary),0.3)] scale-[1.02] z-10"
                        : "border-border hover:border-primary/50",
                    )}
                  >
                    <div className="absolute inset-0 bg-muted">
                      <img
                        src={style.img || "/placeholder.svg"}
                        alt={style.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90" />

                    <div className="absolute bottom-0 left-0 right-0 p-3 bg-black/80 border-t border-border backdrop-blur-sm">
                      <div className="text-[10px] font-mono text-primary uppercase tracking-widest mb-0.5">
                        {style.category}
                      </div>
                      <div className="text-sm font-bold text-white uppercase">{style.name}</div>
                    </div>

                    {selectedStyle === style.id && (
                      <div className="absolute top-2 right-2 bg-primary text-primary-foreground p-1 border border-black shadow-sm">
                        <Check className="w-4 h-4" />
                      </div>
                    )}
                  </button>
                ))}
              </div>

              <div className="mt-4 pt-4 border-t-2 border-border shrink-0 bg-background/20 -mx-6 px-6 pb-0">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-2 h-2 bg-primary animate-pulse" />
                  <p className="text-xs font-bold uppercase tracking-wider">CUSTOM_PROMPT // 覆盖预设参数</p>
                </div>
                <div className="relative">
                  <Textarea
                    placeholder="输入自定义风格描述 / ENTER CUSTOM STYLE PROMPT..."
                    className="resize-none h-16 bg-white border-2 border-border focus:border-primary rounded-none font-mono text-xs p-4 pr-12 text-black placeholder:text-gray-400"
                    value={customStyle}
                    onChange={(e) => {
                      setCustomStyle(e.target.value)
                      if (e.target.value) setSelectedStyle(null)
                    }}
                  />
                  <div className="absolute bottom-2 right-2 text-[10px] font-mono text-muted-foreground">
                    CMD: PROMPT
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 4: Generating */}
          {step === "GENERATING" && (
            <motion.div
              key="generating"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex flex-col items-center justify-center p-8 bg-background"
            >
              <div className="relative w-80 h-80 mb-12 border border-border p-1 bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,0.1)]">
                {/* Corner brackets */}
                <div className="absolute -top-2 -left-2 w-8 h-8 border-t-4 border-l-4 border-primary" />
                <div className="absolute -top-2 -right-2 w-8 h-8 border-t-4 border-r-4 border-primary" />
                <div className="absolute -bottom-2 -left-2 w-8 h-8 border-b-4 border-l-4 border-primary" />
                <div className="absolute -bottom-2 -right-2 w-8 h-8 border-b-4 border-r-4 border-primary" />

                {/* Scanning effect over user image */}
                <div className="w-full h-full overflow-hidden relative bg-zinc-100">
                  {image && (
                    <img
                      src={image || "/placeholder.svg"}
                      alt="Source"
                      className="w-full h-full object-cover opacity-80 grayscale contrast-125"
                    />
                  )}
                  <div className="absolute inset-0 bg-[linear-gradient(transparent_0%,rgba(var(--primary),0.4)_50%,transparent_100%)] h-[50%] w-full animate-scan border-b-2 border-primary shadow-[0_0_20px_rgba(var(--primary),0.5)]" />

                  {/* Glitch overlay */}
                  <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjMDAwIiAvPgo8cmVjdCB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBmaWxsPSIjMzMzIiAvPgo8L3N2Zz4=')] opacity-20 pointer-events-none mix-blend-overlay" />
                </div>

                {/* Floating data */}
                <div className="absolute top-4 left-4 font-mono text-[10px] text-primary-foreground bg-primary px-1 font-bold">
                  TARGET: LOCKED
                </div>
                <div className="absolute bottom-4 right-4 font-mono text-[10px] text-primary-foreground bg-primary px-1 font-bold">
                  PROCESSING_MATRIX
                </div>
              </div>

              <div className="w-full max-w-md space-y-6 font-mono text-xs">
                <div className="flex justify-between text-sm font-bold border-b border-border pb-2">
                  <span className="text-primary animate-pulse flex items-center gap-2">
                    <span className="w-2 h-2 bg-primary rounded-none animate-spin" />
                    SYSTEM_PROCESSING
                  </span>
                  <span>{Math.round(progress)}% COMPLETE</span>
                </div>

                <div className="h-6 w-full border border-border p-1 bg-white">
                  <div className="h-full bg-primary relative overflow-hidden" style={{ width: `${progress}%` }}>
                    <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.2)_25%,rgba(255,255,255,0.2)_50%,transparent_50%,transparent_75%,rgba(255,255,255,0.2)_75%,rgba(255,255,255,0.2)_100%)] bg-[length:10px_10px]" />
                  </div>
                </div>

                <div className="space-y-1 text-muted-foreground bg-white p-4 border border-border font-mono text-[10px] shadow-sm">
                  <p className="flex items-center gap-3">
                    <span className="text-primary">[OK]</span> 解析图像特征向量 / PARSING_VECTORS...
                  </p>
                  <p
                    className={cn(
                      "flex items-center gap-3 transition-all",
                      progress > 30 ? "opacity-100 text-foreground" : "opacity-40",
                    )}
                  >
                    <span className={progress > 30 ? "text-primary" : "text-muted"}>
                      {progress > 30 ? "[OK]" : "[..]"}
                    </span>
                    应用风格矩阵变换 / APPLY_MATRIX_TRANSFORM...
                  </p>
                  <p
                    className={cn(
                      "flex items-center gap-3 transition-all",
                      progress > 60 ? "opacity-100 text-foreground" : "opacity-40",
                    )}
                  >
                    <span className={progress > 60 ? "text-primary" : "text-muted"}>
                      {progress > 60 ? "[OK]" : "[..]"}
                    </span>
                    GPU 渲染输出 / RENDERING_OUTPUT...
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 5: Result */}
          {step === "RESULT" && (
            <motion.div
              key="result"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 p-6 flex flex-col"
            >
              <div className="flex items-center justify-between mb-6 border-b border-border pb-4">
                <div className="space-y-1">
                  <h2 className="text-2xl font-bold uppercase">生成完成 / COMPLETE</h2>
                  <div className="text-xs font-mono text-primary bg-primary/10 px-2 py-0.5 inline-block">
                    TASK_ID: {Math.random().toString(36).substr(2, 9).toUpperCase()}
                  </div>
                </div>
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    onClick={() => setStep("STYLE")}
                    className="rounded-none border-border hover:bg-accent hover:text-accent-foreground font-bold uppercase text-xs"
                  >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    RETRY / 重试
                  </Button>
                  <Button className="rounded-none bg-primary text-primary-foreground font-bold uppercase text-xs hover:bg-primary/90 border-2 border-transparent hover:border-primary">
                    DOWNLOAD / 下载 <Download className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>

              <div className="flex-1 relative border-2 border-border bg-black overflow-hidden group">
                {/* Simple split view for now */}
                <div className="absolute inset-0 flex">
                  <div className="w-1/2 h-full border-r-2 border-border relative overflow-hidden group/left">
                    <div className="absolute top-4 left-4 z-10 bg-black text-white text-[10px] px-3 py-1 font-mono border border-white/20 uppercase tracking-wider">
                      ORIGINAL_SOURCE
                    </div>
                    {image && (
                      <img
                        src={image || "/placeholder.svg"}
                        className="w-full h-full object-cover grayscale group-hover:left:grayscale-0 transition-all"
                      />
                    )}
                    <div className="absolute inset-0 bg-black/20 pointer-events-none" />
                  </div>
                  <div className="w-1/2 h-full relative overflow-hidden group/right">
                    <div className="absolute top-4 right-4 z-10 bg-primary text-primary-foreground text-[10px] px-3 py-1 font-mono font-bold uppercase tracking-wider shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                      RENDERED_OUTPUT
                    </div>
                    <img
                      src="/cyberpunk-cityscape.png"
                      className="w-full h-full object-cover contrast-110 hover:scale-105 transition-transform duration-700"
                    />

                    {/* Watermark style text */}
                    <div className="absolute bottom-4 right-4 text-[10px] font-mono text-white/50 rotate-0">
                      GENERATED_BY_STYLEGEN
                    </div>
                  </div>
                </div>

                {/* Center divider */}
                <div className="absolute top-0 bottom-0 left-1/2 w-1 bg-primary -translate-x-1/2 z-20 flex flex-col items-center justify-center gap-32">
                  <div className="w-6 h-6 bg-black border-2 border-primary rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                  </div>
                </div>

                {/* Hover hint */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-black border border-primary text-primary text-[10px] px-6 py-2 uppercase font-bold tracking-widest opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0 pointer-events-none">
                  COMPARE_VIEW_MODE
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}

function StepIndicator({
  step,
  current,
  label,
  number,
}: { step: string; current: string; label: string; number: string }) {
  const steps = ["API_KEY", "UPLOAD", "STYLE", "GENERATING", "RESULT"]
  const currentIndex = steps.indexOf(current)
  const stepIndex = steps.indexOf(step)

  const isComplete = currentIndex > stepIndex
  const isActive = current === step
  const isFuture = currentIndex < stepIndex

  return (
    <div
      className={cn(
        "flex flex-col items-center gap-2 relative z-10 px-4 py-2 transition-all duration-300",
        isActive ? "scale-110" : "scale-100",
      )}
    >
      <div
        className={cn(
          "w-8 h-8 flex items-center justify-center text-xs font-bold font-mono border-2 transition-all duration-300",
          isActive
            ? "bg-primary border-primary text-primary-foreground shadow-[4px_4px_0px_0px_rgba(255,255,255,0.1)]"
            : isComplete
              ? "bg-background border-primary text-primary"
              : "bg-background border-border text-muted-foreground",
        )}
      >
        {isComplete ? <Check className="w-4 h-4" /> : number}
      </div>
      <span
        className={cn(
          "text-[10px] uppercase tracking-wider font-bold bg-background px-1",
          isActive ? "text-primary" : isComplete ? "text-foreground" : "text-muted-foreground",
        )}
      >
        {label}
      </span>
    </div>
  )
}
