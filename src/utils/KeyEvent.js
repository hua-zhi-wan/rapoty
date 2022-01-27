export default {
    maskCtrlCombination(key, event) {
        document.addEventListener('keydown', (e) => {
            if (e.key === key && (navigator.platform.match('Mac') ? e.metaKey : e.ctrlKey)) {
                e.preventDefault()
                if (event) {
                    event()
                }
            }
        })
        console.log("Mask key => ", key)
    },
    maskTab() {
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                e.preventDefault()
            }
        })
    }
}