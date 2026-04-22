---
title: 通过一个 Agent Demo 了解其原理
date: 2026/04/20 12:03:33
pubDate: 2026/04/20 12:03:33
description: 本文以 Go 语言实现的智能旅行助手 Agent Demo 为核心，拆解 AI Agent 核心的 Thought-Action-Observation 交互范式，详细讲解环境搭建、LLM 接入、工具封装、主循环实现全流程，帮助开发者快速理解基础 Agent 的工作原理与开发逻辑，轻松上手 Agent 开发。
category: 技术
tags: 
  - 从零搭建 Go 语言智能旅行 Agent
  - 智能旅行助手 Agent 实现步骤
  - Go 语言 Agent Demo 开发教程
---

- 项目地址：[`labs/agent-go`](https://github.com/QiYuOr2/labs/tree/main/experiments/agent-go)


AI Agent 的核心是 `Thought-Action-Observation` 交互范式，在持续不断的循环中，将每次思考后调用工具执行的结果传递给下次循环，以此来达到我们想要的目标。现在市面上的 Agent 都是在此基础上增加了例如记忆存储这类辅助 Agent 达到目标的手段，不过本文的讨论范围仅限于一个基础的 Agent Loop。

### 准备工作


#### 环境搭建

接下来我们要实现一个智能旅行助手，它需要根据用户目的地查询天气，并根据天气推荐合适的旅行景点。本文是用 Go 实现的这个助手，你需要准备 Go 的运行环境以及下面两段工具代码。

- [`agent-go/weather.go`](https://github.com/QiYuOr2/labs/blob/main/experiments/agent-go/weather.go)
- [`agent-go/tavily.go`](https://github.com/QiYuOr2/labs/blob/main/experiments/agent-go/tavily.go)


其中 `weather.go` 封装了 [wttr.in](https://wttr.in) 的格式化输入输出，用来获取指定地区的天气情况；`tavily.go` 封装了 [tavily](https://www.tavily.com/) 的格式化输入输出，用来获取指定地区的旅行地点推荐，使用前需要提前去官网申请免费的 `apiKey`。这些内容不是本文的重点，所以不对这部分代码进行解释。

除此之外，还需要安装 `openai-go`、`color` 和 `godotenv` 这三个依赖，其中 `openai-go` 必不可少。可以在项目根目录执行以下命令安装：

```shell
go get github.com/openai/openai-go
go get github.com/joho/godotenv
go get github.com/fatih/color
```

#### 提示词

必须的运行环境搭建好后，我们还需要准备一段 Prompt，作为驱动 LLM 思考的核心，并且为了保证每次循环的结果能够被程序处理，还需要格式化 LLM 的输出结构。以下为参考：

```markdown
你是一个智能旅行助手。你的任务是分析用户的请求，并使用可用工具一步步地解决问题。

# 可用工具:
- "get_weather(city: str)": 查询指定城市的实时天气。
- "get_attraction(city: str, weather: str)": 根据城市和天气搜索推荐的旅游景点。

# 输出格式要求:
你的每次回复必须严格遵循以下格式，包含一对Thought和Action：

Thought: [你的思考过程和下一步计划]
Action: [你要执行的具体行动]

Action的格式必须是以下之一：
1. 调用工具：function_name(arg_name="arg_value")
2. 结束任务：Finish[最终答案]

# 重要提示:
- 每次只输出一对Thought-Action
- Action必须在同一行，不要换行
- 当收集到足够信息可以回答用户问题时，必须使用 Action: Finish[最终答案] 格式结束

请开始吧！
```

格式不必完全相同，重点在于程序能够将输出结果解析并得到我们需要的内容。


### 主循环

#### 接入 LLM

我这里使用的 LLM 服务提供商是 [deepseek](https://www.deepseek.com/)，他的 API 遵循了与 OpenAI 相似的接口规范，可以直接用 `openai-go` 调用。

```go
// llm.go

import (
	"context"
	"fmt"

	"github.com/openai/openai-go"
	"github.com/openai/openai-go/option"
	"github.com/openai/openai-go/shared"
)

type LLM struct {
	model  string
	client openai.Client
}

func NewLLMClient(apiKey, model, baseURL string) *LLM {
	client := openai.NewClient(
		option.WithAPIKey(apiKey),
		option.WithBaseURL(BASE_URL),
	)
	return &LLM{
		model:  model,
		client: client,
	}
}

func (l *LLM) Generate(prompt, sysPrompt string) string {
	fmt.Println("正在调用大语言模型……")

	resp, err := l.client.Chat.Completions.New(
		context.Background(),
		openai.ChatCompletionNewParams{
			Model: shared.ChatModel(l.model),
			Messages: []openai.ChatCompletionMessageParamUnion{
				openai.SystemMessage(sysPrompt),
				openai.UserMessage(prompt),
			},
		},
	)

	if err != nil {
		fmt.Printf("调用大语言模型失败: %v\n", err)
		return "错误:调用语言模型服务时出错。"
	}

	answer := resp.Choices[0].Message.Content
	fmt.Println("大语言模型响应成功。")
	return answer
}
```

deepseek 的 `model` 和 `baseURL` 如下：

``` go
const (
	BASE_URL = "https://api.deepseek.com"
	MODEL_ID = "deepseek-chat"
)
```

`apiKey` 在通常情况下，会存入环境变量中，这里我为了方便开发将其存入 `.env` 文件中，并使用 `godotenv` 读取。

```go
func init() {
	err := godotenv.Load()
	if err != nil {
		log.Println(".env 未加载")
	}
}

func main() {
	apiKey := os.Getenv("DEEPSEEK_API_KEY")

	// ...
}
```

之后我们调用 LLM 的时候，会把前文的提示词传入 `sysPrompt`，而 `prompt` 则会传入旅游我们想问的问题，例如：`请帮我查询今天东京的天气，并根据天气推荐一个合适的旅游景点。`

#### 执行行动

在开始主循环前，我们还需要把前文提示词中提到的工具和工具代码做映射。

```go
type ToolFunc func(args map[string]string) string

var availableTools = map[string]ToolFunc{
	"get_weather":    func(args map[string]string) string { return GetWeather(args["city"]) },
	"get_attraction": func(args map[string]string) string { return GetAttraction(args["city"], args["weather"]) },
}
```

接下来的主循环就可以调用前面封装好的 `LLM.Generate`，并解析其输出结果实现 `Thought-Action-Observation`。

<details>
<summary>主循环完整代码</summary>

- [`agent-go/main.go`](https://github.com/QiYuOr2/labs/blob/main/experiments/agent-go/main.go)

```go
func main() {
	info := color.New(color.FgHiBlack)
	step := color.New(color.FgCyan)
	output := color.New(color.FgBlue, color.Bold)

	apiKey := os.Getenv("DEEPSEEK_API_KEY")

	llm := NewLLMClient(apiKey, MODEL_ID, BASE_URL)

	userPrompt := "你好，请帮我查询一下今天东京的天气，然后根据天气推荐一个合适的旅游景点。"
	promptHistory := []string{fmt.Sprintf("用户请求：%s", userPrompt)}

	fmt.Printf("用户输入：%s\n", userPrompt)

	for i := range 5 {
		fmt.Printf("-------------------< 迭代第 %d 轮 >-------------------\n", i+1)

		fullPrompt := strings.Join(promptHistory, "\n")

		llmOutput := llm.Generate(fullPrompt, AGENT_SYS_PROMPT)

		re := regexp.MustCompile(`(?s)(Thought:[\s\S]*?Action:[^\n\r]*)`)
		match := re.FindStringSubmatch(llmOutput)

		if len(match) > 1 {
			truncated := strings.TrimSpace(match[1])

			if truncated != strings.TrimSpace(llmOutput) {
				llmOutput = truncated
				fmt.Println("已截断多余的 Thought-Action 对")
			}
		}

		info.Printf("模型输出:\n%s\n\n", llmOutput)
		promptHistory = append(promptHistory, llmOutput)

		// 提取 Action
		reAction := regexp.MustCompile(`(?s)Action:\s*(.*)`)
		actionMatch := reAction.FindStringSubmatch(llmOutput)
		if len(actionMatch) < 2 {
			observation := "错误: 未能解析到 Action 字段。请确保你的回复严格遵循 'Thought: ... Action: ...' 的格式。"
			observationResult := fmt.Sprintf("Observation: %s", observation)

			fmt.Printf("%s\n%s\n", observationResult, strings.Repeat("=", 40))
			promptHistory = append(promptHistory, observationResult)
			continue
		}

		// 完成任务
		actionStr := strings.TrimSpace(actionMatch[1])
		if strings.HasPrefix(actionStr, "Finish") {
			reFinish := regexp.MustCompile(`Finish\[(.*)\]`)
			m := reFinish.FindStringSubmatch(actionStr)

			if len(m) > 1 {
				finalAnswer := m[1]
				output.Printf("任务完成，最终答案: %s\n", finalAnswer)
			}
			break
		}

		// 解析工具调用
		reTool := regexp.MustCompile(`(\w+)\(`)
		toolMatch := reTool.FindStringSubmatch(actionStr)
		toolName := toolMatch[1]

		reArgs := regexp.MustCompile(`\((.*)\)`)
		argsMatch := reArgs.FindStringSubmatch(actionStr)
		argsStr := argsMatch[1]

		reKwargs := regexp.MustCompile(`(\w+)="([^"]*)"`)
		kwargsMatches := reKwargs.FindAllStringSubmatch(argsStr, -1)

		kwargs := make(map[string]string)
		for _, m := range kwargsMatches {
			if len(m) == 3 {
				kwargs[m[1]] = m[2]
			}
		}

		var observation string
		if tool, ok := availableTools[toolName]; ok {
			observation = tool(kwargs)
		} else {
			observation = fmt.Sprintf("错误:未定义的工具 '%s'", toolName)
		}

		observationResult := fmt.Sprintf("Observation: %s", observation)
		step.Printf("%s\n", observationResult)
		promptHistory = append(promptHistory, observationResult)
	}
}

```

</details>

前文提示词为了方便理解，采用了更易读的格式化输出要求：

```
Thought: [你的思考过程和下一步计划]
Action: [你要执行的具体行动]
```

增加了编写程序时对结果解析的难度，我们在实际开发时可以采用更有好的结构，比如 `json`。下面提供一段剥离了文本解析后的主循环伪代码：

```go
func main() {
	apiKey := os.Getenv("DEEPSEEK_API_KEY")

	llm := NewLLMClient(apiKey, MODEL_ID, BASE_URL)

	userPrompt := "你好，请帮我查询一下今天东京的天气，然后根据天气推荐一个合适的旅游景点。"
	promptHistory := []string{fmt.Sprintf("用户请求：%s", userPrompt)}

	fmt.Printf("用户输入：%s\n", userPrompt)

	for i := range 5 {
		fmt.Printf("-----------< 迭代第 %d 轮 >-----------\n", i+1)

		fullPrompt := strings.Join(promptHistory, "\n")

		llmOutput := llm.Generate(fullPrompt, AGENT_SYS_PROMPT)

		fmt.Printf("模型输出:\n%s\n\n", llmOutput)
		promptHistory = append(promptHistory, llmOutput)

		// 提取 Action
		actionStr, err := GetAction(llmOutput)
		if err != nil {
			observation := "错误: 未能解析到 Action 字段。请确保你的回复严格遵循 'Thought: ... Action: ...' 的格式。"
			observationResult := fmt.Sprintf("Observation: %s", observation)

			fmt.Printf("%s\n%s\n", observationResult, strings.Repeat("=", 40))
			promptHistory = append(promptHistory, observationResult)
			continue
		}

		// 完成任务
		if strings.HasPrefix(actionStr, "Finish") {
			finalAnswer := GetAnswer(actionStr)
			fmt.Printf("任务完成，最终答案: %s\n", finalAnswer)
			break
		}

		// 解析工具调用
		toolName := GetTool(actionStr)

		// 解析工具参数
		kwargs := GetArgs(actionStr)


		// 拼接下一轮循环提示词
		var observation string
		if tool, ok := availableTools[toolName]; ok {
			observation = tool(kwargs)
		} else {
			observation = fmt.Sprintf("错误:未定义的工具 '%s'", toolName)
		}

		observationResult := fmt.Sprintf("Observation: %s", observation)
		fmt.Printf("%s\n", observationResult)
		promptHistory = append(promptHistory, observationResult)
	}
}
```

可以运行程序看一下输出结果：

```
用户输入：你好，请帮我查询一下今天东京的天气，然后根据天气推荐一个合适的旅游景点。
-------------------< 迭代第 1 轮 >-------------------
正在调用大语言模型……
大语言模型响应成功。
模型输出:
Thought: 用户想要查询东京今天的天气，并根据天气推荐旅游景点。我需要先调用get_weather工具获取东京的天气信息。
Action: get_weather(city="东京")

Observation: 东京当前天气:Partly cloudy，气温19摄氏度
-------------------< 迭代第 2 轮 >-------------------
正在调用大语言模型……
大语言模型响应成功。
模型输出:
Thought: 已经获取到东京的天气是"Partly cloudy"（局部多云）。现在我需要根据这个天气来推荐旅游景点，所以接下来调用get_attraction工具，传入城市"东京"和天气"Partly cloudy"。
Action: get_attraction(city="东京", weather="Partly cloudy")

Observation: 根据搜索，为您找到以下信息:
 東京下雨時，你可以做的九件有趣的活動和體驗 - GetYourGuide: 探索東京下雨天的最佳活動和體驗，從在時尚中心涩谷109（Shibuya 109）購物，到踏入哈利·波特的魔法世界（Harry Potter's Wizarding World），應有盡有。
-------------------< 迭代第 3 轮 >-------------------
正在调用大语言模型……
大语言模型响应成功。
模型输出:
Thought: 我已经获取了东京的天气（局部多云）以及对应的旅游景点推荐。现在可以整合信息回答用户了。
Action: Finish[今天东京天气为局部多云，气温19摄氏度。根据当前天气，推荐您探索东京下雨时的有趣活动和体验，例如在涩谷109购物或前往哈利·波特魔法世界等景点。]

任务完成，最终答案: 今天东京天气为局部多云，气温19摄氏度。根据当前天气，推荐您探索东京下雨时的有趣活动和体验，例如在涩谷109购物或前往哈利·波特魔法世界等景点。
```

在 LLM 的支持下，程序便有了将用户模糊的意图转化为具体可执行步骤的能力。

至此，我们根据 `Thought-Action-Observation` 交互范式完成了一个基础 AI Agent。

### 参考文章

- [Hello Agents](https://hello-agents.datawhale.cc/#/)