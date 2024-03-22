
function debounce(fn,debounceTime){
    return function(trim){
        this.counter=this.counter===undefined?1:this.counter+1
        setTimeout(()=>{
            this.counter--
            if (!this.counter){
                fn.apply(this,arguments)
            }
        },debounceTime)
    }
}

export {debounce}