// 测试API key前缀处理功能的脚本
// 这个文件可以在浏览器控制台或Node.js环境中运行（需要适当调整localStorage相关代码）

// 模拟API_CONFIG常量
const API_CONFIG = {
  STORAGE_KEYS: {
    API_KEY: 'stylegen_api_key',
  },
};

// 模拟API key处理函数（从实际代码中提取的逻辑）
function processApiKey(apiKey: string): { isValid: boolean; processedKey: string } {
  // 检查是否以sk-或sk:开头
  if (apiKey.startsWith('sk-') || apiKey.startsWith('sk:')) {
    // 处理前缀：如果以sk:开头，则去除前缀
    const processedKey = apiKey.startsWith('sk:') ? apiKey.slice(3) : apiKey;
    return { isValid: true, processedKey };
  }
  return { isValid: false, processedKey: '' };
}

// 测试用例
function runTests() {
  console.log('开始测试API key前缀处理功能...');
  
  const testCases = [
    {
      name: '测试sk-前缀的API key',
      input: 'sk-12345abcdef',
      expectedValid: true,
      expectedProcessedKey: 'sk-12345abcdef',
    },
    {
      name: '测试sk:前缀的API key',
      input: 'sk:67890ghijkl',
      expectedValid: true,
      expectedProcessedKey: '67890ghijkl',
    },
    {
      name: '测试无效格式的API key (无前缀)',
      input: '12345abcdef',
      expectedValid: false,
      expectedProcessedKey: '',
    },
    {
      name: '测试无效格式的API key (错误前缀)',
      input: 'api-12345abcdef',
      expectedValid: false,
      expectedProcessedKey: '',
    },
  ];
  
  let passedTests = 0;
  
  testCases.forEach((testCase, index) => {
    console.log(`\n测试用例 ${index + 1}: ${testCase.name}`);
    console.log(`输入: "${testCase.input}"`);
    
    const result = processApiKey(testCase.input);
    
    console.log(`结果: 有效=${result.isValid}, 处理后密钥="${result.processedKey}"`);
    console.log(`预期: 有效=${testCase.expectedValid}, 处理后密钥="${testCase.expectedProcessedKey}"`);
    
    const isValidCorrect = result.isValid === testCase.expectedValid;
    const processedKeyCorrect = result.processedKey === testCase.expectedProcessedKey;
    const passed = isValidCorrect && processedKeyCorrect;
    
    if (passed) {
      passedTests++;
      console.log('✅ 测试通过!');
    } else {
      console.log('❌ 测试失败!');
      if (!isValidCorrect) console.log('  - 有效性检查失败');
      if (!processedKeyCorrect) console.log('  - 处理后密钥不匹配');
    }
  });
  
  console.log(`\n测试完成: ${passedTests}/${testCases.length} 测试通过`);
  
  // 在浏览器环境中，可以测试localStorage存储
  if (typeof localStorage !== 'undefined') {
    console.log('\n测试localStorage存储功能...');
    
    // 测试sk-前缀存储
    const skDashKey = 'sk-98765abcdef';
    const skColonKey = 'sk:12345ghijkl';
    
    // 测试sk-前缀
    const result1 = processApiKey(skDashKey);
    if (result1.isValid) {
      localStorage.setItem(API_CONFIG.STORAGE_KEYS.API_KEY, result1.processedKey);
      const stored1 = localStorage.getItem(API_CONFIG.STORAGE_KEYS.API_KEY);
      console.log(`sk-前缀测试: 存储后值="${stored1}", 预期="${result1.processedKey}"`);
      console.log(stored1 === result1.processedKey ? '✅ 存储正确!' : '❌ 存储失败!');
    }
    
    // 测试sk:前缀
    const result2 = processApiKey(skColonKey);
    if (result2.isValid) {
      localStorage.setItem(API_CONFIG.STORAGE_KEYS.API_KEY, result2.processedKey);
      const stored2 = localStorage.getItem(API_CONFIG.STORAGE_KEYS.API_KEY);
      console.log(`sk:前缀测试: 存储后值="${stored2}", 预期="${result2.processedKey}"`);
      console.log(stored2 === result2.processedKey ? '✅ 存储正确!' : '❌ 存储失败!');
      
      // 验证前缀已被正确去除
      console.log(`sk:前缀去除验证: 存储的值不包含前缀sk:? ${!stored2?.startsWith('sk:')}`);
    }
  }
}

// 运行测试
runTests();

// 在实际应用中的使用说明
console.log('\n=========================');
console.log('使用说明:');
console.log('1. 用户现在可以输入以"sk-"或"sk:"开头的API key');
console.log('2. 系统会自动验证并处理这些格式');
console.log('3. 如果API key以"sk:"开头，系统会自动去除前缀后再存储');
console.log('4. 如果API key格式无效，系统会显示错误提示');
console.log('=========================');
