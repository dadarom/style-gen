import React from 'react';
import { Container, Heading, Text } from './atom';
import { Card } from './atom/Card';

const About: React.FC = () => {
  return (
    <Container className="py-16">
      <div className="text-center mb-12">
        <Heading level="h2" size="xl" className="mb-4">
          简单透明的<span className="text-orange-500">关于我们</span>
        </Heading>
        <Text size="md" className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          了解我们的使命、技术优势和团队，打造最好的AI创意工具
        </Text>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <Card className="p-6 border border-gray-200 dark:border-gray-700">
          <Heading level="h3" size="md" className="mb-3">我们的使命</Heading>
          <Text size="sm" className="text-gray-600 dark:text-gray-300">
            我们致力于通过AI技术为用户提供简单高效的图像风格转换服务，让每个人都能轻松创作出专业级的艺术作品。
          </Text>
        </Card>
        
        <Card className="p-6 border border-gray-200 dark:border-gray-700">
          <Heading level="h3" size="md" className="mb-3">技术优势</Heading>
          <Text size="sm" className="text-gray-600 dark:text-gray-300">
            我们拥有先进的深度学习模型和高效的图像处理算法，能够在保持图像质量的同时实现快速的风格转换。
          </Text>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="p-6 border border-gray-200 dark:border-gray-700">
          <Heading level="h3" size="md" className="mb-3">团队介绍</Heading>
          <Text size="sm" className="text-gray-600 dark:text-gray-300">
            我们的团队由AI研究人员、软件工程师和设计师组成，致力于打造最好的AI创意工具。
          </Text>
        </Card>
        
        <Card className="p-6 border border-gray-200 dark:border-gray-700">
          <Heading level="h3" size="md" className="mb-3">联系我们</Heading>
          <Text size="sm" className="text-gray-600 dark:text-gray-300">
            电子邮件：support@aistylegen.com
          </Text>
        </Card>
      </div>
    </Container>
  );
};

export default About;