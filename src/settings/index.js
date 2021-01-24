export default {
    PAGE_SIZE: 20,
    debug: process.env.VUE_APP_DEBUG === "true",
    data: {
        action_btns: [{ icon: "mdi-bell-outline", to: { name: "notification" }, type: "path", auth: true }]
    },
    addActionBtn(newBtn) {
        if (this.debug) console.log('addActionBtn triggered with', newBtn)
        this.data.action_btns.push(newBtn)
    },
    removeActionBtn(btn) {
        if (this.debug) console.log('removeActionBtn triggered', btn)
        var removeIdx = -1
        this.data.action_btns.forEach(function(obj, idx) {
            if (obj.icon === btn.icon)
                removeIdx = idx;
        });
        if (removeIdx != -1) {
            this.data.action_btns.splice(removeIdx, 1)
        }
        if (this.debug) console.log('left with', this.data.action_btns)

    }
}