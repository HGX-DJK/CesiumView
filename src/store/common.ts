import { defineStore }  from "pinia";

/**
 * @desscription 公共store
 */
export const ViewerStore = defineStore("viewer", {
    state: () => {
        return {
           viewer:"" as any
        }
    },
    actions: {
        //初始化viewer
        initViewer(viewer:any){
            this.viewer = viewer
            
        }
    }
})

