# WebGPU 浏览器要求

两库的 Web 端均依赖 WebGPU，无 Canvas2D 软件回退。

| 浏览器 | 最低版本 | 备注 |
|---|---|---|
| Chrome / Edge | 113+ | 桌面端开箱即用 |
| Firefox | 未发布稳定 | 需手动启用 `dom.webgpu.enabled` |
| Safari | 不支持 | 暂无回退路径 |

如浏览器不支持 WebGPU，编辑器区域会显示空白或加载失败提示。

可以通过 [WebGPU Report](https://webgpureport.org/) 检测当前浏览器能力。
