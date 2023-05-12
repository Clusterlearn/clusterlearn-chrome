// vite.config.ts
import { defineConfig } from "file:///C:/workspace/node/clusterlearn-chrome/node_modules/vite/dist/node/index.js";
import react from "file:///C:/workspace/node/clusterlearn-chrome/node_modules/@vitejs/plugin-react/dist/index.mjs";
import { crx } from "file:///C:/workspace/node/clusterlearn-chrome/node_modules/@crxjs/vite-plugin/dist/index.mjs";

// manifest.json
var manifest_default = {
  manifest_version: 3,
  name: "CRXJS React Vite Example",
  version: "1.0.0",
  action: { default_popup: "index.html" },
  content_scripts: [
    {
      js: ["src/content.tsx"],
      matches: ["https://www.google.com/*", "http://localhost/*"]
    }
  ]
};

// vite.config.ts
var vite_config_default = defineConfig({
  plugins: [
    react(),
    crx({ manifest: manifest_default })
  ]
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAibWFuaWZlc3QuanNvbiJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkM6XFxcXHdvcmtzcGFjZVxcXFxub2RlXFxcXGNsdXN0ZXJsZWFybi1jaHJvbWVcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXHdvcmtzcGFjZVxcXFxub2RlXFxcXGNsdXN0ZXJsZWFybi1jaHJvbWVcXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L3dvcmtzcGFjZS9ub2RlL2NsdXN0ZXJsZWFybi1jaHJvbWUvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJ1xuaW1wb3J0IHJlYWN0IGZyb20gJ0B2aXRlanMvcGx1Z2luLXJlYWN0J1xuaW1wb3J0IHsgY3J4IH0gZnJvbSAnQGNyeGpzL3ZpdGUtcGx1Z2luJ1xuaW1wb3J0IG1hbmlmZXN0IGZyb20gJy4vbWFuaWZlc3QuanNvbidcblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgcGx1Z2luczogW1xuICAgIHJlYWN0KCksXG4gICAgY3J4KHsgbWFuaWZlc3QgfSksXG4gIF0sXG59KSIsICJ7XHJcbiAgXCJtYW5pZmVzdF92ZXJzaW9uXCI6IDMsXHJcbiAgXCJuYW1lXCI6IFwiQ1JYSlMgUmVhY3QgVml0ZSBFeGFtcGxlXCIsXHJcbiAgXCJ2ZXJzaW9uXCI6IFwiMS4wLjBcIixcclxuICBcImFjdGlvblwiOiB7IFwiZGVmYXVsdF9wb3B1cFwiOiBcImluZGV4Lmh0bWxcIiB9LFxyXG4gIFwiY29udGVudF9zY3JpcHRzXCI6IFtcclxuICAgIHtcclxuICAgIFwianNcIjogW1wic3JjL2NvbnRlbnQudHN4XCJdLFxyXG4gICAgXCJtYXRjaGVzXCI6IFtcImh0dHBzOi8vd3d3Lmdvb2dsZS5jb20vKlwiLCBcImh0dHA6Ly9sb2NhbGhvc3QvKlwiXVxyXG4gICAgfVxyXG4gIF1cclxufSJdLAogICJtYXBwaW5ncyI6ICI7QUFBeVMsU0FBUyxvQkFBb0I7QUFDdFUsT0FBTyxXQUFXO0FBQ2xCLFNBQVMsV0FBVzs7O0FDRnBCO0FBQUEsRUFDRSxrQkFBb0I7QUFBQSxFQUNwQixNQUFRO0FBQUEsRUFDUixTQUFXO0FBQUEsRUFDWCxRQUFVLEVBQUUsZUFBaUIsYUFBYTtBQUFBLEVBQzFDLGlCQUFtQjtBQUFBLElBQ2pCO0FBQUEsTUFDQSxJQUFNLENBQUMsaUJBQWlCO0FBQUEsTUFDeEIsU0FBVyxDQUFDLDRCQUE0QixvQkFBb0I7QUFBQSxJQUM1RDtBQUFBLEVBQ0Y7QUFDRjs7O0FETkEsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsU0FBUztBQUFBLElBQ1AsTUFBTTtBQUFBLElBQ04sSUFBSSxFQUFFLDJCQUFTLENBQUM7QUFBQSxFQUNsQjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
