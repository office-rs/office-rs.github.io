# WebGPU browser requirements

The web build of both libraries depends on WebGPU, with no Canvas2D software fallback.

| Browser | Minimum version | Notes |
|---|---|---|
| Chrome / Edge | 113+ | Works out of the box on desktop |
| Firefox | No stable release yet | Manually enable `dom.webgpu.enabled` |
| Safari | Unsupported | No fallback path currently |

If the browser does not support WebGPU, the editor area will appear blank or show a load-failure message.

You can check your current browser's capabilities via [WebGPU Report](https://webgpureport.org/).
