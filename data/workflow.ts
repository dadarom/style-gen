// 工作流程步骤配置文件

interface WorkflowStep {
  id: number;
  title: string;
  description: string;
  icon: string;
}

export const WORKFLOW_STEPS: WorkflowStep[] = [
  {
    id: 1,
    title: "上传图片",
    description: "上传您想要风格化的图片，支持JPG、PNG、WEBP格式",
    icon: "cloud-upload"
  },
  {
    id: 2,
    title: "选择风格",
    description: "从丰富的预设风格中选择，或输入自定义风格描述",
    icon: "palette"
  },
  {
    id: 3,
    title: "等待生成",
    description: "AI智能处理，仅需约60秒即可生成风格化图片",
    icon: "clock"
  },
  {
    id: 4,
    title: "下载图片",
    description: "一键下载生成的风格化图片，享受创作成果",
    icon: "download"
  }
];