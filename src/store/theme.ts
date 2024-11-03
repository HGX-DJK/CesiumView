import { defineStore } from "pinia";

export const ThemeStore = defineStore("themeStore", {
    state: () => {
        return {
            currentThemeFlag:null as any,
            // 默认主题
            themeOverrides: {
               

            },
            // 暗色系风格主题
            darkOverrides: {
              
            },
        }
    },
    actions: {

    }
})